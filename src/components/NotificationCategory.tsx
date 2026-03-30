"use client";

import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { NotificationToggle } from "./NotificationToggle";

interface CategoryPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

interface NotificationCategoryProps {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  preferences: CategoryPreferences;
  onUpdate: (channel: "email" | "push" | "inApp", value: boolean) => void;
  onToggleAll: (value: boolean) => void;
  isEnabled: boolean;
  className?: string;
}

export function NotificationCategory({
  id,
  title,
  description,
  icon,
  preferences,
  onUpdate,
  onToggleAll,
  isEnabled,
  className = "",
}: NotificationCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const enabledCount = Object.values(preferences).filter(Boolean).length;
  const totalCount = Object.keys(preferences).length;

  const channels = [
    {
      id: "email",
      label: "Email",
      description: "Receive updates via email",
      icon: "📧",
    },
    {
      id: "push",
      label: "Push Notifications",
      description: "Receive push notifications",
      icon: "🔔",
    },
    {
      id: "inApp",
      label: "In-app",
      description: "See notifications in the app",
      icon: "💬",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-ink/10 bg-[color:var(--surface)] overflow-hidden transition ${className}`}
    >
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-start justify-between gap-4 p-4 hover:bg-ink/5 transition"
      >
        <div className="flex items-start gap-3 flex-1 text-left">
          {icon && (
            <div className="flex-shrink-0 text-lg mt-1">{icon}</div>
          )}
          <div className="min-w-0">
            <h3 className="font-semibold text-ink">{title}</h3>
            <p className="text-sm text-ink/60 mt-0.5">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <div className="text-sm font-medium text-ink">
              {enabledCount}/{totalCount}
            </div>
            <p className="text-xs text-ink/60">enabled</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon className="h-5 w-5 text-ink/40" />
          </motion.div>
        </div>
      </button>

      {/* Channel Controls */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden border-t border-ink/10"
      >
        <div className="p-4 space-y-3">
          {/* Batch Actions */}
          <div className="flex gap-2 mb-4 pb-4 border-b border-ink/10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onToggleAll(true)}
              className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-wave/10 text-wave hover:bg-wave/20 transition"
            >
              Enable All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onToggleAll(false)}
              className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-ink/10 text-ink hover:bg-ink/20 transition"
            >
              Disable All
            </motion.button>
          </div>

          {/* Individual Toggles */}
          {channels.map((channel) => (
            <NotificationToggle
              key={channel.id}
              id={`${id}-${channel.id}`}
              label={channel.label}
              description={channel.description}
              checked={preferences[channel.id as keyof CategoryPreferences]}
              onChange={(value) =>
                onUpdate(channel.id as "email" | "push" | "inApp", value)
              }
              icon={channel.icon}
              disabled={!isEnabled}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
