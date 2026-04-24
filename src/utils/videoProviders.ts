export type VideoProvider = 'youtube' | 'twitch' | 'vimeo';

export interface VideoSource {
  provider: VideoProvider;
  /** Raw URL or video/channel ID */
  id: string;
}

export function getEmbedUrl(source: VideoSource): string {
  switch (source.provider) {
    case 'youtube':
      return `https://www.youtube.com/embed/${source.id}?rel=0&modestbranding=1`;
    case 'twitch':
      return `https://player.twitch.tv/?channel=${source.id}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${source.id}?dnt=1`;
  }
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
  } catch {
    // invalid URL
  }
  return null;
}
