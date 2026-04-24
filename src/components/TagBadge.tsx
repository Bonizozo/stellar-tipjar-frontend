"use client";

import { MouseEvent, ClipboardEvent } from "react";
import { Copy, Check } from "lucide-react"; // Assume icons available or use SVG
import { validateTag } from "@/utils/categories";
import { cn } from "@/lib/utils"; // Assume cn utility if exists, else className

interface TagBadgeProps {
  tag: string;
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
  onClick?: (tag: string) => void;
  className?: string;
}

export function TagBadge({
  tag,
  size = "md",
  clickable = false,
  onClick,
  className,
}: TagBadgeProps) {
  const [isCopied, setIsCopied] = useState(false);

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const handleCopy = (e: ClipboardEvent | MouseEvent) {
    e.preventDefault();
    navigator.clipboard.writeText(tag).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const TagElement = clickable ? "button" : "span";

  return (
    <TagElement
      onClick={onClick ? (e) => onClick(tag) : undefined}
      className={`inline-flex items-center gap-1.5 rounded-full border border-wave/30 bg-wave/10 text-wave font-medium transition-all hover:border-wave hover:bg-wave/20 focus:outline-none focus:ring-2 focus:ring-wave/30 whitespace-nowrap ${
        sizeClasses[size]
      } ${className || ''} ${clickable ? 'cursor-pointer hover:scale-[1.05]' : ''}`}
      onMouseDown={handleCopy}
      title={`Copy tag: #${tag}`}
      aria-label={`Tag: ${tag}${clickable ? ", clickable" : ""}`}
    >
      #{tag}
      {isCopied ? (
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="h-3 w-3 opacity-70" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8zM4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 8a1 1 0 100 2h2a1 1 0 100-2H2zm18 0a1 1 0 100-2h-2a1 1 0 100 2h2zM2 13a1 1 0 100 2h2a1 1 0 100-2H2zm16 0a1 1 0 100-2h2a1 1 0 100 2h-2zM4 17a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 17a1 1 0 100 2h2a1 1 0 100-2H2z" />
        </svg>
      )}
    </TagElement>
  );
}

