/**
 * Deep link handler for Stellar Tip Jar.
 *
 * Resolves incoming URLs (from mobile apps, emails, QR codes, share sheets)
 * to internal Next.js routes, with input validation and analytics tracking.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type DeepLinkRoute =
  | { type: "creator"; username: string; path: string }
  | { type: "tip"; tipId: string; path: string }
  | { type: "explore"; path: string }
  | { type: "tips"; path: string }
  | { type: "widgets"; path: string }
  | { type: "home"; path: string }
  | { type: "unknown"; path: string };

export interface DeepLinkAnalyticsEvent {
  path: string;
  type: DeepLinkRoute["type"];
  source: string;
  timestamp: number;
}

// ─── Validation ───────────────────────────────────────────────────────────────

const USERNAME_RE = /^[a-zA-Z0-9_-]{1,39}$/;
const TIP_ID_RE = /^[a-zA-Z0-9_-]{1,64}$/;

// ─── Analytics ────────────────────────────────────────────────────────────────

type AnalyticsCallback = (event: DeepLinkAnalyticsEvent) => void;
const analyticsListeners = new Set<AnalyticsCallback>();

/** Subscribe to deep link analytics events. Returns an unsubscribe function. */
export function onDeepLinkAnalytics(cb: AnalyticsCallback): () => void {
  analyticsListeners.add(cb);
  return () => analyticsListeners.delete(cb);
}

function trackDeepLink(event: DeepLinkAnalyticsEvent): void {
  analyticsListeners.forEach((cb) => cb(event));
  if (process.env.NODE_ENV === "development") {
    console.debug("[DeepLink]", event);
  }
}

// ─── Core handler ─────────────────────────────────────────────────────────────

/**
 * Parse and validate a deep link URL, returning the resolved internal route.
 *
 * @param url    Full URL or path string, e.g. "https://stellartipjar.app/creator/alice"
 * @param source Where the link originated: "email" | "share" | "qr" | "app" | etc.
 */
export function handleDeepLink(url: string, source = "unknown"): DeepLinkRoute {
  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    try {
      parsed = new URL(url, "https://stellartipjar.app");
    } catch {
      trackDeepLink({ path: url, type: "unknown", source, timestamp: Date.now() });
      return { type: "unknown", path: "/" };
    }
  }

  const path = parsed.pathname.replace(/\/$/, "") || "/";
  const segments = path.split("/").filter(Boolean);
  let route: DeepLinkRoute;

  if (segments[0] === "creator" && segments[1]) {
    const username = decodeURIComponent(segments[1]);
    route = USERNAME_RE.test(username)
      ? { type: "creator", username, path: `/creator/${username}` }
      : { type: "unknown", path: "/" };
  } else if (segments[0] === "tip" && segments[1]) {
    const tipId = decodeURIComponent(segments[1]);
    route = TIP_ID_RE.test(tipId)
      ? { type: "tip", tipId, path: `/tip/${tipId}` }
      : { type: "unknown", path: "/" };
  } else if (path === "/explore") {
    route = { type: "explore", path: "/explore" };
  } else if (path === "/tips") {
    route = { type: "tips", path: "/tips" };
  } else if (path === "/widgets") {
    route = { type: "widgets", path: "/widgets" };
  } else if (path === "/" || path === "") {
    route = { type: "home", path: "/" };
  } else {
    route = { type: "unknown", path: "/" };
  }

  trackDeepLink({ path, type: route.type, source, timestamp: Date.now() });
  return route;
}

// ─── Share utilities ──────────────────────────────────────────────────────────

/** Build a shareable URL with UTM attribution for analytics. */
export function buildShareUrl(
  path: string,
  source: "share_sheet" | "copy_link" | "qr" | "email" = "share_sheet",
  baseUrl = "https://stellartipjar.app",
): string {
  const url = new URL(path, baseUrl);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", "deep_link");
  return url.toString();
}

/**
 * Trigger the native Web Share API, falling back to clipboard copy.
 * Returns true if the native share sheet was used.
 */
export async function shareDeepLink(
  path: string,
  title: string,
  text: string,
): Promise<boolean> {
  const shareUrl = buildShareUrl(path, "share_sheet");

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text, url: shareUrl });
      return true;
    } catch {
      // User cancelled — fall through
    }
  }

  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(buildShareUrl(path, "copy_link"));
  }

  return false;
}
