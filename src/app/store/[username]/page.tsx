'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import ShoppingCart from '@/components/ShoppingCart';
import { useStore } from '@/hooks/useStore';
import { Package } from 'lucide-react';

export default function StorePage() {
  const params = useParams();
  const username = params.username as string;
  const [showCart, setShowCart] = useState(false);

  const {
    products,
    isLoadingProducts,
    productsError,
    cart,
    cartTotal,
    cartItemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    checkout,
    isCheckingOut,
  } = useStore(username);

  const cartItemsMap = new Map(cart.map((item) => [item.product.id, item.quantity]));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Store
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  by @{username}
                </p>
              </div>
            </div>

            {/* Cart Toggle */}
            <button
              onClick={() => setShowCart(!showCart)}
              className={`relative px-4 py-2 rounded-lg font-medium transition-colors ${
                showCart
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            {productsError && (
              <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4 mb-6 border border-red-200 dark:border-red-700">
                <p className="text-red-800 dark:text-red-100">
                  Error loading products. Please try again later.
                </p>
              </div>
            )}

            <ProductGrid
              products={products}
              onAddToCart={addToCart}
              isLoading={isLoadingProducts}
              cartItems={cartItemsMap}
            />
          </div>

          {/* Cart Section */}
          {showCart && (
            <div className="lg:col-span-1">
              <ShoppingCart
                items={cart}
                total={cartTotal}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onCheckout={checkout}
                isCheckingOut={isCheckingOut}
                onContinueShopping={() => setShowCart(false)}
              />
            </div>
          )}

          {/* Cart on Desktop */}
          <div className="hidden lg:block sticky top-20">
            <ShoppingCart
              items={cart}
              total={cartTotal}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onCheckout={checkout}
              isCheckingOut={isCheckingOut}
            />
          </div>
        </div>
      </div>

      {/* No Products Message */}
      {!isLoadingProducts && products.length === 0 && (
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Products Available
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This creator hasn't added any products to their store yet.
          </p>
        </div>
      )}
    </div>
  );
}
