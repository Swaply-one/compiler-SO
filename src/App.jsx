import React, { useState } from "react";
import RobotSetupIntro from "./components/RobotSetupIntro";
import Page_RetroCRTTerminal from "./pages/Page_RetroCRTTerminal";
import OtpVerificationGyre from "./components/OtpVerificationGyre";

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [activePage, setActivePage] = useState("retro_terminal"); // Main Flagship Retro CRT Terminal Login Page

  const renderActivePage = () => {
    switch (activePage) {
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
          />
        );
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#070a07", color: "#4ade80" }}>
      {showIntro ? (
        <RobotSetupIntro onComplete={() => setShowIntro(false)} />
      ) : (
        renderActivePage()
      )}
    </div>
  );
}
