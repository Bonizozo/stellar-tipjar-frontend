"use client";

import { useRef, useState, useCallback } from "react";
import type { PortfolioItem } from "@/services/api";

interface PortfolioUploadProps {
  onAdd: (item: Omit<PortfolioItem, "id">) => void;
  isPending: boolean;
}

const ACCEPTED = ["image/jpeg", "image/png", "image/gif", "image/webp", "video/mp4", "video/webm"];

export function PortfolioUpload({ onAdd, isPending }: PortfolioUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<{ url: string; type: "image" | "video" } | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!ACCEPTED.includes(file.type)) return;
    const url = URL.createObjectURL(file);
    setPreview({ url, type: file.type.startsWith("video") ? "video" : "image" });
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const submit = () => {
    if (!preview || !title.trim()) return;
    onAdd({ url: preview.url, type: preview.type, title: title.trim(), description: description.trim() || undefined });
    setPreview(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        aria-label="Drop media here or click to upload"
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
          dragging ? "border-wave bg-wave/10" : "border-ink/20 hover:border-wave/50"
        }`}
      >
        <span className="text-3xl">📁</span>
        <p className="mt-2 text-sm text-ink/60">Drag & drop image or video, or click to browse</p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(",")}
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>

      {preview && (
        <div className="space-y-2 rounded-xl border border-ink/10 p-4">
          {preview.type === "video" ? (
            <video src={preview.url} className="h-32 w-full rounded-lg object-cover" muted />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview.url} alt="preview" className="h-32 w-full rounded-lg object-cover" />
          )}
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
          <div className="flex gap-2">
            <button
              onClick={submit}
              disabled={!title.trim() || isPending}
              className="rounded-lg bg-wave px-4 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-wave/90"
            >
              {isPending ? "Uploading…" : "Add to Portfolio"}
            </button>
            <button
              onClick={() => setPreview(null)}
              className="rounded-lg border border-ink/20 px-4 py-2 text-sm text-ink/70 hover:bg-ink/5"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
