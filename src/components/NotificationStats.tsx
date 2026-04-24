"use client";

import { motion } from "framer-motion";
import {
  BellIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface NotificationStatsProps {
  totalSettings: number;
  enabledSettings: number;
  disabledSettings: number;
  categoriesEnabled: number;
  totalCategories: number;
  className?: string;
}

export function NotificationStats({
  totalSettings,
  enabledSettings,
  disabledSettings,
  categoriesEnabled,
  totalCategories,
  className = "",
}: NotificationStatsProps) {
  const percentageEnabled =
    totalSettings > 0 ? Math.round((enabledSettings / totalSettings) * 100) : 0;
  const categoriesPercentage =
    totalCategories > 0
      ? Math.round((categoriesEnabled / totalCategories) * 100)
      : 0;

  const stats = [
    {
      icon: <CheckCircleIcon className="h-5 w-5" />,
      label: "Notifications",
      value: enabledSettings,
      total: totalSettings,
      color: "text-wave",
      bgColor: "bg-wave/10",
    },
    {
      icon: <BellIcon className="h-5 w-5" />,
      label: "Categories",
      value: categoriesEnabled,
      total: totalCategories,
      color: "text-sunrise",
      bgColor: "bg-sunrise/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 ${className}`}
    >
      <h3 className="text-sm font-semibold text-ink mb-6 flex items-center gap-2">
        <BellIcon className="h-5 w-5 text-wave" />
        Notification Summary
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className={`rounded-xl ${stat.bgColor} p-4 border border-ink/10`}
          >
            <div className={`flex items-center gap-2 mb-3 ${stat.color}`}>
              {stat.icon}
              <span className="text-xs font-semibold uppercase tracking-wide text-ink/70">
                {stat.label}
              </span>
            </div>
            <div className="text-2xl font-bold text-ink">
              {stat.value}
              <span className="text-sm text-ink/60 font-normal ml-1">
                / {stat.total}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overall Progress */}
      <div className="space-y-3 pt-6 border-t border-ink/10">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-ink">Overall Activity</span>
          <span className="text-lg font-bold text-wave">{percentageEnabled}%</span>
        </div>
        <div className="h-2 rounded-full bg-ink/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentageEnabled}%` }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-wave via-sunrise to-wave"
          />
        </div>
        <p className="text-xs text-ink/60 text-center mt-4">
          {enabledSettings} of {totalSettings} notification preferences enabled
        </p>
      </div>

      {/* Status Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 p-3 rounded-lg bg-ink/5 border border-ink/10"
      >
        <p className="text-xs text-ink/70">
          <span className="font-semibold">Status:</span>{" "}
          {percentageEnabled === 0
            ? "All notifications disabled"
            : percentageEnabled === 100
              ? "Fully engaged"
              : "Partially enabled"}
        </p>
      </motion.div>
    </motion.div>
  );
}
