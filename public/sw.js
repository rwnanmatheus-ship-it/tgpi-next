/* TGPI PWA public-shell service worker.
 * Private pages, API responses, personalized images and authentication data
 * are intentionally network-only and are never written to Cache Storage.
 */

const CACHE_NAME = "tgpi-public-shell-v1";
const OFFLINE_URL = "/offline.html";
const MAX_STATIC_ASSETS = 80;
const PUBLIC_SHELL = [
  OFFLINE_URL,
  "/pwa/icon-192.png",
  "/pwa/icon-512.png",
  "/pwa/icon-maskable-512.png",
  "/pwa/apple-touch-icon.png",
];

async function cacheStaticAsset(request, response) {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
  const staticEntries = (await cache.keys()).filter((entry) =>
    new URL(entry.url).pathname.startsWith("/_next/static/"),
  );
  const overflow = staticEntries.length - MAX_STATIC_ASSETS;
  if (overflow > 0) {
    await Promise.all(
      staticEntries.slice(0, overflow).map((entry) => cache.delete(entry)),
    );
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PUBLIC_SHELL)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) => key.startsWith("tgpi-public-shell-") && key !== CACHE_NAME,
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigation is always network-first and is never cached. When the network
  // is unavailable, every route receives the same identity-free offline page.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        const fallback = await caches.match(OFFLINE_URL);
        return fallback ?? Response.error();
      }),
    );
    return;
  }

  // Never handle authenticated or mutable application data in the service worker.
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/sign-in") ||
    url.pathname.startsWith("/sign-up") ||
    url.pathname.startsWith("/profile") ||
    url.pathname.startsWith("/global-key") ||
    url.pathname.startsWith("/member/") ||
    url.pathname.startsWith("/onboarding") ||
    url.pathname.startsWith("/upgrade") ||
    url.pathname.startsWith("/notifications") ||
    url.pathname.startsWith("/_next/image")
  ) {
    return;
  }

  if (PUBLIC_SHELL.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => cached ?? fetch(request)),
    );
    return;
  }

  // Next.js build assets are content-hashed and contain no member data.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(request).then(async (cached) => {
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) {
          event.waitUntil(
            cacheStaticAsset(request, response.clone()),
          );
        }
        return response;
      }),
    );
  }
});
