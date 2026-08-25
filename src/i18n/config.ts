export const locales = ['en', 'es', 'fr', 'de', 'ar', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ar: 'العربية',
  zh: '中文',
};

export const isRTL = (locale: string) => locale === 'ar';
export const getDirection = (locale: string): 'rtl' | 'ltr' =>
  isRTL(locale) ? 'rtl' : 'ltr';

