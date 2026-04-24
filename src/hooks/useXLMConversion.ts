import { useQuery } from '@tanstack/react-query';
import { getXLMRates } from '@/services/currencyService';
import { useCurrency } from '@/contexts/CurrencyContext';

/**
 * Hook to convert XLM amount to the user's selected fiat currency.
 * Uses React Query to cache and periodically refresh exchange rates.
 */
export function useXLMConversion(xlmAmount: number | string) {
  const { selectedCurrency } = useCurrency();

  const { data: rates, isLoading } = useQuery({
    queryKey: ['xlm-rates'],
    queryFn: () => getXLMRates(),
    refetchInterval: 300000, // Refresh every 5 minutes
    staleTime: 60000,        // Consider data stale after 1 minute
  });

  const amount = typeof xlmAmount === 'string' ? parseFloat(xlmAmount) : xlmAmount;

  if (isLoading || !rates || isNaN(amount)) {
    return { formatted: '...', isLoading };
  }

  const rate = rates[selectedCurrency.toLowerCase()];
  if (!rate) {
    return { formatted: 'N/A', isLoading: false };
  }

  const fiatValue = amount * rate;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: selectedCurrency.toUpperCase(),
  });

  return {
    fiatValue,
    formatted: `(~${formatter.format(fiatValue)} ${selectedCurrency.toUpperCase()})`,
    isLoading: false,
  };
}