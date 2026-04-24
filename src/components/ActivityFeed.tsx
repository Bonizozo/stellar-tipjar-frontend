"use client";

import { ActivityItem, ActivityType } from "@/services/activityService";
import { truncateMiddle } from "@/utils/format";

const TYPE_LABELS: Record<ActivityType | "all", string> = {
  all: "All",
  tip: "Tips",
  milestone: "Milestones",
  update: "Updates",
};

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

function ActivityCard({ item }: { item: ActivityItem }) {
  return (
    <div className="flex gap-4 items-start">
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <span
          className={`w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 ${TYPE_COLOR[item.type]}`}
          aria-hidden="true"
        >
          {TYPE_ICON[item.type]}
        </span>
        <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-1" />
      </div>

      {/* Content */}
      <div className="pb-6 flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <span className="font-semibold text-gray-900 dark:text-white">@{item.creator}</span>
          <time className="text-xs text-gray-400 shrink-0">{timeAgo(item.timestamp)}</time>
        </div>

        {item.type === "tip" && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
            Received <span className="font-medium text-indigo-600 dark:text-indigo-400">{item.amount} XLM</span>
            {item.from && <> from <span className="font-mono">{truncateMiddle(item.from)}</span></>}
            {item.memo && <> · <em className="text-gray-500">"{item.memo}"</em></>}
          </p>
        )}

        {item.type === "milestone" && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{item.milestone}</p>
        )}

        {item.type === "update" && (
          <div className="mt-0.5">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.title}</p>
            {item.body && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{item.body}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

interface ActivityFeedProps {
  items: ActivityItem[];
  filter: ActivityType | "all";
  onFilterChange: (f: ActivityType | "all") => void;
  loading: boolean;
  connectionStatus: string;
}

export function ActivityFeed({ items, filter, onFilterChange, loading, connectionStatus }: ActivityFeedProps) {
  const filters: (ActivityType | "all")[] = ["all", "tip", "milestone", "update"];

  return (
    <section aria-label="Activity feed">
      {/* Filter bar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter activities">
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
              {TYPE_LABELS[f]}
            </button>
          ))}
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            connectionStatus === "connected"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
          }`}
          aria-live="polite"
        >
          {connectionStatus === "connected" ? "● Live" : "○ Offline"}
        </span>
      </div>

      {/* Timeline */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-400 py-12">No activity yet.</p>
      ) : (
        <div>
          {items.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
