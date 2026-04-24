'use client';

import { ReactNode } from 'react';

interface TimelineIconProps {
  children: ReactNode;
  className?: string;
}

export const TimelineIcon = ({ children, className = '' }: TimelineIconProps) => {
  return (
    <div
      className={`relative z-10 flex-shrink-0 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};
