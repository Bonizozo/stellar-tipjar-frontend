"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AlertVariant } from "./Alert";

export type BannerPosition = "top" | "bottom" | "inline";

interface BannerAction {
  label: string;
  onClick: () => void;
}

interface BannerProps {
  id: string;
  message: ReactNode;
  variant?: AlertVariant;
  position?: BannerPosition;
  action?: BannerAction;
  dismissible?: boolean;
  isVisible: boolean;
  onDismiss: () => void;
}

const variantStyles: Record<AlertVariant, string> = {
  info: "bg-blue-600 text-white",
  success: "bg-green-600 text-white",
  warning: "bg-yellow-400 text-yellow-900",
  error: "bg-red-600 text-white",
};

const positionStyles: Record<BannerPosition, string> = {
  top: "fixed top-0 inset-x-0 z-50",
  bottom: "fixed bottom-0 inset-x-0 z-50",
  inline: "relative w-full",
};

const slideVariants: Record<BannerPosition, object> = {
  top: { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } },
  bottom: { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } },
  inline: { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } },
};

export function Banner({
  message,
  variant = "info",
  position = "top",
  action,
  dismissible = true,
  isVisible,
  onDismiss,
}: BannerProps) {
  const anim = slideVariants[position];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="banner"
          aria-live="polite"
          className={`flex items-center justify-center gap-3 px-4 py-3 text-sm font-medium ${variantStyles[variant]} ${positionStyles[position]}`}
          initial={(anim as any).initial}
          animate={(anim as any).animate}
          exit={(anim as any).exit}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <span className="flex-1 text-center">{message}</span>
          {action && (
            <button
              onClick={action.onClick}
              className="shrink-0 underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              {action.label}
            </button>
          )}
          {dismissible && (
            <button
              onClick={onDismiss}
              aria-label="Dismiss banner"
              className="shrink-0 rounded p-0.5 opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
