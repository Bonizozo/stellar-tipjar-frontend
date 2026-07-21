/**
 * mlModel.ts
 *
 * Privacy-first, client-side collaborative filtering model.
 * All preference data stays in namespaced storage — nothing is sent to a server.
 *
 * Algorithm: lightweight TF-IDF-style category affinity scoring combined
 * with interaction-weighted creator scoring.
 */

import { createNamespacedStorage } from "@/lib/storage";
import { z } from "zod";

export interface InteractionEvent {
  type: "view" | "tip" | "search" | "click";
  creatorUsername: string;
  category?: string;
  /** Unix ms */
  timestamp: number;
}

export interface AffinityProfile {
  /** category → score (0–1) */
  categoryScores: Record<string, number>;
  /** creator username → interaction count */
  creatorInteractions: Record<string, number>;
  lastUpdated: number;
}

const mlStorage = createNamespacedStorage("ml");

const DECAY_HALF_LIFE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/** Exponential time-decay weight so recent interactions matter more */
function decayWeight(timestampMs: number): number {
  const age = Date.now() - timestampMs;
  return Math.pow(0.5, age / DECAY_HALF_LIFE_MS);
}

const EVENT_WEIGHTS: Record<InteractionEvent["type"], number> = {
  view: 1,
  click: 2,
  search: 1.5,
  tip: 5,
};

const affinityProfileSchema = z.object({
  categoryScores: z.record(z.number()),
  creatorInteractions: z.record(z.number()),
  lastUpdated: z.number(),
});

export function loadAffinityProfile(): AffinityProfile {
  const defaultProfile: AffinityProfile = {
    categoryScores: {},
    creatorInteractions: {},
    lastUpdated: 0,
  };

  return (
    mlStorage.get<AffinityProfile>("affinity", {
      schema: affinityProfileSchema,
      legacyKey: "stj_affinity_profile",
    }) ?? defaultProfile
  );
}

export function saveAffinityProfile(profile: AffinityProfile): void {
  mlStorage.set("affinity", profile);
}

export function clearAffinityProfile(): void {
  mlStorage.remove("affinity");
}

/** Record a new interaction and update the stored affinity profile */
export function recordInteraction(event: InteractionEvent): AffinityProfile {
  const profile = loadAffinityProfile();
  const weight = EVENT_WEIGHTS[event.type] * decayWeight(event.timestamp);

  // Update category affinity
  if (event.category) {
    profile.categoryScores[event.category] =
      (profile.categoryScores[event.category] ?? 0) + weight;
  }

  // Update per-creator interaction count
  profile.creatorInteractions[event.creatorUsername] =
    (profile.creatorInteractions[event.creatorUsername] ?? 0) + weight;

  profile.lastUpdated = Date.now();
  saveAffinityProfile(profile);
  return profile;
}

export interface ScoredCreator {
  username: string;
  displayName: string;
  category: string;
  followers: number;
  score: number;
  reason: string;
}

/**
 * Score a list of candidates against the user's affinity profile.
 * Returns them sorted by descending relevance score.
 */
export function scoreCreators(
  candidates: { username: string; displayName: string; category: string; followers: number }[],
  profile: AffinityProfile,
): ScoredCreator[] {
  const maxFollowers = Math.max(...candidates.map((c) => c.followers), 1);

  // Normalise category scores to 0–1
  const maxCat = Math.max(...Object.values(profile.categoryScores), 1);
  const maxInteraction = Math.max(...Object.values(profile.creatorInteractions), 1);

  return candidates
    .map((c) => {
      const catScore = ((profile.categoryScores[c.category] ?? 0) / maxCat) * 0.5;
      const interactionScore =
        ((profile.creatorInteractions[c.username] ?? 0) / maxInteraction) * 0.3;
      const popularityScore = (c.followers / maxFollowers) * 0.2;

      const score = catScore + interactionScore + popularityScore;

      let reason = "Popular in the community";
      if (catScore > 0.3) reason = `Matches your interest in ${c.category}`;
      else if (interactionScore > 0.2) reason = "You've interacted with them before";
      else if (popularityScore > 0.15) reason = "Trending creator";

      return { ...c, score, reason };
    })
    .sort((a, b) => b.score - a.score);
}

