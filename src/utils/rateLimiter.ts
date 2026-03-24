export interface RateLimiterState {
  isLimited: boolean;
  remainingRequests: number;
  retryAfterMs: number;
  limit: number;
  windowMs: number;
}

export class RateLimiter {
  private requests: number[] = [];

  constructor(
    private readonly limit = 10,
    private readonly windowMs = 60_000,
  ) {}

  canMakeRequest(now = Date.now()): boolean {
    this.prune(now);
    return this.requests.length < this.limit;
  }

  recordRequest(now = Date.now()): void {
    this.prune(now);
    this.requests.push(now);
  }

  getRetryAfterMs(now = Date.now()): number {
    this.prune(now);
    if (this.requests.length < this.limit) {
      return 0;
    }

    const oldestRequest = this.requests[0];
    return Math.max(0, this.windowMs - (now - oldestRequest));
  }

  getState(now = Date.now()): RateLimiterState {
    this.prune(now);
    const retryAfterMs = this.getRetryAfterMs(now);
    const remainingRequests = Math.max(0, this.limit - this.requests.length);

    return {
      isLimited: retryAfterMs > 0,
      remainingRequests,
      retryAfterMs,
      limit: this.limit,
      windowMs: this.windowMs,
    };
  }

  private prune(now: number): void {
    this.requests = this.requests.filter((timestamp) => now - timestamp < this.windowMs);
  }
}
