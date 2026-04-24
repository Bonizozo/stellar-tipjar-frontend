'use client';

import Image from 'next/image';
import { StarRating } from './StarRating';
import { VerifiedBadge } from './VerifiedBadge';

interface TestimonialCardProps {
  name: string;
  avatar: string;
  rating: number;
  quote: string;
  date: string;
  verified?: boolean;
}

export const TestimonialCard = ({
  name,
  avatar,
  rating,
  quote,
  date,
  verified,
}: TestimonialCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image src={avatar} alt={name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
          <StarRating value={rating} />
        </div>
      </div>

      <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4 flex-1">
        &quot;{quote}&quot;
      </blockquote>

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{date}</span>
        {verified && <VerifiedBadge />}
      </div>
    </div>
  );
};
