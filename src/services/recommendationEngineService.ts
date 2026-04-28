/**
 * recommendationEngineService.ts
 *
 * Content recommendation engine that suggests creators and content
 * based on user behavior, preferences, and collaborative filtering.
 * Supports A/B testing and personalization.
 */

import { loadAffinityProfile, scoreCreators, type ScoredCreator } from "@/utils/mlModel";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface UserPreference {
  category: string;
  weight: number;
  lastInteracted: number;
}

export interface RecommendationContext {
  userId?: string;
  excludeUsername?: string;
  limit?: number;
  /** A/B test variant identifier */
  variant?: "control" | "personalized" | "hybrid";
}

export interface RecommendationWidget {
  id: string;
  title: string;
  type: "trending" | "personalized" | "similar-creators" | "category-picks" | "recently-active";
  creators: ScoredCreator[];
}

export interface RecommendationResult {
  widgets: RecommendationWidget[];
  isPersonalised: boolean;
  variant: string;
  trackingId: string;
}

// ─── Candidate Pool ──────────────────────────────────────────────────────────

const CANDIDATE_POOL: {
  username: string;
  displayName: string;
  category: string;
  followers: number;
  tags: string[];
  recentActivity: number;
}[] = [
  { username: "alice", displayName: "Alice", category: "art", followers: 1250, tags: ["digital", "painting"], recentActivity: Date.now() - 3600_000 },
  { username: "stellar-dev", displayName: "Stellar Dev", category: "tech", followers: 3400, tags: ["blockchain", "stellar"], recentActivity: Date.now() - 7200_000 },
  { username: "pixelmaker", displayName: "Pixel Maker", category: "art", followers: 890, tags: ["pixel", "retro"], recentActivity: Date.now() - 86400_000 },
  { username: "community-lab", displayName: "Community Lab", category: "community", followers: 2100, tags: ["dao", "governance"], recentActivity: Date.now() - 1800_000 },
  { username: "crypto-artist", displayName: "Crypto Artist", category: "art", followers: 1800, tags: ["nft", "generative"], recentActivity: Date.now() - 43200_000 },
  { username: "blockchain-edu", displayName: "Blockchain Edu", category: "education", followers: 2900, tags: ["tutorial", "web3"], recentActivity: Date.now() - 300_000 },
  { username: "nft-creator", displayName: "NFT Creator", category: "art", followers: 4200, tags: ["nft", "collectible"], recentActivity: Date.now() - 600_000 },
  { username: "defi-expert", displayName: "DeFi Expert", category: "tech", followers: 3100, tags: ["defi", "yield"], recentActivity: Date.now() - 14400_000 },
  { username: "web3-builder", displayName: "Web3 Builder", category: "tech", followers: 2700, tags: ["dapp", "solidity"], recentActivity: Date.now() - 900_000 },
  { username: "dao-organizer", displayName: "DAO Organizer", category: "community", followers: 1950, tags: ["dao", "community"], recentActivity: Date.now() - 28800_000 },
  { username: "smart-contract-dev", displayName: "Smart Contract Dev", category: "tech", followers: 3800, tags: ["solidity", "audit"], recentActivity: Date.now() - 7200_000 },
  { username: "digital-artist", displayName: "Digital Artist", category: "art", followers: 2300, tags: ["illustration", "design"], recentActivity: Date.now() - 3600_000 },
  { username: "crypto-educator", displayName: "Crypto Educator", category: "education", followers: 3500, tags: ["beginner", "guide"], recentActivity: Date.now() - 1500_000 },
  { username: "protocol-dev", displayName: "Protocol Dev", category: "tech", followers: 4100, tags: ["protocol", "infra"], recentActivity: Date.now() - 21600_000 },
  { username: "generative-artist", displayName: "Generative Artist", category: "art", followers: 2600, tags: ["generative", "ai"], recentActivity: Date.now() - 43200_000 },
];

// ─── Preference Tracking ─────────────────────────────────────────────────────

const USER_PREFERENCES_KEY = "recommendation_preferences";

