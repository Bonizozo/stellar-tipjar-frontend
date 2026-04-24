export const CATEGORIES = [
  'art',
  'tech',
  'community',
  'education',
  'music',
  'gaming',
  'crypto',
  'nft',
  'defi',
  'dao',
] as const;

export type Category = typeof CATEGORIES[number];

export const TAGS_EXAMPLES = [
  'web3', 'solidity', 'rust', 'typescript', 'nft-art', 'generative-art',
  'defi', 'yield-farming', 'liquidity-pool', 'staking',
  'dao-governance', 'tokenomics', 'airdrop', 'community-call',
  'stellar', 'xlm', 'soroban', 'blockchain', 'decentralized',
  'pixel-art', '3d-modeling', 'animation', 'digital-art',
  'crypto-music', 'nft-music', 'royalties', 'streaming',
  'esports', 'game-dev', 'blockchain-game', 'play-to-earn',
  'machine-learning', 'ai-art', 'neural-networks', 'data-science'
] as const;

export type Tag = string; // Free-form, lowercase, no spaces, max 20 chars

export interface TagWithCount {
  tag: Tag;
  count: number;
}

export function generateTagCloud(tags: Tag[], maxCount: number = 50, maxTags: number = 20): TagWithCount[] {
  const countMap = new Map<Tag, number>();
  tags.forEach(tag => {
    const normalized = tag.toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (normalized.length > 0 && normalized.length <= 20) {
      countMap.set(normalized, (countMap.get(normalized) || 0) + 1);
    }
  });
  
  return Array.from(countMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxTags)
    .map(([tag, count]) => ({ tag, count: Math.min(count, maxCount) }));
}

export function validateTag(tag: string): boolean {
  const normalized = tag.toLowerCase().replace(/[^a-z0-9-]/g, '');
  return normalized.length >= 2 && normalized.length <= 20;
}

