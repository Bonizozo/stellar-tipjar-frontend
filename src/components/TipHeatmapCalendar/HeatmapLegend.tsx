"use client";

import { getCellColor, HeatmapTheme } from "./HeatmapCell";

interface HeatmapLegendProps {
  theme: HeatmapTheme;
  cellSize: number;
}

const LEVELS = [0, 1, 2, 3, 4] as const;
const LABELS = ["None", "Low", "Medium", "High", "Peak"];

export function HeatmapLegend({ theme, cellSize }: HeatmapLegendProps) {
  return (
    <div className="flex items-center gap-2" aria-label="Activity level legend">
      <span className="text-xs text-ink/40">Less</span>
      {LEVELS.map((level) => (
        <div
          key={level}
          style={{
            width: cellSize,
            height: cellSize,
            backgroundColor: getCellColor(level, theme),
            borderRadius: Math.max(2, cellSize * 0.18),
          }}
          title={LABELS[level]}
          aria-label={`Level ${level}: ${LABELS[level]}`}
        />
      ))}
      <span className="text-xs text-ink/40">More</span>
    </div>
  );
}
