"use client";

import { motion } from "framer-motion";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface NotificationToggleProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function NotificationToggle({
  id,
  label,
  description,
  checked,
  onChange,
  disabled = false,
  icon,
  className = "",
}: NotificationToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4 transition hover:border-ink/20 ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {icon && (
          <div className="flex-shrink-0">
            {typeof icon === "string" ? (
              <span className="text-lg">{icon}</span>
            ) : (
              <div className="text-ink/70">{icon}</div>
            )}
          </div>
        )}
        <div className="min-w-0">
          <label
            htmlFor={id}
            className="block text-sm font-medium text-ink cursor-pointer"
          >
            {label}
          </label>
          {description && (
            <p className="text-xs text-ink/60 mt-1">{description}</p>
          )}
        </div>
      </div>

      {/* Toggle Switch */}
      <motion.button
        id={id}
        onClick={() => !disabled && onChange(!checked)}
        className={`flex-shrink-0 relative inline-flex h-8 w-14 rounded-full transition-colors ${
          checked
            ? "bg-gradient-to-r from-wave to-sunrise"
            : "bg-ink/20"
        } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        aria-pressed={checked}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
      >
        <motion.div
          animate={{
            x: checked ? 24 : 2,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="relative inline-flex h-7 w-7 transform rounded-full bg-white shadow-md"
        >
          <motion.div
            animate={{
              opacity: checked ? 1 : 0,
              scale: checked ? 1 : 0.5,
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <CheckIcon className="h-4 w-4 text-wave" />
          </motion.div>
          <motion.div
            animate={{
              opacity: checked ? 0 : 1,
              scale: checked ? 0.5 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <XMarkIcon className="h-4 w-4 text-ink/40" />
          </motion.div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
