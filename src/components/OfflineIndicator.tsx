"use client";

import { useEffect, useState } from "react";
import { useOfflineQueue } from "@/hooks/useOfflineQueue";

export function OfflineIndicator() {
  const { isOnline, isSyncing, queuedCount, failedCount, sync } = useOfflineQueue();
  // Delay showing "back online" banner briefly so it doesn't flash on fast connections
  const [showOnlineBanner, setShowOnlineBanner] = useState(false);

  useEffect(() => {
    if (isOnline && (queuedCount > 0 || isSyncing)) {
      setShowOnlineBanner(true);
      const t = setTimeout(() => setShowOnlineBanner(false), 4000);
      return () => clearTimeout(t);
    }
    setShowOnlineBanner(false);
  }, [isOnline, isSyncing, queuedCount]);

  // Nothing to show when online and queue is empty
  if (isOnline && !showOnlineBanner && failedCount === 0) return null;

  // ─── Offline banner ──────────────────────────────────────────────────────────
  if (!isOnline) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-[color:var(--surface)] px-4 py-3 shadow-lg">
          <span className="flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-error/60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-error" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink">You're offline</p>
            {queuedCount > 0 && (
              <p className="text-xs text-ink/60 truncate">
                {queuedCount} action{queuedCount !== 1 ? "s" : ""} queued — will sync on reconnect
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── Syncing / back online banner ────────────────────────────────────────────
  if (showOnlineBanner) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-[color:var(--surface)] px-4 py-3 shadow-lg">
          {isSyncing ? (
            <svg
              className="h-4 w-4 shrink-0 animate-spin text-wave"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
            </svg>
          ) : (
            <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-success" />
          )}
          <p className="text-sm font-medium text-ink">
            {isSyncing ? "Syncing queued actions…" : "Back online — synced"}
          </p>
        </div>
      </div>
    );
  }

  // ─── Failed actions warning ──────────────────────────────────────────────────
  if (failedCount > 0) {
    return (
      <div
        role="alert"
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-error/20 bg-[color:var(--surface)] px-4 py-3 shadow-lg">
          <svg
            className="h-4 w-4 shrink-0 text-error"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink">
              {failedCount} action{failedCount !== 1 ? "s" : ""} failed to sync
            </p>
            <p className="text-xs text-ink/60">Check your connection and try again</p>
          </div>
          <button
            onClick={() => sync()}
            className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-wave hover:bg-wave/10 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return null;
}
