import { useMutation, useQuery } from '@tanstack/react-query';
import { requestVerificationStatus, requestVerification } from '@/services/api';
import { useWallet } from '@/contexts/WalletContext';

export function useVerification() {
  const { publicKey } = useWallet();

  const { data: status, isLoading } = useQuery({
    queryKey: ['verification-status'],
    queryFn: () => requestVerificationStatus(),
  });

  const verificationMutation = useMutation({
    mutationFn: requestVerification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verification-status'] });
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

