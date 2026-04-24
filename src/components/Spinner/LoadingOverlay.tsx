"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "./index";
import type { SpinnerProps } from "./index";

interface LoadingOverlayProps extends SpinnerProps {
  visible: boolean;
  fullPage?: boolean;
  text?: string;
}

export function LoadingOverlay({ visible, fullPage = false, text, ...spinnerProps }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`${fullPage ? "fixed inset-0 z-50" : "absolute inset-0 z-10"} flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm`}
          aria-live="polite"
        >
          <Spinner {...spinnerProps} />
          {text && <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{text}</p>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
