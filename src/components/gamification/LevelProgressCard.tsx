"use client";

import { motion } from "framer-motion";
import { ProgressBar } from "@/components/Progress/ProgressBar";
import { LevelBadge } from "./LevelBadge";
import type { Level } from "@/types/gamification";

interface LevelProgressCardProps {
  totalXP: number;
  currentLevel: Level;
  nextLevel: Level | null;
  levelProgress: number;
  xpIntoLevel: number;
  xpNeeded: number;
}

export function LevelProgressCard({
  totalXP,
  currentLevel,
  nextLevel,
  levelProgress,
  xpIntoLevel,
  xpNeeded,
}: LevelProgressCardProps) {
  const isMax = currentLevel.level === 5;

  return (
    <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
      <div className="flex items-center gap-4 mb-5">
        <LevelBadge level={currentLevel} size="lg" animated />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Current Level</p>
          <p className={`text-2xl font-bold ${currentLevel.color}`}>
            Lv.{currentLevel.level} — {currentLevel.title}
          </p>
          <p className="text-sm text-ink/50 mt-0.5">
            {totalXP.toLocaleString()} XP total
          </p>
        </div>
        {nextLevel && (
          <div className="hidden sm:flex flex-col items-center gap-1 opacity-50">
            <LevelBadge level={nextLevel} size="sm" />
            <p className="text-xs text-ink/40">Next</p>
          </div>
        )}
      </div>

      <ProgressBar
        progress={levelProgress}
        max={100}
        color="wave"
        size="lg"
        showPercentage={!isMax}
        label={
          isMax
            ? "Max Level Reached 🎉"
            : `${xpIntoLevel.toLocaleString()} / ${xpNeeded.toLocaleString()} XP to Lv.${nextLevel?.level}`
        }
      />

      {!isMax && nextLevel && (
        <div className="mt-3 flex items-center justify-between text-xs text-ink/40">
          <span>{currentLevel.title}</span>
          <motion.span
            className={`font-semibold ${nextLevel.color}`}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {nextLevel.title} →
          </motion.span>
        </div>
      )}
    </div>
  );
}
