import type { Metadata } from "next";
import {
  TipTrendChart,
  RevenueBreakdownChart,
  TopSupportersChart,
  DistributionChart,
  SupporterRetentionChart,
  RealtimeTipFeed,
  SupporterHeatmap,
} from "@/components/charts";

export const metadata: Metadata = {
  title: "Analytics Dashboard - Stellar TipJar",
  description: "Interactive data visualization dashboard with charts, graphs, and real-time tip data.",
};

export default function AnalyticsDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink mb-2">Analytics Dashboard</h1>
        <p className="text-ink/70">
          Interactive visualizations of your tip data — trends, revenue, supporters, and more.
        </p>
      </div>

      {/* Row 1: Trend + Revenue */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TipTrendChart />
        <RevenueBreakdownChart />
      </div>

      {/* Row 2: Top Supporters + Distribution */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TopSupportersChart />
        <DistributionChart />
      </div>

      {/* Row 3: Retention + Realtime Feed */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <SupporterRetentionChart />
        <RealtimeTipFeed />
      </div>

      {/* Row 4: Heatmap full width */}
      <SupporterHeatmap />
    </div>
  );
}
