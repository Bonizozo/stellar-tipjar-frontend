"use client";

import { ProgressBar } from "@/components/Progress/ProgressBar";
import type { Level } from "@/hooks/useGamification";

interface LevelProgressProps {
  totalXP: number;
  currentLevel: Level;
  nextLevel: Level;
  levelProgress: number;
  xpIntoLevel: number;
  xpNeeded: number;
}

export function LevelProgress({ totalXP, currentLevel, nextLevel, levelProgress, xpIntoLevel, xpNeeded }: LevelProgressProps) {
  const isMax = currentLevel.level === 5;

  return (
    <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Current Level</p>
          <p className={`text-2xl font-bold ${currentLevel.color}`}>
            Lv.{currentLevel.level} — {currentLevel.title}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-ink/40">Total XP</p>
          <p className="text-xl font-bold text-ink">{totalXP.toLocaleString()}</p>
        </div>
      </div>

      <ProgressBar
        progress={levelProgress}
        max={100}
        color="wave"
        size="lg"
        showPercentage={!isMax}
        label={isMax ? "Max Level Reached 🎉" : `${xpIntoLevel} / ${xpNeeded} XP to Lv.${nextLevel.level}`}
      />

      {!isMax && (
        <p className="mt-2 text-xs text-ink/40 text-right">
          Next: <span className={`font-semibold ${nextLevel.color}`}>{nextLevel.title}</span>
        </p>
      )}
    </div>
  );
}
