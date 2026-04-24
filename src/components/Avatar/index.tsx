"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

import { StatusIndicator, StatusType } from "./StatusIndicator";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface AvatarProps {
  src?: string;
  name: string;
  size?: AvatarSize;
  status?: StatusType;
  isVerified?: boolean;
  className?: string;
  ring?: boolean;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
  "2xl": "w-24 h-24 text-2xl",
};

const badgeSizeClasses: Record<AvatarSize, string> = {
  xs: "w-2 h-2",
  sm: "w-2.5 h-2.5",
  md: "w-3 h-3",
  lg: "w-3.5 h-3.5",
  xl: "w-4 h-4",
  "2xl": "w-6 h-6",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = "md",
  status,
  isVerified = false,
  className = "",
  ring = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(name);

  // Use a consistent color based on name
  const getFallbackColor = (name: string) => {
    const colors = [
      "from-rose-500 to-orange-500",
      "from-purple-500 to-indigo-500",
      "from-cyan-500 to-blue-500",
      "from-emerald-500 to-teal-500",
      "from-amber-500 to-yellow-500",
      "from-wave to-moss",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const fallbackColor = getFallbackColor(name);

  return (
    <div className={`relative inline-block flex-shrink-0 ${className}`}>
      <div
        className={`relative overflow-hidden rounded-full ${sizeClasses[size]} ${
          ring ? "ring-2 ring-canvas/50 dark:ring-ink/50" : ""
        }`}
      >
        <AnimatePresence mode="wait">
          {src && !hasError ? (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full"
            >
              <Image
                src={src}
                alt={name}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setHasError(true);
                  setIsLoading(false);
                }}
                sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`}
              />
              {isLoading && (
                <div className={`absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-800`} />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="fallback"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br font-bold text-white ${fallbackColor}`}
            >
              {initials}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {status && (
        <StatusIndicator
          status={status}
          size={size === "xs" ? "sm" : size === "2xl" ? "lg" : "md"}
        />
      )}

      {isVerified && (
        <div
          className={`absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full bg-white text-blue-500 shadow-sm dark:bg-ink ${badgeSizeClasses[size]}`}
        >
          <CheckCircle className="h-full w-full" fill="currentColor" />
        </div>
      )}
    </div>
  );
};
