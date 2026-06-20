"use client";

import { useEffect } from "react";
import { useCurrentUser } from "@/store/userStore";
import { useProfileCompletionStore } from "@/store/profileCompletionStore";

/**
 * Hook to sync user profile data with completion tracker.
 * Updates the completion store based on filled profile fields.
 */
export function useProfileCompletion() {
  const user = useCurrentUser();
  const { setFields } = useProfileCompletionStore();

  useEffect(() => {
    if (!user) return;

    setFields([
      {
        id: "avatar",
        label: "Profile Avatar",
        description: "Add a profile picture to make your profile memorable",
        link: "/profile#avatar",
        filled: !!user.avatarUrl,
        importance: "high",
      },
      {
        id: "displayName",
        label: "Display Name",
        description: "Set a professional display name for your profile",
        link: "/profile#displayName",
        filled: !!user.displayName,
        importance: "high",
      },
      {
        id: "bio",
        label: "Bio",
        description:
          "Write a short bio to help supporters understand what you do",
        link: "/profile#bio",
        filled: false, // Would need to fetch from profile data
        importance: "high",
      },
      {
        id: "tags",
        label: "Tags & Categories",
        description:
          "Add tags to improve discoverability and help supporters find you",
        link: "/profile#tags",
        filled: false, // Would need to fetch from profile data
        importance: "medium",
      },
      {
        id: "website",
        label: "Website or Portfolio",
        description: "Link to your personal website or portfolio",
        link: "/profile#website",
        filled: false, // Would need to fetch from profile data
        importance: "medium",
      },
      {
        id: "social",
        label: "Social Links",
        description: "Connect your social media profiles",
        link: "/profile#social",
        filled: false, // Would need to fetch from profile data
        importance: "low",
      },
    ]);
  }, [user, setFields]);
}
