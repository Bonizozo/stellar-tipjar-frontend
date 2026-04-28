/* eslint-disable no-undef */
const STATIC_CACHE = "tipjar-static-v2";
const IMAGE_CACHE = "tipjar-images-v1";
const API_CACHE = "tipjar-api-v1";
const OFFLINE_FALLBACK = "/offline";
const DB_NAME = "stellar-tipjar-offline";
const STORE_NAME = "queue";

const STATIC_ASSETS = [
  "/",
  OFFLINE_FALLBACK,
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/logo.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => ![STATIC_CACHE, IMAGE_CACHE, API_CACHE].includes(key))
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

async function networkFirst(request, cacheName, timeout = 10000) {
  const cache = await caches.open(cacheName);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response && response.status === 200) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (request.mode === "navigate") {
      return caches.match(OFFLINE_FALLBACK);
    }
    return Response.error();
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    if (request.mode === "navigate") {
      return caches.match(OFFLINE_FALLBACK);
    }
    return Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, STATIC_CACHE));
    return;
  }

  if (url.pathname.startsWith("/api/") || url.hostname.startsWith("api.")) {
    event.respondWith(networkFirst(request, API_CACHE));
    return;
  }

  if (/\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  event.respondWith(cacheFirst(request, STATIC_CACHE));
});

self.addEventListener("push", (event) => {
  let data = { title: "Stellar Tip Jar", body: "You have a new notification", url: "/" };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-192x192.png",
      data: { url: data.url || "/" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes(url) && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
      return undefined;
    }),
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "tipjar-retry-requests") {
    event.waitUntil(processQueue());
  }
});

/**
 * processQueue
 * Reads the IndexedDB action queue and attempts to execute pending actions.
 */
async function processQueue() {
  const db = await openDB();
  const queue = await getAllPending(db);

  for (const action of queue) {
    try {
      await executeAction(action);
      await removeAction(db, action.id);
      console.log(`[SW] Successfully synced action: ${action.id}`);
    } catch (error) {
      console.error(`[SW] Failed to sync action ${action.id}:`, error);
      await markAsFailed(db, action.id, error.message);
    }
  }

  // Notify clients that sync finished
  const clients = await self.clients.matchAll();
  clients.forEach((client) => client.postMessage({ type: "SYNC_COMPLETE", count: queue.length }));
}

async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAllPending(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => {
      const all = request.result;
      resolve(all.filter((a) => a.status === "pending" || a.status === "failed"));
    };
    request.onerror = () => reject(request.error);
  });
}

async function executeAction(action) {
  const apiBase = "http://localhost:8000"; // Fallback base
  const headers = { "Content-Type": "application/json" };

  let url = "";
  switch (action.type) {
    case "TIP_INTENT":
      url = `${apiBase}/tips/intents`;
      break;
    case "POST_COMMENT":
      const { creatorUsername, ...body } = action.payload;
      url = `${apiBase}/creators/${creatorUsername}/comments`;
      action.payload = body;
      break;
    case "TOGGLE_REACTION":
      url = `${apiBase}/comments/${action.payload.commentId}/reactions`;
      action.payload = { emoji: action.payload.emoji };
      break;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(action.payload),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

async function removeAction(db, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const request = tx.objectStore(STORE_NAME).delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function markAsFailed(db, id, error) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const getRequest = store.get(id);
    getRequest.onsuccess = () => {
      const action = getRequest.result;
      if (action) {
        action.status = "failed";
        action.attempts = (action.attempts || 0) + 1;
        action.error = error;
        store.put(action);
      }
      resolve();
    };
    request.onerror = () => reject(request.error);
  });
}

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
