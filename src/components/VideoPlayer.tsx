"use client";

import { useState } from 'react';
import { getEmbedUrl, type VideoSource } from '@/utils/videoProviders';

interface VideoPlayerProps {
  source: VideoSource;
  title?: string;
  className?: string;
}

export function VideoPlayer({ source, title = 'Video player', className = '' }: VideoPlayerProps) {
  const [loaded, setLoaded] = useState(false);
  const embedUrl = getEmbedUrl(source);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-black aspect-video ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink/10 animate-pulse">
          <span className="sr-only">Loading video…</span>
        </div>
      )}
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
