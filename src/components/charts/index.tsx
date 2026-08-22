"use client";

import dynamic from "next/dynamic";
import { ChartSkeleton } from "./ChartSkeleton";

export { ChartTooltip } from "./ChartTooltip";
export { ChartSkeleton } from "./ChartSkeleton";
export { ChartContainer } from "./ChartContainer";
export { LiveBadge } from "./LiveBadge";
export { SupporterHeatmap } from "./SupporterHeatmap";

// recharts is only needed once one of these charts actually mounts, so each
// is code-split into its own chunk behind a skeleton instead of shipping
// recharts in the analytics/dashboard route's initial JS.
export const TipTrendChart = dynamic(
  () => import("./TipTrendChart").then((m) => m.TipTrendChart),
  { loading: () => <ChartSkeleton />, ssr: false },
);

export const RevenueBreakdownChart = dynamic(
  () => import("./RevenueBreakdownChart").then((m) => m.RevenueBreakdownChart),
  { loading: () => <ChartSkeleton />, ssr: false },
);

export const TopSupportersChart = dynamic(
  () => import("./TopSupportersChart").then((m) => m.TopSupportersChart),
  { loading: () => <ChartSkeleton />, ssr: false },
);

export const DistributionChart = dynamic(
  () => import("./DistributionChart").then((m) => m.DistributionChart),
  { loading: () => <ChartSkeleton />, ssr: false },
);

export const SupporterRetentionChart = dynamic(
  () => import("./SupporterRetentionChart").then((m) => m.SupporterRetentionChart),
  { loading: () => <ChartSkeleton />, ssr: false },
);

export const RealtimeTipFeed = dynamic(
  () => import("./RealtimeTipFeed").then((m) => m.RealtimeTipFeed),
  { loading: () => <ChartSkeleton />, ssr: false },
);
