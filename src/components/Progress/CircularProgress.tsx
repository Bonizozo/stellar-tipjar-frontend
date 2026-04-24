"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CircularProgressProps {
  progress: number;
  max?: number;
  size?: number; // width/height in px
  thickness?: number; // stroke width in px
  color?: string;
  className?: string;
  showPercentage?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  max = 100,
  size = 64,
  thickness = 4,
  color = "text-sunrise",
  className = "",
  showPercentage = false,
}) => {
  const percentage = Math.min(Math.max((progress / max) * 100, 0), 100);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          className="text-ink/10 dark:text-canvas/10"
          strokeWidth={thickness}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          className={color}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          strokeLinecap="round"
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-ink dark:text-canvas">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};
