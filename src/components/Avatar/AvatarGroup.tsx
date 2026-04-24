"use client";

import React from "react";
import { Avatar, AvatarSize } from "./index";

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: AvatarSize;
  className?: string;
  total?: number;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 4,
  size = "md",
  className = "",
  total,
}: AvatarGroupProps) => {
  const avatars = React.Children.toArray(children);
  const showCount = avatars.slice(0, max);
  const remainingCount = total ? total - max : (avatars.length > max ? avatars.length - max : 0);

  const groupSpacingClasses: Record<AvatarSize, string> = {
    xs: "-space-x-1.5",
    sm: "-space-x-2",
    md: "-space-x-3",
    lg: "-space-x-4",
    xl: "-space-x-5",
    "2xl": "-space-x-6",
  };

  const moreSizeClasses: Record<AvatarSize, string> = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
    "2xl": "h-24 w-24 text-2xl",
  };

  return (
    <div className={`flex items-center ${groupSpacingClasses[size] || ""} ${className}`}>
      {showCount.map((child: React.ReactNode, index: number) => (
        <div
          key={index}
          className="relative rounded-full ring-2 ring-canvas dark:ring-ink"
          style={{ zIndex: showCount.length - index }}
        >
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={`relative z-0 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 font-bold text-gray-700 ring-2 ring-canvas transition-transform hover:scale-105 dark:from-gray-800 dark:to-gray-900 dark:text-gray-300 dark:ring-ink ${moreSizeClasses[size] || ""}`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};


