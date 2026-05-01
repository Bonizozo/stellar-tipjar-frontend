"use client";

/**
 * useGamification — lightweight hook for components that need gamification
 * data without the full context provider (e.g. profile cards, tip wizard).
 *
 * For the full gamification page, use GamificationContext instead.
 */

import { useMemo } from "react";
import { useTips, type Tip } from "@/hooks/queries/useTips";
import {
  calculateXP,
  getLevel,
  getNextLevel,
  buildBadges,
  buildAchievements,
  buildRewards,
} from "@/services/gamificationService";

// Re-export types from the canonical types file for backward compatibility
export type { GamificationBadge, Achievement, Level, Reward } from "@/types/gamification";

export function useGamification() {
  const { data: tips = [], isLoading } = useTips();

  return useMemo(() => {
    const completedTips = tips.filter((t: Tip) => t.status === "completed");
    const totalTipped = completedTips.reduce((s: number, t: Tip) => s + t.amount, 0);
    const uniqueRecipients = new Set(completedTips.map((t: Tip) => t.recipient)).size;
    const tipCount = completedTips.length;
    const streak = 0; // streak comes from useTipStreak — default 0 here

    const totalXP = calculateXP(tipCount, totalTipped, streak);
    const currentLevel = getLevel(totalXP);
    const nextLevel = getNextLevel(currentLevel);
    const xpIntoLevel = totalXP - currentLevel.minXP;
    const xpNeeded = (nextLevel?.minXP ?? currentLevel.minXP) - currentLevel.minXP || 1;
    const levelProgress =
      currentLevel.level === 5 ? 100 : Math.min((xpIntoLevel / xpNeeded) * 100, 100);

    const badges = buildBadges(tipCount, totalTipped, uniqueRecipients, currentLevel.level, streak);
    const achievements = buildAchievements(tipCount, totalTipped, uniqueRecipients, streak);
    const rewards = buildRewards(totalXP, []);

    return {
      isLoading,
      totalXP,
      currentLevel,
      nextLevel,
      levelProgress,
      xpIntoLevel,
      xpNeeded,
      badges,
      achievements,
      rewards,
      stats: { tipCount, totalTipped, uniqueRecipients, currentStreak: streak },
    };
  }, [tips, isLoading]);
}
