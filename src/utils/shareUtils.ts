export type SharePlatform = "twitter" | "facebook" | "linkedin" | "copy";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/?$/, "") || "https://stellar-tipjar.app";

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
