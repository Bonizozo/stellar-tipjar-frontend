"use client";

import { motion } from "framer-motion";
import type { HeatmapStats } from "@/hooks/useTipHeatmap";
import {
  FireIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  BoltIcon,
  TrophyIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

interface HeatmapStatsProps {
  stats: HeatmapStats;
  loading?: boolean;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  delay?: number;
}

function StatItem({ icon, label, value, sub, delay = 0 }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-start gap-3 rounded-xl border border-ink/10 bg-[color:var(--surface)] p-4"
    >
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-wave/10 text-wave">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-ink/50">
          {label}
        </p>
        <p className="mt-0.5 text-xl font-bold text-ink">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-ink/40">{sub}</p>}
      </div>
    </motion.div>
  );
}

export function HeatmapStatsPanel({
  stats,
  loading = false,
}: HeatmapStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-ink/5" />
        ))}
      </div>
    );
  }

  const bestDayFormatted = stats.bestDay
    ? new Date(stats.bestDay.date + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "—";

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <StatItem
        icon={<CurrencyDollarIcon className="h-5 w-5" />}
        label="Total Earned"
        value={`${stats.totalAmount.toLocaleString(undefined, { maximumFractionDigits: 1 })} XLM`}
        delay={0}
      />
      <StatItem
        icon={<ChartBarIcon className="h-5 w-5" />}
        label="Total Tips"
        value={stats.totalTips.toLocaleString()}
        sub={`${stats.activeDays} active day${stats.activeDays !== 1 ? "s" : ""}`}
        delay={0.04}
      />
      <StatItem
        icon={<BoltIcon className="h-5 w-5" />}
        label="Avg / Active Day"
        value={`${stats.avgPerActiveDay.toLocaleString(undefined, { maximumFractionDigits: 1 })} XLM`}
        delay={0.08}
      />
      <StatItem
        icon={<FireIcon className="h-5 w-5" />}
        label="Current Streak"
        value={`${stats.currentStreak} day${stats.currentStreak !== 1 ? "s" : ""}`}
        delay={0.12}
      />
      <StatItem
        icon={<CalendarDaysIcon className="h-5 w-5" />}
        label="Longest Streak"
        value={`${stats.longestStreak} day${stats.longestStreak !== 1 ? "s" : ""}`}
        delay={0.16}
      />
      <StatItem
        icon={<TrophyIcon className="h-5 w-5" />}
        label="Best Day"
        value={
          stats.bestDay
            ? `${stats.bestDay.amount.toLocaleString(undefined, { maximumFractionDigits: 1 })} XLM`
            : "—"
        }
        sub={bestDayFormatted}
        delay={0.2}
      />
    </div>
  );
}
