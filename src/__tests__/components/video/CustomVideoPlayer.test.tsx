import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomVideoPlayer } from '@/components/video/CustomVideoPlayer';
import type { Chapter, VideoQuality } from '@/types/video';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockChapters: Chapter[] = [
  { id: '1', title: 'Intro', startTime: 0, endTime: 30 },
  { id: '2', title: 'Main', startTime: 30, endTime: 60 },
];

const mockQualities: VideoQuality[] = [
  { label: '1080p', height: 1080 },
  { label: '720p', height: 720 },
];

describe('CustomVideoPlayer', () => {
  it('renders video element with correct src', () => {
    const { container } = render(
      <CustomVideoPlayer
        src="test-video.mp4"
        creatorUsername="testuser"
      />
    );

    const video = container.querySelector('video') as HTMLVideoElement;
    expect(video).toBeInTheDocument();
    expect(video.tagName).toBe('VIDEO');
  });

  it('displays chapters in sidebar', () => {
    render(
      <CustomVideoPlayer
        src="test-video.mp4"
        chapters={mockChapters}
        creatorUsername="testuser"
      />
    );

    expect(screen.getByText('Intro')).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
  });

  it('shows tip button when onTipSubmit is provided', () => {
    const mockTipSubmit = vi.fn();
    
    render(
      <CustomVideoPlayer
        src="test-video.mp4"
        creatorUsername="testuser"
        onTipSubmit={mockTipSubmit}
      />
    );

    expect(screen.getByText(/Tip at/)).toBeInTheDocument();
  });

  it('displays quality options when provided', () => {
    render(
      <CustomVideoPlayer
        src="test-video.mp4"
        qualities={mockQualities}
        creatorUsername="testuser"
      />
    );

    // Quality options are in settings menu
    const settingsButton = screen.getByLabelText('Settings');
    fireEvent.click(settingsButton);

    expect(screen.getByText('1080p')).toBeInTheDocument();
    expect(screen.getByText('720p')).toBeInTheDocument();
  });

  it('handles keyboard navigation and shortcuts on player container', () => {
    render(
      <CustomVideoPlayer
        src="test-video.mp4"
        creatorUsername="testuser"
      />
    );

    const playerRegion = screen.getByRole('region', { name: /video player/i });
    expect(playerRegion).toBeInTheDocument();
    expect(playerRegion).toHaveAttribute('tabindex', '0');

    // Test Play / Pause with Space
    fireEvent.keyDown(playerRegion, { key: ' ' });
    // Test Seek with Left/Right Arrow
    fireEvent.keyDown(playerRegion, { key: 'ArrowRight' });
    fireEvent.keyDown(playerRegion, { key: 'ArrowLeft' });
    // Test Volume with Up/Down Arrow
    fireEvent.keyDown(playerRegion, { key: 'ArrowUp' });
    fireEvent.keyDown(playerRegion, { key: 'ArrowDown' });
    // Test Mute with M
    fireEvent.keyDown(playerRegion, { key: 'm' });
  });

  it('provides accessible seek slider with keyboard controls', () => {
    render(
      <CustomVideoPlayer
        src="test-video.mp4"
        creatorUsername="testuser"
      />
    );

    const seekSlider = screen.getByRole('slider', { name: /seek slider/i });
    expect(seekSlider).toBeInTheDocument();
    expect(seekSlider).toHaveAttribute('tabindex', '0');

    fireEvent.keyDown(seekSlider, { key: 'ArrowRight' });
    fireEvent.keyDown(seekSlider, { key: 'ArrowLeft' });
    fireEvent.keyDown(seekSlider, { key: 'Home' });
  });
});
