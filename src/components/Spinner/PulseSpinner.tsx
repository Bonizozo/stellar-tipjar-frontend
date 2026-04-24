"use client";

import { motion } from "framer-motion";
import type { SpinnerProps } from "./index";
import { SIZE_MAP } from "./index";

export function PulseSpinner({ size = "md", color = "currentColor", label = "Loading…" }: SpinnerProps) {
  return (
    <div className={`relative flex items-center justify-center ${SIZE_MAP[size]}`} role="status" aria-label={label}>
      <motion.div
        className="absolute inset-0 rounded-full opacity-30"
        style={{ backgroundColor: color }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="rounded-full w-1/2 h-1/2" style={{ backgroundColor: color }} />
    </div>
  );
}
