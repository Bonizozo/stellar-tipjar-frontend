"use client";

import { useState, useCallback } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
  Legend,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { ChartSkeleton } from "./ChartSkeleton";
import { ChartContainer } from "./ChartContainer";
import { LiveBadge } from "./LiveBadge";
import { useRealtimeChart } from "@/hooks/useRealtimeChart";

type ChartType = "line" | "area" | "bar";

interface TipTrendDataPoint {
  date: string;
  amount: number;
  average?: number;
}

interface TipTrendChartProps {
  data: TipTrendDataPoint[];
  loading?: boolean;
  /** Enable real-time polling simulation */
  realtime?: boolean;
  realtimeFetcher?: () => Promise<number>;
  realtimeIntervalMs?: number;
  title?: string;
  description?: string;
  onExport?: () => void;
}

const CHART_TYPES: { id: ChartType; label: string }[] = [
  { id: "area", label: "Area" },
  { id: "line", label: "Line" },
  { id: "bar", label: "Bar" },
];

const AXIS_STYLE = { fontSize: 11, fill: "rgba(21,21,21,0.45)" };
const GRID_STROKE = "rgba(21,21,21,0.07)";

function computeAverage(data: TipTrendDataPoint[]): TipTrendDataPoint[] {
  if (!data.length) return data;
  const total = data.reduce((s, d) => s + d.amount, 0);
  const avg = total / data.length;
  return data.map((d) => ({ ...d, average: Math.round(avg) }));
}

export function TipTrendChart({
  data: staticData,
  loading = false,
  realtime = false,
  realtimeFetcher,
  realtimeIntervalMs = 5000,
  title = "Tip Revenue Trend",
  description = "Daily tip volume over the selected period",
  onExport,
}: TipTrendChartProps) {
  const [chartType, setChartType] = useState<ChartType>("area");
  const [showAverage, setShowAverage] = useState(true);

  const {
    data: livePoints,
    secondsSinceUpdate,
    isConnected,
  } = useRealtimeChart({
    windowSize: 30,
    pollIntervalMs: realtimeIntervalMs,
    fetcher: realtimeFetcher,
    enabled: realtime && !!realtimeFetcher,
  });

  const rawData =
    realtime && livePoints.length
      ? livePoints.map((p) => ({ date: p.date, amount: p.value }))
      : staticData;

  const chartData = showAverage ? computeAverage(rawData) : rawData;

  const customTooltip = useCallback(
    (props: any) => (
      <ChartTooltip
        {...props}
        unit="XLM"
        labelFormatter={(l) => `Date: ${l}`}
      />
    ),
    [],
  );

  const actions = (
    <div className="flex items-center gap-2">
      {/* Chart type switcher */}
      <div className="flex overflow-hidden rounded-lg border border-ink/10">
        {CHART_TYPES.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setChartType(id)}
            className={`px-2.5 py-1 text-xs font-medium transition ${
              chartType === id
                ? "bg-wave text-white"
                : "text-ink/50 hover:bg-ink/5 hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Average toggle */}
      <button
        onClick={() => setShowAverage((v) => !v)}
        className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
          showAverage
            ? "border-sunrise/40 bg-sunrise/10 text-sunrise"
            : "border-ink/10 text-ink/50 hover:bg-ink/5"
        }`}
      >
        Avg line
      </button>
    </div>
  );

  const badge = realtime ? (
    <LiveBadge secondsSinceUpdate={secondsSinceUpdate} />
  ) : undefined;

  if (loading) {
    return (
      <ChartContainer title={title} description={description}>
        <ChartSkeleton height={320} />
      </ChartContainer>
    );
  }

  const sharedProps = {
    data: chartData,
    margin: { top: 8, right: 16, left: 0, bottom: 0 },
  };

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
      <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} width={48} />
      <Tooltip
        content={customTooltip}
        cursor={{ stroke: "rgba(21,21,21,0.08)", strokeWidth: 1 }}
      />
      {showAverage && (
        <ReferenceLine
          y={chartData[0]?.average}
          stroke="#ff785a"
          strokeDasharray="4 4"
          strokeWidth={1.5}
          label={{
            value: "Avg",
            position: "insideTopRight",
            fontSize: 10,
            fill: "#ff785a",
          }}
        />
      )}
    </>
  );

  return (
    <ChartContainer
      title={title}
      description={description}
      actions={actions}
      badge={badge}
      onExport={onExport}
    >
      <ResponsiveContainer width="100%" height={320}>
        {chartType === "area" ? (
          <AreaChart {...sharedProps}>
            <defs>
              <linearGradient id="tipGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f6c7b" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0f6c7b" stopOpacity={0} />
              </linearGradient>
            </defs>
            {sharedAxes}
            <Area
              type="monotone"
              dataKey="amount"
              name="Tips"
              stroke="#0f6c7b"
              strokeWidth={2}
              fill="url(#tipGradient)"
              dot={false}
              activeDot={{ r: 5, fill: "#0f6c7b", strokeWidth: 0 }}
            />
            <Brush
              dataKey="date"
              height={20}
              stroke="rgba(21,21,21,0.1)"
              travellerWidth={6}
            />
          </AreaChart>
        ) : chartType === "line" ? (
          <LineChart {...sharedProps}>
            {sharedAxes}
            <Line
              type="monotone"
              dataKey="amount"
              name="Tips"
              stroke="#0f6c7b"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5, fill: "#0f6c7b", strokeWidth: 0 }}
            />
            <Brush
              dataKey="date"
              height={20}
              stroke="rgba(21,21,21,0.1)"
              travellerWidth={6}
            />
          </LineChart>
        ) : (
          <BarChart {...sharedProps}>
            {sharedAxes}
            <Bar
              dataKey="amount"
              name="Tips"
              fill="#0f6c7b"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </ChartContainer>
  );
}
