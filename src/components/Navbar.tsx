"use client";

import Link from "next/link";

import { NotificationBadge } from "@/components/NotificationBadge";
import { WalletConnector } from "@/components/WalletConnector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CurrencySwitcher } from "@/components/CurrencySwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";

export function Navbar() {
  const t = useTranslation("nav");

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/explore", label: t("exploreCreators") },
    { href: "/tips", label: t("sendTips") },
    { href: "/widgets", label: t("widgets") },
  ] as const;

  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-[color:var(--surface)]/80 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          aria-label="Stellar Tip Jar — home"
          className="text-lg font-bold tracking-tight text-ink sm:text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50 rounded"
        >
          {t("brandName")}
        </Link>

        <ul
          role="list"
          className="hidden items-center gap-6 text-sm font-medium text-ink/80 md:flex"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-wave focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50 rounded"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block mr-2">
            <CurrencySwitcher />
          </div>
          <LanguageSwitcher />
          <NotificationBadge />
          <WalletConnector />
        </div>
      </nav>
    </header>
  );
}
