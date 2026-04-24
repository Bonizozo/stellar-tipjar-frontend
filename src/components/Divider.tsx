"use client";

import React from "react";
import { motion } from "framer-motion";

interface DividerProps {
  text?: string;
  icon?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted" | "gradient";
  color?: string;
  className?: string;
  thickness?: number;
  ornament?: boolean;
}

export const Divider: React.FC<DividerProps> = ({
  text,
  icon,
  orientation = "horizontal",
  variant = "solid",
  color,
  className = "",
  thickness = 1,
  ornament = false,
}: DividerProps) => {
  const isHorizontal = orientation === "horizontal";

  const getBorderStyle = () => {
    switch (variant) {
      case "dashed": return "border-dashed";
      case "dotted": return "border-dotted";
      case "gradient": return "border-none";
      default: return "border-solid";
    }
  };

  const borderClass = color || "border-ink/10 dark:border-canvas/10";
  const borderStyle = getBorderStyle();

  if (!isHorizontal) {
    return (
      <div
        className={`inline-flex items-center self-stretch py-2 ${className}`}
        style={{ height: "auto" }}
      >
        {variant === "gradient" ? (
          <div 
            className="w-px bg-gradient-to-b from-transparent via-wave to-transparent opacity-50"
            style={{ width: `${thickness}px`, minHeight: "1rem" }}
          />
        ) : (
          <div
            className={`h-full border-l ${borderStyle} ${borderClass}`}
            style={{ borderWidth: `0 0 0 ${thickness}px` }}
          />
        )}
      </div>
    );
  }

  if (ornament) {
    return (
      <div className={`flex items-center justify-center py-8 ${className}`}>
        <div className="flex items-center gap-3">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-2 w-2 rounded-full bg-sunrise" 
          />
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            className="h-px bg-gradient-to-r from-sunrise to-wave" 
          />
          <div className="h-3 w-3 rounded-full bg-wave ring-2 ring-wave/20" />
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            className="h-px bg-gradient-to-r from-wave to-sunrise" 
          />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-2 w-2 rounded-full bg-sunrise" 
          />
        </div>
      </div>
    );
  }

  if (text || icon) {
    return (
      <div className={`relative flex items-center py-4 ${className}`}>
        <div className={`flex-grow border-t ${borderStyle} ${borderClass}`} style={{ borderTopWidth: `${thickness}px` }} />
        <span className="flex-shrink mx-4 flex items-center gap-2 text-ink/60 dark:text-canvas/60 text-sm font-medium">
          {icon}
          {text}
        </span>
        <div className={`flex-grow border-t ${borderStyle} ${borderClass}`} style={{ borderTopWidth: `${thickness}px` }} />
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div 
        className={`w-full overflow-hidden py-4 ${className}`}
      >
        <div 
          className="h-px bg-gradient-to-r from-transparent via-wave to-transparent opacity-50"
          style={{ height: `${thickness}px` }}
        />
      </div>
    );
  }

  return (
    <div 
      className={`w-full border-t ${borderStyle} ${borderClass} py-4 ${className}`}
      style={{ borderTopWidth: `${thickness}px` }}
    />
  );
};
