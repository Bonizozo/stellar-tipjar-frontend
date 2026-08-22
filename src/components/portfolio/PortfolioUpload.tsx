"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, Film, Loader2 } from "lucide-react";
import type { PortfolioItem } from "@/services/api";

interface FilePreview {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}

interface PortfolioUploadProps {
  onAdd: (item: Omit<PortfolioItem, "id">) => void;
  isPending: boolean;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "video/mp4", "video/webm"];
const MAX_SIZE_MB = 50;

export function PortfolioUpload({ onAdd, isPending }: PortfolioUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FilePreview[]>([]);
  const [selectedFile, setSelectedFile] = useState<FilePreview | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newFiles: FilePreview[] = [];

    for (const file of fileArray) {
      if (!ACCEPTED_TYPES.includes(file.type)) continue;
      if (file.size > MAX_SIZE_MB * 1024 * 1024) continue;
      if (uploadedFiles.length + newFiles.length >= 10) break;

      newFiles.push({
        id: generateId(),
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith("video") ? "video" : "image",
      });
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  }, [uploadedFiles.length]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemoveFile = useCallback((id: string) => {
    setUploadedFiles((prev) => {
      const item = prev.find(f => f.id === id);
      if (item) {
        URL.revokeObjectURL(item.preview);
      }
      return prev.filter(f => f.id !== id);
    });
    if (selectedFile?.id === id) {
      setSelectedFile(null);
    }
  }, [selectedFile]);

  const submit = () => {
    if (!selectedFile || !title.trim()) return;
    onAdd({
      url: selectedFile.preview,
      type: selectedFile.type,
      title: title.trim(),
      description: description.trim() || undefined,
    });
    handleRemoveFile(selectedFile.id);
    setTitle("");
    setDescription("");
    setSelectedFile(null);
  };

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        aria-label="Drop media here or click to upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
          isDragging ? "border-wave bg-wave/10" : "border-ink/20 hover:border-wave/50"
        }`}
      >
        <span className="text-3xl">📁</span>
        <p className="mt-2 text-sm text-ink/60">Drag & drop image or video, or click to browse</p>
        <p className="mt-1 text-xs text-ink/40">Max 10 files, {MAX_SIZE_MB}MB each</p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          multiple
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files) handleFiles(files);
            e.target.value = "";
          }}
        />
      </div>

      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {uploadedFiles.map((item) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedFile(item)}
                className="group relative aspect-square overflow-hidden rounded-lg border-2 border-ink/10 transition-all hover:border-wave"
              >
                {item.type === "video" ? (
                  <video src={item.preview} className="h-full w-full object-cover" muted />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.preview} alt={item.file.name} className="h-full w-full object-cover" />
                )}
                <div className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/30">
                  {item.type === "video" && (
                    <Film className="absolute right-2 top-2 h-5 w-5 text-white" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="rounded-xl border border-ink/10 bg-canvas/40 p-4 dark:border-canvas/10 dark:bg-ink/40"
          >
            <div className="mb-4 flex items-start gap-4">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-ink/10">
                {selectedFile.type === "video" ? (
                  <video src={selectedFile.preview} className="h-full w-full object-cover" muted />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selectedFile.preview} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex-grow space-y-3">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title (required)"
                  className="w-full rounded-lg border border-ink/20 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-wave/50"
                />
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description (optional)"
                  className="w-full rounded-lg border border-ink/20 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-wave/50"
                />
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="rounded-full p-1 text-ink/40 hover:bg-ink/5 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={submit}
                disabled={!title.trim() || isPending}
                className="rounded-lg bg-wave px-4 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-wave/90"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </span>
                ) : (
                  "Add to Portfolio"
                )}
              </button>
              <button
                onClick={() => {
                  handleRemoveFile(selectedFile.id);
                  setSelectedFile(null);
                }}
                className="rounded-lg border border-ink/20 px-4 py-2 text-sm text-ink/70 hover:bg-ink/5"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}