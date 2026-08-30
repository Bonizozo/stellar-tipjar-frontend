import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'fr', 'zh', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export const isRTL = (locale: string) => locale === 'ar';
export const getDirection = (locale: string): 'rtl' | 'ltr' =>
  isRTL(locale) ? 'rtl' : 'ltr';