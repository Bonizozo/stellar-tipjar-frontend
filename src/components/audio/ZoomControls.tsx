"use client";

import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  min?: number;
  max?: number;
}

export function ZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  min = 1,
  max = 10,
}: ZoomControlsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onZoomOut}
        disabled={zoom <= min}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink/60 hover:text-ink hover:border-ink/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Zoom out"
      >
        <ZoomOut className="h-3.5 w-3.5" />
      </button>

      <span className="min-w-[3rem] text-center text-xs font-medium text-ink/60 tabular-nums">
        {zoom.toFixed(1)}×
      </span>

      <button
        type="button"
        onClick={onZoomIn}
        disabled={zoom >= max}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink/60 hover:text-ink hover:border-ink/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Zoom in"
      >
        <ZoomIn className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        onClick={onReset}
        disabled={zoom === 1}
        className="flex h-7 w-7 items-center justify-center rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink/60 hover:text-ink hover:border-ink/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Reset zoom"
      >
        <Maximize2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
