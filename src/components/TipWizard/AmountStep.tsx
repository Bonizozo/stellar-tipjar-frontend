"use client";

import { motion } from "framer-motion";

const PRESETS = [1, 5, 10, 25, 50, 100];

export interface AmountStepData {
  amount: number;
  asset: string;
}

interface AmountStepProps {
  data: AmountStepData;
  onChange: (data: AmountStepData) => void;
  error?: string;
}

export function AmountStep({ data, onChange, error }: AmountStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Choose an amount</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Select a preset or enter a custom amount.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange({ ...data, amount: preset })}
            className={[
              "rounded-xl border-2 py-3 text-sm font-semibold transition-colors",
              data.amount === preset
                ? "border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                : "border-gray-200 text-gray-700 hover:border-purple-300 dark:border-gray-700 dark:text-gray-300",
            ].join(" ")}
          >
            {preset} XLM
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <label htmlFor="custom-amount" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Custom amount (XLM)
        </label>
        <input
          id="custom-amount"
          type="number"
          min="0.0000001"
          step="any"
          value={data.amount || ""}
          onChange={(e) => onChange({ ...data, amount: parseFloat(e.target.value) || 0 })}
          placeholder="Enter amount..."
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    </motion.div>
  );
}
