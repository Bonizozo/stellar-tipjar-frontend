"use client";

import { motion } from "framer-motion";
import { StatCard } from "@/components/StatCard";
import { TeamStatistics } from "@/hooks/useTeam";
import { UsersIcon, CurrencyDollarIcon, ChartBarIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface TeamStatisticsProps {
  stats: TeamStatistics;
  teamName: string;
  isLoading?: boolean;
  className?: string;
}

export function TeamStatisticsCard({
  stats,
  teamName,
  isLoading = false,
  className = "",
}: TeamStatisticsProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`space-y-4 ${className}`}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-ink">Team Statistics</h2>
        <p className="text-sm text-ink/60 mt-1">Overview of {teamName} team performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item}>
          <StatCard
            icon={<UsersIcon className="h-6 w-6" />}
            label="Team Members"
            value={stats.activeMemberCount.toString()}
            subtext={`${stats.memberCount - stats.activeMemberCount} inactive`}
            isLoading={isLoading}
            trend={stats.activeMemberCount > 0 ? { value: stats.activeMemberCount * 100, direction: "up" } : undefined}
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            icon={<ChartBarIcon className="h-6 w-6" />}
            label="Average Split"
            value={`${stats.averageSplit.toFixed(1)}%`}
            subtext={`Out of ${stats.totalSplit}% allocated`}
            isLoading={isLoading}
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            icon={<CurrencyDollarIcon className="h-6 w-6" />}
            label="Total Tips Received"
            value={`${stats.totalTipsReceived.toLocaleString()}`}
            subtext="XLM accumulated"
            isLoading={isLoading}
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            icon={<CheckCircleIcon className="h-6 w-6" />}
            label="Split Status"
            value={stats.isBalanced ? "Balanced ✓" : "Incomplete"}
            subtext={stats.isBalanced ? "100% allocated" : `${100 - stats.totalSplit}% remaining`}
            isLoading={isLoading}
            variant={stats.isBalanced ? "success" : "warning"}
          />
        </motion.div>
      </div>

      {/* Detailed breakdown */}
      <div className="mt-8 rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
        <h3 className="text-lg font-semibold text-ink mb-4">Split Breakdown</h3>

        {stats.activeMemberCount === 0 ? (
          <p className="text-sm text-ink/60">No active team members. Add members to see the split breakdown.</p>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink/70">Active Members</span>
              <span className="font-semibold text-ink">{stats.activeMemberCount}</span>
            </div>
            <div className="w-full bg-ink/10 rounded-full h-2">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-wave via-sunrise to-moss"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(stats.totalSplit, 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-ink/60 mt-2">
              <span>{stats.totalSplit}%</span>
              <span>100%</span>
            </div>

            {!stats.isBalanced && stats.totalSplit < 100 && (
              <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
                <p className="text-xs font-medium text-warning">
                  ⚠ {100 - stats.totalSplit}% remaining to allocate
                </p>
              </div>
            )}

            {stats.totalSplit > 100 && (
              <div className="mt-4 p-3 rounded-lg bg-error/10 border border-error/20">
                <p className="text-xs font-medium text-error">
                  ✖ Splits exceed 100% by {stats.totalSplit - 100}%
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tips info */}
      {stats.totalTipsReceived > 0 && (
        <motion.div
          variants={item}
          className="rounded-2xl border border-ink/10 bg-gradient-to-br from-sunrise/5 to-wave/5 p-6"
        >
          <h3 className="text-lg font-semibold text-ink mb-2">Revenue Generated</h3>
          <p className="text-3xl font-bold text-ink">
            {stats.totalTipsReceived.toLocaleString()} XLM
          </p>
          <p className="text-sm text-ink/60 mt-2">
            Distributed to {stats.activeMemberCount} active member{stats.activeMemberCount !== 1 ? "s" : ""}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
