"use client";

import { useEffect, useCallback } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { PortfolioItem } from "@/services/api";

interface LightboxProps {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onNav: (index: number) => void;
}

export function PortfolioLightbox({ items, index, onClose, onNav }: LightboxProps) {
  const ref = useFocusTrap<HTMLDivElement>(true);
  const item = items[index];

  const prev = useCallback(() => onNav((index - 1 + items.length) % items.length), [index, items.length, onNav]);
  const next = useCallback(() => onNav((index + 1) % items.length), [index, items.length, onNav]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        ref={ref}
        className="relative max-h-[90vh] max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          <video
            src={item.url}
            controls
            autoPlay
            className="max-h-[70vh] w-full rounded-xl object-contain"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.url}
            alt={item.title}
            className="max-h-[70vh] w-full rounded-xl object-contain"
          />
        )}

        <div className="mt-3 text-center text-white">
          <p className="font-semibold">{item.title}</p>
          {item.description && <p className="mt-1 text-sm text-white/70">{item.description}</p>}
        </div>

        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80"
            >
              ›
            </button>
          </>
        )}

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 rounded-full bg-black/60 px-2 py-1 text-white hover:bg-black/90"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
