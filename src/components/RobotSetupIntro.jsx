import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wrench,
  Zap,
  Cpu,
  CheckCircle2,
  Terminal,
  FastForward,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Code2,
  Tv,
  Check
} from "lucide-react";

// Subtle Web Audio synthesizer for sci-fi retro terminal sound effects
class TerminalAudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playBeep(freq = 600, type = "triangle", duration = 0.08, gainVal = 0.06) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(gainVal, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {}
  }

  playLaser() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.2);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }

  playPowerUp() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {}
  }

  playSuccess() {
    if (this.muted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playBeep(freq, "square", 0.2, 0.06), idx * 80);
    });
  }
}

const terminalAudio = new TerminalAudioEngine();

export default function RobotSetupIntro({ onComplete }) {
  // Phases: 0 = Init, 1 = Swoop In, 2 = Weld Frame, 3 = Install Prompts & Wires, 4 = Reactor Core, 5 = Handover
  const [phase, setPhase] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [muted, setMuted] = useState(false);
  const [dialogue, setDialogue] = useState("SYSTEM STATUS: OFFLINE. SUMMONING CYBER BOT...");
  const [progress, setProgress] = useState(5);
  const [logs, setLogs] = useState(["[INIT] Connecting to Swaply CRT Mainframe..."]);
  const [laserActive, setLaserActive] = useState(false);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Matrix Rain Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "0123456789ABCDEF$#@<>{}[]=/*~";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -50));

    let frameCount = 0;

    const render = () => {
      frameCount++;
      if (frameCount % 2 === 0) {
        ctx.fillStyle = "rgba(7, 10, 7, 0.25)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(34, 197, 94, 0.4)";
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars.charAt(Math.floor(Math.random() * chars.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Laser spark effect helper
  const triggerSparks = () => {
    // Pure cyber laser flash without paper confetti
  };

  useEffect(() => {
    terminalAudio.muted = muted;
  }, [muted]);

  useEffect(() => {
    const s = speed;
    const timeouts = [];

    // Phase 1: Swoop In (at 0.15s)
    timeouts.push(
      setTimeout(() => {
        setPhase(1);
        setProgress(25);
        setDialogue("[BYTE@ROOT:~]$ Deploying Phosphor CRT Mainframe...");
        setLogs((prev) => [...prev, "[BOT] Byte The CyberBot locked on station"]);
        terminalAudio.playPowerUp();
      }, 150 / s)
    );

    // Phase 2: Weld Chassis Frame (at 0.85s)
    timeouts.push(
      setTimeout(() => {
        setPhase(2);
        setProgress(50);
        setDialogue("[WELD]: Laser-welding CRT Chassis & Scanline Matrix...");
        setLogs((prev) => [...prev, "[WELD] Constructing CRT phosphor chassis..."]);
        setLaserActive(true);
        terminalAudio.playLaser();
        triggerSparks(0.5, 0.45);
      }, 850 / s)
    );

    // Laser sparks during phase 2
    timeouts.push(
      setTimeout(() => {
        triggerSparks(0.35, 0.45);
        terminalAudio.playLaser();
      }, 1150 / s)
    );

    // Phase 3: Install Inputs & Wire Cables (at 1.6s)
    timeouts.push(
      setTimeout(() => {
        setLaserActive(false);
        setPhase(3);
        setProgress(78);
        setDialogue("[PROMPTS]: Installing Auth Gateway & Security Prompts...");
        setLogs((prev) => [...prev, "[AUTH] Assembling Developer ID & Master Passkey..."]);
        terminalAudio.playBeep(650, "triangle", 0.15);
        triggerSparks(0.5, 0.6);
      }, 1600 / s)
    );

    // Phase 4: Calibrate Reactor Core (at 2.4s)
    timeouts.push(
      setTimeout(() => {
        setPhase(4);
        setProgress(95);
        setDialogue("[REACTOR]: Booting Swaply-One Phosphor Reactor Core...");
        setLogs((prev) => [...prev, "[OK] LLVM Target Linking & CRT Vibe 100% OK"]);
        terminalAudio.playPowerUp();
      }, 2400 / s)
    );

    // Phase 5: Handover & Ready (at 3.1s)
    timeouts.push(
      setTimeout(() => {
        setPhase(5);
        setProgress(100);
        setDialogue("[SYSTEM]: CRT Mainframe Operational. Handing over controls!");
        setLogs((prev) => [...prev, "[READY] Terminal Online! Booting Login..."]);
        terminalAudio.playSuccess();
      }, 3100 / s)
    );

    // Transition to live CRT terminal page (at 3.7s)
    timeouts.push(
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 3700 / s)
    );

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [speed, onComplete]);

  const handleSkip = () => {
    terminalAudio.playSuccess();
    if (onComplete) onComplete();
  };

  const asciiBanner = `
 ███████╗██╗    ██╗ █████╗ ██████╗ ██╗     ██╗   ██╗   ██████╗ ███╗   ██╗███████╗
 ██╔════╝██║    ██║██╔══██╗██╔══██╗██║     ╚██╗ ██╔╝  ██╔═══██╗████╗  ██║██╔════╝
 ███████╗██║ █╗ ██║███████║██████╔╝██║      ╚████╔╝   ██║   ██║██╔██╗ ██║█████╗  
 ╚════██║██║███╗██║██╔══██║██╔═══╝ ██║       ╚██╔╝    ██║   ██║██║╚██╗██║██╔══╝  
 ███████║╚███╔███╔╝██║  ██║██║     ███████╗   ██║     ╚██████╔╝██║ ╚████║███████╗
 ╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝     ╚══════╝   ╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝
                    [ SWAPLY ONE COMPILER v1.0.0 ]`;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#070a07",
        color: "#4ade80",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Background Matrix Digital Rain Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.65,
          zIndex: 1,
        }}
      />

      {/* CRT Scanline Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 50,
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
          backgroundSize: "100% 4px",
          opacity: 0.75,
        }}
      />

      {/* Top HUD Controls Bar (Responsive Mobile & Desktop) */}
      <div
        style={{
          position: "fixed",
          top: "clamp(8px, 2vh, 18px)",
          left: "clamp(8px, 3vw, 20px)",
          right: "clamp(8px, 3vw, 20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 80,
          gap: "8px",
          pointerEvents: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 8px",
              borderRadius: "4px",
              background: "rgba(13, 19, 13, 0.95)",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              boxShadow: "0 0 15px rgba(34, 197, 94, 0.2)",
              fontSize: "clamp(9px, 2.2vw, 11px)",
              fontWeight: 700,
              color: "#4ade80",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 8px #22c55e",
                flexShrink: 0,
              }}
            />
            <span>BOOTSTRAP // P{phase}/5</span>
          </div>
          <span style={{ fontSize: "10px", color: "#86efac", whiteSpace: "nowrap" }}>
            {progress}%
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {/* Speed Toggle */}
          <button
            type="button"
            onClick={() => setSpeed((prev) => (prev === 1 ? 2 : 1))}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 8px",
              borderRadius: "4px",
              background: "rgba(13, 19, 13, 0.95)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              color: speed === 2 ? "#facc15" : "#86efac",
              fontSize: "10px",
              fontWeight: 700,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            <FastForward size={11} />
            <span>{speed}X</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setMuted((prev) => !prev)}
            style={{
              padding: "4px 7px",
              borderRadius: "4px",
              background: "rgba(13, 19, 13, 0.95)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              color: muted ? "#ef4444" : "#4ade80",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            title={muted ? "Unmute Sound" : "Mute Sound"}
          >
            {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>

          {/* Skip Button */}
          <button
            type="button"
            onClick={handleSkip}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "5px 10px",
              borderRadius: "4px",
              background: "#22c55e",
              color: "#051105",
              fontWeight: 800,
              fontSize: "10.5px",
              fontFamily: "inherit",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)",
              whiteSpace: "nowrap",
            }}
          >
            <Zap size={11} />
            <span>SKIP ⚡</span>
          </button>
        </div>
      </div>

      {/* Main Assembly Stage: Exact Retro CRT Terminal Card */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "630px",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 16px",
          boxSizing: "border-box",
        }}
      >
        <motion.div
          style={{
            width: "100%",
            backgroundColor: "#0d130d",
            border: phase >= 2 ? "1.5px solid #22c55e" : "1.5px dashed rgba(34, 197, 94, 0.35)",
            borderRadius: "8px",
            boxShadow:
              phase >= 2
                ? "0 25px 70px rgba(0, 0, 0, 0.9), 0 0 35px -5px rgba(34, 197, 94, 0.4)"
                : "none",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.5s ease",
          }}
          animate={
            phase >= 2
              ? { scale: [0.96, 1], opacity: 1 }
              : { scale: 0.95, opacity: 0.5 }
          }
          transition={{ duration: 0.5 }}
        >
          {/* Laser Welding Lines (Phase 2) */}
          <AnimatePresence>
            {laserActive && (
              <motion.svg
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  zIndex: 35,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.line
                  x1="50%"
                  y1="25%"
                  x2="5%"
                  y2="5%"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  filter="drop-shadow(0 0 10px #22c55e)"
                  animate={{ strokeDashoffset: [-20, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 0.25, repeat: Infinity }}
                />
                <motion.line
                  x1="50%"
                  y1="25%"
                  x2="95%"
                  y2="5%"
                  stroke="#86efac"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  filter="drop-shadow(0 0 10px #86efac)"
                  animate={{ strokeDashoffset: [20, 0], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 0.28, repeat: Infinity }}
                />
                <motion.line
                  x1="50%"
                  y1="25%"
                  x2="95%"
                  y2="95%"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  filter="drop-shadow(0 0 10px #22c55e)"
                  animate={{ strokeDashoffset: [-30, 0], opacity: [0.9, 0.4, 0.9] }}
                  transition={{ duration: 0.22, repeat: Infinity }}
                />
                <motion.line
                  x1="50%"
                  y1="25%"
                  x2="5%"
                  y2="95%"
                  stroke="#86efac"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  filter="drop-shadow(0 0 10px #86efac)"
                  animate={{ strokeDashoffset: [30, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 0.26, repeat: Infinity }}
                />
              </motion.svg>
            )}
          </AnimatePresence>

          {/* CRT Header Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(34, 197, 94, 0.25)",
              paddingBottom: "10px",
              fontSize: "11px",
              color: "#86efac",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: phase >= 2 ? "#22c55e" : "#64748b",
                  boxShadow: phase >= 2 ? "0 0 10px #22c55e" : "none",
                }}
              />
              <span style={{ fontWeight: 700, letterSpacing: "0.08em" }}>
                SWAPLY-ONE COMPILER TERMINAL
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px" }}>
              <span style={{ color: "#4ade80" }}>◆ MATRIX</span>
              <span style={{ color: "#4ade80" }}>◆ CRT</span>
              <span style={{ color: "#4ade80" }}>◆ SFX</span>
            </div>
          </div>

          {/* ASCII Banner Logo */}
          <div style={{ textAlign: "center", overflow: "hidden", width: "100%" }}>
            <pre
              style={{
                margin: "0 auto",
                fontSize: "clamp(5px, 1.3vw, 7.8px)",
                lineHeight: "1.18",
                fontWeight: 700,
                color: phase >= 4 ? "#22c55e" : "#166534",
                textShadow: phase >= 4 ? "0 0 14px rgba(34, 197, 94, 0.75)" : "none",
                display: "inline-block",
                transition: "color 0.4s, text-shadow 0.4s",
              }}
            >
              {asciiBanner}
            </pre>
            <div style={{ marginTop: "6px", color: "#86efac", fontSize: "12px", opacity: phase >= 2 ? 1 : 0.3 }}>
              Sign in to initialize your compiler environment.
            </div>
          </div>

          {/* Authentication Prompt Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "11px",
                color: "#86efac",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              <span>AUTHENTICATION PROMPT:</span>
              <span style={{ color: "#22c55e" }}>[ AUTO-FILL DEMO ACCOUNT ]</span>
            </div>

            {/* Email Prompt Field (Phase 3) */}
            <motion.div
              style={{
                padding: "12px 14px",
                borderRadius: "4px",
                border: phase >= 3 ? "1px solid rgba(34, 197, 94, 0.5)" : "1px dashed rgba(34, 197, 94, 0.2)",
                background: phase >= 3 ? "rgba(7, 10, 7, 0.9)" : "rgba(7, 10, 7, 0.3)",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                boxShadow: phase >= 3 ? "0 0 12px rgba(34, 197, 94, 0.12)" : "none",
              }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 8 }}
            >
              <div style={{ fontSize: "10px", color: "#86efac", fontWeight: 700 }}>&gt; DEVELOPER EMAIL</div>
              <div style={{ color: "#4ade80", fontSize: "12px" }}>
                &gt; {phase >= 3 ? "developer@swaply.io (try typing 'matrix')" : "prompt_loading..."}
              </div>
            </motion.div>

            {/* Password Prompt Field (Phase 3) */}
            <motion.div
              style={{
                padding: "12px 14px",
                borderRadius: "4px",
                border: phase >= 3 ? "1px solid rgba(34, 197, 94, 0.5)" : "1px dashed rgba(34, 197, 94, 0.2)",
                background: phase >= 3 ? "rgba(7, 10, 7, 0.9)" : "rgba(7, 10, 7, 0.3)",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                boxShadow: phase >= 3 ? "0 0 12px rgba(34, 197, 94, 0.12)" : "none",
              }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 8 }}
              transition={{ delay: 0.1 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#86efac", fontWeight: 700 }}>
                <span>&gt; MASTER SECURITY KEY</span>
                <span style={{ color: "#4ade80" }}>ENTROPY: ████████ STRONG</span>
              </div>
              <div style={{ color: "#4ade80", fontSize: "12px" }}>
                &gt; {phase >= 3 ? "••••••••••••" : "cipher_init..."}
              </div>
            </motion.div>

            {/* Compile Button Assembly (Phase 4) */}
            <motion.div
              style={{
                marginTop: 4,
                padding: "12px",
                borderRadius: "4px",
                border: phase >= 4 ? "1px solid #22c55e" : "1px dashed rgba(34, 197, 94, 0.2)",
                background: phase >= 4 ? "rgba(34, 197, 94, 0.15)" : "transparent",
                color: phase >= 4 ? "#4ade80" : "#64748b",
                fontSize: "12px",
                fontWeight: 800,
                textAlign: "center",
                letterSpacing: "0.08em",
                boxShadow: phase >= 4 ? "0 0 15px rgba(34, 197, 94, 0.25)" : "none",
              }}
              animate={phase >= 4 ? { scale: [0.98, 1], opacity: 1 } : { opacity: 0.3 }}
            >
              COMPILE &amp; ENTER WORKSPACE →
            </motion.div>
          </div>

          {/* Status Line */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "11px",
              color: "#86efac",
              borderTop: "1px solid rgba(34, 197, 94, 0.2)",
              paddingTop: "10px",
            }}
          >
            <span>STATUS: {phase >= 4 ? "READY FOR INPUT" : "BOOTSTRAPPING MAIN..."}</span>
            <span style={{ color: "#4ade80" }}>[ {progress}% READY ]</span>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* The Flying CyberBot / Terminal Drone                              */}
        {/* ================================================================= */}
        <motion.div
          style={{
            position: "absolute",
            zIndex: 70,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          initial={{ x: 260, y: -220, scale: 0.6, rotate: -20 }}
          animate={
            phase === 0
              ? { x: 260, y: -220, scale: 0.6, rotate: -20 }
              : phase === 1
              ? { x: 0, y: -150, scale: 0.95, rotate: 0 }
              : phase === 2
              ? { x: -40, y: -165, scale: 0.9, rotate: 6 }
              : phase === 3
              ? { x: 70, y: -40, scale: 0.85, rotate: -5 }
              : phase === 4
              ? { x: -70, y: -40, scale: 0.88, rotate: 0 }
              : { x: 0, y: -150, scale: 1, rotate: [0, -5, 5, 0] }
          }
          transition={{
            type: "spring",
            stiffness: 130,
            damping: 14,
          }}
        >
          {/* CRT Speech Bubble */}
          <motion.div
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              background: "#0d130d",
              border: "1.5px solid #22c55e",
              boxShadow: "0 0 18px rgba(34, 197, 94, 0.4)",
              color: "#86efac",
              fontSize: "10.5px",
              fontWeight: 700,
              maxWidth: 240,
              textAlign: "center",
              marginBottom: 8,
              position: "relative",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={dialogue}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {dialogue}
            <div
              style={{
                position: "absolute",
                bottom: -7,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "7px solid #22c55e",
              }}
            />
          </motion.div>

          {/* Cyber Drone Figure */}
          <div style={{ position: "relative", width: 120, height: 130, display: "flex", justifyContent: "center" }}>
            {/* Green Sprout Antenna */}
            <motion.div
              style={{ position: "absolute", top: -16, display: "flex", gap: 2, zIndex: 10 }}
              animate={{ rotate: [-6, 6, -6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                style={{
                  width: 9,
                  height: 15,
                  borderRadius: "50% 50% 10% 50%",
                  background: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                  transform: "rotate(-30deg)",
                }}
              />
              <div
                style={{
                  width: 9,
                  height: 15,
                  borderRadius: "50% 50% 50% 10%",
                  background: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                  transform: "rotate(30deg)",
                }}
              />
            </motion.div>

            {/* Helmet Sphere */}
            <motion.div
              style={{
                width: 88,
                height: 72,
                borderRadius: "32px 32px 26px 26px",
                background: "radial-gradient(circle at 35% 30%, #ffffff 0%, #cbd5e1 60%, #94a3b8 100%)",
                border: "2px solid #22c55e",
                boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 8,
              }}
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Visor Screen with Glowing Phosphor Eyes */}
              <div
                style={{
                  width: 66,
                  height: 44,
                  borderRadius: "18px",
                  background: "#051105",
                  border: "1.5px solid #22c55e",
                  boxShadow: "inset 0 0 10px rgba(34,197,94,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <motion.div
                  style={{
                    width: 8,
                    height: 16,
                    borderRadius: "8px",
                    background: "#22c55e",
                    boxShadow: "0 0 10px #22c55e",
                  }}
                  animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                />
                <motion.div
                  style={{
                    width: 8,
                    height: 16,
                    borderRadius: "8px",
                    background: "#22c55e",
                    boxShadow: "0 0 10px #22c55e",
                  }}
                  animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Jet Exhaust Flames */}
            <motion.div
              style={{
                position: "absolute",
                bottom: 12,
                width: 24,
                height: 20,
                background: "radial-gradient(ellipse at top, #22c55e 0%, #15803d 60%, transparent 100%)",
                borderRadius: "50%",
                filter: "blur(2px)",
                zIndex: 4,
              }}
              animate={{ scaleY: [1, 1.7, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 0.25, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Diagnostic Console & Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          maxWidth: "630px",
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 40,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "rgba(13, 19, 13, 0.85)",
            border: "1px solid rgba(34, 197, 94, 0.25)",
            borderRadius: "4px",
            padding: "6px 12px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            color: "#86efac",
          }}
        >
          <Terminal size={13} color="#22c55e" />
          <span>{logs[logs.length - 1]}</span>
        </div>

        <div
          style={{
            height: 4,
            width: "100%",
            borderRadius: 2,
            background: "rgba(34, 197, 94, 0.15)",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              background: "#22c55e",
              boxShadow: "0 0 10px #22c55e",
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
