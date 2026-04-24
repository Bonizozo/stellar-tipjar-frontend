"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type BadgeColor = "primary" | "success" | "warning" | "error" | "info" | "neutral";
type BadgeSize = "sm" | "md" | "lg";
type BadgeStyle = "solid" | "outline" | "soft";

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  size?: BadgeSize;
  style?: BadgeStyle;
  icon?: ReactNode;
  animated?: boolean;
}

const colorVariants: Record<BadgeColor, Record<BadgeStyle, string>> = {
  primary: {
    solid: "bg-purple-600 text-white",
    outline: "border-2 border-purple-600 text-purple-600",
    soft: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
  success: {
    solid: "bg-green-600 text-white",
    outline: "border-2 border-green-600 text-green-600",
    soft: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
  warning: {
    solid: "bg-yellow-600 text-white",
    outline: "border-2 border-yellow-600 text-yellow-600",
    soft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  },
  error: {
    solid: "bg-red-600 text-white",
    outline: "border-2 border-red-600 text-red-600",
    soft: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  },
  info: {
    solid: "bg-blue-600 text-white",
    outline: "border-2 border-blue-600 text-blue-600",
    soft: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  neutral: {
    solid: "bg-gray-600 text-white",
    outline: "border-2 border-gray-600 text-gray-600",
    soft: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
  },
};

const sizeVariants: Record<BadgeSize, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

export function Badge({
  children,
  color = "primary",
  size = "md",
  style = "solid",
  icon,
  animated = false,
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center gap-1 rounded-full font-medium transition-colors";
  const colorClass = colorVariants[color][style];
  const sizeClass = sizeVariants[size];

  const content = (
    <span className={`${baseClasses} ${colorClass} ${sizeClass}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );

  if (animated) {
    return (
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
