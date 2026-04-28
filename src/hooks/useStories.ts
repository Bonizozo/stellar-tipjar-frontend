"use client";

import { useState, useCallback } from "react";
import type { Story, StoryGroup, StoryReactionEmoji } from "@/types/story";

const STORY_EXPIRY_HOURS = 24;

function buildMockStories(username: string): Story[] {
  const now = new Date();
  const expires = new Date(now.getTime() + STORY_EXPIRY_HOURS * 60 * 60 * 1000);
  return [
    {
      id: `${username}-story-1`,
      creatorUsername: username,
      creatorDisplayName: username,
      mediaType: "text",
      textContent: "Thanks for all the support! 🙏",
      backgroundColor: "#0f6c7b",
      reactions: {
        "❤️": { emoji: "❤️", count: 12, userReacted: false },
        "🔥": { emoji: "🔥", count: 5, userReacted: false },
        "👏": { emoji: "👏", count: 8, userReacted: false },
        "😮": { emoji: "😮", count: 2, userReacted: false },
        "🎉": { emoji: "🎉", count: 3, userReacted: false },
      },
      viewCount: 47,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      viewed: false,
    },
  ];
}

export function useStories(creatorUsername?: string) {
  const [stories, setStories] = useState<Story[]>(
    creatorUsername ? buildMockStories(creatorUsername) : []
  );
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchStories = useCallback(async (username: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/creators/${username}/stories`);
      if (res.ok) {
        const data: Story[] = await res.json();
        setStories(data);
      } else {
        setStories(buildMockStories(username));
      }
    } catch {
      setStories(buildMockStories(username));
    } finally {
      setLoading(false);
    }
  }, []);

  const markViewed = useCallback((storyId: string) => {
    setStories((prev: Story[]) =>
      prev.map((s: Story) => (s.id === storyId ? { ...s, viewed: true } : s))
    );
  }, []);

  const reactToStory = useCallback(
    async (storyId: string, emoji: StoryReactionEmoji) => {
      setStories((prev: Story[]) =>
        prev.map((s: Story) => {
          if (s.id !== storyId) return s;
          const reaction = s.reactions[emoji];
          const alreadyReacted = reaction.userReacted;
          return {
            ...s,
            reactions: {
              ...s.reactions,
              [emoji]: {
                ...reaction,
                count: alreadyReacted ? reaction.count - 1 : reaction.count + 1,
                userReacted: !alreadyReacted,
              },
            },
          };
        })
      );
    },
    []
  );

  const createStory = useCallback(
    async (data: {
      mediaType: Story["mediaType"];
      mediaUrl?: string;
      textContent?: string;
      backgroundColor?: string;
      caption?: string;
    }) => {
      const now = new Date();
      const expires = new Date(now.getTime() + STORY_EXPIRY_HOURS * 60 * 60 * 1000);
      const newStory: Story = {
        id: `story-${Date.now()}`,
        creatorUsername: creatorUsername ?? "",
        creatorDisplayName: creatorUsername ?? "",
        reactions: {
          "❤️": { emoji: "❤️", count: 0, userReacted: false },
          "🔥": { emoji: "🔥", count: 0, userReacted: false },
          "👏": { emoji: "👏", count: 0, userReacted: false },
          "😮": { emoji: "😮", count: 0, userReacted: false },
          "🎉": { emoji: "🎉", count: 0, userReacted: false },
        },
        viewCount: 0,
        createdAt: now.toISOString(),
        expiresAt: expires.toISOString(),
        viewed: false,
        ...data,
      };
      setStories((prev: Story[]) => [newStory, ...prev]);
      return newStory;
    },
    [creatorUsername]
  );

  const activeStory = stories[activeIndex] ?? null;
  const hasUnviewed = stories.some((s: Story) => !s.viewed);

  return {
    stories,
    loading,
    activeIndex,
    activeStory,
    hasUnviewed,
    setActiveIndex,
    fetchStories,
    markViewed,
    reactToStory,
    createStory,
  };
}

export function useStoryGroups() {
  const [groups, setGroups] = useState<StoryGroup[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stories/feed");
      if (res.ok) {
        const data: StoryGroup[] = await res.json();
        setGroups(data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  return { groups, loading, fetchGroups };
}
