"use client";

import { ReactNode } from "react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { VerificationBadge } from "@/components/VerificationBadge";

interface StatItemProps {
  label: string;
  value: number | string;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-xl bg-white/60 px-4 py-3 dark:bg-gray-800/60">
      <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{value}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}

interface SocialLink {
  href: string;
  label: string;
  icon: ReactNode;
}

export interface ProfileCardProps {
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl: string;
  isVerified?: boolean;
  followers?: number;
  tipsReceived?: number;
  supporters?: number;
  socialLinks?: SocialLink[];
}

export function ProfileCard({
  username,
  displayName,
  bio,
  avatarUrl,
  isVerified,
  followers = 0,
  tipsReceived = 0,
  supporters = 0,
  socialLinks = [],
}: ProfileCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/80 p-8 shadow-2xl backdrop-blur-lg dark:border-gray-700/80 dark:bg-gray-900/80">
      {/* Decorative gradient blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl dark:bg-purple-600/20"
      />

      <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-start">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="h-28 w-28 overflow-hidden rounded-full ring-4 ring-purple-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 sm:h-32 sm:w-32">
            <OptimizedImage
              src={avatarUrl}
              alt={`Avatar for ${displayName}`}
              fill
              sizes="(min-width: 640px) 128px, 112px"
              priority
            />
          </div>
          {isVerified && (
            <div className="absolute -bottom-1 -right-1">
              <VerificationBadge isVerified size="lg" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">{displayName}</h2>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">@{username}</p>

          {bio && (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">{bio}</p>
          )}

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <StatItem label="Followers" value={followers.toLocaleString()} />
            <StatItem label="Tips" value={tipsReceived.toLocaleString()} />
            <StatItem label="Supporters" value={supporters.toLocaleString()} />
          </div>

          {/* Social links */}
          {socialLinks.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-purple-400 hover:text-purple-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-purple-500 dark:hover:text-purple-400"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
