'use client';

import React, { useMemo } from 'react';
import { Campaign } from '@/hooks/useMatchingCampaign';

interface MatchProgressProps {
  campaign: Campaign;
  showLabel?: boolean;
  showPercentage?: boolean;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MatchProgress: React.FC<MatchProgressProps> = ({
  campaign,
  showLabel = true,
  showPercentage = true,
  height = 'md',
  className = '',
}) => {
  const progressPercentage = useMemo(() => {
    return (campaign.currentMatched / campaign.matchLimit) * 100;
  }, [campaign.currentMatched, campaign.matchLimit]);

  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-amber-500';
    if (percentage >= 70) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className={className}>
      {/* Label */}
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Matching Progress
          </span>
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              ${campaign.currentMatched.toFixed(2)} / ${campaign.matchLimit.toFixed(2)}
            </span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div
        className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${heightClasses[height]}`}
      >
        <div
          className={`${getProgressColor(progressPercentage)} transition-all duration-300 ${heightClasses[height]}`}
          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progressPercentage)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Campaign matching progress: ${progressPercentage.toFixed(1)}%`}
        />
      </div>

      {/* Percentage Text */}
      {showPercentage && (
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {progressPercentage.toFixed(1)}% matched
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ${(campaign.matchLimit - campaign.currentMatched).toFixed(2)} remaining
          </span>
        </div>
      )}

      {/* Status */}
      {progressPercentage >= 100 && (
        <div className="mt-2 p-2 bg-amber-100 dark:bg-amber-900 rounded text-xs text-amber-800 dark:text-amber-200">
          ⚠️ Match limit reached! Campaign budget exhausted.
        </div>
      )}
    </div>
  );
};

export default MatchProgress;
