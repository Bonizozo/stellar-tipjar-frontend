"use client";

import { motion } from "framer-motion";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type CardVariant = "default" | "elevated" | "outlined" | "glass";
export type CardHoverEffect = "none" | "lift" | "glow" | "border";
export type CardSize = "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverEffect?: CardHoverEffect;
  size?: CardSize;
  hoverable?: boolean;
  loading?: boolean;
  interactive?: boolean;
  children: ReactNode;
}

const variants: Record<CardVariant, string> = {
  default: "bg-white dark:bg-gray-800 shadow-md border border-gray-200/50 dark:border-gray-700/50",
  elevated: "bg-white dark:bg-gray-800 shadow-xl border border-gray-200/30 dark:border-gray-700/30 hover:shadow-2xl",
  outlined: "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-sm",
  glass: "backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-700/30 shadow-lg",
};

const hoverEffects: Record<CardHoverEffect, string> = {
  none: "",
  lift: "hover:-translate-y-1 hover:shadow-xl",
  glow: "hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-400/20",
  border: "hover:border-purple-400 dark:hover:border-purple-500 hover:border-2",
};

const sizes: Record<CardSize, string> = {
  sm: "p-4 rounded-xl",
  md: "p-6 rounded-2xl",
  lg: "p-8 rounded-3xl",
};

const LoadingSkeleton = ({ size }: { size: CardSize }) => (
  <div className={`animate-pulse ${sizes[size]}`}>
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    children,
    className = "",
    variant = "default",
    hoverEffect = "none",
    size = "md",
    hoverable = false,
    loading = false,
    interactive = false,
    onClick,
    onKeyDown,
    tabIndex,
    role,
    ...props
  },
  ref
) {
  const prefersReduced = useReducedMotion();
  const isClickable = !!onClick || hoverable || interactive;

  // Handle keyboard interaction for interactive cards
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isClickable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick?.(e as any);
    }
    onKeyDown?.(e);
  };

  if (loading) {
    return (
      <div
        ref={ref}
        className={[
          variants[variant],
          sizes[size],
          "transition-all duration-300",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <LoadingSkeleton size={size} />
      </div>
    );
  }

  const cardContent = (
    <div
      ref={ref}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={isClickable ? (tabIndex ?? 0) : tabIndex}
      role={role || (isClickable ? "button" : undefined)}
      className={[
        variants[variant],
        sizes[size],
        "transition-all duration-300",
        isClickable && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2",
        !prefersReduced && hoverEffect !== "none" && hoverEffects[hoverEffect],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );

  if (!prefersReduced && (hoverable || hoverEffect === "lift")) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={isClickable ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
});