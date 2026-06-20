"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface DockAction {
  href?: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

interface BottomDockProps {
  /** Called when the menu action is tapped. */
  onOpenMenu: () => void;
}

/**
 * Fixed bottom navigation dock for the most-used actions on mobile.
 * Hidden on tablet and up where the full navbar is available.
 */
export function BottomDock({ onOpenMenu }: BottomDockProps) {
  const pathname = usePathname();

  const actions: DockAction[] = [
    {
      href: "/",
      label: "Home",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: "/explore",
      label: "Explore",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      href: "/tips",
      label: "Tip",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Menu",
      onClick: onOpenMenu,
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
  ];

  const isActive = (href?: string) =>
    href ? (href === "/" ? pathname === "/" : pathname.startsWith(href)) : false;

  const itemClass = (active: boolean) =>
    [
      "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors",
      active ? "text-wave" : "text-ink/60 hover:text-wave",
    ].join(" ");

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-ink/10 bg-[color:var(--surface)]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      {actions.map((action) => {
        const active = isActive(action.href);
        return action.href ? (
          <Link
            key={action.label}
            href={action.href as any}
            aria-current={active ? "page" : undefined}
            className={itemClass(active)}
          >
            {action.icon}
            {action.label}
          </Link>
        ) : (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            className={itemClass(false)}
          >
            {action.icon}
            {action.label}
          </button>
        );
      })}
    </nav>
  );
}
