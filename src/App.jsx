import React, { useState } from "react";
import RobotSetupIntro from "./components/RobotSetupIntro";
import Page_RetroCRTTerminal from "./pages/Page_RetroCRTTerminal";
import Page_RobotAssembledLogin from "./pages/Page_RobotAssembledLogin";
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
  const [activePage, setActivePage] = useState("retro_terminal"); // Flagship Retro CRT Terminal

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
          {/* Quick theme switcher button if on other pages */}
          {activePage !== "retro_terminal" && (
            <button
              onClick={() => setActivePage("retro_terminal")}
              style={{
                position: "fixed",
                top: 16,
                right: 16,
                zIndex: 999,
                padding: "8px 16px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #22c55e, #15803d)",
                color: "#051105",
                border: "none",
                fontWeight: 800,
                fontSize: 12,
                cursor: "pointer",
                boxShadow: "0 0 15px rgba(34,197,94,0.4)",
              }}
            >
              ← Return to Main CRT Compiler
            </button>
          )}
          {renderActivePage()}
        </>
      )}
    </div>
  );
}
