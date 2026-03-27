import { RequestQueue } from "@/utils/requestQueue";
import { RateLimiter } from "@/utils/rateLimiter";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const DEFAULT_RETRIES = 3;

export interface CreatorProfile {
  username: string;
  displayName: string;
  bio: string;
  preferredAsset: string;
}

export interface ApiRateLimitStatus {
  isLimited: boolean;
  retryAfterMs: number;
  remainingRequests: number;
  queuedRequests: number;
  limit: number;
  windowMs: number;
}

export class ApiRateLimitError extends Error {
  readonly retryAfterMs: number;

  constructor(retryAfterMs: number) {
    const seconds = Math.max(1, Math.ceil(retryAfterMs / 1000));
    super(`Rate limit reached. Try again in ${seconds}s.`);
    this.name = "ApiRateLimitError";
    this.retryAfterMs = retryAfterMs;
  }
}

const rateLimiter = new RateLimiter(10, 60_000);
const requestQueue = new RequestQueue();
const lastRequestByPath = new Map<string, number>();
const statusSubscribers = new Set<(status: ApiRateLimitStatus) => void>();

const DEFAULT_THROTTLE_MS = 300;

interface RequestOptions {
  /**
   * Critical requests are rejected when limited.
   * Non-critical requests are queued and retried with exponential backoff.
   */
  critical?: boolean;
  throttleMs?: number;
}

const sleep = (delayMs: number) => new Promise<void>((resolve) => setTimeout(resolve, delayMs));

function getStatus(): ApiRateLimitStatus {
  const state = rateLimiter.getState();
  return {
    isLimited: state.isLimited,
    retryAfterMs: state.retryAfterMs,
    remainingRequests: state.remainingRequests,
    limit: state.limit,
    windowMs: state.windowMs,
    queuedRequests: requestQueue.size(),
  };
}

function notifyStatusChange(): void {
  const status = getStatus();
  statusSubscribers.forEach((subscriber) => subscriber(status));
}

export function getApiRateLimitStatus(): ApiRateLimitStatus {
  return getStatus();
}

export function subscribeToApiRateLimit(
  callback: (status: ApiRateLimitStatus) => void,
): () => void {
  statusSubscribers.add(callback);
  callback(getStatus());

  return () => {
    statusSubscribers.delete(callback);
  };
}

async function applyPathThrottle(path: string, throttleMs = DEFAULT_THROTTLE_MS): Promise<void> {
  const now = Date.now();
  const lastRequestAt = lastRequestByPath.get(path);

  if (lastRequestAt !== undefined) {
    const elapsedMs = now - lastRequestAt;
    if (elapsedMs < throttleMs) {
      await sleep(throttleMs - elapsedMs);
    }
  }

  lastRequestByPath.set(path, Date.now());
}

async function executeFetch<T>(path: string, init?: RequestInit, throttleMs?: number): Promise<T> {
  await applyPathThrottle(path, throttleMs);

  rateLimiter.recordRequest();
  notifyStatusChange();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
    // For frequently updated blockchain data, contributors can switch this to no-store.
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }


return response.json() as Promise<T>;
}

export function getApiRateLimitState() {
  return rateLimiter.getState();
}

/**
 * Shared fetch helper used by all API methods.
 * Centralizing this logic keeps retries, headers, and error handling consistent.
 */
async function request<T>(path: string, init?: RequestInit, options?: RequestOptions): Promise<T> {
  const critical = options?.critical ?? true;
  const throttleMs = options?.throttleMs ?? DEFAULT_THROTTLE_MS;

  if (!rateLimiter.canMakeRequest()) {
    const retryAfterMs = rateLimiter.getRetryAfterMs();
    notifyStatusChange();

    if (critical) {
      throw new ApiRateLimitError(retryAfterMs);
    }

    const queuedRequest = requestQueue.enqueue(
      async () => {
        if (!rateLimiter.canMakeRequest()) {
          const waitMs = Math.max(100, rateLimiter.getRetryAfterMs());
          await sleep(waitMs);
        }

        return executeFetch<T>(path, init, throttleMs);
      },
      { maxRetries: 4, baseDelayMs: 250 },
    );

    notifyStatusChange();
    const result = await queuedRequest;
    notifyStatusChange();
    return result;
  }

  return executeFetch<T>(path, init, throttleMs);
}

export interface CreatorStats {
  totalAmountXlm: number;
  tipCount: number;
  uniqueSupporters: number;
  topSupporters: { sender: string; totalAmount: number; tipCount: number }[];
  tipHistory: { date: string; amount: number }[];
}

export async function getCreatorStats(username: string): Promise<CreatorStats> {
  try {
    return await request<CreatorStats>(`/creators/${username}/stats`, undefined, { critical: false });
  } catch {
    // Fallback mock data until backend is ready
    return {
      totalAmountXlm: 1234.5,
      tipCount: 56,
      uniqueSupporters: 42,
      topSupporters: [
        { sender: "stellar-fan", totalAmount: 300, tipCount: 8 },
        { sender: "xlm-lover", totalAmount: 250, tipCount: 5 },
        { sender: "crypto-alice", totalAmount: 180, tipCount: 12 },
        { sender: "blockchainer", totalAmount: 120, tipCount: 3 },
        { sender: "defi-bob", totalAmount: 90, tipCount: 6 },
      ],
      tipHistory: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 86_400_000).toISOString().slice(0, 10),
        amount: Math.floor(Math.random() * 150 + 10),
      })),
    };
  }
}

export async function getCreatorProfile(username: string): Promise<CreatorProfile> {
  try {
    return await request<CreatorProfile>(`/creators/${username}`, undefined, {
      critical: false,
    });
  } catch {
    // Fallback makes local UI work before backend endpoints are available.
    return {
      username,
      displayName: `@${username}`,
      bio: "Creator bio will be loaded from the backend API.",
      preferredAsset: "XLM",
    };
  }
}

export async function createTipIntent(payload: {
  username: string;
  amount: string;
  assetCode: string;
}) {
  return request<{ intentId: string; checkoutUrl?: string }>(
    "/tips/intents",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    {
      critical: true,
      throttleMs: 500,
    },
  );
}
