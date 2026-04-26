"use client";

import { useState } from "react";
import { VideoUpload, type UploadedVideo } from "@/components/VideoUpload";
import { VideoCard } from "@/components/VideoCard";
import { NativeVideoPlayer } from "@/components/NativeVideoPlayer";

export default function VideosPage() {
  const [videos, setVideos] = useState<UploadedVideo[]>([]);
  const [playing, setPlaying] = useState<UploadedVideo | null>(null);

  const handleUploaded = (video: UploadedVideo) => {
    setVideos((prev) => [video, ...prev]);
  };

  const handleDelete = (id: string) => {
    setVideos((prev) => {
      const v = prev.find((v) => v.id === id);
      if (v) URL.revokeObjectURL(v.objectUrl);
      return prev.filter((v) => v.id !== id);
    });
    if (playing?.id === id) setPlaying(null);
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ink">Video Library</h1>
        <p className="mt-1 text-sm text-ink/60">Upload and manage your creator videos. Supports MP4, WebM, MOV, AVI, MKV, and HLS streams.</p>
      </div>

      {/* Player */}
      {playing && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-ink">{playing.title}</h2>
            <button
              type="button"
              onClick={() => setPlaying(null)}
              className="text-sm text-ink/50 hover:text-ink transition-colors"
            >
              Close ✕
            </button>
          </div>
          <NativeVideoPlayer
            source={{ provider: "local", id: playing.objectUrl, poster: playing.thumbnail, title: playing.title }}
            autoPlay
          />
        </div>
      )}

      {/* Upload */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-ink">Upload Video</h2>
        <VideoUpload onUploaded={handleUploaded} />
      </div>

      {/* Grid */}
      {videos.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Your Videos</h2>
            <span className="text-sm text-ink/40">{videos.length} video{videos.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={setPlaying}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {videos.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/10 py-16 text-center">
          <svg className="h-12 w-12 text-ink/20 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-ink/40">No videos yet. Upload one above to get started.</p>
        </div>
      )}
    </section>
  );
}
