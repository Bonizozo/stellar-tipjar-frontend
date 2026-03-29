export interface Creator {
  username: string;
  displayName?: string;
  categories: string[];
  tags: string[];
  followers?: number;
}

export const CREATOR_EXAMPLES: Creator[] = [
  { username: "alice", displayName: "Alice", categories: ["art"], tags: ["nft-art", "digital-art"], followers: 1250 },
  { username: "stellar-dev", displayName: "Stellar Dev", categories: ["tech"], tags: ["soroban", "stellar"], followers: 3400 },
  { username: "pixelmaker", displayName: "Pixel Maker", categories: ["art"], tags: ["pixel-art"], followers: 890 },
  { username: "community-lab", displayName: "Community Lab", categories: ["community"], tags: ["dao"], followers: 2100 },
  { username: "crypto-artist", displayName: "Crypto Artist", categories: ["art"], tags: ["crypto-art"], followers: 1800 },
  { username: "blockchain-edu", displayName: "Blockchain Edu", categories: ["education"], tags: ["blockchain"], followers: 2900 },
  { username: "nft-creator", displayName: "NFT Creator", categories: ["art"], tags: ["nft"], followers: 4200 },
  { username: "defi-expert", displayName: "DeFi Expert", categories: ["tech"], tags: ["defi"], followers: 3100 },
  { username: "web3-builder", displayName: "Web3 Builder", categories: ["tech"], tags: ["web3"], followers: 2700 },
  { username: "dao-organizer", displayName: "DAO Organizer", categories: ["community"], tags: ["dao-governance"], followers: 1950 },
  { username: "smart-contract-dev", displayName: "Smart Contract Dev", categories: ["tech"], tags: ["solidity"], followers: 3800 },
  { username: "digital-artist", displayName: "Digital Artist", categories: ["art"], tags: ["digital-art"], followers: 2300 },
  { username: "crypto-educator", displayName: "Crypto Educator", categories: ["education"], tags: ["crypto"], followers: 3500 },
  { username: "metaverse-architect", displayName: "Metaverse Architect", categories: ["tech"], tags: ["metaverse"], followers: 2800 },
  { username: "token-designer", displayName: "Token Designer", categories: ["art"], tags: ["tokenomics"], followers: 1600 },
  { username: "blockchain-analyst", displayName: "Blockchain Analyst", categories: ["education"], tags: ["blockchain"], followers: 2400 },
  { username: "community-manager", displayName: "Community Manager", categories: ["community"], tags: ["community"], followers: 1750 },
  { username: "protocol-dev", displayName: "Protocol Dev", categories: ["tech"], tags: ["protocol"], followers: 4100 },
  { username: "3d-artist", displayName: "3D Artist", categories: ["art"], tags: ["3d"], followers: 2200 },
  { username: "crypto-writer", displayName: "Crypto Writer", categories: ["education"], tags: ["crypto"], followers: 1900 },
  { username: "gamefi-dev", displayName: "GameFi Dev", categories: ["tech"], tags: ["gamefi"], followers: 3300 },
  { username: "generative-artist", displayName: "Generative Artist", categories: ["art"], tags: ["generative-art"], followers: 2600 },
  { username: "web3-educator", displayName: "Web3 Educator", categories: ["education"], tags: ["web3"], followers: 2100 },
  { username: "nft-collector", displayName: "NFT Collector", categories: ["community"], tags: ["nft"], followers: 1400 },
  { username: "solidity-dev", displayName: "Solidity Dev", categories: ["tech"], tags: ["solidity"], followers: 3900 },
];
