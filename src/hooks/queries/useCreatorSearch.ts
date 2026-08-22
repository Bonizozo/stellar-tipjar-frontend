import { useQuery } from "@tanstack/react-query";

interface CreatorSearchResult {
  username: string;
  displayName: string;
  bio?: string;
  isVerified?: boolean;
}

interface UseCreatorSearchOptions {
  enabled?: boolean;
}

// Mock search function - replace with actual API call
async function searchCreators(query: string): Promise<CreatorSearchResult[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data - replace with actual API call
  const mockCreators: CreatorSearchResult[] = [
    { username: "alice", displayName: "Alice Johnson", bio: "Digital artist", isVerified: true },
    { username: "bob", displayName: "Bob Smith", bio: "Content creator" },
    { username: "charlie", displayName: "Charlie Brown", bio: "Musician" },
    { username: "diana", displayName: "Diana Prince", bio: "Writer", isVerified: true },
    { username: "eve", displayName: "Eve Wilson", bio: "Photographer" },
    { username: "frank", displayName: "Frank Miller", bio: "Game developer" },
    { username: "grace", displayName: "Grace Lee", bio: "Podcaster", isVerified: true },
    { username: "henry", displayName: "Henry Ford", bio: "Tech reviewer" },
  ];

  // Filter based on query
  const filtered = mockCreators.filter(creator => 
    creator.username.toLowerCase().includes(query.toLowerCase()) ||
    creator.displayName.toLowerCase().includes(query.toLowerCase())
  );

  return filtered.slice(0, 10); // Limit results
}

export const creatorSearchKeys = {
  search: (query: string) => ["creators", "search", query] as const,
};

export function useCreatorSearch(query: string, options: UseCreatorSearchOptions = {}) {
  return useQuery({
    queryKey: creatorSearchKeys.search(query),
    queryFn: () => searchCreators(query),
    enabled: query.length >= 2 && (options.enabled ?? true),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}