"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTipHeatmap } from "@/hooks/useTipHeatmap";
import { HeatmapCell, HeatmapTheme } from "./HeatmapCell";
import { HeatmapLegend } from "./HeatmapLegend";
import { HeatmapStatsPanel } from "./HeatmapStats";
import {
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

// ─── Constants ────────────────────────────────────────────────────────────────

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// Only show Mon / Wed / Fri to avoid crowding
const VISIBLE_DAY_LABELS: Record<number, string> = {
  1: "Mon",
  3: "Wed",
  5: "Fri",
};

const CELL_SIZE = 13;
const CELL_GAP = 3;
const DAY_LABEL_WIDTH = 28;

const THEMES: { id: HeatmapTheme; label: string; swatch: string }[] = [
  { id: "wave", label: "Ocean", swatch: "#0f6c7b" },
  { id: "sunrise", label: "Sunrise", swatch: "#ff785a" },
  { id: "moss", label: "Moss", swatch: "#5f7f41" },
  { id: "purple", label: "Purple", swatch: "#8b5cf6" },
  { id: "mono", label: "Mono", swatch: "#151515" },
];

const YEAR_OPTIONS = [1, 2, 3] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface RawTip {
  date: string;
  amount: number;
}

export interface TipHeatmapCalendarProps {
  tips: RawTip[];
  loading?: boolean;
  /** Title shown in the card header */
  title?: string;
  /** Show the stats panel below the grid */
  showStats?: boolean;
  /** Allow exporting the heatmap data as CSV */
  onExport?: () => void;
  className?: string;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function HeatmapSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="flex gap-1">
        {Array.from({ length: 53 }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, d) => (
              <div
                key={d}
                style={{ width: CELL_SIZE, height: CELL_SIZE, borderRadius: 2 }}
                className="bg-ink/8"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TipHeatmapCalendar({
  tips,
  loading = false,
  title = "Tip Activity",
  showStats = true,
  onExport,
  className = "",
}: TipHeatmapCalendarProps) {
  const [theme, setTheme] = useState<HeatmapTheme>("wave");
  const [years, setYears] = useState<1 | 2 | 3>(1);
  const [yearOffset, setYearOffset] = useState(0); // 0 = current year, -1 = previous, etc.
  const scrollRef = useRef<HTMLDivElement>(null);

  // Compute end date based on year offset
  const endDate = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + yearOffset);
    return d;
  }, [yearOffset]);

  const { weeks, months, stats, totalWeeks } = useTipHeatmap({
    tips,
    years,
    endDate,
  });

  const gridWidth =
    totalWeeks * (CELL_SIZE + CELL_GAP) - CELL_GAP + DAY_LABEL_WIDTH + 8;

  // Stagger animation delay per cell — cap at 0.5s total
  const totalCells = totalWeeks * 7;
  const delayPerCell = Math.min(0.5 / totalCells, 0.003);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* ── Card ── */}
      <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)]">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-5 py-4">
          <div>
            <h3 className="text-base font-semibold text-ink">{title}</h3>
            <p className="mt-0.5 text-xs text-ink/50">
              {stats.totalTips.toLocaleString()} tip
              {stats.totalTips !== 1 ? "s" : ""} · {stats.activeDays} active day
              {stats.activeDays !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Year range selector */}
            <div className="flex overflow-hidden rounded-lg border border-ink/10">
              {YEAR_OPTIONS.map((y) => (
                <button
                  key={y}
                  onClick={() => setYears(y)}
                  className={`px-2.5 py-1 text-xs font-medium transition ${
                    years === y
                      ? "bg-wave text-white"
                      : "text-ink/50 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {y}yr
                </button>
              ))}
            </div>

            {/* Year navigation */}
            <div className="flex items-center gap-1 rounded-lg border border-ink/10">
              <button
                onClick={() => setYearOffset((v) => v - 1)}
                className="rounded-l-lg p-1.5 text-ink/50 transition hover:bg-ink/5 hover:text-ink"
                aria-label="Previous year"
              >
                <ChevronLeftIcon className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[60px] text-center text-xs font-medium text-ink/70">
                {yearOffset === 0
                  ? "This year"
                  : yearOffset === -1
                    ? "Last year"
                    : `${new Date().getFullYear() + yearOffset}`}
              </span>
              <button
                onClick={() => setYearOffset((v) => Math.min(0, v + 1))}
                disabled={yearOffset >= 0}
                className="rounded-r-lg p-1.5 text-ink/50 transition hover:bg-ink/5 hover:text-ink disabled:opacity-30"
                aria-label="Next year"
              >
                <ChevronRightIcon className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Theme picker */}
            <div className="flex items-center gap-1.5">
              {THEMES.map(({ id, label, swatch }) => (
                <button
                  key={id}
                  onClick={() => setTheme(id)}
                  title={label}
                  aria-label={`${label} theme`}
                  aria-pressed={theme === id}
                  className={`h-5 w-5 rounded-full transition-transform ${
                    theme === id
                      ? "scale-125 ring-2 ring-offset-1 ring-ink/20"
                      : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: swatch }}
                />
              ))}
            </div>

            {/* Export */}
            {onExport && (
              <button
                onClick={onExport}
                title="Export heatmap data"
                className="rounded-lg p-1.5 text-ink/50 transition hover:bg-ink/5 hover:text-ink"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="px-5 py-4">
          {loading ? (
            <HeatmapSkeleton />
          ) : (
            <div
              ref={scrollRef}
              className="overflow-x-auto"
              role="grid"
              aria-label="Tip activity heatmap"
            >
              <div style={{ minWidth: gridWidth }}>
                {/* Month labels */}
                <div
                  className="mb-1 flex"
                  style={{ paddingLeft: DAY_LABEL_WIDTH + 4 }}
                  aria-hidden="true"
                >
                  {months.map((m) => (
                    <div
                      key={`${m.year}-${m.month}`}
                      className="text-xs text-ink/40"
                      style={{
                        position: "relative",
                        left: m.weekIndex * (CELL_SIZE + CELL_GAP),
                        minWidth: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m.label}
                    </div>
                  ))}
                </div>

                {/* Day labels + grid */}
                <div className="flex gap-1">
                  {/* Day-of-week labels */}
                  <div
                    className="flex flex-col"
                    style={{ width: DAY_LABEL_WIDTH, gap: CELL_GAP }}
                    aria-hidden="true"
                  >
                    {DAY_LABELS.map((label, i) => (
                      <div
                        key={label}
                        className="flex items-center justify-end pr-1 text-xs text-ink/35"
                        style={{ height: CELL_SIZE }}
                      >
                        {VISIBLE_DAY_LABELS[i] ?? ""}
                      </div>
                    ))}
                  </div>

                  {/* Week columns */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${years}-${yearOffset}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex"
                      style={{ gap: CELL_GAP }}
                    >
                      {weeks.map((week) => (
                        <div
                          key={week.weekIndex}
                          className="flex flex-col"
                          style={{ gap: CELL_GAP }}
                          role="row"
                          aria-label={`Week of ${week.startDate}`}
                        >
                          {week.days.map((day) => (
                            <HeatmapCell
                              key={day.date}
                              day={day}
                              size={CELL_SIZE}
                              gap={CELL_GAP}
                              theme={theme}
                              animationDelay={
                                (week.weekIndex * 7 + day.dayOfWeek) *
                                delayPerCell
                              }
                            />
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="mt-3 flex items-center justify-between">
            <HeatmapLegend theme={theme} cellSize={CELL_SIZE} />
            {!loading && (
              <p className="text-xs text-ink/35">
                Today is highlighted with a border
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stats panel */}
      {showStats && <HeatmapStatsPanel stats={stats} loading={loading} />}
    </div>
  );
}
