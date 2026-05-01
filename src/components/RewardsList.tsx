"use client";

import type { Reward } from "@/types/gamification";

interface RewardsListProps {
  rewards: Reward[];
  totalXP: number;
}

export function RewardsList({ rewards, totalXP }: RewardsListProps) {
  return (
    <div className="space-y-3">
      {rewards.map((reward) => (
        <div
          key={reward.id}
          className={`flex items-center gap-4 rounded-2xl border p-4 transition-opacity ${
            reward.claimed
              ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
              : reward.available
              ? "border-wave/30 bg-wave/5"
              : "border-ink/10 bg-[color:var(--surface)] opacity-50"
          }`}
        >
          <span className="text-3xl shrink-0" aria-hidden="true">{reward.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-ink text-sm">{reward.name}</p>
            <p className="text-xs text-ink/50">{reward.description}</p>
            {!reward.available && (
              <p className="text-xs text-ink/40 mt-0.5">
                Requires {reward.xpCost} XP — you need {reward.xpCost - totalXP} more
              </p>
            )}
          </div>
          <div className="shrink-0">
            {reward.claimed ? (
              <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">Claimed</span>
            ) : reward.available ? (
              <button
                type="button"
                className="rounded-full bg-wave px-3 py-1 text-xs font-semibold text-white hover:bg-wave/90 transition-colors"
                onClick={() => alert(`Claiming "${reward.name}" — connect to backend to persist.`)}
              >
                Claim
              </button>
            ) : (
              <span className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink/40">{reward.xpCost} XP</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
