"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type {
  AudioPlayerState,
  WaveformRegion,
  UseAudioWaveformOptions,
  WaveformStyle,
} from "@/types/audio";

export const DEFAULT_STYLE: WaveformStyle = {
  waveColor: "rgba(99,102,241,0.5)",
  progressColor: "rgba(99,102,241,1)",
  backgroundColor: "transparent",
  regionColor: "rgba(99,102,241,0.15)",
  cursorColor: "#6366f1",
  barWidth: 3,
  barGap: 1,
  barRadius: 2,
  height: 80,
};

/** Decode an audio file URL into a Float32Array of normalised peak amplitudes. */
async function decodePeaks(url: string, numPeaks: number): Promise<Float32Array> {
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) throw new Error("Web Audio API not supported");

  const ctx = new AudioCtx();
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch audio: ${response.status}`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

    const channelData = audioBuffer.getChannelData(0);
    const blockSize = Math.floor(channelData.length / numPeaks);
    const peaks = new Float32Array(numPeaks);

    for (let i = 0; i < numPeaks; i++) {
      let max = 0;
      const start = i * blockSize;
      const end = start + blockSize;
      for (let j = start; j < end; j++) {
        const abs = Math.abs(channelData[j]);
        if (abs > max) max = abs;
      }
      peaks[i] = max;
    }

    // Normalise to 0–1
    const globalMax = Math.max(...Array.from(peaks));
    if (globalMax > 0) {
      for (let i = 0; i < peaks.length; i++) peaks[i] /= globalMax;
    }

    return peaks;
  } finally {
    await ctx.close();
  }
}

/** Generate synthetic peaks for demo/fallback when real audio can't be decoded. */
function generateSyntheticPeaks(numPeaks: number): Float32Array {
  const peaks = new Float32Array(numPeaks);
  for (let i = 0; i < numPeaks; i++) {
    // Smooth random walk with some structure
    const t = i / numPeaks;
    const base = 0.3 + 0.4 * Math.sin(t * Math.PI * 6);
    const noise = (Math.random() - 0.5) * 0.3;
    peaks[i] = Math.max(0.05, Math.min(1, base + noise));
  }
  return peaks;
}

export function useAudioWaveform(options: UseAudioWaveformOptions) {
  const {
    url,
    peaks: numPeaks = 200,
    style: styleOverride,
    onReady,
    onTimeUpdate,
    onRegionCreate,
    onRegionClick,
  } = options;

  const style: WaveformStyle = { ...DEFAULT_STYLE, ...styleOverride };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [peaks, setPeaks] = useState<Float32Array | null>(null);
  const [regions, setRegions] = useState<WaveformRegion[]>([]);
  const [playerState, setPlayerState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    muted: false,
    playbackRate: 1,
    zoom: 1,
    isLoading: true,
    isDecoding: true,
    error: null,
  });

  // ── Decode peaks on mount / url change ──────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setPlayerState((p) => ({ ...p, isLoading: true, isDecoding: true, error: null }));

    decodePeaks(url, numPeaks)
      .then((decoded) => {
        if (!cancelled) {
          setPeaks(decoded);
          setPlayerState((p) => ({ ...p, isDecoding: false }));
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Fallback to synthetic peaks so the UI still renders
          setPeaks(generateSyntheticPeaks(numPeaks));
          setPlayerState((p) => ({ ...p, isDecoding: false }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url, numPeaks]);

  // ── Wire up HTMLAudioElement ─────────────────────────────────────────────
  useEffect(() => {
    const audio = new Audio(url);
    audio.preload = "metadata";
    audioRef.current = audio;

    const onLoadedMetadata = () => {
      setPlayerState((p) => ({ ...p, duration: audio.duration, isLoading: false }));
      onReady?.(audio.duration);
    };
    const onEnded = () => setPlayerState((p) => ({ ...p, isPlaying: false }));
    const onError = () =>
      setPlayerState((p) => ({ ...p, error: "Failed to load audio", isLoading: false }));

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, [url, onReady]);

  // ── Playback time tracking via rAF ───────────────────────────────────────
  useEffect(() => {
    if (!playerState.isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const tick = () => {
      const audio = audioRef.current;
      if (!audio) return;
      const t = audio.currentTime;
      setPlayerState((p) => ({ ...p, currentTime: t }));
      onTimeUpdate?.(t);
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [playerState.isPlaying, onTimeUpdate]);

  // ── Actions ──────────────────────────────────────────────────────────────

  const play = useCallback(() => {
    audioRef.current?.play().then(() => {
      setPlayerState((p) => ({ ...p, isPlaying: true }));
    }).catch(() => {});
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlayerState((p) => ({ ...p, isPlaying: false }));
  }, []);

  const togglePlay = useCallback(() => {
    if (playerState.isPlaying) pause();
    else play();
  }, [playerState.isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(audio.duration || 0, time));
    audio.currentTime = clamped;
    setPlayerState((p) => ({ ...p, currentTime: clamped }));
  }, []);

  const setVolume = useCallback((vol: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(1, vol));
    audio.volume = clamped;
    setPlayerState((p) => ({ ...p, volume: clamped, muted: clamped === 0 }));
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setPlayerState((p) => ({ ...p, muted: audio.muted }));
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = rate;
    setPlayerState((p) => ({ ...p, playbackRate: rate }));
  }, []);

  const setZoom = useCallback((zoom: number) => {
    setPlayerState((p) => ({ ...p, zoom: Math.max(1, Math.min(10, zoom)) }));
  }, []);

  const addRegion = useCallback(
    (region: Omit<WaveformRegion, "id">) => {
      const newRegion: WaveformRegion = { ...region, id: `region-${Date.now()}` };
      setRegions((prev) => [...prev, newRegion]);
      onRegionCreate?.(newRegion);
    },
    [onRegionCreate]
  );

  const removeRegion = useCallback((id: string) => {
    setRegions((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const clearRegions = useCallback(() => setRegions([]), []);

  const handleRegionClick = useCallback(
    (region: WaveformRegion) => {
      seek(region.start);
      onRegionClick?.(region);
    },
    [seek, onRegionClick]
  );

  return {
    peaks,
    regions,
    playerState,
    style,
    actions: {
      play,
      pause,
      togglePlay,
      seek,
      setVolume,
      toggleMute,
      setPlaybackRate,
      setZoom,
      addRegion,
      removeRegion,
      clearRegions,
      handleRegionClick,
    },
  };
}
