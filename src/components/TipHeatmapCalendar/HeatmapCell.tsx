"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { HeatmapDay } from "@/hooks/useTipHeatmap";

// ─── Color themes ─────────────────────────────────────────────────────────────

export type HeatmapTheme = "wave" | "sunrise" | "moss" | "purple" | "mono";

const THEME_COLORS: Record<
  HeatmapTheme,
  [string, string, string, string, string]
> = {
  //                  level-0 (empty)   level-1          level-2          level-3          level-4
  wave: [
    "rgba(15,108,123,0.08)",
    "rgba(15,108,123,0.25)",
    "rgba(15,108,123,0.5)",
    "rgba(15,108,123,0.75)",
    "rgba(15,108,123,1)",
  ],
  sunrise: [
    "rgba(255,120,90,0.08)",
    "rgba(255,120,90,0.25)",
    "rgba(255,120,90,0.5)",
    "rgba(255,120,90,0.75)",
    "rgba(255,120,90,1)",
  ],
  moss: [
    "rgba(95,127,65,0.08)",
    "rgba(95,127,65,0.25)",
    "rgba(95,127,65,0.5)",
    "rgba(95,127,65,0.75)",
    "rgba(95,127,65,1)",
  ],
  purple: [
    "rgba(139,92,246,0.08)",
    "rgba(139,92,246,0.25)",
    "rgba(139,92,246,0.5)",
    "rgba(139,92,246,0.75)",
    "rgba(139,92,246,1)",
  ],
  mono: [
    "rgba(21,21,21,0.06)",
    "rgba(21,21,21,0.2)",
    "rgba(21,21,21,0.4)",
    "rgba(21,21,21,0.65)",
    "rgba(21,21,21,0.9)",
  ],
};

export function getCellColor(
  level: 0 | 1 | 2 | 3 | 4,
  theme: HeatmapTheme,
): string {
  return THEME_COLORS[theme][level];
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

interface CellTooltipProps {
  day: HeatmapDay;
  anchorRect: DOMRect | null;
}

function CellTooltip({ day, anchorRect }: CellTooltipProps) {
  if (!anchorRect) return null;

  const formatted = new Date(day.date + "T00:00:00").toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -4, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.95 }}
      transition={{ duration: 0.12 }}
      className="pointer-events-none fixed z-50 min-w-[160px] rounded-xl border border-ink/10 bg-gray-900 px-3 py-2.5 shadow-xl"
      style={{
        left: anchorRect.left + anchorRect.width / 2,
        top: anchorRect.top - 8,
        transform: "translate(-50%, -100%)",
      }}
      role="tooltip"
    >
      <p className="text-xs font-semibold text-white">{formatted}</p>
      {day.isFuture ? (
        <p className="mt-0.5 text-xs text-gray-400">No data yet</p>
      ) : day.totalAmount === 0 ? (
        <p className="mt-0.5 text-xs text-gray-400">No tips</p>
      ) : (
        <>
          <p className="mt-0.5 text-xs text-gray-200">
            <span className="font-semibold text-white">
              {day.totalAmount.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{" "}
              XLM
            </span>
          </p>
          <p className="text-xs text-gray-400">
            {day.tipCount} tip{day.tipCount !== 1 ? "s" : ""}
          </p>
        </>
      )}
      {/* Arrow */}
      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
    </motion.div>
  );
}

// ─── Cell ─────────────────────────────────────────────────────────────────────

interface HeatmapCellProps {
  day: HeatmapDay;
  size: number;
  gap: number;
  theme: HeatmapTheme;
  animationDelay?: number;
}

export function HeatmapCell({
  day,
  size,
  gap,
  theme,
  animationDelay = 0,
}: HeatmapCellProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const cellRef = useRef<HTMLDivElement>(null);

  const color = getCellColor(day.level, theme);
  const isInteractive = !day.isFuture;

  const handleMouseEnter = () => {
    if (!isInteractive) return;
    setAnchorRect(cellRef.current?.getBoundingClientRect() ?? null);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => setShowTooltip(false);

  // Update rect on scroll/resize while tooltip is open
  useEffect(() => {
    if (!showTooltip) return;
    const update = () =>
      setAnchorRect(cellRef.current?.getBoundingClientRect() ?? null);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [showTooltip]);

  return (
    <>
      <motion.div
        ref={cellRef}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: animationDelay, ease: "easeOut" }}
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: Math.max(2, size * 0.18),
          cursor: isInteractive ? "pointer" : "default",
          outline: day.isToday ? "2px solid rgba(15,108,123,0.8)" : undefined,
          outlineOffset: day.isToday ? "1px" : undefined,
          opacity: day.isFuture ? 0.3 : 1,
        }}
        whileHover={isInteractive ? { scale: 1.35 } : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        tabIndex={isInteractive ? 0 : -1}
        role="gridcell"
        aria-label={
          day.isFuture
            ? `${day.date}: future`
            : day.totalAmount === 0
              ? `${day.date}: no tips`
              : `${day.date}: ${day.totalAmount.toFixed(2)} XLM, ${day.tipCount} tip${day.tipCount !== 1 ? "s" : ""}`
        }
      />

      {showTooltip && <CellTooltip day={day} anchorRect={anchorRect} />}
    </>
  );
}
