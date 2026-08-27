import React, { useState } from "react";
import RobotSetupIntro from "./components/RobotSetupIntro";
import Page_RetroCRTTerminal from "./pages/Page_RetroCRTTerminal";
import Page_RobotAssembledLogin from "./pages/Page_RobotAssembledLogin";
import Page_404NotFound from "./pages/Page_404NotFound";
import Page_NetworkNotFound from "./pages/Page_NetworkNotFound";
import Page_CompilerAuth from "./pages/Page_CompilerAuth";
import RockyLoginPage from "./pages/RockyLoginPage";
import ScientistLoginPage from "./pages/ScientistLoginPage";
import TeddyLoginPage from "./pages/TeddyLoginPage";
import Page1_ThreeJSBot from "./pages/Page1_ThreeJSBot";
import Page1_CyberBot from "./pages/Page1_CyberBot";
import Page1_CyberDrone from "./pages/Page1_CyberDrone";
import Page1_RealisticTiger from "./pages/Page1_RealisticTiger";
import Page1_BaoPanda from "./pages/Page1_BaoPanda";
import Page1_MochiCat from "./pages/Page1_MochiCat";
import Page3_CompilerLab from "./pages/Page3_CompilerLab";
import { Columns2, Maximize2, Radio, AlertTriangle } from "lucide-react";

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [activePage, setActivePage] = useState("dual_view"); // "dual_view" | "page_404" | "network_offline" | "retro_terminal" | "assembled_login"

  const renderActivePage = () => {
    switch (activePage) {
      case "dual_view":
        return (
          <div
            style={{
              minHeight: "100vh",
              backgroundColor: "#050705",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 540px), 1fr))",
              gap: "24px",
              padding: "70px 20px 80px",
              boxSizing: "border-box",
            }}
          >
            {/* Left Column: 404 Error Page */}
            <div
              style={{
                position: "relative",
                border: "2px solid #facc15",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 0 35px rgba(250, 204, 21, 0.2)",
                background: "#070a07",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(90deg, #854d0e, #a16207)",
                  color: "#fef08a",
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: "'JetBrains Mono', monospace",
                  zIndex: 70,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <AlertTriangle size={14} />
                  <span>PAGE 1: 404 COMPILER FAULT</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePage("page_404")}
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    borderRadius: 4,
                    padding: "3px 8px",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Maximize2 size={11} />
                  <span>Full Screen</span>
                </button>
              </div>
              <div style={{ flex: 1, position: "relative" }}>
                <Page_404NotFound
                  onGoHome={() => setActivePage("retro_terminal")}
                  onGoSignUp={() => setActivePage("retro_terminal")}
                  onReplayIntro={() => setShowIntro(true)}
                />
              </div>
            </div>

            {/* Right Column: Network Offline Page */}
            <div
              style={{
                position: "relative",
                border: "2px solid #ef4444",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 0 35px rgba(239, 68, 68, 0.2)",
                background: "#070a07",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(90deg, #991b1b, #b91c1c)",
                  color: "#fee2e2",
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: "'JetBrains Mono', monospace",
                  zIndex: 70,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Radio size={14} />
                  <span>PAGE 2: NETWORK CONNECTION OFFLINE</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePage("network_offline")}
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    borderRadius: 4,
                    padding: "3px 8px",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Maximize2 size={11} />
                  <span>Full Screen</span>
                </button>
              </div>
              <div style={{ flex: 1, position: "relative" }}>
                <Page_NetworkNotFound
                  onGoHome={() => setActivePage("retro_terminal")}
                  onGoSignUp={() => setActivePage("retro_terminal")}
                  onReplayIntro={() => setShowIntro(true)}
                />
              </div>
            </div>
          </div>
        );

      case "network_offline":
        return (
          <Page_NetworkNotFound
            onGoHome={() => setActivePage("retro_terminal")}
            onGoSignUp={() => setActivePage("retro_terminal")}
            onReplayIntro={() => setShowIntro(true)}
          />
        );
      case "page_404":
        return (
          <Page_404NotFound
            onGoHome={() => setActivePage("retro_terminal")}
            onGoSignUp={() => setActivePage("retro_terminal")}
            onReplayIntro={() => setShowIntro(true)}
          />
        );
      case "assembled_login":
        return (
          <Page_RobotAssembledLogin
            onReplayIntro={() => setShowIntro(true)}
            onSelectOtherPage={(pageKey) => setActivePage(pageKey)}
          />
        );
      case "Page_CompilerAuth":
        return <Page_CompilerAuth />;
      case "RockyLoginPage":
        return <RockyLoginPage />;
      case "ScientistLoginPage":
        return <ScientistLoginPage />;
      case "TeddyLoginPage":
        return <TeddyLoginPage />;
      case "Page1_ThreeJSBot":
        return <Page1_ThreeJSBot />;
      case "Page1_CyberBot":
        return <Page1_CyberBot />;
      case "Page1_CyberDrone":
        return <Page1_CyberDrone />;
      case "Page1_RealisticTiger":
        return <Page1_RealisticTiger />;
      case "Page1_BaoPanda":
        return <Page1_BaoPanda />;
      case "Page1_MochiCat":
        return <Page1_MochiCat />;
      case "Page3_CompilerLab":
        return <Page3_CompilerLab />;
      case "retro_terminal":
      default:
        return (
          <Page_RetroCRTTerminal
            onReplayIntro={() => setShowIntro(true)}
          />
        );
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#070a07", color: "#4ade80" }}>
      {showIntro ? (
        <RobotSetupIntro onComplete={() => setShowIntro(false)} />
      ) : (
        <>
          {/* Top Quick Mode Banner */}
          <div
            style={{
              position: "fixed",
              top: 14,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(10, 15, 10, 0.94)",
              padding: "4px 8px",
              borderRadius: "100px",
              border: "1.5px solid #22c55e",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(34, 197, 94, 0.3)",
              backdropFilter: "blur(12px)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <button
              onClick={() => setActivePage("dual_view")}
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                border: "none",
                background: activePage === "dual_view" ? "#22c55e" : "transparent",
                color: activePage === "dual_view" ? "#051105" : "#94a3b8",
                fontSize: "11.5px",
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s",
              }}
            >
              <Columns2 size={13} />
              <span>↔️ Side-by-Side Both Pages</span>
            </button>

            <button
              onClick={() => setActivePage("page_404")}
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                border: "none",
                background: activePage === "page_404" ? "#facc15" : "transparent",
                color: activePage === "page_404" ? "#051105" : "#94a3b8",
                fontSize: "11.5px",
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s",
              }}
            >
              <AlertTriangle size={13} />
              <span>⚠️ 404 Page</span>
            </button>

            <button
              onClick={() => setActivePage("network_offline")}
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                border: "none",
                background: activePage === "network_offline" ? "#ef4444" : "transparent",
                color: activePage === "network_offline" ? "#ffffff" : "#94a3b8",
                fontSize: "11.5px",
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s",
              }}
            >
              <Radio size={13} />
              <span>📡 Network Offline</span>
            </button>
          </div>

          {/* Bottom Floating Navigation Switcher */}
          <div
            style={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 999,
              display: "flex",
              gap: 6,
              background: "rgba(15, 23, 42, 0.94)",
              padding: "4px 6px",
              borderRadius: 100,
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(12px)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <button
              onClick={() => setActivePage("retro_terminal")}
              style={{
                padding: "6px 12px",
                borderRadius: 100,
                border: "none",
                background: activePage === "retro_terminal" ? "#22c55e" : "transparent",
                color: activePage === "retro_terminal" ? "#051105" : "#94a3b8",
                fontSize: "11px",
                fontWeight: 800,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              📟 CRT Terminal
            </button>
            <button
              onClick={() => setActivePage("assembled_login")}
              style={{
                padding: "6px 12px",
                borderRadius: 100,
                border: "none",
                background: activePage === "assembled_login" ? "#22c55e" : "transparent",
                color: activePage === "assembled_login" ? "#051105" : "#94a3b8",
                fontSize: "11px",
                fontWeight: 800,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              🤖 Byte Bot
            </button>
          </div>

          {renderActivePage()}
        </>
      )}
    </div>
  );
}
