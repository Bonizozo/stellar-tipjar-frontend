"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Trophy, Calendar, Gift, RotateCcw } from "lucide-react";
import { useTipStreak } from "@/hooks/useTipStreak";
import { StreakBadge } from "./StreakBadge";
import { StreakHistory } from "./StreakHistory";
import { Button } from "@/components/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StreakDashboardProps {
  username: string;
}

export function StreakDashboard({ username }: StreakDashboardProps) {
  const {
    streak,
    rewards,
    history,
    loading,
    nextMilestone,
    daysToNextMilestone,
    fetchStreak,
    recoverStreak,
    claimReward,
  } = useTipStreak(username);
  const reduced = useReducedMotion();

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-32 rounded-2xl bg-gray-200 dark:bg-gray-800" />
        <div className="h-24 rounded-2xl bg-gray-200 dark:bg-gray-800" />
      </div>
    );
  }

  if (!streak) return null;

  const progressToNext = nextMilestone
    ? Math.min(100, ((streak.currentStreak) / nextMilestone) * 100)
    : 100;

  return (
    <div className="space-y-4">
      {/* Main streak card */}
      <motion.div
        className="rounded-2xl border border-ink/10 dark:border-white/10 bg-[color:var(--surface)] p-6"
        initial={reduced ? {} : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-ink dark:text-white flex items-center gap-2">
              <Flame className="text-sunrise" size={20} />
              Tip Streak
            </h2>
            <p className="text-sm text-ink/60 dark:text-white/60 mt-0.5">
              Keep tipping daily to grow your streak
            </p>
          </div>
          <StreakBadge streak={streak.currentStreak} size="lg" animated />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <p className="text-2xl font-bold text-ink dark:text-white">{streak.currentStreak}</p>
            <p className="text-xs text-ink/50 dark:text-white/50">Current</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <p className="text-2xl font-bold text-ink dark:text-white">{streak.longestStreak}</p>
            <p className="text-xs text-ink/50 dark:text-white/50">Best</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <p className="text-2xl font-bold text-ink dark:text-white">{streak.totalTips}</p>
            <p className="text-xs text-ink/50 dark:text-white/50">Total Tips</p>
          </div>
        </div>

        {/* Progress to next milestone */}
        {nextMilestone && (
          <div>
            <div className="flex justify-between text-xs text-ink/60 dark:text-white/60 mb-1">
              <span>Progress to {nextMilestone}-day milestone</span>
              <span>{daysToNextMilestone} day{daysToNextMilestone !== 1 ? "s" : ""} to go</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sunrise to-wave"
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* Recovery */}
        {streak.recoveryAvailable && (
          <div className="mt-4 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RotateCcw size={16} className="text-yellow-600 dark:text-yellow-400" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Streak Recovery Available</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-500">Restore your streak before it expires</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={recoverStreak}>
                Recover
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Rewards */}
      <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-[color:var(--surface)] p-6">
        <h3 className="text-base font-bold text-ink dark:text-white flex items-center gap-2 mb-4">
          <Trophy size={16} className="text-wave" />
          Streak Rewards
        </h3>
        <div className="space-y-2">
          {rewards.map((reward) => {
            const unlocked = streak.currentStreak >= reward.streakMilestone;
            const canClaim = unlocked && !reward.claimed;
            return (
              <div
                key={reward.streakMilestone}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                  unlocked
                    ? "bg-wave/5 border border-wave/20"
                    : "bg-gray-50 dark:bg-gray-800/50 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    reward.claimed
                      ? "bg-green-100 dark:bg-green-900/30"
                      : unlocked
                      ? "bg-wave/20"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}>
                    {reward.claimed ? "✓" : <Gift size={14} className={unlocked ? "text-wave" : "text-gray-400"} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink dark:text-white">{reward.rewardValue}</p>
                    <p className="text-xs text-ink/50 dark:text-white/50">{reward.streakMilestone}-day streak</p>
                  </div>
                </div>
                {canClaim && (
                  <Button size="xs" variant="primary" onClick={() => claimReward(reward.streakMilestone)}>
                    Claim
                  </Button>
                )}
                {reward.claimed && (
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">Claimed</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* History */}
      <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-[color:var(--surface)] p-6">
        <h3 className="text-base font-bold text-ink dark:text-white flex items-center gap-2 mb-4">
          <Calendar size={16} className="text-moss" />
          Streak History
        </h3>
        <StreakHistory entries={history} />
      </div>
    </div>
  );
}
