/**
 * recommendationService.ts
 *
 * Fetches creator candidates from the API (with mock fallback),
 * then scores them client-side using the local affinity model.
 * No user data ever leaves the browser.
 */

import { scoreCreators, loadAffinityProfile, type ScoredCreator } from "@/utils/mlModel";

// Re-use the same candidate pool as the explore page
const CANDIDATE_POOL: {
  username: string;
  displayName: string;
  category: string;
  followers: number;
}[] = [
  { username: "alice", displayName: "Alice", category: "art", followers: 1250 },
  { username: "stellar-dev", displayName: "Stellar Dev", category: "tech", followers: 3400 },
  { username: "pixelmaker", displayName: "Pixel Maker", category: "art", followers: 890 },
  { username: "community-lab", displayName: "Community Lab", category: "community", followers: 2100 },
  { username: "crypto-artist", displayName: "Crypto Artist", category: "art", followers: 1800 },
  { username: "blockchain-edu", displayName: "Blockchain Edu", category: "education", followers: 2900 },
  { username: "nft-creator", displayName: "NFT Creator", category: "art", followers: 4200 },
  { username: "defi-expert", displayName: "DeFi Expert", category: "tech", followers: 3100 },
  { username: "web3-builder", displayName: "Web3 Builder", category: "tech", followers: 2700 },
  { username: "dao-organizer", displayName: "DAO Organizer", category: "community", followers: 1950 },
  { username: "smart-contract-dev", displayName: "Smart Contract Dev", category: "tech", followers: 3800 },
  { username: "digital-artist", displayName: "Digital Artist", category: "art", followers: 2300 },
  { username: "crypto-educator", displayName: "Crypto Educator", category: "education", followers: 3500 },
  { username: "protocol-dev", displayName: "Protocol Dev", category: "tech", followers: 4100 },
  { username: "generative-artist", displayName: "Generative Artist", category: "art", followers: 2600 },
];

export interface RecommendationResult {
  creators: ScoredCreator[];
  /** Whether the results are personalised or just popularity-ranked */
  isPersonalised: boolean;
}

/**
 * Returns up to `limit` recommended creators.
 * Excludes `excludeUsername` (e.g. the currently viewed creator).
 */
export async function getRecommendations(
  limit = 6,
  excludeUsername?: string,
): Promise<RecommendationResult> {
  // In production, swap this with a real API call to fetch candidates.
  const candidates = CANDIDATE_POOL.filter((c) => c.username !== excludeUsername);

  const profile = loadAffinityProfile();
  const hasHistory =
    Object.keys(profile.categoryScores).length > 0 ||
    Object.keys(profile.creatorInteractions).length > 0;

  const scored = scoreCreators(candidates, profile);

  return {
    creators: scored.slice(0, limit),
    isPersonalised: hasHistory,
  };
}
