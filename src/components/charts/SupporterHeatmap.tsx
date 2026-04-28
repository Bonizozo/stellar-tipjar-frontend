"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChartContainer } from "./ChartContainer";
import { ChartSkeleton } from "./ChartSkeleton";

interface HeatmapDataPoint {
  /** ISO date string */
  date: string;
  value: number;
}

interface SupporterHeatmapProps {
  data: HeatmapDataPoint[];
  loading?: boolean;
  onExport?: () => void;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getColor(value: number, max: number): string {
  if (value === 0) return "rgba(21,21,21,0.06)";
  const intensity = value / max;
  if (intensity < 0.25) return "rgba(15,108,123,0.25)";
  if (intensity < 0.5) return "rgba(15,108,123,0.5)";
  if (intensity < 0.75) return "rgba(15,108,123,0.75)";
  return "rgba(15,108,123,1)";
}

function buildGrid(data: HeatmapDataPoint[]) {
  const map = new Map(data.map((d) => [d.date, d.value]));
  const max = Math.max(...data.map((d) => d.value), 1);

  // Build 52-week grid ending today
  const today = new Date();
  const cells: Array<{
    date: string;
    value: number;
    color: string;
    week: number;
    day: number;
    month: number;
  }> = [];

  // Start from 52 weeks ago, aligned to Sunday
  const start = new Date(today);
  start.setDate(start.getDate() - 364);
  start.setDate(start.getDate() - start.getDay()); // align to Sunday

  for (let w = 0; w < 53; w++) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      if (date > today) continue;
      const iso = date.toISOString().slice(0, 10);
      const value = map.get(iso) ?? 0;
      cells.push({
        date: iso,
        value,
        color: getColor(value, max),
        week: w,
        day: d,
        month: date.getMonth(),
      });
    }
  }

  return { cells, max };
}

export function SupporterHeatmap({
  data,
  loading = false,
  onExport,
}: SupporterHeatmapProps) {
  const [hovered, setHovered] = useState<{
    date: string;
    value: number;
  } | null>(null);
  const { cells, max } = useMemo(() => buildGrid(data), [data]);

  // Month label positions
  const monthLabels = useMemo(() => {
    const seen = new Set<number>();
    return cells
      .filter((c) => {
        if (seen.has(c.month)) return false;
        seen.add(c.month);
        return true;
      })
      .map((c) => ({ week: c.week, month: c.month }));
  }, [cells]);

  if (loading) {
    return (
      <ChartContainer
        title="Activity Heatmap"
        description="Daily tip activity over the past year"
      >
        <ChartSkeleton height={140} bars={12} />
      </ChartContainer>
    );
  }

  const CELL = 13;
  const GAP = 2;
  const totalWeeks = 53;

  return (
    <ChartContainer
      title="Activity Heatmap"
      description="Daily tip activity over the past year"
      onExport={onExport}
    >
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="mb-1 flex" style={{ paddingLeft: 28 }}>
            {monthLabels.map(({ week, month }) => (
              <div
                key={`${month}-${week}`}
                className="text-xs text-ink/40"
                style={{
                  position: "relative",
                  left: week * (CELL + GAP),
                  minWidth: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {MONTHS[month]}
              </div>
            ))}
          </div>

          <div className="flex gap-0.5">
            {/* Day labels */}
            <div className="flex flex-col gap-0.5 pr-1">
              {DAYS.map((day, i) => (
                <div
                  key={day}
                  className="flex items-center justify-end text-xs text-ink/40"
                  style={{ height: CELL, width: 24 }}
                >
                  {i % 2 === 1 ? day.slice(0, 1) : ""}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${totalWeeks}, ${CELL}px)`,
                gridTemplateRows: `repeat(7, ${CELL}px)`,
                gap: GAP,
              }}
            >
              {cells.map((cell) => (
                <motion.div
                  key={cell.date}
                  style={{
                    gridColumn: cell.week + 1,
                    gridRow: cell.day + 1,
                    backgroundColor: cell.color,
                    width: CELL,
                    height: CELL,
                  }}
                  className="cursor-pointer rounded-sm transition-transform"
                  whileHover={{ scale: 1.4 }}
                  onMouseEnter={() =>
                    setHovered({ date: cell.date, value: cell.value })
                  }
                  onMouseLeave={() => setHovered(null)}
                  aria-label={`${cell.date}: ${cell.value} XLM`}
                />
              ))}
            </div>
          </div>

          {/* Tooltip */}
          {hovered && (
            <div className="mt-2 text-xs text-ink/60">
              <span className="font-semibold text-ink">{hovered.date}</span>
              {" — "}
              {hovered.value > 0
                ? `${hovered.value.toLocaleString()} XLM`
                : "No activity"}
            </div>
          )}

          {/* Legend */}
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-xs text-ink/40">Less</span>
            {[0, 0.25, 0.5, 0.75, 1].map((intensity) => (
              <div
                key={intensity}
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: getColor(intensity * max, max) }}
              />
            ))}
            <span className="text-xs text-ink/40">More</span>
          </div>
        </div>
      </div>
    </ChartContainer>
  );
}
