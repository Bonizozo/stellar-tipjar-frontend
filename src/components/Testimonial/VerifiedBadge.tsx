'use client';

import { CheckCircle } from 'lucide-react';

interface VerifiedBadgeProps {
  className?: string;
}

export const VerifiedBadge = ({ className = '' }: VerifiedBadgeProps) => {
  return (
    <div className={`flex items-center gap-1 text-green-600 dark:text-green-400 ${className}`}>
      <CheckCircle className="w-4 h-4" />
      <span className="text-xs font-medium">Verified</span>
    </div>
  );
};
