"use client";

/**
 * useOfflineQueue
 * Exposes offline detection, action queuing, and sync triggering to components.
 *
 * Usage:
 *   const { isOnline, queuedCount, enqueue, sync } = useOfflineQueue();
 */

import { useCallback, useEffect, useRef, useState } from "react";

import {
  enqueueAction,
  getAllActions,
  clearCompletedActions,
  type ActionType,
  type QueuedAction,
} from "@/utils/offlineStorage";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface SyncResult {
  synced: number;
  failed: number;
}

interface UseOfflineQueueReturn {
  isOnline: boolean;
  isSyncing: boolean;
  queuedCount: number;
  failedCount: number;
  actions: QueuedAction[];
  /** Queue an action to be executed when online */
  enqueue: (type: ActionType, payload: Record<string, unknown>) => Promise<QueuedAction>;
  /** Manually trigger a sync (also fires automatically on reconnect) */
  sync: () => Promise<SyncResult>;
  clearCompleted: () => Promise<void>;
}

export function useOfflineQueue(): UseOfflineQueueReturn {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );
  const [isSyncing, setIsSyncing] = useState(false);
  const [actions, setActions] = useState<QueuedAction[]>([]);
  const workerRef = useRef<Worker | null>(null);

  // ─── Load queue from IndexedDB ──────────────────────────────────────────────
  const refreshActions = useCallback(async () => {
    const all = await getAllActions();
    setActions(all);
  }, []);

  useEffect(() => {
    refreshActions();
  }, [refreshActions]);

  // ─── Worker setup ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const worker = new Worker(new URL("../workers/syncWorker.ts", import.meta.url));
    workerRef.current = worker;

    worker.addEventListener("message", (e: MessageEvent) => {
      const { type } = e.data as { type: string };
      if (type === "ACTION_SUCCESS" || type === "ACTION_FAILED" || type === "SYNC_COMPLETE") {
        refreshActions();
      }
      if (type === "SYNC_COMPLETE" || type === "ERROR") {
        setIsSyncing(false);
      }
    });

    // Also listen for Service Worker messages
    const handleSWMessage = (event: MessageEvent) => {
      if (event.data?.type === "SYNC_COMPLETE") {
        refreshActions();
        setIsSyncing(false);
      }
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", handleSWMessage);
    }

    return () => {
      worker.terminate();
      workerRef.current = null;
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.removeEventListener("message", handleSWMessage);
      }
    };
  }, [refreshActions]);

  // ─── Online / offline listeners ─────────────────────────────────────────────
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Auto-sync when connection is restored
      triggerSync();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Sync trigger ────────────────────────────────────────────────────────────
  function triggerSync(): Promise<SyncResult> {
    return new Promise((resolve) => {
      const worker = workerRef.current;
      if (!worker || isSyncing) {
        resolve({ synced: 0, failed: 0 });
        return;
      }

      setIsSyncing(true);

      const handler = (e: MessageEvent) => {
        const msg = e.data as { type: string; synced?: number; failed?: number };
        if (msg.type === "SYNC_COMPLETE") {
          worker.removeEventListener("message", handler);
          resolve({ synced: msg.synced ?? 0, failed: msg.failed ?? 0 });
        } else if (msg.type === "ERROR") {
          worker.removeEventListener("message", handler);
          resolve({ synced: 0, failed: 0 });
        }
      };

      worker.addEventListener("message", handler);
      worker.postMessage({ type: "START_SYNC", apiBase: API_BASE });
    });
  }

  // ─── Public API ──────────────────────────────────────────────────────────────
  const enqueue = useCallback(
    async (type: ActionType, payload: Record<string, unknown>): Promise<QueuedAction> => {
      const action = await enqueueAction(type, payload);
      await refreshActions();
      return action;
    },
    [refreshActions],
  );

  const sync = useCallback((): Promise<SyncResult> => {
    return triggerSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSyncing]);

  const clearCompleted = useCallback(async () => {
    await clearCompletedActions();
    await refreshActions();
  }, [refreshActions]);

  const queuedCount = actions.filter((a: QueuedAction) => a.status === "pending").length;
  const failedCount = actions.filter((a: QueuedAction) => a.status === "failed").length;

  return {
    isOnline,
    isSyncing,
    queuedCount,
    failedCount,
    actions,
    enqueue,
    sync,
    clearCompleted,
  };
}
