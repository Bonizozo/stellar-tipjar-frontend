"use client";

import { useState } from "react";
import { Wallet, CreditCard } from "lucide-react";
import { Button } from "@/components/Button";
import { useWalletContext } from "@/contexts/WalletContext";

interface PaymentMethodProps {
  total: number;
  onSubmit: () => void;
  onBack: () => void;
  isProcessing?: boolean;
}

export function PaymentMethod({ total, onSubmit, onBack, isProcessing }: PaymentMethodProps) {
  const [paymentMethod, setPaymentMethod] = useState<"stellar" | "card">("stellar");
  const { isConnected, balance } = useWalletContext();

  const xlmPrice = 0.20; // Mock XLM price
  const totalXLM = (total / xlmPrice).toFixed(2);
  const hasEnoughBalance = parseFloat(balance) >= parseFloat(totalXLM);

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setPaymentMethod("stellar")}
          className={`w-full p-4 rounded-lg border-2 transition-colors ${
            paymentMethod === "stellar"
              ? "border-wave bg-wave/5"
              : "border-ink/10 hover:border-ink/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === "stellar" ? "border-wave" : "border-ink/20"
            }`}>
              {paymentMethod === "stellar" && (
                <div className="w-3 h-3 rounded-full bg-wave" />
              )}
            </div>
            <Wallet className="w-5 h-5 text-wave" />
            <div className="flex-1 text-left">
              <p className="font-semibold text-ink">Pay with Stellar (XLM)</p>
              <p className="text-sm text-ink/60">Fast, secure blockchain payment</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-ink">{totalXLM} XLM</p>
              <p className="text-xs text-ink/50">${total.toFixed(2)}</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod("card")}
          className={`w-full p-4 rounded-lg border-2 transition-colors ${
            paymentMethod === "card"
              ? "border-wave bg-wave/5"
              : "border-ink/10 hover:border-ink/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === "card" ? "border-wave" : "border-ink/20"
            }`}>
              {paymentMethod === "card" && (
                <div className="w-3 h-3 rounded-full bg-wave" />
              )}
            </div>
            <CreditCard className="w-5 h-5 text-ink/60" />
            <div className="flex-1 text-left">
              <p className="font-semibold text-ink">Credit/Debit Card</p>
              <p className="text-sm text-ink/60">Traditional payment method</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-ink">${total.toFixed(2)}</p>
            </div>
          </div>
        </button>
      </div>

      {/* Stellar Payment Details */}
      {paymentMethod === "stellar" && (
        <div className="rounded-lg border border-ink/10 bg-ink/5 p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-ink/60">Your Balance:</span>
            <span className="font-medium text-ink">{balance} XLM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ink/60">Required:</span>
            <span className="font-medium text-ink">{totalXLM} XLM</span>
          </div>
          {!isConnected && (
            <div className="text-sm text-yellow-600 dark:text-yellow-400">
              Please connect your Stellar wallet to continue
            </div>
          )}
          {isConnected && !hasEnoughBalance && (
            <div className="text-sm text-red-600 dark:text-red-400">
              Insufficient balance. You need {(parseFloat(totalXLM) - parseFloat(balance)).toFixed(2)} more XLM.
            </div>
          )}
        </div>
      )}

      {/* Card Payment Form */}
      {paymentMethod === "card" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Expiry</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-2 rounded-lg border border-ink/10 bg-[color:var(--surface)] text-ink focus:outline-none focus:ring-2 focus:ring-wave/50"
              />
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onBack} disabled={isProcessing}>
          Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isProcessing || (paymentMethod === "stellar" && (!isConnected || !hasEnoughBalance))}
          className="flex-1"
        >
          {isProcessing ? "Processing..." : `Pay ${paymentMethod === "stellar" ? `${totalXLM} XLM` : `$${total.toFixed(2)}`}`}
        </Button>
      </div>
    </div>
  );
}
