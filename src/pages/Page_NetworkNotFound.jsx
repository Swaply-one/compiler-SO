import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, ArrowLeft, Radio, ShieldAlert, Sparkles, Check, Activity, Wifi } from "lucide-react";
import SwaplyLogo from "../components/SwaplyLogo";
import NetworkCore3DCanvas from "../components/NetworkCore3DCanvas";
import "../styles/Page_NetworkNotFound.css";

/**
 * Web Audio Synthesizer for Network & Reconnect Audio Feedback
 */
class NetworkAudioEngine {
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
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(950, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.05);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    } catch {}
  }
  playPulse(freq = 440) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, t + 0.15);
      gain.gain.setValueAtTime(0.07, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.16);
    } catch {}
  }
  playReconnectSweep() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(660, t + 1.2);
      osc.frequency.exponentialRampToValueAtTime(1200, t + 2.4);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 2.9);
    } catch {}
  }
}

const audio = new NetworkAudioEngine();

/**
 * Magnetic Button with Spring Physics
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
 * Premium Network Error / Connection Lost Page for SwaplyOne
 */
export default function Page_NetworkNotFound({ onBack }) {
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [connectionState, setConnectionState] = useState("DISCONNECTED"); // "DISCONNECTED" | "SCANNING" | "RESTORED" | "FAILED"
  const [retryCount, setRetryCount] = useState(3);
  const [lastAttemptTime, setLastAttemptTime] = useState("19:42:08");
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  // Dynamic Telemetry Trace
  const [telemetryLogs, setTelemetryLogs] = useState({
    internet: "CONNECTED",
    swaplyone: "UNREACHABLE",
    api: "TIMEOUT",
    websocket: "DISCONNECTED",
    latency: "—",
  });

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // Handle Cinematic Reconnect Recovery Sequence
  const handleReconnect = async () => {
    if (isReconnecting) return;
    setIsReconnecting(true);
    setConnectionState("SCANNING");
    audio.playClick();
    audio.playReconnectSweep();

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    setLastAttemptTime(timeStr);
    setRetryCount((prev) => prev + 1);

    // Step 1: Scanning Network
    setTelemetryLogs((prev) => ({
      ...prev,
      swaplyone: "SCANNING NETWORK...",
      api: "CONTACTING...",
    }));
    await wait(800);

    // Step 2: Negotiating Sockets
    setTelemetryLogs((prev) => ({
      ...prev,
      websocket: "NEGOTIATING SOCKET...",
      latency: "42ms (PROBING)",
    }));
    await wait(1000);

    // Step 3: Success Full Re-establishment
    setConnectionState("RESTORED");
    setTelemetryLogs({
      internet: "CONNECTED",
      swaplyone: "ONLINE",
      api: "200 OK",
      websocket: "STREAMING",
      latency: "16ms",
    });
    audio.playPulse(880);

    await wait(1400);
    setIsReconnecting(false);

    // Smoothly return home
    setIsExiting(true);
    setTimeout(() => {
      if (onBack) onBack();
    }, 400);
  };

  const handleReturnHome = () => {
    audio.playClick();
    setIsExiting(true);
    setTimeout(() => {
      if (onBack) onBack();
    }, 280);
  };

  const handleNodeClick = (nodeData) => {
    audio.playPulse(nodeData.isBroken ? 320 : 740);
  };

  return (
    <motion.div
      className="swaply-network-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.98 : 1 }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
    >
      {/* Ambient Lighting & Grid */}
      <div className="swaply-network-bg-glow" aria-hidden="true" />
      <div className="swaply-network-grid-lines" aria-hidden="true" />

      {/* 3D WebGL Living Network Topology */}
      <NetworkCore3DCanvas
        isReconnecting={isReconnecting}
        connectionState={connectionState}
        onNodeClick={handleNodeClick}
        onHoverNode={setHoveredNode}
      />

      {/* Floating Node Identity Tooltip on Hover */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            className="network-node-tooltip"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
          >
            <Radio size={13} color={hoveredNode.isBroken ? "#f87171" : "#4ade80"} />
            <span>
              {hoveredNode.id || "SWAPLYONE NODE"} // {hoveredNode.status || "STATUS UNKNOWN"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================================== */}
      {/* 1. TOP HEADER BAR                                                     */}
      {/* ===================================================================== */}
      <header className="swaply-network-header">
        <SwaplyLogo size={34} showWordmark={true} />

        <div className="swaply-network-status-badge">
          <span
            className={`network-indicator-dot ${
              connectionState === "RESTORED"
                ? "is-healthy"
                : isReconnecting
                ? "is-reconnecting"
                : ""
            }`}
          />
          <span>
            {connectionState === "RESTORED"
              ? "ALL SERVICES RESTORED"
              : isReconnecting
              ? "RECONNECTING SERVICES..."
              : "NETWORK UNREACHABLE // HTTP_503"}
          </span>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. MAIN SPLIT CONTENT                                                 */}
      {/* ===================================================================== */}
      <main className="swaply-network-main">
        {/* Left Hero Column */}
        <div className="swaply-network-hero">
          <div className="heading-tag-row">
            <span className={`heading-status-tag ${connectionState === "RESTORED" ? "is-restored" : ""}`}>
              <ShieldAlert size={12} />
              <span>{connectionState === "RESTORED" ? "CONNECTION RESTORED" : "0x503_DISCONNECT"}</span>
            </span>
          </div>

          <h1 className="swaply-network-heading">
            <span>CONNECTION LOST</span>
          </h1>

          <div className="swaply-network-support-msg">
            "SwaplyOne can't reach the server right now."
          </div>

          <p className="swaply-network-desc">
            Your connection may be fine. We're having trouble communicating with the service.
          </p>

          {/* Action Buttons */}
          <div className="swaply-network-actions">
            <MagneticButton
              className="btn-reconnect"
              onClick={handleReconnect}
              disabled={isReconnecting}
            >
              <RefreshCw
                size={15}
                className={isReconnecting ? "animate-spin" : ""}
                style={{ animation: isReconnecting ? "spin 0.7s infinite linear" : "none" }}
              />
              <span>{isReconnecting ? "RECONNECTING..." : "RECONNECT"}</span>
            </MagneticButton>

            <MagneticButton className="btn-return-home" onClick={handleReturnHome}>
              <ArrowLeft size={15} />
              <span>RETURN HOME</span>
            </MagneticButton>
          </div>
        </div>

        {/* Right Side: Unobstructed 3D WebGL Topology Canvas Stage */}
        <div className="swaply-network-right-space" aria-hidden="true" />
      </main>

      {/* ===================================================================== */}
      {/* 3. BOTTOM FOOTER BAR                                                  */}
      {/* ===================================================================== */}
      <footer className="swaply-network-footer">
        <div>
          <span>SwaplyOne Cloud Compiler Platform &copy; {new Date().getFullYear()}</span>
        </div>
        <div className="footer-nav-links">
          <button className="footer-link" onClick={handleReturnHome}>
            Documentation
          </button>
          <button className="footer-link" onClick={handleReturnHome}>
            System Status
          </button>
          <button className="footer-link" onClick={handleReturnHome}>
            Support
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
