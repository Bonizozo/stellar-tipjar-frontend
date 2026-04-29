"use client";

"use client";

import { getUnlockedMilestones, MILESTONES } from "@/utils/milestones";
import { MilestoneBadge } from "@/components/MilestoneCelebration";

interface MilestoneProgressSectionProps {
  totalTips: number;
}

/**
 * Drop this into src/app/creator/[username]/page.tsx (or its client sub-component).
 * Shows earned badges and a progress bar toward the next milestone.
 *
 * Usage:
 *   <MilestoneProgressSection totalTips={creator.totalTips} />
 */
export function MilestoneProgressSection({ totalTips }: MilestoneProgressSectionProps) {
  const unlocked = getUnlockedMilestones(totalTips);
  const next = MILESTONES.find((m) => m.threshold > totalTips);
  const prev = unlocked.at(-1);

  const progressPct = next
    ? Math.min(
        100,
        (((totalTips - (prev?.threshold ?? 0)) /
          (next.threshold - (prev?.threshold ?? 0))) *
          100)
      )
    : 100;

  if (MILESTONES.length === 0) return null;

  return (
    <section aria-label="Tip milestones" className="mt-8 rounded-2xl border border-ink/10 bg-white/60 p-6 shadow-soft dark:bg-zinc-900/60">
      <h2 className="mb-4 text-base font-semibold text-ink">Milestones</h2>

      {/* Earned badges */}
      {unlocked.length > 0 ? (
        <div className="flex flex-wrap gap-4 mb-6">
          {unlocked.map((m) => (
            <MilestoneBadge key={m.id} milestone={m} size="sm" />
          ))}
        </div>
      ) : (
        <p className="mb-4 text-sm text-ink/50">No milestones yet — the first tip unlocks one! 🌱</p>
      )}

      {/* Progress toward next milestone */}
      {next && (
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs text-ink/60">
            <span>{totalTips} tips</span>
            <span>Next: {next.icon} {next.label} ({next.threshold})</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan transition-all duration-700"
              style={{ width: `${progressPct}%` }}
              role="progressbar"
              aria-valuenow={totalTips}
              aria-valuemin={prev?.threshold ?? 0}
              aria-valuemax={next.threshold}
            />
          </div>
        </div>
      )}

      {!next && (
        <p className="mt-2 text-sm font-semibold text-amber-500">🏆 All milestones reached!</p>
      )}
    </section>
  );
}