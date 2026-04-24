"use client";

import { useEffect } from "react";
import { RecommendedCreators } from "@/components/RecommendedCreators";
import { useRecommendations } from "@/hooks/useRecommendations";

interface CreatorPageRecommendationsProps {
  username: string;
  category?: string;
}

export function CreatorPageRecommendations({ username, category }: CreatorPageRecommendationsProps) {
  const { trackInteraction } = useRecommendations(0, username);

  // Record a view event when the creator profile is loaded
  useEffect(() => {
    trackInteraction("view", username, category);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return <RecommendedCreators excludeUsername={username} limit={3} />;
}
