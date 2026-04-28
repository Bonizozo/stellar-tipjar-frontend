# Custom Video Player

A full-featured, custom video player component with chapter navigation, quality selection, playback controls, and integrated tipping functionality.

## Features

### Core Playback
- ✅ Custom HTML5 video player
- ✅ Play/pause controls
- ✅ Seek bar with progress indicator
- ✅ Volume control with mute toggle
- ✅ Fullscreen support
- ✅ Playback speed control (0.25x - 2x)
- ✅ Skip forward/backward (10 seconds)
- ✅ Auto-hide controls on inactivity
- ✅ Buffering indicator

### Chapter Navigation
- ✅ Chapter markers on timeline
- ✅ Chapter list sidebar
- ✅ Click to jump to chapter
- ✅ Current chapter indicator
- ✅ Chapter progress tracking
- ✅ Thumbnail support for chapters

### Quality Selection
- ✅ Multiple quality levels (1080p, 720p, 480p, 360p)
- ✅ Seamless quality switching
- ✅ Maintains playback position on quality change
- ✅ Settings menu for quality selection

### Tip Integration
- ✅ Tip at specific timestamps
- ✅ Timeline tips visualization
- ✅ Click tips to jump to timestamp
- ✅ Tip amount and message display
- ✅ Real-time tip updates

## Usage

### Basic Usage

\`\`\`tsx
import { CustomVideoPlayer } from '@/components/video';

function VideoPage() {
  return (
    <CustomVideoPlayer
      src="https://example.com/video.mp4"
      poster="https://example.com/poster.jpg"
      creatorUsername="creator123"
    />
  );
}
\`\`\`

### With Chapters

\`\`\`tsx
import { CustomVideoPlayer } from '@/components/video';
import type { Chapter } from '@/types/video';

const chapters: Chapter[] = [
  {
    id: '1',
    title: 'Introduction',
    startTime: 0,
    endTime: 30,
    thumbnail: 'https://example.com/thumb1.jpg',
  },
  {
    id: '2',
    title: 'Main Content',
    startTime: 30,
    endTime: 120,
    thumbnail: 'https://example.com/thumb2.jpg',
  },
];

function VideoPage() {
  return (
    <CustomVideoPlayer
      src="https://example.com/video.mp4"
      chapters={chapters}
      creatorUsername="creator123"
    />
  );
}
\`\`\`

### With Quality Selection

\`\`\`tsx
import { CustomVideoPlayer } from '@/components/video';
import type { VideoQuality } from '@/types/video';

const qualities: VideoQuality[] = [
  { label: '1080p', height: 1080, bitrate: 5000000, url: 'video-1080p.mp4' },
  { label: '720p', height: 720, bitrate: 2500000, url: 'video-720p.mp4' },
  { label: '480p', height: 480, bitrate: 1000000, url: 'video-480p.mp4' },
];

function VideoPage() {
  return (
    <CustomVideoPlayer
      src="https://example.com/video-1080p.mp4"
      qualities={qualities}
      creatorUsername="creator123"
    />
  );
}
\`\`\`

### With Tip Integration

\`\`\`tsx
import { CustomVideoPlayer } from '@/components/video';
import type { TimestampTip } from '@/types/video';
import { useState } from 'react';

function VideoPage() {
  const [tips, setTips] = useState<TimestampTip[]>([]);

  const handleTipSubmit = async (
    amount: string,
    message: string,
    timestamp: number
  ) => {
    // Submit tip to API
    const response = await fetch('/api/tips', {
      method: 'POST',
      body: JSON.stringify({ amount, message, timestamp }),
    });

    const newTip = await response.json();
    setTips([...tips, newTip]);
  };

  return (
    <CustomVideoPlayer
      src="https://example.com/video.mp4"
      creatorUsername="creator123"
      timestampTips={tips}
      onTipSubmit={handleTipSubmit}
    />
  );
}
\`\`\`

## Props

### CustomVideoPlayer

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | Yes | Video source URL |
| `poster` | `string` | No | Poster image URL |
| `chapters` | `Chapter[]` | No | Array of chapter objects |
| `qualities` | `VideoQuality[]` | No | Array of quality options |
| `creatorUsername` | `string` | Yes | Creator's username for tips |
| `timestampTips` | `TimestampTip[]` | No | Array of tips at timestamps |
| `onTipSubmit` | `function` | No | Callback for tip submission |
| `className` | `string` | No | Additional CSS classes |
| `autoPlay` | `boolean` | No | Auto-play video on load |

## Types

### Chapter

\`\`\`typescript
interface Chapter {
  id: string;
  title: string;
  startTime: number;  // in seconds
  endTime: number;    // in seconds
  thumbnail?: string;
}
\`\`\`

### VideoQuality

\`\`\`typescript
interface VideoQuality {
  label: string;      // e.g., "1080p"
  height: number;     // pixel height
  bitrate?: number;   // bits per second
  url?: string;       // quality-specific URL
}
\`\`\`

### TimestampTip

\`\`\`typescript
interface TimestampTip {
  id: string;
  timestamp: number;  // in seconds
  amount: string;     // XLM amount
  message?: string;
  username: string;
  createdAt: string;
}
\`\`\`

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `←` | Skip back 10 seconds |
| `→` | Skip forward 10 seconds |
| `↑` | Increase volume |
| `↓` | Decrease volume |
| `M` | Toggle mute |
| `F` | Toggle fullscreen |

## Hooks

### useVideoPlayer

Custom hook for managing video player state and actions.

\`\`\`typescript
const { videoRef, state, actions } = useVideoPlayer({
  chapters,
  qualities,
  onTimeUpdate: (time) => console.log('Current time:', time),
  onChapterChange: (chapter) => console.log('Chapter:', chapter),
});
\`\`\`

## Utilities

### formatTime

Format seconds to human-readable time string.

\`\`\`typescript
formatTime(90);  // "1:30"
formatTime(3661);  // "1:01:01"
\`\`\`

### parseTimeToSeconds

Parse time string to seconds.

\`\`\`typescript
parseTimeToSeconds('1:30');  // 90
parseTimeToSeconds('1:01:01');  // 3661
\`\`\`

## Styling

The video player uses Tailwind CSS and follows the design system. All components are fully responsive and support dark mode.

### Custom Styling

You can customize the player appearance by passing a `className` prop:

\`\`\`tsx
<CustomVideoPlayer
  src="video.mp4"
  creatorUsername="creator"
  className="max-w-4xl mx-auto"
/>
\`\`\`

## Accessibility

- All controls have proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- High contrast support

## Performance

- Lazy loading of video content
- Efficient chapter tracking
- Optimized re-renders with React hooks
- Debounced control hiding
- Buffering progress indication

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Demo

Visit `/demo/video-player` to see the video player in action with all features enabled.

## Testing

Run tests with:

\`\`\`bash
npm test src/__tests__/components/video
npm test src/__tests__/hooks/useVideoPlayer
npm test src/__tests__/utils/videoHelpers
\`\`\`

## Future Enhancements

- [ ] Picture-in-picture mode
- [ ] Playlist support
- [ ] Subtitle/caption support
- [ ] Video analytics tracking
- [ ] Thumbnail preview on hover
- [ ] Gesture controls for mobile
- [ ] Live streaming support
- [ ] DVR controls for live streams
