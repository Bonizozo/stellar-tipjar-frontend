"use client";

import { useState } from "react";
import { shareDeepLink } from "@/lib/deeplink/handler";

interface ShareButtonProps {
  path: string;
  title: string;
  text: string;
  className?: string;
}

export function ShareButton({ path, title, text, className = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const usedNative = await shareDeepLink(path, title, text);
    if (!usedNative) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={copied ? "Link copied to clipboard" : "Share this page"}
      className={`inline-flex items-center gap-1.5 rounded-xl border border-ink/20 px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-wave/40 hover:text-wave focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50 ${className}`}
    >
      {copied ? (
        <>
          <span aria-hidden="true">✓</span> Copied!
        </>
      ) : (
        <>
          <span aria-hidden="true">↗</span> Share
        </>
      )}
    </button>
  );
}
