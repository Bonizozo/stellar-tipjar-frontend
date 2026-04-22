"use client";

import type { ModalSectionProps } from "@/components/Modal";

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function ModalFooter({ className, ...rest }: ModalSectionProps) {
  return (
    <div
      className={joinClasses(
        "flex flex-wrap items-center justify-end gap-3 border-t border-black/10 px-5 py-4 dark:border-white/10",
        className,
      )}
      {...rest}
    />
  );
}