export function loadUserPreferences(): UserPreference[] {
  try {
    const raw = localStorage.getItem(USER_PREFERENCES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUserPreferences(prefs: UserPreference[]): void {
  try {
    localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(prefs));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function trackUserPreference(category: string, weight: number = 1): void {
  const prefs = loadUserPreferences();
  const existing = prefs.find((p) => p.category === category);
  if (existing) {
    existing.weight = Math.min(10, existing.weight + weight);
    existing.lastInteracted = Date.now();
  } else {
    prefs.push({ category, weight, lastInteracted: Date.now() });
  }
  saveUserPreferences(prefs);
}

// ─── A/B Testing ─────────────────────────────────────────────────────────────

function getABVariant(userId?: string): "control" | "personalized" | "hybrid" {
  if (!userId) return "personalized";
  // Deterministic assignment based on user ID hash
  const hash = userId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const variants: ("control" | "personalized" | "hybrid")[] = [
    "control",
    "personalized",
    "hybrid",
  ];
  return variants[hash % variants.length];
}

// ─── Scoring Strategies ──────────────────────────────────────────────────────

function scoreByTrending(
  candidates: typeof CANDIDATE_POOL,
  limit: number,
  excludeUsername?: string
): ScoredCreator[] {
  return candidates
    .filter((c) => c.username !== excludeUsername)
    .sort((a, b) => b.followers - a.followers)
    .slice(0, limit)
    .map((c) => ({
      username: c.username,
      displayName: c.displayName,
      category: c.category,
      followers: c.followers,
      reason: "Trending creator",
      score: c.followers,
    }));
}

function scoreByPersonalized(
  candidates: typeof CANDIDATE_POOL,
  limit: number,
  excludeUsername?: string
): ScoredCreator[] {
  const profile = loadAffinityProfile();
  const hasHistory =
    Object.keys(profile.categoryScores).length > 0 ||
    Object.keys(profile.creatorInteractions).length > 0;

  const filtered = candidates.filter((c) => c.username !== excludeUsername);
  const scored = scoreCreators(
    filtered.map((c) => ({
      username: c.username,
      displayName: c.displayName,
      category: c.category,
      followers: c.followers,
    })),
    profile
  );

  return scored.slice(0, limit).map((s) => ({
    ...s,
    reason: hasHistory ? "Recommended for you" : "Popular creator",
  }));
}

function scoreByHybrid(
  candidates: typeof CANDIDATE_POOL,
  limit: number,
  excludeUsername?: string
): ScoredCreator[] {
  const profile = loadAffinityProfile();
  const prefs = loadUserPreferences();
  const hasHistory =
    Object.keys(profile.categoryScores).length > 0 || prefs.length > 0;

  const filtered = candidates.filter((c) => c.username !== excludeUsername);

  // Blend: 60% personalized score + 40% popularity/recent activity
  const scored = filtered.map((c) => {
    const affinityScore = hasHistory
      ? (profile.categoryScores[c.category] ?? 0) +
        (profile.creatorInteractions[c.username] ?? 0) * 2
      : 0;

    const prefBoost = prefs
      .filter((p) => p.category === c.category)
      .reduce((sum, p) => sum + p.weight * 0.5, 0);

    const popularityScore = c.followers / 1000;
    const recencyScore = Math.max(0, 1 - (Date.now() - c.recentActivity) / (7 * 86400_000));

    const totalScore =
      affinityScore * 0.3 +
      prefBoost * 0.3 +
      popularityScore * 0.25 +
      recencyScore * 0.15;

    return {
      username: c.username,
      displayName: c.displayName,
      category: c.category,
      followers: c.followers,
      reason: hasHistory ? "Personalized pick" : "Popular creator",
      score: totalScore,
    };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}

// ─── Widget Generators ───────────────────────────────────────────────────────

function generateWidgets(
  candidates: typeof CANDIDATE_POOL,
  variant: "control" | "personalized" | "hybrid",
  limit: number,
  excludeUsername?: string
): RecommendationWidget[] {
  const widgets: RecommendationWidget[] = [];

  // Trending widget
  widgets.push({
    id: "trending",
    title: "Trending Creators",
    type: "trending",
    creators: scoreByTrending(candidates, limit, excludeUsername),
  });

  // Personalized / Hybrid widget
  if (variant === "personalized") {
    widgets.push({
      id: "personalized",
      title: "Recommended For You",
      type: "personalized",
      creators: scoreByPersonalized(candidates, limit, excludeUsername),
    });
  } else if (variant === "hybrid") {
    widgets.push({
      id: "hybrid",
      title: "Top Picks",
      type: "similar-creators",
      creators: scoreByHybrid(candidates, limit, excludeUsername),
    });
  }

  // Category picks widget
  const categories = [...new Set(candidates.map((c) => c.category))];
  const topCategory = categories[0];
  if (topCategory) {
    const categoryCreators = candidates
      .filter((c) => c.category === topCategory && c.username !== excludeUsername)
      .sort((a, b) => b.followers - a.followers)
      .slice(0, limit)
      .map((c) => ({
        username: c.username,
        displayName: c.displayName,
        category: c.category,
        followers: c.followers,
        reason: `Top in ${topCategory}`,
        score: c.followers,
      }));
    widgets.push({
      id: "category-picks",
      title: `Popular in ${topCategory}`,
      type: "category-picks",
      creators: categoryCreators,
    });
  }

  // Recently active widget
  const activeCreators = candidates
    .filter((c) => c.username !== excludeUsername)
    .sort((a, b) => b.recentActivity - a.recentActivity)
    .slice(0, limit)
    .map((c) => ({
      username: c.username,
      displayName: c.displayName,
      category: c.category,
      followers: c.followers,
      reason: "Recently active",
      score: c.followers,
    }));
  widgets.push({
    id: "recently-active",
    title: "Recently Active",
    type: "recently-active",
    creators: activeCreators,
  });

  return widgets;
}

// ─── Main API ────────────────────────────────────────────────────────────────

/**
 * Get content recommendations with A/B testing support.
 */
export async function getContentRecommendations(
  context: RecommendationContext = {}
): Promise<RecommendationResult> {
  const {
    userId,
    excludeUsername,
    limit = 6,
    variant: forcedVariant,
  } = context;

  const variant = forcedVariant ?? getABVariant(userId);
  const candidates = CANDIDATE_POOL;
  const widgets = generateWidgets(candidates, variant, limit, excludeUsername);

  const profile = loadAffinityProfile();
  const prefs = loadUserPreferences();
  const isPersonalised =
    Object.keys(profile.categoryScores).length > 0 || prefs.length > 0;

  return {
    widgets,
    isPersonalised,
    variant,
    trackingId: `rec-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  };
}

/**
 * Get similar creators based on category affinity.
 */
export async function getSimilarCreators(
  category: string,
  excludeUsername?: string,
  limit: number = 4
): Promise<ScoredCreator[]> {
  const candidates = CANDIDATE_POOL.filter(
    (c) => c.category === category && c.username !== excludeUsername
  );
  return candidates
    .sort((a, b) => b.followers - a.followers)
    .slice(0, limit)
    .map((c) => ({
      username: c.username,
      displayName: c.displayName,
      category: c.category,
      followers: c.followers,
      reason: `Similar to ${category} creators`,
      score: c.followers,
    }));
}
