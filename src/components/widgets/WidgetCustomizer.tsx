"use client";

import { useState } from "react";
import { TipButton } from "./TipButton";
import { TipCard } from "./TipCard";

type WidgetType = "button" | "card";

interface Config {
  username: string;
  displayName: string;
  bio: string;
  accentColor: string;
  label: string;
  size: "sm" | "md" | "lg";
  showMessage: boolean;
  compact: boolean;
  defaultAsset: string;
}

const DEFAULT_CONFIG: Config = {
  username: "alice",
  displayName: "Alice",
  bio: "Creator & developer building cool things.",
  accentColor: "#0f6c7b",
  label: "Send a Tip ⭐",
  size: "md",
  showMessage: true,
  compact: false,
  defaultAsset: "XLM",
};

function buildEmbedCode(type: WidgetType, config: Config, baseUrl: string): string {
  const params = new URLSearchParams({
    username: config.username,
    type,
    accentColor: config.accentColor,
    label: config.label,
    size: config.size,
    showMessage: String(config.showMessage),
    compact: String(config.compact),
    defaultAsset: config.defaultAsset,
    displayName: config.displayName,
    bio: config.bio,
  });

  return `<iframe
  src="${baseUrl}/widgets/embed?${params.toString()}"
  width="${type === "button" ? "200" : "380"}"
  height="${type === "button" ? "50" : config.compact ? "220" : "380"}"
  frameborder="0"
  scrolling="no"
  style="border:none;overflow:hidden;"
  title="Tip ${config.username} on Stellar Tip Jar"
  loading="lazy"
></iframe>`;
}

export function WidgetCustomizer() {
  const [type, setType] = useState<WidgetType>("card");
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [copied, setCopied] = useState(false);

  const baseUrl =
    typeof window !== "undefined" ? `${window.location.protocol}//${window.location.host}` : "";

  const embedCode = buildEmbedCode(type, config, baseUrl);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const set = <K extends keyof Config>(key: K, value: Config[K]) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  const labelStyle = "block text-sm font-medium text-ink mb-1";
  const inputStyle =
    "w-full rounded-xl border border-ink/20 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-wave/30";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Controls */}
      <div className="space-y-5 rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 shadow-card">
        <h2 className="text-lg font-semibold text-ink">Customize Widget</h2>

        {/* Widget type */}
        <div>
          <span className={labelStyle}>Widget Type</span>
          <div className="flex gap-2">
            {(["button", "card"] as WidgetType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                aria-pressed={type === t}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                  type === t
                    ? "border-wave bg-wave/10 text-wave"
                    : "border-ink/20 text-ink/60 hover:border-wave/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Username */}
        <label className="block">
          <span className={labelStyle}>Creator Username</span>
          <input
            className={inputStyle}
            value={config.username}
            onChange={(e) => set("username", e.target.value)}
            placeholder="alice"
          />
        </label>

        {/* Display name */}
        <label className="block">
          <span className={labelStyle}>Display Name</span>
          <input
            className={inputStyle}
            value={config.displayName}
            onChange={(e) => set("displayName", e.target.value)}
            placeholder="Alice"
          />
        </label>

        {/* Bio (card only) */}
        {type === "card" && (
          <label className="block">
            <span className={labelStyle}>Bio</span>
            <input
              className={inputStyle}
              value={config.bio}
              onChange={(e) => set("bio", e.target.value)}
              placeholder="Short bio..."
            />
          </label>
        )}

        {/* Button label (button only) */}
        {type === "button" && (
          <label className="block">
            <span className={labelStyle}>Button Label</span>
            <input
              className={inputStyle}
              value={config.label}
              onChange={(e) => set("label", e.target.value)}
              placeholder="Send a Tip ⭐"
            />
          </label>
        )}

        {/* Accent color */}
        <div>
          <span className={labelStyle}>Accent Color</span>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={config.accentColor}
              onChange={(e) => set("accentColor", e.target.value)}
              className="h-9 w-14 cursor-pointer rounded-lg border border-ink/20"
              aria-label="Pick accent color"
            />
            <input
              className={`${inputStyle} flex-1`}
              value={config.accentColor}
              onChange={(e) => set("accentColor", e.target.value)}
              placeholder="#0f6c7b"
            />
          </div>
        </div>

        {/* Default asset */}
        <label className="block">
          <span className={labelStyle}>Default Asset</span>
          <input
            className={inputStyle}
            value={config.defaultAsset}
            onChange={(e) => set("defaultAsset", e.target.value.toUpperCase())}
            maxLength={12}
            placeholder="XLM"
          />
        </label>

        {/* Size (button only) */}
        {type === "button" && (
          <div>
            <span className={labelStyle}>Size</span>
            <div className="flex gap-2">
              {(["sm", "md", "lg"] as Config["size"][]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("size", s)}
                  aria-pressed={config.size === s}
                  className={`rounded-xl border px-3 py-1.5 text-sm font-semibold uppercase transition-colors ${
                    config.size === s
                      ? "border-wave bg-wave/10 text-wave"
                      : "border-ink/20 text-ink/60 hover:border-wave/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Card options */}
        {type === "card" && (
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={config.showMessage}
                onChange={(e) => set("showMessage", e.target.checked)}
                className="rounded"
              />
              Show message field
            </label>
            <label className="flex items-center gap-2 text-sm text-ink">
              <input
                type="checkbox"
                checked={config.compact}
                onChange={(e) => set("compact", e.target.checked)}
                className="rounded"
              />
              Compact mode
            </label>
          </div>
        )}
      </div>

      {/* Preview + embed code */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 shadow-card">
          <h2 className="mb-4 text-lg font-semibold text-ink">Preview</h2>
          <div className="flex items-start justify-center rounded-xl bg-ink/5 p-6">
            {type === "button" ? (
              <TipButton
                username={config.username}
                label={config.label}
                color={config.accentColor}
                size={config.size}
              />
            ) : (
              <TipCard
                username={config.username}
                displayName={config.displayName}
                bio={config.bio}
                accentColor={config.accentColor}
                showMessage={config.showMessage}
                compact={config.compact}
                defaultAsset={config.defaultAsset}
              />
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Embed Code</h2>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy embed code to clipboard"
              className="rounded-xl border border-ink/20 px-3 py-1.5 text-xs font-semibold text-ink/70 transition-colors hover:border-wave/40 hover:text-wave"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-xl bg-ink/5 p-4 text-xs text-ink/80 whitespace-pre-wrap break-all">
            {embedCode}
          </pre>
          <p className="mt-3 text-xs text-ink/50">
            Paste this snippet anywhere on your website, blog, or README.
          </p>
        </div>
      </div>
    </div>
  );
}
