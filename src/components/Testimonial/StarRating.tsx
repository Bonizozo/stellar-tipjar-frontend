'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  max?: number;
}

export const StarRating = ({ value, max = 5 }: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < value
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ))}
    </div>
  );
};
