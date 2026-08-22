"use client";

interface Milestone {
  pct: number;
  label: string;
}

interface ProgressBarProps {
  progress: number; // 0–100
  milestones?: Milestone[];
  className?: string;
}

const DEFAULT_MILESTONES: Milestone[] = [
  { pct: 25, label: "25%" },
  { pct: 50, label: "50%" },
  { pct: 75, label: "75%" },
];

export function ProgressBar({
  progress,
  milestones = DEFAULT_MILESTONES,
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className={`relative h-3 w-full overflow-visible rounded-full bg-ink/10 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-wave to-blue-500 transition-all duration-700 ease-out"
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      {milestones.map((m) => (
        <div
          key={m.pct}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${m.pct}%` }}
          title={m.label}
        >
          <div
            className={`h-3 w-3 rounded-full border-2 border-white transition-colors duration-500 ${
              clamped >= m.pct ? "bg-wave" : "bg-ink/30"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
