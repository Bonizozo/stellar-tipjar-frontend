"use client";

import { useState } from "react";
import { createTipIntent } from "@/services/api";

export interface TipCardConfig {
  username: string;
  displayName?: string;
  bio?: string;
  accentColor?: string;
  showMessage?: boolean;
  defaultAsset?: string;
  compact?: boolean;
}

const PRESET_AMOUNTS = [1, 5, 10, 25];

export function TipCard({
  username,
  displayName,
  bio,
  accentColor = "#0f6c7b",
  showMessage = true,
  defaultAsset = "XLM",
  compact = false,
}: TipCardConfig) {
  const [amount, setAmount] = useState("5");
  const [asset, setAsset] = useState(defaultAsset);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) {
      setStatus("error");
      setStatusMsg("Enter a valid amount.");
      return;
    }
    setStatus("loading");
    try {
      const intent = await createTipIntent({ username, amount, assetCode: asset });
      setStatus("success");
      setStatusMsg(
        intent.checkoutUrl
          ? `Tip created! Continue at: ${intent.checkoutUrl}`
          : `Tip intent created. ID: ${intent.intentId}`,
      );
      setAmount("5");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setStatusMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(0,0,0,0.15)",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      role="region"
      aria-label={`Tip ${displayName ?? username}`}
      style={{
        fontFamily: "system-ui, sans-serif",
        background: "#fffdf8",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "16px",
        padding: compact ? "16px" : "24px",
        maxWidth: compact ? "280px" : "360px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        color: "#151515",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "inline-block",
            background: `${accentColor}18`,
            color: accentColor,
            borderRadius: "6px",
            padding: "2px 8px",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "6px",
          }}
        >
          Stellar Tip Jar
        </div>
        <div style={{ fontWeight: 700, fontSize: compact ? "15px" : "17px" }}>
          {displayName ?? `@${username}`}
        </div>
        {bio && !compact && (
          <div style={{ fontSize: "13px", color: "#555", marginTop: "4px", lineHeight: 1.4 }}>
            {bio}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Preset amounts */}
        <div
          style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}
          role="group"
          aria-label="Preset tip amounts"
        >
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(String(preset))}
              aria-pressed={amount === String(preset)}
              style={{
                padding: "4px 10px",
                borderRadius: "8px",
                border: `1.5px solid ${amount === String(preset) ? accentColor : "rgba(0,0,0,0.15)"}`,
                background: amount === String(preset) ? `${accentColor}15` : "transparent",
                color: amount === String(preset) ? accentColor : "#555",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {preset} {asset}
            </button>
          ))}
        </div>

        {/* Amount + Asset row */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            aria-label="Tip amount"
            required
            style={{ ...inputStyle, flex: 2 }}
          />
          <input
            type="text"
            value={asset}
            onChange={(e) => setAsset(e.target.value.toUpperCase())}
            placeholder="XLM"
            maxLength={12}
            aria-label="Asset code"
            style={{ ...inputStyle, flex: 1 }}
          />
        </div>

        {/* Message */}
        {showMessage && !compact && (
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message (optional)"
            maxLength={500}
            aria-label="Optional message"
            rows={2}
            style={{
              ...inputStyle,
              resize: "vertical",
              marginBottom: "10px",
              minHeight: "60px",
            }}
          />
        )}

        {/* Status */}
        {status === "error" && (
          <p
            role="alert"
            style={{
              fontSize: "12px",
              color: "#ef4444",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              padding: "6px 10px",
              marginBottom: "10px",
            }}
          >
            {statusMsg}
          </p>
        )}
        {status === "success" && (
          <p
            role="status"
            style={{
              fontSize: "12px",
              color: "#16a34a",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "8px",
              padding: "6px 10px",
              marginBottom: "10px",
            }}
          >
            {statusMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          aria-busy={status === "loading"}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            background: accentColor,
            color: "#fff",
            fontWeight: 700,
            fontSize: "14px",
            cursor: status === "loading" ? "wait" : "pointer",
            opacity: status === "loading" ? 0.7 : 1,
            fontFamily: "inherit",
            transition: "opacity 0.15s",
          }}
        >
          {status === "loading" ? "Sending..." : `Send Tip ⭐`}
        </button>
      </form>

      <div style={{ marginTop: "10px", textAlign: "center", fontSize: "11px", color: "#aaa" }}>
        Powered by{" "}
        <a
          href="https://stellar.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: accentColor }}
        >
          Stellar
        </a>
      </div>
    </div>
  );
}
