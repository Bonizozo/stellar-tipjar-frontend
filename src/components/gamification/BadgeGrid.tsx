"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GamificationBadge, BadgeRarity } from "@/types/gamification";

const rarityBorder: Record<BadgeRarity, string> = {
  common:    "border-gray-200 dark:border-gray-700",
  rare:      "border-blue-300 dark:border-blue-700",
  epic:      "border-purple-300 dark:border-purple-700",
  legendary: "border-yellow-400 dark:border-yellow-600",
};

const rarityGlow: Record<BadgeRarity, string> = {
  common:    "",
  rare:      "shadow-blue-200 dark:shadow-blue-900",
  epic:      "shadow-purple-200 dark:shadow-purple-900",
  legendary: "shadow-yellow-200 dark:shadow-yellow-900",
};

const rarityLabel: Record<BadgeRarity, string> = {
  common:    "text-gray-500",
  rare:      "text-blue-500",
  epic:      "text-purple-500",
  legendary: "text-yellow-500",
};

const RARITY_ORDER: BadgeRarity[] = ["legendary", "epic", "rare", "common"];

type FilterOption = "all" | BadgeRarity | "unlocked" | "locked";

interface BadgeGridProps {
  badges: GamificationBadge[];
}

export function BadgeGrid({ badges }: BadgeGridProps) {
  const [filter, setFilter] = useState<FilterOption>("all");
  const [selected, setSelected] = useState<GamificationBadge | null>(null);

  const filters: { value: FilterOption; label: string }[] = [
    { value: "all", label: "All" },
    { value: "unlocked", label: "Unlocked" },
    { value: "locked", label: "Locked" },
    { value: "legendary", label: "Legendary" },
    { value: "epic", label: "Epic" },
    { value: "rare", label: "Rare" },
    { value: "common", label: "Common" },
  ];

  const filtered = badges
    .filter((b) => {
      if (filter === "all") return true;
      if (filter === "unlocked") return b.unlocked;
      if (filter === "locked") return !b.unlocked;
      return b.rarity === filter;
    })
    .sort((a, b) => {
      // Unlocked first, then by rarity
      if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
      return RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity);
    });

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/50">
          {unlockedCount} / {badges.length} unlocked
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

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((badge) => (
            <motion.button
              key={badge.id}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(badge)}
              className={`relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-shadow ${
                rarityBorder[badge.rarity]
              } ${badge.unlocked ? `shadow-md ${rarityGlow[badge.rarity]}` : "opacity-40 grayscale"} bg-[color:var(--surface)]`}
              aria-label={`${badge.name} — ${badge.unlocked ? "unlocked" : "locked"}`}
            >
              {badge.unlocked && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white shadow">
                  ✓
                </span>
              )}
              <span className="text-4xl" aria-hidden="true">{badge.icon}</span>
              <div>
                <p className="text-xs font-semibold text-ink leading-tight">{badge.name}</p>
                <p className={`text-[10px] font-medium capitalize mt-0.5 ${rarityLabel[badge.rarity]}`}>
                  {badge.rarity}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-sm rounded-3xl border-2 bg-[color:var(--surface)] p-8 text-center shadow-2xl ${rarityBorder[selected.rarity]}`}
            >
              <span className="text-7xl" aria-hidden="true">{selected.icon}</span>
              <h3 className="mt-4 text-xl font-bold text-ink">{selected.name}</h3>
              <p className={`text-sm font-semibold capitalize mt-1 ${rarityLabel[selected.rarity]}`}>
                {selected.rarity}
              </p>
              <p className="mt-3 text-sm text-ink/60">{selected.description}</p>
              <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-wave/10 px-4 py-2">
                <span className="text-wave font-bold">+{selected.xpReward} XP</span>
                <span className="text-ink/40 text-xs">on unlock</span>
              </div>
              {selected.unlocked ? (
                <p className="mt-3 text-xs text-green-600 font-semibold">✓ Unlocked</p>
              ) : (
                <p className="mt-3 text-xs text-ink/40 italic">Keep tipping to unlock this badge</p>
              )}
              <button
                onClick={() => setSelected(null)}
                className="mt-5 rounded-full bg-ink/5 px-6 py-2 text-sm font-medium text-ink/60 hover:bg-ink/10 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
