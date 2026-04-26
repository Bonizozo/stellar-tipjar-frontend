"use client";

import { ProgressBar } from "@/components/Progress/ProgressBar";
import type { Achievement } from "@/hooks/useGamification";

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const pct = Math.min((achievement.progress / achievement.target) * 100, 100);

  return (
    <div className={`rounded-2xl border p-4 transition-colors ${achievement.completed ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20" : "border-ink/10 bg-[color:var(--surface)]"}`}>
      <div className="flex items-start gap-3">
        <span className="text-3xl" aria-hidden="true">{achievement.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-ink text-sm">{achievement.name}</p>
            <span className="shrink-0 text-xs font-medium text-wave">+{achievement.xpReward} XP</span>
          </div>
          <p className="text-xs text-ink/50 mt-0.5">{achievement.description}</p>
          <div className="mt-2">
            <ProgressBar
              progress={achievement.progress}
              max={achievement.target}
              color={achievement.completed ? "success" : "wave"}
              size="sm"
              showPercentage={false}
            />
            <p className="mt-1 text-xs text-ink/50 text-right">
              {achievement.completed ? "Completed!" : `${achievement.progress} / ${achievement.target}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
