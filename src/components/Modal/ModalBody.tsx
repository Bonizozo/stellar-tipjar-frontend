"use client";

import type { ModalSectionProps } from "@/components/Modal";

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function ModalBody({ className, ...rest }: ModalSectionProps) {
  return <div className={joinClasses("flex-1 overflow-y-auto px-5 py-4", className)} {...rest} />;
}
