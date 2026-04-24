"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileIcon, X, CheckCircle, AlertCircle } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface UploadProgressProps {
  fileName: string;
  fileSize?: string | number;
  progress: number;
  status?: "uploading" | "completed" | "error";
  onCancel?: () => void;
  onRetry?: () => void;
  className?: string;
  showPreview?: boolean;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
  fileName,
  fileSize,
  progress,
  status = "uploading",
  onCancel,
  onRetry,
  className = "",
  showPreview = true,
}) => {
  const isCompleted = status === "completed" || progress === 100;
  const isError = status === "error";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className={`relative w-full overflow-hidden rounded-2xl border border-ink/10 bg-canvas/40 p-4 shadow-sm backdrop-blur-md dark:border-canvas/10 dark:bg-ink/40 ${className}`}
    >
      <div className="flex items-start gap-4">
        {showPreview && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-wave/10 text-wave dark:bg-wave/20 dark:text-wave-dark">
            <FileIcon className="h-6 w-6" />
          </div>
        )}

        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="truncate">
              <p className="truncate text-sm font-semibold text-ink dark:text-canvas">
                {fileName}
              </p>
              {fileSize && (
                <p className="text-xs text-ink/40 dark:text-canvas/40">
                  {fileSize}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1">
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-success"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </motion.div>
                ) : isError ? (
                  <motion.div
                    key="error"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-error"
                  >
                    <AlertCircle className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.button
                    key="cancel"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onCancel}
                    className="rounded-full p-1 text-ink/40 hover:bg-ink/5 hover:text-ink dark:text-canvas/40 dark:hover:bg-canvas/5 dark:hover:text-canvas"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-3">
            <ProgressBar
              progress={progress}
              size="sm"
              color={isError ? "error" : isCompleted ? "success" : "wave"}
              showPercentage={!isError && !isCompleted}
            />
          </div>

          <AnimatePresence>
            {isError && onRetry && (
                <motion.button
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onClick={onRetry}
                    className="mt-2 text-xs font-bold text-sunrise underline hover:opacity-80 transition-opacity"
                >
                    Retry upload
                </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
