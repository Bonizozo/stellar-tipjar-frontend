"use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";

interface ARCreatorProfileProps {
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl: string;
  isVerified?: boolean;
  tipsReceived?: number;
  supporters?: number;
}

/**
 * Renders a creator profile card as a DOM overlay in an active WebXR AR session.
 */
export function ARCreatorProfile({
  username,
  displayName,
  bio,
  avatarUrl,
  isVerified,
  tipsReceived = 0,
  supporters = 0,
}: ARCreatorProfileProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 flex items-start justify-center pt-16"
      aria-label={`AR profile: ${displayName}`}
    >
      <div className="w-80 rounded-2xl bg-black/70 p-5 text-white backdrop-blur-md">
        {/* Avatar + name row */}
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-purple-400">
            <Image
              src={avatarUrl}
              alt={`Avatar for ${displayName}`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <h2 className="truncate text-base font-bold">{displayName}</h2>
              {isVerified && (
                <BadgeCheck className="h-4 w-4 shrink-0 text-indigo-400" aria-label="Verified" />
              )}
            </div>
            <p className="text-xs text-white/60">@{username}</p>
          </div>
        </div>

        {bio && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/80">{bio}</p>
        )}

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-white/10 py-2 text-center">
            <p className="text-lg font-bold text-indigo-300">{tipsReceived.toLocaleString()}</p>
            <p className="text-xs text-white/50">Tips Received</p>
          </div>
          <div className="rounded-xl bg-white/10 py-2 text-center">
            <p className="text-lg font-bold text-purple-300">{supporters.toLocaleString()}</p>
            <p className="text-xs text-white/50">Supporters</p>
          </div>
        </div>
      </div>
    </div>
  );
}
