import React, { useState, useEffect, useRef } from "react";
import RobotSetupIntro from "./components/RobotSetupIntro";
import Page_RetroCRTTerminal from "./pages/Page_RetroCRTTerminal";
import Page_404NotFound from "./pages/Page_404NotFound";
import Page_NetworkNotFound from "./pages/Page_NetworkNotFound";
import Page_ServerUnreachableCinematic from "./pages/Page_ServerUnreachableCinematic";
import Page_OfflineCinematic from "./pages/Page_OfflineCinematic";
import OtpVerificationGyre from "./components/OtpVerificationGyre";
import { useNetworkStatus } from "./hooks/useNetworkStatus";

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [activePage, setActivePage] = useState("page_network"); // Default directly to 3D Living WebGL Network Topology

  // Real Network & Server Offline Status Hook
  const { isOffline, isServerUnreachable } = useNetworkStatus();

  // Remember previous route before entering offline state
  const lastActiveRouteRef = useRef("retro_terminal");

  // Track and update last active route whenever user navigates while online
  useEffect(() => {
    if (activePage !== "page_offline" && activePage !== "page_network") {
      lastActiveRouteRef.current = activePage;
    }
  }, [activePage]);

  // Support direct URL routing
  useEffect(() => {
    const handleUrlCheck = () => {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path.includes("404") || search.includes("404") || hash.includes("404")) {
        setActivePage("page_404");
      } else if (path.includes("laptop") || search.includes("laptop") || search.includes("cable") || search.includes("server")) {
        setActivePage("page_server_laptop");
      } else if (path.includes("network") || search.includes("network") || search.includes("503")) {
        setActivePage("page_network");
      } else if (path.includes("offline") || search.includes("offline")) {
        setActivePage("page_offline");
      } else if (path.includes("terminal") || search.includes("terminal")) {
        setActivePage("retro_terminal");
      } else if (path.includes("otp") || search.includes("otp")) {
        setActivePage("otp_verification");
      }
    };

    handleUrlCheck();
    window.addEventListener("popstate", handleUrlCheck);
    window.addEventListener("hashchange", handleUrlCheck);
    return () => {
      window.removeEventListener("popstate", handleUrlCheck);
      window.removeEventListener("hashchange", handleUrlCheck);
    };
  }, []);

  const restorePreviousRoute = () => {
    window.history.pushState({}, "", "/");
    setActivePage(lastActiveRouteRef.current || "retro_terminal");
  };

  const renderActivePage = () => {
    // If genuinely offline, open network/offline error page automatically
    if (isOffline && activePage !== "page_network" && activePage !== "page_offline") {
      return (
        <Page_NetworkNotFound
          onBack={restorePreviousRoute}
        />
      );
    }

    // If server unreachable, open network error page automatically
    if (isServerUnreachable && activePage !== "page_network" && activePage !== "page_server_laptop") {
      return (
        <Page_NetworkNotFound
          onBack={restorePreviousRoute}
        />
      );
    }
    switch (activePage) {
      case "page_server_laptop":
        return (
          <Page_ServerUnreachableCinematic
            onBack={() => {
              window.history.pushState({}, "", "/");
              setActivePage("retro_terminal");
            }}
          />
        );
      case "page_network":
        return (
          <Page_NetworkNotFound
            onBack={() => {
              window.history.pushState({}, "", "/");
              setActivePage("retro_terminal");
            }}
          />
        );
      case "page_offline":
        return (
          <Page_OfflineCinematic
            onBack={() => {
              window.history.pushState({}, "", "/");
              setActivePage("retro_terminal");
            }}
          />
        );
      case "page_404":
        return (
          <Page_404NotFound
            routeRequested="/unknown-route"
            onBack={() => {
              window.history.pushState({}, "", "/");
              setActivePage("retro_terminal");
            }}
          />
        );
      case "otp_verification":
        return (
          <OtpVerificationGyre
            onSuccess={() => {
              setTimeout(() => setActivePage("retro_terminal"), 1200);
            }}
            onCancel={() => setActivePage("retro_terminal")}
          />
        );
      case "retro_terminal":
      default:
        return (
          <Page_RetroCRTTerminal
            onReplayIntro={() => setShowIntro(true)}
            onNavigate404={() => setActivePage("page_404")}
          />
        );
    }
  };

  const navButtons = [
  { id: "page_server_laptop", label: "💻 3D Laptop & Cable", color: "#38bdf8" },
  { id: "page_network", label: "🌐 3D Network 503", color: "#f87171" },
  { id: "page_404", label: "⚡ 3D 404 Error", color: "#fbbf24" },
  { id: "retro_terminal", label: "📟 CRT Terminal", color: "#4ade80" },
];
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#060907", color: "#f8fafc" }}>
      {/* Floating Quick Preview Switcher */}
      <div
        style={{
          position: "fixed",
          top: 14,
          right: 18,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'JetBrains Mono', monospace",
          backgroundColor: "rgba(10, 14, 12, 0.92)",
          padding: "5px 8px",
          borderRadius: "100px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
        }}
      >
        {navButtons.map((btn) => {
          const isActive = activePage === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setActivePage(btn.id)}
              style={{
                padding: "5px 11px",
                borderRadius: "100px",
                border: isActive
                  ? `1px solid ${btn.color}`
                  : "1px solid transparent",
                background: isActive
                  ? "rgba(255, 255, 255, 0.08)"
                  : "transparent",
                color: isActive ? btn.color : "#94a3b8",
                fontSize: "11px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {showIntro ? (
        <RobotSetupIntro onComplete={() => setShowIntro(false)} />
      ) : (
        renderActivePage()
      )}
    </div>
  );
}
