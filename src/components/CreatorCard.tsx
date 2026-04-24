"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/OptimizedImage";
import { generateAvatarUrl } from "@/utils/imageUtils";
import { Creator } from "@/utils/creatorData";

interface CreatorCardProps {
  creator: Creator;
  trackInteraction?: (type: string, username: string, category: string) => void;
}

export function CreatorCard({ creator, trackInteraction }: CreatorCardProps) {
  const primaryCategory = creator.categories[0] || "Creator";

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative h-full"
    >
      <Link
        href={`/creator/${creator.username}`}
        onClick={() => trackInteraction?.("click", creator.username, primaryCategory)}
        className="flex flex-col h-full bg-[color:var(--surface)] border border-ink/10 rounded-3xl overflow-hidden transition-all duration-300 group-hover:border-wave/40 group-hover:shadow-2xl group-hover:shadow-wave/5"
      >
        {/* Card Header / Background Gradient */}
        <div className="h-24 bg-gradient-to-r from-wave/10 via-accent/10 to-accent-alt/10 relative">
          {/* Verified Badge */}
          {creator.verified && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
              <svg className="h-4 w-4 text-wave" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-6 pb-8 -mt-12 flex-1 flex flex-col items-center">
          {/* Avatar */}
          <div className="relative h-24 w-24 rounded-full border-4 border-[color:var(--surface)] overflow-hidden shadow-lg mb-4 ring-2 ring-ink/5 transition-transform duration-500 group-hover:scale-105">
            <OptimizedImage
              src={generateAvatarUrl(creator.username)}
              alt={creator.displayName || creator.username}
              fill
              sizes="96px"
              priority={false}
            />
          </div>

          {/* Info */}
          <div className="text-center mb-6">
            <p className="text-[10px] uppercase font-bold tracking-widest text-wave/80 mb-1">
              {primaryCategory}
            </p>
            <h3 className="text-xl font-bold text-ink group-hover:text-wave transition-colors duration-300 line-clamp-1">
              {creator.displayName || `@${creator.username}`}
            </h3>
            <p className="text-sm text-ink/50 font-medium">@{creator.username}</p>
          </div>

          {/* Bio */}
          {creator.bio && (
            <p className="text-sm text-ink/70 text-center mb-8 line-clamp-2 min-h-[40px]">
              {creator.bio}
            </p>
          )}

          {/* Location */}
          <div className="flex items-center gap-1.5 mb-6 text-ink/40">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-medium uppercase tracking-wider">{creator.location}</span>
          </div>

          {/* Stats Bar */}
          <div className="w-full flex items-center justify-between pt-6 border-t border-ink/5">
            <div className="text-center">
              <p className="text-base font-bold text-ink">
                {creator.followers?.toLocaleString() || 0}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-ink/40 font-semibold">Followers</p>
            </div>
            <div className="h-8 w-px bg-ink/5" />
            <div className="text-center">
              <p className="text-base font-bold text-ink">
                ${creator.earnings?.toLocaleString() || 0}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-ink/40 font-semibold">Earnings</p>
            </div>
          </div>
        </div>

        {/* Hover Action Overlay (Subtle) */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-wave via-accent to-accent-alt scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </Link>
    </motion.div>
  );
}
