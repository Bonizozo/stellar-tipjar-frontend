"use client";

import { useState } from "react";
import { Store, Plus, TrendingUp, Package, DollarSign } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { OrderManagement } from "@/components/marketplace/OrderManagement";
import { useCreatorMarketplace } from "@/hooks/useCreatorMarketplace";

export default function CreatorMarketplaceDashboard() {
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const { products, orders, stats, isLoading, updateOrderStatus } = useCreatorMarketplace();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Marketplace Dashboard</h1>
          <p className="text-ink/60 mt-1">Manage your products and orders</p>
        </div>
        <Link href="/marketplace/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-wave/10">
              <Package className="w-5 h-5 text-wave" />
            </div>
            <span className="text-sm text-ink/60">Products</span>
          </div>
          <p className="text-2xl font-bold text-ink">{stats.totalProducts}</p>
        </div>

        <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-500/10">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-ink/60">Total Sales</span>
          </div>
          <p className="text-2xl font-bold text-ink">{stats.totalSales}</p>
        </div>

        <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-ink/60">Revenue</span>
          </div>
          <p className="text-2xl font-bold text-ink">${stats.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Store className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-sm text-ink/60">Active Orders</span>
          </div>
          <p className="text-2xl font-bold text-ink">{stats.activeOrders}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-ink/5 p-1 w-fit">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "products"
              ? "bg-[color:var(--surface)] text-ink shadow-sm"
              : "text-ink/60 hover:text-ink"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "orders"
              ? "bg-[color:var(--surface)] text-ink shadow-sm"
              : "text-ink/60 hover:text-ink"
          }`}
        >
          Orders
        </button>
      </div>

      {/* Content */}
      {activeTab === "products" ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-ink">Your Products</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-4 animate-pulse">
                  <div className="h-32 bg-ink/10 rounded-lg mb-3" />
                  <div className="h-4 bg-ink/10 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-ink/10 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-12 text-center">
              <Package className="w-16 h-16 text-ink/20 mx-auto mb-4" />
              <p className="text-ink/50 text-lg mb-4">No products yet</p>
              <Link href="/marketplace/create">
                <Button>Create Your First Product</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((listing) => (
                <div
                  key={listing.product.id}
                  className="rounded-xl border border-ink/10 bg-[color:var(--surface)] overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-32 bg-ink/5 overflow-hidden">
                    <img
                      src={listing.product.images[0]}
                      alt={listing.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-ink mb-1">{listing.product.name}</h3>
                    <p className="text-sm text-ink/60 line-clamp-2 mb-3">
                      {listing.product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-ink">
                        ${listing.product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-ink/50">
                        {listing.sales} sales
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <OrderManagement
          orders={orders}
          isLoading={isLoading}
          onUpdateStatus={updateOrderStatus}
        />
      )}
    </div>
  );
}
