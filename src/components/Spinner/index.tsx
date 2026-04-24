"use client";

import { CircleSpinner } from "./CircleSpinner";
import { DotsSpinner } from "./DotsSpinner";
import { BarsSpinner } from "./BarsSpinner";
import { PulseSpinner } from "./PulseSpinner";

export type SpinnerVariant = "circle" | "dots" | "bars" | "pulse";
export type SpinnerSize = "sm" | "md" | "lg" | "xl";

export interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  color?: string;
  label?: string;
  /** Wrap in a centered flex container */
  inline?: boolean;
}

export const SIZE_MAP: Record<SpinnerSize, string> = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const VARIANTS = { circle: CircleSpinner, dots: DotsSpinner, bars: BarsSpinner, pulse: PulseSpinner };

export function Spinner({ variant = "circle", inline = false, ...props }: SpinnerProps) {
  const Component = VARIANTS[variant];
  if (inline) {
    return (
      <span className="inline-flex items-center justify-center">
        <Component {...props} />
      </span>
    );
  }
  return <Component {...props} />;
}
