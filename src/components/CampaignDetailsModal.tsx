"use client";

import { useEffect, useState } from "react";
import { X, Clock, Target, TrendingUp } from "lucide-react";
import { createPortal } from "react-dom";
import { Campaign, useMatchingCampaign } from "@/hooks/useMatchingCampaign";
import { MatchProgress } from "@/components/MatchProgress";
import { MatchBadge } from "@/components/MatchBadge";

interface CampaignDetailsModalProps {
  campaign: Campaign;
  onClose: () => void;
}

function useCountdown(endDate: Date) {
  const calc = () => {
    const diff = endDate.getTime() - Date.now();
    if (diff <= 0) return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      expired: false,
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  });
  return time;
}

export function CampaignDetailsModal({ campaign, onClose }: CampaignDetailsModalProps) {
  const { getCampaignProgress } = useMatchingCampaign();
  const countdown = useCountdown(campaign.endDate);
  const progress = getCampaignProgress(campaign);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="campaign-modal-title"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 id="campaign-modal-title" className="text-xl font-bold text-gray-900 dark:text-white">
              {campaign.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{campaign.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Sponsor + badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {campaign.sponsorName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{campaign.sponsorName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Campaign sponsor</p>
              </div>
            </div>
            <MatchBadge matchPercentage={campaign.matchPercentage} sponsorName={campaign.sponsorName} size="sm" />
          </div>

          {/* Countdown */}
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
            <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4" />
              {countdown.expired ? "Campaign ended" : "Time remaining"}
            </div>
            {!countdown.expired ? (
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Mins", value: countdown.minutes },
                  { label: "Secs", value: countdown.seconds },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-lg bg-white dark:bg-gray-700 p-2 shadow-sm">
                    <p className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                      {pad(value)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-red-500 font-medium">This campaign has ended.</p>
            )}
          </div>

          {/* Progress */}
          <div>
            <MatchProgress campaign={campaign} showLabel showPercentage />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3">
              <TrendingUp className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Match Rate</p>
              <p className="font-bold text-gray-900 dark:text-white">{campaign.matchPercentage}%</p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3">
              <Target className="w-4 h-4 text-green-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Matched</p>
              <p className="font-bold text-gray-900 dark:text-white">${campaign.currentMatched.toFixed(2)}</p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3">
              <Target className="w-4 h-4 text-purple-500 mx-auto mb-1" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Remaining</p>
              <p className="font-bold text-gray-900 dark:text-white">${progress.remaining.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
