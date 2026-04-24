"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { CameraIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";

interface AvatarUploadProps {
  currentSrc?: string;
  name: string;
  onUpload: (file: File) => Promise<string>;
  onRemove?: () => void;
}

const MAX_SIZE_MB = 5;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function AvatarUpload({ currentSrc, name, onUpload, onRemove }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(currentSrc);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    if (!ACCEPTED.includes(file.type)) {
      setError("Only JPEG, PNG, WebP, or GIF images are allowed.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be under ${MAX_SIZE_MB}MB.`);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUploading(true);
    try {
      const uploaded = await onUpload(file);
      setPreview(uploaded);
    } catch {
      setError("Upload failed. Please try again.");
      setPreview(currentSrc);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview(undefined);
    onRemove?.();
  };

  return (
    <div className="flex items-center gap-6">
      <div
        className="relative cursor-pointer group"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        role="button"
        aria-label="Upload avatar"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        <Avatar src={preview} name={name} size="2xl" />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center rounded-full bg-ink/50"
        >
          {uploading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
            {uploading ? "Uploading…" : "Change photo"}
          </Button>
          {preview && (
            <Button size="sm" variant="ghost" onClick={handleRemove} disabled={uploading}>
              <TrashIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-xs text-ink/50">JPEG, PNG, WebP or GIF · max {MAX_SIZE_MB}MB</p>
        {error && <p className="text-xs text-rose-500">{error}</p>}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={handleChange}
        aria-hidden="true"
      />
    </div>
  );
}
