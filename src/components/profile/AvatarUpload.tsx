"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CameraIcon, TrashIcon, Loader2 } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";

interface AvatarUploadProps {
  currentSrc?: string;
  name: string;
  onUpload: (file: File) => Promise<string>;
  onRemove?: () => void;
}

const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function AvatarUpload({ currentSrc, name, onUpload, onRemove }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(currentSrc);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Only JPEG, PNG, WebP, or GIF images are allowed.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be under ${MAX_SIZE_MB}MB.`);
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
      const uploaded = await onUpload(file);
      clearInterval(interval);
      setProgress(100);
      setPreview(uploaded);
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <div 
          className="relative cursor-pointer group" 
          onClick={() => !uploading && inputRef.current?.click()}
        >
          <Avatar src={preview} name={name} size="2xl" />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center rounded-full bg-ink/50"
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-1">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
                <span className="text-xs text-white">{Math.round(progress)}%</span>
              </div>
            ) : (
              <CameraIcon className="h-6 w-6 text-white" />
            )}
          </motion.div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? `Uploading ${progress}%...` : "Change photo"}
            </Button>
            {preview && (
              <Button size="sm" variant="ghost" onClick={handleRemove} disabled={uploading}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-xs text-ink/50">JPEG, PNG, WebP or GIF • max {MAX_SIZE_MB}MB</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileChange(file);
          }
          e.target.value = "";
        }}
        aria-hidden="true"
      />

      {error && <p className="text-sm text-rose-500">{error}</p>}
    </div>
  );
}