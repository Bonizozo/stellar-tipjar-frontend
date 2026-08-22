"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTour, TOUR_STEPS } from "@/hooks/useTour";

interface TooltipPos {
  top: number;
  left: number;
  placement: "top" | "bottom" | "left" | "right";
}

function getTooltipPos(el: Element): TooltipPos {
  const rect = el.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const tooltipH = 140;
  const tooltipW = 280;
  const gap = 12;

  // Prefer bottom, then top, then right
  if (rect.bottom + tooltipH + gap < vh) {
    return {
      top: rect.bottom + gap + window.scrollY,
      left: Math.min(Math.max(rect.left + rect.width / 2 - tooltipW / 2, 8), vw - tooltipW - 8),
      placement: "bottom",
    };
  }
  if (rect.top - tooltipH - gap > 0) {
    return {
      top: rect.top - tooltipH - gap + window.scrollY,
      left: Math.min(Math.max(rect.left + rect.width / 2 - tooltipW / 2, 8), vw - tooltipW - 8),
      placement: "top",
    };
  }
  return {
    top: rect.top + rect.height / 2 - tooltipH / 2 + window.scrollY,
    left: rect.right + gap,
    placement: "right",
  };
}

export function ProductTour() {
  const { isOpen, step, next, skip, total } = useTour();
  const [pos, setPos] = useState<TooltipPos | null>(null);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);

  const currentStep = TOUR_STEPS[step];

  const positionTooltip = useCallback(() => {
    if (!isOpen) return;
    const el = document.querySelector(`[data-tour="${currentStep.target}"]`);
    if (!el) {
      setPos({ top: window.innerHeight / 2 - 70, left: window.innerWidth / 2 - 140, placement: "bottom" });
      setHighlightRect(null);
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setPos(getTooltipPos(el));
    setHighlightRect(el.getBoundingClientRect());
  }, [isOpen, currentStep]);

  useEffect(() => {
    positionTooltip();
    window.addEventListener("resize", positionTooltip);
    return () => window.removeEventListener("resize", positionTooltip);
  }, [positionTooltip]);

  if (!isOpen || !pos) return null;

  const arrowClass =
    pos.placement === "bottom"
      ? "absolute -top-2 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white dark:border-b-zinc-800"
      : pos.placement === "top"
      ? "absolute -bottom-2 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-zinc-800"
      : "absolute -left-2 top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-8 border-t-transparent border-b-transparent border-r-white dark:border-r-zinc-800";

  return createPortal(
    <>
      {/* Overlay with cutout highlight */}
      <div
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          background: highlightRect
            ? `
              linear-gradient(to bottom, rgba(0,0,0,0.5) ${highlightRect.top - 4}px, transparent ${highlightRect.top - 4}px),
              linear-gradient(to top, rgba(0,0,0,0.5) ${window.innerHeight - highlightRect.bottom - 4}px, transparent ${window.innerHeight - highlightRect.bottom - 4}px),
              linear-gradient(to right, rgba(0,0,0,0.5) ${highlightRect.left - 4}px, transparent ${highlightRect.left - 4}px),
              linear-gradient(to left, rgba(0,0,0,0.5) ${window.innerWidth - highlightRect.right - 4}px, transparent ${window.innerWidth - highlightRect.right - 4}px)
            `
            : "rgba(0,0,0,0.5)",
        }}
        aria-hidden="true"
      />
      {/* Clickable backdrop for skip */}
      <div
        className="fixed inset-0 z-[9998] cursor-pointer"
        style={{ pointerEvents: "auto" }}
        onClick={skip}
        aria-label="Skip tour"
        role="button"
      />
      {/* Tooltip */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Tour step ${step + 1} of ${total}: ${currentStep.title}`}
        className="fixed z-[9999] w-70 max-w-[calc(100vw-16px)] rounded-xl bg-white dark:bg-zinc-800 shadow-2xl border border-zinc-100 dark:border-zinc-700 p-4"
        style={{ top: pos.top, left: pos.left, width: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={arrowClass} />

        {/* Step indicator */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-4 bg-wave" : "w-1.5 bg-zinc-200 dark:bg-zinc-600"
              }`}
            />
          ))}
        </div>

        <h3 className="text-sm font-semibold text-ink mb-1">{currentStep.title}</h3>
        <p className="text-xs text-ink/60 mb-4 leading-relaxed">{currentStep.content}</p>

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={skip}
            className="text-xs text-ink/40 hover:text-ink/70 transition-colors"
          >
            Skip tour
          </button>
          <button
            onClick={next}
            className="rounded-lg bg-wave px-3 py-1.5 text-xs font-medium text-white hover:bg-wave/90 transition-colors"
          >
            {step + 1 < total ? "Next →" : "Done ✓"}
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
