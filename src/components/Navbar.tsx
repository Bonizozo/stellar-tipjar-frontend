import Link from "next/link";

import { WalletConnector } from "@/components/WalletConnector";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore Creators" },
  { href: "/tips", label: "Send Tips" },
] as const;

export function Navbar() {
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
          Stellar Tip Jar
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

        <WalletConnector />
      </nav>
    </header>
  );
}
