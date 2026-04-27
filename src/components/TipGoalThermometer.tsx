"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface ThermometerMilestone {
  percentage: number;
  label: string;
}

export interface TipGoalThermometerProps {
  currentAmount: number;
  targetAmount: number;
  currency?: string;
  title?: string;
  milestones?: ThermometerMilestone[];
  fillColor?: string;
  className?: string;
}

const DEFAULT_MILESTONES: ThermometerMilestone[] = [
  { percentage: 25, label: "25%" },
  { percentage: 50, label: "50%" },
  { percentage: 75, label: "75%" },
  { percentage: 100, label: "Goal!" },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function TipGoalThermometer({
  currentAmount,
  targetAmount,
  currency = "XLM",
  title,
  milestones = DEFAULT_MILESTONES,
  fillColor = "#7c3aed",
  className = "",
}: TipGoalThermometerProps) {
  const prefersReduced = useReducedMotion();
  const percentage = clamp((currentAmount / targetAmount) * 100, 0, 100);

  const raw = useMotionValue(0);
  const springFill = useSpring(raw, {
    stiffness: prefersReduced ? 1000 : 80,
    damping: prefersReduced ? 100 : 18,
  });

  const initialized = useRef(false);
  useEffect(() => {
    const t = setTimeout(
      () => raw.set(percentage),
      initialized.current ? 0 : 120,
    );
    initialized.current = true;
    return () => clearTimeout(t);
  }, [percentage, raw]);

  return (
    <div
      className={`flex flex-col items-center gap-3 ${className}`}
      aria-label="Tip goal thermometer"
    >
      {title && (
        <p className="text-sm font-semibold text-ink dark:text-white text-center">{title}</p>
      )}

      {/* Thermometer tube */}
      <div className="relative flex flex-col items-center" style={{ height: 220 }}>
        {/* Milestone markers */}
        {milestones.map((m) => (
          <div
            key={m.percentage}
            className="absolute left-10 flex items-center gap-1 pointer-events-none"
            style={{ bottom: `${(m.percentage / 100) * 200}px` }}
            aria-label={`Milestone: ${m.label} at ${m.percentage}%`}
          >
            <div className="w-3 h-px bg-gray-400 dark:bg-gray-500" />
            <span className="text-[10px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {m.label}
            </span>
          </div>
        ))}

        {/* Tube background */}
        <div
          className="relative w-7 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800"
          style={{ height: 200 }}
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Animated fill — grows from bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 rounded-full"
            style={{ backgroundColor: fillColor, height: springFill }}
          />
          {/* Shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none rounded-full" />
        </div>

        {/* Bulb at bottom */}
        <div
          className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center -mt-1 shadow-inner"
          style={{ backgroundColor: fillColor }}
          aria-hidden="true"
        >
          <div className="w-5 h-5 rounded-full bg-white/30" />
        </div>
      </div>

      {/* Stats */}
      <div className="text-center space-y-0.5">
        <p className="text-lg font-bold text-ink dark:text-white">
          {Math.round(percentage)}%
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {currentAmount.toLocaleString()} / {targetAmount.toLocaleString()} {currency}
        </p>
      </div>
    </div>
  );
}
