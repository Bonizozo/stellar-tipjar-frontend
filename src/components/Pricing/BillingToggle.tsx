'use client';

import { motion } from 'framer-motion';

interface BillingToggleProps {
  billing: 'monthly' | 'yearly';
  onChange: (billing: 'monthly' | 'yearly') => void;
}

export const BillingToggle = ({ billing, onChange }: BillingToggleProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <button
        onClick={() => onChange('monthly')}
        className={`px-6 py-2 rounded-lg font-medium transition-all ${
          billing === 'monthly'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
      >
        Monthly
      </button>
      <motion.div
        className="relative"
        initial={false}
        animate={{ x: billing === 'yearly' ? 0 : -10 }}
      >
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {billing === 'yearly' && (
            <span className="text-green-600 dark:text-green-400 font-semibold">Save 20%</span>
          )}
        </span>
      </motion.div>
      <button
        onClick={() => onChange('yearly')}
        className={`px-6 py-2 rounded-lg font-medium transition-all ${
          billing === 'yearly'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}
      >
        Yearly
      </button>
    </div>
  );
};
