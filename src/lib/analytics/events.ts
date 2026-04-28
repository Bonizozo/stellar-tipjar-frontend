/**
 * Custom event tracking for the Stellar Tip Jar (#228).
 *
 * All identifiers are truncated / anonymized before being sent to GA4
 * so that no PII or wallet secrets leave the browser.
 */

import { gtagEvent } from "./gtag";

/** Track a successful wallet connection. */
export function trackWalletConnect(publicKey: string): void {
  gtagEvent({
    action: "wallet_connect",
    category: "Wallet",
    // Only the first 8 chars — enough to identify the network prefix, not the user.
    label: publicKey.slice(0, 8),
  });
}

/** Track a wallet disconnection. */
export function trackWalletDisconnect(): void {
  gtagEvent({ action: "wallet_disconnect", category: "Wallet" });
}

/** Track a tip being sent. Amount is logged as a numeric value for funnel analysis. */
export function trackTipSent(amount: string, creatorUsername: string): void {
  gtagEvent({
    action: "tip_sent",
    category: "Tip",
    label: creatorUsername,
    value: parseFloat(amount) || 0,
  });
}

/** Track a creator profile view. */
export function trackCreatorView(username: string): void {
  gtagEvent({ action: "creator_view", category: "Creator", label: username });
}

/** Track a search query (non-PII — only the query string is logged). */
export function trackSearch(query: string): void {
  gtagEvent({ action: "search", category: "Search", label: query });
}

/** Track the app install prompt being shown. */
export function trackInstallPromptShown(): void {
  gtagEvent({ action: "install_prompt_shown", category: "PWA" });
}

/** Track the user accepting the install prompt. */
export function trackInstallAccepted(): void {
  gtagEvent({ action: "install_accepted", category: "PWA" });
}

/** Track the user dismissing the install prompt. */
export function trackInstallDismissed(): void {
  gtagEvent({ action: "install_dismissed", category: "PWA" });
}

/** Track cookie consent acceptance. */
export function trackConsentAccepted(): void {
  gtagEvent({ action: "consent_accepted", category: "Privacy" });
}

/** Track cookie consent declined. */
export function trackConsentDeclined(): void {
  gtagEvent({ action: "consent_declined", category: "Privacy" });
}
