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

// ─── Comments ────────────────────────────────────────────────────────────────

export interface Comment {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  body: string;
  createdAt: string;
  parentId: string | null;
  /** Whether the comment is hidden by moderation */
  hidden: boolean;
  reactions: Record<string, number>; // emoji → count
  /** Emoji reactions the current viewer has added */
  myReactions: string[];
}

export interface CommentsPage {
  comments: Comment[];
  nextCursor: string | null;
}

function mockComments(creatorUsername: string): Comment[] {
  const now = Date.now();
  return [
    {
      id: "c1",
      username: "stellar-fan",
      displayName: "Stellar Fan",
      avatarUrl: `https://api.dicebear.com/7.x/thumbs/svg?seed=stellar-fan`,
      body: `Love your work, ${creatorUsername}! Keep it up 🚀`,
      createdAt: new Date(now - 3_600_000).toISOString(),
      parentId: null,
      hidden: false,
      reactions: { "❤️": 4, "🔥": 2 },
      myReactions: [],
    },
    {
      id: "c2",
      username: "xlm-lover",
      displayName: "XLM Lover",
      avatarUrl: `https://api.dicebear.com/7.x/thumbs/svg?seed=xlm-lover`,
      body: "Sent a small tip — you deserve it!",
      createdAt: new Date(now - 7_200_000).toISOString(),
      parentId: null,
      hidden: false,
      reactions: { "⭐": 3 },
      myReactions: [],
    },
    {
      id: "c3",
      username: "crypto-alice",
      displayName: "Crypto Alice",
      avatarUrl: `https://api.dicebear.com/7.x/thumbs/svg?seed=crypto-alice`,
      body: "Replying to say this community is awesome!",
      createdAt: new Date(now - 1_800_000).toISOString(),
      parentId: "c1",
      hidden: false,
      reactions: {},
      myReactions: [],
    },
    {
      id: "c4",
      username: "spam-bot",
      displayName: "Spam Bot",
      avatarUrl: `https://api.dicebear.com/7.x/thumbs/svg?seed=spam-bot`,
      body: "Buy cheap XLM here!!!",
      createdAt: new Date(now - 500_000).toISOString(),
      parentId: null,
      hidden: true,
      reactions: {},
      myReactions: [],
    },
  ];
}

export async function getComments(
  creatorUsername: string,
  cursor?: string,
): Promise<CommentsPage> {
  try {
    const path = `/creators/${creatorUsername}/comments${cursor ? `?cursor=${cursor}` : ""}`;
    return await request<CommentsPage>(path, undefined, { critical: false });
  } catch {
    return { comments: mockComments(creatorUsername), nextCursor: null };
  }
}

export async function postComment(payload: {
  creatorUsername: string;
  body: string;
  parentId?: string;
}): Promise<Comment> {
  try {
    return await request<Comment>(
      `/creators/${payload.creatorUsername}/comments`,
      { method: "POST", body: JSON.stringify({ body: payload.body, parentId: payload.parentId }) },
      { critical: true, throttleMs: 500 },
    );
  } catch {
    // Optimistic mock response
    return {
      id: `c-${Date.now()}`,
      username: "you",
      displayName: "You",
      avatarUrl: `https://api.dicebear.com/7.x/thumbs/svg?seed=you`,
      body: payload.body,
      createdAt: new Date().toISOString(),
      parentId: payload.parentId ?? null,
      hidden: false,
      reactions: {},
      myReactions: [],
    };
  }
}

export async function toggleReaction(payload: {
  commentId: string;
  emoji: string;
}): Promise<void> {
  try {
    await request(
      `/comments/${payload.commentId}/reactions`,
      { method: "POST", body: JSON.stringify({ emoji: payload.emoji }) },
      { critical: false },
    );
  } catch {
    // silently handled optimistically in the hook
  }
}

export async function reportComment(commentId: string): Promise<void> {
  try {
    await request(
      `/comments/${commentId}/report`,
      { method: "POST" },
      { critical: false },
    );
  } catch {
    // best-effort
  }
}
