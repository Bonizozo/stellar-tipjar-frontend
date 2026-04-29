"use client";

import { useQuery } from "@tanstack/react-query";

export interface CreatorStore {
  id: string;
  username: string;
  name: string;
  description: string;
  avatar: string;
  banner: string;
  categories: string[];
  productCount: number;
  totalSales: number;
  rating: number;
  isVerified: boolean;
}

export interface MarketplaceStats {
  totalStores: number;
  totalProducts: number;
  totalSales: number;
  totalBuyers: number;
}

// Mock data
const mockCreators: CreatorStore[] = [
  {
    id: "1",
    username: "alice",
    name: "Alice's Art Studio",
    description: "Digital art, prints, and exclusive content",
    avatar: "/images/avatar-alice.jpg",
    banner: "/images/banner-alice.jpg",
    categories: ["digital", "posters"],
    productCount: 24,
    totalSales: 156,
    rating: 4.8,
    isVerified: true,
  },
  {
    id: "2",
    username: "bob",
    name: "Bob's Music Shop",
    description: "Original music, beats, and sound packs",
    avatar: "/images/avatar-bob.jpg",
    banner: "/images/banner-bob.jpg",
    categories: ["music", "digital"],
    productCount: 18,
    totalSales: 89,
    rating: 4.6,
    isVerified: true,
  },
  {
    id: "3",
    username: "charlie",
    name: "Charlie's Merch",
    description: "Exclusive apparel and accessories",
    avatar: "/images/avatar-charlie.jpg",
    banner: "/images/banner-charlie.jpg",
    categories: ["apparel", "accessories"],
    productCount: 32,
    totalSales: 234,
    rating: 4.9,
    isVerified: false,
  },
];

const mockStats: MarketplaceStats = {
  totalStores: 127,
  totalProducts: 1543,
  totalSales: 8932,
  totalBuyers: 3421,
};

export function useMarketplace() {
  const { data: creators = mockCreators, isLoading } = useQuery({
    queryKey: ["marketplace", "creators"],
    queryFn: async () => {
      // Replace with: fetch("/api/marketplace/creators").then(r => r.json())
      await new Promise((r) => setTimeout(r, 500));
      return mockCreators;
    },
  });

  const { data: stats = mockStats } = useQuery({
    queryKey: ["marketplace", "stats"],
    queryFn: async () => {
      // Replace with: fetch("/api/marketplace/stats").then(r => r.json())
      await new Promise((r) => setTimeout(r, 300));
      return mockStats;
    },
  });

  return {
    creators,
    isLoading,
    stats,
  };
}
