"use client";

import Link from "next/link";
import Image from "next/image";
import { useRecommendations } from "@/hooks/useRecommendations";
import { generateAvatarUrl } from "@/utils/imageUtils";

interface RecommendedCreatorsProps {
  /** Creator to exclude (e.g. the one currently being viewed) */
  excludeUsername?: string;
  limit?: number;
}

export function RecommendedCreators({ excludeUsername, limit = 6 }: RecommendedCreatorsProps) {
  const { recommendations, isPersonalised, isLoading, isError, trackInteraction, resetPreferences } =
    useRecommendations(limit, excludeUsername);

  return (
    <section aria-labelledby="recommendations-heading" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 id="recommendations-heading" className="text-xl font-semibold text-ink">
            Recommended Creators
          </h2>
          <p className="mt-0.5 text-xs text-ink/50">
            {isPersonalised
              ? "Personalised based on your activity — all data stays on your device."
              : "Showing popular creators. Your recommendations improve as you explore."}
          </p>
        </div>

        {isPersonalised && (
          <button
            type="button"
            onClick={resetPreferences}
            aria-label="Reset personalisation preferences"
            className="rounded-lg border border-ink/15 px-3 py-1.5 text-xs text-ink/50 transition-colors hover:border-error/40 hover:text-error"
          >
            Reset preferences
          </button>
        )}
      </div>

      {/* Loading skeletons */}
      {isLoading && (
        <ul
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          aria-busy="true"
          aria-label="Loading recommendations"
        >
          {Array.from({ length: limit }).map((_, i) => (
            <li
              key={i}
              className="h-24 animate-pulse rounded-2xl border border-ink/10 bg-ink/5"
            />
          ))}
        </ul>
      )}

      {isError && (
        <p
          role="alert"
          className="rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error"
        >
          Could not load recommendations.
        </p>
      )}

      {!isLoading && !isError && (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((creator) => (
            <li key={creator.username}>
              <Link
                href={`/creator/${creator.username}`}
                onClick={() =>
                  trackInteraction("click", creator.username, creator.category)
                }
                className="group flex items-start gap-3 rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4 transition hover:border-wave/40 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50"
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
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
