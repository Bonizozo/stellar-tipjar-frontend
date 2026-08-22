"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressBar } from "@/components/Progress/ProgressBar";
import type { Achievement, AchievementCategory } from "@/types/gamification";

const categoryLabel: Record<AchievementCategory, string> = {
  tipping:   "Tipping",
  social:    "Social",
  streak:    "Streak",
  milestone: "Milestone",
};

const categoryColor: Record<AchievementCategory, string> = {
  tipping:   "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  social:    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  streak:    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  milestone: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

type FilterOption = "all" | AchievementCategory | "completed" | "in-progress";

interface AchievementListProps {
  achievements: Achievement[];
}

export function AchievementList({ achievements }: AchievementListProps) {
  const [filter, setFilter] = useState<FilterOption>("all");

  const filters: { value: FilterOption; label: string }[] = [
    { value: "all", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "in-progress", label: "In Progress" },
    { value: "tipping", label: "Tipping" },
    { value: "social", label: "Social" },
    { value: "streak", label: "Streak" },
    { value: "milestone", label: "Milestone" },
  ];

  const filtered = achievements
    .filter((a) => {
      if (filter === "all") return true;
      if (filter === "completed") return a.completed;
      if (filter === "in-progress") return !a.completed && a.progress > 0;
      return a.category === filter;
    })
    .sort((a, b) => {
      // Completed last, then by progress percentage desc
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const aPct = a.progress / a.target;
      const bPct = b.progress / b.target;
      return bPct - aPct;
    });

  const completedCount = achievements.filter((a) => a.completed).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/50">
          {completedCount} / {achievements.length} completed
        </p>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filter === f.value
                  ? "bg-wave text-white"
                  : "bg-ink/5 text-ink/60 hover:bg-ink/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid gap-3 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((achievement) => {
            const pct = Math.min((achievement.progress / achievement.target) * 100, 100);
            return (
              <motion.div
                key={achievement.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`rounded-2xl border p-4 transition-colors ${
                  achievement.completed
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                    : "border-ink/10 bg-[color:var(--surface)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0" aria-hidden="true">{achievement.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="font-semibold text-ink text-sm">{achievement.name}</p>
                        <span className={`inline-block mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${categoryColor[achievement.category]}`}>
                          {categoryLabel[achievement.category]}
                        </span>
                      </div>
                      <span className="shrink-0 text-xs font-bold text-wave">+{achievement.xpReward} XP</span>
                    </div>
                    <p className="text-xs text-ink/50 mt-1">{achievement.description}</p>
                    <div className="mt-2">
                      <ProgressBar
                        progress={pct}
                        max={100}
                        color={achievement.completed ? "success" : "wave"}
                        size="sm"
                        showPercentage={false}
                      />
                      <p className="mt-1 text-xs text-ink/50 text-right">
                        {achievement.completed
                          ? "✓ Completed"
                          : `${achievement.progress.toLocaleString()} / ${achievement.target.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-ink/40">
          <p className="text-4xl mb-2">🎯</p>
          <p className="text-sm">No achievements match this filter</p>
        </div>
      )}
    </div>
  );
}
