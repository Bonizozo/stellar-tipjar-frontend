"use client";

import { Modal } from "@/components/Modal";
import { ModalBody } from "@/components/Modal/ModalBody";
import { ModalFooter } from "@/components/Modal/ModalFooter";
import { ModalHeader } from "@/components/Modal/ModalHeader";
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
          <ShareButton platform="twitter" onClick={onShare} count={shareCounts.twitter} />
          <ShareButton platform="facebook" onClick={onShare} count={shareCounts.facebook} />
          <ShareButton platform="linkedin" onClick={onShare} count={shareCounts.linkedin} />
          <ShareButton platform="copy" onClick={onShare} count={shareCounts.copy} />
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
