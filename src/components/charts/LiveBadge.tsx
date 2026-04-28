"use client";

import { motion } from "framer-motion";

interface LiveBadgeProps {
  /** Seconds since last update — shows "stale" state if > threshold */
  secondsSinceUpdate?: number;
  staleThreshold?: number;
}

export function LiveBadge({
  secondsSinceUpdate = 0,
  staleThreshold = 10,
}: LiveBadgeProps) {
  const isStale = secondsSinceUpdate > staleThreshold;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        isStale
          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
          : "bg-moss/10 text-moss"
      }`}
    >
      <motion.span
        className={`inline-block h-1.5 w-1.5 rounded-full ${isStale ? "bg-amber-500" : "bg-moss"}`}
        animate={isStale ? {} : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {isStale ? `${secondsSinceUpdate}s ago` : "Live"}
    </span>
  );
}
