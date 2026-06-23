"use client";

import { useEffect } from "react";
import { useCurrentUser } from "@/store/userStore";
import { useProfileCompletionStore } from "@/store/profileCompletionStore";
import { useCreatorProfileDetails } from "@/store/profileDetailsStore";

/**
 * Hook to sync user profile data with completion tracker.
 * Updates the completion store based on filled profile fields.
 */
export function useProfileCompletion() {
  const user = useCurrentUser();
  const profile = useCreatorProfileDetails();
  const { setFields } = useProfileCompletionStore();

  useEffect(() => {
    if (!user) return;

    setFields([
      {
        id: "avatar",
        label: "Profile Avatar",
        description: "Add a profile picture to make your profile memorable",
        link: "/profile#avatar",
        filled: Boolean(profile.avatarUrl || user.avatarUrl),
        importance: "high",
      },
      {
        id: "displayName",
        label: "Display Name",
        description: "Set a professional display name for your profile",
        link: "/profile#displayName",
        filled: Boolean(profile.displayName || user.displayName),
        importance: "high",
      },
      {
        id: "bio",
        label: "Bio",
        description:
          "Write a short bio to help supporters understand what you do",
        link: "/profile#bio",
        filled: profile.bio.trim().length > 0,
        importance: "high",
      },
      {
        id: "tags",
        label: "Tags & Categories",
        description:
          "Add tags to improve discoverability and help supporters find you",
        link: "/profile#tags",
        filled: profile.tags.length > 0,
        importance: "medium",
      },
      {
        id: "website",
        label: "Website or Portfolio",
        description: "Link to your personal website or portfolio",
        link: "/profile#website",
        filled: profile.website.trim().length > 0,
        importance: "medium",
      },
      {
        id: "social",
        label: "Social Links",
        description: "Connect your social media profiles",
        link: "/profile#social",
        filled: Boolean(profile.twitter.trim() || profile.github.trim()),
        importance: "low",
      },
    ]);
  }, [profile, user, setFields]);
}
