"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NotificationBadge } from "@/components/NotificationBadge";
import { NotificationCenter } from "@/components/NotificationCenter";
import { WalletConnector } from "@/components/WalletConnector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { CurrencySwitcher } from "@/components/CurrencySwitcher";
import { SearchBar } from "@/components/SearchBar";
import { NavItem, MegaMenuLink } from "@/components/MegaMenu";
import { MobileMenu, type MobileNavSection } from "@/components/MobileMenu";
import { BottomDock } from "@/components/BottomDock";
import { useTranslation } from "@/hooks/useTranslation";

function ExploreMenu() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <MegaMenuLink
        href="/explore"
        title="All Creators"
        description="Browse every creator on the platform"
        icon={
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        }
      />
      <MegaMenuLink
        href="/compare"
        title="Compare Creators"
        description="Side-by-side creator comparison"
        icon={
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        }
      />
      <MegaMenuLink
        href="/predictions"
        title="Tip Predictions"
        description="AI-powered tip forecasting"
        icon={
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        }
      />
      <MegaMenuLink
        href="/explore?sort=trending"
        title="Trending"
        description="See who's getting the most tips"
        icon={
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        }
      />
    </div>
  );
}

function NavIcon({ d }: { d: string }) {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={d}
      />
    </svg>
  );
}

const MOBILE_NAV_SECTIONS: MobileNavSection[] = [
  {
    heading: "Discover",
    items: [
      {
        href: "/",
        label: "Home",
        icon: (
          <NavIcon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        ),
      },
      {
        href: "/explore",
        label: "Explore Creators",
        icon: <NavIcon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
      },
      {
        href: "/marketplace",
        label: "Marketplace",
        icon: (
          <NavIcon d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        ),
      },
      {
        href: "/compare",
        label: "Compare Creators",
        icon: (
          <NavIcon d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        ),
      },
      {
        href: "/predictions",
        label: "Tip Predictions",
        icon: <NavIcon d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
      },
    ],
  },
  {
    heading: "Activity",
    items: [
      {
        href: "/tips",
        label: "Send Tips",
        icon: (
          <NavIcon d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
      },
      {
        href: "/gamification",
        label: "Achievements",
        icon: (
          <NavIcon d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        ),
      },
    ],
  },
  {
    heading: "Tools",
    items: [
      {
        href: "/widgets",
        label: "Widgets",
        icon: (
          <NavIcon d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        ),
      },
      {
        href: "/help",
        label: "Help & FAQ",
        icon: (
          <NavIcon d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
      },
    ],
  },
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
          data-tour="navbar"
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          {/* Logo */}
          <Link
            href={"/" as any}
            aria-label="Stellar Tip Jar — home"
            className="shrink-0 text-lg font-bold tracking-tight text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded dark:text-gray-100"
          >
            {t("brandName")}
          </Link>

          {/* Desktop nav items */}
          <ul role="list" className="hidden items-center gap-6 md:flex">
            <li data-tour="explore">
              <NavItem label="Explore" megaMenu={<ExploreMenu />} />
            </li>
            <li>
              <NavItem label="Tips" href="/tips" />
            </li>
            <li>
              <NavItem label="Widgets" href="/widgets" />
            </li>
            <li>
              <NavItem label="Help" href="/help" />
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
            <span data-tour="wallet-connector">
              <WalletConnector />
            </span>

            {/* Hamburger */}
            <button
              type="button"
              aria-label="Open mobile menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        sections={MOBILE_NAV_SECTIONS}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <NotificationCenter />
      <BottomDock onOpenMenu={() => setMobileOpen(true)} />
    </>
  );
}
