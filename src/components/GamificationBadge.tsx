"use client";

import type { GamificationBadge } from "@/hooks/useGamification";

const rarityStyles: Record<GamificationBadge["rarity"], string> = {
  common:    "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50",
  rare:      "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30",
  epic:      "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/30",
  legendary: "border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/30",
};

const rarityLabel: Record<GamificationBadge["rarity"], string> = {
  common:    "text-gray-500",
  rare:      "text-blue-500",
  epic:      "text-purple-500",
  legendary: "text-yellow-500",
};

interface GamificationBadgeProps {
  badge: GamificationBadge;
}

export function GamificationBadgeCard({ badge }: GamificationBadgeProps) {
  return (
    <div
      className={`relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-opacity ${rarityStyles[badge.rarity]} ${badge.unlocked ? "opacity-100" : "opacity-40 grayscale"}`}
      aria-label={`${badge.name} — ${badge.unlocked ? "unlocked" : "locked"}`}
    >
      {badge.unlocked && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white" aria-hidden="true">✓</span>
      )}
      <span className="text-4xl" aria-hidden="true">{badge.icon}</span>
      <div>
        <p className="text-sm font-semibold text-ink">{badge.name}</p>
        <p className={`text-xs font-medium capitalize ${rarityLabel[badge.rarity]}`}>{badge.rarity}</p>
        <p className="mt-1 text-xs text-ink/50">{badge.description}</p>
      </div>
      {!badge.unlocked && (
        <span className="text-xs text-ink/40 italic">Locked</span>
      )}
    </div>
  );
}
