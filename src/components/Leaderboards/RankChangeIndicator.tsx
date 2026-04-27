"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface RankChangeIndicatorProps {
  change: number; // positive = moved up (rank improved), negative = moved down
  isNew?: boolean;
}

export function RankChangeIndicator({ change, isNew }: RankChangeIndicatorProps) {
  if (isNew) {
    return (
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="inline-flex items-center gap-0.5 rounded-full bg-wave/15 px-2 py-0.5 text-xs font-bold text-wave"
      >
        NEW
      </motion.span>
    );
  }

  if (change === 0) {
    return (
      <span className="inline-flex items-center text-ink/30">
        <Minus className="h-3 w-3" />
      </span>
    );
  }

  const improved = change > 0;

  return (
    <motion.span
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold ${
        improved
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      }`}
    >
      {improved ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      {Math.abs(change)}
    </motion.span>
  );
}
