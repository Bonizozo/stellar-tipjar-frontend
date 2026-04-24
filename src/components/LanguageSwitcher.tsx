"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const switchLanguage = (newLocale: string) => {
    startTransition(() => {
      // Remove current locale from pathname
      const segments = pathname.split("/");
      segments.splice(1, 1); // Remove locale segment
      const newPath = `/${newLocale}${segments.join("/")}`;
      router.replace(newPath);
    });
  };

  return (
    <select
      value={locale}
      onChange={(e) => switchLanguage(e.target.value)}
      disabled={isPending}
      aria-label="Select language"
      className="rounded border border-ink/20 bg-transparent px-2 py-1 text-sm text-ink/80 focus:outline-none focus:ring-2 focus:ring-wave/50 cursor-pointer"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
}
