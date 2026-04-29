"use client";

interface ViewerCountBadgeProps {
  count: number;
  isLive: boolean;
}

export function ViewerCountBadge({ count, isLive }: ViewerCountBadgeProps) {
  if (!isLive) return null;
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-ink/10 px-3 py-1 text-sm font-medium text-ink">
      <svg className="h-4 w-4 text-ink/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      <span>{count.toLocaleString()} watching</span>
    </div>
  );
}
