import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { requestVerificationStatus, requestVerification } from '@/services/api';
import { useWallet } from '@/hooks/useWallet';

export function useVerification() {
  const { publicKey } = useWallet();
  const queryClient = useQueryClient();

  const { data: status, isLoading } = useQuery({
    queryKey: ['verification-status'],
    queryFn: () => requestVerificationStatus(),
  });

  const verificationMutation = useMutation({
    mutationFn: requestVerification,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['verification-status'] });
    },
  });

  const submitRequest = () => {
    verificationMutation.mutate();
  };

  return {
    status,
    isLoading,
    submitRequest,
    isRequesting: verificationMutation.isPending,
    isVerified: status?.isVerified || false,
  };
}

