"use client";

import { Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import { Order } from "@/hooks/useStore";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400",
  },
  processing: {
    label: "Processing",
    icon: Package,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    color: "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
  },
} as const;

const STEPS: Order["status"][] = ["pending", "processing", "shipped", "delivered"];

interface OrderTrackingProps {
  orders: Order[];
  isLoading?: boolean;
}

export function OrderTracking({ orders, isLoading }: OrderTrackingProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-5 animate-pulse">
            <div className="h-4 w-32 bg-ink/10 rounded mb-3" />
            <div className="h-3 w-48 bg-ink/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-10 text-center">
        <Package className="w-12 h-12 text-ink/20 mx-auto mb-3" />
        <p className="text-ink/50 font-medium">No orders yet</p>
        <p className="text-sm text-ink/30 mt-1">Your order history will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
        const StatusIcon = cfg.icon;
        const currentStep = STEPS.indexOf(order.status);

        return (
          <div
            key={order.id}
            className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-5 space-y-4"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="font-semibold text-ink text-sm">Order #{order.id}</p>
                <p className="text-xs text-ink/50 mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                {cfg.label}
              </span>
            </div>

            {/* Progress bar (only for non-cancelled) */}
            {order.status !== "cancelled" && (
              <div className="flex items-center gap-1">
                {STEPS.map((step, i) => {
                  const done = i <= currentStep;
                  return (
                    <div key={step} className="flex items-center flex-1">
                      <div
                        className={`h-2 flex-1 rounded-full transition-colors ${
                          done ? "bg-wave" : "bg-ink/10"
                        }`}
                      />
                      {i < STEPS.length - 1 && <div className="w-1" />}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Items */}
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-sm">
                  <span className="text-ink/70 truncate">
                    {item.product.name}{" "}
                    <span className="text-ink/40">×{item.quantity}</span>
                  </span>
                  <span className="font-medium text-ink ml-4 shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t border-ink/10 pt-3">
              <span className="text-sm text-ink/50">Total</span>
              <span className="font-bold text-ink">${order.total.toFixed(2)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
