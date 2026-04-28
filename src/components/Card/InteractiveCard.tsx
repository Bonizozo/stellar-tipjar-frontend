"use client";

import { ReactNode, useState } from "react";
import { Card, CardProps } from "./index";
import { CardHeader } from "./CardHeader";
import { CardBody } from "./CardBody";
import { CardFooter } from "./CardFooter";

export interface InteractiveCardProps extends Omit<CardProps, "children"> {
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  selectable?: boolean;
  selected?: boolean;
  onSelectionChange?: (selected: boolean) => void;
  expandable?: boolean;
  expanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
  expandedContent?: ReactNode;
  badge?: ReactNode;
  status?: "default" | "success" | "warning" | "error" | "info";
}

const statusStyles = {
  default: "",
  success: "ring-2 ring-green-200 dark:ring-green-800 bg-green-50/50 dark:bg-green-900/10",
  warning: "ring-2 ring-yellow-200 dark:ring-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10",
  error: "ring-2 ring-red-200 dark:ring-red-800 bg-red-50/50 dark:bg-red-900/10",
  info: "ring-2 ring-blue-200 dark:ring-blue-800 bg-blue-50/50 dark:bg-blue-900/10",
};

export function InteractiveCard({
  title,
  subtitle,
  description,
  icon,
  actions,
  children,
  selectable = false,
  selected = false,
  onSelectionChange,
  expandable = false,
  expanded = false,
  onExpandChange,
  expandedContent,
  badge,
  status = "default",
  variant = "default",
  hoverEffect = "lift",
  className = "",
  onClick,
  ...props
}: InteractiveCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(expanded);
  const isExpanded = expandable ? (onExpandChange ? expanded : internalExpanded) : false;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectable && onSelectionChange) {
      onSelectionChange(!selected);
    }
    if (expandable) {
      const newExpanded = !isExpanded;
      if (onExpandChange) {
        onExpandChange(newExpanded);
      } else {
        setInternalExpanded(newExpanded);
      }
    }
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e as any);
    }
  };

  return (
    <Card
      variant={variant}
      hoverEffect={hoverEffect}
      interactive
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={[
        selected && "ring-2 ring-purple-500 bg-purple-50/50 dark:bg-purple-900/10",
        status !== "default" && statusStyles[status],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className="relative">
        {badge && (
          <div className="absolute -top-2 -right-2 z-10">
            {badge}
          </div>
        )}
        
        {(title || subtitle || icon) && (
          <CardHeader
            title={title}
            subtitle={subtitle}
            icon={icon}
            actions={
              <div className="flex items-center gap-2">
                {selectable && (
                  <div className={`w-4 h-4 rounded border-2 transition-colors ${
                    selected 
                      ? "bg-purple-600 border-purple-600" 
                      : "border-gray-300 dark:border-gray-600"
                  }`}>
                    {selected && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                )}
                {expandable && (
                  <button
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newExpanded = !isExpanded;
                      if (onExpandChange) {
                        onExpandChange(newExpanded);
                      } else {
                        setInternalExpanded(newExpanded);
                      }
                    }}
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    <svg 
                      className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
                {actions}
              </div>
            }
          />
        )}

        {(description || children) && (
          <CardBody>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                {description}
              </p>
            )}
            {children}
          </CardBody>
        )}

        {expandable && isExpanded && expandedContent && (
          <CardBody className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
            {expandedContent}
          </CardBody>
        )}
      </div>
    </Card>
  );
}