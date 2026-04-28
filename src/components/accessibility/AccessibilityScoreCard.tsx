"use client";

import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react";
import type { AccessibilityScore } from "@/types/accessibility";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AccessibilityScoreCardProps {
  score: AccessibilityScore;
}

function ScoreRing({ value, size = 80 }: { value: number; size?: number }) {
  const reduced = useReducedMotion();
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 80 ? "#10b981" : value >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <svg width={size} height={size} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={6} className="text-gray-200 dark:text-gray-700" />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: reduced ? offset : offset }}
        transition={{ duration: reduced ? 0 : 1, ease: "easeOut" }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize={size * 0.22} fontWeight="bold" fill={color}>
        {value}
      </text>
    </svg>
  );
}

export function AccessibilityScoreCard({ score }: AccessibilityScoreCardProps) {
  const lastAudit = new Date(score.lastAuditAt).toLocaleString();

  return (
    <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-[color:var(--surface)] p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-ink dark:text-white flex items-center gap-2">
            <ShieldCheck size={20} className="text-wave" />
            Compliance Score
          </h2>
          <p className="text-xs text-ink/50 dark:text-white/50 mt-0.5">Last audit: {lastAudit}</p>
        </div>
        <ScoreRing value={score.overall} size={72} />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {(["A", "AA", "AAA"] as const).map((level) => {
          const val = level === "A" ? score.levelA : level === "AA" ? score.levelAA : score.levelAAA;
          return (
            <div key={level} className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <p className="text-lg font-bold text-ink dark:text-white">{val}%</p>
              <p className="text-xs text-ink/50 dark:text-white/50">WCAG {level}</p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
          <AlertTriangle size={14} />
          <span>{score.criticalViolations} critical</span>
        </div>
        <div className="flex items-center gap-1.5 text-ink/60 dark:text-white/60">
          <CheckCircle size={14} />
          <span>{score.totalViolations} total violations</span>
        </div>
      </div>
    </div>
  );
}
