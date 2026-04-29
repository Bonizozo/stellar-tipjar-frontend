"use client";

import { motion } from 'framer-motion';
import { DollarSign, MessageCircle } from 'lucide-react';
import { formatTime } from '@/utils/videoHelpers';
import type { TimestampTip } from '@/types/video';

interface TimestampTipsProps {
  tips: TimestampTip[];
  currentTime: number;
  onTipClick: (timestamp: number) => void;
}

export function TimestampTips({ tips, currentTime, onTipClick }: TimestampTipsProps) {
  if (tips.length === 0) return null;

  // Sort tips by timestamp
  const sortedTips = [...tips].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <DollarSign className="w-4 h-4" />
        Tips on Timeline
      </h3>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {sortedTips.map((tip) => {
          const isNearby = Math.abs(currentTime - tip.timestamp) < 5;

          return (
            <motion.button
              key={tip.id}
              onClick={() => onTipClick(tip.timestamp)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                isNearby
                  ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500'
                  : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3">
                {/* Timestamp Badge */}
                <div className="flex-shrink-0 px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded">
                  {formatTime(tip.timestamp)}
                </div>

                {/* Tip Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      @{tip.username}
                    </span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                      {tip.amount} XLM
                    </span>
                  </div>
                  {tip.message && (
                    <div className="flex items-start gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <MessageCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <p className="line-clamp-2">{tip.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
