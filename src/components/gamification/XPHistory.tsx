"use client";

import { motion } from "framer-motion";
import type { XPEvent } from "@/types/gamification";

interface XPHistoryProps {
  events: XPEvent[];
}

export function XPHistory({ events }: XPHistoryProps) {
  if (events.length === 0) {
    return (
      <div className="py-10 text-center text-ink/40">
        <p className="text-3xl mb-2">⚡</p>
        <p className="text-sm">No XP events yet — start tipping!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {events.map((event, i) => (
        <motion.div
          key={`${event.timestamp}-${i}`}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          className="flex items-center justify-between rounded-xl border border-ink/5 bg-[color:var(--surface)] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl" aria-hidden="true">⚡</span>
            <div>
              <p className="text-sm font-medium text-ink">{event.reason}</p>
              <p className="text-xs text-ink/40">
                {new Date(event.timestamp).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <span className="text-sm font-bold text-wave">+{event.amount} XP</span>
        </motion.div>
      ))}
    </div>
  );
}
