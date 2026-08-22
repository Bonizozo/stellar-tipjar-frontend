"use client";

import type { CollaborationStatus } from "@/types/collaboration";

const statusConfig: Record<CollaborationStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
  active: { label: "Active", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
  declined: { label: "Declined", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  ended: { label: "Ended", className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
};

interface CollaborationBadgeProps {
  status: CollaborationStatus;
}

export function CollaborationBadge({ status }: CollaborationBadgeProps) {
  const { label, className } = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
