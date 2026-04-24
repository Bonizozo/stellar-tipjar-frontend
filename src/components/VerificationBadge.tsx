"use client";

import { BadgeCheck } from "lucide-react";

interface VerificationBadgeProps {
  isVerified?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function VerificationBadge({ 
  isVerified = false, 
  size = "md", 
  className = "" 
}: VerificationBadgeProps) {
  if (!isVerified) return null;

  return (
    <div className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-2 py-1 text-xs font-bold text-white shadow-lg ring-2 ring-blue-500/30 ${className}`}>
      <BadgeCheck className={` ${sizeClasses[size]} fill-current`} />
      <span>Verified</span>
    </div>
  );
}

