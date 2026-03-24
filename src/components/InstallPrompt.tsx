"use client";

import { useState } from "react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

export function InstallPrompt() {
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isInstalled || isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    const installed = await promptInstall();
    if (!installed) {
      setIsDismissed(true);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md sm:left-auto sm:right-4">
      <div className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-10 w-10 text-wave"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-ink">Install Stellar Tip Jar</h3>
            <p className="mt-1 text-xs text-ink/70">
              Install our app for quick access and offline support
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={handleInstall}
                className="rounded-lg bg-wave px-4 py-2 text-sm font-medium text-white hover:bg-wave/90"
              >
                Install
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="rounded-lg px-4 py-2 text-sm font-medium text-ink/60 hover:bg-ink/5"
              >
                Not now
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="flex-shrink-0 text-ink/40 hover:text-ink"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
