"use client";

import { useState, useEffect } from "react";
import { getCreatorAnalytics } from "@/services/api";
import type { CreatorAnalytics } from "@/services/api";

export interface DashboardData extends Omit<
  CreatorAnalytics,
  | "prevTotalTips"
  | "prevSupporters"
  | "prevAvgTip"
  | "prevMonthlyTips"
  | "prevGrowthMetrics"
> {
  changes: {
    totalTips: number;
    supporters: number;
    avgTip: number;
    monthlyTips: number;
  };
}

function pctChange(current: number, prev: number): number {
  if (prev === 0) return 0;
  return Math.round(((current - prev) / prev) * 100 * 10) / 10;
}

export function useDashboardData(
  username = "me",
  dateRange?: { start: Date; end: Date },
) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getCreatorAnalytics(username, dateRange)
      .then((raw) => {
        if (cancelled) return;
        const {
          prevTotalTips,
          prevSupporters,
          prevAvgTip,
          prevMonthlyTips,
          prevGrowthMetrics,
          ...rest
        } = raw;
        setData({
          ...rest,
          changes: {
            totalTips: pctChange(raw.totalTips, prevTotalTips),
            supporters: pctChange(raw.supporters, prevSupporters),
            avgTip: pctChange(raw.avgTip, prevAvgTip),
            monthlyTips: pctChange(raw.monthlyTips, prevMonthlyTips),
          },
        });
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : "Failed to fetch analytics",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    username,
    dateRange?.start?.toISOString(),
    dateRange?.end?.toISOString(),
  ]);

  return { data, loading, error };
}
