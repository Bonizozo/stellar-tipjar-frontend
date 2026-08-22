"use client";

import { useEffect, useRef, useState } from "react";
import type { VideoSource } from "@/utils/videoProviders";
import { formatDuration } from "@/utils/videoProviders";

interface NativeVideoPlayerProps {
  source: VideoSource;
  className?: string;
  autoPlay?: boolean;
}

export function NativeVideoPlayer({ source, className = "", autoPlay = false }: NativeVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hlsLoaded, setHlsLoaded] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load HLS.js dynamically for .m3u8 streams
  useEffect(() => {
    if (source.provider !== "hls") return;
    const video = videoRef.current;
    if (!video) return;

    // Native HLS support (Safari)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source.hlsUrl ?? source.id;
      setHlsLoaded(true);
      return;
    }

    // Dynamic import of hls.js
    import("hls.js").then(({ default: Hls }) => {
      if (!Hls.isSupported()) return;
      const hls = new Hls();
      hls.loadSource(source.hlsUrl ?? source.id);
      hls.attachMedia(video);
      setHlsLoaded(true);
      return () => hls.destroy();
    }).catch(() => {
      // hls.js not available — fall back to native src
      video.src = source.id;
      setHlsLoaded(true);
    });
  }, [source]);

  // For local/direct sources
  useEffect(() => {
    if (source.provider === "local") {
      const video = videoRef.current;
      if (video) video.src = source.id;
    }
  }, [source]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); } else { v.pause(); }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v) setCurrentTime(v.currentTime);
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (v) setDuration(v.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Number(e.target.value);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    const val = Number(e.target.value);
    if (v) { v.volume = val; v.muted = val === 0; }
    setVolume(val);
    setMuted(val === 0);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else v.requestFullscreen?.();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-black aspect-video ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Poster */}
      {source.poster && !isPlaying && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={source.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}

      <video
        ref={videoRef}
        className="h-full w-full"
        autoPlay={autoPlay}
        playsInline
        poster={source.poster}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        aria-label={source.title ?? "Video player"}
      />

      {/* Controls overlay */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 transition-opacity duration-200 ${showControls || !isPlaying ? "opacity-100" : "opacity-0"}`}
        aria-label="Video controls"
      >
        {/* Seek bar */}
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 accent-wave cursor-pointer mb-2"
          aria-label="Seek"
        />

        <div className="flex items-center gap-3">
          {/* Play/pause */}
          <button type="button" onClick={togglePlay} className="text-white hover:text-wave transition-colors" aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5z"/></svg>
            )}
          </button>

          {/* Time */}
          <span className="text-xs text-white/80 tabular-nums">
            {formatDuration(currentTime)} / {formatDuration(duration)}
          </span>

          <div className="ml-auto flex items-center gap-3">
            {/* Volume */}
            <button type="button" onClick={toggleMute} className="text-white hover:text-wave transition-colors" aria-label={muted ? "Unmute" : "Mute"}>
              {muted || volume === 0 ? (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 18l2 2L21 18.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
              ) : (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 accent-wave cursor-pointer"
              aria-label="Volume"
            />

            {/* Fullscreen */}
            <button type="button" onClick={toggleFullscreen} className="text-white hover:text-wave transition-colors" aria-label="Fullscreen">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* HLS loading indicator */}
      {source.provider === "hls" && !hlsLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-wave/20 border-t-wave" />
        </div>
      )}
    </div>
  );
}
