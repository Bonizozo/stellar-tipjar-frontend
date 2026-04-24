"use client";

import { motion } from "framer-motion";
import {
  BellIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

interface NotificationPreviewProps {
  enabledChannels: string[];
  totalSettings: number;
  enabledSettings: number;
  disabledSettings: number;
  className?: string;
}

const channelIcons: Record<string, React.ReactNode> = {
  email: <EnvelopeIcon className="h-4 w-4" />,
  push: <DevicePhoneMobileIcon className="h-4 w-4" />,
  inApp: <BellIcon className="h-4 w-4" />,
};

const channelLabels: Record<string, string> = {
  email: "Email",
  push: "Push",
  inApp: "In-app",
};

export function NotificationPreview({
  enabledChannels,
  totalSettings,
  enabledSettings,
  disabledSettings,
  className = "",
}: NotificationPreviewProps) {
  const percentageEnabled =
    totalSettings > 0 ? Math.round((enabledSettings / totalSettings) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
            <BellIcon className="h-5 w-5 text-wave" />
            Notification Status
          </h3>
          <p className="text-xs text-ink/60 mt-1">Current notification preferences</p>
        </div>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-right"
        >
          <div className="text-2xl font-bold text-wave">{percentageEnabled}%</div>
          <p className="text-xs text-ink/60">Enabled</p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl bg-ink/5 p-3 text-center">
          <div className="text-lg font-semibold text-ink">{enabledSettings}</div>
          <p className="text-xs text-ink/60">Enabled</p>
        </div>
        <div className="rounded-xl bg-ink/5 p-3 text-center">
          <div className="text-lg font-semibold text-ink">{disabledSettings}</div>
          <p className="text-xs text-ink/60">Disabled</p>
        </div>
        <div className="rounded-xl bg-ink/5 p-3 text-center">
          <div className="text-lg font-semibold text-ink">{totalSettings}</div>
          <p className="text-xs text-ink/60">Total</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 rounded-full bg-ink/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentageEnabled}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full bg-gradient-to-r from-wave to-sunrise"
          />
        </div>
      </div>

      {/* Enabled Channels */}
      <div>
        <h4 className="text-xs font-semibold text-ink mb-3 uppercase tracking-wide">
          Active Channels
        </h4>
        {enabledChannels.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {enabledChannels.map((channel) => (
              <motion.div
                key={channel}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-wave/10 to-sunrise/10 px-3 py-1.5 border border-wave/20"
              >
                <div className="text-wave">{channelIcons[channel]}</div>
                <span className="text-xs font-medium text-ink">
                  {channelLabels[channel]}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-ink/60 italic">
            All notifications disabled
          </div>
        )}
      </div>

      {/* Inactive Channels */}
      {enabledChannels.length < 3 && (
        <div className="mt-4 pt-4 border-t border-ink/10">
          <h4 className="text-xs font-semibold text-ink/60 mb-3 uppercase tracking-wide">
            Inactive Channels
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.keys(channelIcons)
              .filter((ch) => !enabledChannels.includes(ch))
              .map((channel) => (
                <motion.div
                  key={channel}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-3 py-1.5 border border-ink/10"
                >
                  <div className="text-ink/40">{channelIcons[channel]}</div>
                  <span className="text-xs font-medium text-ink/60">
                    {channelLabels[channel]}
                  </span>
                </motion.div>
              ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
