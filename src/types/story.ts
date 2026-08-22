export type StoryMediaType = "image" | "video" | "text";

export type StoryReactionEmoji = "❤️" | "🔥" | "👏" | "😮" | "🎉";

export interface StoryReaction {
  emoji: StoryReactionEmoji;
  count: number;
  userReacted: boolean;
}

export interface Story {
  id: string;
  creatorUsername: string;
  creatorDisplayName: string;
  creatorAvatarUrl?: string;
  mediaType: StoryMediaType;
  mediaUrl?: string;
  textContent?: string;
  backgroundColor?: string;
  caption?: string;
  reactions: Record<StoryReactionEmoji, StoryReaction>;
  viewCount: number;
  createdAt: string;
  expiresAt: string;
  viewed?: boolean;
}

export interface StoryGroup {
  creatorUsername: string;
  creatorDisplayName: string;
  creatorAvatarUrl?: string;
  stories: Story[];
  hasUnviewed: boolean;
}
