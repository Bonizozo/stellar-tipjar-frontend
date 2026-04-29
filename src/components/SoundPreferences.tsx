"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getSoundVolume,
  isSoundMuted,
  playNotificationSound,
  setSoundMuted,
  setSoundVolume,
} from "@/utils/soundUtils";

export function SoundPreferences() {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setMuted(isSoundMuted());
    setVolume(getSoundVolume());
  }, []);

  const handleMuteToggle = useCallback(() => {
    const next = !muted;
    setSoundMuted(next);
    setMuted(next);
  }, [muted]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = parseFloat(e.target.value);
      setSoundVolume(next);
      setVolume(next);
    },
    [],
  );

  const handlePreview = useCallback(() => {
    // Temporarily unmute for preview
    const wasMuted = isSoundMuted();
    if (wasMuted) setSoundMuted(false);
    playNotificationSound();
    if (wasMuted) setTimeout(() => setSoundMuted(true), 700);
  }, []);

  return (
    <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-5 space-y-4">
      <h3 className="text-sm font-semibold text-ink">Sound Preferences</h3>

      {/* Mute toggle */}
      <div className="flex items-center justify-between">
        <label htmlFor="sound-mute" className="text-sm text-ink/70">
          Notification sounds
        </label>
        <button
          id="sound-mute"
          role="switch"
          aria-checked={!muted}
          onClick={handleMuteToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-wave ${
            muted ? "bg-ink/20" : "bg-wave"
          }`}
        >
          <span className="sr-only">{muted ? "Enable sounds" : "Disable sounds"}</span>
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              muted ? "translate-x-1" : "translate-x-6"
            }`}
          />
        </button>
      </div>

      {/* Volume slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="sound-volume" className="text-sm text-ink/70">
            Volume
          </label>
          <span className="text-xs font-mono text-ink/50">
            {Math.round(volume * 100)}%
          </span>
        </div>
        <input
          id="sound-volume"
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={handleVolumeChange}
          disabled={muted}
          aria-label="Notification sound volume"
          className="w-full accent-wave disabled:opacity-40"
        />
      </div>

      {/* Preview button */}
      <button
        onClick={handlePreview}
        className="text-xs font-medium text-wave underline decoration-wave/30 underline-offset-4 hover:decoration-wave transition-all"
      >
        Preview sound
      </button>
    </div>
  );
}
