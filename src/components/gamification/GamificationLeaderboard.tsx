"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Crown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getGamificationLeaderboard } from "@/services/gamificationService";
import { LevelBadge } from "./LevelBadge";
import { LEVELS } from "@/services/gamificationService";
import type { LeaderboardPeriod, LeaderboardEntry, BadgeRarity } from "@/types/gamification";
import { generateAvatarUrl } from "@/utils/imageUtils";

const PERIODS: { value: LeaderboardPeriod; label: string }[] = [
  { value: "24h", label: "24h" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "all", label: "All Time" },
];

const TABS = [
  { value: "tippers" as const, label: "Top Tippers", icon: "💸" },
  { value: "creators" as const, label: "Top Creators", icon: "🎨" },
];

const rarityGlow: Record<BadgeRarity, string> = {
  common:    "",
  rare:      "ring-1 ring-blue-400",
  epic:      "ring-1 ring-purple-400",
  legendary: "ring-2 ring-yellow-400",
};

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="h-6 w-6 text-yellow-500" />;
  if (rank === 2) return (
    <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-700">2</div>
  );
  if (rank === 3) return (
    <div className="h-6 w-6 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-white">3</div>
  );
  return <span className="text-sm font-bold text-ink/50 w-6 text-center">{rank}</span>;
}

function ChangeIndicator({ change }: { change: number }) {
  if (change > 0) return (
    <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600">
      <TrendingUp className="h-3 w-3" />
      {change.toFixed(1)}%
    </span>
  );
  if (change < 0) return (
    <span className="flex items-center gap-0.5 text-xs font-medium text-red-500">
      <TrendingDown className="h-3 w-3" />
      {Math.abs(change).toFixed(1)}%
    </span>
  );
  return <Minus className="h-3 w-3 text-ink/30" />;
}

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  index: number;
}

function LeaderboardRow({ entry, index }: LeaderboardRowProps) {
  const level = LEVELS.find((l) => l.level === entry.level) ?? LEVELS[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="flex items-center gap-3 rounded-2xl border border-ink/5 bg-[color:var(--surface)] px-4 py-3 hover:border-ink/10 hover:shadow-sm transition-all"
    >
      {/* Rank */}
      <div className="w-8 flex items-center justify-center shrink-0">
        <RankMedal rank={entry.rank} />
      </div>

      {/* Avatar */}
      <div className="relative shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entry.avatarUrl ?? generateAvatarUrl(entry.name)}
          alt={entry.name}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20"
        />
        <div className="absolute -bottom-1 -right-1">
          <LevelBadge level={level} size="sm" />
        </div>
      </div>

      {/* Name + badges */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-ink text-sm truncate">{entry.name}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <span className={`text-xs font-medium ${level.color}`}>Lv.{entry.level}</span>
          <span className="text-ink/20">·</span>
          <span className="text-xs text-ink/40">{entry.xp.toLocaleString()} XP</span>
          {entry.badges.slice(0, 3).map((b) => (
            <span
              key={b.id}
              className={`text-sm rounded-full ${rarityGlow[b.rarity]}`}
              title={b.id}
              aria-hidden="true"
            >
              {b.icon}
            </span>
          ))}
        </div>
      </div>

      {/* Metric */}
      <div className="text-right shrink-0">
        <p className="font-bold text-wave text-sm">{entry.metric.toLocaleString()} XLM</p>
        <ChangeIndicator change={entry.change24h} />
      </div>
    </motion.div>
  );
}

export function GamificationLeaderboard() {
  const [period, setPeriod] = useState<LeaderboardPeriod>("30d");
  const [tab, setTab] = useState<"tippers" | "creators">("tippers");

  const { data, isLoading } = useQuery({
    queryKey: ["gamification-leaderboard", period],
    queryFn: () => getGamificationLeaderboard(period),
    staleTime: 5 * 60 * 1000,
  });

  const entries: LeaderboardEntry[] = data?.[tab] ?? [];

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Tabs */}
        <div className="flex gap-1 rounded-xl bg-ink/5 p-1">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                tab === t.value
                  ? "bg-[color:var(--surface)] text-ink shadow-sm"
                  : "text-ink/50 hover:text-ink"
              }`}
            >
              <span aria-hidden="true">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Period */}
        <div className="flex gap-1">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                period === p.value
                  ? "bg-wave text-white"
                  : "bg-ink/5 text-ink/60 hover:bg-ink/10"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 rounded-full border-4 border-wave/20 border-t-wave animate-spin" />
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {entries.map((entry, i) => (
              <LeaderboardRow key={`${entry.userId}-${i}`} entry={entry} index={i} />
            ))}
          </AnimatePresence>
          {entries.length === 0 && (
            <div className="py-12 text-center text-ink/40">
              <p className="text-4xl mb-2">🏆</p>
              <p className="text-sm">No data for this period yet</p>
            </div>
          )}
        </div>
      )}

      {data?.updatedAt && (
        <p className="text-xs text-ink/30 text-right">
          Updated {new Date(data.updatedAt).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
}
