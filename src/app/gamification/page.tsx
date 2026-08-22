"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GamificationProvider, useGamificationContext } from "@/contexts/GamificationContext";
import { LevelProgressCard } from "@/components/gamification/LevelProgressCard";
import { BadgeGrid } from "@/components/gamification/BadgeGrid";
import { AchievementList } from "@/components/gamification/AchievementList";
import { RewardsShop } from "@/components/gamification/RewardsShop";
import { GamificationLeaderboard } from "@/components/gamification/GamificationLeaderboard";
import { GamificationStatsGrid } from "@/components/gamification/GamificationStats";
import { XPHistory } from "@/components/gamification/XPHistory";
import { XPToast } from "@/components/gamification/XPToast";

type Tab = "overview" | "badges" | "achievements" | "rewards" | "leaderboard" | "history";

const TABS: { value: Tab; label: string; icon: string }[] = [
  { value: "overview",     label: "Overview",     icon: "🏠" },
  { value: "badges",       label: "Badges",       icon: "🏅" },
  { value: "achievements", label: "Achievements", icon: "🏆" },
  { value: "rewards",      label: "Rewards",      icon: "🎁" },
  { value: "leaderboard",  label: "Leaderboard",  icon: "📊" },
  { value: "history",      label: "XP History",   icon: "⚡" },
];

function GamificationContent() {
  const {
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
    stats,
    xpHistory,
    claimReward,
  } = useGamificationContext();

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [xpToast, setXpToast] = useState<{ amount: number; reason: string } | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-wave/20 border-t-wave" />
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* XP toast notification */}
      {xpToast && (
        <XPToast
          amount={xpToast.amount}
          reason={xpToast.reason}
          onDone={() => setXpToast(null)}
        />
      )}

      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Achievements & Rewards</h1>
        <p className="mt-1 text-ink/60">
          Earn XP by tipping creators, unlock badges, and claim exclusive rewards.
        </p>
      </div>

      {/* Stats grid */}
      <GamificationStatsGrid
        totalXP={totalXP}
        currentLevelNum={currentLevel.level}
        currentLevelTitle={currentLevel.title}
        badges={badges}
        achievements={achievements}
        stats={stats}
      />

      {/* Level progress */}
      <LevelProgressCard
        totalXP={totalXP}
        currentLevel={currentLevel}
        nextLevel={nextLevel}
        levelProgress={levelProgress}
        xpIntoLevel={xpIntoLevel}
        xpNeeded={xpNeeded}
      />

      {/* Tab navigation */}
      <div className="flex gap-1 overflow-x-auto rounded-xl bg-ink/5 p-1 scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.value
                ? "bg-[color:var(--surface)] text-ink shadow-sm"
                : "text-ink/50 hover:text-ink"
            }`}
          >
            <span aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-xl font-semibold text-ink">Recent Badges</h2>
                <BadgeGrid badges={badges.slice(0, 10)} />
              </div>
              <div>
                <h2 className="mb-4 text-xl font-semibold text-ink">In-Progress Achievements</h2>
                <AchievementList
                  achievements={achievements.filter((a) => !a.completed && a.progress > 0).slice(0, 4)}
                />
              </div>
            </div>
          )}

          {activeTab === "badges" && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-ink">Badge Collection</h2>
              <BadgeGrid badges={badges} />
            </div>
          )}

          {activeTab === "achievements" && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-ink">Achievements</h2>
              <AchievementList achievements={achievements} />
            </div>
          )}

          {activeTab === "rewards" && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-ink">Rewards Shop</h2>
              <p className="mb-5 text-sm text-ink/50">
                Spend your XP on exclusive cosmetics, features, and discounts.
              </p>
              <RewardsShop rewards={rewards} totalXP={totalXP} onClaim={claimReward} />
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-ink">Leaderboard</h2>
              <GamificationLeaderboard />
            </div>
          )}

          {activeTab === "history" && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-ink">XP History</h2>
              <XPHistory events={xpHistory} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default function GamificationPage() {
  return (
    <GamificationProvider>
      <GamificationContent />
    </GamificationProvider>
  );
}
