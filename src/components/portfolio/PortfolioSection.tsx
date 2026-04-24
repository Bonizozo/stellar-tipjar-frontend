"use client";

import { useState } from "react";
import { usePortfolio } from "@/hooks/queries/usePortfolio";
import { PortfolioLightbox } from "./PortfolioLightbox";
import { PortfolioUpload } from "./PortfolioUpload";
import type { PortfolioItem } from "@/services/api";

interface PortfolioSectionProps {
  username: string;
  /** Show upload controls (i.e. the creator is viewing their own profile) */
  editable?: boolean;
}

export function PortfolioSection({ username, editable = false }: PortfolioSectionProps) {
  const { data: items = [], isLoading, add, remove } = usePortfolio(username);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-xl bg-ink/10" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {editable && (
        <PortfolioUpload
          onAdd={(item) => add.mutate(item)}
          isPending={add.isPending}
        />
      )}

      {items.length === 0 && !editable && (
        <p className="text-sm text-ink/50">No portfolio items yet.</p>
      )}

      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item: PortfolioItem, i: number) => (
            <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl">
              {item.type === "video" ? (
                <video
                  src={item.url}
                  muted
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              )}

              {/* overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="truncate text-xs font-medium text-white">{item.title}</p>
                <div className="mt-1 flex gap-2">
                  <button
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`View ${item.title}`}
                    className="rounded-md bg-white/20 px-2 py-1 text-xs text-white backdrop-blur hover:bg-white/30"
                  >
                    View
                  </button>
                  {editable && (
                    <button
                      onClick={() => remove.mutate(item.id)}
                      aria-label={`Delete ${item.title}`}
                      className="rounded-md bg-red-500/70 px-2 py-1 text-xs text-white hover:bg-red-500"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>

              {item.type === "video" && (
                <span className="absolute right-2 top-2 rounded-full bg-black/50 px-1.5 py-0.5 text-xs text-white">
                  ▶
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <PortfolioLightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={setLightboxIndex}
        />
      )}
    </div>
  );
}
