/**
 * Fuzzy Matching Utility
 * Implements fuzzy search for better search results
 */

export interface FuzzyMatch {
  item: string;
  score: number;
  indices: number[];
}

/**
 * Calculate the Levenshtein distance between two strings
 * Lower distance = better match
 */
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const d: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    d[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    d[0][j] = j;
  }

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      if (str1[i - 1] === str2[j - 1]) {
        d[i][j] = d[i - 1][j - 1];
      } else {
        d[i][j] = Math.min(
          d[i - 1][j] + 1, // deletion
          d[i][j - 1] + 1, // insertion
          d[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return d[len1][len2];
}

/**
 * Find character indices where the search term matches in the item
 */
function findMatchIndices(item: string, searchTerm: string): number[] {
  const indices: number[] = [];
  let searchIndex = 0;

  for (let i = 0; i < item.length && searchIndex < searchTerm.length; i++) {
    if (item[i].toLowerCase() === searchTerm[searchIndex].toLowerCase()) {
      indices.push(i);
      searchIndex++;
    }
  }

  return indices.length === searchTerm.length ? indices : [];
}

/**
 * Perform fuzzy matching on an array of items
 * Returns matches sorted by relevance score (higher is better)
 */
export function fuzzyMatch(
  searchTerm: string,
  items: string[],
  options: { maxDistance?: number; threshold?: number } = {}
): FuzzyMatch[] {
  const { maxDistance = 3, threshold = 0.3 } = options;

  if (!searchTerm || searchTerm.length === 0) {
    return [];
  }

  const lowerSearchTerm = searchTerm.toLowerCase();
  const matches: FuzzyMatch[] = [];

  for (const item of items) {
    const lowerItem = item.toLowerCase();

    // Exact match gets highest score
    if (lowerItem === lowerSearchTerm) {
      matches.push({
        item,
        score: 1,
        indices: Array.from({ length: searchTerm.length }, (_, i) => i),
      });
      continue;
    }

    // Check if search term is a substring (prefix match)
    if (lowerItem.startsWith(lowerSearchTerm)) {
      matches.push({
        item,
        score: 0.9,
        indices: Array.from({ length: searchTerm.length }, (_, i) => i),
      });
      continue;
    }

    // Check for substring anywhere in the item
    const substrIndex = lowerItem.indexOf(lowerSearchTerm);
    if (substrIndex !== -1) {
      const score = 0.8 - (substrIndex / item.length) * 0.1;
      matches.push({
        item,
        score,
        indices: Array.from(
          { length: searchTerm.length },
          (_, i) => substrIndex + i
        ),
      });
      continue;
    }

    // Fuzzy matching using character sequence
    const indices = findMatchIndices(item, searchTerm);
    if (indices.length === searchTerm.length) {
      const distance = levenshteinDistance(lowerSearchTerm, lowerItem);
      if (distance <= maxDistance) {
        const score = Math.max(threshold, 1 - distance / (10 * searchTerm.length));
        matches.push({
          item,
          score,
          indices,
        });
      }
    }
  }

  // Sort by score (descending) and then by item length (ascending)
  matches.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.item.length - b.item.length;
  });

  return matches;
}

/**
 * Batch fuzzy match across multiple item arrays
 */
export function batchFuzzyMatch(
  searchTerm: string,
  categorizedItems: Record<string, string[]>
): Record<string, FuzzyMatch[]> {
  const results: Record<string, FuzzyMatch[]> = {};

  for (const [category, items] of Object.entries(categorizedItems)) {
    results[category] = fuzzyMatch(searchTerm, items);
  }

  return results;
}
