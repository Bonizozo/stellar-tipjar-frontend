import { useQuery } from "@tanstack/react-query";
import { getCreatorProfile } from "@/services/api";
import { useWallet } from "@/hooks/useWallet";

export function useCreatorProfile() {
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["creatorProfile", publicKey],
    queryFn: () => getCreatorProfile(publicKey!),
    enabled: !!publicKey,
    staleTime: 5 * 60 * 1000,
  });
}
