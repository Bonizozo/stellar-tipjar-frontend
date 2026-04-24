'use client';

import React from 'react';
import { ShoppingCart, Eye, EyeOff } from 'lucide-react';
import Button from './Button';
import { Product } from '@/hooks/useStore';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  isInCart?: boolean;
  isLoading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isInCart = false,
  isLoading = false,
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [showDetails, setShowDetails] = React.useState(false);
  const availableInventory = product.inventory;
  const isOutOfStock = availableInventory === 0;

  const handleAddToCart = () => {
    if (quantity > 0 && !isOutOfStock) {
      onAddToCart(product, quantity);
      setQuantity(1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
          }}
        />

        {/* Inventory Badge */}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
            isOutOfStock
              ? 'bg-red-500 text-white'
              : availableInventory < 10
                ? 'bg-yellow-500 text-white'
                : 'bg-green-500 text-white'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : `${availableInventory} in stock`}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white capitalize">
          {product.category}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* SKU */}
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">SKU: {product.sku}</p>

        {/* Price */}
        <div className="mb-4 mt-auto">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Details Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium mb-3 flex items-center gap-1"
        >
          {showDetails ? (
            <>
              <EyeOff className="w-4 h-4" />
              Hide Details
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              View Details
            </>
          )}
        </button>

        {/* Details Section */}
        {showDetails && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300">
            <p className="mb-2">
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
          </div>
        )}

        {/* Add to Cart Section */}
        {!isOutOfStock && (
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1 || isLoading}
              className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              −
            </button>
            <span className="flex-1 text-center font-medium text-gray-900 dark:text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(availableInventory, quantity + 1))}
              disabled={quantity >= availableInventory || isLoading}
              className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              +
            </button>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isLoading}
          className={`w-full flex items-center justify-center gap-2 ${
            isInCart ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isLoading ? 'Adding...' : isInCart ? 'Already in Cart' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
