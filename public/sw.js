/* eslint-disable no-undef */
const STATIC_CACHE = "tipjar-static-v1";
const IMAGE_CACHE = "tipjar-images-v1";
const API_CACHE = "tipjar-api-v1";
const OFFLINE_FALLBACK = "/offline";
const STATIC_ASSETS = ["/", OFFLINE_FALLBACK, "/manifest.json", "/icons/icon-192x192.png", "/icons/icon-512x512.png"];

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
  if (event.tag !== "tipjar-retry-requests") return;

  event.waitUntil(
    (async () => {
      const cache = await caches.open(API_CACHE);
      const requests = await cache.keys();
      await Promise.all(
        requests.map(async (request) => {
          try {
            const response = await fetch(request.clone());
            if (response.ok) {
              await cache.put(request, response.clone());
            }
          } catch {
            // keep for the next sync attempt
          }
        }),
      );
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
