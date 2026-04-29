# Video Player Components

Custom video player implementation with advanced features for the Stellar Tip Jar platform.

## Components

### CustomVideoPlayer
Main video player component that orchestrates all features.

**Location:** `src/components/video/CustomVideoPlayer.tsx`

### VideoControls
Playback controls including play/pause, seek, volume, quality, and fullscreen.

**Location:** `src/components/video/VideoControls.tsx`

### ChapterMarkers
Visual markers on the timeline for chapter navigation.

**Location:** `src/components/video/ChapterMarkers.tsx`

### ChapterList
Sidebar list of chapters with thumbnails and progress tracking.

**Location:** `src/components/video/ChapterList.tsx`

### TipAtTimestamp
Modal for submitting tips at specific video timestamps.

**Location:** `src/components/video/TipAtTimestamp.tsx`

### TimestampTips
Display of tips received at various timestamps.

**Location:** `src/components/video/TimestampTips.tsx`

## Hooks

### useVideoPlayer
Custom hook for managing video player state and actions.

**Location:** `src/hooks/useVideoPlayer.ts`

**Features:**
- Play/pause control
- Seek functionality
- Volume management
- Playback rate control
- Quality switching
- Fullscreen support
- Chapter tracking
- Auto-hide controls

## Types

All TypeScript types are defined in `src/types/video.ts`:

- `Chapter` - Video chapter definition
- `VideoQuality` - Quality level configuration
- `TimestampTip` - Tip at specific timestamp
- `VideoPlayerState` - Player state interface

## Utilities

Helper functions in `src/utils/videoHelpers.ts`:

- `formatTime(seconds)` - Format seconds to time string
- `parseTimeToSeconds(timeString)` - Parse time string to seconds
- `getProgressPercentage(current, total)` - Calculate progress percentage
- `calculateSeekTime(clickX, width, duration)` - Calculate seek position from click

## Quick Start

\`\`\`tsx
import { CustomVideoPlayer } from '@/components/video';

<CustomVideoPlayer
  src="video.mp4"
  creatorUsername="creator"
  chapters={chapters}
  qualities={qualities}
  onTipSubmit={handleTip}
/>
\`\`\`

## Documentation

See [docs/VIDEO_PLAYER.md](../../../docs/VIDEO_PLAYER.md) for complete documentation.

## Demo

Visit `/demo/video-player` to see all features in action.

## Tests

\`\`\`bash
npm test src/__tests__/components/video
npm test src/__tests__/hooks/useVideoPlayer
npm test src/__tests__/utils/videoHelpers
\`\`\`

## Storybook

\`\`\`bash
npm run storybook
\`\`\`

Navigate to "Components/Video/CustomVideoPlayer" to see all variants.