// ─── Collaborative Filtering Extension (Issue #316) ──────────────────────────

export type FeedbackType = "like" | "dislike" | "not_interested";

export interface FeedbackEntry {
  creatorUsername: string;
  feedback: FeedbackType;
  timestamp: number;
}

export function loadFeedback(): FeedbackEntry[] {
  return mlStorage.get<FeedbackEntry[]>("feedback", {
    schema: z.array(
      z.object({
        creatorUsername: z.string(),
        feedback: z.enum(["like", "dislike", "not_interested"]),
        timestamp: z.number(),
      }),
    ),
    legacyKey: "stj_cf_feedback",
  }) ?? [];
}

export function recordFeedback(entry: FeedbackEntry): void {
  const existing = loadFeedback().filter(
    (f) => f.creatorUsername !== entry.creatorUsername,
  );
  mlStorage.set("feedback", [...existing, entry]);
}

export function clearFeedback(): void {
  mlStorage.remove("feedback");
}

/**
 * Cosine similarity between two category-score vectors.
 * Used to find creators whose audience profile is similar to the user's affinity.
 */
export function cosineSimilarity(
  a: Record<string, number>,
  b: Record<string, number>,
): number {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (const k of keys) {
    const va = a[k] ?? 0;
    const vb = b[k] ?? 0;
    dot += va * vb;
    magA += va * va;
    magB += vb * vb;
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * Extended scoring that incorporates collaborative filtering similarity scores
 * and applies feedback penalties/boosts.
 */
export function scoreCreatorsWithCF(
  candidates: {
    username: string;
    displayName: string;
    category: string;
    followers: number;
    /** Optional per-creator category affinity vector (from server/mock data) */
    categoryVector?: Record<string, number>;
  }[],
  profile: AffinityProfile,
): ScoredCreator[] {
  const feedback = loadFeedback();
  const feedbackMap = new Map(feedback.map((f) => [f.creatorUsername, f.feedback]));

  const maxFollowers = Math.max(...candidates.map((c) => c.followers), 1);
  const maxCat = Math.max(...Object.values(profile.categoryScores), 1);
  const maxInteraction = Math.max(...Object.values(profile.creatorInteractions), 1);

  // Normalise user profile vector
  const normProfile: Record<string, number> = {};
  for (const [k, v] of Object.entries(profile.categoryScores)) {
    normProfile[k] = v / maxCat;
  }

  return candidates
    .filter((c) => feedbackMap.get(c.username) !== "not_interested")
    .map((c) => {
      const catScore = ((profile.categoryScores[c.category] ?? 0) / maxCat) * 0.4;
      const interactionScore =
        ((profile.creatorInteractions[c.username] ?? 0) / maxInteraction) * 0.25;
      const popularityScore = (c.followers / maxFollowers) * 0.15;

      // Collaborative filtering: cosine similarity between user affinity and creator vector
      const cfScore = c.categoryVector
        ? cosineSimilarity(normProfile, c.categoryVector) * 0.2
        : 0;

      // Feedback adjustment
      const fb = feedbackMap.get(c.username);
      const feedbackBoost = fb === "like" ? 0.15 : fb === "dislike" ? -0.3 : 0;

      const score = catScore + interactionScore + popularityScore + cfScore + feedbackBoost;

      let reason = "Popular in the community";
      if (cfScore > 0.1) reason = "Similar to creators you enjoy";
      else if (catScore > 0.25) reason = `Matches your interest in ${c.category}`;
      else if (interactionScore > 0.15) reason = "You've interacted with them before";
      else if (popularityScore > 0.12) reason = "Trending creator";
      if (fb === "like") reason += " · You liked this creator";

      return { ...c, score, reason };
    })
    .sort((a, b) => b.score - a.score);
}
