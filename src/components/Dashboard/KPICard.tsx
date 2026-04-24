"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

export function KPICard({
  title,
  value,
  change,
  isPositive = true,
  icon,
  loading = false,
}: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (loading || typeof value !== "number") return;

    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, loading]);

  return (
    <motion.div
      className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6 dark:border-ink-dark/10 dark:bg-[color:var(--surface-dark)]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-ink/70 dark:text-ink-dark/70">{title}</p>
          <p className="text-3xl font-bold text-ink dark:text-ink-dark mt-2">
            {loading ? "..." : typeof value === "number" ? displayValue : value}
          </p>
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-wave/10 text-wave dark:bg-wave-dark/10 dark:text-wave-dark">
            {icon}
          </div>
        )}
      </div>

      {change && (
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
          ) : (
            <TrendingDown size={16} className="text-red-600 dark:text-red-400" />
          )}
          <span
            className={`text-sm font-medium ${
              isPositive
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {change}
          </span>
        </div>
      )}
    </motion.div>
  );
}
