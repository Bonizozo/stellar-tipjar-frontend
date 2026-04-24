'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TimelineItemProps {
  index: number;
  icon: ReactNode;
  title: string;
  description: string;
  timestamp: string;
  children?: ReactNode;
}

export const TimelineItem = ({
  index,
  icon,
  title,
  description,
  timestamp,
  children,
}: TimelineItemProps) => {
  return (
    <motion.div
      className="relative flex gap-4 mb-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
        {icon}
      </div>
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
          <time className="text-sm text-gray-500 dark:text-gray-400">{timestamp}</time>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
        {children}
      </div>
    </motion.div>
  );
};
