"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { VideoControls } from './VideoControls';
import { ChapterMarkers } from './ChapterMarkers';
import { ChapterList } from './ChapterList';
import { TipAtTimestamp } from './TipAtTimestamp';
import { TimestampTips } from './TimestampTips';
import type { Chapter, VideoQuality, TimestampTip } from '@/types/video';
import { Loader2 } from 'lucide-react';

interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
  chapters?: Chapter[];
  qualities?: VideoQuality[];
  creatorUsername: string;
  timestampTips?: TimestampTip[];
  onTipSubmit?: (amount: string, message: string, timestamp: number) => Promise<void>;
  className?: string;
  autoPlay?: boolean;
}

export function CustomVideoPlayer({
  src,
  poster,
  chapters = [],
  qualities = [],
  creatorUsername,
  timestampTips = [],
  onTipSubmit,
  className = '',
  autoPlay = false,
}: CustomVideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);

  const { videoRef, state, actions } = useVideoPlayer({
    chapters,
    qualities,
    onTimeUpdate: (time) => {
      // Could trigger analytics or other side effects
    },
    onChapterChange: (chapter) => {
      console.log('Chapter changed:', chapter?.title);
    },
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsLoading(false);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoRef]);

  const handleTipSubmit = async (amount: string, message: string, timestamp: number) => {
    if (onTipSubmit) {
      await onTipSubmit(amount, message, timestamp);
    }
  };

  const handleTipClick = (timestamp: number) => {
    actions.seek(timestamp);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable)
    ) {
      return;
    }

    switch (e.key) {
      case ' ':
      case 'k':
      case 'K':
        e.preventDefault();
        actions.togglePlay();
        actions.showControlsTemporarily();
        break;
      case 'ArrowLeft':
      case 'j':
      case 'J':
        e.preventDefault();
        actions.seek(Math.max(0, state.currentTime - 5));
        actions.showControlsTemporarily();
        break;
      case 'ArrowRight':
      case 'l':
      case 'L':
        e.preventDefault();
        actions.seek(Math.min(state.duration || Infinity, state.currentTime + 5));
        actions.showControlsTemporarily();
        break;
      case 'ArrowUp':
        e.preventDefault();
        actions.setVolume(Math.min(1, state.volume + 0.1));
        actions.showControlsTemporarily();
        break;
      case 'ArrowDown':
        e.preventDefault();
        actions.setVolume(Math.max(0, state.volume - 0.1));
        actions.showControlsTemporarily();
        break;
      case 'm':
      case 'M':
        e.preventDefault();
        actions.toggleMute();
        actions.showControlsTemporarily();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        actions.toggleFullscreen();
        break;
      default:
        break;
    }
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      {/* Video Player Container */}
      <div className="flex-1 relative">
        <div
          tabIndex={0}
          role="region"
          aria-label="Video Player"
          className="relative w-full bg-black rounded-2xl overflow-hidden aspect-video focus:outline-none focus:ring-2 focus:ring-purple-500"
          onMouseMove={actions.showControlsTemporarily}
          onMouseEnter={actions.showControlsTemporarily}
          onKeyDown={handleKeyDown}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            className="w-full h-full"
            onClick={actions.togglePlay}
          />

          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
          )}

          {/* Chapter Markers */}
          <ChapterMarkers
            chapters={chapters}
            duration={state.duration}
            currentChapter={state.currentChapter}
            onChapterClick={actions.seekToChapter}
          />

          {/* Video Controls */}
          {state.showControls && (
            <VideoControls
              state={state}
              qualities={qualities}
              onTogglePlay={actions.togglePlay}
              onSeek={actions.seek}
              onVolumeChange={actions.setVolume}
              onToggleMute={actions.toggleMute}
              onPlaybackRateChange={actions.setPlaybackRate}
              onQualityChange={actions.setQuality}
              onToggleFullscreen={actions.toggleFullscreen}
              onSkip={(seconds) => actions.seek(state.currentTime + seconds)}
            />
          )}

          {/* Current Chapter Indicator */}
          {state.currentChapter && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg"
            >
              <p className="text-xs font-semibold">{state.currentChapter.title}</p>
            </motion.div>
          )}
        </div>

        {/* Tip at Timestamp Button */}
        {onTipSubmit && (
          <div className="mt-4">
            <TipAtTimestamp
              timestamp={state.currentTime}
              creatorUsername={creatorUsername}
              onTipSubmit={handleTipSubmit}
            />
          </div>
        )}
      </div>

      {/* Sidebar */}
      {showSidebar && (chapters.length > 0 || timestampTips.length > 0) && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 space-y-6"
        >
          {/* Chapters */}
          {chapters.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <ChapterList
                chapters={chapters}
                currentChapter={state.currentChapter}
                currentTime={state.currentTime}
                onChapterClick={actions.seekToChapter}
              />
            </div>
          )}

          {/* Timestamp Tips */}
          {timestampTips.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <TimestampTips
                tips={timestampTips}
                currentTime={state.currentTime}
                onTipClick={handleTipClick}
              />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
