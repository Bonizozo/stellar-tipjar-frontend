"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertAction {
  label: string;
  onClick: () => void;
}

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: ReactNode;
  action?: AlertAction;
  dismissible?: boolean;
  onDismiss?: () => void;
  show?: boolean;
}

const styles: Record<AlertVariant, string> = {
  info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-200",
  success: "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-700 dark:text-green-200",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-200",
  error: "bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-700 dark:text-red-200",
};

const icons: Record<AlertVariant, ReactNode> = {
  info: <Info className="h-5 w-5 shrink-0 text-blue-500" />,
  success: <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />,
  warning: <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-500" />,
  error: <XCircle className="h-5 w-5 shrink-0 text-red-500" />,
};

export function Alert({
  variant = "info",
  title,
  message,
  action,
  dismissible = false,
  onDismiss,
  show = true,
}: AlertProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="alert"
          aria-live="polite"
          className={`flex items-start gap-3 rounded-lg border p-4 ${styles[variant]}`}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
        >
          {icons[variant]}
          <div className="flex-1 min-w-0">
            {title && <p className="font-semibold text-sm">{title}</p>}
            <p className="text-sm mt-0.5">{message}</p>
            {action && (
              <button
                onClick={action.onClick}
                className="mt-2 text-sm font-medium underline underline-offset-2 hover:no-underline"
              >
                {action.label}
              </button>
            )}
          </div>
          {dismissible && onDismiss && (
            <button
              onClick={onDismiss}
              aria-label="Dismiss"
              className="shrink-0 rounded p-0.5 opacity-60 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
