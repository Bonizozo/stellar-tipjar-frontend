"use client";

import { motion } from 'framer-motion';
import { getProgressPercentage } from '@/utils/videoHelpers';
import type { Chapter } from '@/types/video';

interface ChapterMarkersProps {
  chapters: Chapter[];
  duration: number;
  currentChapter: Chapter | null;
  onChapterClick: (chapter: Chapter) => void;
}

export function ChapterMarkers({
  chapters,
  duration,
  currentChapter,
  onChapterClick,
}: ChapterMarkersProps) {
  if (chapters.length === 0 || duration === 0) return null;

  return (
    <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none">
      {chapters.map((chapter) => {
        const position = getProgressPercentage(chapter.startTime, duration);
        const isActive = currentChapter?.id === chapter.id;

        return (
          <motion.div
            key={chapter.id}
            className="absolute top-0 w-0.5 h-full bg-white/50 pointer-events-auto cursor-pointer group"
            style={{ left: `${position}%` }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isActive ? 1 : 0.5 }}
            whileHover={{ opacity: 1, scale: 1.5 }}
            onClick={() => onChapterClick(chapter)}
          >
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {chapter.title}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
