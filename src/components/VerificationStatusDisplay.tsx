"use client";

import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

export type VerificationStatus = "verified" | "pending" | "rejected" | "none";
export type VerificationLevel = "bronze" | "silver" | "gold" | "platinum";

interface VerificationStatusProps {
  status: VerificationStatus;
  level?: VerificationLevel;
  submittedAt?: Date;
  rejectionReason?: string;
}

const statusConfig = {
  verified: {
    icon: CheckCircle,
    label: "Verified",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  pending: {
    icon: Clock,
    label: "Pending Review",
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  rejected: {
    icon: XCircle,
    label: "Rejected",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  none: {
    icon: AlertCircle,
    label: "Not Verified",
    color: "text-gray-600 dark:text-gray-400",
    bg: "bg-gray-50 dark:bg-gray-900/20",
  },
};

const levelBadges = {
  bronze: "🥉 Bronze",
  silver: "🥈 Silver",
  gold: "🥇 Gold",
  platinum: "💎 Platinum",
};

export function VerificationStatus({
  status,
  level,
  submittedAt,
  rejectionReason,
}: VerificationStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-lg border border-gray-200 dark:border-gray-700 ${config.bg}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${config.color} shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {config.label}
          </h3>
          {level && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {levelBadges[level]}
            </p>
          )}
          {submittedAt && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Submitted {submittedAt.toLocaleDateString()}
            </p>
          )}
          {rejectionReason && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">
              Reason: {rejectionReason}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
