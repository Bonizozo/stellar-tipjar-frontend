"use client";

interface ChartSkeletonProps {
  height?: number;
  bars?: number;
}

/**
 * Animated skeleton placeholder shown while chart data is loading.
 */
export function ChartSkeleton({ height = 320, bars = 7 }: ChartSkeletonProps) {
  return (
    <div
      className="w-full animate-pulse rounded-xl bg-ink/5 p-4"
      style={{ height }}
      aria-busy="true"
      aria-label="Loading chart"
    >
      {/* Y-axis labels */}
      <div className="flex h-full gap-3">
        <div className="flex flex-col justify-between py-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-2 w-8 rounded bg-ink/10" />
          ))}
        </div>

        {/* Bars / lines area */}
        <div className="flex flex-1 items-end gap-2 pb-6">
          {Array.from({ length: bars }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-ink/10"
              style={{ height: `${30 + Math.sin(i * 0.9) * 25 + 30}%` }}
            />
          ))}
        </div>
      </div>

      {/* X-axis labels */}
      <div className="mt-2 flex justify-between px-10">
        {Array.from({ length: bars }).map((_, i) => (
          <div key={i} className="h-2 w-8 rounded bg-ink/10" />
        ))}
      </div>
    </div>
  );
}
