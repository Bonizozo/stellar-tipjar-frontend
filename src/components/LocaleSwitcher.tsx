'use client';

import { useI18n } from '@/i18n/provider';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { Globe } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function getLocalizedPath(
  pathname: string,
  newLocale: Locale,
  search = '',
  hash = '',
) {
  const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = normalizedPathname.split('/');

  if (locales.includes(segments[1] as Locale)) {
    segments.splice(1, 1);
  }

  const unprefixedPath = segments.join('/') || '/';
  const localizedPath =
    newLocale === 'en' ? unprefixedPath : `/${newLocale}${unprefixedPath === '/' ? '' : unprefixedPath}`;
  const normalizedSearch = search && !search.startsWith('?') ? `?${search}` : search;
  const normalizedHash = hash && !hash.startsWith('#') ? `#${hash}` : hash;

  return `${localizedPath}${normalizedSearch}${normalizedHash}`;
}

export const LocaleSwitcher = () => {
  const { locale, setLocale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: Locale) => {
    setLocale(newLocale);

    startTransition(() => {
      const search = searchParams.toString();
      const hash = window.location.hash;
      router.replace(getLocalizedPath(pathname, newLocale, search, hash), { scroll: false });
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4" />
      <select
        value={locale}
        onChange={(e) => switchLocale(e.target.value as Locale)}
        disabled={isPending}
        aria-label="Select locale"
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
