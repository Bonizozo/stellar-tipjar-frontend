import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPortfolio, addPortfolioItem, deletePortfolioItem, type PortfolioItem } from "@/services/api";

export function usePortfolio(username: string) {
  const queryClient = useQueryClient();
  const key = ["portfolio", username];

  const query = useQuery({ queryKey: key, queryFn: () => getPortfolio(username) });

  const add = useMutation({
    mutationFn: (item: Omit<PortfolioItem, "id">) => addPortfolioItem(username, item),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const remove = useMutation({
    mutationFn: (itemId: string) => deletePortfolioItem(username, itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  return { ...query, add, remove };
}
