"use client";

import { useCallback, useState } from "react";

type ModalState<TData> = {
  isOpen: boolean;
  data: TData | null;
};

export function useModal<TData = undefined>(initialOpen = false) {
  const [state, setState] = useState<ModalState<TData>>({
    isOpen: initialOpen,
    data: null,
  });

  const open = useCallback((data?: TData) => {
    setState({ isOpen: true, data: (data ?? null) as TData | null });
  }, []);

  const close = useCallback(() => {
    setState((previous) => ({ ...previous, isOpen: false }));
  }, []);

  const toggle = useCallback(() => {
    setState((previous) => ({ ...previous, isOpen: !previous.isOpen }));
  }, []);

  const reset = useCallback(() => {
    setState({ isOpen: false, data: null });
  }, []);

  return {
    isOpen: state.isOpen,
    data: state.data,
    open,
    close,
    toggle,
    reset,
  };
}
