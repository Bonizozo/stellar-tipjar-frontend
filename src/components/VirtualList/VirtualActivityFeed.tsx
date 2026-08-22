"use client";

import { useRef, useCallback } from "react";
import { useVirtualScroll } from "@/hooks/useVirtualScroll";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { ActivityItem, ActivityType } from "@/services/activityService";
import { truncateMiddle } from "@/utils/format";

// ─── Constants ────────────────────────────────────────────────────────────────

const VIEWPORT_HEIGHT = 600;
const ESTIMATED_ITEM_HEIGHT = 88;

// ─── Item renderers ───────────────────────────────────────────────────────────

const TYPE_ICON: Record<ActivityType, string> = {
  tip: "💸",
  milestone: "🏆",
  update: "📢",
};

const TYPE_COLOR: Record<ActivityType, string> = {
  tip: "bg-indigo-500",
  milestone: "bg-yellow-500",
  update: "bg-emerald-500",
};

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function ActivityCard({
  item,
  measureRef,
}: {
  item: ActivityItem;
  measureRef: (node: HTMLElement | null) => void;
}) {
  return (
    <div ref={measureRef} className="flex gap-4 items-start px-4 py-3">
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg ${TYPE_COLOR[item.type]}`}
          aria-hidden="true"
        >
          {TYPE_ICON[item.type]}
        </span>
        <div className="mt-1 w-px flex-1 bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pb-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-semibold text-gray-900 dark:text-white">
            @{item.creator}
          </span>
          <time className="shrink-0 text-xs text-gray-400">
            {timeAgo(item.timestamp)}
          </time>
        </div>

        {item.type === "tip" && (
          <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">
            Received{" "}
            <span className="font-medium text-indigo-600 dark:text-indigo-400">
              {item.amount} XLM
            </span>
            {item.from && (
              <>
                {" "}
                from{" "}
                <span className="font-mono">{truncateMiddle(item.from)}</span>
              </>
            )}
            {item.memo && (
              <>
                {" "}
                · <em className="text-gray-500">"{item.memo}"</em>
              </>
            )}
          </p>
        )}

        {item.type === "milestone" && (
          <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">
            {item.milestone}
          </p>
        )}

        {item.type === "update" && (
          <div className="mt-0.5">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {item.title}
            </p>
            {item.body && (
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                {item.body}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface VirtualActivityFeedProps {
  items: ActivityItem[];
  filter: ActivityType | "all";
  onFilterChange: (f: ActivityType | "all") => void;
  loading: boolean;
  connectionStatus: string;
  /** Called when user scrolls near the top (for loading older items) */
  onLoadOlder?: () => void;
  /** Called when user scrolls near the bottom (for loading newer items) */
  onLoadNewer?: () => void;
  scrollRestorationKey?: string;
}

const FILTER_LABELS: Record<ActivityType | "all", string> = {
  all: "All",
  tip: "Tips",
  milestone: "Milestones",
  update: "Updates",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Virtualised activity feed with dynamic item heights.
 *
 * Each ActivityCard has variable height depending on content (memo text,
 * body copy, etc.). The virtualiser measures each rendered item via
 * ResizeObserver and updates the layout accordingly.
 *
 * Bidirectional scrolling: onLoadOlder fires when near the top,
 * onLoadNewer fires when near the bottom.
 */
export function VirtualActivityFeed({
  items,
  filter,
  onFilterChange,
  loading,
  connectionStatus,
  onLoadOlder,
  onLoadNewer,
  scrollRestorationKey = "activity-feed",
}: VirtualActivityFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { virtualItems, totalSize, paddingStart, paddingEnd, isScrolling } =
    useVirtualScroll({
      count: items.length,
      estimatedItemHeight: ESTIMATED_ITEM_HEIGHT,
      overscan: 4,
      scrollContainerRef: containerRef,
      onEndReached: onLoadNewer,
      endReachedThreshold: 5,
    });

  useScrollRestoration(scrollRestorationKey, containerRef, !loading);

  // Bidirectional: detect scroll near top for loading older items
  const handleScroll = useCallback(() => {
    if (!onLoadOlder || !containerRef.current) return;
    if (containerRef.current.scrollTop < 120) {
      onLoadOlder();
    }
  }, [onLoadOlder]);

  const filters: (ActivityType | "all")[] = [
    "all",
    "tip",
    "milestone",
    "update",
  ];

  return (
    <section aria-label="Activity feed">
      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter activities"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              aria-pressed={filter === f}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            connectionStatus === "connected"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
          aria-live="polite"
        >
          {connectionStatus === "connected" ? "● Live" : "○ Offline"}
        </span>
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex animate-pulse gap-4 px-4 py-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="py-12 text-center text-gray-400">No activity yet.</p>
      ) : (
        /* Virtualised list */
        <div
          ref={containerRef}
          style={{
            height: VIEWPORT_HEIGHT,
            overflowY: "auto",
            position: "relative",
          }}
          onScroll={handleScroll}
          role="feed"
          aria-label="Activity items"
          aria-busy={loading}
        >
          {/* Full scrollable height */}
          <div style={{ height: totalSize, position: "relative" }}>
            {/* Rendered items offset to their virtual position */}
            <div style={{ transform: `translateY(${paddingStart}px)` }}>
              {virtualItems.map((virtualItem) => {
                const item = items[virtualItem.index];
                if (!item) return null;
                return (
                  <ActivityCard
                    key={item.id}
                    item={item}
                    measureRef={virtualItem.measureRef as any}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Item count */}
      {!loading && items.length > 0 && (
        <p className="mt-3 text-center text-xs text-gray-400">
          Showing {items.length} item{items.length !== 1 ? "s" : ""} · virtual
          scroll active
        </p>
      )}
    </section>
  );
}
