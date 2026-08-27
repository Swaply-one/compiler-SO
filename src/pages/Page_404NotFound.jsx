import React, { useState } from "react";
import { motion } from "motion/react";
import { RefreshCw, ArrowLeft, Sparkles } from "lucide-react";
import SwaplyLogo from "../components/SwaplyLogo";
import CompilerCore3DCanvas from "../components/CompilerCore3DCanvas";
import LightningGranules404 from "../components/LightningGranules404";
import NoiseText404 from "../components/NoiseText404";
import "../styles/Page_404NotFound.css";


/**
 * Web Audio Synthesizer for Technical Compiler Audio Feedback
 */
class Compiler404Audio {
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
      osc.frequency.setValueAtTime(1050, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.05);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    } catch {}
  }
  playRecompileSweep() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 1.2);
      osc.frequency.exponentialRampToValueAtTime(180, t + 2.2);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 2.5);
    } catch {}
  }
}

const audio = new Compiler404Audio();

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
 * Premium 404 Route Not Found Page for SwaplyOne
 * Left: Cyber Green 404 & Controls // Right: Unified 3D Compiler Core Object
 */
export default function Page_404NotFound({ onBack, routeRequested = "/unknown-route" }) {
  const [isRecompiling, setIsRecompiling] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showHumor, setShowHumor] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // Handle Cinematic Recovery Sequence
  const handleRecompile = async () => {
    if (isRecompiling) return;
    setIsRecompiling(true);
    setIsGlitching(true);
    setShowHumor(false);
    audio.playClick();
    audio.playRecompileSweep();

    await wait(700);
    setIsGlitching(false);
    await wait(1500);

    setIsRecompiling(false);
    setShowHumor(true);
  };

  const handleReturnHome = () => {
    audio.playClick();
    setIsExiting(true);
    setTimeout(() => {
      if (onBack) onBack();
    }, 280);
  };

  return (
    <motion.div
      className="swaply-404-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.98 : 1 }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
    >
      {/* Ambient Lighting & Grid Lines */}
      <div className="swaply-404-bg-glow" aria-hidden="true" />
      <div className="swaply-404-grid-lines" aria-hidden="true" />

      {/* 3D WebGL Unified Compiler Core (Rendered on Right Side) */}
      <CompilerCore3DCanvas isRecompiling={isRecompiling} />

      {/* ===================================================================== */}
      {/* 1. TOP HEADER BAR                                                     */}
      {/* ===================================================================== */}
      <header className="swaply-404-header">
        <SwaplyLogo size={34} showWordmark={true} />

        <div className="swaply-404-status-badge">
          <span className={`status-indicator-dot ${isRecompiling ? "is-recompiling" : ""}`} />
          <span>
            {isRecompiling ? "COMPILER RECOMPILING..." : "COMPILER v4.2.0 // NODE_US_EAST"}
          </span>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. MAIN SPLIT SECTION (Left: 404 Hero // Right: 3D Core Stage)        */}
      {/* ===================================================================== */}
      <main className="swaply-404-main">
        {/* Left Hero Column */}
        <div className="swaply-404-hero">
          {/* Cyber Green 404 Typography Formed Directly with Animated Grain Noise Texture */}
          <div className={`swaply-404-digits-wrapper ${isGlitching ? "is-glitching" : ""}`}>
            <NoiseText404 text="404" patternRefreshInterval={2} patternAlpha={240} />
          </div>



          <h1 className="swaply-404-title">
            <span>ROUTE NOT FOUND</span>
            <span className="title-tag">0x404_ERR</span>
          </h1>

          <p className="swaply-404-desc">
            The compiler searched every module. This route doesn't exist.
          </p>

          {/* Action Buttons */}
          <div className="swaply-404-actions">
            <MagneticButton
              className="btn-recompile"
              onClick={handleRecompile}
              disabled={isRecompiling}
            >
              <RefreshCw
                size={15}
                className={isRecompiling ? "animate-spin" : ""}
                style={{ animation: isRecompiling ? "spin 0.7s infinite linear" : "none" }}
              />
              <span>{isRecompiling ? "RECOMPILING ROUTE..." : "RECOMPILE"}</span>
            </MagneticButton>

            <MagneticButton className="btn-return-home" onClick={handleReturnHome}>
              <ArrowLeft size={15} />
              <span>RETURN HOME</span>
            </MagneticButton>
          </div>

          {/* Humorous Line After Recompile Failure */}
          <div className={`swaply-404-humor ${showHumor ? "is-visible" : ""}`}>
            <Sparkles size={14} color="#c59b63" />
            <span>"Yeah... this one is definitely gone."</span>
          </div>
        </div>

        {/* Right Side: Open 3D Stage Area for Compiler Core */}
        <div className="swaply-404-right-space" aria-hidden="true" />
      </main>

      {/* ===================================================================== */}
      {/* 3. BOTTOM FOOTER BAR                                                  */}
      {/* ===================================================================== */}
      <footer className="swaply-404-footer">
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
