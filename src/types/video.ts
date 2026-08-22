export interface Chapter {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  thumbnail?: string;
}

export interface VideoQuality {
  label: string;
  height: number;
  bitrate?: number;
  url?: string;
}

export interface TimestampTip {
  id: string;
  timestamp: number;
  amount: string;
  message?: string;
  username: string;
  createdAt: string;
}

export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  playbackRate: number;
  quality: VideoQuality | null;
  currentChapter: Chapter | null;
  showControls: boolean;
  isFullscreen: boolean;
  buffered: number;
}
