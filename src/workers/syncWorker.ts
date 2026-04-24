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

const MAX_ATTEMPTS = 3;

async function executeAction(
  action: QueuedAction,
  apiBase: string,
): Promise<void> {
  switch (action.type) {
    case "TIP_INTENT": {
      const res = await fetch(`${apiBase}/tips/intents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action.payload),
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
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      break;
    }

    default:
      throw new Error(`Unknown action type: ${(action as QueuedAction).type}`);
  }
}

async function runSync(apiBase: string): Promise<void> {
  self.postMessage({ type: "SYNC_STARTED" });

  const actions = await getPendingActions();
  let synced = 0;
  let failed = 0;

  for (const action of actions) {
    await updateAction(action.id, { status: "syncing" });

    try {
      await executeAction(action, apiBase);
      await removeAction(action.id);
      synced++;
      self.postMessage({ type: "ACTION_SUCCESS", id: action.id });
    } catch (err) {
      const attempts = action.attempts + 1;
      const error = err instanceof Error ? err.message : String(err);

      if (attempts >= MAX_ATTEMPTS) {
        await updateAction(action.id, { status: "failed", attempts, error });
        failed++;
        self.postMessage({ type: "ACTION_FAILED", id: action.id, error });
      } else {
        // Back to pending for next sync cycle
        await updateAction(action.id, { status: "pending", attempts, error });
      }
    }
  }

  self.postMessage({ type: "SYNC_COMPLETE", synced, failed });
}

self.addEventListener("message", async (e: MessageEvent) => {
  const { type, apiBase } = e.data as { type: string; apiBase?: string };

  if (type === "START_SYNC" && apiBase) {
    try {
      await runSync(apiBase);
    } catch (err) {
      self.postMessage({
        type: "ERROR",
        message: err instanceof Error ? err.message : "Sync failed",
      });
    }
  }
});
