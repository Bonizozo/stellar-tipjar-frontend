"use client";

import { useEffect, useRef } from "react";
import { MilestoneConfetti } from "@/components/MilestoneConfetti";
import { MilestoneBadge } from "./MilestoneBadge";
import { shareDeepLink } from "@/lib/deeplink/handler";
import { playNotificationSound } from "@/utils/soundUtils";
import { getBadgeColor } from "@/utils/milestones";
import type { Milestone } from "@/utils/milestones";

interface Props {
  milestone: Milestone;
  username: string;
  onClose: () => void;
}

export function MilestoneCelebrationModal({ milestone, username, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Play sound and focus close button on mount
  useEffect(() => {
    playNotificationSound();
    closeRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  async function handleShare() {
    await shareDeepLink(
      `/creator/${username}`,
      milestone.label,
      milestone.shareText
    );
  }

  const accentColor = getBadgeColor(milestone.badge);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Milestone reached: ${milestone.label}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      {/* Confetti layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <MilestoneConfetti active pattern="sides" count={150} duration={4000} />
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl border-2 bg-white p-8 shadow-2xl text-center dark:bg-zinc-900 space-y-5"
        style={{ borderColor: accentColor }}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close celebration"
          className="absolute right-3 top-3 rounded-full p-1 text-ink/40 hover:text-ink/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          ✕
        </button>

        <div className="text-4xl animate-bounce">{milestone.icon}</div>

        <div>
          <h2 className="text-2xl font-bold text-ink">Milestone Reached!</h2>
          <p className="mt-1 text-lg font-semibold" style={{ color: accentColor }}>
            {milestone.label}
          </p>
        </div>

        <div className="flex justify-center">
          <MilestoneBadge milestone={milestone} size="lg" />
        </div>

        <p className="text-sm text-ink/60">{milestone.shareText}</p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleShare}
            className="flex-1 rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            Share 🎉
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-xl px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-80"
            style={{ backgroundColor: accentColor }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
