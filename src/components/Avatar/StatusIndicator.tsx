"use client";

import React from "react";

export type StatusType = "online" | "offline" | "busy" | "away";

interface StatusIndicatorProps {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const statusColors: Record<StatusType, string> = {
  online: "bg-success",
  offline: "bg-gray-400 dark:bg-gray-600",
  busy: "bg-error",
  away: "bg-amber-500",
};

const sizeClasses = {
  sm: "h-2 w-2 border-[1.5px]",
  md: "h-3 w-3 border-2",
  lg: "h-4 w-4 border-2",
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = "md",
  className = "",
}) => {
  return (
    <span
      className={`absolute bottom-0 right-0 rounded-full border-canvas dark:border-ink ${statusColors[status]} ${sizeClasses[size]} ${className}`}
      aria-label={`Status: ${status}`}
    />
  );
};
