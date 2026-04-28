"use client";

import { useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HeatmapDay {
  /** ISO date string YYYY-MM-DD */
  date: string;
  /** Total XLM tipped on this day */
  totalAmount: number;
  /** Number of individual tips */
  tipCount: number;
  /** Activity level 0–4 (0 = none, 4 = highest) */
  level: 0 | 1 | 2 | 3 | 4;
  /** Day of week 0 (Sun) – 6 (Sat) */
  dayOfWeek: number;
  /** Week index within the displayed range */
  weekIndex: number;
  /** Whether this date is in the future */
  isFuture: boolean;
  /** Whether this date is today */
  isToday: boolean;
}

export interface HeatmapWeek {
  weekIndex: number;
  /** ISO date of the Sunday that starts this week */
  startDate: string;
  days: HeatmapDay[];
}

export interface HeatmapMonth {
  /** 0-indexed month */
  month: number;
  year: number;
  label: string;
  /** Week index where this month label should appear */
  weekIndex: number;
}

export interface HeatmapStats {
  totalAmount: number;
  totalTips: number;
  activeDays: number;
  longestStreak: number;
  currentStreak: number;
  bestDay: { date: string; amount: number; tipCount: number } | null;
  avgPerActiveDay: number;
}

export interface UseTipHeatmapReturn {
  weeks: HeatmapWeek[];
  months: HeatmapMonth[];
  stats: HeatmapStats;
  /** Total number of weeks in the grid */
  totalWeeks: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTH_LABELS = [
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/**
 * Compute activity level 0–4 using percentile thresholds.
 * Level 0 = no activity. Levels 1–4 split the non-zero values into quartiles.
 */
function computeLevels(
  dayMap: Map<string, { totalAmount: number; tipCount: number }>,
): Map<string, 0 | 1 | 2 | 3 | 4> {
  const nonZero = Array.from(dayMap.values())
    .map((d) => d.totalAmount)
    .filter((v) => v > 0)
    .sort((a, b) => a - b);

  const levels = new Map<string, 0 | 1 | 2 | 3 | 4>();

  if (nonZero.length === 0) {
    dayMap.forEach((_, date) => levels.set(date, 0));
    return levels;
  }

  const p25 = nonZero[Math.floor(nonZero.length * 0.25)] ?? 0;
  const p50 = nonZero[Math.floor(nonZero.length * 0.5)] ?? 0;
  const p75 = nonZero[Math.floor(nonZero.length * 0.75)] ?? 0;

  dayMap.forEach((day, date) => {
    if (day.totalAmount === 0) {
      levels.set(date, 0);
      return;
    }
    if (day.totalAmount <= p25) {
      levels.set(date, 1);
      return;
    }
    if (day.totalAmount <= p50) {
      levels.set(date, 2);
      return;
    }
    if (day.totalAmount <= p75) {
      levels.set(date, 3);
      return;
    }
    levels.set(date, 4);
  });

  return levels;
}

function computeStreaks(
  sortedDates: string[],
  activeDates: Set<string>,
): { longest: number; current: number } {
  if (sortedDates.length === 0) return { longest: 0, current: 0 };

  let longest = 0;
  let run = 0;

  for (const date of sortedDates) {
    if (activeDates.has(date)) {
      run++;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }

  // Current streak — walk backwards from today
  const today = toIso(new Date());
  let current = 0;
  let cursor = new Date();
  while (true) {
    const iso = toIso(cursor);
    if (iso > today) {
      cursor = addDays(cursor, -1);
      continue;
    }
    if (!activeDates.has(iso)) break;
    current++;
    cursor = addDays(cursor, -1);
  }

  return { longest, current };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface RawTip {
  date: string; // ISO string or YYYY-MM-DD
  amount: number;
}

interface UseTipHeatmapOptions {
  tips: RawTip[];
  /** How many years to show. Default 1. */
  years?: number;
  /** Override the end date (defaults to today) */
  endDate?: Date;
}

export function useTipHeatmap({
  tips,
  years = 1,
  endDate,
}: UseTipHeatmapOptions): UseTipHeatmapReturn {
  return useMemo(() => {
    const today = endDate ?? new Date();
    const todayIso = toIso(today);

    // ── Build date range ────────────────────────────────────────────────────
    // End on the last Saturday of the current week so the grid is complete
    const end = new Date(today);
    end.setDate(end.getDate() + (6 - end.getDay())); // advance to Saturday

    // Start on the Sunday that is ~(years * 52) weeks before end
    const start = new Date(end);
    start.setDate(start.getDate() - years * 364);
    start.setDate(start.getDate() - start.getDay()); // back to Sunday

    // ── Aggregate tips by day ───────────────────────────────────────────────
    const dayMap = new Map<string, { totalAmount: number; tipCount: number }>();

    // Pre-populate every day in range with zeros
    let cursor = new Date(start);
    while (cursor <= end) {
      dayMap.set(toIso(cursor), { totalAmount: 0, tipCount: 0 });
      cursor = addDays(cursor, 1);
    }

    for (const tip of tips) {
      const iso = tip.date.slice(0, 10);
      const existing = dayMap.get(iso);
      if (existing) {
        existing.totalAmount += tip.amount;
        existing.tipCount += 1;
      }
    }

    // ── Compute levels ──────────────────────────────────────────────────────
    const levelMap = computeLevels(dayMap);

    // ── Build week grid ─────────────────────────────────────────────────────
    const weeks: HeatmapWeek[] = [];
    const monthsSeen = new Map<string, HeatmapMonth>();
    let weekIndex = 0;
    cursor = new Date(start);

    while (cursor <= end) {
      const weekStart = toIso(cursor);
      const days: HeatmapDay[] = [];

      for (let d = 0; d < 7; d++) {
        const dayDate = addDays(cursor, d);
        const iso = toIso(dayDate);
        const data = dayMap.get(iso) ?? { totalAmount: 0, tipCount: 0 };

        // Track month labels — show label on first week a month appears
        const monthKey = `${dayDate.getFullYear()}-${dayDate.getMonth()}`;
        if (!monthsSeen.has(monthKey) && dayDate.getDay() === 0) {
          monthsSeen.set(monthKey, {
            month: dayDate.getMonth(),
            year: dayDate.getFullYear(),
            label: MONTH_LABELS[dayDate.getMonth()]!,
            weekIndex,
          });
        }

        days.push({
          date: iso,
          totalAmount: data.totalAmount,
          tipCount: data.tipCount,
          level: levelMap.get(iso) ?? 0,
          dayOfWeek: dayDate.getDay(),
          weekIndex,
          isFuture: iso > todayIso,
          isToday: iso === todayIso,
        });
      }

      weeks.push({ weekIndex, startDate: weekStart, days });
      weekIndex++;
      cursor = addDays(cursor, 7);
    }

    // ── Month labels ────────────────────────────────────────────────────────
    const months = Array.from(monthsSeen.values()).sort(
      (a, b) => a.weekIndex - b.weekIndex,
    );

    // ── Stats ───────────────────────────────────────────────────────────────
    let totalAmount = 0;
    let totalTips = 0;
    let activeDays = 0;
    let bestDay: HeatmapStats["bestDay"] = null;
    const activeDateSet = new Set<string>();
    const allDates: string[] = [];

    dayMap.forEach((day, date) => {
      allDates.push(date);
      totalAmount += day.totalAmount;
      totalTips += day.tipCount;
      if (day.totalAmount > 0) {
        activeDays++;
        activeDateSet.add(date);
        if (!bestDay || day.totalAmount > bestDay.amount) {
          bestDay = { date, amount: day.totalAmount, tipCount: day.tipCount };
        }
      }
    });

    allDates.sort();
    const { longest, current } = computeStreaks(allDates, activeDateSet);

    const stats: HeatmapStats = {
      totalAmount,
      totalTips,
      activeDays,
      longestStreak: longest,
      currentStreak: current,
      bestDay,
      avgPerActiveDay: activeDays > 0 ? totalAmount / activeDays : 0,
    };

    return { weeks, months, stats, totalWeeks: weeks.length };
  }, [tips, years, endDate]);
}
