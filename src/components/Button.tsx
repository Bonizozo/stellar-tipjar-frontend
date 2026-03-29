"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-purple-600 hover:bg-purple-700 text-white focus-visible:ring-purple-500/50",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 focus-visible:ring-gray-400/50",
  outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 focus-visible:ring-purple-500/50",
  ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus-visible:ring-gray-400/50",
  danger: "bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-500/50",
};

const sizes: Record<ButtonSize, string> = {
  xs: "px-2 py-1 text-xs gap-1",
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-base gap-2",
  lg: "px-6 py-3 text-lg gap-2",
  xl: "px-8 py-4 text-xl gap-3",
};

const spinnerSizes: Record<ButtonSize, string> = {
  xs: "h-3 w-3",
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className = "",
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    iconPosition = "left",
    type = "button",
    disabled,
    ...props
  },
  ref
) {
  const prefersReduced = useReducedMotion();
  const isDisabled = disabled || loading;

  const iconOnly = !children && icon;

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={[
        "inline-flex items-center justify-center rounded-xl font-semibold",
        "focus-visible:outline-none focus-visible:ring-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "transition-colors",
        variants[variant],
        sizes[size],
        iconOnly ? "aspect-square p-0 w-auto" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      whileHover={prefersReduced || isDisabled ? undefined : { y: -2 }}
      whileTap={prefersReduced || isDisabled ? undefined : { scale: 0.96 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      {...props}
    >
      {loading && <Spinner className={spinnerSizes[size]} />}
      {!loading && icon && iconPosition === "left" && icon}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </motion.button>
  );
});
