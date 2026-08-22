"use client";

import { useState, useCallback } from "react";
import { CameraIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

interface BannerUploadProps {
  currentSrc?: string;
  onUpload: (file: File) => Promise<string>;
  onRemove?: () => void;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 10;
const ASPECT_RATIO = 3 / 1;

export function BannerUpload({ currentSrc, onUpload, onRemove }: BannerUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(currentSrc);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("File type not supported");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File must be under ${MAX_SIZE_MB}MB`);
      return;
    }

    setError(null);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 20, 90));
    }, 200);

    try {
      const uploadedUrl = await onUpload(file);
      clearInterval(interval);
      setProgress(100);
      setPreview(uploadedUrl);
    } catch {
      clearInterval(interval);
      setError("Upload failed. Please try again.");
      setPreview(currentSrc);
    } finally {
      setUploading(false);
    }
  }, [onUpload, currentSrc]);

  const handleRemove = useCallback(() => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(undefined);
    setError(null);
    onRemove?.();
  }, [preview, onRemove]);

  return (
    <div className="space-y-4">
      <div
        className="relative w-full overflow-hidden rounded-xl bg-ink/5"
        style={{ aspectRatio: `${ASPECT_RATIO}`, maxHeight: "200px" }}
      >
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Banner preview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="flex gap-2">
                <label
                  htmlFor="banner-upload"
                  className="cursor-pointer rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium text-ink shadow-sm hover:bg-white disabled:opacity-50"
                >
                  <span className="flex items-center gap-1.5">
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {Math.round(progress)}%
                      </>
                    ) : (
                      <>
                        <CameraIcon className="h-4 w-4" />
                        Change
                      </>
                    )}
                  </span>
                </label>
                <button
                  onClick={handleRemove}
                  disabled={uploading}
                  className="rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium text-ink shadow-sm hover:bg-white disabled:opacity-50"
                >
                  <span className="flex items-center gap-1.5">
                    <TrashIcon className="h-4 w-4" />
                    Remove
                  </span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <label
            htmlFor="banner-upload"
            className="flex h-full cursor-pointer flex-col items-center justify-center p-6 hover:bg-ink/[0.02]"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-wave/10">
              <CameraIcon className="h-6 w-6 text-wave" />
            </div>
            <p className="text-sm font-medium text-ink">Upload a banner image</p>
            <p className="mt-1 text-xs text-ink/50">Recommended: 1500x500px (3:1 ratio)</p>
          </label>
        )}
        
        <input
          id="banner-upload"
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileChange(file);
            }
            e.target.value = "";
          }}
        />
      </div>

      {uploading && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full bg-wave transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && <p className="text-sm text-rose-500">{error}</p>}

      <p className="text-xs text-ink/50">
        Accepted: JPEG, PNG, WebP, GIF • max {MAX_SIZE_MB}MB • Recommended 1500x500px
      </p>
    </div>
  );
}