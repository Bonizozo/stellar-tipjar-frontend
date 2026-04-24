'use client';

import { Check } from 'lucide-react';

interface FeatureListProps {
  features: string[];
}

export const FeatureList = ({ features }: FeatureListProps) => {
  return (
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-3">
          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
  );
};
