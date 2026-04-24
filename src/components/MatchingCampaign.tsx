'use client';

import React, { useMemo } from 'react';
import { Clock, Users, Target, AlertCircle } from 'lucide-react';
import Button from './Button';
import MatchBadge from './MatchBadge';
import MatchProgress from './MatchProgress';
import { Campaign } from '@/hooks/useMatchingCampaign';

interface MatchingCampaignProps {
  campaign: Campaign;
  timeRemaining?: {
    expired: boolean;
    days?: number;
    hours?: number;
    minutes?: number;
  };
  onTip?: () => void;
  isProcessing?: boolean;
  className?: string;
}

export const MatchingCampaign: React.FC<MatchingCampaignProps> = ({
  campaign,
  timeRemaining,
  onTip,
  isProcessing = false,
  className = '',
}) => {
  const isAlmostFull = campaign.currentMatched / campaign.matchLimit > 0.9;
  const isFull = campaign.currentMatched >= campaign.matchLimit;

  const formattedTimeRemaining = useMemo(() => {
    if (!timeRemaining || timeRemaining.expired) {
      return 'Campaign ended';
    }

    const parts = [];
    if (timeRemaining.days && timeRemaining.days > 0) {
      parts.push(`${timeRemaining.days}d`);
    }
    if (timeRemaining.hours && timeRemaining.hours > 0) {
      parts.push(`${timeRemaining.hours}h`);
    }
    if (timeRemaining.minutes && timeRemaining.minutes >= 0 && parts.length < 2) {
      parts.push(`${timeRemaining.minutes}m`);
    }

    return parts.length > 0 ? parts.join(' ') : 'Less than 1 minute';
  }, [timeRemaining]);

  return (
    <div
      className={`bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-700 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {campaign.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{campaign.description}</p>
        </div>
        <MatchBadge
          matchPercentage={campaign.matchPercentage}
          sponsorName={campaign.sponsorName}
          size="sm"
        />
      </div>

      {/* Sponsor Info */}
      <div className="flex items-center gap-3 mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
        {campaign.sponsorAvatar ? (
          <img
            src={campaign.sponsorAvatar}
            alt={campaign.sponsorName}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
            {campaign.sponsorName.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {campaign.sponsorName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Sponsored matching campaign</p>
        </div>
      </div>

      {/* Progress Section */}
      <MatchProgress campaign={campaign} showLabel={true} showPercentage={true} />

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {/* Match Amount */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
          <Target className="w-4 h-4 text-blue-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500 dark:text-gray-400">Match Limit</p>
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            ${campaign.matchLimit.toFixed(2)}
          </p>
        </div>

        {/* Matched Amount */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
          <Users className="w-4 h-4 text-green-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500 dark:text-gray-400">Matched</p>
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            ${campaign.currentMatched.toFixed(2)}
          </p>
        </div>

        {/* Time Remaining */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
          <Clock className="w-4 h-4 text-purple-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500 dark:text-gray-400">Time Left</p>
          <p
            className={`text-sm font-bold ${
              isAlmostFull
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {formattedTimeRemaining}
          </p>
        </div>
      </div>

      {/* Warnings */}
      {isFull && (
        <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
              Match Budget Exhausted
            </p>
            <p className="text-xs text-amber-800 dark:text-amber-200 mt-1">
              This campaign has reached its matching limit. New tips won't qualify for matching.
            </p>
          </div>
        </div>
      )}

      {isAlmostFull && !isFull && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-900 dark:text-red-100">
              Match Limit Almost Reached
            </p>
            <p className="text-xs text-red-800 dark:text-red-200 mt-1">
              Only ${(campaign.matchLimit - campaign.currentMatched).toFixed(2)} remaining in matching
              budget!
            </p>
          </div>
        </div>
      )}

      {/* Call to Action */}
      {!isFull && timeRemaining && !timeRemaining.expired && (
        <Button
          onClick={onTip}
          disabled={isProcessing}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 flex items-center justify-center"
        >
          {isProcessing ? 'Processing...' : `Send a Tip & Get ${campaign.matchPercentage}% Match!`}
        </Button>
      )}

      {/* Campaign Status */}
      <div className="mt-3 text-center">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            campaign.status === 'active'
              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
              : campaign.status === 'upcoming'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {campaign.status === 'active'
            ? '✓ Campaign Active'
            : campaign.status === 'upcoming'
              ? 'Coming Soon'
              : 'Campaign Ended'}
        </span>
      </div>
    </div>
  );
};

export default MatchingCampaign;
