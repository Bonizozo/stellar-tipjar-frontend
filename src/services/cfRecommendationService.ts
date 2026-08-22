/**
 * cfRecommendationService.ts
 *
 * Collaborative filtering recommendation service (Issue #316).
 * Extends the base recommendation service with cosine similarity scoring
 * using per-creator category vectors.
 */

import { loadAffinityProfile, scoreCreatorsWithCF, type ScoredCreator } from "@/utils/mlModel";

interface CFCandidate {
  username: string;
  displayName: string;
  category: string;
  followers: number;
  /** Category affinity vector — used for cosine similarity */
  categoryVector: Record<string, number>;
}

// Mock candidate pool with category vectors for CF scoring
const CF_CANDIDATE_POOL: CFCandidate[] = [
  { username: "alice", displayName: "Alice", category: "art", followers: 1250, categoryVector: { art: 0.9, design: 0.6 } },
  { username: "stellar-dev", displayName: "Stellar Dev", category: "tech", followers: 3400, categoryVector: { tech: 0.95, education: 0.4 } },
  { username: "pixelmaker", displayName: "Pixel Maker", category: "art", followers: 890, categoryVector: { art: 0.85, gaming: 0.5 } },
  { username: "community-lab", displayName: "Community Lab", category: "community", followers: 2100, categoryVector: { community: 0.9, education: 0.5 } },
  { username: "crypto-artist", displayName: "Crypto Artist", category: "art", followers: 1800, categoryVector: { art: 0.8, tech: 0.4 } },
  { username: "blockchain-edu", displayName: "Blockchain Edu", category: "education", followers: 2900, categoryVector: { education: 0.9, tech: 0.7 } },
  { username: "nft-creator", displayName: "NFT Creator", category: "art", followers: 4200, categoryVector: { art: 0.75, tech: 0.5, community: 0.3 } },
  { username: "defi-expert", displayName: "DeFi Expert", category: "tech", followers: 3100, categoryVector: { tech: 0.9, education: 0.6 } },
  { username: "web3-builder", displayName: "Web3 Builder", category: "tech", followers: 2700, categoryVector: { tech: 0.85, community: 0.4 } },
  { username: "dao-organizer", displayName: "DAO Organizer", category: "community", followers: 1950, categoryVector: { community: 0.85, tech: 0.45 } },
  { username: "smart-contract-dev", displayName: "Smart Contract Dev", category: "tech", followers: 3800, categoryVector: { tech: 1.0, education: 0.3 } },
  { username: "digital-artist", displayName: "Digital Artist", category: "art", followers: 2300, categoryVector: { art: 0.9, design: 0.7 } },
  { username: "crypto-educator", displayName: "Crypto Educator", category: "education", followers: 3500, categoryVector: { education: 0.95, tech: 0.6 } },
  { username: "protocol-dev", displayName: "Protocol Dev", category: "tech", followers: 4100, categoryVector: { tech: 0.95, education: 0.2 } },
  { username: "generative-artist", displayName: "Generative Artist", category: "art", followers: 2600, categoryVector: { art: 0.8, tech: 0.6, design: 0.5 } },
];

export interface CFRecommendationResult {
  creators: ScoredCreator[];
  isPersonalised: boolean;
}

export async function getCFRecommendations(
  limit = 6,
  excludeUsername?: string,
): Promise<CFRecommendationResult> {
  const candidates = CF_CANDIDATE_POOL.filter((c) => c.username !== excludeUsername);
  const profile = loadAffinityProfile();

  const hasHistory =
    Object.keys(profile.categoryScores).length > 0 ||
    Object.keys(profile.creatorInteractions).length > 0;

  const scored = scoreCreatorsWithCF(candidates, profile);

  return {
    creators: scored.slice(0, limit),
    isPersonalised: hasHistory,
  };
}
