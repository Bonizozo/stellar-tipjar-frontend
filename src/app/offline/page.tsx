export default function OfflinePage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
      <div className="rounded-full bg-ink/5 p-6">
        <svg
          className="h-16 w-16 text-ink/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
          />
        </svg>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-ink">You're Offline</h1>
        <p className="max-w-md text-ink/75">
          It looks like you've lost your internet connection. Some features may not be available
          until you're back online.
        </p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-wave px-6 py-3 text-sm font-medium text-white hover:bg-wave/90"
        >
          Try Again
        </button>
        
        <p className="text-sm text-ink/60">
          You can still browse cached pages while offline
        </p>
      </div>
    </section>
  );
}
