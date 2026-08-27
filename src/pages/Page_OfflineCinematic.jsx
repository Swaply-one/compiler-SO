import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, ArrowLeft, Sparkles, Check, AlertCircle } from "lucide-react";
import SwaplyLogo from "../components/SwaplyLogo";
import OfflineCore3DCanvas from "../components/OfflineCore3DCanvas";
import { checkConnectivity, NetworkStates } from "../services/connectivity";
import "../styles/Page_OfflineCinematic.css";

/**
 * Web Audio Synthesizer for Atmospheric Cinematic Offline Sounds
 */
class OfflineAudioEngine {
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
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(280, t + 0.05);
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    } catch {}
  }
  playWakeUpSweep() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(520, t + 1.2);
      osc.frequency.exponentialRampToValueAtTime(940, t + 2.2);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 2.7);
    } catch {}
  }
}

const audio = new OfflineAudioEngine();

/**
 * Magnetic Button Component with Spring Physics
 */
function MagneticButton({ children, onClick, className = "", disabled = false, ...props }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * 0.28;
    const dy = (e.clientY - centerY) * 0.28;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.button
      className={`btn-magnetic ${className}`}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 220, damping: 14, mass: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/**
 * Cinematic SwaplyOne Offline / No Internet Page
 */
export default function Page_OfflineCinematic({ onBack }) {
  const [phase, setPhase] = useState("TRANSITION_TO_OFFLINE"); // "TRANSITION_TO_OFFLINE" | "OFFLINE" | "SEARCHING" | "RESTORED" | "FAILED"
  const [statusMessage, setStatusMessage] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [showTypography, setShowTypography] = useState(false);

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // Storytelling transition on initial page mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("OFFLINE");
      setShowTypography(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Automatic Connection Recovery Listener
  useEffect(() => {
    const handleAutoOnline = async () => {
      const conn = await checkConnectivity();
      if (conn.status === NetworkStates.ONLINE) {
        audio.playWakeUpSweep();
        setPhase("RESTORED");
        setStatusMessage("CONNECTION RESTORED");
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onBack) onBack();
          }, 350);
        }, 1200);
      }
    };

    window.addEventListener("online", handleAutoOnline);
    return () => window.removeEventListener("online", handleAutoOnline);
  }, [onBack]);

  // Cinematic Reconnection Sequence with Real Connectivity Check
  const handleReconnect = async () => {
    if (phase === "SEARCHING" || phase === "RESTORED") return;

    audio.playSoftClick();
    audio.playWakeUpSweep();
    setPhase("SEARCHING");
    setStatusMessage("SEARCHING FOR CONNECTION...");
    await wait(900);

    setStatusMessage("WAITING FOR NETWORK...");
    
    // Perform genuine connectivity check
    const conn = await checkConnectivity();
    await wait(600);

    if (conn.status === NetworkStates.ONLINE) {
      // Online restoration flow
      setPhase("RESTORED");
      setStatusMessage("CONNECTION RESTORED");
      await wait(1200);

      // Smooth exit back to previous route
      setIsExiting(true);
      setTimeout(() => {
        if (onBack) onBack();
      }, 400);
    } else {
      // Still offline flow
      setPhase("FAILED");
      setStatusMessage("STILL OFFLINE — Check your internet connection and try again.");
      await wait(3000);
      setPhase("OFFLINE");
      setStatusMessage("");
    }
  };

  const handleGoHome = () => {
    audio.playSoftClick();
    setIsExiting(true);
    setTimeout(() => {
      if (onBack) onBack();
    }, 280);
  };

  return (
    <motion.div
      className="swaply-offline-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.98 : 1 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {/* Ambient Lighting & Grid */}
      <div className="swaply-offline-bg-glow" aria-hidden="true" />
      <div className="swaply-offline-grid-lines" aria-hidden="true" />

      {/* Hero 3D SwaplyOne Offline Core (Rendered on Right / Center) */}
      <OfflineCore3DCanvas
        phase={phase}
        isReconnecting={phase === "SEARCHING"}
      />

      {/* ===================================================================== */}
      {/* 1. TOP HEADER BAR                                                     */}
      {/* ===================================================================== */}
      <header className="swaply-offline-header">
        <SwaplyLogo size={34} showWordmark={true} />

        <div className="swaply-offline-status-badge">
          <span
            className={`offline-indicator-dot ${
              phase === "RESTORED"
                ? "is-restored"
                : phase === "SEARCHING"
                ? "is-searching"
                : ""
            }`}
          />
          <span>
            {phase === "RESTORED"
              ? "NETWORK RESTORED"
              : phase === "SEARCHING"
              ? "SEARCHING SIGNAL..."
              : "OFFLINE // STANDBY MODE"}
          </span>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. MAIN SPLIT SECTION (Left: Typography // Right: Open 3D Core Stage) */}
      {/* ===================================================================== */}
      <main className="swaply-offline-main">
        {/* Left Hero Column */}
        <AnimatePresence>
          {showTypography && (
            <motion.div
              className="swaply-offline-hero"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="offline-tag-row">
                <span className={`offline-tag ${phase === "RESTORED" ? "is-restored" : ""}`}>
                  {phase === "RESTORED" ? "LINK ESTABLISHED" : "SIGNAL INTERRUPTED"}
                </span>
              </div>

              <h1 className="swaply-offline-heading">
                {phase === "RESTORED" ? "CONNECTED" : "YOU'RE OFFLINE"}
              </h1>

              <div className="swaply-offline-support-primary">
                {phase === "RESTORED"
                  ? "Welcome back. Re-synchronizing workspace..."
                  : "Your connection to the outside world was interrupted."}
              </div>

              <p className="swaply-offline-support-secondary">
                {phase === "RESTORED"
                  ? "Returning to your compiler session now."
                  : "Reconnect to continue using SwaplyOne."}
              </p>

              {/* Action Buttons */}
              <div className="swaply-offline-actions">
                <MagneticButton
                  className="btn-offline-reconnect"
                  onClick={handleReconnect}
                  disabled={phase === "SEARCHING" || phase === "RESTORED"}
                >
                  <RefreshCw
                    size={15}
                    className={phase === "SEARCHING" ? "animate-spin" : ""}
                    style={{ animation: phase === "SEARCHING" ? "spin 0.7s infinite linear" : "none" }}
                  />
                  <span>
                    {phase === "SEARCHING"
                      ? "SEARCHING..."
                      : phase === "RESTORED"
                      ? "RESTORED"
                      : "RECONNECT"}
                  </span>
                </MagneticButton>

                <MagneticButton
                  className="btn-offline-home"
                  onClick={handleGoHome}
                >
                  <ArrowLeft size={15} />
                  <span>GO HOME</span>
                </MagneticButton>
              </div>

              {/* Dynamic Status Stream Line During Reconnect */}
              {statusMessage && (
                <motion.div
                  className={`offline-status-stream ${
                    phase === "RESTORED" ? "is-restored" : phase === "FAILED" ? "is-failed" : ""
                  }`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {phase === "RESTORED" ? (
                    <Check size={14} color="#4ade80" />
                  ) : phase === "FAILED" ? (
                    <AlertCircle size={14} color="#f87171" />
                  ) : (
                    <Sparkles size={14} color="#c59b63" />
                  )}
                  <span>{statusMessage}</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side: Open 3D Stage Space */}
        <div className="swaply-offline-right-stage" aria-hidden="true" />
      </main>

      {/* ===================================================================== */}
      {/* 3. BOTTOM FOOTER BAR                                                  */}
      {/* ===================================================================== */}
      <footer className="swaply-offline-footer">
        <div>
          <span>SwaplyOne Cloud Compiler Platform &copy; {new Date().getFullYear()}</span>
        </div>
        <div className="offline-footer-links">
          <button className="offline-footer-link" onClick={handleGoHome}>
            Documentation
          </button>
          <button className="offline-footer-link" onClick={handleGoHome}>
            System Status
          </button>
          <button className="offline-footer-link" onClick={handleGoHome}>
            Support
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
