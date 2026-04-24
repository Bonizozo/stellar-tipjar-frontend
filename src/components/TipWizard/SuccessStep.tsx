"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SuccessStepProps {
  amount: number;
  asset: string;
  creatorUsername: string;
  onReset: () => void;
}

/** Minimal confetti burst using CSS keyframes injected once */
function ConfettiBurst() {
  const pieces = Array.from({ length: 20 }, (_, i) => i);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((i) => (
        <span
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.6}s`,
            animationDuration: `${0.8 + Math.random() * 0.6}s`,
            background: ["#a855f7", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"][i % 5],
          }}
          className="absolute top-0 h-2 w-1 animate-[confetti_1s_ease-out_forwards] rounded-full opacity-0"
        />
      ))}
    </div>
  );
}

export function SuccessStep({ amount, asset, creatorUsername, onReset }: SuccessStepProps) {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(true); }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative flex flex-col items-center gap-6 py-8 text-center"
    >
      {show && <ConfettiBurst />}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900"
      >
        <svg className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tip sent! 🎉</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          You sent <span className="font-semibold text-purple-600">{amount} {asset}</span> to{" "}
          <span className="font-semibold">@{creatorUsername}</span>.
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50"
      >
        Send another tip
      </button>
    </motion.div>
  );
}
