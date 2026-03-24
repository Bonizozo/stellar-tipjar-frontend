import { useEffect, useState } from "react";

export interface Tip {
  id: string;
  date: string;
  amount: number;
  recipient: string;
  sender: string;
  status: "completed" | "pending" | "failed";
  transactionHash?: string;
  memo?: string;
}

export type TipSortField = "date" | "amount" | "recipient" | "status";
export type SortOrder = "asc" | "desc";

export interface TipFilters {
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  status?: string;
  search?: string;
}

/**
 * Hook for managing tip history data with filtering and sorting.
 */
export function useTipHistory() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [filteredTips, setFilteredTips] = useState<Tip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<TipSortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [filters, setFilters] = useState<TipFilters>({});

  // Simulate fetching tip history
  useEffect(() => {
    const fetchTips = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Mock data
      const mockTips: Tip[] = [
        {
          id: "1",
          date: "2024-03-20T10:30:00Z",
          amount: 50,
          recipient: "alice",
          sender: "you",
          status: "completed",
          transactionHash: "abc123",
          memo: "Great content!",
        },
        {
          id: "2",
          date: "2024-03-19T15:45:00Z",
          amount: 25,
          recipient: "stellar-dev",
          sender: "you",
          status: "completed",
          transactionHash: "def456",
        },
        {
          id: "3",
          date: "2024-03-18T09:15:00Z",
          amount: 100,
          recipient: "pixelmaker",
          sender: "you",
          status: "pending",
        },
        {
          id: "4",
          date: "2024-03-17T14:20:00Z",
          amount: 15,
          recipient: "crypto-artist",
          sender: "you",
          status: "completed",
          transactionHash: "ghi789",
        },
        {
          id: "5",
          date: "2024-03-16T11:00:00Z",
          amount: 75,
          recipient: "blockchain-edu",
          sender: "you",
          status: "failed",
        },
        {
          id: "6",
          date: "2024-03-15T16:30:00Z",
          amount: 30,
          recipient: "community-lab",
          sender: "you",
          status: "completed",
          transactionHash: "jkl012",
        },
        {
          id: "7",
          date: "2024-03-14T13:45:00Z",
          amount: 200,
          recipient: "nft-creator",
          sender: "you",
          status: "completed",
          transactionHash: "mno345",
          memo: "Amazing work!",
        },
        {
          id: "8",
          date: "2024-03-13T10:10:00Z",
          amount: 45,
          recipient: "defi-expert",
          sender: "you",
          status: "completed",
          transactionHash: "pqr678",
        },
      ];
      
      setTips(mockTips);
      setIsLoading(false);
    };

    fetchTips();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...tips];

    // Apply filters
    if (filters.dateFrom) {
      result = result.filter((tip) => new Date(tip.date) >= new Date(filters.dateFrom!));
    }
    if (filters.dateTo) {
      result = result.filter((tip) => new Date(tip.date) <= new Date(filters.dateTo!));
    }
    if (filters.minAmount !== undefined) {
      result = result.filter((tip) => tip.amount >= filters.minAmount!);
    }
    if (filters.maxAmount !== undefined) {
      result = result.filter((tip) => tip.amount <= filters.maxAmount!);
    }
    if (filters.status && filters.status !== "all") {
      result = result.filter((tip) => tip.status === filters.status);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (tip) =>
          tip.recipient.toLowerCase().includes(searchLower) ||
          tip.memo?.toLowerCase().includes(searchLower) ||
          tip.transactionHash?.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "recipient":
          comparison = a.recipient.localeCompare(b.recipient);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredTips(result);
  }, [tips, filters, sortField, sortOrder]);

  const handleSort = (field: TipSortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return {
    tips: filteredTips,
    allTips: tips,
    isLoading,
    sortField,
    sortOrder,
    filters,
    setFilters,
    handleSort,
  };
}
