"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, X, Send } from 'lucide-react';
import { Button } from '@/components/Button';
import { formatTime } from '@/utils/videoHelpers';

interface TipAtTimestampProps {
  timestamp: number;
  creatorUsername: string;
  onTipSubmit: (amount: string, message: string, timestamp: number) => Promise<void>;
}

export function TipAtTimestamp({
  timestamp,
  creatorUsername,
  onTipSubmit,
}: TipAtTimestampProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('5');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsSubmitting(true);
    try {
      await onTipSubmit(amount, message, timestamp);
      setIsOpen(false);
      setAmount('5');
      setMessage('');
    } catch (error) {
      console.error('Tip submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <DollarSign className="w-4 h-4" />
        <span className="text-sm font-medium">Tip at {formatTime(timestamp)}</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Tip at Timestamp
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatTime(timestamp)} • @{creatorUsername}
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Amount Input */}
                <div>
                  <label
                    htmlFor="tip-amount"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Amount (XLM)
                  </label>
                  <input
                    id="tip-amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex gap-2">
                  {['5', '10', '25', '50'].map((quickAmount) => (
                    <button
                      key={quickAmount}
                      type="button"
                      onClick={() => setAmount(quickAmount)}
                      className={`flex-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        amount === quickAmount
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {quickAmount} XLM
                    </button>
                  ))}
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="tip-message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message (optional)
                  </label>
                  <textarea
                    id="tip-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={200}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Leave a message for this moment..."
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {message.length}/200 characters
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  disabled={!amount || parseFloat(amount) <= 0}
                  icon={<Send className="w-4 h-4" />}
                  className="w-full"
                >
                  Send Tip
                </Button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
