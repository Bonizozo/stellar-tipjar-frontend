"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";

type TagColor = "primary" | "success" | "warning" | "error" | "info" | "neutral";
type TagSize = "sm" | "md" | "lg";
type TagStyle = "solid" | "outline" | "soft";

interface TagProps {
  children: ReactNode;
  color?: TagColor;
  size?: TagSize;
  style?: TagStyle;
  icon?: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  pill?: boolean;
}

const colorVariants: Record<TagColor, Record<TagStyle, string>> = {
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

const sizeVariants: Record<TagSize, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

export function Tag({
  children,
  color = "primary",
  size = "md",
  style = "soft",
  icon,
  removable = false,
  onRemove,
  pill = true,
}: TagProps) {
  const baseClasses = `inline-flex items-center gap-1 font-medium transition-colors ${
    pill ? "rounded-full" : "rounded-lg"
  }`;
  const colorClass = colorVariants[color][style];
  const sizeClass = sizeVariants[size];

  return (
    <motion.div
      className={`${baseClasses} ${colorClass} ${sizeClass}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label={`Remove ${children}`}
        >
          <X size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
        </button>
      )}
    </motion.div>
  );
}
