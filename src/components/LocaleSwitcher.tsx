'use client';

import { useI18n } from '@/i18n/provider';
import { locales, localeNames } from '@/i18n/config';
import { Globe } from 'lucide-react';

export const LocaleSwitcher = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4" />
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as any)}
        className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
    </div>
  );
};
