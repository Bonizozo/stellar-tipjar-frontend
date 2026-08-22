'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Locale, defaultLocale, isRTL } from './config';
import { createNamespacedStorage } from '@/lib/storage';

const storage = createNamespacedStorage('i18n');

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const saved = storage.getString('locale', { legacyKey: 'locale' }) as Locale | null;
    const detected = navigator.language.split('-')[0] as Locale;
    const initial = saved || detected || defaultLocale;
    setLocaleState(initial);
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const module = await import(`./locales/${locale}.json`);
        setTranslations(module.default);
        storage.setString('locale', locale);
        document.documentElement.lang = locale;
        document.documentElement.dir = isRTL(locale) ? 'rtl' : 'ltr';
      } catch (error) {
        console.error(`Failed to load locale: ${locale}`);
      }
    };

    loadTranslations();
  }, [locale]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      value = value?.[k];
    }

    return typeof value === 'string' ? value : key;
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, isRTL: isRTL(locale) }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
