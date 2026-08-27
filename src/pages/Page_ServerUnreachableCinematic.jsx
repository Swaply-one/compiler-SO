import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Sparkles, Check, ShieldAlert, Zap } from "lucide-react";
import SwaplyLogo from "../components/SwaplyLogo";
import PhysicalCableServerCanvas from "../components/PhysicalCableServerCanvas";
import { checkConnectivity, NetworkStates } from "../services/connectivity";
import "../styles/Page_ServerUnreachableCinematic.css";

/**
 * Web Audio Synthesizer for Physical Cable Snap & Satisfying Magnetic Plug Click
 */
class CableAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) this.ctx = new AudioContextClass();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }
  playSoftClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.05);
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    } catch {}
  }
  playCableSnap() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.12);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.15);
    } catch {}
  }
  playSatisfyingPlugClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      // 1. Mechanical snap click
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(1400, t);
      osc1.frequency.exponentialRampToValueAtTime(120, t + 0.08);
      gain1.gain.setValueAtTime(0.15, t);
      gain1.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.09);

      // 2. Controlled electrical surge tone
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(240, t + 0.08);
      osc2.frequency.exponentialRampToValueAtTime(880, t + 0.9);
      gain2.gain.setValueAtTime(0.0001, t);
      gain2.gain.linearRampToValueAtTime(0.07, t + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t + 0.08);
      osc2.stop(t + 1.2);
    } catch {}
  }
}

const audio = new CableAudioEngine();

/**
 * Physical Plug & Socket Server Unreachable Page
 * - Card appears briefly, then automatically dissolves after 3.5s for an unobstructed canvas
 * - User drags the plug with full freedom
 */
export default function Page_ServerUnreachableCinematic({ onBack }) {
  const [isCut, setIsCut] = useState(false);
  const [isRestored, setIsRestored] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [showTypography, setShowTypography] = useState(false);

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const handleCutTriggered = () => {
    setIsCut(true);
    audio.playCableSnap();
    // 1. Reveal typography briefly
    setTimeout(() => {
      setShowTypography(true);
    }, 450);

    // 2. Automatically fade it away after 3.5 seconds so canvas is 100% unobstructed!
    setTimeout(() => {
      setShowTypography(false);
    }, 3800);
  };

  // Triggered when plug physically snaps into the server socket
  const handlePlugConnected = async () => {
    audio.playSatisfyingPlugClick();
    setStatusMessage("PLUG CONNECTED // VERIFYING LINK...");

    // Real Connectivity Check
    const conn = await checkConnectivity();
    await wait(700);

    if (conn.status === NetworkStates.ONLINE) {
      setIsRestored(true);
      setStatusMessage("CONNECTION RESTORED");
      await wait(1200);

      setIsExiting(true);
      setTimeout(() => {
        if (onBack) onBack();
      }, 400);
    } else {
      setStatusMessage("SERVER STILL UNREACHABLE — Please try plugging again.");
      await wait(3500);
      setStatusMessage("");
    }
  };

  // Keyboard accessibility: Allow Space / Enter to snap plug
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === "Space" || e.code === "Enter") && !isRestored) {
        handlePlugConnected();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRestored]);

  const handleGoHome = () => {
    audio.playSoftClick();
    setIsExiting(true);
    setTimeout(() => {
      if (onBack) onBack();
    }, 280);
  };

  return (
    <motion.div
      className="swaply-server-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.98 : 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {/* Ambient Lighting & Grid */}
      <div className="swaply-server-bg-glow" aria-hidden="true" />
      <div className="swaply-server-grid-lines" aria-hidden="true" />

      {/* 3D Physical Canvas (User Grabs & Plugs the Cable) */}
      <PhysicalCableServerCanvas
        isRestored={isRestored}
        onCutTriggered={handleCutTriggered}
        onPlugConnected={handlePlugConnected}
      />

      {/* Floating Physical Machine Labels */}
      <div className="node-physical-label node-client-label">
        <span>●</span> CLIENT ONLINE
      </div>

      <div className={`node-physical-label node-server-label ${isRestored || !isCut ? "is-restored" : ""}`}>
        <span>{isRestored || !isCut ? "●" : "×"}</span> SWAPLYONE SERVER {isRestored || !isCut ? "ONLINE" : "UNREACHABLE"}
      </div>

      {/* ===================================================================== */}
      {/* 1. TOP HEADER BAR                                                     */}
      {/* ===================================================================== */}
      <header className="swaply-server-header">
        <SwaplyLogo size={34} showWordmark={true} />

        <div className="swaply-server-status-badge">
          <span
            className={`server-indicator-dot ${
              isRestored || !isCut ? "is-restored" : ""
            }`}
          />
          <span>
            {isRestored
              ? "COMMUNICATION RESTORED"
              : isCut
              ? "HOLD & DRAG PLUG INTO SERVER SOCKET"
              : "LINK ACTIVE // COMMUNICATING"}
          </span>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. MAIN BOTTOM CONTENT (Disappears after brief notice)                */}
      {/* ===================================================================== */}
      <main className="swaply-server-main">
        <AnimatePresence>
          {showTypography && (
            <motion.div
              className="swaply-server-hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="server-tag-row">
                <span className={`server-tag ${isRestored ? "is-restored" : ""}`}>
                  <ShieldAlert size={12} />
                  <span>{isRestored ? "SIGNAL RESTORED" : "PHYSICAL LINK SEVERED"}</span>
                </span>
              </div>

              <h1 className="swaply-server-heading">
                {isRestored ? "CONNECTION RESTORED" : "SERVER UNREACHABLE"}
              </h1>

              <div className="swaply-server-support-primary">
                {isRestored
                  ? "Communication link re-established with SwaplyOne server."
                  : "Your internet connection is working, but SwaplyOne isn't responding."}
              </div>

              {/* TACTILE DRAG INSTRUCTION PILL */}
              {!isRestored && (
                <div className="drag-instruction-pill">
                  <Zap size={14} color="#4ade80" />
                  <span>Hold the plug and connect it to the server socket</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Status Stream Message */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div
              className={`server-status-stream ${
                isRestored ? "is-restored" : ""
              }`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {isRestored ? (
                <Check size={14} color="#4ade80" />
              ) : (
                <Sparkles size={14} color="#c59b63" />
              )}
              <span>{statusMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ===================================================================== */}
      {/* 3. BOTTOM FOOTER BAR                                                  */}
      {/* ===================================================================== */}
      <footer className="swaply-server-footer">
        <div>
          <span>SwaplyOne Cloud Compiler Platform &copy; {new Date().getFullYear()}</span>
        </div>
        <div className="server-footer-links">
          <button className="server-footer-link" onClick={handleGoHome}>
            Documentation
          </button>
          <button className="server-footer-link" onClick={handleGoHome}>
            System Status
          </button>
          <button className="server-footer-link" onClick={handleGoHome}>
            Support
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
