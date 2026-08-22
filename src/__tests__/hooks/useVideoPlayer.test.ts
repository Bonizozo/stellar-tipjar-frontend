import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import type { Chapter } from '@/types/video';

describe('useVideoPlayer', () => {
  beforeEach(() => {
    // Mock HTMLVideoElement
    global.HTMLVideoElement.prototype.play = vi.fn(() => Promise.resolve());
    global.HTMLVideoElement.prototype.pause = vi.fn();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useVideoPlayer());

    expect(result.current.state.isPlaying).toBe(false);
    expect(result.current.state.currentTime).toBe(0);
    expect(result.current.state.volume).toBe(1);
    expect(result.current.state.muted).toBe(false);
  });

  it('provides video control actions', () => {
    const { result } = renderHook(() => useVideoPlayer());

    expect(result.current.actions.togglePlay).toBeDefined();
    expect(result.current.actions.seek).toBeDefined();
    expect(result.current.actions.setVolume).toBeDefined();
    expect(result.current.actions.toggleMute).toBeDefined();
  });

  it('updates current chapter based on time', () => {
    const chapters: Chapter[] = [
      { id: '1', title: 'Chapter 1', startTime: 0, endTime: 30 },
      { id: '2', title: 'Chapter 2', startTime: 30, endTime: 60 },
    ];

    const onChapterChange = vi.fn();
    const { result } = renderHook(() =>
      useVideoPlayer({ chapters, onChapterChange })
    );

    // Initially no chapter
    expect(result.current.state.currentChapter).toBeNull();
  });

  it('clamps volume between 0 and 1', () => {
    const { result } = renderHook(() => useVideoPlayer());

    act(() => {
      result.current.actions.setVolume(1.5);
    });

    expect(result.current.state.volume).toBe(1);

    act(() => {
      result.current.actions.setVolume(-0.5);
    });

    expect(result.current.state.volume).toBe(0);
  });
});
