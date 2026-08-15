import { routing } from './routing';

export const locales = routing.locales;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = routing.defaultLocale as Locale;

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  zh: '中文',
  ar: 'العربية',
};

export const isRTL = (locale: Locale | string) => locale === 'ar';

