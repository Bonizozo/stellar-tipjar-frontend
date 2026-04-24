"use client";

import {
  createContext,
  type HTMLAttributes,
  type PropsWithChildren,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "h-[100dvh] max-h-[100dvh] max-w-none rounded-none",
};

const activeModalStack: string[] = [];

const getModalDepth = (id: string) => activeModalStack.indexOf(id);

const removeFromStack = (id: string) => {
  const index = activeModalStack.indexOf(id);
  if (index >= 0) activeModalStack.splice(index, 1);
};

const bodyScrollState = {
  lockCount: 0,
  previousOverflow: "",
};

type ModalContextValue = {
  onClose: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  panelClassName?: string;
  backdropClassName?: string;
}>;

export function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className,
  panelClassName,
  backdropClassName,
  children,
}: ModalProps) {
  const modalId = useId();
  const panelRef = useFocusTrap<HTMLDivElement>(isOpen && activeModalStack[activeModalStack.length - 1] === modalId);
  const [mounted, setMounted] = useState(false);
  const [, setStackVersion] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      removeFromStack(modalId);
      setStackVersion((version) => version + 1);
      return;
    }

    activeModalStack.push(modalId);
    setStackVersion((version) => version + 1);

    return () => {
      removeFromStack(modalId);
      setStackVersion((version) => version + 1);
    };
  }, [isOpen, modalId]);

  useEffect(() => {
    if (!isOpen) return;

    bodyScrollState.lockCount += 1;
    if (bodyScrollState.lockCount === 1) {
      bodyScrollState.previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }

    return () => {
      bodyScrollState.lockCount = Math.max(0, bodyScrollState.lockCount - 1);
      if (bodyScrollState.lockCount === 0) {
        document.body.style.overflow = bodyScrollState.previousOverflow;
      }
    };
  }, [isOpen]);

  const isTopMost = activeModalStack[activeModalStack.length - 1] === modalId;
  const depth = Math.max(getModalDepth(modalId), 0);
  const zIndex = 40 + depth * 10;

  useEffect(() => {
    if (!isOpen || !closeOnEscape || !isTopMost) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeOnEscape, isTopMost, onClose]);

  const contextValue = useMemo(() => ({ onClose }), [onClose]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <ModalContext.Provider value={contextValue}>
          <div className={joinClasses("fixed inset-0", className)} style={{ zIndex }} aria-hidden={!isTopMost}>
            <motion.button
              type="button"
              aria-label="Close modal backdrop"
              className={joinClasses("absolute inset-0 h-full w-full bg-black/55 backdrop-blur-sm", backdropClassName)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (closeOnBackdropClick && isTopMost) onClose();
              }}
            />

            <div className="absolute inset-0 flex items-end justify-center p-0 sm:items-center sm:p-4">
              <motion.div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className={joinClasses(
                  "relative flex max-h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-2xl dark:bg-gray-900",
                  "rounded-t-2xl sm:max-h-[90dvh] sm:rounded-2xl",
                  "max-sm:h-[100dvh] max-sm:w-full max-sm:max-w-none max-sm:rounded-none",
                  sizeClasses[size],
                  panelClassName,
                )}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(event) => event.stopPropagation()}
              >
                {children}
              </motion.div>
            </div>
          </div>
        </ModalContext.Provider>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal subcomponents must be used inside <Modal>");
  }

  return context;
}

export type ModalSectionProps = HTMLAttributes<HTMLDivElement>;
