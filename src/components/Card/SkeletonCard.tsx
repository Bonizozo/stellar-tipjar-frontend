"use client";

import { Card, CardSize, CardVariant } from "./index";

export interface SkeletonCardProps {
  variant?: CardVariant;
  size?: CardSize;
  className?: string;
  showHeader?: boolean;
  showImage?: boolean;
  showFooter?: boolean;
  lines?: number;
  imageHeight?: "sm" | "md" | "lg";
}

const imageHeights = {
  sm: "h-32",
  md: "h-48",
  lg: "h-64",
};

export function SkeletonCard({
  variant = "default",
  size = "md",
  className = "",
  showHeader = true,
  showImage = false,
  showFooter = false,
  lines = 3,
  imageHeight = "md",
}: SkeletonCardProps) {
  return (
    <Card variant={variant} size={size} className={`animate-pulse ${className}`}>
      {showImage && (
        <div className={`bg-gray-200 dark:bg-gray-700 rounded-t-2xl mb-4 ${imageHeights[imageHeight]}`} />
      )}
      
      {showHeader && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        </div>
      )}

      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-3 bg-gray-200 dark:bg-gray-700 rounded ${
              index === lines - 1 ? "w-2/3" : "w-full"
            }`}
          />
        ))}
      </div>

      {showFooter && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      )}
    </Card>
  );
}