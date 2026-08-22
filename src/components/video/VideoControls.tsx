"use client";

import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward } from 'lucide-react';
import { formatTime, getProgressPercentage } from '@/utils/videoHelpers';
import type { VideoPlayerState, VideoQuality } from '@/types/video';
import { useState, useRef } from 'react';

interface VideoControlsProps {
  state: VideoPlayerState;
  qualities: VideoQuality[];
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onPlaybackRateChange: (rate: number) => void;
  onQualityChange: (quality: VideoQuality) => void;
  onToggleFullscreen: () => void;
  onSkip: (seconds: number) => void;
}

const PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export function VideoControls({
  state,
  qualities,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onPlaybackRateChange,
  onQualityChange,
  onToggleFullscreen,
  onSkip,
}: VideoControlsProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    onSeek(percentage * state.duration);
  };

  const progress = getProgressPercentage(state.currentTime, state.duration);
  const bufferedProgress = getProgressPercentage(state.buffered, state.duration);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 transition-opacity duration-300">
      {/* Progress Bar */}
      <div
        ref={progressRef}
        className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-4 group hover:h-2 transition-all"
        onClick={handleProgressClick}
      >
        {/* Buffered Progress */}
        <div
          className="absolute h-full bg-white/30 rounded-full"
          style={{ width: `${bufferedProgress}%` }}
        />
        {/* Current Progress */}
        <div
          className="relative h-full bg-purple-500 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Left Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSkip(-10)}
            className="text-white hover:text-purple-400 transition-colors"
            aria-label="Skip back 10 seconds"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={onTogglePlay}
            className="text-white hover:text-purple-400 transition-colors"
            aria-label={state.isPlaying ? 'Pause' : 'Play'}
          >
            {state.isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={() => onSkip(10)}
            className="text-white hover:text-purple-400 transition-colors"
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          {/* Volume Control */}
          <div
            className="flex items-center gap-2 group"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button
              onClick={onToggleMute}
              className="text-white hover:text-purple-400 transition-colors"
              aria-label={state.muted ? 'Unmute' : 'Mute'}
            >
              {state.muted || state.volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            {showVolumeSlider && (
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={state.muted ? 0 : state.volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                aria-label="Volume"
              />
            )}
          </div>

          {/* Time Display */}
          <span className="text-white text-sm font-medium">
            {formatTime(state.currentTime)} / {formatTime(state.duration)}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 relative">
          {/* Settings Menu */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:text-purple-400 transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            {showSettings && (
              <div className="absolute bottom-full right-0 mb-2 bg-black/95 rounded-lg p-3 min-w-[200px] shadow-xl">
                {/* Playback Speed */}
                <div className="mb-3">
                  <p className="text-white text-xs font-semibold mb-2">Playback Speed</p>
                  <div className="grid grid-cols-4 gap-1">
                    {PLAYBACK_RATES.map((rate) => (
                      <button
                        key={rate}
                        onClick={() => onPlaybackRateChange(rate)}
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                          state.playbackRate === rate
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality Selection */}
                {qualities.length > 0 && (
                  <div>
                    <p className="text-white text-xs font-semibold mb-2">Quality</p>
                    <div className="space-y-1">
                      {qualities.map((quality) => (
                        <button
                          key={quality.label}
                          onClick={() => onQualityChange(quality)}
                          className={`w-full px-3 py-1.5 text-xs text-left rounded transition-colors ${
                            state.quality?.label === quality.label
                              ? 'bg-purple-600 text-white'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          {quality.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={onToggleFullscreen}
            className="text-white hover:text-purple-400 transition-colors"
            aria-label="Toggle fullscreen"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
