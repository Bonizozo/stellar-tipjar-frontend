"use client";

import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import type { ChangeEvent } from "react";
import type { AudioPlayerState } from "@/types/audio";

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface AudioControlsProps {
  state: AudioPlayerState;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onPlaybackRateChange: (rate: number) => void;
  onSkip: (seconds: number) => void;
  compact?: boolean;
}

const RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function AudioControls({
  state,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onPlaybackRateChange,
  onSkip,
  compact = false,
}: AudioControlsProps) {
  const progress = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

  return (
    <div className="flex flex-col gap-2">
      {/* Seek bar */}
      <div className="flex items-center gap-2">
        <span className="text-xs tabular-nums text-ink/50 w-10 text-right">
          {formatTime(state.currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={state.duration || 100}
          step={0.01}
          value={state.currentTime}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onSeek(Number(e.target.value))}
          className="flex-1 h-1.5 accent-wave cursor-pointer"
          aria-label="Seek"
        />
        <span className="text-xs tabular-nums text-ink/50 w-10">
          {formatTime(state.duration)}
        </span>
      </div>

      {/* Buttons row */}
      <div className="flex items-center gap-3">
        {/* Skip back */}
        <button
          type="button"
          onClick={() => onSkip(-10)}
          className="text-ink/60 hover:text-ink transition-colors"
          aria-label="Skip back 10 seconds"
        >
          <SkipBack className="h-4 w-4" />
        </button>

        {/* Play / Pause */}
        <button
          type="button"
          onClick={onTogglePlay}
          disabled={state.isLoading || state.isDecoding}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-wave text-white shadow-md hover:bg-wave/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={state.isPlaying ? "Pause" : "Play"}
        >
          {state.isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 translate-x-0.5" />
          )}
        </button>

        {/* Skip forward */}
        <button
          type="button"
          onClick={() => onSkip(10)}
          className="text-ink/60 hover:text-ink transition-colors"
          aria-label="Skip forward 10 seconds"
        >
          <SkipForward className="h-4 w-4" />
        </button>

        {!compact && (
          <>
            {/* Playback rate */}
            <select
              value={state.playbackRate}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => onPlaybackRateChange(Number(e.target.value))}
              className="ml-1 rounded-lg border border-ink/10 bg-[color:var(--surface)] px-2 py-1 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-wave/40"
              aria-label="Playback speed"
            >
              {RATES.map((r) => (
                <option key={r} value={r}>
                  {r}×
                </option>
              ))}
            </select>

            {/* Volume */}
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleMute}
                className="text-ink/60 hover:text-ink transition-colors"
                aria-label={state.muted ? "Unmute" : "Mute"}
              >
                {state.muted || state.volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={state.muted ? 0 : state.volume}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onVolumeChange(Number(e.target.value))}
                className="w-20 h-1.5 accent-wave cursor-pointer"
                aria-label="Volume"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
