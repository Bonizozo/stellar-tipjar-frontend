"use client";

import { ReactNode } from "react";

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  justify?: "start" | "center" | "end" | "between" | "around";
  padding?: "none" | "sm" | "md" | "lg";
}

const justifyVariants = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

const paddingVariants = {
  none: "",
  sm: "pt-2",
  md: "pt-4",
  lg: "pt-6",
};

export function CardFooter({ 
  children, 
  className = "", 
  bordered = true,
  justify = "end",
  padding = "md",
}: CardFooterProps) {
  return (
    <div 
      className={[
        "flex items-center gap-3 mt-4",
        bordered && "border-t border-gray-200 dark:border-gray-700",
        justifyVariants[justify],
        paddingVariants[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}