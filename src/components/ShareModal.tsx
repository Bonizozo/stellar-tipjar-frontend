import { ShareButton } from "@/components/ShareButton";
import type { SharePlatform } from "@/utils/shareUtils";

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onShare: (platform: SharePlatform) => void;
  shareUrl: string;
  shareCounts: Record<SharePlatform, number>;
};

export function ShareModal({ isOpen, onClose, onShare, shareUrl, shareCounts }: ShareModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-[color:var(--surface)] p-5 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 id="share-modal-title" className="text-lg font-semibold text-ink">
              Share this creator
            </h2>
            <p className="text-sm text-ink/70">Share link: {shareUrl}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-ink/60 transition hover:text-ink"
            aria-label="Close share dialog"
          >
            ✕
          </button>
        </div>

        <div className="mb-3 grid grid-cols-2 gap-2">
          <ShareButton platform="twitter" onClick={onShare} count={shareCounts.twitter} />
          <ShareButton platform="facebook" onClick={onShare} count={shareCounts.facebook} />
          <ShareButton platform="linkedin" onClick={onShare} count={shareCounts.linkedin} />
          <ShareButton platform="copy" onClick={onShare} count={shareCounts.copy} />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-2 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm font-medium text-ink transition hover:bg-ink/10"
        >
          Close
        </button>
      </div>
    </div>
  );
}
