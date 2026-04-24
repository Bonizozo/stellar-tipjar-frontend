"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  max?: number;
  indeterminate?: boolean;
  label?: string;
  showPercentage?: boolean;
  color?: "primary" | "secondary" | "sunrise" | "wave" | "moss" | "success" | "error";
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const colorClasses: Record<string, string> = {
  primary: "bg-ink dark:bg-canvas",
  secondary: "bg-ink/50 dark:bg-canvas/50",
  sunrise: "bg-sunrise",
  wave: "bg-wave",
  moss: "bg-moss",
  success: "bg-success",
  error: "bg-error",
};

const sizeClasses: Record<string, string> = {
  xs: "h-0.5",
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  max = 100,
  indeterminate = false,
  label,
  showPercentage = false,
  color = "wave",
  className = "",
  size = "md",
}) => {
  const percentage = Math.min(Math.max((progress / max) * 100, 0), 100);

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-ink/60 dark:text-canvas/60">
          <span>{label}</span>
          {showPercentage && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full bg-ink/5 dark:bg-canvas/5 ${sizeClasses[size]}`}
      >
        <AnimatePresence>
          {indeterminate ? (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`h-full w-1/3 rounded-full opacity-60 ${colorClasses[color]}`}
            />
          ) : (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className={`h-full rounded-full ${colorClasses[color]}`}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
