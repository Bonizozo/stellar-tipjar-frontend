"use client";

import { useLocaleContext, type Locale } from "@/components/I18nProvider";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleContext();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      aria-label="Select language"
      className="rounded border border-ink/20 bg-transparent px-2 py-1 text-sm text-ink/80 focus:outline-none focus:ring-2 focus:ring-wave/50 cursor-pointer"
    >
      {languages.map(({ code, label, flag }) => (
        <option key={code} value={code}>
          {flag} {label}
        </option>
      ))}
    </select>
  );
}
