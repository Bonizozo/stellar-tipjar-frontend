"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import type { Story, StoryReactionEmoji } from "@/types/story";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STORY_DURATION_MS = 5000;
const REACTIONS: StoryReactionEmoji[] = ["❤️", "🔥", "👏", "😮", "🎉"];

interface StoryViewerProps {
  stories: Story[];
  initialIndex?: number;
  onClose: () => void;
  onReact: (storyId: string, emoji: StoryReactionEmoji) => void;
  onViewed: (storyId: string) => void;
}

export function StoryViewer({
  stories,
  initialIndex = 0,
  onClose,
  onReact,
  onViewed,
}: StoryViewerProps) {
  const [index, setIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const story = stories[index];

  useEffect(() => {
    if (!story) return;
    onViewed(story.id);
  }, [story, onViewed]);

  useEffect(() => {
    if (paused || reduced) return;
    setProgress(0);
    const step = 100 / (STORY_DURATION_MS / 100);
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          goNext();
          return 0;
        }
        return p + step;
      });
    }, 100);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, reduced]);

  function goNext() {
    if (index < stories.length - 1) {
      setIndex((i) => i + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }

  function goPrev() {
    if (index > 0) {
      setIndex((i) => i - 1);
      setProgress(0);
    }
  }

  if (!story) return null;

  const timeLeft = Math.round(
    ((100 - progress) / 100) * (STORY_DURATION_MS / 1000)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label={`Story by ${story.creatorDisplayName}`}
    >
      <div
        className="relative w-full max-w-sm h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
        onMouseDown={() => setPaused(true)}
        onMouseUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2">
          {stories.map((s, i) => (
            <div key={s.id} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-none"
                style={{
                  width:
                    i < index ? "100%" : i === index ? `${progress}%` : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-4 left-0 right-0 z-20 flex items-center justify-between px-3 pt-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden">
              {story.creatorAvatarUrl ? (
                <img src={story.creatorAvatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                  {story.creatorDisplayName[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="text-white text-xs font-semibold">{story.creatorDisplayName}</p>
              <p className="text-white/60 text-xs">{timeLeft}s</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full"
            aria-label="Close story"
          >
            <X size={20} />
          </button>
        </div>

        {/* Story content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={story.id}
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: story.backgroundColor ?? "#151515" }}
            initial={reduced ? {} : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? {} : { opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            {story.mediaType === "image" && story.mediaUrl && (
              <img
                src={story.mediaUrl}
                alt={story.caption ?? "Story image"}
                className="w-full h-full object-cover"
              />
            )}
            {story.mediaType === "video" && story.mediaUrl && (
              <video
                src={story.mediaUrl}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                loop
              />
            )}
            {story.mediaType === "text" && (
              <div className="px-8 text-center">
                <p className="text-white text-2xl font-bold leading-snug">
                  {story.textContent}
                </p>
              </div>
            )}
            {story.caption && story.mediaType !== "text" && (
              <div className="absolute bottom-20 left-0 right-0 px-4">
                <p className="text-white text-sm text-center drop-shadow">{story.caption}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav zones */}
        <button
          className="absolute left-0 top-0 w-1/3 h-full z-10"
          onClick={goPrev}
          aria-label="Previous story"
        />
        <button
          className="absolute right-0 top-0 w-1/3 h-full z-10"
          onClick={goNext}
          aria-label="Next story"
        />

        {/* Footer: reactions + view count */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {REACTIONS.map((emoji) => {
                const r = story.reactions[emoji];
                return (
                  <button
                    key={emoji}
                    onClick={() => onReact(story.id, emoji)}
                    className={`flex items-center gap-0.5 px-2 py-1 rounded-full text-xs transition-colors ${
                      r.userReacted
                        ? "bg-white/30 text-white"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                    aria-label={`React with ${emoji}`}
                    aria-pressed={r.userReacted}
                  >
                    <span>{emoji}</span>
                    {r.count > 0 && <span>{r.count}</span>}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-1 text-white/60 text-xs">
              <Eye size={12} />
              <span>{story.viewCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side nav arrows */}
      {index > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-4 text-white/60 hover:text-white"
          aria-label="Previous story"
        >
          <ChevronLeft size={32} />
        </button>
      )}
      {index < stories.length - 1 && (
        <button
          onClick={goNext}
          className="absolute right-4 text-white/60 hover:text-white"
          aria-label="Next story"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
}
