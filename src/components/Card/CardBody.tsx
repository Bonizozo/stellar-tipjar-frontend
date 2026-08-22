"use client";

import { ReactNode } from "react";

export interface CardBodyProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  scrollable?: boolean;
}

const paddingVariants = {
  none: "",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

export function CardBody({ 
  children, 
  className = "", 
  padding = "none",
  scrollable = false,
}: CardBodyProps) {
  return (
    <div 
      className={[
        paddingVariants[padding],
        scrollable && "overflow-auto custom-scrollbar",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}