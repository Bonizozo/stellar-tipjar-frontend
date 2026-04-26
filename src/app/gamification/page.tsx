"use client";

import { useGamification } from "@/hooks/useGamification";
import { LevelProgress } from "@/components/LevelProgress";
import { GamificationBadgeCard } from "@/components/GamificationBadge";
import { AchievementCard } from "@/components/AchievementCard";
import { RewardsList } from "@/components/RewardsList";

export default function GamificationPage() {
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
  } = useGamification();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-wave/20 border-t-wave" />
      </div>
    );
  }

  const unlockedBadges = badges.filter((b) => b.unlocked).length;
  const completedAchievements = achievements.filter((a) => a.completed).length;

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Achievements & Rewards</h1>
        <p className="mt-1 text-ink/60">Earn XP by tipping creators and unlock exclusive rewards.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total XP",     value: totalXP.toLocaleString() },
          { label: "Level",        value: `${currentLevel.level} — ${currentLevel.title}` },
          { label: "Badges",       value: `${unlockedBadges} / ${badges.length}` },
          { label: "Achievements", value: `${completedAchievements} / ${achievements.length}` },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4">
            <p className="text-xs text-ink/50">{label}</p>
            <p className="mt-1 font-bold text-ink">{value}</p>
          </div>
        ))}
      </div>

      {/* Level progress */}
      <LevelProgress
        totalXP={totalXP}
        currentLevel={currentLevel}
        nextLevel={nextLevel}
        levelProgress={levelProgress}
        xpIntoLevel={xpIntoLevel}
        xpNeeded={xpNeeded}
      />

      {/* Badges */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-ink">Badges</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map((badge) => (
            <GamificationBadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-ink">Achievements</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>

      {/* Rewards */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-ink">Rewards</h2>
        <RewardsList rewards={rewards} totalXP={totalXP} />
      </div>
    </section>
  );
}
