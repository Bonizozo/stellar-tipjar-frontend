import type { Creator } from "@/utils/creatorData";

export interface PressKitStats {
  totalTips: number;
  totalEarningsXLM: number;
  supporterCount: number;
  joinedAt: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface PressKit {
  username: string;
  displayName: string;
  bio: string;
  categories: string[];
  tags: string[];
  stats: PressKitStats;
  socialLinks: SocialLink[];
  customMessage: string;
  template: "minimal" | "professional" | "creative";
  accentColor: string;
}

export function buildPressKit(
  creator: Creator,
  overrides: Partial<Pick<PressKit, "socialLinks" | "customMessage" | "template" | "accentColor">> = {}
): PressKit {
  return {
    username: creator.username,
    displayName: creator.displayName ?? creator.username,
    bio: creator.bio ?? "",
    categories: creator.categories,
    tags: creator.tags,
    stats: {
      totalTips: Math.floor(creator.earnings / 10),
      totalEarningsXLM: creator.earnings,
      supporterCount: creator.followers ?? 0,
      joinedAt: creator.joinedAt,
    },
    socialLinks: overrides.socialLinks ?? [],
    customMessage: overrides.customMessage ?? "",
    template: overrides.template ?? "professional",
    accentColor: overrides.accentColor ?? "#6366f1",
  };
}
