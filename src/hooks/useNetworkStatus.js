import { useState, useEffect, useCallback } from "react";
import { checkConnectivity, NetworkStates } from "../services/connectivity";

/**
 * Custom React Hook for Real Network Status Detection
 * - Subscribes to browser online/offline events
 * - Validates true reachability using lightweight health checks
 * - Prevents false recovery
 */
export function useNetworkStatus() {
  const [networkState, setNetworkState] = useState(() => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      return NetworkStates.OFFLINE;
    }
    return NetworkStates.ONLINE;
  });

  const [latency, setLatency] = useState(0);

  const verifyConnection = useCallback(async () => {
    const res = await checkConnectivity();
    setNetworkState(res.status);
    if (res.latencyMs) setLatency(res.latencyMs);
    return res;
  }, []);

  useEffect(() => {
    const handleOffline = () => {
      setNetworkState(NetworkStates.OFFLINE);
    };

    const handleOnline = async () => {
      // Validate with real connectivity probe to prevent false recovery
      await verifyConnection();
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Initial check on mount
    verifyConnection();

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [verifyConnection]);

  return {
    networkState,
    isOffline: networkState === NetworkStates.OFFLINE,
    isServerUnreachable: networkState === NetworkStates.SERVER_UNREACHABLE,
    isOnline: networkState === NetworkStates.ONLINE,
    latency,
    checkNow: verifyConnection,
  };
}
