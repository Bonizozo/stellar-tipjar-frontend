"use client";

import { useCallback } from "react";
import { type ToastOptions, useToastContext } from "@/contexts/ToastContext";

export function useToast() {
  const { add, remove } = useToastContext();

  const success = useCallback(
    (message: string, options?: ToastOptions) => add(message, "success", options),
    [add]
  );
  const error = useCallback(
    (message: string, options?: ToastOptions) => add(message, "error", options),
    [add]
  );
  const warning = useCallback(
    (message: string, options?: ToastOptions) => add(message, "warning", options),
    [add]
  );
  const info = useCallback(
    (message: string, options?: ToastOptions) => add(message, "info", options),
    [add]
  );

  return { success, error, warning, info, dismiss: remove };
}
