"use client";

import type { StreakHistoryEntry } from "@/types/streak";

interface StreakHistoryProps {
  entries: StreakHistoryEntry[];
}

export function StreakHistory({ entries }: StreakHistoryProps) {
  if (!entries.length) {
    return <p className="text-sm text-ink/50 dark:text-white/50 text-center py-4">No history yet</p>;
  }

  return (
    <div className="grid grid-cols-7 gap-1.5" role="list" aria-label="Streak history">
      {entries.slice(0, 14).map((entry, i) => {
        const date = new Date(entry.date);
        const label = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
        return (
          <div
            key={i}
            role="listitem"
            title={`${label}: ${entry.tipped ? `Tipped ${entry.amount ?? ""} XLM` : "No tip"}`}
            className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
              entry.tipped
                ? "bg-sunrise/20 text-sunrise border border-sunrise/30"
                : "bg-gray-100 dark:bg-gray-800 text-ink/30 dark:text-white/30"
            }`}
            aria-label={`${label}: ${entry.tipped ? "tipped" : "no tip"}`}
          >
            {entry.tipped ? "🔥" : "·"}
          </div>
        );
      })}
    </div>
  );
}
