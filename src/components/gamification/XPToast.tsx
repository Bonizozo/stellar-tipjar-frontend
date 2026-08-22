"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface XPToastProps {
  amount: number;
  reason: string;
  onDone?: () => void;
}

export function XPToast({ amount, reason, onDone }: XPToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDone?.(), 400);
    }, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="fixed bottom-24 right-6 z-50 flex items-center gap-3 rounded-2xl border border-wave/30 bg-[color:var(--surface)] px-5 py-3 shadow-2xl"
          role="status"
          aria-live="polite"
        >
          <span className="text-2xl" aria-hidden="true">⚡</span>
          <div>
            <p className="text-sm font-bold text-wave">+{amount} XP</p>
            <p className="text-xs text-ink/60">{reason}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
