/**
 * QuickTip - Embeddable React component for the quick-tip overlay.
 * Used if you want to render the tip UI inside a React host app or
 * a future extension options page. The content script uses a vanilla
 * JS version for zero-dependency injection into arbitrary pages.
 */

import { useState } from "react";

interface Creator {
  username: string;
  displayName?: string;
  preferredAsset?: string;
}

interface QuickTipProps {
  creator: Creator;
  /** Called when the user closes/cancels */
  onClose: () => void;
  /** Called after a successful tip intent is created */
  onSuccess?: (intentId: string) => void;
  apiBase?: string;
}

const QUICK_AMOUNTS = [1, 5, 10, 25];

export function QuickTip({
  creator,
  onClose,
  onSuccess,
  apiBase = "http://localhost:8000",
}: QuickTipProps) {
  const [amount, setAmount] = useState("5");
  const [message, setMessage] = useState("");
  const [assetCode] = useState(creator.preferredAsset ?? "XLM");
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    const parsed = parseFloat(amount);
    if (!parsed || parsed < 0.01) {
      setStatus({ type: "error", text: "Minimum tip is 0.01 XLM." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${apiBase}/tips/intents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: creator.username,
          amount: parsed.toString(),
          assetCode,
          ...(message ? { message } : {}),
        }),
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data: { intentId: string; checkoutUrl?: string } = await res.json();

      setStatus({ type: "success", text: "Tip sent!" });
      onSuccess?.(data.intentId);
      setTimeout(onClose, 1800);
    } catch (e) {
      setStatus({
        type: "error",
        text: e instanceof Error ? e.message : "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  }

  const displayLabel =
    creator.displayName && creator.displayName !== `@${creator.username}`
      ? `${creator.displayName} (@${creator.username})`
      : `@${creator.username}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Tip ${displayLabel}`}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2147483647,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: "#0f0f1a",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
          color: "#e8e8f0",
          maxWidth: 340,
          padding: 24,
          position: "relative",
          width: "90vw",
        }}
      >
        {/* Close */}
        <button
          aria-label="Close"
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
            fontSize: 20,
            lineHeight: 1,
            position: "absolute",
            right: 16,
            top: 14,
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div
            style={{
              background: "linear-gradient(135deg,#7c3aed,#2563eb)",
              borderRadius: 8,
              fontSize: 18,
              height: 36,
              width: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ⭐
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Tip {displayLabel}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>via Stellar TipJar</div>
          </div>
        </div>

        {/* Quick amounts */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {QUICK_AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(String(a))}
              style={{
                flex: 1,
                background: amount === String(a) ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${amount === String(a) ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 6,
                color: amount === String(a) ? "#c4b5fd" : "#e8e8f0",
                cursor: "pointer",
                fontSize: 12,
                padding: "7px 4px",
              }}
            >
              {a} XLM
            </button>
          ))}
        </div>

        {/* Amount input */}
        <div style={{ marginBottom: 12 }}>
          <label
            htmlFor="qt-amount"
            style={{
              display: "block",
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 5,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Amount ({assetCode})
          </label>
          <input
            id="qt-amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              color: "#e8e8f0",
              fontSize: 14,
              padding: "9px 12px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Message input */}
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="qt-message"
            style={{
              display: "block",
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              marginBottom: 5,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Message (optional)
          </label>
          <input
            id="qt-message"
            type="text"
            maxLength={500}
            placeholder="Great work!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              color: "#e8e8f0",
              fontSize: 14,
              padding: "9px 12px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            background: "linear-gradient(135deg,#7c3aed,#2563eb)",
            border: "none",
            borderRadius: 8,
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: 14,
            fontWeight: 500,
            opacity: loading ? 0.6 : 1,
            padding: 11,
            width: "100%",
          }}
        >
          {loading ? "Sending..." : "Send Tip"}
        </button>

        {/* Status */}
        {status && (
          <div
            role="status"
            aria-live="polite"
            style={{
              borderRadius: 8,
              fontSize: 12,
              marginTop: 10,
              padding: "9px 12px",
              textAlign: "center",
              background:
                status.type === "success"
                  ? "rgba(34,197,94,0.1)"
                  : "rgba(239,68,68,0.1)",
              border: `1px solid ${status.type === "success" ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
              color: status.type === "success" ? "#86efac" : "#fca5a5",
            }}
          >
            {status.text}
          </div>
        )}
      </div>
    </div>
  );
}
