'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';

interface MatchBadgeProps {
  matchPercentage: number;
  sponsorName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MatchBadge: React.FC<MatchBadgeProps> = ({
  matchPercentage,
  sponsorName,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const getBgColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-100 dark:bg-green-900';
    if (percentage >= 50) return 'bg-blue-100 dark:bg-blue-900';
    return 'bg-purple-100 dark:bg-purple-900';
  };

  const getTextColor = (percentage: number) => {
    if (percentage >= 100) return 'text-green-700 dark:text-green-300';
    if (percentage >= 50) return 'text-blue-700 dark:text-blue-300';
    return 'text-purple-700 dark:text-purple-300';
  };

  return (
    <div
      className={`inline-flex items-center gap-2 font-semibold rounded-full ${sizeClasses[size]} ${getBgColor(matchPercentage)} ${getTextColor(matchPercentage)} ${className}`}
      title={`${matchPercentage}% match by ${sponsorName}`}
    >
      <TrendingUp className={iconSize[size]} />
      <span>{matchPercentage}% Match</span>
      <span className="text-xs opacity-75">by {sponsorName}</span>
    </div>
  );
};

export default MatchBadge;
