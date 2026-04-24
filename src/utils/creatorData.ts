export interface Creator {
  username: string;
  displayName?: string;
  categories: string[];
  tags: string[];
  followers?: number;
  verified: boolean;
  location: string;
  earnings: number;
  joinedAt: string; // ISO format
  bio?: string;
}

export const CREATOR_EXAMPLES: Creator[] = [
  {
    username: "alice",
    displayName: "Alice",
    categories: ["art"],
    tags: ["nft-art", "digital-art"],
    followers: 1250,
    verified: true,
    location: "Berlin, DE",
    earnings: 4500,
    joinedAt: "2023-11-01T10:00:00Z",
    bio: "Digital artist exploring the intersection of nature and code."
  },
  {
    username: "stellar-dev",
    displayName: "Stellar Dev",
    categories: ["tech"],
    tags: ["soroban", "stellar"],
    followers: 3400,
    verified: true,
    location: "San Francisco, US",
    earnings: 12000,
    joinedAt: "2023-10-15T08:30:00Z",
    bio: "Building the future of open finance on Stellar."
  },
  {
    username: "pixelmaker",
    displayName: "Pixel Maker",
    categories: ["art"],
    tags: ["pixel-art"],
    followers: 890,
    verified: false,
    location: "Tokyo, JP",
    earnings: 2300,
    joinedAt: "2024-01-20T14:45:00Z",
    bio: "Pixel by pixel, I bring worlds to life."
  },
  {
    username: "community-lab",
    displayName: "Community Lab",
    categories: ["community"],
    tags: ["dao"],
    followers: 2100,
    verified: true,
    location: "London, UK",
    earnings: 6700,
    joinedAt: "2023-12-05T12:00:00Z",
    bio: "Empowering decentralized communities through collaboration."
  },
  {
    username: "crypto-artist",
    displayName: "Crypto Artist",
    categories: ["art"],
    tags: ["crypto-art"],
    followers: 1800,
    verified: true,
    location: "Paris, FR",
    earnings: 5200,
    joinedAt: "2023-11-20T16:20:00Z",
    bio: "Bridging the gap between traditional art and blockchain."
  },
  {
    username: "blockchain-edu",
    displayName: "Blockchain Edu",
    categories: ["education"],
    tags: ["blockchain"],
    followers: 2900,
    verified: true,
    location: "New York, US",
    earnings: 8900,
    joinedAt: "2023-09-30T09:00:00Z",
    bio: "Simplifying blockchain for the next generation of builders."
  },
  {
    username: "nft-creator",
    displayName: "NFT Creator",
    categories: ["art"],
    tags: ["nft"],
    followers: 4200,
    verified: true,
    location: "Sydney, AU",
    earnings: 15000,
    joinedAt: "2023-08-12T11:15:00Z",
    bio: "Minting experiences that transcend the digital realm."
  },
  {
    username: "defi-expert",
    displayName: "DeFi Expert",
    categories: ["tech"],
    tags: ["defi"],
    followers: 3100,
    verified: false,
    location: "Singapore, SG",
    earnings: 11000,
    joinedAt: "2023-11-10T13:40:00Z",
    bio: "Navigating the deep waters of decentralized finance."
  },
  {
    username: "web3-builder",
    displayName: "Web3 Builder",
    categories: ["tech"],
    tags: ["web3"],
    followers: 2700,
    verified: true,
    location: "Toronto, CA",
    earnings: 9500,
    joinedAt: "2023-12-15T15:55:00Z",
    bio: "Architecting the infrastructure for a more open web."
  },
  {
    username: "dao-organizer",
    displayName: "DAO Organizer",
    categories: ["community"],
    tags: ["dao-governance"],
    followers: 1950,
    verified: true,
    location: "Amsterdam, NL",
    earnings: 5800,
    joinedAt: "2024-01-05T10:10:00Z",
    bio: "Designing governance systems for collective action."
  },
  {
    username: "smart-contract-dev",
    displayName: "Smart Contract Dev",
    categories: ["tech"],
    tags: ["solidity"],
    followers: 3800,
    verified: true,
    location: "Boston, US",
    earnings: 14000,
    joinedAt: "2023-09-15T08:00:00Z",
    bio: "Writing secure, efficient code for the on-chain economy."
  },
  {
    username: "digital-artist",
    displayName: "Digital Artist",
    categories: ["art"],
    tags: ["digital-art"],
    followers: 2300,
    verified: false,
    location: "Barcelona, ES",
    earnings: 4100,
    joinedAt: "2023-12-20T17:30:00Z",
    bio: "Exploring colors and forms in a digital canvas."
  },
  {
    username: "crypto-educator",
    displayName: "Crypto Educator",
    categories: ["education"],
    tags: ["crypto"],
    followers: 3500,
    verified: true,
    location: "Austin, US",
    earnings: 10500,
    joinedAt: "2023-10-01T14:00:00Z",
    bio: "Helping the world understand the power of crypto."
  },
  {
    username: "metaverse-architect",
    displayName: "Metaverse Architect",
    categories: ["tech"],
    tags: ["metaverse"],
    followers: 2800,
    verified: true,
    location: "Seoul, KR",
    earnings: 9200,
    joinedAt: "2023-11-25T11:45:00Z",
    bio: "Building the spaces where we'll live and play tomorrow."
  },
  {
    username: "token-designer",
    displayName: "Token Designer",
    categories: ["art"],
    tags: ["tokenomics"],
    followers: 1600,
    verified: false,
    location: "Zurich, CH",
    earnings: 3400,
    joinedAt: "2024-01-10T16:15:00Z",
    bio: "Crafting sustainable tokens with purpose and style."
  },
  {
    username: "blockchain-analyst",
    displayName: "Blockchain Analyst",
    categories: ["education"],
    tags: ["blockchain"],
    followers: 2400,
    verified: true,
    location: "Lisbon, PT",
    earnings: 7300,
    joinedAt: "2023-12-12T09:30:00Z",
    bio: "Decoding the data to reveal the truth behind the blocks."
  },
  {
    username: "community-manager",
    displayName: "Community Manager",
    categories: ["community"],
    tags: ["community"],
    followers: 1750,
    verified: true,
    location: "Stockholm, SE",
    earnings: 4900,
    joinedAt: "2023-11-05T13:20:00Z",
    bio: "Nurturing vibrant, inclusive communities for everyone."
  },
  {
    username: "protocol-dev",
    displayName: "Protocol Dev",
    categories: ["tech"],
    tags: ["protocol"],
    followers: 4100,
    verified: true,
    location: "Chicago, US",
    earnings: 16000,
    joinedAt: "2023-08-20T08:45:00Z",
    bio: "Optimizing the core protocols for maximum efficiency."
  },
  {
    username: "3d-artist",
    displayName: "3D Artist",
    categories: ["art"],
    tags: ["3d"],
    followers: 2200,
    verified: false,
    location: "Milan, IT",
    earnings: 3800,
    joinedAt: "2023-12-28T15:10:00Z",
    bio: "Giving depth and life to digital dreams."
  },
  {
    username: "crypto-writer",
    displayName: "Crypto Writer",
    categories: ["education"],
    tags: ["crypto"],
    followers: 1900,
    verified: true,
    location: "Dublin, IE",
    earnings: 5500,
    joinedAt: "2023-11-15T10:40:00Z",
    bio: "Telling the stories that define the crypto era."
  },
  {
    username: "gamefi-dev",
    displayName: "GameFi Dev",
    categories: ["tech"],
    tags: ["gamefi"],
    followers: 3300,
    verified: true,
    location: "Los Angeles, US",
    earnings: 13000,
    joinedAt: "2023-09-25T14:30:00Z",
    bio: "Where gaming meets finance, we're building the future."
  },
  {
    username: "generative-artist",
    displayName: "Generative Artist",
    categories: ["art"],
    tags: ["generative-art"],
    followers: 2600,
    verified: true,
    location: "Copenhagen, DK",
    earnings: 8200,
    joinedAt: "2023-10-20T11:20:00Z",
    bio: "Letting the algorithms paint the portrait of tomorrow."
  },
  {
    username: "web3-educator",
    displayName: "Web3 Educator",
    categories: ["education"],
    tags: ["web3"],
    followers: 2100,
    verified: false,
    location: "Mexico City, MX",
    earnings: 4600,
    joinedAt: "2024-01-15T09:15:00Z",
    bio: "Onboarding the world to the decentralized web."
  },
  {
    username: "nft-collector",
    displayName: "NFT Collector",
    categories: ["community"],
    tags: ["nft"],
    followers: 1400,
    verified: true,
    location: "Singapore, SG",
    earnings: 2900,
    joinedAt: "2023-12-01T16:45:00Z",
    bio: "Curating the finest digital assets in the metaverse."
  },
  {
    username: "solidity-dev",
    displayName: "Solidity Dev",
    categories: ["tech"],
    tags: ["solidity"],
    followers: 3900,
    verified: true,
    location: "San Francisco, US",
    earnings: 14500,
    joinedAt: "2023-09-10T08:15:00Z",
    bio: "Forging bulletproof smart contracts for the world's applications."
  },
];
