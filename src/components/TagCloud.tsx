"use client";

import { TagWithCount } from "@/utils/categories";
import { TagBadge } from "./TagBadge";
import { useState } from "react";

interface TagCloudProps {
  tags: TagWithCount[];
  maxVisible?: number;
  onTagClick?: (tag: string) => void;
  className?: string;
}

export function TagCloud({ tags, maxVisible = 12, onTagClick, className = "" }: TagCloudProps) {
  const [showAll, setShowAll] = useState(false);
  const displayTags = showAll ? tags : tags.slice(0, maxVisible);

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-wave/80">Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        {displayTags.map(({ tag, count }) => (
          <TagBadge
            key={tag}
            tag={tag}
            size="sm"
            clickable={!!onTagClick}
            onClick={onTagClick}
            className={`font-normal text-xs shadow-sm [&:hover]:scale-[1.02] transition-all`}
          >
            {tag} ({count})
          </TagBadge>
        ))}
      </div>
      {tags.length > maxVisible && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-wave/70 hover:text-wave hover:underline"
        >
          {showAll ? 'Show less' : `Show all ${tags.length}`}
        </button>
      )}
    </div>
  );
}

