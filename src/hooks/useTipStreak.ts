"use client";

import { useState, useCallback } from "react";
import type { TipStreak, StreakReward, StreakHistoryEntry } from "@/types/streak";

const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100];

function getMockStreak(): TipStreak {
  return {
    currentStreak: 7,
    longestStreak: 14,
    lastTipDate: new Date(Date.now() - 86400000).toISOString(),
    streakStartDate: new Date(Date.now() - 7 * 86400000).toISOString(),
    totalTips: 42,
    recoveryAvailable: false,
    recoveryExpiresAt: null,
  };
}

function getMockRewards(): StreakReward[] {
  return STREAK_MILESTONES.map((milestone, i) => ({
    streakMilestone: milestone,
    rewardType: i % 2 === 0 ? "badge" : "bonus",
    rewardValue: i % 2 === 0 ? `${milestone}-day Streak Badge` : `${milestone * 2}% tip bonus`,
    claimed: milestone <= 7,
    claimedAt: milestone <= 7 ? new Date().toISOString() : undefined,
  }));
}

function getMockHistory(): StreakHistoryEntry[] {
  return Array.from({ length: 14 }, (_, i) => ({
    date: new Date(Date.now() - i * 86400000).toISOString(),
    tipped: i !== 2 && i !== 8,
    amount: i !== 2 && i !== 8 ? String((Math.random() * 10 + 1).toFixed(2)) : undefined,
    creatorUsername: i !== 2 && i !== 8 ? "creator_example" : undefined,
  }));
}

export function useTipStreak(username?: string) {
  const [streak, setStreak] = useState<TipStreak | null>(null);
  const [rewards, setRewards] = useState<StreakReward[]>([]);
  const [history, setHistory] = useState<StreakHistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStreak = useCallback(async () => {
    if (!username) return;
    setLoading(true);
    setError(null);
    try {
      const [streakRes, rewardsRes, historyRes] = await Promise.all([
        fetch(`/api/users/${username}/streak`),
        fetch(`/api/users/${username}/streak/rewards`),
        fetch(`/api/users/${username}/streak/history`),
      ]);
      if (streakRes.ok) {
        setStreak(await streakRes.json());
      } else {
        setStreak(getMockStreak());
      }
      if (rewardsRes.ok) {
        setRewards(await rewardsRes.json());
      } else {
        setRewards(getMockRewards());
      }
      if (historyRes.ok) {
        setHistory(await historyRes.json());
      } else {
        setHistory(getMockHistory());
      }
    } catch {
      setStreak(getMockStreak());
      setRewards(getMockRewards());
      setHistory(getMockHistory());
      setError("Failed to load streak data");
    } finally {
      setLoading(false);
    }
  }, [username]);

  const recoverStreak = useCallback(async () => {
    if (!username || !streak?.recoveryAvailable) return false;
    try {
      const res = await fetch(`/api/users/${username}/streak/recover`, { method: "POST" });
      if (res.ok) {
        setStreak((prev) =>
          prev ? { ...prev, recoveryAvailable: false, currentStreak: prev.currentStreak + 1 } : prev
        );
        return true;
      }
    } catch {
      // silently fail
    }
    return false;
  }, [username, streak]);

  const claimReward = useCallback(
    async (milestone: number) => {
      if (!username) return false;
      try {
        const res = await fetch(`/api/users/${username}/streak/rewards/${milestone}/claim`, {
          method: "POST",
        });
        if (res.ok) {
          setRewards((prev) =>
            prev.map((r) =>
              r.streakMilestone === milestone
                ? { ...r, claimed: true, claimedAt: new Date().toISOString() }
                : r
            )
          );
          return true;
        }
      } catch {
        // silently fail
      }
      return false;
    },
    [username]
  );

  const nextMilestone = STREAK_MILESTONES.find(
    (m) => m > (streak?.currentStreak ?? 0)
  ) ?? null;

  const daysToNextMilestone = nextMilestone
    ? nextMilestone - (streak?.currentStreak ?? 0)
    : null;

  return {
    streak,
    rewards,
    history,
    loading,
    error,
    nextMilestone,
    daysToNextMilestone,
    fetchStreak,
    recoverStreak,
    claimReward,
  };
}
