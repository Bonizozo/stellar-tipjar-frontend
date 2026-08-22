"use client";

import { useCallback, useRef, useState } from "react";
import { ProgressBar } from "@/components/Progress/ProgressBar";
import { SUPPORTED_VIDEO_FORMATS, SUPPORTED_VIDEO_EXTENSIONS, extractVideoThumbnail, formatDuration } from "@/utils/videoProviders";

export interface UploadedVideo {
  id: string;
  file: File;
  title: string;
  thumbnail: string;
  duration: number;
  objectUrl: string;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
}

interface VideoUploadProps {
  onUploaded: (video: UploadedVideo) => void;
  maxSizeMB?: number;
}

let _id = 0;
const uid = () => `v-${Date.now()}-${++_id}`;

export function VideoUpload({ onUploaded, maxSizeMB = 500 }: VideoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState<UploadedVideo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    setError(null);

    if (!SUPPORTED_VIDEO_FORMATS.includes(file.type)) {
      setError(`Unsupported format. Accepted: ${SUPPORTED_VIDEO_EXTENSIONS.join(", ")}`);
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File must be under ${maxSizeMB}MB`);
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    // Get duration
    const duration = await new Promise<number>((resolve) => {
      const v = document.createElement("video");
      v.src = objectUrl;
      v.preload = "metadata";
      v.onloadedmetadata = () => resolve(v.duration);
      v.onerror = () => resolve(0);
    });

    // Extract thumbnail
    let thumbnail = "";
    try {
      thumbnail = await extractVideoThumbnail(file, Math.min(1, duration * 0.1));
    } catch {
      thumbnail = "";
    }

    const video: UploadedVideo = {
      id: uid(),
      file,
      title: file.name.replace(/\.[^.]+$/, ""),
      thumbnail,
      duration,
      objectUrl,
      progress: 0,
      status: "uploading",
    };

    setUploading(video);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 20, 100);
      setUploading((prev) => prev ? { ...prev, progress } : prev);
      if (progress >= 100) {
        clearInterval(interval);
        const done = { ...video, progress: 100, status: "done" as const };
        setUploading(null);
        onUploaded(done);
      }
    }, 300);
  }, [maxSizeMB, onUploaded]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        aria-label="Drop video here or click to upload"
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 transition-all ${isDragging ? "border-wave bg-wave/10 scale-[1.01]" : "border-ink/20 hover:border-wave/50 hover:bg-ink/[0.02]"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={SUPPORTED_VIDEO_FORMATS.join(",")}
          onChange={handleChange}
          className="hidden"
          aria-hidden="true"
        />
        <svg className="h-12 w-12 text-wave/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <div className="text-center">
          <p className="font-medium text-ink">{isDragging ? "Drop video here" : "Drag & drop a video"}</p>
          <p className="mt-1 text-xs text-ink/50">or click to browse · MP4, WebM, MOV, AVI, MKV · up to {maxSizeMB}MB</p>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {uploading && (
        <div className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4">
          {uploading.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={uploading.thumbnail} alt="" className="h-14 w-24 rounded-lg object-cover shrink-0" />
          ) : (
            <div className="h-14 w-24 rounded-lg bg-ink/10 shrink-0 animate-pulse" />
          )}
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-ink">{uploading.title}</p>
            <p className="text-xs text-ink/50">{formatDuration(uploading.duration)} · {(uploading.file.size / 1024 / 1024).toFixed(1)} MB</p>
            <div className="mt-2">
              <ProgressBar progress={uploading.progress} max={100} size="sm" color="wave" showPercentage />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
