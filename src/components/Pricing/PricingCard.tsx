'use client';

import { motion } from 'framer-motion';
import { FeatureList } from './FeatureList';
import { Button } from '@/components/Button';

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description?: string;
  features: string[];
  cta: string;
  recommended?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  billing: 'monthly' | 'yearly';
  savings?: number;
}

export const PricingCard = ({ plan, billing, savings }: PricingCardProps) => {
  const displayPrice = billing === 'yearly' ? Math.floor(plan.price * 12 * 0.8) : plan.price;

  return (
    <motion.div
      className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 transition-all ${
        plan.recommended
          ? 'border-purple-600 scale-105 md:scale-100'
          : 'border-gray-200 dark:border-gray-700'
      }`}
      whileHover={{ y: -8 }}
    >
      {plan.recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          Recommended
        </div>
      )}

      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
      {plan.description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>
      )}

      <div className="mb-6">
        <span className="text-5xl font-bold text-gray-900 dark:text-white">${displayPrice}</span>
        <span className="text-gray-600 dark:text-gray-400">/{billing === 'yearly' ? 'year' : 'month'}</span>
        {billing === 'yearly' && savings && (
          <div className="mt-2 inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
            Save {savings}%
          </div>
        )}
      </div>

      <FeatureList features={plan.features} />

      <Button
        variant={plan.recommended ? 'primary' : 'outline'}
        className="w-full mt-6"
      >
        {plan.cta}
      </Button>
    </motion.div>
  );
};
