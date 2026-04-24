'use client';

import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Button from './Button';
import { CartItem } from '@/hooks/useStore';

interface ShoppingCartProps {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  isCheckingOut?: boolean;
  onContinueShopping?: () => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isCheckingOut = false,
  onContinueShopping,
}) => {
  const [showOrderSummary, setShowOrderSummary] = useState(true);

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
            Your shopping cart is empty
          </p>
          {onContinueShopping && (
            <Button onClick={onContinueShopping} className="bg-blue-600 hover:bg-blue-700">
              Continue Shopping
            </Button>
          )}
        </div>
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const calculatedTotal = subtotal + tax + shipping;

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Shopping Cart ({items.length} items)
          </h2>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.product.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Unit Price: ${item.product.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1 || isCheckingOut}
                    className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    disabled={isCheckingOut}
                    className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right w-24">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  disabled={isCheckingOut}
                  className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 disabled:opacity-50"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => setShowOrderSummary(!showOrderSummary)}
          className="w-full px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Order Summary
          </h2>
          <span className="text-gray-600 dark:text-gray-400">
            {showOrderSummary ? '−' : '+'}
          </span>
        </button>

        {showOrderSummary && (
          <div className="px-6 py-4 space-y-3">
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Shipping:</span>
              <span className={shipping === 0 ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            {shipping === 0 && (
              <p className="text-xs text-green-600 dark:text-green-400 text-right">
                Free shipping on orders over $100!
              </p>
            )}

            <div className="border-t border-gray-200 dark:border-gray-600 pt-3 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
              <span>Total:</span>
              <span>${calculatedTotal.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Button */}
      <Button
        onClick={onCheckout}
        disabled={items.length === 0 || isCheckingOut}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-lg py-3 flex items-center justify-center gap-2"
      >
        {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
        <ArrowRight className="w-5 h-5" />
      </Button>

      {onContinueShopping && (
        <Button
          onClick={onContinueShopping}
          className="w-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
        >
          Continue Shopping
        </Button>
      )}
    </div>
  );
};

export default ShoppingCart;
