import { routing } from '@/i18n/routing';

type Locale = (typeof routing.locales)[number];

/**
 * Rewrites `pathname` to carry `newLocale`'s prefix instead of whatever
 * locale prefix (if any) it currently has, preserving the rest of the route,
 * query string, and hash. `newLocale === routing.defaultLocale` produces an
 * un-prefixed path, matching this app's `localePrefix: 'as-needed'` routing.
 */
export function getLocalizedPath(
  pathname: string,
  newLocale: Locale,
  search = '',
  hash = '',
) {
  const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = normalizedPathname.split('/');

  if ((routing.locales as readonly string[]).includes(segments[1])) {
    segments.splice(1, 1);
  }

  const unprefixedPath = segments.join('/') || '/';
  const localizedPath =
    newLocale === routing.defaultLocale
      ? unprefixedPath
      : `/${newLocale}${unprefixedPath === '/' ? '' : unprefixedPath}`;
  const normalizedSearch = search && !search.startsWith('?') ? `?${search}` : search;
  const normalizedHash = hash && !hash.startsWith('#') ? `#${hash}` : hash;

  return `${localizedPath}${normalizedSearch}${normalizedHash}`;
}
