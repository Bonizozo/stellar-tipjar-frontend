"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TeamMember, TeamStatistics } from "@/hooks/useTeam";
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

interface TeamEarningsProps {
  members: TeamMember[];
  stats: TeamStatistics;
  className?: string;
}

export function TeamEarnings({
  members,
  stats,
  className = "",
}: TeamEarningsProps) {
  const activeMembers = members.filter((m) => m.isActive);

  const memberEarnings = useMemo(() => {
    return activeMembers
      .map((m) => ({
        ...m,
        calculatedEarnings:
          stats.totalTipsReceived > 0
            ? (stats.totalTipsReceived * m.split) / 100
            : (m.earnings ?? 0),
      }))
      .sort((a, b) => b.calculatedEarnings - a.calculatedEarnings);
  }, [activeMembers, stats.totalTipsReceived]);

  const maxEarnings = Math.max(
    ...memberEarnings.map((m) => m.calculatedEarnings),
    1,
  );

  return (
    <div
      className={`rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-6 ${className}`}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-ink">Team Earnings</h3>
          <p className="mt-0.5 text-sm text-ink/60">
            Tip revenue distributed to members
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sunrise/10">
          <CurrencyDollarIcon className="h-5 w-5 text-sunrise" />
        </div>
      </div>

      {/* Total */}
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-wave/5 to-sunrise/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">
          Total Tips Received
        </p>
        <p className="mt-1 text-3xl font-bold text-ink">
          {stats.totalTipsReceived.toLocaleString()}{" "}
          <span className="text-lg font-semibold text-ink/60">XLM</span>
        </p>
        {stats.activeMemberCount > 0 && (
          <p className="mt-1 flex items-center gap-1 text-xs text-moss">
            <ArrowTrendingUpIcon className="h-3.5 w-3.5" />
            Distributed across {stats.activeMemberCount} member
            {stats.activeMemberCount !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Per-member breakdown */}
      {activeMembers.length === 0 ? (
        <p className="text-center text-sm text-ink/50">
          Add team members to see earnings breakdown.
        </p>
      ) : (
        <div className="space-y-3">
          {memberEarnings.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              className="group"
            >
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-wave/20 to-sunrise/20 text-xs font-bold text-wave">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-ink">
                    {member.name}
                  </span>
                  <span className="text-xs text-ink/50">{member.split}%</span>
                </div>
                <span className="text-sm font-semibold text-ink">
                  {member.calculatedEarnings.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}{" "}
                  <span className="text-xs font-normal text-ink/60">XLM</span>
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-wave to-sunrise"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(member.calculatedEarnings / maxEarnings) * 100}%`,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.06,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Note when no tips yet */}
      {stats.totalTipsReceived === 0 && activeMembers.length > 0 && (
        <p className="mt-4 text-center text-xs text-ink/40">
          Earnings will appear here once tips are received.
        </p>
      )}
    </div>
  );
}
