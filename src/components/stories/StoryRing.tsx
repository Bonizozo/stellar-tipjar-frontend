"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StoryRingProps {
  hasUnviewed: boolean;
  size?: number;
  children: React.ReactNode;
  onClick?: () => void;
}

export function StoryRing({ hasUnviewed, size = 56, children, onClick }: StoryRingProps) {
  const reduced = useReducedMotion();

  return (
    <button
      onClick={onClick}
      className="relative flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-wave rounded-full"
      aria-label="View story"
    >
      <motion.div
        className={`rounded-full p-[2px] ${
          hasUnviewed
            ? "bg-gradient-to-tr from-sunrise via-wave to-moss"
            : "bg-gray-300 dark:bg-gray-600"
        }`}
        style={{ width: size + 6, height: size + 6 }}
        animate={hasUnviewed && !reduced ? { rotate: [0, 360] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="rounded-full bg-white dark:bg-gray-900 p-[2px]"
          style={{ width: size + 2, height: size + 2 }}
        >
          <div
            className="rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700"
            style={{ width: size, height: size }}
          >
            {children}
          </div>
        </div>
      </motion.div>
    </button>
  );
}
