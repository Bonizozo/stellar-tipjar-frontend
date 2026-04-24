"use client";

import { useState, useCallback } from 'react';
import { parseVideoUrl, type VideoSource } from '@/utils/videoProviders';

interface UseVideoStreamReturn {
  source: VideoSource | null;
  error: string | null;
  setUrl: (url: string) => void;
  clear: () => void;
}

export function useVideoStream(initialUrl?: string): UseVideoStreamReturn {
  const parse = useCallback((url: string) => {
    if (!url) return { source: null, error: null };
    const source = parseVideoUrl(url);
    if (!source) return { source: null, error: 'Unsupported URL. Use YouTube, Twitch, or Vimeo.' };
    return { source, error: null };
  }, []);

  const initial = initialUrl ? parse(initialUrl) : { source: null, error: null };
  const [source, setSource] = useState<VideoSource | null>(initial.source);
  const [error, setError] = useState<string | null>(initial.error);

  const setUrl = useCallback(
    (url: string) => {
      const result = parse(url);
      setSource(result.source);
      setError(result.error);
    },
    [parse]
  );

  const clear = useCallback(() => {
    setSource(null);
    setError(null);
  }, []);

  return { source, error, setUrl, clear };
}
