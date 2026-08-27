/**
 * Service Worker Registration Handler
 * Registers public/sw.js for offline capability & shell caching
 */

export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[SW] Registered successfully with scope:", registration.scope);
        })
        .catch((error) => {
          console.warn("[SW] Registration failed:", error);
        });
    });
  }
}
