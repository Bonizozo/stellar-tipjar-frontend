"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Store, TrendingUp, Package, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useMarketplace } from "@/hooks/useMarketplace";
import { CreatorStoreCard } from "@/components/marketplace/CreatorStoreCard";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { creators, isLoading, stats } = useMarketplace();

  const filteredCreators = creators.filter((creator) => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || creator.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-8 md:p-12">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Store className="w-8 h-8 text-wave" />
            <h1 className="text-4xl font-bold text-ink">Creator Marketplace</h1>
          </div>
          <p className="text-lg text-ink/70 max-w-2xl">
            Discover and purchase digital products, exclusive content, and services directly from your favorite creators.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-ink/5 rounded-xl p-4">
              <div className="flex items-center gap-2 text-ink/60 text-sm mb-1">
                <Store className="w-4 h-4" />
                <span>Active Stores</span>
              </div>
              <p className="text-2xl font-bold text-ink">{stats.totalStores}</p>
            </div>
            <div className="bg-ink/5 rounded-xl p-4">
              <div className="flex items-center gap-2 text-ink/60 text-sm mb-1">
                <Package className="w-4 h-4" />
                <span>Products</span>
              </div>
              <p className="text-2xl font-bold text-ink">{stats.totalProducts}</p>
            </div>
            <div className="bg-ink/5 rounded-xl p-4">
              <div className="flex items-center gap-2 text-ink/60 text-sm mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>Sales</span>
              </div>
              <p className="text-2xl font-bold text-ink">{stats.totalSales}</p>
            </div>
            <div className="bg-ink/5 rounded-xl p-4">
              <div className="flex items-center gap-2 text-ink/60 text-sm mb-1">
                <Users className="w-4 h-4" />
                <span>Buyers</span>
              </div>
              <p className="text-2xl font-bold text-ink">{stats.totalBuyers}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <MarketplaceFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Creator Stores Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-ink">Browse Stores</h2>
          <Link href="/marketplace/create">
            <Button>Create Your Store</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6 animate-pulse">
                <div className="h-32 bg-ink/10 rounded-lg mb-4" />
                <div className="h-4 bg-ink/10 rounded w-3/4 mb-2" />
                <div className="h-3 bg-ink/10 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredCreators.length === 0 ? (
          <div className="text-center py-16">
            <Store className="w-16 h-16 text-ink/20 mx-auto mb-4" />
            <p className="text-ink/50 text-lg">No stores found</p>
            <p className="text-ink/30 text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filteredCreators.map((creator) => (
              <CreatorStoreCard key={creator.id} creator={creator} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
