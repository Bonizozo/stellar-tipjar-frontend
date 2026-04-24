"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  id: string | number;
  label: string;
  description?: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number; // 0-indexed
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  color?: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  currentStep,
  onStepClick,
  className = "",
  color = "bg-sunrise",
}) => {
  return (
    <div className={`w-full max-w-2xl mx-auto px-4 ${className}`}>
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 h-0.5 w-full bg-ink/10 dark:bg-canvas/10 -z-10" />
        <motion.div
           className={`absolute top-5 left-0 h-0.5 ${color} -z-10`}
           initial={{ width: 0 }}
           animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
           transition={{ duration: 0.5 }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <motion.button
                onClick={() => onStepClick?.(index)}
                disabled={!onStepClick}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? `${color} border-transparent text-white`
                    : isActive
                    ? `border-sunrise bg-canvas dark:bg-ink text-sunrise shadow-lg ring-4 ring-sunrise/20`
                    : "border-ink/10 dark:border-canvas/10 bg-canvas dark:bg-ink text-ink/40 dark:text-canvas/40"
                }`}
                whileHover={onStepClick ? { scale: 1.1 } : {}}
                whileTap={onStepClick ? { scale: 0.95 } : {}}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </motion.button>
              <div className="mt-3 text-center">
                <p className={`text-xs font-bold uppercase tracking-wider ${
                  isActive ? "text-sunrise" : "text-ink/60 dark:text-canvas/60"
                }`}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="mt-1 text-[10px] text-ink/40 dark:text-canvas/40 whitespace-nowrap">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
