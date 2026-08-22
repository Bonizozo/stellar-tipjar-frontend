"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { StoryRing } from "./StoryRing";
import { StoryViewer } from "./StoryViewer";
import { StoryCreator } from "./StoryCreator";
import { useStories } from "@/hooks/useStories";
import type { StoryGroup } from "@/types/story";

interface StoriesFeedProps {
  groups: StoryGroup[];
  currentUsername?: string;
  onRefresh?: () => void;
}

export function StoriesFeed({ groups, currentUsername, onRefresh }: StoriesFeedProps) {
  const [viewingGroup, setViewingGroup] = useState<StoryGroup | null>(null);
  const [creating, setCreating] = useState(false);
  const { reactToStory, markViewed, createStory } = useStories(currentUsername);

  return (
    <>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" role="list" aria-label="Stories">
        {/* Add story button */}
        {currentUsername && (
          <div className="flex flex-col items-center gap-1 flex-shrink-0" role="listitem">
            <button
              onClick={() => setCreating(true)}
              className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-wave flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Create a story"
            >
              <Plus size={20} className="text-wave" />
            </button>
            <span className="text-xs text-ink/60 dark:text-white/60 truncate max-w-[56px]">Your story</span>
          </div>
        )}

        {/* Story groups */}
        {groups.map((group) => (
          <div
            key={group.creatorUsername}
            className="flex flex-col items-center gap-1 flex-shrink-0"
            role="listitem"
          >
            <StoryRing
              hasUnviewed={group.hasUnviewed}
              size={56}
              onClick={() => setViewingGroup(group)}
            >
              {group.creatorAvatarUrl ? (
                <img
                  src={group.creatorAvatarUrl}
                  alt={group.creatorDisplayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-wave/20 text-wave font-bold text-lg">
                  {group.creatorDisplayName[0]?.toUpperCase()}
                </div>
              )}
            </StoryRing>
            <span className="text-xs text-ink/70 dark:text-white/70 truncate max-w-[56px]">
              {group.creatorDisplayName}
            </span>
          </div>
        ))}
      </div>

      {/* Story viewer */}
      {viewingGroup && (
        <StoryViewer
          stories={viewingGroup.stories}
          onClose={() => {
            setViewingGroup(null);
            onRefresh?.();
          }}
          onReact={reactToStory}
          onViewed={markViewed}
        />
      )}

      {/* Story creator */}
      {creating && (
        <StoryCreator
          onClose={() => setCreating(false)}
          onCreate={createStory}
        />
      )}
    </>
  );
}
