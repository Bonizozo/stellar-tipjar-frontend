"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ShoppingBag, ClipboardList, CheckCircle, AlertCircle } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import ShoppingCart from "@/components/ShoppingCart";
import { OrderTracking } from "@/components/OrderTracking";
import { useStore } from "@/hooks/useStore";
import { useWalletContext } from "@/contexts/WalletContext";
import { WalletConnector } from "@/components/WalletConnector";

type Tab = "shop" | "cart" | "orders";

const CATEGORIES = ["all", "apparel", "posters", "bundles", "accessories", "digital"];

export default function StorePage() {
  const params = useParams();
  const username = params.username as string;
  const { isConnected } = useWalletContext();

  const [activeTab, setActiveTab] = useState<Tab>("shop");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    products,
    isLoadingProducts,
    productsError,
    orders,
    isLoadingOrders,
    cart,
    cartTotal,
    cartTotalXLM,
    cartItemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    checkout,
    isCheckingOut,
    checkoutError,
    lastOrder,
  } = useStore(username);

  const cartItemsMap = new Map(cart.map((item) => [item.product.id, item.quantity]));

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "shop", label: "Shop", icon: <ShoppingBag className="w-4 h-4" /> },
    {
      id: "cart",
      label: "Cart",
      icon: <Package className="w-4 h-4" />,
      badge: cartItemCount || undefined,
    },
    {
      id: "orders",
      label: "Orders",
      icon: <ClipboardList className="w-4 h-4" />,
      badge: orders.length || undefined,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">
            @{username}&apos;s Store
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            Pay with XLM · Powered by Stellar
          </p>
        </div>
        {!isConnected && (
          <div className="shrink-0">
            <WalletConnector />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-ink/5 p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-[color:var(--surface)] text-ink shadow-sm"
                : "text-ink/60 hover:text-ink"
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-wave text-[10px] font-bold text-white">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Shop tab ── */}
        {activeTab === "shop" && (
          <motion.div
            key="shop"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                    selectedCategory === cat
                      ? "bg-wave text-white"
                      : "bg-ink/10 text-ink/70 hover:bg-ink/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {productsError && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Failed to load products. Please try again.
              </div>
            )}

            <ProductGrid
              products={filteredProducts}
              onAddToCart={(product, qty) => {
                addToCart(product, qty);
                setActiveTab("cart");
              }}
              isLoading={isLoadingProducts}
              cartItems={cartItemsMap}
              emptyMessage={`No ${selectedCategory === "all" ? "" : selectedCategory + " "}products available.`}
            />
          </motion.div>
        )}

        {/* ── Cart tab ── */}
        {activeTab === "cart" && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Wallet warning */}
            {!isConnected && cart.length > 0 && (
              <div className="flex items-start gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Wallet not connected</p>
                  <p className="text-sm mt-0.5">Connect your Freighter wallet to pay with XLM.</p>
                </div>
              </div>
            )}

            {/* Checkout error */}
            {checkoutError && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">{checkoutError}</p>
              </div>
            )}

            {/* Success */}
            {lastOrder && cart.length === 0 && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
              >
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Order placed!</p>
                  <p className="text-sm mt-0.5">
                    Order {lastOrder.id} · {lastOrder.totalXLM} XLM
                    {lastOrder.txHash && (
                      <> · tx: <span className="font-mono">{lastOrder.txHash.slice(0, 12)}…</span></>
                    )}
                  </p>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-sm underline mt-1"
                  >
                    View order tracking →
                  </button>
                </div>
              </motion.div>
            )}

            <ShoppingCart
              items={cart}
              total={cartTotal}
              totalXLM={cartTotalXLM}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onCheckout={checkout}
              isCheckingOut={isCheckingOut}
              onContinueShopping={() => setActiveTab("shop")}
            />
          </motion.div>
        )}

        {/* ── Orders tab ── */}
        {activeTab === "orders" && (
          <motion.div
            key="orders"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-ink mb-4">Order History</h2>
            <OrderTracking orders={orders} isLoading={isLoadingOrders} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
