"use client";

import { useCallback, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { ChartSkeleton } from "./ChartSkeleton";
import { ChartContainer } from "./ChartContainer";

interface DistributionDataPoint {
  name: string;
  value: number;
}

interface DistributionChartProps {
  data: DistributionDataPoint[];
  loading?: boolean;
  onExport?: () => void;
}

const PALETTE = [
  "#ff785a",
  "#0f6c7b",
  "#5f7f41",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
];

type ViewMode = "donut" | "pie";

/** Renders the active (hovered) slice with an expanded outer radius */
function ActiveShape(props: any) {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        fill="currentColor"
        className="text-sm font-semibold fill-ink"
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fill="currentColor"
        className="text-xs fill-ink/60"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.4}
      />
    </g>
  );
}

export function DistributionChart({
  data,
  loading = false,
  onExport,
}: DistributionChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [viewMode, setViewMode] = useState<ViewMode>("donut");

  const total = data.reduce((s, d) => s + d.value, 0);

  const customTooltip = useCallback(
    (props: any) => (
      <ChartTooltip
        {...props}
        unit="%"
        formatter={(value: number | string, name: string) => [
          `${Number(value).toFixed(1)}%`,
          name,
        ]}
      />
    ),
    [],
  );

  const actions = (
    <div className="flex overflow-hidden rounded-lg border border-ink/10">
      {(["donut", "pie"] as ViewMode[]).map((mode) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          className={`px-2.5 py-1 text-xs font-medium capitalize transition ${
            viewMode === mode
              ? "bg-wave text-white"
              : "text-ink/50 hover:bg-ink/5 hover:text-ink"
          }`}
        >
          {mode}
        </button>
      ))}
    </div>
  );

  if (loading) {
    return (
      <ChartContainer
        title="Revenue Source Distribution"
        description="Breakdown by tip origin"
      >
        <ChartSkeleton height={320} bars={5} />
      </ChartContainer>
    );
  }

  const innerRadius = viewMode === "donut" ? 70 : 0;

  return (
    <ChartContainer
      title="Revenue Source Distribution"
      description="Breakdown by tip origin"
      actions={actions}
      onExport={onExport}
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        {/* Chart */}
        <div className="w-full sm:w-1/2">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={100}
                dataKey="value"
                activeIndex={activeIndex}
                activeShape={<ActiveShape />}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
                paddingAngle={viewMode === "donut" ? 3 : 0}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={PALETTE[index % PALETTE.length]}
                    opacity={
                      activeIndex === undefined || activeIndex === index
                        ? 1
                        : 0.55
                    }
                  />
                ))}
              </Pie>
              <Tooltip content={customTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend table */}
        <div className="w-full sm:w-1/2">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/50">
            Breakdown
          </p>
          <div className="space-y-2">
            {data.map((entry, index) => {
              const pct = total > 0 ? (entry.value / total) * 100 : 0;
              const color = PALETTE[index % PALETTE.length];
              return (
                <div
                  key={entry.name}
                  className="group flex items-center gap-3 rounded-lg p-2 transition hover:bg-ink/5"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(undefined)}
                >
                  <span
                    className="h-3 w-3 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="flex-1 text-sm text-ink">{entry.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-ink/10">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: color }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs font-semibold text-ink">
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ChartContainer>
  );
}
