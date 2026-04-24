'use client';

import { useCurrency } from '@/contexts/CurrencyContext';

const SUPPORTED_CURRENCIES = [
  { code: 'usd', label: 'USD - US Dollar' },
  { code: 'eur', label: 'EUR - Euro' },
  { code: 'ngn', label: 'NGN - Nigerian Naira' },
  { code: 'gbp', label: 'GBP - British Pound' },
];

export function CurrencySwitcher() {
  const { selectedCurrency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="currency-select" className="text-xs font-medium text-ink/60 uppercase tracking-wider">
        Display Currency
      </label>
      <div className="relative">
        <select
          id="currency-select"
          value={selectedCurrency}
          onChange={(e) => setCurrency(e.target.value)}
          className="appearance-none rounded-lg border border-ink/10 bg-[color:var(--surface)] py-1.5 pl-3 pr-8 text-sm font-medium text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 transition-all cursor-pointer shadow-sm hover:border-ink/20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em'
          }}
        >
          {SUPPORTED_CURRENCIES.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}