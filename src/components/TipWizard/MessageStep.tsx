"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const EMOJIS = ["❤️", "🔥", "⭐", "👏", "🙏", "💎", "🚀", "🎉"];

export interface MessageStepData {
  message: string;
}

interface MessageStepProps {
  data: MessageStepData;
  onChange: (data: MessageStepData) => void;
  error?: string;
}

export function MessageStep({ data, onChange, error }: MessageStepProps) {
  const [showEmojis, setShowEmojis] = useState(false);

  const appendEmoji = (emoji: string) => {
    onChange({ message: data.message + emoji });
    setShowEmojis(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Add a message</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Optional — let the creator know you appreciate them.</p>
      </div>

      <div className="space-y-1">
        <div className="relative">
          <textarea
            id="tip-message"
            rows={4}
            maxLength={280}
            value={data.message}
            onChange={(e) => onChange({ message: e.target.value })}
            placeholder="Write something nice..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
          <div className="mt-1 flex items-center justify-between">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojis((v) => !v)}
                aria-label="Open emoji picker"
                className="rounded-lg p-1.5 text-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                😊
              </button>
              {showEmojis && (
                <div className="absolute bottom-full left-0 z-10 mb-1 flex gap-1 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                  {EMOJIS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => appendEmoji(e)}
                      className="rounded-lg p-1.5 text-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-400">{data.message.length}/280</span>
          </div>
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </motion.div>
  );
}
