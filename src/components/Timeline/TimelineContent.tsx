'use client';

import { ReactNode } from 'react';

interface TimelineContentProps {
  title: string;
  description: string;
  timestamp: string;
  children?: ReactNode;
}

export const TimelineContent = ({ title, description, timestamp, children }: TimelineContentProps) => {
  return (
    <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
        <time className="text-sm text-gray-500 dark:text-gray-400">{timestamp}</time>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-2">{description}</p>
      {children}
    </div>
  );
};
