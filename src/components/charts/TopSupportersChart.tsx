"use client";

import { useCallback, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { ChartSkeleton } from "./ChartSkeleton";
import { ChartContainer } from "./ChartContainer";

type SortOrder = "desc" | "asc";

interface SupporterDataPoint {
  name: string;
  tips: number;
}

interface TopSupportersChartProps {
  data: SupporterDataPoint[];
  loading?: boolean;
  onExport?: () => void;
}

// Gradient palette — one colour per bar
const BAR_COLORS = [
  "#0f6c7b",
  "#1a8a9c",
  "#ff785a",
  "#e8623a",
  "#5f7f41",
  "#7a9e55",
  "#8b5cf6",
  "#a78bfa",
  "#f59e0b",
  "#fbbf24",
];

const AXIS_STYLE = { fontSize: 11, fill: "rgba(21,21,21,0.45)" };
const GRID_STROKE = "rgba(21,21,21,0.07)";

export function TopSupportersChart({
  data,
  loading = false,
  onExport,
}: TopSupportersChartProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [limit, setLimit] = useState(10);

  const sorted = [...data]
    .sort((a, b) => (sortOrder === "desc" ? b.tips - a.tips : a.tips - b.tips))
    .slice(0, limit);

  const customTooltip = useCallback(
    (props: any) => (
      <ChartTooltip
        {...props}
        unit="XLM"
        labelFormatter={(l) => `Supporter: ${l}`}
      />
    ),
    [],
  );

  const actions = (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setSortOrder((v) => (v === "desc" ? "asc" : "desc"))}
        className="rounded-lg border border-ink/10 px-2.5 py-1 text-xs font-medium text-ink/60 transition hover:bg-ink/5 hover:text-ink"
      >
        {sortOrder === "desc" ? "↓ Highest" : "↑ Lowest"}
      </button>
      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="rounded-lg border border-ink/10 bg-transparent px-2 py-1 text-xs text-ink/60 focus:outline-none"
        aria-label="Number of supporters to show"
      >
        {[5, 10, 20].map((n) => (
          <option key={n} value={n}>
            Top {n}
          </option>
        ))}
      </select>
    </div>
  );

  if (loading) {
    return (
      <ChartContainer
        title="Top Supporters"
        description="Highest tipping supporters by total XLM"
      >
        <ChartSkeleton height={320} />
      </ChartContainer>
    );
  }

  return (
    <ChartContainer
      title="Top Supporters"
      description="Highest tipping supporters by total XLM"
      actions={actions}
      onExport={onExport}
    >
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 4, right: 48, left: 8, bottom: 4 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={GRID_STROKE}
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={AXIS_STYLE}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <Tooltip
            content={customTooltip}
            cursor={{ fill: "rgba(21,21,21,0.04)" }}
          />
          <Bar
            dataKey="tips"
            name="Total Tips"
            radius={[0, 4, 4, 0]}
            maxBarSize={20}
          >
            {sorted.map((_, index) => (
              <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
            <LabelList
              dataKey="tips"
              position="right"
              style={{ fontSize: 10, fill: "rgba(21,21,21,0.5)" }}
              formatter={(v: number) => `${v.toLocaleString()} XLM`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
