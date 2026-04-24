'use client';

import Image from 'next/image';
import { StarRating } from './StarRating';
import { VerifiedBadge } from './VerifiedBadge';

interface ReviewCardProps {
  name: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
  verified?: boolean;
  title?: string;
}

export const ReviewCard = ({
  name,
  avatar,
  rating,
  review,
  date,
  verified,
  title,
}: ReviewCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image src={avatar} alt={name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
            {title && <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>}
            <StarRating value={rating} />
          </div>
        </div>
        {verified && <VerifiedBadge />}
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1">{review}</p>

      <time className="text-sm text-gray-500 dark:text-gray-400">{date}</time>
    </div>
  );
};
