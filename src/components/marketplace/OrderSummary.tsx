"use client";

import { Package } from "lucide-react";
import { CartItem } from "@/types/marketplace";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export function OrderSummary({ items, subtotal, shipping, tax, total }: OrderSummaryProps) {
  return (
    <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6 sticky top-6">
      <h3 className="text-lg font-bold text-ink mb-4">Order Summary</h3>

      {/* Items */}
      <div className="space-y-3 mb-4 pb-4 border-b border-ink/10">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3">
            <div className="w-12 h-12 rounded-lg bg-ink/5 overflow-hidden shrink-0">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink truncate">{item.product.name}</p>
              <p className="text-xs text-ink/50">Qty: {item.quantity}</p>
            </div>
            <div className="text-sm font-medium text-ink">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-ink/60">Subtotal</span>
          <span className="font-medium text-ink">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ink/60">Shipping</span>
          <span className={`font-medium ${shipping === 0 ? "text-green-600" : "text-ink"}`}>
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ink/60">Tax</span>
          <span className="font-medium text-ink">${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="pt-4 border-t border-ink/10">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-ink">Total</span>
          <span className="text-2xl font-bold text-ink">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Free shipping notice */}
      {shipping > 0 && subtotal < 100 && (
        <div className="mt-4 p-3 rounded-lg bg-wave/10 text-sm text-wave">
          <Package className="w-4 h-4 inline mr-1" />
          Add ${(100 - subtotal).toFixed(2)} more for free shipping!
        </div>
      )}
    </div>
  );
}
