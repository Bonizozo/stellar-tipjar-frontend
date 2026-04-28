"use client";

import { X, Package, MapPin, CreditCard, Truck } from "lucide-react";
import { Order, OrderStatus } from "@/types/marketplace";
import { Button } from "@/components/Button";
import { DigitalDelivery } from "./DigitalDelivery";

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus?: (orderId: string, status: OrderStatus) => void;
}

export function OrderDetailsModal({ order, onClose, onUpdateStatus }: OrderDetailsModalProps) {
  const handleDownload = async (productId: string) => {
    // Simulate download
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Downloading product:", productId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-[color:var(--surface)] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[color:var(--surface)] border-b border-ink/10 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ink">Order #{order.id}</h2>
            <p className="text-sm text-ink/50 mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-ink/10 transition-colors"
          >
            <X className="w-5 h-5 text-ink" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Items */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-wave" />
              <h3 className="text-lg font-bold text-ink">Items</h3>
            </div>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-lg border border-ink/10"
                >
                  <div className="w-20 h-20 rounded-lg bg-ink/5 overflow-hidden shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-ink">{item.product.name}</h4>
                    <p className="text-sm text-ink/60 mt-1">{item.product.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-ink/50">Qty: {item.quantity}</span>
                      <span className="text-ink/50">
                        ${item.product.price.toFixed(2)} each
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-ink">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Digital Downloads */}
          {order.digitalDownloads && order.digitalDownloads.length > 0 && (
            <section>
              <DigitalDelivery
                orderId={order.id}
                downloads={order.digitalDownloads}
                onDownload={handleDownload}
              />
            </section>
          )}

          {/* Shipping Address */}
          {order.shippingAddress && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-wave" />
                <h3 className="text-lg font-bold text-ink">Shipping Address</h3>
              </div>
              <div className="rounded-lg border border-ink/10 p-4">
                <p className="font-semibold text-ink">{order.shippingAddress.fullName}</p>
                <p className="text-sm text-ink/70 mt-2">
                  {order.shippingAddress.addressLine1}
                </p>
                {order.shippingAddress.addressLine2 && (
                  <p className="text-sm text-ink/70">{order.shippingAddress.addressLine2}</p>
                )}
                <p className="text-sm text-ink/70">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="text-sm text-ink/70">{order.shippingAddress.country}</p>
                {order.shippingAddress.phone && (
                  <p className="text-sm text-ink/70 mt-2">{order.shippingAddress.phone}</p>
                )}
              </div>
            </section>
          )}

          {/* Tracking */}
          {order.trackingNumber && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-wave" />
                <h3 className="text-lg font-bold text-ink">Tracking</h3>
              </div>
              <div className="rounded-lg border border-ink/10 p-4">
                <p className="text-sm text-ink/60 mb-1">Tracking Number</p>
                <p className="font-mono font-semibold text-ink">{order.trackingNumber}</p>
              </div>
            </section>
          )}

          {/* Payment Details */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-wave" />
              <h3 className="text-lg font-bold text-ink">Payment</h3>
            </div>
            <div className="rounded-lg border border-ink/10 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Subtotal</span>
                <span className="text-ink">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Shipping</span>
                <span className="text-ink">
                  {order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Tax</span>
                <span className="text-ink">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-ink/10">
                <span className="font-bold text-ink">Total</span>
                <div className="text-right">
                  <p className="font-bold text-ink">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-ink/50">{order.totalXLM} XLM</p>
                </div>
              </div>
              {order.txHash && (
                <div className="pt-2 border-t border-ink/10">
                  <p className="text-xs text-ink/50">Transaction Hash</p>
                  <p className="font-mono text-xs text-ink mt-1 break-all">{order.txHash}</p>
                </div>
              )}
            </div>
          </section>

          {/* Notes */}
          {order.notes && (
            <section>
              <h3 className="text-lg font-bold text-ink mb-3">Notes</h3>
              <div className="rounded-lg border border-ink/10 p-4">
                <p className="text-sm text-ink/70">{order.notes}</p>
              </div>
            </section>
          )}

          {/* Status Update (for creators) */}
          {onUpdateStatus && (
            <section>
              <h3 className="text-lg font-bold text-ink mb-3">Update Status</h3>
              <div className="flex flex-wrap gap-2">
                {(["pending", "processing", "shipped", "delivered", "cancelled"] as OrderStatus[]).map(
                  (status) => (
                    <Button
                      key={status}
                      variant={order.status === status ? "default" : "ghost"}
                      onClick={() => onUpdateStatus(order.id, status)}
                      className="capitalize"
                    >
                      {status}
                    </Button>
                  )
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
