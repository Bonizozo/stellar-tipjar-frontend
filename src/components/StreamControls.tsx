"use client";

interface StreamControlsProps {
  isLive: boolean;
  isRecording: boolean;
  viewerCount: number;
  onStart: () => void;
  onStop: () => void;
  onToggleRecording: () => void;
  onSimulateTip: () => void;
}

export function StreamControls({
  isLive,
  isRecording,
  viewerCount,
  onStart,
  onStop,
  onToggleRecording,
  onSimulateTip,
}: StreamControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Live indicator + viewer count */}
      <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-[color:var(--surface)] px-4 py-2">
        <span
          className={`h-2.5 w-2.5 rounded-full ${isLive ? "bg-red-500 animate-pulse" : "bg-ink/20"}`}
          aria-hidden="true"
        />
        <span className={`text-sm font-bold ${isLive ? "text-red-500" : "text-ink/40"}`}>
          {isLive ? "LIVE" : "OFFLINE"}
        </span>
        {isLive && (
          <>
            <span className="text-ink/20">·</span>
            <svg className="h-4 w-4 text-ink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-sm font-semibold text-ink">{viewerCount.toLocaleString()}</span>
          </>
        )}
      </div>

      {/* Recording badge */}
      {isLive && (
        <button
          type="button"
          onClick={onToggleRecording}
          className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
            isRecording
              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
              : "border border-ink/10 bg-[color:var(--surface)] text-ink/50 hover:text-ink"
          }`}
          aria-pressed={isRecording}
        >
          <span className={`h-2 w-2 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-ink/30"}`} aria-hidden="true" />
          {isRecording ? "Recording" : "Record"}
        </button>
      )}

      {/* Go live / End stream */}
      {isLive ? (
        <button
          type="button"
          onClick={onStop}
          className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
        >
          End Stream
        </button>
      ) : (
        <button
          type="button"
          onClick={onStart}
          className="rounded-full bg-wave px-4 py-2 text-sm font-semibold text-white hover:bg-wave/90 transition-colors"
        >
          Go Live
        </button>
      )}

      {/* Dev helper */}
      {isLive && (
        <button
          type="button"
          onClick={onSimulateTip}
          className="rounded-full border border-yellow-300 bg-yellow-50 px-3 py-2 text-xs font-medium text-yellow-700 hover:bg-yellow-100 dark:border-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 transition-colors"
        >
          + Simulate Tip
        </button>
      )}
    </div>
  );
}
