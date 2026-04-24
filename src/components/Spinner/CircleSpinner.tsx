"use client";

import type { SpinnerProps } from "./index";
import { SIZE_MAP } from "./index";

export function CircleSpinner({ size = "md", color = "currentColor", label = "Loading…" }: SpinnerProps) {
  const s = SIZE_MAP[size];
  return (
    <svg
      className={`animate-spin ${s}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-label={label}
      role="status"
      style={{ color }}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
