/**
 * SwaplyOne Real Connectivity & Network Status Service
 * - Distinguishes between ONLINE, OFFLINE, and SERVER_UNREACHABLE
 * - Performs lightweight same-origin probes to prevent false recovery
 */

export const NetworkStates = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
  SERVER_UNREACHABLE: "SERVER_UNREACHABLE",
};

/**
 * Perform a fast, lightweight connectivity probe
 * @param {number} timeoutMs - Max timeout in milliseconds (default 2500ms)
 * @returns {Promise<{ status: string, latencyMs: number }>}
 */
export async function checkConnectivity(timeoutMs = 2500) {
  // 1. If the browser explicitly reports offline, return immediately
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return { status: NetworkStates.OFFLINE, latencyMs: 0 };
  }

  const startTime = Date.now();
  const probeUrl = `/health.json?_t=${Date.now()}`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(probeUrl, {
      method: "GET",
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
      signal: controller.signal,
    });

    clearTimeout(timer);
    const latencyMs = Date.now() - startTime;

    if (response.ok) {
      return { status: NetworkStates.ONLINE, latencyMs };
    } else {
      // Browser has internet connection, but backend / server responded with error
      return { status: NetworkStates.SERVER_UNREACHABLE, latencyMs };
    }
  } catch (error) {
    // If request was aborted due to timeout or failed to fetch
    const isNetworkError =
      error.name === "AbortError" ||
      error.message?.includes("Failed to fetch") ||
      error.message?.includes("NetworkError");

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      return { status: NetworkStates.OFFLINE, latencyMs: 0 };
    }

    // If browser claims to be online but fetch fails or times out
    return {
      status: isNetworkError ? NetworkStates.OFFLINE : NetworkStates.SERVER_UNREACHABLE,
      latencyMs: Date.now() - startTime,
    };
  }
}
