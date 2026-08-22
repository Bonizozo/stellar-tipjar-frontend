"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Video, Type, X, Upload } from "lucide-react";
import { Button } from "@/components/Button";
import type { Story } from "@/types/story";

const BG_COLORS = [
  "#0f6c7b", "#ff785a", "#5f7f41", "#7c3aed",
  "#0ea5e9", "#ec4899", "#f59e0b", "#151515",
];

interface StoryCreatorProps {
  onClose: () => void;
  onCreate: (data: {
    mediaType: Story["mediaType"];
    mediaUrl?: string;
    textContent?: string;
    backgroundColor?: string;
    caption?: string;
  }) => Promise<Story>;
}

export function StoryCreator({ onClose, onCreate }: StoryCreatorProps) {
  const [mediaType, setMediaType] = useState<Story["mediaType"]>("text");
  const [textContent, setTextContent] = useState("");
  const [caption, setCaption] = useState("");
  const [bgColor, setBgColor] = useState(BG_COLORS[0]);
  const [mediaUrl, setMediaUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (mediaType === "text" && !textContent.trim()) return;
    if ((mediaType === "image" || mediaType === "video") && !mediaUrl.trim()) return;
    setSubmitting(true);
    try {
      await onCreate({
        mediaType,
        textContent: mediaType === "text" ? textContent : undefined,
        mediaUrl: mediaType !== "text" ? mediaUrl : undefined,
        backgroundColor: bgColor,
        caption: caption || undefined,
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      role="dialog"
      aria-modal="true"
      aria-label="Create story"
    >
      <motion.div
        className="bg-[color:var(--surface)] rounded-2xl w-full max-w-md p-6 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-ink dark:text-white">Create Story</h2>
          <button onClick={onClose} className="text-ink/50 hover:text-ink dark:text-white/50 dark:hover:text-white" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Media type selector */}
        <div className="flex gap-2 mb-4">
          {(["text", "image", "video"] as Story["mediaType"][]).map((type) => {
            const Icon = type === "text" ? Type : type === "image" ? Image : Video;
            return (
              <button
                key={type}
                onClick={() => setMediaType(type)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-xs font-medium transition-colors ${
                  mediaType === type
                    ? "bg-wave text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-ink/60 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                aria-pressed={mediaType === type}
              >
                <Icon size={16} />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Content input */}
        {mediaType === "text" ? (
          <div
            className="rounded-xl p-4 mb-4 min-h-[140px] flex items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="What's on your mind?"
              maxLength={200}
              className="w-full bg-transparent text-white text-center text-xl font-bold placeholder-white/50 resize-none outline-none"
              rows={4}
              aria-label="Story text content"
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium text-ink/70 dark:text-white/70 mb-1">
              {mediaType === "image" ? "Image URL" : "Video URL"}
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder={`https://...`}
                className="flex-1 px-3 py-2 rounded-lg border border-ink/10 dark:border-white/10 bg-transparent text-sm text-ink dark:text-white outline-none focus:ring-2 focus:ring-wave"
                aria-label={`${mediaType} URL`}
              />
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-ink/60 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Upload file">
                <Upload size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Background color picker (text stories) */}
        {mediaType === "text" && (
          <div className="flex gap-2 mb-4">
            {BG_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setBgColor(color)}
                className={`w-7 h-7 rounded-full transition-transform ${bgColor === color ? "scale-125 ring-2 ring-offset-2 ring-wave" : ""}`}
                style={{ backgroundColor: color }}
                aria-label={`Background color ${color}`}
                aria-pressed={bgColor === color}
              />
            ))}
          </div>
        )}

        {/* Caption */}
        <div className="mb-4">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption (optional)"
            maxLength={100}
            className="w-full px-3 py-2 rounded-lg border border-ink/10 dark:border-white/10 bg-transparent text-sm text-ink dark:text-white outline-none focus:ring-2 focus:ring-wave"
            aria-label="Story caption"
          />
        </div>

        <p className="text-xs text-ink/40 dark:text-white/40 mb-4">
          Stories expire after 24 hours.
        </p>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={submitting}
            disabled={
              submitting ||
              (mediaType === "text" && !textContent.trim()) ||
              (mediaType !== "text" && !mediaUrl.trim())
            }
            className="flex-1"
          >
            Share Story
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
