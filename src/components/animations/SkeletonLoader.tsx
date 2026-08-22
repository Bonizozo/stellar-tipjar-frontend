"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SkeletonLoaderProps {
  className?: string;
  /** Number of rows to render */
  rows?: number;
  /** Show a card-shaped skeleton */
  variant?: "text" | "card" | "avatar" | "custom";
}

function SkeletonBlock({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={`bg-gray-200 dark:bg-gray-700 rounded ${className}`} />;
  }

  return (
    <motion.div
      className={`rounded overflow-hidden relative ${className}`}
      style={{
        background:
          "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
        backgroundSize: "400% 100%",
      }}
      animate={{ backgroundPosition: ["100% 0", "-100% 0"] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function SkeletonLoader({ className, rows = 3, variant = "text" }: SkeletonLoaderProps) {
  if (variant === "card") {
    return (
      <div className={`p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4 ${className}`}>
        <div className="flex items-center gap-3">
          <SkeletonBlock className="w-12 h-12 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock className="h-4 w-2/3" />
            <SkeletonBlock className="h-3 w-1/3" />
          </div>
        </div>
        <SkeletonBlock className="h-3 w-full" />
        <SkeletonBlock className="h-3 w-5/6" />
        <SkeletonBlock className="h-8 w-1/3 rounded-xl" />
      </div>
    );
  }

  if (variant === "avatar") {
    return <SkeletonBlock className={`rounded-full ${className ?? "w-12 h-12"}`} />;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonBlock
          key={i}
          className={`h-4 ${i === rows - 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}
