"use client";

import { createContext, useCallback, useContext, useReducer } from "react";

export type ToastVariant = "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-right"
  | "top-center"
  | "top-left"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
  action?: ToastAction;
  position: ToastPosition;
}

type ToastOptions = Partial<Pick<Toast, "duration" | "action" | "position">>;

interface ToastContextValue {
  toasts: Toast[];
  add: (message: string, variant: ToastVariant, options?: ToastOptions) => void;
  remove: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

type Action = { type: "ADD"; toast: Toast } | { type: "REMOVE"; id: string };

function reducer(state: Toast[], action: Action): Toast[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.toast];
    case "REMOVE":
      return state.filter((t) => t.id !== action.id);
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, dispatch] = useReducer(reducer, []);

  const remove = useCallback((id: string) => dispatch({ type: "REMOVE", id }), []);

  const add = useCallback(
    (message: string, variant: ToastVariant, options: ToastOptions = {}) => {
      const id = `${Date.now()}-${Math.random()}`;
      const toast: Toast = {
        id,
        message,
        variant,
        duration: options.duration ?? 4000,
        action: options.action,
        position: options.position ?? "top-right",
      };
      dispatch({ type: "ADD", toast });
    },
    []
  );

  return (
    <ToastContext.Provider value={{ toasts, add, remove }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToastContext must be used within ToastProvider");
  return ctx;
}
