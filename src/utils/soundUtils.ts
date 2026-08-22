/**
 * soundUtils.ts
 * Web Audio API–based notification sound. No external audio files needed.
 * Mute and volume preferences are persisted via the namespaced storage layer.
 */

import { createNamespacedStorage } from "@/lib/storage";

const storage = createNamespacedStorage("sound");

const DEFAULT_VOLUME = 0.5; // 0.0 – 1.0

/** Returns true if the user has muted notification sounds. */
export function isSoundMuted(): boolean {
  return storage.getString("muted", { legacyKey: "tipjar:soundMuted" }) === "true";
}

/** Persists the mute preference. */
export function setSoundMuted(muted: boolean): void {
  storage.setString("muted", String(muted));
}

/** Returns the current volume (0.0 – 1.0). */
export function getSoundVolume(): number {
  const stored = storage.getString("volume", { legacyKey: "tipjar:soundVolume" });
  if (stored === null) return DEFAULT_VOLUME;
  const parsed = parseFloat(stored);
  return isNaN(parsed) ? DEFAULT_VOLUME : Math.min(1, Math.max(0, parsed));
}

/** Persists the volume preference (0.0 – 1.0). */
export function setSoundVolume(volume: number): void {
  storage.setString("volume", String(Math.min(1, Math.max(0, volume))));
}

/**
 * Plays a short ascending two-tone chime using the Web Audio API.
 * Safe to call on any browser; silently no-ops if audio is unavailable.
 */
export function playNotificationSound(): void {
  if (typeof window === "undefined") return;
  if (isSoundMuted()) return;

  const volume = getSoundVolume();
  if (volume === 0) return;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioCtx) return;

    const ctx = new AudioCtx();

    const playTone = (
      frequency: number,
      startTime: number,
      duration: number
    ) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, startTime);

      // Fade in quickly then fade out smoothly, scaled by volume
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3 * volume, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playTone(523.25, now, 0.18);        // C5
    playTone(783.99, now + 0.12, 0.22); // G5

    // Clean up the audio context after tones finish
    setTimeout(() => ctx.close(), 600);
  } catch {
    // Audio not available or blocked – silently ignore
  }
}
