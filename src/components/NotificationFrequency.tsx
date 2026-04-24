"use client";

import { motion } from "framer-motion";

type NotificationFrequency = "instant" | "daily" | "weekly" | "never";

interface NotificationFrequencyProps {
  channel: string;
  frequency: NotificationFrequency;
  onChange: (frequency: NotificationFrequency) => void;
  className?: string;
}

const frequencyOptions = [
  {
    value: "instant" as const,
    label: "Instant",
    description: "Real-time updates",
  },
  {
    value: "daily" as const,
    label: "Daily",
    description: "Once per day",
  },
  {
    value: "weekly" as const,
    label: "Weekly",
    description: "Once per week",
  },
  {
    value: "never" as const,
    label: "Never",
    description: "Disable all",
  },
];

export function NotificationFrequency({
  channel,
  frequency,
  onChange,
  className = "",
}: NotificationFrequencyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 ${className}`}
    >
      <h3 className="text-sm font-semibold text-ink mb-4 capitalize">
        {channel} Frequency
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {frequencyOptions.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(option.value)}
            className={`relative p-3 rounded-lg border-2 transition ${
              frequency === option.value
                ? "border-wave bg-wave/10"
                : "border-ink/10 bg-ink/5 hover:border-ink/20"
            }`}
          >
            {frequency === option.value && (
              <motion.div
                layoutId={`${channel}-frequency-indicator`}
                className="absolute inset-0 rounded-lg border-2 border-wave"
                transition={{ duration: 0.3 }}
              />
            )}

            <div className="relative z-10 text-center">
              <div className="font-semibold text-sm text-ink">
                {option.label}
              </div>
              <p className="text-xs text-ink/60 mt-1">{option.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
