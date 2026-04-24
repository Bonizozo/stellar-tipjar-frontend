"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import type { Toast, ToastVariant } from "@/contexts/ToastContext";
import { useToastContext } from "@/contexts/ToastContext";

// ── Icons ────────────────────────────────────────────────────────────────────

const ICONS: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
    </svg>
  ),
};

const PROGRESS_COLORS: Record<ToastVariant, string> = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
};

// ── Single Toast ─────────────────────────────────────────────────────────────

function ToastItem({ toast }: { toast: Toast }) {
  const { remove } = useToastContext();
  const [paused, setPaused] = useState(false);
  const elapsed = useRef(0);
  const startRef = useRef(Date.now());

  // Progress bar width (100 → 0)
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (paused) {
      elapsed.current += Date.now() - startRef.current;
      return;
    }
    startRef.current = Date.now();
    const remaining = toast.duration - elapsed.current;
    if (remaining <= 0) { remove(toast.id); return; }

    const interval = 16;
    const step = (interval / remaining) * 100;
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = p - step;
        if (next <= 0) { clearInterval(timer); remove(toast.id); return 0; }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [paused, toast.duration, toast.id, remove]);

  // Swipe-to-dismiss
  const x = useMotionValue(0);

  const isTop = toast.position.startsWith("top");

  return (
    <motion.div
      layout
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 80) remove(toast.id);
      }}
      initial={{ opacity: 0, y: isTop ? -20 : 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 120, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex items-start gap-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 min-w-[300px] max-w-sm overflow-hidden cursor-grab active:cursor-grabbing select-none"
    >
      {/* Icon */}
      <span className="mt-0.5 shrink-0">{ICONS[toast.variant]}</span>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 break-words">
          {toast.message}
        </p>
        {toast.action && (
          <button
            onClick={() => { toast.action!.onClick(); remove(toast.id); }}
            className="mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Close */}
      <button
        onClick={() => remove(toast.id)}
        aria-label="Dismiss notification"
        className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-1 ${PROGRESS_COLORS[toast.variant]} transition-none`}
        style={{ width: `${progress}%` }}
      />
    </motion.div>
  );
}

// ── Position groups ───────────────────────────────────────────────────────────

const POSITION_CLASSES: Record<Toast["position"], string> = {
  "top-right":      "top-4 right-4 items-end",
  "top-center":     "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-left":       "top-4 left-4 items-start",
  "bottom-right":   "bottom-4 right-4 items-end",
  "bottom-center":  "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-left":    "bottom-4 left-4 items-start",
};

export function ToastContainer() {
  const { toasts } = useToastContext();

  // Group by position
  const groups = toasts.reduce<Record<string, Toast[]>>((acc, t) => {
    (acc[t.position] ??= []).push(t);
    return acc;
  }, {});

  return (
    <>
      {(Object.entries(groups) as [Toast["position"], Toast[]][]).map(([position, group]) => (
        <div
          key={position}
          className={`fixed z-50 flex flex-col gap-2 pointer-events-none ${POSITION_CLASSES[position]}`}
        >
          <AnimatePresence mode="sync">
            {group.map((toast) => (
              <div key={toast.id} className="pointer-events-auto">
                <ToastItem toast={toast} />
              </div>
            ))}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
}
