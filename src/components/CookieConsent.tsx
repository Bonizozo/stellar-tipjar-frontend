"use client";

/**
 * GDPR / CCPA cookie consent banner (#228).
 *
 * Shown once on first visit. Stores the user's choice in localStorage
 * and updates Google Analytics consent accordingly.
 * Hides immediately if consent has already been given or declined.
 */

import { useEffect, useState } from "react";
import { updateConsent } from "@/lib/analytics/gtag";
import { trackConsentAccepted, trackConsentDeclined } from "@/lib/analytics/events";

const CONSENT_KEY = "cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    updateConsent(true);
    trackConsentAccepted();
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
    updateConsent(false);
    trackConsentDeclined();
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg"
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-600">
          We use cookies to improve your experience and analyse site usage.{" "}
          <a href="/privacy" className="text-purple-600 hover:underline">
            Learn more
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleDecline}
            className="rounded px-4 py-2 text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
