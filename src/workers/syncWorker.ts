/**
 * syncWorker.ts
 * Runs in a Web Worker to process the offline action queue without
 * blocking the main thread. Communicates via postMessage.
 *
 * Messages IN  (main → worker):
 *   { type: "START_SYNC"; apiBase: string }
 *   { type: "STOP" }
 *
 * Messages OUT (worker → main):
 *   { type: "SYNC_STARTED" }
 *   { type: "ACTION_SUCCESS"; id: string }
 *   { type: "ACTION_FAILED";  id: string; error: string }
 *   { type: "SYNC_COMPLETE";  synced: number; failed: number }
 *   { type: "ERROR";          message: string }
 */

import {
  getPendingActions,
  updateAction,
  removeAction,
  type QueuedAction,
} from "@/utils/offlineStorage";

export const MAX_ATTEMPTS = 3;

export async function executeAction(
  action: QueuedAction,
  apiBase: string,
  signal?: AbortSignal,
): Promise<void> {
  switch (action.type) {
    case "TIP_INTENT": {
      const res = await fetch(`${apiBase}/tips/intents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action.payload),
        signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      break;
    }

    case "POST_COMMENT": {
      const { creatorUsername, ...body } = action.payload as {
        creatorUsername: string;
        body: string;
        parentId?: string;
      };
      const res = await fetch(`${apiBase}/creators/${creatorUsername}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      break;
    }

    case "TOGGLE_REACTION": {
      const { commentId, emoji } = action.payload as { commentId: string; emoji: string };
      const res = await fetch(`${apiBase}/comments/${commentId}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emoji }),
        signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      break;
    }

    default:
      throw new Error(`Unknown action type: ${(action as QueuedAction).type}`);
  }
}

export async function runSync(
  apiBase: string,
  signal?: AbortSignal,
  postMessageFn: (msg: unknown) => void = (msg) => self.postMessage(msg),
): Promise<{ synced: number; failed: number }> {
  postMessageFn({ type: "SYNC_STARTED" });

  const actions = await getPendingActions();
  let synced = 0;
  let failed = 0;

  for (const action of actions) {
    if (signal?.aborted) break;

    await updateAction(action.id, { status: "syncing" });

    try {
      await executeAction(action, apiBase, signal);
      await removeAction(action.id);
      synced++;
      postMessageFn({ type: "ACTION_SUCCESS", id: action.id });
    } catch (err) {
      if (signal?.aborted) {
        await updateAction(action.id, { status: "pending" });
        break;
      }

      const attempts = action.attempts + 1;
      const error = err instanceof Error ? err.message : String(err);

      if (attempts >= MAX_ATTEMPTS) {
        await updateAction(action.id, { status: "failed", attempts, error });
        failed++;
        postMessageFn({ type: "ACTION_FAILED", id: action.id, error });
      } else {
        // Back to pending for next sync cycle
        await updateAction(action.id, { status: "pending", attempts, error });
      }
    }
  }

  postMessageFn({ type: "SYNC_COMPLETE", synced, failed });
  return { synced, failed };
}

let activeAbortController: AbortController | null = null;

if (typeof self !== "undefined" && "addEventListener" in self) {
  self.addEventListener("message", async (e: MessageEvent) => {
    const { type, apiBase } = e.data as { type: string; apiBase?: string };

    if (type === "STOP") {
      if (activeAbortController) {
        activeAbortController.abort();
        activeAbortController = null;
      }
      return;
    }

    if (type === "START_SYNC" && apiBase) {
      try {
        activeAbortController = new AbortController();
        await runSync(apiBase, activeAbortController.signal);
      } catch (err) {
        self.postMessage({
          type: "ERROR",
          message: err instanceof Error ? err.message : "Sync failed",
        });
      } finally {
        activeAbortController = null;
      }
    }
  });
}

