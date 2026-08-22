"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StreakBadgeProps {
  streak: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const sizeMap = {
  sm: { container: "px-2 py-1 text-xs gap-1", icon: 12 },
  md: { container: "px-3 py-1.5 text-sm gap-1.5", icon: 14 },
  lg: { container: "px-4 py-2 text-base gap-2", icon: 18 },
};

function getStreakColor(streak: number): string {
  if (streak >= 100) return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
  if (streak >= 30) return "bg-gradient-to-r from-orange-500 to-red-500 text-white";
  if (streak >= 14) return "bg-gradient-to-r from-sunrise to-orange-400 text-white";
  if (streak >= 7) return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
  return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
}

export function StreakBadge({ streak, size = "md", animated = false }: StreakBadgeProps) {
  const reduced = useReducedMotion();
  const { container, icon } = sizeMap[size];
  const colorClass = getStreakColor(streak);

  const content = (
    <span className={`inline-flex items-center rounded-full font-semibold ${container} ${colorClass}`}>
      <Flame size={icon} aria-hidden="true" />
      <span>{streak} day{streak !== 1 ? "s" : ""}</span>
    </span>
  );

  if (animated && !reduced && streak >= 7) {
    return (
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
