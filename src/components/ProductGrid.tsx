'use client';

import React from 'react';
import { Product } from '@/hooks/useStore';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  cartItems?: Map<string, number>;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  isLoading = false,
  emptyMessage = 'No products available',
  cartItems = new Map(),
}) => {
  if (!isLoading && products.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {isLoading
        ? // Loading skeleton
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md animate-pulse h-96"
            >
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))
        : // Product cards
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              isInCart={cartItems.has(product.id)}
              isLoading={isLoading}
            />
          ))}
    </div>
  );
};

export default ProductGrid;
