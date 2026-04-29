import { useState, useRef, useEffect, useCallback } from 'react';
import type { VideoPlayerState, Chapter, VideoQuality } from '@/types/video';

interface UseVideoPlayerOptions {
  chapters?: Chapter[];
  qualities?: VideoQuality[];
  onTimeUpdate?: (time: number) => void;
  onChapterChange?: (chapter: Chapter | null) => void;
}

export function useVideoPlayer(options: UseVideoPlayerOptions = {}) {
  const { chapters = [], qualities = [], onTimeUpdate, onChapterChange } = options;
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [state, setState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    muted: false,
    playbackRate: 1,
    quality: qualities[0] || null,
    currentChapter: null,
    showControls: true,
    isFullscreen: false,
    buffered: 0,
  });

  const updateCurrentChapter = useCallback((time: number) => {
    const chapter = chapters.find(ch => time >= ch.startTime && time < ch.endTime);
    if (chapter?.id !== state.currentChapter?.id) {
      setState(prev => ({ ...prev, currentChapter: chapter || null }));
      onChapterChange?.(chapter || null);
    }
  }, [chapters, state.currentChapter, onChapterChange]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setState(prev => ({ ...prev, isPlaying: true }));
    } else {
      video.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const seek = useCallback((time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    setState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const seekToChapter = useCallback((chapter: Chapter) => {
    seek(chapter.startTime);
  }, [seek]);

  const setVolume = useCallback((volume: number) => {
    const video = videoRef.current;
    if (!video) return;
    const clampedVolume = Math.max(0, Math.min(1, volume));
    video.volume = clampedVolume;
    setState(prev => ({ ...prev, volume: clampedVolume, muted: clampedVolume === 0 }));
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setState(prev => ({ ...prev, muted: !prev.muted }));
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = rate;
    setState(prev => ({ ...prev, playbackRate: rate }));
  }, []);

  const setQuality = useCallback((quality: VideoQuality) => {
    const video = videoRef.current;
    if (!video || !quality.url) return;
    
    const currentTime = video.currentTime;
    const wasPlaying = !video.paused;
    
    video.src = quality.url;
    video.currentTime = currentTime;
    
    if (wasPlaying) {
      video.play();
    }
    
    setState(prev => ({ ...prev, quality }));
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (!document.fullscreenElement) {
        await video.requestFullscreen();
        setState(prev => ({ ...prev, isFullscreen: true }));
      } else {
        await document.exitFullscreen();
        setState(prev => ({ ...prev, isFullscreen: false }));
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  }, []);

  const showControlsTemporarily = useCallback(() => {
    setState(prev => ({ ...prev, showControls: true }));
    
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current);
    }
    
    hideControlsTimer.current = setTimeout(() => {
      if (state.isPlaying) {
        setState(prev => ({ ...prev, showControls: false }));
      }
    }, 3000);
  }, [state.isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      setState(prev => ({ ...prev, currentTime }));
      updateCurrentChapter(currentTime);
      onTimeUpdate?.(currentTime);
    };

    const handleLoadedMetadata = () => {
      setState(prev => ({ ...prev, duration: video.duration }));
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const buffered = video.buffered.end(video.buffered.length - 1);
        setState(prev => ({ ...prev, buffered }));
      }
    };

    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('ended', handleEnded);
    };
  }, [updateCurrentChapter, onTimeUpdate]);

  useEffect(() => {
    return () => {
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current);
      }
    };
  }, []);

  return {
    videoRef,
    state,
    actions: {
      togglePlay,
      seek,
      seekToChapter,
      setVolume,
      toggleMute,
      setPlaybackRate,
      setQuality,
      toggleFullscreen,
      showControlsTemporarily,
    },
  };
}
