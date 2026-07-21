"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { NextIntlClientProvider } from "next-intl";
import { createNamespacedStorage } from "@/lib/storage";

import en from "@/i18n/locales/en.json";
import es from "@/i18n/locales/es.json";
import fr from "@/i18n/locales/fr.json";
import de from "@/i18n/locales/de.json";
import ja from "@/i18n/locales/ja.json";

export type Locale = "en" | "es" | "fr" | "de" | "ja";

const messages: Record<Locale, any> = { en, es, fr, de, ja };

const storage = createNamespacedStorage("i18n");

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
});

export function useLocaleContext() {
  return useContext(LocaleContext);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = storage.getString("locale", { legacyKey: "locale" }) as Locale;
    if (saved && saved in messages) setLocaleState(saved);
  }, []);

  const setLocale = (newLocale: Locale) => {
    storage.setString("locale", newLocale);
    setLocaleState(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages[locale]}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
