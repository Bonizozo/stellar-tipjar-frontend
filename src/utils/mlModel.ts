/**
 * mlModel.ts
 *
 * Privacy-first, client-side collaborative filtering model.
 * All preference data stays in localStorage — nothing is sent to a server.
 *
 * Algorithm: lightweight TF-IDF-style category affinity scoring combined
 * with interaction-weighted creator scoring.
 */

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

const STORAGE_KEY = "stj_affinity_profile";
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

export function loadAffinityProfile(): AffinityProfile {
  if (typeof window === "undefined") {
    return { categoryScores: {}, creatorInteractions: {}, lastUpdated: 0 };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AffinityProfile;
  } catch {
    // corrupted storage — start fresh
  }
  return { categoryScores: {}, creatorInteractions: {}, lastUpdated: 0 };
}

export function saveAffinityProfile(profile: AffinityProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // storage quota exceeded — silently skip
  }
}

export function clearAffinityProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
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
