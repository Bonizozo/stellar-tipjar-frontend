"use client";

import type { ButtonHTMLAttributes } from "react";
import { useModalContext, type ModalSectionProps } from "@/components/Modal";

type ModalHeaderProps = ModalSectionProps & {
  showCloseButton?: boolean;
  closeButtonLabel?: string;
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function ModalHeader({
  showCloseButton = true,
  closeButtonLabel = "Close dialog",
  className,
  children,
  ...rest
}: ModalHeaderProps) {
  const { onClose } = useModalContext();

  return (
    <div
      className={joinClasses(
        "flex items-start justify-between gap-4 border-b border-black/10 px-5 py-4 dark:border-white/10",
        className,
      )}
      {...rest}
    >
      <div className="min-w-0 flex-1">{children}</div>
      {showCloseButton && <ModalCloseButton onClick={onClose} aria-label={closeButtonLabel} />}
    </div>
  );
}

function ModalCloseButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="rounded-lg p-2 text-black/60 transition hover:bg-black/5 hover:text-black focus:outline-none focus:ring-2 focus:ring-wave dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
      {...props}
    >
      <span aria-hidden>✕</span>
    </button>
  );
}
