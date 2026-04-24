"use client";

import Link from "next/link";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { FooterColumn } from "@/components/Footer/FooterColumn";
import { NewsletterForm } from "@/components/Footer/NewsletterForm";
import { SocialLinks } from "@/components/Footer/SocialLinks";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <FooterColumn title="About">
            <p>Support creators with Stellar blockchain and easy cross-border tips.</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Built for creators and fans, with a focus on privacy and low fees.
            </p>
          </FooterColumn>

          <FooterColumn title="Quick Links">
            <Link href="/explore" className="block hover:text-white">
              Explore
            </Link>
            <Link href="/tips" className="block hover:text-white">
              My Tips
            </Link>
            <Link href="/creator" className="block hover:text-white">
              Creator Profile
            </Link>
            <Link href="/settings" className="block hover:text-white">
              Settings
            </Link>
          </FooterColumn>

          <FooterColumn title="Social">
            <SocialLinks />
          </FooterColumn>

          <FooterColumn title="Newsletter">
            <NewsletterForm />
          </FooterColumn>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Stellar Tip Jar. MIT License.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <span aria-hidden="true">•</span>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
              <span aria-hidden="true">•</span>
              <Link href="/sitemap.xml" className="hover:text-white">
                Sitemap
              </Link>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 inline-flex items-center gap-2 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-gray-200 transition hover:border-blue-500 hover:bg-gray-700 hover:text-white"
          >
            <ArrowUpCircleIcon className="h-5 w-5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
