"use client";

import { useEffect, useState, useMemo } from "react";
import { CheckCircle, Star } from "lucide-react";

interface Milestone {
  amount: number;
  label: string;
}

interface GoalProgressBarProps {
  currentAmount: number;
  goalAmount: number;
  milestones?: Milestone[];
  className?: string;
}

const DEFAULT_MILESTONES: Milestone[] = [
  { amount: 2500, label: "Bronze" },
  { amount: 5000, label: "Silver" },
  { amount: 7500, label: "Gold" },
];

export function GoalProgressBar({
  currentAmount,
  goalAmount,
  milestones = DEFAULT_MILESTONES,
  className = "",
}: GoalProgressBarProps) {
  const progress = Math.min(100, (currentAmount / goalAmount) * 100);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const reachedMilestones = useMemo(
    () => milestones.filter((m) => currentAmount >= m.amount),
    [currentAmount, milestones]
  );

  const nextMilestone = useMemo(() => {
    const next = milestones.find((m) => currentAmount < m.amount);
    return next ? `${Math.round((next.amount - currentAmount) / goalAmount * 100)}% to ${next.label}` : "Goal Reached!";
  }, [currentAmount, milestones, goalAmount]);

  useEffect(() => {
    if (progress >= 100) {
      setIsCelebrating(true);
      const timer = setTimeout(() => setIsCelebrating(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className={`rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 shadow-card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-ink">Funding Goal Progress</h3>
        {reachedMilestones.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-wave font-medium">
            <Star className="h-4 w-4 fill-current" />
            {reachedMilestones.length} Milestones
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative mb-4 h-4 w-full overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-wave to-blue-500 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          style={{ width: `${progress}%` }}
        />
        {/* Milestone Markers */}
        {milestones.map((milestone, index) => {
          const milestoneProgress = (milestone.amount / goalAmount) * 100;
          const isReached = currentAmount >= milestone.amount;
          return (
            <div
              key={index}
              className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 shadow-sm transition-all duration-500"
              style={{ left: `${Math.min(milestoneProgress, 100)}%` }}
            >
              <div
                className={`h-full w-full rounded-full transition-all duration-500 ${
                  isReached ? "bg-wave scale-110 shadow-wave/50" : "bg-ink/50"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Progress Text */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-mono text-ink/75">
          {currentAmount.toLocaleString()} / {goalAmount.toLocaleString()} XLM
        </span>
        <span className="font-semibold text-wave">{progress.toFixed(1)}%</span>
      </div>

      {/* Next Milestone */}
      <p className="mt-2 text-xs text-ink/60 italic">{nextMilestone}</p>

      {/* Celebration */}
      {isCelebrating && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/20 backdrop-blur-sm">
          <CheckCircle className="h-16 w-16 text-emerald-400 animate-ping animate-spin-slow [animation-duration:2s]" />
          <div className="confetti absolute inset-0" />
        </div>
      )}

      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        .confetti::before,
        .confetti::after {
          content: "🎉";
          position: absolute;
          animation: confetti 3s infinite linear;
          font-size: 1.5rem;
          pointer-events: none;
        }
        .confetti::before { left: 20%; animation-delay: 0s; }
        .confetti::after { left: 60%; animation-delay: 1s; animation-duration: 2.5s; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

