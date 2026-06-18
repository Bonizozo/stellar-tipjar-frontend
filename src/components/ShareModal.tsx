"use client";

import { Modal } from "@/components/Modal";
import { ModalBody } from "@/components/Modal/ModalBody";
import { ModalFooter } from "@/components/Modal/ModalFooter";
import { ModalHeader } from "@/components/Modal/ModalHeader";
import type { SharePlatform } from "@/utils/shareUtils";

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onShare: (platform: SharePlatform) => void;
  shareUrl: string;
  shareCounts: Record<SharePlatform, number>;
};

interface LocalShareButtonProps {
  platform: SharePlatform;
  onClick: (platform: SharePlatform) => void;
  count: number;
}

function LocalShareButton({ platform, onClick, count }: LocalShareButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(platform)}
      className="inline-flex items-center justify-between gap-2 rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-sm font-medium text-ink transition hover:bg-ink/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
    >
      <span className="capitalize">{platform}</span>
      {count > 0 && <span className="text-xs text-ink/40">({count})</span>}
    </button>
  );
}

export function ShareModal({ isOpen, onClose, onShare, shareUrl, shareCounts }: ShareModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" title="Share this creator">
      <ModalHeader>
        <div>
          <h2 id="share-modal-title" className="text-lg font-semibold text-ink dark:text-white">
            Share this creator
          </h2>
          <p className="text-sm text-ink/70 dark:text-white/70">Share link: {shareUrl}</p>
        </div>
      </ModalHeader>

      <ModalBody>
        <div className="grid grid-cols-2 gap-2">
          <LocalShareButton platform="twitter" onClick={onShare} count={shareCounts.twitter} />
          <LocalShareButton platform="facebook" onClick={onShare} count={shareCounts.facebook} />
          <LocalShareButton platform="linkedin" onClick={onShare} count={shareCounts.linkedin} />
          <LocalShareButton platform="copy" onClick={onShare} count={shareCounts.copy} />
        </div>
      </ModalBody>

      <ModalFooter>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-lg border border-ink/20 px-3 py-2 text-sm font-medium text-ink transition hover:bg-ink/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
}
