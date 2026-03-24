"use client";

import { Button } from "@/components/Button";

interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
  /** Show the raw error message (dev only) */
  showDetails?: boolean;
}

export function ErrorFallback({ error, reset, showDetails = false }: ErrorFallbackProps) {
  return (
    <div className="soft-grid flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-8 text-center shadow-card">
      <span className="mb-4 text-5xl" role="img" aria-label="Error">
        ⚠️
      </span>
      <h2 className="text-xl font-bold tracking-tight text-ink">Something went wrong</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
        An unexpected error occurred. You can try again or refresh the page.
      </p>

      {showDetails && error?.message && (
        <pre className="mt-4 max-w-md overflow-auto rounded-xl bg-ink/5 px-4 py-3 text-left text-xs text-ink/60">
          {error.message}
        </pre>
      )}

      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="ghost" onClick={() => window.location.assign("/")}>
          Go home
        </Button>
      </div>
    </div>
  );
}
