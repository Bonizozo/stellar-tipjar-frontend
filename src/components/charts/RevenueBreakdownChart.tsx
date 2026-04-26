"use client";

import { useCallback, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { ChartSkeleton } from "./ChartSkeleton";
import { ChartContainer } from "./ChartContainer";

type ViewMode = "stacked" | "grouped" | "percent";

interface RevenueDataPoint {
  date: string;
  gross: number;
  net: number;
  recurring: number;
  oneTime: number;
}

interface RevenueBreakdownChartProps {
  data: RevenueDataPoint[];
  loading?: boolean;
  onExport?: () => void;
}

const SERIES = [
  { key: "gross", name: "Gross", color: "#ff785a" },
  { key: "net", name: "Net", color: "#0f6c7b" },
  { key: "recurring", name: "Recurring", color: "#5f7f41" },
  { key: "oneTime", name: "One-time", color: "#8b5cf6" },
] as const;

const AXIS_STYLE = { fontSize: 11, fill: "rgba(21,21,21,0.45)" };
const GRID_STROKE = "rgba(21,21,21,0.07)";

const VIEW_MODES: { id: ViewMode; label: string }[] = [
  { id: "stacked", label: "Stacked" },
  { id: "grouped", label: "Grouped" },
  { id: "percent", label: "100%" },
];

function toPercent(data: RevenueDataPoint[]): RevenueDataPoint[] {
  return data.map((d) => {
    const total = d.gross + d.net + d.recurring + d.oneTime || 1;
    return {
      date: d.date,
      gross: Math.round((d.gross / total) * 100),
      net: Math.round((d.net / total) * 100),
      recurring: Math.round((d.recurring / total) * 100),
      oneTime: Math.round((d.oneTime / total) * 100),
    };
  });
}

export function RevenueBreakdownChart({
  data,
  loading = false,
  onExport,
}: RevenueBreakdownChartProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("stacked");
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());

  const toggleSeries = (key: string) => {
    setHiddenSeries((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const chartData = viewMode === "percent" ? toPercent(data) : data;
  const unit = viewMode === "percent" ? "%" : "XLM";

  const customTooltip = useCallback(
    (props: any) => (
      <ChartTooltip
        {...props}
        unit={unit}
        labelFormatter={(l) => `Date: ${l}`}
      />
    ),
    [unit],
  );

  const actions = (
    <div className="flex overflow-hidden rounded-lg border border-ink/10">
      {VIEW_MODES.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setViewMode(id)}
          className={`px-2.5 py-1 text-xs font-medium transition ${
            viewMode === id
              ? "bg-wave text-white"
              : "text-ink/50 hover:bg-ink/5 hover:text-ink"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  if (loading) {
    return (
      <ChartContainer
        title="Revenue Breakdown"
        description="Gross, net, recurring and one-time revenue"
      >
        <ChartSkeleton height={320} />
      </ChartContainer>
    );
  }

  const sharedAxes = (
    <>
      <CartesianGrid
        strokeDasharray="3 3"
        stroke={GRID_STROKE}
        vertical={false}
      />
      <XAxis
        dataKey="date"
        tick={AXIS_STYLE}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        tick={AXIS_STYLE}
        axisLine={false}
        tickLine={false}
        width={48}
        tickFormatter={(v) => (viewMode === "percent" ? `${v}%` : String(v))}
      />
      <Tooltip
        content={customTooltip}
        cursor={{ fill: "rgba(21,21,21,0.04)" }}
      />
    </>
  );

  const legendContent = (
    <div className="mt-3 flex flex-wrap justify-center gap-3">
      {SERIES.map(({ key, name, color }) => (
        <button
          key={key}
          onClick={() => toggleSeries(key)}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition ${
            hiddenSeries.has(key) ? "opacity-40" : "opacity-100"
          }`}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          {name}
        </button>
      ))}
    </div>
  );

  return (
    <ChartContainer
      title="Revenue Breakdown"
      description="Gross, net, recurring and one-time revenue"
      actions={actions}
      onExport={onExport}
    >
      <ResponsiveContainer width="100%" height={320}>
        {viewMode === "grouped" ? (
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          >
            {sharedAxes}
            {SERIES.map(({ key, name, color }) =>
              hiddenSeries.has(key) ? null : (
                <Bar
                  key={key}
                  dataKey={key}
                  name={name}
                  fill={color}
                  radius={[3, 3, 0, 0]}
                  maxBarSize={16}
                />
              ),
            )}
            <Brush
              dataKey="date"
              height={20}
              stroke="rgba(21,21,21,0.1)"
              travellerWidth={6}
            />
          </BarChart>
        ) : (
          <AreaChart
            data={chartData}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
          >
            <defs>
              {SERIES.map(({ key, color }) => (
                <linearGradient
                  key={key}
                  id={`grad-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.02} />
                </linearGradient>
              ))}
            </defs>
            {sharedAxes}
            {SERIES.map(({ key, name, color }) =>
              hiddenSeries.has(key) ? null : (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  name={name}
                  stroke={color}
                  strokeWidth={1.5}
                  fill={`url(#grad-${key})`}
                  stackId={viewMode === "stacked" ? "stack" : key}
                  dot={false}
                />
              ),
            )}
            <Brush
              dataKey="date"
              height={20}
              stroke="rgba(21,21,21,0.1)"
              travellerWidth={6}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
      {legendContent}
    </ChartContainer>
  );
}
