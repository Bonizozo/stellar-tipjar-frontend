"use client";

import { VideoPlayer } from '@/components/VideoPlayer';
import { type VideoSource } from '@/utils/videoProviders';

interface LiveStreamEmbedProps {
  source: VideoSource;
  channelName?: string;
}

export function LiveStreamEmbed({ source, channelName }: LiveStreamEmbedProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span
          className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"
          aria-hidden="true"
        />
        <span className="text-sm font-semibold text-red-500 uppercase tracking-wide">Live</span>
        {channelName && (
          <span className="text-sm text-ink/60">· {channelName}</span>
        )}
      </div>
      <VideoPlayer source={source} title={`${channelName ?? 'Creator'} live stream`} />
    </div>
  );
}
