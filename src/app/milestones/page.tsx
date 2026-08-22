"use client";

import { useState } from "react";
import { MILESTONES, getUnlockedMilestones } from "@/utils/milestones";
import { MilestoneBadge } from "@/components/MilestoneCelebration/MilestoneBadge";
import { MilestoneCelebrationModal } from "@/components/MilestoneCelebration/MilestoneCelebrationModal";
import { useMilestoneCelebration } from "@/hooks/useMilestoneCelebration";

export default function MilestonesPage() {
  // Demo: simulate tip count with a slider
  const [totalTips, setTotalTips] = useState(0);
  const { activeMilestone, dismiss } = useMilestoneCelebration(totalTips);
  const unlocked = getUnlockedMilestones(totalTips);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-ink">Tip Milestones</h1>
        <p className="mt-1 text-sm text-ink/60">
          Celebrate every milestone on your creator journey.
        </p>
      </div>

      {/* Demo controls */}
      <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 dark:bg-zinc-900/70 space-y-3">
        <label htmlFor="tip-count" className="block text-sm font-semibold text-ink">
          Simulate tip count: <span className="text-indigo-600">{totalTips}</span>
        </label>
        <input
          id="tip-count"
          type="range"
          min={0}
          max={1000}
          value={totalTips}
          onChange={(e) => setTotalTips(Number(e.target.value))}
          className="w-full accent-indigo-500"
        />
        <div className="flex flex-wrap gap-2">
          {MILESTONES.map((m) => (
            <button
              key={m.id}
              onClick={() => setTotalTips(m.threshold)}
              className="rounded-lg border border-ink/20 px-3 py-1 text-xs font-medium text-ink/70 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Milestone badges grid */}
      <section aria-label="Milestone badges">
        <h2 className="mb-4 text-lg font-semibold text-ink">All Milestones</h2>
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-6">
          {MILESTONES.map((m) => {
            const isUnlocked = unlocked.some((u) => u.id === m.id);
            return (
              <div
                key={m.id}
                className={`transition-opacity ${isUnlocked ? "opacity-100" : "opacity-30 grayscale"}`}
                title={isUnlocked ? m.label : `Reach ${m.threshold} tips to unlock`}
              >
                <MilestoneBadge milestone={m} size="sm" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Celebration modal */}
      {activeMilestone && (
        <MilestoneCelebrationModal
          milestone={activeMilestone}
          username="demo"
          onClose={dismiss}
        />
      )}
    </main>
  );
}
