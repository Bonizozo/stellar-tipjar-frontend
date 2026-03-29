"use client";

import { useState } from "react";
import { ShareModal } from "@/components/ShareModal";
import { useShare } from "@/hooks/useShare";

type Props = {
  username: string;
  displayName: string;
};

export function CreatorShare({ username, displayName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { url, text, share, shareCounts } = useShare(username, displayName);

  return (
    <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-ink">Share profile</h2>
          <p className="text-sm text-ink/70">Let your audience know about this creator.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Share
        </button>
      </div>

      <div className="mt-3 text-xs text-ink/60">
        <span className="font-medium">Current share counts:</span>
        <span className="ml-2">Twitter {shareCounts.twitter}</span>
        <span className="ml-2">Facebook {shareCounts.facebook}</span>
        <span className="ml-2">LinkedIn {shareCounts.linkedin}</span>
        <span className="ml-2">Copied {shareCounts.copy}</span>
      </div>

      <ShareModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onShare={(platform) => {
          share(platform);
          if (platform !== "copy") {
            setIsOpen(false);
          }
        }}
        shareUrl={url}
        shareCounts={shareCounts}
      />
    </div>
  );
}
