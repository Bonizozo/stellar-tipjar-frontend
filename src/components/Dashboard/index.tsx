"use client";

import { useState } from "react";
import { Download, Calendar } from "lucide-react";

import { Button } from "@/components/Button";
import { KPICard } from "./KPICard";
import { TipTrendChart } from "./TipTrendChart";
import { TopSupportersChart } from "./TopSupportersChart";
import { DistributionChart } from "./DistributionChart";
import { useDashboardData } from "@/hooks/useDashboardData";
import { EmptyState } from "@/components/EmptyState";
import { exportToCSV } from "@/utils/exportCSV";
import { exportToExcel } from "@/utils/exportExcel";

const DATE_PRESETS = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "All", days: 0 },
] as const;

interface DashboardProps {
  username?: string;
}

export function Dashboard({ username = "me" }: DashboardProps) {
  const [preset, setPreset] = useState(0);

  const dateRange =
    preset > 0
      ? { start: new Date(Date.now() - preset * 86_400_000), end: new Date() }
      : undefined;

  const { data, loading, error } = useDashboardData(username, dateRange);

  const handleExportCSV = () => {
    if (!data) return;
    exportToCSV(
      data.trendData,
      [
        { key: "date", label: "Date" },
        { key: "amount", label: "Earnings (XLM)" },
      ],
      "analytics-export.csv",
    );
  };

  const handleExportExcel = () => {
    if (!data) return;
    // Build tip-like rows from trendData for Excel export
    const rows = data.trendData.map((d) => ({
      date: d.date,
      amount: d.amount,
      recipient: username,
      sender: "",
      status: "completed" as const,
      memo: undefined,
      transactionHash: undefined,
    }));
    exportToExcel(rows as Parameters<typeof exportToExcel>[0], "analytics-export.xlsx");
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
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink">Analytics</h1>
          <p className="text-ink/70 mt-1">Track your tips and supporter activity</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Date range filter */}
          <div className="flex rounded-lg border border-ink/10 overflow-hidden">
            {DATE_PRESETS.map(({ label, days }) => (
              <button
                key={label}
                onClick={() => setPreset(days)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  preset === days ? "bg-wave text-white" : "text-ink/60 hover:bg-ink/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <Button variant="ghost" onClick={handleExportCSV} disabled={!data}>
            <Download size={16} />
            <span className="ml-1.5">CSV</span>
          </Button>
          <Button onClick={handleExportExcel} disabled={!data}>
            <Download size={16} />
            <span className="ml-1.5">Excel</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Tips (XLM)"
          value={data.totalTips}
          change={fmt(data.changes.totalTips)}
          isPositive={data.changes.totalTips >= 0}
        />
        <KPICard
          title="Supporters"
          value={data.supporters}
          change={fmt(data.changes.supporters)}
          isPositive={data.changes.supporters >= 0}
        />
        <KPICard
          title="Avg Tip (XLM)"
          value={`${data.avgTip.toFixed(1)} XLM`}
          change={fmt(data.changes.avgTip)}
          isPositive={data.changes.avgTip >= 0}
        />
        <KPICard
          title="This Month (XLM)"
          value={data.monthlyTips}
          change={fmt(data.changes.monthlyTips)}
          isPositive={data.changes.monthlyTips >= 0}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6">
          <h2 className="text-lg font-semibold text-ink mb-4">Tip Trends</h2>
          <TipTrendChart data={data.trendData} loading={loading} />
        </div>
        <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6">
          <h2 className="text-lg font-semibold text-ink mb-4">Top Supporters</h2>
          <TopSupportersChart data={data.supportersData} loading={loading} />
        </div>
      </div>

      {/* Distribution */}
      <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">Tip Distribution by Source</h2>
        <DistributionChart data={data.distributionData} loading={loading} />
      </div>
    </div>
  );
}
