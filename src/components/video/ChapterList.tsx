"use client";

import { motion } from 'framer-motion';
import { formatTime } from '@/utils/videoHelpers';
import type { Chapter } from '@/types/video';
import { Check } from 'lucide-react';

interface ChapterListProps {
  chapters: Chapter[];
  currentChapter: Chapter | null;
  currentTime: number;
  onChapterClick: (chapter: Chapter) => void;
}

export function ChapterList({
  chapters,
  currentChapter,
  currentTime,
  onChapterClick,
}: ChapterListProps) {
  if (chapters.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        Chapters
      </h3>
      <div className="space-y-1 max-h-[400px] overflow-y-auto">
        {chapters.map((chapter, index) => {
          const isActive = currentChapter?.id === chapter.id;
          const isWatched = currentTime > chapter.endTime;

          return (
            <motion.button
              key={chapter.id}
              onClick={() => onChapterClick(chapter)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500'
                  : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3">
                {/* Chapter Number */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive
                      ? 'bg-purple-500 text-white'
                      : isWatched
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {isWatched ? <Check className="w-4 h-4" /> : index + 1}
                </div>

                {/* Chapter Info */}
                <div className="flex-1 min-w-0">
                  <h4
                    className={`text-sm font-medium mb-1 ${
                      isActive
                        ? 'text-purple-900 dark:text-purple-100'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {chapter.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTime(chapter.startTime)} - {formatTime(chapter.endTime)}
                  </p>
                </div>

                {/* Thumbnail */}
                {chapter.thumbnail && (
                  <div className="flex-shrink-0 w-16 h-10 rounded overflow-hidden">
                    <img
                      src={chapter.thumbnail}
                      alt={chapter.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
