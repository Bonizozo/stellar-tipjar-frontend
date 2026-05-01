"use client";

import { motion } from "framer-motion";
import type { GamificationStats as Stats, GamificationBadge, Achievement } from "@/types/gamification";

interface GamificationStatsProps {
  totalXP: number;
  currentLevelNum: number;
  currentLevelTitle: string;
  badges: GamificationBadge[];
  achievements: Achievement[];
  stats: Stats;
}

export function GamificationStatsGrid({
  totalXP,
  currentLevelNum,
  currentLevelTitle,
  badges,
  achievements,
  stats,
}: GamificationStatsProps) {
  const unlockedBadges = badges.filter((b) => b.unlocked).length;
  const completedAchievements = achievements.filter((a) => a.completed).length;

  const items = [
    { label: "Total XP",     value: totalXP.toLocaleString(),                    icon: "⚡", color: "text-wave" },
    { label: "Level",        value: `${currentLevelNum} — ${currentLevelTitle}`, icon: "🎖️", color: "text-purple-500" },
    { label: "Badges",       value: `${unlockedBadges} / ${badges.length}`,      icon: "🏅", color: "text-yellow-500" },
    { label: "Achievements", value: `${completedAchievements} / ${achievements.length}`, icon: "🏆", color: "text-green-500" },
    { label: "Tips Sent",    value: stats.tipCount.toLocaleString(),              icon: "💸", color: "text-blue-500" },
    { label: "XLM Tipped",  value: `${stats.totalTipped.toLocaleString()} XLM`,  icon: "🌟", color: "text-orange-500" },
    { label: "Creators Supported", value: stats.uniqueRecipients.toLocaleString(), icon: "🤝", color: "text-pink-500" },
    { label: "Streak",       value: `${stats.currentStreak} days`,               icon: "🔥", color: "text-red-500" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map(({ label, value, icon, color }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg" aria-hidden="true">{icon}</span>
            <p className="text-xs text-ink/50">{label}</p>
          </div>
          <p className={`font-bold text-sm ${color}`}>{value}</p>
        </motion.div>
      ))}
    </div>
  );
}
