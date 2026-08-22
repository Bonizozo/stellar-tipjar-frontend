"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Reward, RewardType } from "@/types/gamification";

const typeLabel: Record<RewardType, string> = {
  cosmetic:  "Cosmetic",
  feature:   "Feature",
  discount:  "Discount",
  exclusive: "Exclusive",
};

const typeColor: Record<RewardType, string> = {
  cosmetic:  "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  feature:   "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  discount:  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  exclusive: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
};

interface RewardsShopProps {
  rewards: Reward[];
  totalXP: number;
  onClaim: (rewardId: string) => Promise<void>;
}

export function RewardsShop({ rewards, totalXP, onClaim }: RewardsShopProps) {
  const [claiming, setClaiming] = useState<string | null>(null);
  const [justClaimed, setJustClaimed] = useState<string | null>(null);

  const handleClaim = async (reward: Reward) => {
    if (!reward.available || reward.claimed || claiming) return;
    setClaiming(reward.id);
    try {
      await onClaim(reward.id);
      setJustClaimed(reward.id);
      setTimeout(() => setJustClaimed(null), 2000);
    } finally {
      setClaiming(null);
    }
  };

  const available = rewards.filter((r) => r.available && !r.claimed);
  const locked = rewards.filter((r) => !r.available && !r.claimed);
  const claimed = rewards.filter((r) => r.claimed);

  return (
    <div className="space-y-6">
      {/* Available */}
      {available.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-ink/60 uppercase tracking-wide mb-3">
            Available to Claim
          </h3>
          <div className="space-y-3">
            {available.map((reward) => (
              <RewardRow
                key={reward.id}
                reward={reward}
                totalXP={totalXP}
                isClaiming={claiming === reward.id}
                justClaimed={justClaimed === reward.id}
                onClaim={() => handleClaim(reward)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-ink/60 uppercase tracking-wide mb-3">
            Locked
          </h3>
          <div className="space-y-3">
            {locked.map((reward) => (
              <RewardRow
                key={reward.id}
                reward={reward}
                totalXP={totalXP}
                isClaiming={false}
                justClaimed={false}
                onClaim={() => {}}
              />
            ))}
          </div>
        </div>
      )}

      {/* Claimed */}
      {claimed.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-ink/60 uppercase tracking-wide mb-3">
            Claimed
          </h3>
          <div className="space-y-3">
            {claimed.map((reward) => (
              <RewardRow
                key={reward.id}
                reward={reward}
                totalXP={totalXP}
                isClaiming={false}
                justClaimed={false}
                onClaim={() => {}}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface RewardRowProps {
  reward: Reward;
  totalXP: number;
  isClaiming: boolean;
  justClaimed: boolean;
  onClaim: () => void;
}

function RewardRow({ reward, totalXP, isClaiming, justClaimed, onClaim }: RewardRowProps) {
  const xpShort = reward.available ? 0 : reward.xpCost - totalXP;

  return (
    <motion.div
      layout
      className={`flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
        reward.claimed
          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
          : reward.available
          ? "border-wave/30 bg-wave/5"
          : "border-ink/10 bg-[color:var(--surface)] opacity-60"
      }`}
    >
      <span className="text-3xl shrink-0" aria-hidden="true">{reward.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-ink text-sm">{reward.name}</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeColor[reward.type]}`}>
            {typeLabel[reward.type]}
          </span>
        </div>
        <p className="text-xs text-ink/50 mt-0.5">{reward.description}</p>
        {!reward.available && (
          <p className="text-xs text-ink/40 mt-1">
            Need {xpShort.toLocaleString()} more XP
          </p>
        )}
      </div>

      <div className="shrink-0">
        <AnimatePresence mode="wait">
          {reward.claimed ? (
            <motion.span
              key="claimed"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white"
            >
              Claimed ✓
            </motion.span>
          ) : reward.available ? (
            <motion.button
              key="claim"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClaim}
              disabled={isClaiming}
              className="rounded-full bg-wave px-4 py-1.5 text-xs font-semibold text-white hover:bg-wave/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isClaiming ? (
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Claiming…
                </span>
              ) : justClaimed ? (
                "Claimed! 🎉"
              ) : (
                `Claim · ${reward.xpCost.toLocaleString()} XP`
              )}
            </motion.button>
          ) : (
            <span className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink/40">
              {reward.xpCost.toLocaleString()} XP
            </span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
