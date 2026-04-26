"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";

import { Button } from "@/components/Button";
import { KPICard } from "./KPICard";
import { TipTrendChart } from "./TipTrendChart";
import { TopSupportersChart } from "./TopSupportersChart";
import { DistributionChart } from "./DistributionChart";
import { GrowthMetricsPanel } from "./GrowthMetricsPanel";
import { RevenueBreakdownChart } from "./RevenueBreakdownChart";
import { SupporterInsightsTable } from "./SupporterInsightsTable";
import { useDashboardData } from "@/hooks/useDashboardData";
import { EmptyState } from "@/components/EmptyState";
import { exportToCSV } from "@/utils/exportCSV";
import { exportToExcel } from "@/utils/exportExcel";
import { TipHeatmapCalendar } from "@/components/TipHeatmapCalendar";
import { useHeatmapData } from "@/hooks/queries/useHeatmapData";

const DATE_PRESETS = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "All", days: 0 },
] as const;

interface DashboardProps {
  username?: string;
}

function formatDateInput(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function Dashboard({ username = "me" }: DashboardProps) {
  const [preset, setPreset] = useState(30);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const dateRange = useMemo(() => {
    if (customStart && customEnd) {
      return { start: new Date(customStart), end: new Date(customEnd) };
    }

    if (preset > 0) {
      return {
        start: new Date(Date.now() - preset * 86_400_000),
        end: new Date(),
      };
    }

    return undefined;
  }, [customStart, customEnd, preset]);

  const { data, loading, error } = useDashboardData(username, dateRange);
  const { data: heatmapTips = [], isPending: heatmapPending } = useHeatmapData(
    username,
    1,
  );

  const handleExportCSV = () => {
    if (!data) return;
    const csvRows = data.revenueData.map((row) => ({
      date: row.date,
      grossRevenue: row.gross,
      netRevenue: row.net,
      recurringRevenue: row.recurring,
      oneTimeRevenue: row.oneTime,
    }));

    exportToCSV(
      csvRows,
      [
        { key: "date", label: "Date" },
        { key: "grossRevenue", label: "Gross Revenue (XLM)" },
        { key: "netRevenue", label: "Net Revenue (XLM)" },
        { key: "recurringRevenue", label: "Recurring Revenue (XLM)" },
        { key: "oneTimeRevenue", label: "One-time Revenue (XLM)" },
      ],
      "creator-analytics-export.csv",
    );
  };

  const handleExportExcel = () => {
    if (!data) return;

    const rows = data.revenueData.map((d) => ({
      date: d.date,
      amount: d.gross,
      recipient: username,
      sender: "dashboard-analytics",
      status: "completed" as const,
      memo: `Net ${d.net} | Recurring ${d.recurring}`,
      transactionHash: undefined,
    }));

    exportToExcel(
      rows as Parameters<typeof exportToExcel>[0],
      "creator-analytics-export.xlsx",
    );
  };

  const applyPreset = (days: number) => {
    setPreset(days);
    setCustomStart("");
    setCustomEnd("");
  };

  const applyLast30Days = () => {
    const end = new Date();
    const start = new Date(Date.now() - 30 * 86_400_000);
    setCustomStart(formatDateInput(start));
    setCustomEnd(formatDateInput(end));
    setPreset(0);
  };

  if (error) {
    return (
      <EmptyState
        variant="error"
        title="Failed to Load Dashboard"
        description={error}
        action={{ label: "Retry", onClick: () => window.location.reload() }}
      />
    );
  }

  if (!data && loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-ink/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <EmptyState
        variant="no-data"
        title="No Data Available"
        description="Start receiving tips to see your analytics dashboard"
      />
    );
  }

  const fmt = (n: number) => (n >= 0 ? `+${n}%` : `${n}%`);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">
            Creator Analytics Dashboard
          </h1>
          <p className="text-ink/70 mt-1">
            Revenue, supporter behavior, and growth insights
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-ink/10 overflow-hidden">
            {DATE_PRESETS.map(({ label, days }) => (
              <button
                key={label}
                onClick={() => applyPreset(days)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  preset === days && !customStart && !customEnd
                    ? "bg-wave text-white"
                    : "text-ink/60 hover:bg-ink/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <label className="text-sm text-ink/70">From</label>
          <input
            type="date"
            value={customStart}
            max={customEnd || undefined}
            onChange={(event) => setCustomStart(event.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-sm bg-transparent"
          />
          <label className="text-sm text-ink/70">To</label>
          <input
            type="date"
            value={customEnd}
            min={customStart || undefined}
            max={formatDateInput(new Date())}
            onChange={(event) => setCustomEnd(event.target.value)}
            className="rounded-lg border border-ink/15 px-3 py-2 text-sm bg-transparent"
          />

          <Button variant="ghost" size="sm" onClick={applyLast30Days}>
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExportCSV}
            disabled={!data}
          >
            <Download size={16} />
            CSV
          </Button>
          <Button size="sm" onClick={handleExportExcel} disabled={!data}>
            <Download size={16} />
            Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue (XLM)"
          value={data.totalTips}
          change={fmt(data.changes.totalTips)}
          isPositive={data.changes.totalTips >= 0}
        />
        <KPICard
          title="Total Supporters"
          value={data.supporters}
          change={fmt(data.changes.supporters)}
          isPositive={data.changes.supporters >= 0}
        />
        <KPICard
          title="Average Tip"
          value={`${data.avgTip.toFixed(1)} XLM`}
          change={fmt(data.changes.avgTip)}
          isPositive={data.changes.avgTip >= 0}
        />
        <KPICard
          title="Current Month"
          value={data.monthlyTips}
          change={fmt(data.changes.monthlyTips)}
          isPositive={data.changes.monthlyTips >= 0}
        />
      </div>

      <GrowthMetricsPanel metrics={data.growthMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6">
          <h2 className="text-lg font-semibold text-ink mb-4">Revenue Trend</h2>
          <TipTrendChart data={data.trendData} loading={loading} />
        </div>
        <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6">
          <h2 className="text-lg font-semibold text-ink mb-4">
            Top Supporters
          </h2>
          <TopSupportersChart data={data.supportersData} loading={loading} />
        </div>
      </div>

      <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">
          Revenue Breakdown
        </h2>
        <RevenueBreakdownChart data={data.revenueData} loading={loading} />
      </div>

      <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">
          Supporter Analytics
        </h2>
        <SupporterInsightsTable rows={data.supporterInsights} />
      </div>

      <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">
          Revenue Source Distribution
        </h2>
        <DistributionChart data={data.distributionData} loading={loading} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-ink mb-4">
          Tip Activity Heatmap
        </h2>
        <TipHeatmapCalendar
          tips={heatmapTips}
          loading={heatmapPending}
          title="Daily Tip Activity"
          showStats
          onExport={handleExportCSV}
        />
      </div>
    </div>
  );
}
