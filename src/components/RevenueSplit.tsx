"use client";

import { useMemo, useState } from "react";
import { TeamMember } from "@/hooks/useTeam";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { motion } from "framer-motion";
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

interface RevenueSplitProps {
  members: TeamMember[];
  onUpdateSplit: (memberId: string, split: number) => void;
  totalSplit: number;
  isLoading?: boolean;
  className?: string;
}

export function RevenueSplit({
  members,
  onUpdateSplit,
  totalSplit,
  isLoading = false,
  className = "",
}: RevenueSplitProps) {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const activeMembers = members.filter((m) => m.isActive);

  const stats = useMemo(() => {
    const remaining = 100 - totalSplit;
    const isBalanced = totalSplit === 100 && activeMembers.length > 0;
    const isOverflow = totalSplit > 100;
    const isEmpty = activeMembers.length === 0;

    return {
      remaining,
      isBalanced,
      isOverflow,
      isEmpty,
      status: isBalanced ? "balanced" : isOverflow ? "overflow" : "unbalanced",
    };
  }, [totalSplit, activeMembers.length]);

  if (activeMembers.length === 0) {
    return (
      <div className={`rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-6 ${className}`}>
        <h3 className="font-semibold text-ink">Revenue Split Configuration</h3>
        <p className="mt-2 text-sm text-ink/60">Add team members to configure revenue splits.</p>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-6 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-ink">Revenue Split Configuration</h3>
          <p className="text-sm text-ink/60">Adjust how tips are distributed among team members</p>
        </div>
        <Badge
          variant={stats.isBalanced ? "success" : stats.isOverflow ? "error" : "warning"}
          className="inline-flex whitespace-nowrap"
        >
          {stats.isBalanced ? "✓ Balanced" : stats.isOverflow ? "⚠ Overflow" : "⚠ Incomplete"}
        </Badge>
      </div>

      {/* Status indicator */}
      <motion.div
        animate={{
          backgroundColor:
            stats.isBalanced ?
              "rgba(95, 127, 65, 0.05)"
            : stats.isOverflow ?
              "rgba(231, 76, 60, 0.05)"
            : "rgba(241, 196, 15, 0.05)",
        }}
        transition={{ duration: 0.3 }}
        className="mb-4 rounded-lg border p-4"
        style={{
          borderColor:
            stats.isBalanced ?
              "rgba(95, 127, 65, 0.2)"
            : stats.isOverflow ?
              "rgba(231, 76, 60, 0.2)"
            : "rgba(241, 196, 15, 0.2)",
        }}
      >
        <div className="flex items-start gap-2">
          {stats.isBalanced ? (
            <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-moss" />
          ) : (
            <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0 text-warning" />
          )}
          <div>
            <p className="text-sm font-medium text-ink">
              {stats.isBalanced ?
                "✓ Revenue split is balanced"
              : stats.isOverflow ?
                `Splits exceed 100% (${totalSplit}% total)`
              : `${stats.remaining}% remaining to allocate`}
            </p>
            {!stats.isBalanced && (
              <p className="text-xs text-ink/60">
                {stats.isOverflow ?
                  "Reduce splits to reach 100%"
                : "Allocate remaining percentage to team members"}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Split controls */}
      <div className="space-y-3">
        {activeMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onMouseEnter={() => setHoveredMember(member.id)}
            onMouseLeave={() => setHoveredMember(null)}
            className="flex items-center gap-3 rounded-lg bg-ink/5 p-3 transition"
          >
            <label htmlFor={`split-${member.id}`} className="min-w-32 text-sm font-medium text-ink">
              {member.name}
            </label>

            <div className="flex flex-1 items-center gap-2">
              <input
                id={`split-${member.id}`}
                type="range"
                min={0}
                max={100}
                step={1}
                value={member.split}
                onChange={(e) => onUpdateSplit(member.id, Number(e.target.value))}
                disabled={isLoading}
                className="flex-1 h-2 bg-ink/10 rounded-lg appearance-none cursor-pointer accent-wave disabled:opacity-50"
              />
              <div className="relative min-w-[60px]">
                <input
                  type="number"
                  value={member.split}
                  onChange={(e) => {
                    const val = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                    onUpdateSplit(member.id, val);
                  }}
                  disabled={isLoading}
                  className="w-full rounded-lg border border-ink/20 px-2 py-1 text-sm font-semibold text-right pr-7 focus:border-wave focus:outline-none disabled:opacity-50"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-ink/60 pointer-events-none">
                  %
                </span>
              </div>
            </div>

            {/* Visual indicator */}
            <div className="min-w-[40px]">
              {member.split > 0 && (
                <div className="h-1.5 rounded-full bg-gradient-to-r from-wave to-sunrise" style={{ width: `${Math.max(40, member.split / 2)}px` }} />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Total indicator */}
      <div className="mt-6 flex items-center justify-between rounded-lg border border-ink/20 bg-ink/5 p-4">
        <div>
          <p className="text-sm font-medium text-ink">Total Split</p>
          <p className="text-xs text-ink/60 mt-0.5">Sum of all member allocations</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-ink">{totalSplit}%</p>
          <p className={`text-xs font-medium ${stats.isBalanced ? "text-moss" : stats.isOverflow ? "text-error" : "text-warning"}`}>
            {stats.isBalanced ? "Balanced" : stats.isOverflow ? "Overflow" : `${stats.remaining}% to allocate`}
          </p>
        </div>
      </div>

      {/* Action button */}
      <Button
        className="w-full mt-4"
        variant={stats.isBalanced ? "primary" : "secondary"}
        disabled={!stats.isBalanced || isLoading}
      >
        {stats.isBalanced ? "✓ Revenue Split Configured" : "Configure Split to 100%"}
      </Button>
    </div>
  );
}
