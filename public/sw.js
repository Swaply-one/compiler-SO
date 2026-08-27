/**
 * SwaplyOne - Production Service Worker
 * Cache Version: swaplyone-v5-final
 * - Pre-caches standalone /server-unreachable.html, bundle, and 3D models individually
 * - Returns cached /server-unreachable.html immediately when server is stopped (Ctrl+C)
 */

const STATIC_CACHE = "swaplyone-static-v5";
const SHELL_CACHE = "swaplyone-shell-v5";

// All critical resources to pre-cache
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/server-unreachable.html",
  "/assets/server-unreachable.css",
  "/assets/server-unreachable.bundle.js",
  "/models/sci_fi_laptop_alternative_90s.glb",
  "/models/server_rack.glb",
  "/models/utility_knife.glb",
  "/models/usb_cable.glb",
  "/swaply-favicon-bgl.png",
];

// 1. Install Event: Robust Independent Pre-caching
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => {
      return Promise.all(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[SW] Precache skipped for ${url}:`, err.message);
          })
        )
      );
    })
  );
  self.skipWaiting();
});

// 2. Activate Event: Clean Old Caches & Claim Clients Immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== SHELL_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // A. Health check probe: ALWAYS network-only
  if (url.pathname.includes("health.json")) {
    return;
  }

  // B. Never cache non-GET requests or browser extension protocols
  if (request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // C. Navigation Requests (User refreshing while server down / Ctrl+C or offline)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const responseClone = networkResponse.clone();
            caches.open(SHELL_CACHE).then((cache) => {
              cache.put("/index.html", responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // Network failed (device is offline OR server unreachable)
          // Always serve cached /index.html shell so React renders Page_NetworkNotFound
          const cachedShell = await caches.match("/index.html");
          if (cachedShell) {
            return cachedShell;
          }

          const serverHtml = await caches.match("/server-unreachable.html");
          if (serverHtml) {
            return serverHtml;
          }

          return new Response("<h1>SwaplyOne Network Offline</h1>", {
            headers: { "Content-Type": "text/html" },
          });
        })
    );
    return;
  }

  // D. Vite Dev Module Requests (/@vite/client, /@react-refresh, /src/main.jsx)
  // If Vite server is down, return empty script so no fatal unhandled exceptions break the page
  if (url.pathname.includes("@vite") || url.pathname.includes("@react-refresh") || url.pathname.includes("/src/")) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response("// Dev server inactive", {
          headers: { "Content-Type": "application/javascript" },
        });
      })
    );
    return;
  }

  // E. Static Assets (JS, CSS, Images, Fonts, 3D GLB Models): Cache-First
  const isStaticAsset =
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".glb") ||
    url.pathname.endsWith(".gltf") ||
    url.pathname.endsWith(".woff2") ||
    url.pathname.endsWith(".woff") ||
    url.pathname.endsWith(".ttf") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.includes("/assets/") ||
    url.pathname.includes("/models/");

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              const responseClone = networkResponse.clone();
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);
      })
    );
  }
});
