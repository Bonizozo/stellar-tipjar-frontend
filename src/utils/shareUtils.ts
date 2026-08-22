export type SharePlatform = "twitter" | "facebook" | "linkedin" | "copy";

import { SITE_BASE_URL } from "@/config/env";

const BASE_URL = SITE_BASE_URL.replace(/\/?$/, "");

export function getCreatorShareUrl(username: string) {
  return `${BASE_URL}/creator/${encodeURIComponent(username)}`;
}

export function getCreatorShareText(creatorName: string) {
  return `Support ${creatorName} on Stellar Tip Jar!`;
}

export function getShareUrl(platform: SharePlatform, url: string, text: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    default:
      return url;
  }
}
