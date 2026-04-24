import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'fr', 'zh', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});