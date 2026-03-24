const sleep = (delayMs: number) => new Promise<void>((resolve) => setTimeout(resolve, delayMs));

export interface RequestQueueOptions {
  maxRetries?: number;
  baseDelayMs?: number;
}

interface QueueTask<T> {
  task: () => Promise<T>;
  maxRetries: number;
  baseDelayMs: number;
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
}

export class RequestQueue {
  private queue: Array<QueueTask<unknown>> = [];

  private processing = false;

  enqueue<T>(task: () => Promise<T>, options?: RequestQueueOptions): Promise<T> {
    const maxRetries = options?.maxRetries ?? 3;
    const baseDelayMs = options?.baseDelayMs ?? 250;

    return new Promise<T>((resolve, reject) => {
      this.queue.push({
        task: task as () => Promise<unknown>,
        maxRetries,
        baseDelayMs,
        resolve: resolve as (value: unknown) => void,
        reject,
      });

      if (!this.processing) {
        void this.processNext();
      }
    });
  }

  size(): number {
    return this.queue.length;
  }

  private async processNext(): Promise<void> {
    this.processing = true;

    while (this.queue.length > 0) {
      const queueTask = this.queue.shift() as QueueTask<unknown>;

      try {
        const result = await this.runWithRetries(queueTask);
        queueTask.resolve(result);
      } catch (error) {
        queueTask.reject(error);
      }
    }

    this.processing = false;
  }

  private async runWithRetries<T>(queueTask: QueueTask<T>): Promise<T> {
    let attempt = 0;

    while (attempt <= queueTask.maxRetries) {
      try {
        return await queueTask.task();
      } catch (error) {
        if (attempt === queueTask.maxRetries) {
          throw error;
        }

        const delayMs = queueTask.baseDelayMs * 2 ** attempt;
        await sleep(delayMs);
        attempt += 1;
      }
    }

    throw new Error("Request queue unexpectedly exceeded retry loop.");
  }
}
