"use client";

import { motion } from "framer-motion";
import type { SpinnerProps } from "./index";

const BAR_HEIGHT: Record<string, string> = { sm: "h-3", md: "h-5", lg: "h-7", xl: "h-10" };
const BAR_WIDTH: Record<string, string> = { sm: "w-0.5", md: "w-1", lg: "w-1.5", xl: "w-2" };

export function BarsSpinner({ size = "md", color = "currentColor", label = "Loading…" }: SpinnerProps) {
  return (
    <div className="flex items-end gap-1" role="status" aria-label={label}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`rounded-sm ${BAR_WIDTH[size]} ${BAR_HEIGHT[size]}`}
          style={{ backgroundColor: color }}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
