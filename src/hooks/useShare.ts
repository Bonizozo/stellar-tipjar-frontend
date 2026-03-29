"use client";

import { useCallback, useMemo, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { getCreatorShareText, getCreatorShareUrl, getShareUrl, type SharePlatform } from "@/utils/shareUtils";

type ShareCounts = Record<SharePlatform, number>;

const INITIAL_COUNTS: ShareCounts = {
  twitter: 0,
  facebook: 0,
  linkedin: 0,
  copy: 0,
};

export function useShare(username: string, displayName: string) {
  const { success, error } = useToast();
  const [shareCounts, setShareCounts] = useState<ShareCounts>(INITIAL_COUNTS);

  const url = useMemo(() => getCreatorShareUrl(username), [username]);
  const text = useMemo(() => getCreatorShareText(displayName), [displayName]);

  const share = useCallback(
    async (platform: SharePlatform) => {
      try {
        if (platform === "copy") {
          await navigator.clipboard.writeText(url);
          setShareCounts((prev) => ({ ...prev, copy: prev.copy + 1 }));
          success("Copied profile link to clipboard");
          return;
        }

        const shareUrl = getShareUrl(platform, url, text);

        if (navigator.share && ["twitter", "facebook", "linkedin"].includes(platform)) {
          await navigator.share({ title: text, text, url });
        } else {
          window.open(shareUrl, "_blank", "noopener,noreferrer,width=630,height=460");
        }

        setShareCounts((prev) => ({ ...prev, [platform]: prev[platform] + 1 }));
        success(`Shared on ${platform}`);
      } catch (err) {
        console.error(err);
        error("Unable to share right now. Please try again.");
      }
    },
    [error, success, text, url]
  );

  return { url, text, share, shareCounts };
}
