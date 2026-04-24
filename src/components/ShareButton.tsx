import type { SharePlatform } from "@/utils/shareUtils";

const LABELS: Record<SharePlatform, string> = {
  twitter: "Twitter",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  copy: "Copy link",
};

function getIcon(platform: SharePlatform) {
  switch (platform) {
    case "twitter":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3-3.2.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 8h4v13H3V8zm7 0h3.8v1.8h.1c.5-.9 1.8-1.8 3.7-1.8 4 0 4.8 2.3 4.8 5.2V21h-4v-6.5c0-1.6 0-3.6-2.2-3.6-2.2 0-2.5 1.7-2.5 3.4V21h-4V8z" />
        </svg>
      );
    case "copy":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13 2H6a2 2 0 00-2 2v14h2V4h7V2zm5 4H9a2 2 0 00-2 2v14a2 2 0 002 2h9a2 2 0 002-2V8a2 2 0 00-2-2zm0 16H9V8h9v14z" />
        </svg>
      );
    default:
      return null;
  }
}

type Props = {
  platform: SharePlatform;
  onClick: (platform: SharePlatform) => void;
  count?: number;
};

export function ShareButton({ platform, onClick, count }: Props) {
  return (
    <button
      type="button"
      onClick={() => onClick(platform)}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-300/20 bg-white/5 px-3 py-2 text-xs font-medium text-gray-200 transition hover:border-blue-400 hover:bg-blue-500/10 hover:text-white"
    >
      {getIcon(platform)}
      <span>{LABELS[platform]}</span>
      {typeof count === "number" && <span className="text-gray-400">({count})</span>}
    </button>
  );
}
