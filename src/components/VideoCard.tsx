"use client";

import { formatDuration } from "@/utils/videoProviders";
import type { UploadedVideo } from "@/components/VideoUpload";

interface VideoCardProps {
  video: UploadedVideo;
  onClick: (video: UploadedVideo) => void;
  onDelete?: (id: string) => void;
}

export function VideoCard({ video, onClick, onDelete }: VideoCardProps) {
  return (
    <div className="group relative rounded-2xl border border-ink/10 bg-[color:var(--surface)] overflow-hidden hover:border-wave/40 transition-colors">
      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => onClick(video)}
        className="relative block w-full aspect-video bg-ink/10 overflow-hidden"
        aria-label={`Play ${video.title}`}
      >
        {video.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={video.thumbnail} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg className="h-10 w-10 text-ink/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            <svg className="h-5 w-5 text-ink ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7L8 5z"/>
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        {video.duration > 0 && (
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-medium text-white tabular-nums">
            {formatDuration(video.duration)}
          </span>
        )}
      </button>

      {/* Info */}
      <div className="flex items-start justify-between gap-2 p-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{video.title}</p>
          <p className="text-xs text-ink/40">{(video.file.size / 1024 / 1024).toFixed(1)} MB</p>
        </div>
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(video.id)}
            className="shrink-0 rounded-lg p-1 text-ink/30 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950 transition-colors"
            aria-label={`Delete ${video.title}`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
