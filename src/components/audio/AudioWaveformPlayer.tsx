"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Scissors, Palette } from "lucide-react";
import { useAudioWaveform } from "@/hooks/useAudioWaveform";
import { WaveformCanvas } from "./WaveformCanvas";
import { AudioControls } from "./AudioControls";
import { ZoomControls } from "./ZoomControls";
import { RegionList } from "./RegionList";
import type { WaveformStyle, WaveformRegion } from "@/types/audio";

const ZOOM_STEP = 0.5;
const ZOOM_MIN = 1;
const ZOOM_MAX = 10;

const PRESET_STYLES: { label: string; style: Partial<WaveformStyle> }[] = [
  {
    label: "Indigo",
    style: {
      waveColor: "rgba(99,102,241,0.45)",
      progressColor: "rgba(99,102,241,1)",
      cursorColor: "#6366f1",
      regionColor: "rgba(99,102,241,0.15)",
    },
  },
  {
    label: "Wave",
    style: {
      waveColor: "rgba(14,165,233,0.45)",
      progressColor: "rgba(14,165,233,1)",
      cursorColor: "#0ea5e9",
      regionColor: "rgba(14,165,233,0.15)",
    },
  },
  {
    label: "Sunrise",
    style: {
      waveColor: "rgba(249,115,22,0.45)",
      progressColor: "rgba(249,115,22,1)",
      cursorColor: "#f97316",
      regionColor: "rgba(249,115,22,0.15)",
    },
  },
  {
    label: "Moss",
    style: {
      waveColor: "rgba(34,197,94,0.45)",
      progressColor: "rgba(34,197,94,1)",
      cursorColor: "#22c55e",
      regionColor: "rgba(34,197,94,0.15)",
    },
  },
];

export interface AudioWaveformPlayerProps {
  /** URL of the audio file to load */
  url: string;
  /** Optional title shown above the player */
  title?: string;
  /** Number of waveform bars */
  peaks?: number;
  /** Initial style overrides */
  styleOverride?: Partial<WaveformStyle>;
  /** Show region selection tools */
  showRegions?: boolean;
  /** Show style picker */
  showStylePicker?: boolean;
  className?: string;
  onRegionCreate?: (region: WaveformRegion) => void;
}

