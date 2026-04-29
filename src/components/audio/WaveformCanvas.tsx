"use client";

import { useEffect, useRef, useCallback } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { WaveformRegion, WaveformStyle } from "@/types/audio";

interface WaveformCanvasProps {
  peaks: Float32Array;
  currentTime: number;
  duration: number;
  zoom: number;
  regions: WaveformRegion[];
  style: WaveformStyle;
  /** Scroll offset in pixels (for zoom > 1) */
  scrollLeft?: number;
  onSeek?: (time: number) => void;
  onRegionDragStart?: (startTime: number) => void;
  onRegionDragEnd?: (startTime: number, endTime: number) => void;
  className?: string;
}

export function WaveformCanvas({
  peaks,
  currentTime,
  duration,
  zoom,
  regions,
  style,
  scrollLeft = 0,
  onSeek,
  onRegionDragStart,
  onRegionDragEnd,
  className = "",
}: WaveformCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragStartRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !peaks.length) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = style.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const totalWidth = width * zoom;
    const visibleStart = scrollLeft;
    const visibleEnd = scrollLeft + width;

    // Background
    if (style.backgroundColor !== "transparent") {
      ctx.fillStyle = style.backgroundColor;
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    const barTotal = style.barWidth + style.barGap;
    const numBars = Math.floor(totalWidth / barTotal);
    const peaksPerBar = peaks.length / numBars;
    const centerY = height / 2;

    // Draw regions
    for (const region of regions) {
      if (duration <= 0) continue;
      const rStart = (region.start / duration) * totalWidth - visibleStart;
      const rEnd = (region.end / duration) * totalWidth - visibleStart;
      if (rEnd < 0 || rStart > width) continue;

      ctx.fillStyle = region.color ?? style.regionColor;
      ctx.fillRect(
        Math.max(0, rStart),
        0,
        Math.min(width, rEnd) - Math.max(0, rStart),
        height
      );

      // Region label
      if (region.label) {
        ctx.fillStyle = style.progressColor;
        ctx.font = "10px sans-serif";
        ctx.fillText(region.label, Math.max(4, rStart + 4), 14);
      }
    }

    // Draw bars
    const progressX = duration > 0 ? (currentTime / duration) * totalWidth - visibleStart : 0;

    for (let i = 0; i < numBars; i++) {
      const barX = i * barTotal - visibleStart;
      if (barX + style.barWidth < 0 || barX > width) continue;

      // Average peaks for this bar
      const peakStart = Math.floor(i * peaksPerBar);
      const peakEnd = Math.min(peaks.length, Math.ceil((i + 1) * peaksPerBar));
      let amp = 0;
      for (let p = peakStart; p < peakEnd; p++) amp += peaks[p];
      amp /= peakEnd - peakStart || 1;

      const barHeight = Math.max(2, amp * (height * 0.85));
      const y = centerY - barHeight / 2;

      // Color: progress vs unplayed
      ctx.fillStyle = barX < progressX ? style.progressColor : style.waveColor;

      if (style.barRadius > 0) {
        roundRect(ctx, barX, y, style.barWidth, barHeight, style.barRadius);
        ctx.fill();
      } else {
        ctx.fillRect(barX, y, style.barWidth, barHeight);
      }
    }

    // Cursor line
    if (progressX >= 0 && progressX <= width) {
      ctx.strokeStyle = style.cursorColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(progressX, 0);
      ctx.lineTo(progressX, height);
      ctx.stroke();
    }
  }, [peaks, currentTime, duration, zoom, regions, style, scrollLeft]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [draw]);

  const timeFromX = useCallback(
    (clientX: number): number => {
      const canvas = canvasRef.current;
      if (!canvas || duration <= 0) return 0;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left + scrollLeft;
      return Math.max(0, Math.min(duration, (x / (canvas.offsetWidth * zoom)) * duration));
    },
    [duration, zoom, scrollLeft]
  );

  const handlePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLCanvasElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const t = timeFromX(e.clientX);
      dragStartRef.current = t;
      isDraggingRef.current = false;
      onSeek?.(t);
      onRegionDragStart?.(t);
    },
    [timeFromX, onSeek, onRegionDragStart]
  );

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLCanvasElement>) => {
      if (dragStartRef.current === null) return;
      isDraggingRef.current = true;
      onSeek?.(timeFromX(e.clientX));
    },
    [timeFromX, onSeek]
  );

  const handlePointerUp = useCallback(
    (e: ReactPointerEvent<HTMLCanvasElement>) => {
      if (dragStartRef.current !== null && isDraggingRef.current) {
        const endTime = timeFromX(e.clientX);
        const startTime = dragStartRef.current;
        if (Math.abs(endTime - startTime) > 0.1) {
          onRegionDragEnd?.(
            Math.min(startTime, endTime),
            Math.max(startTime, endTime)
          );
        }
      }
      dragStartRef.current = null;
      isDraggingRef.current = false;
    },
    [timeFromX, onRegionDragEnd]
  );

  return (
    <canvas
      ref={canvasRef}
      className={`w-full cursor-pointer select-none touch-none ${className}`}
      style={{ height: style.height }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      aria-label="Audio waveform — click to seek"
      role="slider"
      aria-valuemin={0}
      aria-valuemax={duration}
      aria-valuenow={currentTime}
    />
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
