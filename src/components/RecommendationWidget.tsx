"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  getContentRecommendations,
  trackUserPreference,
  type RecommendationWidget as WidgetType,
  type RecommendationResult,
} from "@/services/recommendationEngineService";
import { generateAvatarUrl } from "@/utils/imageUtils";
import { recordFeedback, type FeedbackType } from "@/utils/mlModel";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import {
  ThumbsUp,
  ThumbsDown,
  X,
  TrendingUp,
  Sparkles,
  Users,
  Clock,
  RefreshCw,
} from "lucide-react";

interface RecommendationWidgetProps {
  userId?: string;
  excludeUsername?: string;
  limit?: number;
  className?: string;
}

const WIDGET_ICONS: Record<string, React.ReactNode> = {
  trending: <TrendingUp className="h-4 w-4" />,
  personalized: <Sparkles className="h-4 w-4" />,
  "similar-creators": <Users className="h-4 w-4" />,
  "category-picks": <Sparkles className="h-4 w-4" />,
  "recently-active": <Clock className="h-4 w-4" />,
};

export function RecommendationWidget({
  userId,
  excludeUsername,
  limit = 6,
  className = "",
}: RecommendationWidgetProps) {
  const queryClient = useQueryClient();
  const [activeWidget, setActiveWidget] = useState<string>("trending");

  const { data, isLoading, isError, refetch } = useQuery<RecommendationResult>({
    queryKey: ["content-recommendations", userId, excludeUsername, limit],
    queryFn: () =>
      getContentRecommendations({ userId, excludeUsername, limit }),
    staleTime: 5 * 60 * 1000,
  });

  const handleFeedback = useCallback(
    (username: string, category: string, feedback: FeedbackType) => {
      recordFeedback({
        creatorUsername: username,
        feedback,
        timestamp: Date.now(),
      });
      if (feedback === "like") {
        trackUserPreference(category, 1);
      }
      queryClient.invalidateQueries({
        queryKey: ["content-recommendations"],
      });
    },
    [queryClient]
  );

  const currentWidget = data?.widgets.find((w) => w.id === activeWidget);
  const isPersonalised = data?.isPersonalised ?? false;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">
            Discover Creators
          </h2>
          <p className="mt-0.5 text-xs text-ink/50">
            {isPersonalised
              ? "Personalized recommendations based on your activity"
              : "Explore popular creators and content"}
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => refetch()}
          className="inline-flex items-center gap-1.5"
          aria-label="Refresh recommendations"
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          Refresh
        </Button>
      </div>

      {/* Widget tabs */}
      {data?.widgets && data.widgets.length > 1 && (
        <div
          className="flex gap-1 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Recommendation categories"
        >
          {data.widgets.map((widget) => (
            <button
              key={widget.id}
              role="tab"
              aria-selected={activeWidget === widget.id}
              onClick={() => setActiveWidget(widget.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                activeWidget === widget.id
                  ? "bg-wave text-white"
                  : "bg-ink/5 text-ink/60 hover:bg-ink/10 hover:text-ink"
              }`}
            >
              {WIDGET_ICONS[widget.type]}
              {widget.title}
            </button>
          ))}
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          aria-busy="true"
          aria-label="Loading recommendations"
        >
          {Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl border border-ink/10 bg-ink/5"
            />
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div
          role="alert"
          className="rounded-xl border border-semantic-error/30 bg-semantic-error/5 px-4 py-3 text-sm text-semantic-error"
        >
          Could not load recommendations.{" "}
          <button
            type="button"
            onClick={() => refetch()}
            className="underline font-medium hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Recommendations grid */}
      {!isLoading && !isError && currentWidget && (
        <div
          role="tabpanel"
          aria-label={currentWidget.title}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {currentWidget.creators.map((creator, index) => (
            <motion.div
              key={creator.username}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
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
                  <p className="text-xs uppercase tracking-wide text-wave">
                    {creator.category}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-ink group-hover:text-wave">
                    {creator.displayName}
                  </p>
                  <p className="mt-1 truncate text-xs text-ink/50">
                    {creator.reason}
                  </p>
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
                  onClick={() =>
                    handleFeedback(creator.username, creator.category, "like")
                  }
                  aria-label={`Like ${creator.displayName}`}
                  className="rounded-lg p-1 text-ink/30 hover:text-semantic-success hover:bg-semantic-success/10 transition-colors"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleFeedback(
                      creator.username,
                      creator.category,
                      "dislike"
                    )
                  }
                  aria-label={`Dislike ${creator.displayName}`}
                  className="rounded-lg p-1 text-ink/30 hover:text-semantic-error hover:bg-semantic-error/10 transition-colors"
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleFeedback(
                      creator.username,
                      creator.category,
                      "not_interested"
                    )
                  }
                  aria-label={`Not interested in ${creator.displayName}`}
                  className="rounded-lg p-1 text-ink/30 hover:text-ink/60 hover:bg-ink/10 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* A/B test variant badge */}
      {data?.variant && (
        <div className="text-center">
          <Badge variant="default" className="text-[10px] uppercase tracking-wider">
            Variant: {data.variant}
          </Badge>
        </div>
      )}
    </div>
  );
}
