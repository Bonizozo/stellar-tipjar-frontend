"use client";

import { useState, useEffect, useRef } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NotificationBadge } from "@/components/NotificationBadge";
import { WalletConnector } from "@/components/WalletConnector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { CurrencySwitcher } from "@/components/CurrencySwitcher";
import { SearchBar } from "@/components/SearchBar";
import { NavItem, MegaMenuLink } from "@/components/MegaMenu";
import { MobileMenu } from "@/components/MobileMenu";
import { useTranslation } from "@/hooks/useTranslation";

function ExploreMenu() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <MegaMenuLink
        href="/explore"
        title="All Creators"
        description="Browse every creator on the platform"
        icon={<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
      />
      <MegaMenuLink
        href="/explore?sort=trending"
        title="Trending"
        description="See who's getting the most tips"
        icon={<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
      />
      <MegaMenuLink
        href="/explore?sort=new"
        title="New Creators"
        description="Discover fresh talent"
        icon={<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
      />
      <MegaMenuLink
        href="/tips"
        title="Tip History"
        description="View your past transactions"
        icon={<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
      />
    </div>
  );
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore Creators" },
  { href: "/tips", label: "Send Tips" },
  { href: "/gamification", label: "Achievements" },
  { href: "/widgets", label: "Widgets" },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useFocusTrap<HTMLDivElement>(menuOpen);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);
  { href: "/explore", label: "Explore" },
  { href: "/tips", label: "Tips" },
  { href: "/widgets", label: "Widgets" },
];

export function Navbar() {
  const t = useTranslation("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={[
          "sticky top-0 z-20 transition-shadow",
          scrolled
            ? "border-b border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-950/90"
            : "border-b border-transparent bg-white/70 backdrop-blur-md dark:bg-gray-950/70",
        ].join(" ")}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Stellar Tip Jar — home"
            className="shrink-0 text-lg font-bold tracking-tight text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded dark:text-gray-100"
          >
            {t("brandName")}
          </Link>

        {/* Desktop nav */}
        <ul
          role="list"
          className="hidden items-center gap-6 text-sm font-medium text-ink/80 md:flex"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded transition-colors hover:text-wave focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50 ${
                    active ? "font-semibold text-wave" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <NotificationBadge />
          <div className="hidden md:block">
            <WalletConnector />
          </div>

          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/15 text-ink/70 transition hover:border-wave/40 hover:text-wave focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50 md:hidden"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="border-t border-ink/10 bg-[color:var(--surface)] px-4 pb-5 pt-3 md:hidden"
        >
          <ul role="list" className="space-y-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-wave/10 hover:text-wave focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave/50 ${
                      active ? "bg-wave/10 text-wave" : "text-ink/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 border-t border-ink/10 pt-4">
            <WalletConnector />
          </div>
        </div>
      )}
    </header>
          {/* Desktop nav items */}
          <ul role="list" className="hidden items-center gap-6 md:flex">
            <li>
              <NavItem label="Explore" megaMenu={<ExploreMenu />} />
            </li>
            <li>
              <NavItem label="Tips" href="/tips" />
            </li>
            <li>
              <NavItem label="Widgets" href="/widgets" />
            </li>
          </ul>

          {/* Desktop search */}
          <div className="hidden w-56 lg:block xl:w-72">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search creators..."
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <CurrencySwitcher />
            </div>
            <LanguageSwitcher />
            <ThemeToggle />
            <NotificationBadge />
            <WalletConnector />

            {/* Hamburger */}
            <button
              type="button"
              aria-label="Open mobile menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu links={NAV_LINKS} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
