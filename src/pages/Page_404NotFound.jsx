import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Terminal,
  RefreshCw,
  Zap,
  Sparkles,
  Volume2,
  VolumeX,
  Tv,
  ArrowRight,
  RotateCcw,
  Wrench,
  Home,
  UserPlus,
  Activity,
  Cpu,
  Shield,
} from "lucide-react";
import confetti from "canvas-confetti";

/**
 * High-Tech Audio Synthesizer for Realistic Mecha Walking & Repair Sounds
 */
class RealMechaAudioSynthesizer {
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

  // Realistic Mechanical Servo + Heavy Footstep Clank
  playFootstep(leftFoot = true) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // 1. Servo Whirr (high pitched micro-whine)
      const servoOsc = this.ctx.createOscillator();
      const servoGain = this.ctx.createGain();
      servoOsc.type = "sawtooth";
      servoOsc.frequency.setValueAtTime(leftFoot ? 850 : 920, now);
      servoOsc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
      servoGain.gain.setValueAtTime(0.04, now);
      servoGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      servoOsc.connect(servoGain);
      servoGain.connect(this.ctx.destination);
      servoOsc.start(now);
      servoOsc.stop(now + 0.08);

      // 2. Heavy Titanium Foot Plant (Thud)
      const thudOsc = this.ctx.createOscillator();
      const thudGain = this.ctx.createGain();
      thudOsc.type = "sine";
      thudOsc.frequency.setValueAtTime(leftFoot ? 140 : 160, now + 0.02);
      thudOsc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
      thudGain.gain.setValueAtTime(0.12, now + 0.02);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      thudOsc.connect(thudGain);
      thudGain.connect(this.ctx.destination);
      thudOsc.start(now + 0.02);
      thudOsc.stop(now + 0.12);
    } catch {}
  }

  // High-Energy Plasma Laser Arc Welding Sizzle
  playWelderSizzle() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2900, now);
      filter.Q.setValueAtTime(3.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      whiteNoise.start(now);

      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1600 + Math.random() * 400, now);
      oscGain.gain.setValueAtTime(0.04, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  }

  // Overload Electric Lightning Surge & Coil Spring Pop
  playElectricShock() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.setValueAtTime(960, now + 0.05);
      osc.frequency.setValueAtTime(220, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.45);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);

      const boing = this.ctx.createOscillator();
      const boingGain = this.ctx.createGain();
      boing.type = "sine";
      boing.frequency.setValueAtTime(620, now + 0.1);
      boing.frequency.exponentialRampToValueAtTime(150, now + 0.55);
      boingGain.gain.setValueAtTime(0.14, now + 0.1);
      boingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      boing.connect(boingGain);
      boingGain.connect(this.ctx.destination);
      boing.start(now + 0.1);
      boing.stop(now + 0.55);
    } catch {}
  }

  // Hydraulic Exhaust Steam Release (Pssssshhh)
  playSteamFizz() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(320, now + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch {}
  }

  // Keyboard Click
  playKeyClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(940, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {}
  }

  // Victory / Navigation Chime
  playSuccessChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        const startTime = this.ctx.currentTime + idx * 0.07;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {}
  }
}

const sfx = new RealMechaAudioSynthesizer();

/**
 * Standalone Fullscreen 100vw × 100vh Real Mechanical CyberBot Walking & Repair Page
 */
