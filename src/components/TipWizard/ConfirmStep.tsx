"use client";

import { motion } from "framer-motion";
import type { AmountStepData } from "./AmountStep";
import type { MessageStepData } from "./MessageStep";

interface ConfirmStepProps {
  amount: AmountStepData;
  message: MessageStepData;
  creatorUsername: string;
}

export function ConfirmStep({ amount, message, creatorUsername }: ConfirmStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Confirm your tip</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Review the details before sending.</p>
      </div>

      <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-gray-50 dark:divide-gray-800 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">Recipient</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">@{creatorUsername}</span>
        </div>
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">Amount</span>
          <span className="font-semibold text-purple-600">
            {amount.amount} {amount.asset}
          </span>
        </div>
        {message.message && (
          <div className="px-5 py-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">Message</span>
            <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{message.message}</p>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500">
        By confirming, you authorize this Stellar transaction. This action cannot be undone.
      </p>
    </motion.div>
  );
}
