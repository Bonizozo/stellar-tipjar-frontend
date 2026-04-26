"use client";

import { useCallback } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { ChartSkeleton } from "./ChartSkeleton";
import { ChartContainer } from "./ChartContainer";

interface RetentionMetrics {
  revenueGrowth: number;
  supporterGrowth: number;
  repeatSupporterRate: number;
  supporterRetentionRate: number;
  avgTipGrowth?: number;
  engagementScore?: number;
}

interface SupporterRetentionChartProps {
  metrics: RetentionMetrics;
  /** Optional comparison period metrics */
  prevMetrics?: RetentionMetrics;
  loading?: boolean;
  onExport?: () => void;
}

function toRadarData(current: RetentionMetrics, prev?: RetentionMetrics) {
  const entries = [
    { subject: "Revenue Growth", key: "revenueGrowth", max: 100 },
    { subject: "Supporter Growth", key: "supporterGrowth", max: 100 },
    { subject: "Repeat Rate", key: "repeatSupporterRate", max: 100 },
    { subject: "Retention", key: "supporterRetentionRate", max: 100 },
    { subject: "Avg Tip Growth", key: "avgTipGrowth", max: 100 },
    { subject: "Engagement", key: "engagementScore", max: 100 },
  ] as const;

  return entries.map(({ subject, key, max }) => ({
    subject,
    current: Math.min(Math.abs((current as any)[key] ?? 0), max),
    previous: prev
      ? Math.min(Math.abs((prev as any)[key] ?? 0), max)
      : undefined,
  }));
}

export function SupporterRetentionChart({
  metrics,
  prevMetrics,
  loading = false,
  onExport,
}: SupporterRetentionChartProps) {
  const radarData = toRadarData(metrics, prevMetrics);

  const customTooltip = useCallback(
    (props: any) => (
      <ChartTooltip
        {...props}
        unit="%"
        formatter={(v: number | string, name: string) => [
          `${Number(v).toFixed(1)}%`,
          name,
        ]}
      />
    ),
    [],
  );

  if (loading) {
    return (
      <ChartContainer
        title="Growth & Retention Radar"
        description="Multi-metric performance overview"
      >
        <ChartSkeleton height={300} bars={6} />
      </ChartContainer>
    );
  }

  return (
    <ChartContainer
      title="Growth & Retention Radar"
      description="Multi-metric performance overview"
      onExport={onExport}
    >
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart
          data={radarData}
          margin={{ top: 8, right: 24, bottom: 8, left: 24 }}
        >
          <PolarGrid stroke="rgba(21,21,21,0.08)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 11, fill: "rgba(21,21,21,0.55)" }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fontSize: 9, fill: "rgba(21,21,21,0.35)" }}
            tickCount={4}
          />
          <Radar
            name="Current Period"
            dataKey="current"
            stroke="#0f6c7b"
            fill="#0f6c7b"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          {prevMetrics && (
            <Radar
              name="Previous Period"
              dataKey="previous"
              stroke="#ff785a"
              fill="#ff785a"
              fillOpacity={0.15}
              strokeWidth={1.5}
              strokeDasharray="4 3"
            />
          )}
          <Tooltip content={customTooltip} />
          {prevMetrics && <Legend wrapperStyle={{ fontSize: 11 }} />}
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
