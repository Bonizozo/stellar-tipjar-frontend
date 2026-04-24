"use client";

import React from "react";

interface PageButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  ariaLabel?: string;
}

export default function PageButton({
  children,
  onClick,
  disabled,
  active,
  ariaLabel,
}: PageButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? "page" : undefined}
      aria-label={ariaLabel}
      className={
        "inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 " +
        (active
          ? "bg-purple-600 text-white shadow"
          : "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800")
      }
    >
      {children}
    </button>
  );
}
