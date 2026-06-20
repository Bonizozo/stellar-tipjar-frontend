"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDownIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ProgressBar } from "@/components/Progress/ProgressBar";
import {
  useCompletionPercentage,
  useIncompleteFields,
  useProfileCompletionStore,
} from "@/store/profileCompletionStore";

export function ProfileCompletionIndicator() {
  const percentage = useCompletionPercentage();
  const incompleteFields = useIncompleteFields();
  const { dismissItem, restoreItem } = useProfileCompletionStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const isComplete = percentage === 100;

  if (isComplete && incompleteFields.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-xl border border-moss/20 bg-moss/5 p-4 text-center"
      >
        <div className="flex items-center justify-center gap-2">
          <CheckCircleIcon className="h-5 w-5 text-moss" />
          <p className="font-semibold text-moss">🎉 Profile Complete!</p>
        </div>
        <p className="mt-1 text-sm text-moss/70">
          Your profile is fully set up. Keep it updated to maintain
          discoverability!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl border border-sunrise/20 bg-gradient-to-r from-sunrise/5 to-wave/5 p-4"
    >
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink/60 dark:text-canvas/60">
              Profile Completion
            </p>
            <p className="text-lg font-bold text-ink dark:text-canvas">
              {percentage}%
            </p>
          </div>
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-lg p-2 hover:bg-ink/5 dark:hover:bg-canvas/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronDownIcon
              className={`h-5 w-5 text-ink/60 dark:text-canvas/60 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </motion.button>
        </div>

        <ProgressBar
          progress={percentage}
          max={100}
          color="sunrise"
          size="md"
          showPercentage={false}
        />
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && incompleteFields.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-2 border-t border-ink/10 dark:border-canvas/10 pt-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-ink/60 dark:text-canvas/60">
              Complete these items to boost discoverability:
            </p>

            <div className="space-y-2">
              {incompleteFields.map((field) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="group flex items-start justify-between gap-3 rounded-lg bg-canvas/50 dark:bg-ink/30 p-3 transition-colors hover:bg-canvas dark:hover:bg-ink/40"
                >
                  <div className="flex-1 min-w-0">
                    <Link href={field.link as any}>
                      <p className="text-sm font-semibold text-sunrise hover:underline">
                        {field.label}
                      </p>
                    </Link>
                    <p className="text-xs text-ink/60 dark:text-canvas/60">
                      {field.description}
                    </p>
                  </div>

                  <motion.button
                    onClick={() => dismissItem(field.id)}
                    className="mt-1 flex-shrink-0 rounded p-1 text-ink/40 hover:bg-ink/10 dark:text-canvas/40 dark:hover:bg-canvas/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Dismiss"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No incomplete fields message */}
      {isExpanded && incompleteFields.length === 0 && !isComplete && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 border-t border-ink/10 dark:border-canvas/10 pt-4 text-center"
        >
          <p className="text-xs text-ink/60 dark:text-canvas/60">
            All dismissed! You can expand again anytime.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
