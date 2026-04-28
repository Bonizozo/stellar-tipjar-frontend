"use client";

import Link from "next/link";
import { Store, Star, Package, CheckCircle } from "lucide-react";
import { CreatorStore } from "@/hooks/useMarketplace";

interface CreatorStoreCardProps {
  creator: CreatorStore;
}

export function CreatorStoreCard({ creator }: CreatorStoreCardProps) {
  return (
    <Link href={`/store/${creator.username}`}>
      <div className="group rounded-xl border border-ink/10 bg-[color:var(--surface)] overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Banner */}
        <div className="relative h-32 bg-gradient-to-br from-wave/20 to-moss/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <div className="w-16 h-16 rounded-full border-4 border-[color:var(--surface)] overflow-hidden bg-ink/10">
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-wave">
                {creator.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 pt-8">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-ink truncate group-hover:text-wave transition-colors">
                  {creator.name}
                </h3>
                {creator.isVerified && (
                  <CheckCircle className="w-4 h-4 text-wave shrink-0" />
                )}
              </div>
              <p className="text-sm text-ink/50">@{creator.username}</p>
            </div>
          </div>

          <p className="text-sm text-ink/70 line-clamp-2 mb-4">
            {creator.description}
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {creator.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-ink/10 text-ink/70 capitalize"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-ink/60">
              <Package className="w-4 h-4" />
              <span>{creator.productCount} products</span>
            </div>
            <div className="flex items-center gap-1 text-ink/60">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{creator.rating}</span>
            </div>
          </div>

          {/* Sales badge */}
          {creator.totalSales > 50 && (
            <div className="mt-3 pt-3 border-t border-ink/10">
              <div className="flex items-center gap-1.5 text-xs text-wave font-medium">
                <Store className="w-3.5 h-3.5" />
                <span>{creator.totalSales}+ sales</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
