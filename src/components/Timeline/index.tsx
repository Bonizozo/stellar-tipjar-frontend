'use client';

import { ReactNode } from 'react';
import { TimelineItem } from './TimelineItem';

export interface TimelineItemData {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  timestamp: string;
  children?: ReactNode;
}

interface TimelineProps {
  items: TimelineItemData[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-0">
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            index={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            timestamp={item.timestamp}
          >
            {item.children}
          </TimelineItem>
        ))}
      </div>
    </div>
  );
};
