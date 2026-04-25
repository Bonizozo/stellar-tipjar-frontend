import { type ReactNode } from "react";

/**
 * Renders children in a visually-hidden span that remains accessible to
 * screen readers. Use for supplementary context that doesn't need to be
 * visible on screen.
 *
 * Example:
 *   <button>
 *     <span aria-hidden="true">✕</span>
 *     <VisuallyHidden>Close dialog</VisuallyHidden>
 *   </button>
 */
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap",
        borderWidth: 0,
      }}
    >
      {children}
    </span>
  );
}
