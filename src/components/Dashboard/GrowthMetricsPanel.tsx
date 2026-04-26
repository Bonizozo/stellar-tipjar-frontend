"use client";

import type { ReactNode } from "react";
import { TrendingUp, Repeat, UsersRound, UserCheck2 } from "lucide-react";

interface GrowthMetricsPanelProps {
  metrics: {
    revenueGrowth: number;
    supporterGrowth: number;
    repeatSupporterRate: number;
    supporterRetentionRate: number;
  };
}

function MetricItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-ink/10 p-4 bg-[color:var(--surface)]">
      <div className="flex items-center gap-2 text-ink/60 text-sm">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}

export function GrowthMetricsPanel({ metrics }: GrowthMetricsPanelProps) {
  const signed = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <MetricItem
        label="Revenue Growth"
        value={signed(metrics.revenueGrowth)}
        icon={<TrendingUp size={16} />}
      />
      <MetricItem
        label="Supporter Growth"
        value={signed(metrics.supporterGrowth)}
        icon={<UsersRound size={16} />}
      />
      <MetricItem
        label="Repeat Supporter Rate"
        value={`${metrics.repeatSupporterRate.toFixed(1)}%`}
        icon={<Repeat size={16} />}
      />
      <MetricItem
        label="Supporter Retention"
        value={`${metrics.supporterRetentionRate.toFixed(1)}%`}
        icon={<UserCheck2 size={16} />}
      />
    </div>
  );
}
