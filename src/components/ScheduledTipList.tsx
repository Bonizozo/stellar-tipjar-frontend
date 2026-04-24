"use client";

import { useCancelScheduledTip, useScheduledTips } from "@/hooks/mutations/useScheduleTip";
import type { ScheduledTip } from "@/services/scheduleService";

const STATUS_STYLES: Record<ScheduledTip["status"], string> = {
  pending: "bg-wave/10 text-wave",
  sent: "bg-success/10 text-success",
  cancelled: "bg-ink/10 text-ink/50",
};

export function ScheduledTipList({ username }: { username?: string }) {
  const { data: tips, isLoading } = useScheduledTips(username);
  const { mutate: cancel, isPending } = useCancelScheduledTip();

  if (isLoading) return <p className="text-sm text-ink/50">Loading scheduled tips…</p>;
  if (!tips?.length) return <p className="text-sm text-ink/50">No scheduled tips yet.</p>;

  return (
    <ul className="space-y-3" aria-label="Scheduled tips">
      {tips.map((tip) => (
        <li
          key={tip.id}
          className="flex items-start justify-between gap-4 rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm"
        >
          <div className="space-y-0.5">
            <p className="font-medium text-ink">
              {tip.amount} {tip.assetCode} → @{tip.username}
            </p>
            <p className="text-ink/60">
              {new Date(tip.scheduledAt).toLocaleDateString()}
              {tip.recurrence !== "none" && ` · repeats ${tip.recurrence}`}
            </p>
            {tip.message && <p className="text-ink/50 italic">"{tip.message}"</p>}
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[tip.status]}`}>
              {tip.status}
            </span>
            {tip.status === "pending" && (
              <button
                onClick={() => cancel(tip.id)}
                disabled={isPending}
                className="text-xs text-error hover:underline disabled:opacity-50"
                aria-label={`Cancel scheduled tip ${tip.id}`}
              >
                Cancel
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
