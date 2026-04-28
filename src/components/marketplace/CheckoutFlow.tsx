"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, CreditCard, Package, CheckCircle } from "lucide-react";
import { Button } from "@/components/Button";
import { CartItem, ShippingAddress } from "@/types/marketplace";
import { ShippingAddressForm } from "./ShippingAddressForm";
import { PaymentMethod } from "./PaymentMethod";
import { OrderSummary } from "./OrderSummary";

type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation";

interface CheckoutFlowProps {
  items: CartItem[];
  onComplete: (orderId: string) => void;
  onCancel: () => void;
}

export function CheckoutFlow({ items, onComplete, onCancel }: CheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps: { id: CheckoutStep; label: string; icon: React.ReactNode }[] = [
    { id: "cart", label: "Cart", icon: <ShoppingCart className="w-5 h-5" /> },
    { id: "shipping", label: "Shipping", icon: <Package className="w-5 h-5" /> },
    { id: "payment", label: "Payment", icon: <CreditCard className="w-5 h-5" /> },
    { id: "confirmation", label: "Confirm", icon: <CheckCircle className="w-5 h-5" /> },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  const handleShippingSubmit = (address: ShippingAddress) => {
    setShippingAddress(address);
    handleNext();
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((r) => setTimeout(r, 2000));
      const orderId = `ORD-${Date.now()}`;
      onComplete(orderId);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const hasPhysicalItems = items.some((item) => item.product.type === "physical");
  const shipping = hasPhysicalItems ? (subtotal > 100 ? 0 : 10) : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                    index <= currentStepIndex
                      ? "border-wave bg-wave text-white"
                      : "border-ink/20 bg-[color:var(--surface)] text-ink/40"
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-sm font-medium mt-2 ${
                    index <= currentStepIndex ? "text-ink" : "text-ink/40"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 transition-colors ${
                    index < currentStepIndex ? "bg-wave" : "bg-ink/20"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {currentStep === "cart" && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6"
              >
                <h2 className="text-xl font-bold text-ink mb-4">Review Your Cart</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 pb-4 border-b border-ink/10 last:border-0">
                      <div className="w-20 h-20 rounded-lg bg-ink/5 overflow-hidden">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-ink">{item.product.name}</h3>
                        <p className="text-sm text-ink/60 mt-1">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-ink">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                  <Button onClick={handleNext} className="flex-1">Continue to Shipping</Button>
                </div>
              </motion.div>
            )}

            {currentStep === "shipping" && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6"
              >
                <h2 className="text-xl font-bold text-ink mb-4">Shipping Address</h2>
                <ShippingAddressForm
                  onSubmit={handleShippingSubmit}
                  onBack={handleBack}
                  initialData={shippingAddress || undefined}
                />
              </motion.div>
            )}

            {currentStep === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="rounded-xl border border-ink/10 bg-[color:var(--surface)] p-6"
              >
                <h2 className="text-xl font-bold text-ink mb-4">Payment Method</h2>
                <PaymentMethod
                  total={total}
                  onSubmit={handlePayment}
                  onBack={handleBack}
                  isProcessing={isProcessing}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <OrderSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
