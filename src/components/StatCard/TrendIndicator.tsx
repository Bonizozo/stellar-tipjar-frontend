import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

interface TrendIndicatorProps {
  value: number; // percentage change
  showIcon?: boolean;
}

export function TrendIndicator({ value, showIcon = true }: TrendIndicatorProps) {
  const isPositive = value >= 0;
  const ColorClass = isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";
  const BgClass = isPositive ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30";

  return (
    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${ColorClass} ${BgClass}`}>
      {showIcon && (
        isPositive ? (
          <ArrowUpIcon className="w-3 h-3" />
        ) : (
          <ArrowDownIcon className="w-3 h-3" />
        )
      )}
      <span>{isPositive ? "+" : ""}{value}%</span>
    </div>
  );
}
