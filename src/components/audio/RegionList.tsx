"use client";

import { Trash2 } from "lucide-react";
import type { WaveformRegion } from "@/types/audio";

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

interface RegionListProps {
  regions: WaveformRegion[];
  onRegionClick: (region: WaveformRegion) => void;
  onRegionRemove: (id: string) => void;
}

export function RegionList({ regions, onRegionClick, onRegionRemove }: RegionListProps) {
  if (regions.length === 0) {
    return (
      <p className="text-xs text-ink/40 italic py-2">
        Drag on the waveform to create a region
      </p>
    );
  }

  return (
    <div className="space-y-1.5">
      {regions.map((region, i) => (
        <div
          key={region.id}
          className="flex items-center gap-3 rounded-xl border border-ink/10 bg-[color:var(--surface)] px-3 py-2 hover:border-ink/20 transition-colors"
        >
          {/* Color swatch */}
          <div
            className="h-3 w-3 rounded-full shrink-0"
            style={{ backgroundColor: region.color ?? "rgba(99,102,241,0.6)" }}
          />

          {/* Label + time range */}
          <button
            type="button"
            onClick={() => onRegionClick(region)}
            className="flex-1 text-left"
          >
            <p className="text-xs font-medium text-ink">
              {region.label ?? `Region ${i + 1}`}
            </p>
            <p className="text-[10px] text-ink/50 tabular-nums">
              {formatTime(region.start)} – {formatTime(region.end)}
            </p>
          </button>

          {/* Remove */}
          <button
            type="button"
            onClick={() => onRegionRemove(region.id)}
            className="text-ink/30 hover:text-red-500 transition-colors"
            aria-label={`Remove region ${region.label ?? i + 1}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
