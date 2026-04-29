"use client";

import { motion } from "framer-motion";
import type { Level } from "@/types/gamification";

interface LevelBadgeProps {
  level: Level;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const sizeMap = {
  sm: { outer: "h-8 w-8 text-xs", icon: "text-sm" },
  md: { outer: "h-12 w-12 text-sm", icon: "text-xl" },
  lg: { outer: "h-16 w-16 text-base", icon: "text-3xl" },
};

export function LevelBadge({ level, size = "md", animated = false }: LevelBadgeProps) {
  const s = sizeMap[size];

  const badge = (
    <div
      className={`relative flex flex-col items-center justify-center rounded-full border-2 border-current font-bold ${s.outer} ${level.color} ${level.bgColor}`}
      aria-label={`Level ${level.level}: ${level.title}`}
    >
      <span className={s.icon} aria-hidden="true">{level.icon}</span>
    </div>
  );

  if (!animated) return badge;

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      transition={{ duration: 0.4 }}
    >
      {badge}
    </motion.div>
  );
}
