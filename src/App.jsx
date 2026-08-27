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

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [activePage, setActivePage] = useState("retro_terminal"); // Main Flagship Retro CRT Terminal Login Page

  const renderActivePage = () => {
    switch (activePage) {
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
