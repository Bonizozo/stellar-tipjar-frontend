"use client";

import { motion } from "framer-motion";
import type { SpinnerProps } from "./index";

const DOT_SIZE: Record<string, string> = { sm: "w-1.5 h-1.5", md: "w-2.5 h-2.5", lg: "w-3.5 h-3.5", xl: "w-5 h-5" };

export function DotsSpinner({ size = "md", color = "currentColor", label = "Loading…" }: SpinnerProps) {
  return (
    <div className="flex items-center gap-1.5" role="status" aria-label={label}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`rounded-full ${DOT_SIZE[size]}`}
          style={{ backgroundColor: color }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
