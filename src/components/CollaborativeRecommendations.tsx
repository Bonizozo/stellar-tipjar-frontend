"use client";

import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, X } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { generateAvatarUrl } from "@/utils/imageUtils";
import {
  recordFeedback,
  clearAffinityProfile,
  clearFeedback,
  type FeedbackType,
  type ScoredCreator,
} from "@/utils/mlModel";
import { getCFRecommendations } from "@/services/cfRecommendationService";

interface CollaborativeRecommendationsProps {
  excludeUsername?: string;
  limit?: number;
}

export function CollaborativeRecommendations({
  excludeUsername,
  limit = 6,
}: CollaborativeRecommendationsProps) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cf-recommendations", excludeUsername, limit],
    queryFn: () => getCFRecommendations(limit, excludeUsername),
    staleTime: 2 * 60 * 1000,
  });

  const handleFeedback = useCallback(
    (username: string, category: string, feedback: FeedbackType) => {
      recordFeedback({ creatorUsername: username, feedback, timestamp: Date.now() });
      queryClient.invalidateQueries({ queryKey: ["cf-recommendations"] });
    },
    [queryClient],
  );

  const handleReset = useCallback(() => {
    clearAffinityProfile();
    clearFeedback();
    queryClient.invalidateQueries({ queryKey: ["cf-recommendations"] });
  }, [queryClient]);

  return (
    <section aria-labelledby="cf-recommendations-heading" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 id="cf-recommendations-heading" className="text-xl font-semibold text-ink">
            Recommended For You
          </h2>
          <p className="mt-0.5 text-xs text-ink/50">
            {data?.isPersonalised
              ? "Personalised using collaborative filtering — all data stays on your device."
              : "Showing popular creators. Recommendations improve as you explore."}
          </p>
        </div>

        {data?.isPersonalised && (
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset recommendation preferences"
            className="rounded-lg border border-ink/15 px-3 py-1.5 text-xs text-ink/50 transition-colors hover:border-semantic-error/40 hover:text-semantic-error"
          >
            Reset preferences
          </button>
        )}
      </div>

      {isLoading && (
        <ul
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          aria-busy="true"
          aria-label="Loading recommendations"
        >
          {Array.from({ length: limit }).map((_, i) => (
            <li key={i} className="h-28 animate-pulse rounded-2xl border border-ink/10 bg-ink/5" />
          ))}
        </ul>
      )}

      {isError && (
        <p
          role="alert"
          className="rounded-xl border border-semantic-error/30 bg-semantic-error/5 px-4 py-3 text-sm text-semantic-error"
        >
          Could not load recommendations.
        </p>
      )}

      {!isLoading && !isError && (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data?.creators.map((creator: ScoredCreator) => (
            <li
              key={creator.username}
              className="group relative flex items-start gap-3 rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4 transition hover:border-wave/40 hover:shadow-card"
            >
              <Link
                href={`/creator/${creator.username}`}
                className="flex flex-1 items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50 rounded-xl"
                aria-label={`View ${creator.displayName}'s profile`}
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-ink/5">
                  <Image
                    src={generateAvatarUrl(creator.username)}
                    alt={`Avatar for ${creator.displayName}`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wide text-wave">{creator.category}</p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-ink group-hover:text-wave">
                    {creator.displayName}
                  </p>
                  <p className="mt-1 truncate text-xs text-ink/50">{creator.reason}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-medium text-ink">
                    {creator.followers.toLocaleString()}
                  </p>
                  <p className="text-xs text-ink/40">followers</p>
                </div>
              </Link>

              {/* Feedback buttons */}
              <div className="flex flex-col gap-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => handleFeedback(creator.username, creator.category, "like")}
                  aria-label={`Like ${creator.displayName}`}
                  className="rounded-lg p-1 text-ink/30 hover:text-semantic-success hover:bg-semantic-success/10 transition-colors"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleFeedback(creator.username, creator.category, "dislike")}
                  aria-label={`Dislike ${creator.displayName}`}
                  className="rounded-lg p-1 text-ink/30 hover:text-semantic-error hover:bg-semantic-error/10 transition-colors"
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleFeedback(creator.username, creator.category, "not_interested")}
                  aria-label={`Not interested in ${creator.displayName}`}
                  className="rounded-lg p-1 text-ink/30 hover:text-ink/60 hover:bg-ink/10 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
