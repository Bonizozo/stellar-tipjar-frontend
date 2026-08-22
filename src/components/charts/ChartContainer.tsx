"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowsPointingOutIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

interface ChartContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  /** Extra badge/label shown next to the title (e.g. "Live") */
  badge?: ReactNode;
  className?: string;
  onExport?: () => void;
}

/**
 * Wrapper card used by every chart component.
 * Provides consistent header, optional export button, and fullscreen toggle.
 */
export function ChartContainer({
  title,
  description,
  children,
  actions,
  badge,
  className = "",
  onExport,
}: ChartContainerProps) {
  const [fullscreen, setFullscreen] = useState(false);

  const inner = (
    <div
      className={`rounded-2xl border border-ink/10 bg-[color:var(--surface)] ${
        fullscreen ? "fixed inset-4 z-50 overflow-auto shadow-2xl" : ""
      } ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink/10 px-6 py-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-ink">{title}</h3>
            {badge}
          </div>
          {description && (
            <p className="mt-0.5 text-xs text-ink/50">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {actions}
          {onExport && (
            <button
              onClick={onExport}
              title="Export chart data"
              className="rounded-lg p-1.5 text-ink/50 transition hover:bg-ink/5 hover:text-ink"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setFullscreen((v) => !v)}
            title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
            className="rounded-lg p-1.5 text-ink/50 transition hover:bg-ink/5 hover:text-ink"
          >
            <ArrowsPointingOutIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">{children}</div>
    </div>
  );

  return (
    <>
      {inner}
      {/* Backdrop for fullscreen */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setFullscreen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
