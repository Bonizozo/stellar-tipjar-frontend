// ── Audio waveform types ───────────────────────────────────────────────────

export interface WaveformRegion {
  id: string;
  start: number; // seconds
  end: number;   // seconds
  label?: string;
  color?: string;
}

export interface WaveformStyle {
  waveColor: string;
  progressColor: string;
  backgroundColor: string;
  regionColor: string;
  cursorColor: string;
  barWidth: number;
  barGap: number;
  barRadius: number;
  height: number;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  playbackRate: number;
  zoom: number;
  isLoading: boolean;
  isDecoding: boolean;
  error: string | null;
}

export interface UseAudioWaveformOptions {
  url: string;
  /** Number of waveform bars to render */
  peaks?: number;
  style?: Partial<WaveformStyle>;
  onReady?: (duration: number) => void;
  onTimeUpdate?: (time: number) => void;
  onRegionCreate?: (region: WaveformRegion) => void;
  onRegionClick?: (region: WaveformRegion) => void;
}
