"use client";

import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { RefundRequest } from "@/hooks/useRefunds";

interface RefundRequestProps {
  onSuccess?: () => void;
  requestRefund: (input: { tipId: string; amount: number; memo?: string; tipDate: string }) => void;
  isInGracePeriod: (tipDate: string) => boolean;
}

export function RefundRequestComponent({ requestRefund, isInGracePeriod, onSuccess }: RefundRequestProps) {
  const [tipId, setTipId] = useState("");
  const [amount, setAmount] = useState(0);
  const [tipDate, setTipDate] = useState(new Date().toISOString().slice(0, 10));
  const [memo, setMemo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const graceAllowed = useMemo(() => isInGracePeriod(tipDate), [isInGracePeriod, tipDate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      if (!tipId || amount <= 0) {
        throw new Error("Tip ID and positive amount are required");
      }
      requestRefund({ tipId, amount, memo, tipDate });
      setSuccess("Refund request submitted and awaiting creator approval.");
      setTipId("");
      setAmount(0);
      setMemo("");
      onSuccess?.();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="space-y-4 rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-6 shadow-card">
      <h2 className="text-xl font-semibold text-ink">Request a Refund</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-ink/80">
          Tip ID
          <input
            value={tipId}
            onChange={(e) => setTipId(e.target.value)}
            type="text"
            className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm"
            placeholder="abcd1234"
          />
        </label>
        <label className="block text-sm font-medium text-ink/80">
          Amount (XLM)
          <input
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            type="number"
            step="0.01"
            className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm"
            placeholder="15.00"
          />
        </label>
        <label className="block text-sm font-medium text-ink/80">
          Tip Date
          <input
            value={tipDate}
            onChange={(e) => setTipDate(e.target.value)}
            type="date"
            className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm"
          />
        </label>
        <label className="block text-sm font-medium text-ink/80">
          Reason (optional)
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 text-sm"
            placeholder="Explain why you need a refund"
          />
        </label>

        {!graceAllowed && (
          <p className="text-sm text-red-600">Tip is outside the 14-day grace period and cannot be refunded.</p>
        )}

        <div className="flex gap-2">
          <Button type="submit" disabled={!tipId || amount <= 0 || !graceAllowed}>
            Submit refund request
          </Button>
        </div>
      </form>
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
      {success && <p className="text-sm font-medium text-green-600">{success}</p>}
    </div>
  );
}
