"use client";

import { useState } from "react";
import { Package, Truck, CheckCircle, XCircle, Clock, Search, Filter } from "lucide-react";
import { Order, OrderStatus } from "@/types/marketplace";
import { OrderDetailsModal } from "./OrderDetailsModal";

interface OrderManagementProps {
  orders: Order[];
  isLoading?: boolean;
  onUpdateStatus?: (orderId: string, status: OrderStatus) => void;
}

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
  refunded: {
    label: "Refunded",
    icon: XCircle,
    color: "text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400",
  },
} as const;

export function OrderManagement({ orders, isLoading, onUpdateStatus }: OrderManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6 animate-pulse">
            <div className="h-4 bg-ink/10 rounded w-1/4 mb-3" />
            <div className="h-3 bg-ink/10 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-wave/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-ink/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "all")}
            className="px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
          >
            <option value="all">All Status</option>
            {Object.entries(STATUS_CONFIG).map(([status, config]) => (
              <option key={status} value={status}>
                {config.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-12 text-center">
          <Package className="w-16 h-16 text-ink/20 mx-auto mb-4" />
          <p className="text-ink/50 text-lg">No orders found</p>
          <p className="text-ink/30 text-sm mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const config = STATUS_CONFIG[order.status];
            const StatusIcon = config.icon;

            return (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-5 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-ink">Order #{order.id}</h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${config.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </div>
                    <p className="text-sm text-ink/50">
                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-ink">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-ink/50">{order.totalXLM} XLM</p>
                  </div>
                </div>

                {/* Items preview */}
                <div className="space-y-2">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 rounded bg-ink/5 overflow-hidden shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-ink/70 truncate flex-1">
                        {item.product.name} × {item.quantity}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-xs text-ink/40 pl-13">
                      +{order.items.length - 2} more items
                    </p>
                  )}
                </div>

                {/* Tracking number */}
                {order.trackingNumber && (
                  <div className="mt-4 pt-4 border-t border-ink/10">
                    <p className="text-xs text-ink/50">
                      Tracking: <span className="font-mono text-ink">{order.trackingNumber}</span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </div>
  );
}
