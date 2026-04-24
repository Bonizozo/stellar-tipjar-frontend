"use client";

import { useState } from "react";
import { Download, Globe } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { TopSupporters } from "@/components/dashboard/TopSupporters";
import { useDashboardData } from "@/hooks/useDashboardData";
import { exportToCSV } from "@/utils/exportCSV";

const DATE_PRESETS = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "All", days: 0 },
] as const;

const GEO_DATA = [
  { name: "United States", value: 38 },
  { name: "Europe", value: 27 },
  { name: "Asia", value: 21 },
  { name: "Other", value: 14 },
];

const GEO_COLORS = ["#ff785a", "#0f6c7b", "#5f7f41", "#fbbf24"];

export default function DashboardPage() {
  const [preset, setPreset] = useState<number>(0);

  const dateRange =
    preset > 0
      ? { start: new Date(Date.now() - preset * 86_400_000), end: new Date() }
      : undefined;

  const { data, loading } = useDashboardData(dateRange);

  const handleExport = () => {
    if (!data) return;
    exportToCSV(
      data.trendData,
      [
        { key: "date", label: "Date" },
        { key: "amount", label: "Earnings (XLM)" },
      ],
      "earnings-export.csv"
    );
  };

  const growthRate =
    data && data.trendData.length >= 2
      ? (
          ((data.trendData.at(-1)!.amount - data.trendData[0].amount) /
            data.trendData[0].amount) *
          100
        ).toFixed(1)
      : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-ink">Analytics Dashboard</h1>
        <div className="flex items-center gap-2">
          {/* Date range filter */}
          <div className="flex rounded-lg border border-ink/10 overflow-hidden">
            {DATE_PRESETS.map(({ label, days }) => (
              <button
                key={label}
                onClick={() => setPreset(days)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  preset === days
                    ? "bg-wave text-white"
                    : "text-ink/60 hover:bg-ink/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={handleExport}
            disabled={!data}
            className="inline-flex items-center gap-2 rounded-lg bg-wave px-4 py-2 text-sm font-medium text-white hover:bg-wave/90 disabled:opacity-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Earnings"
          value={data ? `${data.monthlyTips.toLocaleString()} XLM` : "—"}
          change="+12%"
        />
        <StatsCard
          title="Total Tips"
          value={data ? data.totalTips.toLocaleString() : "—"}
          change="+8%"
        />
        <StatsCard
          title="Supporters"
          value={data ? data.supporters.toLocaleString() : "—"}
          change="+15%"
        />
        <StatsCard
          title="Avg Tip"
          value={data ? `${data.avgTip.toFixed(1)} XLM` : "—"}
          change="+3%"
        />
      </div>

      {/* Growth metric */}
      {growthRate !== null && (
        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-5">
          <p className="text-sm text-ink/60">Period Growth</p>
          <p
            className={`mt-1 text-3xl font-bold ${
              Number(growthRate) >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {Number(growthRate) >= 0 ? "+" : ""}
            {growthRate}%
          </p>
          <p className="mt-1 text-xs text-ink/40">
            Earnings change from first to last data point in selected range
          </p>
        </div>
      )}

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
          <h2 className="mb-4 text-lg font-semibold text-ink">Earnings Over Time</h2>
          <EarningsChart data={data?.trendData ?? []} loading={loading} />
        </div>

        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
          <h2 className="mb-4 text-lg font-semibold text-ink">Top Supporters</h2>
          <TopSupporters data={data?.supportersData ?? []} loading={loading} />
        </div>
      </div>

      {/* Geographic distribution */}
      <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6">
        <div className="mb-4 flex items-center gap-2">
          <Globe size={18} className="text-ink/50" />
          <h2 className="text-lg font-semibold text-ink">Geographic Distribution</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={GEO_DATA}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {GEO_DATA.map((_, i) => (
                  <Cell key={i} fill={GEO_COLORS[i % GEO_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid rgba(21,21,21,0.1)",
                  borderRadius: 8,
                }}
                formatter={(v: number) => [`${v}%`, "Share"]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <ul className="space-y-3 self-center">
            {GEO_DATA.map((region, i) => (
              <li key={region.name} className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: GEO_COLORS[i] }}
                />
                <span className="flex-1 text-sm text-ink">{region.name}</span>
                <span className="text-sm font-semibold text-ink">{region.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
