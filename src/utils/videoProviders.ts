export type VideoProvider = 'youtube' | 'twitch' | 'vimeo' | 'local' | 'hls';

export interface VideoSource {
  provider: VideoProvider;
  /** Raw URL or video/channel ID */
  id: string;
  /** HLS manifest URL (.m3u8) for adaptive streaming */
  hlsUrl?: string;
  /** Poster/thumbnail URL */
  poster?: string;
  /** Display title */
  title?: string;
}

/** Quality level for adaptive streaming */
export interface QualityLevel {
  label: string;
  height: number;
  bitrate?: number;
}

export const SUPPORTED_VIDEO_FORMATS = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
];

export const SUPPORTED_VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.m3u8'];

export function getEmbedUrl(source: VideoSource): string {
  switch (source.provider) {
    case 'youtube':
      return `https://www.youtube.com/embed/${source.id}?rel=0&modestbranding=1`;
    case 'twitch':
      return `https://player.twitch.tv/?channel=${source.id}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${source.id}?dnt=1`;
    case 'local':
    case 'hls':
      return source.id; // direct URL
  }
}

/** Whether this source should use the native HTML5 player */
export function isNativeSource(source: VideoSource): boolean {
  return source.provider === 'local' || source.provider === 'hls';
}

/** Extract provider + id from a raw URL */
export function parseVideoUrl(url: string): VideoSource | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
      const id = u.searchParams.get('v') ?? u.pathname.split('/').pop() ?? '';
      return { provider: 'youtube', id };
    }
    if (u.hostname.includes('twitch.tv')) {
      const id = u.pathname.split('/').filter(Boolean)[0] ?? '';
      return { provider: 'twitch', id };
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0] ?? '';
      return { provider: 'vimeo', id };
    }
    // HLS manifest
    if (u.pathname.endsWith('.m3u8')) {
      return { provider: 'hls', id: url, hlsUrl: url };
    }
    // Direct video file
    const ext = u.pathname.split('.').pop()?.toLowerCase() ?? '';
    if (['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'].includes(ext)) {
      return { provider: 'local', id: url };
    }
  } catch {
    // invalid URL — treat as local blob/object URL
    if (url.startsWith('blob:') || url.startsWith('data:')) {
      return { provider: 'local', id: url };
    }
  }
  return null;
}

/** Extract a thumbnail from a local video File at a given time (seconds) */
export async function extractVideoThumbnail(file: File, atSeconds = 1): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const url = URL.createObjectURL(file);
    video.src = url;
    video.muted = true;
    video.preload = 'metadata';
    video.currentTime = atSeconds;

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 360;
      canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    }, { once: true });

    video.addEventListener('error', () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to extract thumbnail'));
    }, { once: true });
  });
}

/** Format seconds as mm:ss or hh:mm:ss */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}
