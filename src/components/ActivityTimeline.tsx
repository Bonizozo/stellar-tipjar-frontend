"use client";

import { useCallback, useState } from "react";
import { InfiniteScroll } from "./InfiniteScroll";

export type ActivityType = "tip" | "follow" | "milestone" | "update";

export interface TimelineActivity {
  id: string;
  type: ActivityType;
  creator: string;
  timestamp: number;
  amount?: string;
  from?: string;
  memo?: string;
  milestone?: string;
  title?: string;
  body?: string;
}

interface ActivityTimelineProps {
  activities: TimelineActivity[];
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
  filter: ActivityType | "all";
  onFilterChange: (filter: ActivityType | "all") => void;
}

const TYPE_ICON: Record<ActivityType, string> = {
  tip: "💸",
  follow: "👥",
  milestone: "🏆",
  update: "📢",
};

const TYPE_COLOR: Record<ActivityType, string> = {
  tip: "bg-indigo-500",
  follow: "bg-blue-500",
  milestone: "bg-yellow-500",
  update: "bg-emerald-500",
};

const TYPE_LABEL: Record<ActivityType | "all", string> = {
  all: "All Activity",
  tip: "Tips",
  follow: "Follows",
  milestone: "Milestones",
  update: "Updates",
};

function formatTime(timestamp: number): string {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

function ActivityTimelineItem({ activity }: { activity: TimelineActivity }) {
  return (
    <div className="flex gap-4 pb-6">
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${TYPE_COLOR[activity.type]}`}
          aria-hidden="true"
        >
          {TYPE_ICON[activity.type]}
        </div>
        <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-700 mt-2" />
      </div>

      <div className="flex-1 min-w-0 pt-1">
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <span className="font-semibold text-gray-900 dark:text-white">
            @{activity.creator}
          </span>
          <time className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
            {formatTime(activity.timestamp)}
          </time>
        </div>

        {activity.type === "tip" && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Received{" "}
            <span className="font-medium text-indigo-600 dark:text-indigo-400">
              {activity.amount} XLM
            </span>
            {activity.from && (
              <>
                {" "}
                from <span className="font-mono text-xs">{activity.from}</span>
              </>
            )}
            {activity.memo && (
              <>
                {" "}
                · <em className="text-gray-500">"{activity.memo}"</em>
              </>
            )}
          </p>
        )}

        {activity.type === "follow" && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Gained a new follower
          </p>
        )}

        {activity.type === "milestone" && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {activity.milestone}
          </p>
        )}

        {activity.type === "update" && (
          <div className="mt-1">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {activity.title}
            </p>
            {activity.body && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {activity.body}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ActivityTimeline({
  activities,
  onLoadMore,
  hasMore,
  isLoading,
  filter,
  onFilterChange,
}: ActivityTimelineProps) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = useCallback(async () => {
    setIsLoadingMore(true);
    try {
      await onLoadMore();
    } finally {
      setIsLoadingMore(false);
    }
  }, [onLoadMore]);

  const filters: (ActivityType | "all")[] = ["all", "tip", "follow", "milestone", "update"];
  const filtered =
    filter === "all"
      ? activities
      : activities.filter((a) => a.type === filter);

  return (
    <section aria-label="Activity timeline">
      <div className="mb-6 flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            aria-pressed={filter === f}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {TYPE_LABEL[f]}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-12">No activity to display.</p>
      ) : (
        <InfiniteScroll
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          isLoading={isLoadingMore}
        >
          <div>
            {filtered.map((activity) => (
              <ActivityTimelineItem key={activity.id} activity={activity} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </section>
  );
}