export function AudioWaveformPlayer({
  url,
  title,
  peaks = 200,
  styleOverride,
  showRegions = true,
  showStylePicker = true,
  className = "",
  onRegionCreate,
}: AudioWaveformPlayerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activePreset, setActivePreset] = useState(0);
  const [pendingRegionStart, setPendingRegionStart] = useState<number | null>(null);
  const [showStylePanel, setShowStylePanel] = useState(false);

  const mergedStyle: Partial<WaveformStyle> = {
    ...PRESET_STYLES[activePreset].style,
    ...styleOverride,
  };

  const { peaks: waveformPeaks, regions, playerState, style, actions } = useAudioWaveform({
    url,
    peaks,
    style: mergedStyle,
    onRegionCreate,
  });

  const handleZoomIn = useCallback(() => {
    actions.setZoom(Math.min(ZOOM_MAX, playerState.zoom + ZOOM_STEP));
  }, [actions, playerState.zoom]);

  const handleZoomOut = useCallback(() => {
    actions.setZoom(Math.max(ZOOM_MIN, playerState.zoom - ZOOM_STEP));
  }, [actions, playerState.zoom]);

  const handleScroll = useCallback(() => {
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
  }, []);

  const handleRegionDragEnd = useCallback(
    (start: number, end: number) => {
      actions.addRegion({
        start,
        end,
        label: `Region ${regions.length + 1}`,
        color: PRESET_STYLES[activePreset].style.regionColor,
      });
    },
    [actions, regions.length, activePreset]
  );

  const isReady = !playerState.isLoading && !playerState.isDecoding && waveformPeaks !== null;

  return (
    <div className={`rounded-2xl border border-ink/10 bg-[color:var(--surface)] overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-2">
        <div className="min-w-0">
          {title && (
            <p className="font-semibold text-ink text-sm truncate">{title}</p>
          )}
          <p className="text-xs text-ink/40">
            {playerState.isDecoding
              ? "Analysing audio…"
              : playerState.isLoading
              ? "Loading…"
              : playerState.error
              ? playerState.error
              : `${Math.floor(playerState.duration / 60)}:${String(Math.floor(playerState.duration % 60)).padStart(2, "0")} · ${peaks} bars`}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Zoom controls */}
          <ZoomControls
            zoom={playerState.zoom}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={() => actions.setZoom(1)}
            min={ZOOM_MIN}
            max={ZOOM_MAX}
          />

          {/* Style picker toggle */}
          {showStylePicker && (
            <button
              type="button"
              onClick={() => setShowStylePanel((v: boolean) => !v)}
              className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-colors ${
                showStylePanel
                  ? "border-wave/50 bg-wave/10 text-wave"
                  : "border-ink/10 bg-[color:var(--surface)] text-ink/60 hover:text-ink"
              }`}
              aria-label="Waveform style"
            >
              <Palette className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Region tool toggle */}
          {showRegions && (
            <button
              type="button"
              onClick={() => actions.clearRegions()}
              className="flex h-7 items-center gap-1 rounded-lg border border-ink/10 bg-[color:var(--surface)] px-2 text-xs text-ink/60 hover:text-ink hover:border-ink/20 transition-colors"
              aria-label="Clear all regions"
            >
              <Scissors className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Style picker panel */}
      {showStylePanel && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-5 pb-3 flex items-center gap-2 flex-wrap"
        >
          {PRESET_STYLES.map((preset, i) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setActivePreset(i)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                activePreset === i
                  ? "border-wave/50 bg-wave/10 text-wave"
                  : "border-ink/10 text-ink/60 hover:border-ink/20 hover:text-ink"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: preset.style.progressColor as string }}
              />
              {preset.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Waveform area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-x-auto scrollbar-thin scrollbar-thumb-ink/10 scrollbar-track-transparent"
        style={{ cursor: "default" }}
      >
        <div style={{ width: `${playerState.zoom * 100}%`, minWidth: "100%" }}>
          {playerState.isDecoding || !waveformPeaks ? (
            <div
              className="flex items-center justify-center"
              style={{ height: style.height }}
            >
              <div className="flex items-end gap-0.5">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 rounded-full bg-ink/10"
                    animate={{ height: [8, 24 + Math.random() * 24, 8] }}
                    transition={{
                      duration: 0.8 + Math.random() * 0.4,
                      repeat: Infinity,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <WaveformCanvas
              peaks={waveformPeaks}
              currentTime={playerState.currentTime}
              duration={playerState.duration}
              zoom={playerState.zoom}
              regions={regions}
              style={style}
              scrollLeft={scrollLeft}
              onSeek={actions.seek}
              onRegionDragEnd={showRegions ? handleRegionDragEnd : undefined}
            />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="px-5 py-4 border-t border-ink/5">
        <AudioControls
          state={playerState}
          onTogglePlay={actions.togglePlay}
          onSeek={actions.seek}
          onVolumeChange={actions.setVolume}
          onToggleMute={actions.toggleMute}
          onPlaybackRateChange={actions.setPlaybackRate}
          onSkip={(s) => actions.seek(playerState.currentTime + s)}
        />
      </div>

      {/* Region list */}
      {showRegions && regions.length > 0 && (
        <div className="px-5 pb-4 border-t border-ink/5 pt-3">
          <p className="text-xs font-semibold text-ink/50 uppercase tracking-wide mb-2">
            Regions
          </p>
          <RegionList
            regions={regions}
            onRegionClick={actions.handleRegionClick}
            onRegionRemove={actions.removeRegion}
          />
        </div>
      )}
    </div>
  );
}