export default function Page_404NotFound({ onGoHome, onGoSignUp }) {
  // Animation Phases: "WALKING" | "WELDING" | "SHOCKED" | "MALFUNCTION"
  const [phase, setPhase] = useState("WALKING");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtVibe, setCrtVibe] = useState(true);
  const [matrixRain, setMatrixRain] = useState(true);
  const [logs, setLogs] = useState([
    "INITIALIZING REAL-TIME MECHA SERVOS v9.1 ...",
    "SEEKING MEMORY NODE AT 0x00000404 ...",
  ]);
  const [weldingSparks, setWeldingSparks] = useState(false);
  const [shockFlash, setShockFlash] = useState(false);
  const [repairAttempts, setRepairAttempts] = useState(1);
  const [isManualProbing, setIsManualProbing] = useState(false);

  const canvasMatrixRef = useRef(null);

  // Sync SFX state
  useEffect(() => {
    sfx.enabled = soundEnabled;
  }, [soundEnabled]);

  // Main Automated Real Robot Repair & Walking Sequence
  const runRepairCycle = useCallback(() => {
    setPhase("WALKING");
    setWeldingSparks(false);
    setShockFlash(false);
    setLogs((prev) => [
      ...prev.slice(-3),
      `>> [CYCLE #${repairAttempts}] MECHA HYDRAULICS ENGAGED...`,
      ">> ARTICULATED BIPEDAL STRIDE WALKING TO 0x404 ROUTE...",
    ]);

    // Footstep Sound Interval synchronized with walking stride
    let stepCount = 0;
    const stepInterval = setInterval(() => {
      if (stepCount < 7) {
        sfx.playFootstep(stepCount % 2 === 0);
        stepCount++;
      } else {
        clearInterval(stepInterval);
      }
    }, 380);

    // Phase 2: Start Welding after walking in (2.8s)
    const weldTimer = setTimeout(() => {
      setPhase("WELDING");
      setWeldingSparks(true);
      setLogs((prev) => [
        ...prev.slice(-3),
        ">> [PLASMA ARC TORCH ACTIVE] FIRING HIGH-ENERGY LASER BEAM...",
        ">> REALIGNING COMPILER AST NODES & HEALING CIRCUIT POINTERS...",
      ]);

      // Sizzle sound interval
      let sizzleCount = 0;
      const sizzleInterval = setInterval(() => {
        if (sizzleCount < 10) {
          sfx.playWelderSizzle();
          sizzleCount++;
        } else {
          clearInterval(sizzleInterval);
        }
      }, 170);

      // Phase 3: Electric Shock & Malfunction (5.2s)
      const shockTimer = setTimeout(() => {
        clearInterval(sizzleInterval);
        setPhase("SHOCKED");
        setWeldingSparks(false);
        setShockFlash(true);
        sfx.playElectricShock();
        sfx.playSteamFizz();

        // Confetti spark burst
        confetti({
          particleCount: 50,
          spread: 85,
          origin: { y: 0.52 },
          colors: ["#39ff14", "#22c55e", "#facc15", "#ef4444", "#ffffff"],
        });

        setTimeout(() => setShockFlash(false), 260);

        setLogs((prev) => [
          ...prev.slice(-3),
          "💥 [CRITICAL 0x404 SURGE] HIGH VOLTAGE MEMORY OVERLOAD!",
          "⚠️ POINTER CORRUPTION: TARGET ADDRESS UNRESOLVED.",
          ">> MECHA REACTOR OVERHEATED! MANUAL REDIRECTION AVAILABLE.",
        ]);

        // Settle into Malfunction Idle
        setTimeout(() => {
          setPhase("MALFUNCTION");
        }, 1200);
      }, 2400);

      return () => clearTimeout(shockTimer);
    }, 2800);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(weldTimer);
    };
  }, [repairAttempts]);

  // Initial mount trigger
  useEffect(() => {
    const cleanup = runRepairCycle();
    return cleanup;
  }, [runRepairCycle]);

  // Phosphor Green Matrix Digital Rain background canvas
  useEffect(() => {
    if (!matrixRain) return;
    const canvas = canvasMatrixRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    const glyphs = "0123456789ABCDEF0x404NOTFOUNDNULLPTRSIGSEGV";
    const fontSize = 13;
    let columns = Math.floor(window.innerWidth / fontSize);
    let drops = Array(columns).fill(1);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(window.innerWidth / fontSize);
      drops = Array(columns).fill(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.fillStyle = "rgba(5, 10, 5, 0.14)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(57, 255, 20, 0.4)";
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = glyphs[Math.floor(Math.random() * glyphs.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [matrixRain]);

  // Manual Trigger to re-run repair
  const handleManualRepair = () => {
    sfx.playKeyClick();
    setRepairAttempts((prev) => prev + 1);
    setIsManualProbing(true);
    setTimeout(() => setIsManualProbing(false), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#050805",
        color: "#4ade80",
        fontFamily: "'JetBrains Mono', monospace",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        userSelect: "none",
        zIndex: 50,
      }}
    >
      {/* Background Matrix Rain */}
      {matrixRain && (
        <canvas
          ref={canvasMatrixRef}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.38,
            zIndex: 1,
          }}
        />
      )}

      {/* Screen Shock Flash FX */}
      <AnimatePresence>
        {shockFlash && (
          <motion.div
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(57, 255, 20, 0.5)",
              pointerEvents: "none",
              zIndex: 99999,
            }}
          />
        )}
      </AnimatePresence>

      {/* CRT Scanline Filter */}
      {crtVibe && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 40,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.32) 2px, rgba(0, 0, 0, 0.32) 4px)",
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* 1. TOP STATUS & SYSTEM HUD BAR */}
      {/* ========================================================================= */}
      <header
        style={{
          width: "100%",
          padding: "8px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(8, 18, 8, 0.88)",
          borderBottom: "1.5px solid rgba(34, 197, 94, 0.3)",
          backdropFilter: "blur(12px)",
          zIndex: 60,
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: phase === "SHOCKED" || phase === "MALFUNCTION" ? "#ef4444" : "#22c55e",
              boxShadow: phase === "SHOCKED" || phase === "MALFUNCTION" ? "0 0 10px #ef4444" : "0 0 10px #22c55e",
            }}
          />
          <span style={{ fontSize: "11.5px", fontWeight: 800, letterSpacing: "0.08em", color: "#4ade80" }}>
            SWAPLY COMPILER // FAULT ID: 0x404_NULL_AST
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            onClick={() => setSoundEnabled((v) => !v)}
            style={{
              background: soundEnabled ? "rgba(34, 197, 94, 0.15)" : "transparent",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              color: soundEnabled ? "#4ade80" : "#64748b",
              padding: "4px 8px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "10.5px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            <span>SFX</span>
          </button>

          <button
            onClick={() => setCrtVibe((v) => !v)}
            style={{
              background: crtVibe ? "rgba(34, 197, 94, 0.15)" : "transparent",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              color: crtVibe ? "#4ade80" : "#64748b",
              padding: "4px 8px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "10.5px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Tv size={12} />
            <span>CRT</span>
          </button>

          <button
            onClick={() => setMatrixRain((v) => !v)}
            style={{
              background: matrixRain ? "rgba(34, 197, 94, 0.15)" : "transparent",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              color: matrixRain ? "#4ade80" : "#64748b",
              padding: "4px 8px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "10.5px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Sparkles size={12} />
            <span>RAIN</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CENTER IMMERSIVE STAGE: GLOWING 404 CORE + REALISTIC WALKING MECHA */}
      {/* ========================================================================= */}
      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "880px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 30,
          padding: "4px 16px",
          boxSizing: "border-box",
        }}
      >
        {/* Holographic 404 Monument */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "2px",
          }}
        >
          <motion.div
            animate={
              phase === "SHOCKED"
                ? { x: [-6, 6, -4, 4, 0], scale: [1.05, 0.96, 1.02, 1] }
                : { y: [0, -3, 0] }
            }
            transition={{
              y: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 0.25 },
            }}
            style={{
              fontSize: "clamp(46px, 7.5vw, 72px)",
              fontWeight: 900,
              letterSpacing: "0.08em",
              color: phase === "SHOCKED" ? "#ef4444" : "#39ff14",
              textShadow:
                phase === "SHOCKED"
                  ? "0 0 20px #ef4444, 0 0 40px rgba(239, 68, 68, 0.8)"
                  : "0 0 18px #39ff14, 0 0 40px rgba(57, 255, 20, 0.8), 0 0 70px rgba(34, 197, 94, 0.4)",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>4</span>
            <div
              style={{
                position: "relative",
                width: "clamp(36px, 5.5vw, 56px)",
                height: "clamp(36px, 5.5vw, 56px)",
                borderRadius: "50%",
                border: phase === "SHOCKED" ? "3.5px dashed #ef4444" : "3.5px dashed #22c55e",
                boxShadow:
                  phase === "SHOCKED"
                    ? "0 0 20px #ef4444, inset 0 0 15px #ef4444"
                    : "0 0 25px #22c55e, inset 0 0 15px #22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "spin 10s linear infinite",
              }}
            >
              <Zap
                size={22}
                style={{
                  color: phase === "SHOCKED" ? "#ef4444" : "#39ff14",
                  filter: "drop-shadow(0 0 6px currentColor)",
                }}
              />
            </div>
            <span>4</span>
          </motion.div>

          <div
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              background: "rgba(34, 197, 94, 0.12)",
              border: "1px solid rgba(34, 197, 94, 0.35)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#86efac",
              textShadow: "0 0 8px rgba(34, 197, 94, 0.5)",
              marginLeft: 6,
            }}
          >
            ROUTE NOT FOUND // 0x404
          </div>
        </div>

        {/* =================================================================== */}
        {/* REALISTIC MECHA ROBOT WALKING & REPAIR STAGE */}
        {/* =================================================================== */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "700px",
            height: "235px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            margin: "2px 0 6px",
          }}
        >
          {/* Cyber Floor Grid Stage */}
          <div
            style={{
              position: "absolute",
              bottom: 4,
              left: "4%",
              right: "4%",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #22c55e 25%, #39ff14 50%, #22c55e 75%, transparent)",
              boxShadow: "0 0 14px #39ff14",
            }}
          />

          {/* Plasma Laser Welding Arc & Spark Shower */}
          {weldingSparks && (
            <>
              {/* Plasma Laser Beam Line */}
              <motion.div
                animate={{ opacity: [0.8, 1, 0.7], width: ["80px", "95px", "85px"] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                style={{
                  position: "absolute",
                  top: "38%",
                  left: "54%",
                  height: "3px",
                  background: "linear-gradient(90deg, #ffffff, #39ff14, #22c55e)",
                  boxShadow: "0 0 14px #39ff14, 0 0 25px #ffffff",
                  transform: "rotate(-18deg)",
                  transformOrigin: "left center",
                  pointerEvents: "none",
                  zIndex: 42,
                }}
              />

              {/* Spark Particles */}
              <div
                style={{
                  position: "absolute",
                  top: "32%",
                  left: "58%",
                  pointerEvents: "none",
                  zIndex: 45,
                }}
              >
                {[...Array(14)].map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    animate={{
                      opacity: [1, 0],
                      x: (Math.random() - 0.5) * 100,
                      y: Math.random() * 70 - 30,
                      scale: [1.3, 0.1],
                    }}
                    transition={{
                      duration: 0.35,
                      repeat: Infinity,
                      delay: idx * 0.025,
                      ease: "easeOut",
                    }}
                    style={{
                      position: "absolute",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      backgroundColor: idx % 3 === 0 ? "#ffffff" : idx % 3 === 1 ? "#39ff14" : "#facc15",
                      boxShadow: "0 0 10px #39ff14",
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Active Realistic Mecha Robot Master Container */}
          <motion.div
            initial={{ x: -260, opacity: 0 }}
            animate={
              phase === "WALKING"
                ? { x: [-260, 0], opacity: 1 }
                : phase === "WELDING"
                ? { x: 0, opacity: 1, y: [0, -3, 0] }
                : phase === "SHOCKED"
                ? { x: [-14, 14, -8, 8, -4, 4, 0], y: [-18, 0], rotate: [-8, 8, -4, 4, 0] }
                : { x: 0, opacity: 1, y: [0, -3, 0] }
            }
            transition={
              phase === "WALKING"
                ? { duration: 2.7, ease: "easeOut" }
                : phase === "WELDING"
                ? { y: { duration: 0.28, repeat: Infinity } }
                : phase === "SHOCKED"
                ? { duration: 0.5, ease: "easeInOut" }
                : { y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }
            }
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              zIndex: 35,
              cursor: "pointer",
            }}
            onClick={handleManualRepair}
            title="Click Robot to Re-Deploy!"
          >
            {/* Robot Speech Dialogue Bubble */}
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginBottom: "4px",
                padding: "3px 12px",
                borderRadius: "100px",
                background:
                  phase === "SHOCKED" || phase === "MALFUNCTION"
                    ? "rgba(35, 10, 10, 0.95)"
                    : "rgba(8, 22, 8, 0.95)",
                border:
                  phase === "SHOCKED" || phase === "MALFUNCTION"
                    ? "1.5px solid #ef4444"
                    : "1.5px solid #22c55e",
                boxShadow:
                  phase === "SHOCKED" || phase === "MALFUNCTION"
                    ? "0 0 16px rgba(239, 68, 68, 0.5)"
                    : "0 0 16px rgba(34, 197, 94, 0.45)",
                color: phase === "SHOCKED" || phase === "MALFUNCTION" ? "#fca5a5" : "#86efac",
                fontSize: "10.5px",
                fontWeight: 800,
                letterSpacing: "0.03em",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {phase === "WALKING" && (
                <>
                  <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    ⚙️
                  </motion.span>
                  <span>BIPEDAL MECHA WALKING TO 0x404 FAULT...</span>
                </>
              )}
              {phase === "WELDING" && (
                <>
                  <Wrench size={12} className="animate-spin" />
                  <span>ENGAGING PLASMA ARC TORCH // REALIGNING AST NODES...</span>
                </>
              )}
              {phase === "SHOCKED" && (
                <>
                  <span>💥 *KZZZZT!* ⚡ CORE VOLTAGE SURGE! SPRINGS POPPED!</span>
                </>
              )}
              {phase === "MALFUNCTION" && (
                <>
                  <span>😵 *OVERLOAD!* 0x404 ROUTE UNRESOLVED! CLICK TO RETRY!</span>
                </>
              )}
            </motion.div>

            {/* =============================================================== */}
            {/* REALISTIC DETAILED SVG MECHA ROBOT MODEL WITH WALKING GAIT */}
            {/* =============================================================== */}
            <div style={{ position: "relative", width: 140, height: 165, display: "flex", justifyContent: "center" }}>
              {/* Torso & Head Bobbing during walking */}
              <motion.div
                animate={
                  phase === "WALKING"
                    ? { y: [-5, 3, -5], rotate: [-2, 2, -2] }
                    : phase === "WELDING"
                    ? { y: [0, -2, 0], rotate: [0.5, -0.5, 0.5] }
                    : phase === "SHOCKED"
                    ? { rotate: [-10, 10, -5, 5, 0], scale: [1.06, 0.96, 1] }
                    : { y: [0, -2, 0] }
                }
                transition={
                  phase === "WALKING"
                    ? { duration: 0.38, repeat: Infinity }
                    : { duration: 0.4 }
                }
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* 1. HEAD & HELMET WITH SENSORS */}
                <div
                  style={{
                    position: "relative",
                    width: 70,
                    height: 48,
                    borderRadius: "12px 12px 10px 10px",
                    background: "linear-gradient(180deg, #162a16 0%, #0a140a 100%)",
                    border: phase === "SHOCKED" || phase === "MALFUNCTION" ? "2px solid #ef4444" : "2px solid #39ff14",
                    boxShadow:
                      phase === "SHOCKED" || phase === "MALFUNCTION"
                        ? "0 0 20px rgba(239, 68, 68, 0.7), inset 0 0 10px rgba(239, 68, 68, 0.4)"
                        : "0 0 20px rgba(57, 255, 20, 0.6), inset 0 0 10px rgba(34, 197, 94, 0.3)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 25,
                  }}
                >
                  {/* Top Antenna Sensor with Flashing Diode */}
                  <div style={{ position: "absolute", top: -14, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: phase === "SHOCKED" || phase === "MALFUNCTION" ? "#ef4444" : "#39ff14",
                        boxShadow: phase === "SHOCKED" ? "0 0 10px #ef4444" : "0 0 12px #39ff14",
                        animation: "pulse 0.8s infinite alternate",
                      }}
                    />
                    <div style={{ width: 2, height: 8, backgroundColor: "#39ff14" }} />
                  </div>

                  {/* Popped Springs on Shock / Malfunction */}
                  {(phase === "SHOCKED" || phase === "MALFUNCTION") && (
                    <>
                      <motion.div
                        animate={{ rotate: [-15, 15, -15], y: [-4, 4, -4] }}
                        transition={{ duration: 0.35, repeat: Infinity }}
                        style={{ position: "absolute", top: -24, left: 4, zIndex: 30 }}
                      >
                        <svg width="20" height="28" viewBox="0 0 24 40" fill="none">
                          <path d="M12 36 C4 32, 4 28, 12 24 C20 20, 20 16, 12 12 C4 8, 4 4, 12 0" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                          <circle cx="12" cy="3" r="3" fill="#f87171" />
                        </svg>
                      </motion.div>
                      <motion.div
                        animate={{ rotate: [15, -15, 15], y: [-4, 4, -4] }}
                        transition={{ duration: 0.35, repeat: Infinity }}
                        style={{ position: "absolute", top: -24, right: 4, zIndex: 30, transform: "scaleX(-1)" }}
                      >
                        <svg width="20" height="28" viewBox="0 0 24 40" fill="none">
                          <path d="M12 36 C4 32, 4 28, 12 24 C20 20, 20 16, 12 12 C4 8, 4 4, 12 0" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                          <circle cx="12" cy="3" r="3" fill="#f87171" />
                        </svg>
                      </motion.div>
                    </>
                  )}

                  {/* Side Ear Comms Pods */}
                  <div style={{ position: "absolute", left: -6, width: 5, height: 16, backgroundColor: "#22c55e", borderRadius: "2px" }} />
                  <div style={{ position: "absolute", right: -6, width: 5, height: 16, backgroundColor: "#22c55e", borderRadius: "2px" }} />

                  {/* Curved Glass Visor with Optical Sensors */}
                  <div
                    style={{
                      width: 52,
                      height: 24,
                      borderRadius: "6px",
                      backgroundColor: "#030803",
                      border: "1px solid rgba(57, 255, 20, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Visor Scanline Sweep */}
                    <motion.div
                      animate={{ x: [-30, 60] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        width: "8px",
                        background: "linear-gradient(90deg, transparent, rgba(57, 255, 20, 0.4), transparent)",
                      }}
                    />

                    {/* Optical Eyes */}
                    {phase === "SHOCKED" || phase === "MALFUNCTION" ? (
                      <>
                        <motion.span
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          style={{ color: "#ef4444", fontSize: "14px", fontWeight: 900 }}
                        >
                          ?
                        </motion.span>
                        <motion.span
                          animate={{ rotate: [360, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          style={{ color: "#ef4444", fontSize: "14px", fontWeight: 900 }}
                        >
                          ?
                        </motion.span>
                      </>
                    ) : (
                      <>
                        {/* High-Tech Cyan/Green Glowing Camera Sensors */}
                        <div
                          style={{
                            width: 13,
                            height: 13,
                            borderRadius: "50%",
                            background: "radial-gradient(circle, #ffffff 15%, #39ff14 60%, #15803d 100%)",
                            boxShadow: "0 0 10px #39ff14, inset 0 0 4px #ffffff",
                          }}
                        />
                        <div
                          style={{
                            width: 13,
                            height: 13,
                            borderRadius: "50%",
                            background: "radial-gradient(circle, #ffffff 15%, #39ff14 60%, #15803d 100%)",
                            boxShadow: "0 0 10px #39ff14, inset 0 0 4px #ffffff",
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Neck Hydraulic Joint */}
                <div style={{ width: 18, height: 5, backgroundColor: "#1e3a1e", border: "1px solid #22c55e" }} />

                {/* 2. CHEST CHASSIS & CORE REACTOR */}
                <div
                  style={{
                    position: "relative",
                    width: 78,
                    height: 48,
                    borderRadius: "8px",
                    background: "linear-gradient(180deg, #152d15 0%, #0a170a 100%)",
                    border: "1.5px solid #22c55e",
                    boxShadow: "0 0 14px rgba(34, 197, 94, 0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 6px",
                    boxSizing: "border-box",
                    zIndex: 20,
                  }}
                >
                  {/* Left Shoulder Pauldron Joint */}
                  <div
                    style={{
                      position: "absolute",
                      left: -10,
                      top: 4,
                      width: 12,
                      height: 16,
                      borderRadius: "4px",
                      backgroundColor: "#16a34a",
                      border: "1px solid #39ff14",
                    }}
                  />

                  {/* Right Shoulder Pauldron Joint */}
                  <div
                    style={{
                      position: "absolute",
                      right: -10,
                      top: 4,
                      width: 12,
                      height: 16,
                      borderRadius: "4px",
                      backgroundColor: "#16a34a",
                      border: "1px solid #39ff14",
                    }}
                  />

                  {/* Left Arm Articulation */}
                  <motion.div
                    animate={
                      phase === "WALKING"
                        ? { rotate: [20, -20, 20] }
                        : { rotate: 0 }
                    }
                    transition={{ duration: 0.38, repeat: Infinity }}
                    style={{
                      position: "absolute",
                      left: -14,
                      top: 14,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transformOrigin: "top center",
                    }}
                  >
                    {/* Bicep */}
                    <div style={{ width: 8, height: 14, backgroundColor: "#1e3a1e", borderRadius: "3px", border: "1px solid #22c55e" }} />
                    {/* Elbow Servo */}
                    <div style={{ width: 6, height: 5, backgroundColor: "#39ff14", borderRadius: "50%" }} />
                    {/* Forearm & 3-Finger Gripper */}
                    <div style={{ width: 7, height: 14, backgroundColor: "#162a16", borderRadius: "2px", border: "1px solid #22c55e" }} />
                    <div style={{ display: "flex", gap: 2, marginTop: 1 }}>
                      <div style={{ width: 2, height: 5, backgroundColor: "#39ff14" }} />
                      <div style={{ width: 2, height: 6, backgroundColor: "#39ff14" }} />
                      <div style={{ width: 2, height: 5, backgroundColor: "#39ff14" }} />
                    </div>
                  </motion.div>

                  {/* Right Arm: Articulated Plasma Laser Welder Torch */}
                  <motion.div
                    animate={
                      phase === "WALKING"
                        ? { rotate: [-20, 20, -20] }
                        : phase === "WELDING"
                        ? { rotate: [-35, -20, -35] }
                        : { rotate: 0 }
                    }
                    transition={
                      phase === "WELDING"
                        ? { duration: 0.25, repeat: Infinity }
                        : { duration: 0.38, repeat: Infinity }
                    }
                    style={{
                      position: "absolute",
                      right: -16,
                      top: 14,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transformOrigin: "top center",
                      zIndex: 30,
                    }}
                  >
                    {/* Bicep */}
                    <div style={{ width: 8, height: 14, backgroundColor: "#1e3a1e", borderRadius: "3px", border: "1px solid #22c55e" }} />
                    {/* Elbow Servo */}
                    <div style={{ width: 6, height: 5, backgroundColor: "#39ff14", borderRadius: "50%" }} />
                    {/* Heavy Forearm with Laser Torch Tool */}
                    <div style={{ width: 9, height: 16, backgroundColor: "#162a16", borderRadius: "2px", border: "1.5px solid #39ff14", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <Wrench size={11} style={{ color: "#39ff14", transform: "rotate(45deg)" }} />
                    </div>
                    {/* Plasma Emitter Nozzle */}
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 0 15px #39ff14, 0 0 25px #ffffff",
                        marginTop: -2,
                      }}
                    />
                  </motion.div>

                  {/* Center Plasma Arc Reactor Core */}
                  <div style={{ margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background:
                          phase === "SHOCKED" || phase === "MALFUNCTION"
                            ? "radial-gradient(circle, #ffffff 10%, #ef4444 60%, #7f1d1d 100%)"
                            : "radial-gradient(circle, #ffffff 15%, #39ff14 60%, #14532d 100%)",
                        border: phase === "SHOCKED" ? "2px solid #ef4444" : "2px solid #39ff14",
                        boxShadow: phase === "SHOCKED" ? "0 0 15px #ef4444" : "0 0 16px #39ff14, inset 0 0 6px #ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Zap size={11} style={{ color: "#ffffff" }} />
                    </div>
                    <span style={{ fontSize: "7px", fontWeight: 900, color: "#86efac", letterSpacing: "0.08em", marginTop: 2 }}>
                      CORE 100%
                    </span>
                  </div>
                </div>

                {/* Pelvis & Waist Articulation */}
                <div
                  style={{
                    width: 48,
                    height: 12,
                    borderRadius: "0 0 6px 6px",
                    backgroundColor: "#0d1a0d",
                    border: "1.5px solid #22c55e",
                    borderTop: "none",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    zIndex: 18,
                  }}
                >
                  <div style={{ width: 8, height: 6, backgroundColor: "#1e3a1e", borderRadius: "2px" }} />
                  <div style={{ width: 8, height: 6, backgroundColor: "#1e3a1e", borderRadius: "2px" }} />
                </div>
              </motion.div>

              {/* =============================================================== */}
              {/* 3. ARTICULATED BIPEDAL LEGS & ARMORED BOOTS (REALISTIC STRIDE) */}
              {/* =============================================================== */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "60px",
                  display: "flex",
                  justifyContent: "space-between",
                  zIndex: 15,
                }}
              >
                {/* LEFT LEG (Thigh -> Knee Servo -> Shin -> Armored Boot) */}
                <motion.div
                  animate={
                    phase === "WALKING"
                      ? {
                          rotate: [-30, 26, -30],
                          y: [-4, 3, -4],
                        }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.38, repeat: Infinity }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transformOrigin: "top center",
                  }}
                >
                  {/* Heavy Thigh Plate */}
                  <div style={{ width: 12, height: 18, backgroundColor: "#152d15", border: "1px solid #22c55e", borderRadius: "3px" }} />
                  {/* Knee Hinge Servo with Spring Damper */}
                  <div style={{ width: 10, height: 6, backgroundColor: "#39ff14", borderRadius: "3px", boxShadow: "0 0 6px #39ff14" }} />
                  {/* Calf & Shin Armor */}
                  <div style={{ width: 11, height: 18, backgroundColor: "#0e1f0e", border: "1px solid #22c55e", borderRadius: "2px" }} />
                  {/* Armored Magnetic Boot with Treads */}
                  <div
                    style={{
                      width: 20,
                      height: 9,
                      borderRadius: "3px 5px 2px 2px",
                      backgroundColor: "#16a34a",
                      border: "1.5px solid #39ff14",
                      boxShadow: "0 0 8px #39ff14",
                      marginLeft: -2,
                    }}
                  />
                </motion.div>

                {/* RIGHT LEG (Thigh -> Knee Servo -> Shin -> Armored Boot) */}
                <motion.div
                  animate={
                    phase === "WALKING"
                      ? {
                          rotate: [26, -30, 26],
                          y: [3, -4, 3],
                        }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.38, repeat: Infinity }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transformOrigin: "top center",
                  }}
                >
                  {/* Heavy Thigh Plate */}
                  <div style={{ width: 12, height: 18, backgroundColor: "#152d15", border: "1px solid #22c55e", borderRadius: "3px" }} />
                  {/* Knee Hinge Servo with Spring Damper */}
                  <div style={{ width: 10, height: 6, backgroundColor: "#39ff14", borderRadius: "3px", boxShadow: "0 0 6px #39ff14" }} />
                  {/* Calf & Shin Armor */}
                  <div style={{ width: 11, height: 18, backgroundColor: "#0e1f0e", border: "1px solid #22c55e", borderRadius: "2px" }} />
                  {/* Armored Magnetic Boot with Treads */}
                  <div
                    style={{
                      width: 20,
                      height: 9,
                      borderRadius: "3px 5px 2px 2px",
                      backgroundColor: "#16a34a",
                      border: "1.5px solid #39ff14",
                      boxShadow: "0 0 8px #39ff14",
                      marginLeft: 2,
                    }}
                  />
                </motion.div>
              </div>

              {/* Dynamic Ground Contact Shadow */}
              <motion.div
                animate={
                  phase === "WALKING"
                    ? { scaleX: [1.2, 0.8, 1.2], opacity: [0.6, 0.3, 0.6] }
                    : { scaleX: 1, opacity: 0.5 }
                }
                transition={{ duration: 0.38, repeat: Infinity }}
                style={{
                  position: "absolute",
                  bottom: -3,
                  width: 90,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "rgba(34, 197, 94, 0.45)",
                  filter: "blur(5px)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* =================================================================== */}
        {/* 3. REAL-TIME COMPACT LLVM TERMINAL LOGS */}
        {/* =================================================================== */}
        <div
          style={{
            width: "100%",
            maxWidth: "680px",
            backgroundColor: "rgba(6, 14, 6, 0.94)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "7px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(34, 197, 94, 0.15)",
            padding: "8px 14px",
            boxSizing: "border-box",
            fontSize: "11.5px",
            lineHeight: 1.45,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "4px",
              borderBottom: "1px solid rgba(34, 197, 94, 0.15)",
              paddingBottom: "3px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#86efac", fontWeight: 800 }}>
              <Terminal size={13} />
              <span>LLVM AST RECOVERY TRACE // DIAGNOSTIC LOGS</span>
            </div>
            <span style={{ color: "#64748b", fontSize: "10px" }}>ATTEMPT #{repairAttempts}</span>
          </div>

          <div style={{ fontFamily: "'JetBrains Mono', monospace", minHeight: "44px" }}>
            {logs.map((logLine, idx) => (
              <div
                key={idx}
                style={{
                  color: logLine.includes("CRITICAL") || logLine.includes("💥")
                    ? "#ef4444"
                    : logLine.includes(">>")
                    ? "#39ff14"
                    : "#a1a1aa",
                  fontSize: "11px",
                }}
              >
                {logLine}
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 4. ACTION BUTTONS */}
        {/* =================================================================== */}
        <div
          style={{
            width: "100%",
            maxWidth: "680px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "10px",
            marginTop: "12px",
          }}
        >
          <button
            onClick={() => {
              sfx.playSuccessChime();
              if (onGoHome) onGoHome();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #15803d 0%, #16a34a 100%)",
              border: "1.5px solid #22c55e",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Home size={14} />
            <span>RETURN TO SIGN IN</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => {
              sfx.playSuccessChime();
              if (onGoSignUp) onGoSignUp();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: "6px",
              background: "rgba(10, 25, 10, 0.9)",
              border: "1.5px solid #22c55e",
              color: "#86efac",
              fontSize: "12px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 0 15px rgba(34, 197, 94, 0.25)",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <UserPlus size={14} />
            <span>CREATE NEW ACCOUNT</span>
          </button>

          <button
            onClick={handleManualRepair}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: "6px",
              background: "rgba(15, 30, 15, 0.9)",
              border: "1.5px solid #16a34a",
              color: "#bbf7d0",
              fontSize: "12px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 0 15px rgba(34, 197, 94, 0.2)",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <RotateCcw size={14} className={isManualProbing ? "animate-spin" : ""} />
            <span>RE-DEPLOY REPAIR BOT</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          padding: "6px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(8, 18, 8, 0.88)",
          borderTop: "1px solid rgba(34, 197, 94, 0.15)",
          fontSize: "10.5px",
          color: "#64748b",
          boxSizing: "border-box",
          zIndex: 60,
        }}
      >
        <span>SWAPLY ONE COMPILER AST DIAGNOSTIC SUITE</span>
        <span>ERROR: 0x404_NULL_SYMBOL</span>
      </footer>
    </div>
  );
}
