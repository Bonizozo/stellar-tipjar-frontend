"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { VerificationLevel } from "./VerificationStatusDisplay";

interface VerificationBadgeWithTooltipProps {
  isVerified: boolean;
  level?: VerificationLevel;
  verifiedAt?: Date;
}

const levelInfo = {
  bronze: {
    color: "from-amber-600 to-amber-700",
    description: "Bronze verified creator",
  },
  silver: {
    color: "from-slate-400 to-slate-500",
    description: "Silver verified creator",
  },
  gold: {
    color: "from-yellow-500 to-yellow-600",
    description: "Gold verified creator",
  },
  platinum: {
    color: "from-purple-500 to-purple-600",
    description: "Platinum verified creator",
  },
};

export function VerificationBadgeWithTooltip({
  isVerified,
  level = "bronze",
  verifiedAt,
}: VerificationBadgeWithTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!isVerified) return null;

  const info = levelInfo[level];

  return (
    <div className="relative inline-block">
      <div
        className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${info.color} px-2 py-1 text-xs font-bold text-white shadow-lg ring-2 ring-offset-1 ring-offset-white dark:ring-offset-gray-900 ring-opacity-30 cursor-help`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        role="img"
        aria-label={`${info.description} - verified ${verifiedAt ? `on ${verifiedAt.toLocaleDateString()}` : ""}`}
      >
        <BadgeCheck className="h-4 w-4 fill-current" />
        <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
      </div>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap shadow-lg z-50">
          {info.description}
          {verifiedAt && (
            <>
              <br />
              Verified {verifiedAt.toLocaleDateString()}
            </>
          )}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
        </div>
      )}
    </div>
  );
}
