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

interface DashboardProps {
  creatorId?: string;
}

export function Dashboard({ creatorId }: DashboardProps) {
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | undefined>();
  const { data, loading, error } = useDashboardData(dateRange);

  const handleExport = () => {
    if (!data) return;
    const csv = [
      ["Metric", "Value"],
      ["Total Tips", data.totalTips],
      ["Supporters", data.supporters],
      ["Average Tip", data.avgTip],
      ["This Month", data.monthlyTips],
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard-export.csv";
    a.click();
  };

  if (error) {
    return (
      <EmptyState
        variant="error"
        title="Failed to Load Dashboard"
        description={error}
        action={{
          label: "Retry",
          onClick: () => window.location.reload(),
        }}
      />
    );
  }

  if (!data && loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-ink/5 dark:bg-ink-dark/5 animate-pulse"
            />
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink dark:text-ink-dark">Analytics</h1>
          <p className="text-ink/70 dark:text-ink-dark/70 mt-1">
            Track your tips and supporter activity
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setDateRange(undefined)}>
            <Calendar size={18} />
            <span className="ml-2">All Time</span>
          </Button>
          <Button onClick={handleExport}>
            <Download size={18} />
            <span className="ml-2">Export</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Tips"
          value={data.totalTips}
          change="+12%"
          isPositive={true}
        />
        <KPICard
          title="Supporters"
          value={data.supporters}
          change="+8%"
          isPositive={true}
        />
        <KPICard
          title="Avg Tip"
          value={`$${data.avgTip.toFixed(2)}`}
          change="+5%"
          isPositive={true}
        />
        <KPICard
          title="This Month"
          value={`$${data.monthlyTips}`}
          change="+15%"
          isPositive={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6 dark:border-ink-dark/10 dark:bg-[color:var(--surface-dark)]">
          <h2 className="text-lg font-semibold text-ink dark:text-ink-dark mb-4">
            Tip Trends
          </h2>
          <TipTrendChart data={data.trendData} loading={loading} />
        </div>

        <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6 dark:border-ink-dark/10 dark:bg-[color:var(--surface-dark)]">
          <h2 className="text-lg font-semibold text-ink dark:text-ink-dark mb-4">
            Top Supporters
          </h2>
          <TopSupportersChart data={data.supportersData} loading={loading} />
        </div>
      </div>

      {/* Distribution */}
      <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6 dark:border-ink-dark/10 dark:bg-[color:var(--surface-dark)]">
        <h2 className="text-lg font-semibold text-ink dark:text-ink-dark mb-4">
          Tip Distribution by Source
        </h2>
        <DistributionChart data={data.distributionData} loading={loading} />
      </div>
    </div>
  );
}
