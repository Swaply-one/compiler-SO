import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Terminal,
  RefreshCw,
  Zap,
  Sparkles,
  Cpu,
  AlertTriangle,
  Radio,
  Volume2,
  VolumeX,
  Tv,
  KeyRound,
  UserPlus,
  ArrowRight,
  ShieldAlert,
  RotateCcw,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import "../styles/LoginPage.css";

// Web Audio Synthesizer matching the Phosphor CRT Terminal audio engine
class Terminal404AudioEngine {
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

  playKeypress(isBackspace = false, isEnter = false) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = isEnter ? "sine" : "triangle";
      const baseFreq = isEnter ? 1200 : 750 + Math.random() * 450;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + 0.05);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  playRadarPing() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1500, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.35);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {}
  }

  playSadTrombone() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [
        { freq: 293.66, start: 0.0, dur: 0.2 },
        { freq: 277.18, start: 0.22, dur: 0.2 },
        { freq: 261.63, start: 0.44, dur: 0.2 },
        { freq: 233.08, start: 0.66, dur: 0.65 },
      ];

      notes.forEach((n, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        const noteStart = now + n.start;
        const noteEnd = noteStart + n.dur;
        osc.frequency.setValueAtTime(n.freq, noteStart);
        if (idx === 3) {
          osc.frequency.exponentialRampToValueAtTime(175, noteEnd - 0.05);
        }
        gain.gain.setValueAtTime(0.12, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(noteStart);
        osc.stop(noteEnd);
      });
    } catch {}
  }

  playSuccessChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const frequencies = [523.25, 659.25, 783.99, 1046.5];
      frequencies.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "square";
        const startTime = this.ctx.currentTime + index * 0.08;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.06, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch {}
  }
}

const terminal404Audio = new Terminal404AudioEngine();

/**
 * Phosphor CRT 404 CyberBot Companion with Popped Springs & Search Beam
 */
function CRT404CyberBotCompanion({ onPoke, isProbing }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);

  useEffect(() => {
    const handlePointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = (clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 140);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const handleMascotClick = () => {
    setBounceKey((prev) => prev + 1);
    if (onPoke) onPoke();
  };

  const eyeX = Math.max(-8, Math.min(8, mousePos.x * 12));
  const eyeY = Math.max(-5, Math.min(5, mousePos.y * 8));
  const headRotate = Math.max(-8, Math.min(8, mousePos.x * 10));

  return (
    <div
      onClick={handleMascotClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        userSelect: "none",
        cursor: "pointer",
        zIndex: 30,
        margin: "8px 0 14px",
      }}
      title="Click to Poke / Ping Lost CyberBot!"
    >
      {/* HUD Speech Dialogue */}
      <motion.div
        key={isProbing ? "probing" : "lost"}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          marginBottom: "8px",
          padding: "4px 12px",
          borderRadius: "20px",
          background: "rgba(18, 26, 18, 0.9)",
          border: "1px solid #facc15",
          boxShadow: "0 0 15px rgba(250, 204, 21, 0.25)",
          color: "#fef08a",
          fontSize: "11px",
          fontWeight: 700,
          fontFamily: "'JetBrains Mono', monospace",
          textAlign: "center",
        }}
      >
        {isProbing
          ? "🔍 RUNNING LLVM RECOVERY PROBE... SEARCHING COMPILER GRAPH!"
          : "💥 *SPROINGGG!* 😵 MEMORY ADDRESS 0x404 UNRESOLVED! CLICK ME TO PING!"}
      </motion.div>

      {/* Main Mascot Avatar */}
      <motion.div
        key={bounceKey}
        animate={{
          y: bounceKey > 0 ? [-20, 0] : [0, -8, 0],
          rotate: bounceKey > 0 ? [-12, 12, 0] : [-2, 2, -2],
        }}
        transition={{
          y: bounceKey > 0 ? { duration: 0.35, ease: "easeOut" } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
          rotate: bounceKey > 0 ? { duration: 0.4 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.05 }}
        style={{
          position: "relative",
          width: 110,
          height: 115,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Popped Springs from Head */}
        <div style={{ position: "absolute", top: -8, left: 10, zIndex: 25, filter: "drop-shadow(0 0 6px #facc15)" }}>
          <svg width="20" height="38" viewBox="0 0 24 50" fill="none">
            <path
              d="M12 45 C4 42, 4 38, 12 36 C20 34, 20 30, 12 28 C4 26, 4 22, 12 20 C20 18, 20 14, 12 12 C4 10, 4 6, 12 4 L12 0"
              stroke="#facc15"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="4" r="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
          </svg>
        </div>

        <div style={{ position: "absolute", top: -8, right: 10, zIndex: 25, filter: "drop-shadow(0 0 6px #facc15)", transform: "scaleX(-1)" }}>
          <svg width="20" height="38" viewBox="0 0 24 50" fill="none">
            <path
              d="M12 45 C4 42, 4 38, 12 36 C20 34, 20 30, 12 28 C4 26, 4 22, 12 20 C20 18, 20 14, 12 12 C4 10, 4 6, 12 4 L12 0"
              stroke="#facc15"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="4" r="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Head Box */}
        <div
          style={{
            position: "relative",
            width: 82,
            height: 64,
            borderRadius: "14px",
            backgroundColor: "#0d180d",
            border: "2px solid #facc15",
            boxShadow: "0 0 20px rgba(250, 204, 21, 0.4), inset 0 0 12px rgba(250, 204, 21, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `rotate(${headRotate}deg)`,
            zIndex: 10,
          }}
        >
          {/* Confused / Questioning Eyes */}
          <div style={{ display: "flex", gap: "18px", marginTop: "2px" }}>
            {/* Left Eye */}
            <div
              style={{
                width: 14,
                height: isBlinking ? 2 : 18,
                borderRadius: isBlinking ? "2px" : "6px",
                backgroundColor: "#facc15",
                boxShadow: "0 0 12px #facc15",
                transform: `translate(${eyeX}px, ${eyeY}px)`,
                transition: "height 0.1s, transform 0.05s ease-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 900,
                color: "#000",
              }}
            >
              {!isBlinking && "?"}
            </div>

            {/* Right Eye */}
            <div
              style={{
                width: 14,
                height: isBlinking ? 2 : 18,
                borderRadius: isBlinking ? "2px" : "6px",
                backgroundColor: "#facc15",
                boxShadow: "0 0 12px #facc15",
                transform: `translate(${eyeX}px, ${eyeY}px)`,
                transition: "height 0.1s, transform 0.05s ease-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 900,
                color: "#000",
              }}
            >
              {!isBlinking && "?"}
            </div>
          </div>

          {/* Wavy mouth */}
          <div
            style={{
              width: 16,
              height: 3,
              borderRadius: 2,
              backgroundColor: "#facc15",
              boxShadow: "0 0 6px #facc15",
              marginTop: 6,
            }}
          />
        </div>

        {/* Neck & Body */}
        <div
          style={{
            width: 14,
            height: 6,
            backgroundColor: "#22c55e",
            boxShadow: "0 0 8px #22c55e",
          }}
        />

        <div
          style={{
            width: 58,
            height: 34,
            borderRadius: "6px",
            backgroundColor: "#070e07",
            border: "1.5px solid rgba(250, 204, 21, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#facc15",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "1px",
            boxShadow: "0 0 12px rgba(250, 204, 21, 0.15)",
          }}
        >
          404
        </div>
      </motion.div>
    </div>
  );
}

export default function Page_404NotFound({ onGoHome, onGoSignUp, onReplayIntro }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtVibe, setCrtVibe] = useState(true);
  const [matrixRain, setMatrixRain] = useState(true);
  const [diagnosticRunning, setDiagnosticRunning] = useState(false);
  const [diagnosticLogs, setDiagnosticLogs] = useState([]);
  const [probeStep, setProbeStep] = useState(0);

  const canvasRef = useRef(null);

  useEffect(() => {
    terminal404Audio.enabled = soundEnabled;
  }, [soundEnabled]);

  // Matrix Digital Rain with custom 404 glyphs
  useEffect(() => {
    if (!matrixRain) return;
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

    const chars = "404$NULL_PTR#PAGE_NOT_FOUND@SEGFAULT{}[]=/*~01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -50));

    let frameCount = 0;
    const render = () => {
      frameCount++;
      if (frameCount % 2 === 0) {
        ctx.fillStyle = "rgba(7, 10, 7, 0.22)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(250, 204, 21, 0.35)";
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
  }, [matrixRain]);

  // Handle Robot Poke
  const handlePokeMascot = () => {
    terminal404Audio.playRadarPing();
    confetti({
      particleCount: 30,
      spread: 65,
      origin: { y: 0.45 },
      colors: ["#facc15", "#eab308", "#22c55e", "#ffffff"],
    });
  };

  // Run Route Recovery Probe
  const handleRunProbe = async () => {
    if (diagnosticRunning) return;
    setDiagnosticRunning(true);
    setDiagnosticLogs([]);
    setProbeStep(0);
    terminal404Audio.playSadTrombone();

    const steps = [
      "PROBE 1/4: Scanning Virtual Memory Address 0x00000404...",
      "PROBE 2/4: Dereferencing Symbol Table & AST Routing Nodes...",
      "PROBE 3/4: Route missing in registry. Generating Safe Fallback Mesh...",
      "PROBE 4/4: Recovery Gateway Established! /sign_in and /sign_up Verified ✓",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 380));
      setProbeStep(i + 1);
      setDiagnosticLogs((prev) => [...prev, steps[i]]);
      terminal404Audio.playKeypress(false, true);
    }

    setDiagnosticRunning(false);
    terminal404Audio.playSuccessChime();
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.55 },
      colors: ["#22c55e", "#facc15", "#38bdf8", "#ffffff"],
    });
  };

  const asciiBanner404 = `
 ██╗  ██╗ ██████╗ ██╗  ██╗    ███████╗██████╗ ██████╗  ██████╗ ██████╗ 
 ██║  ██║██╔═████╗██║  ██║    ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
 ███████║██║██╔██║███████║    █████╗  ██████╔╝██████╔╝██║   ██║██████╔╝
 ╚════██║████╔╝██║╚════██║    ██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗
      ██║╚██████╔╝     ██║    ███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║
      ╚═╝ ╚═════╝      ╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
             [ 404: COMPILER_TARGET_NOT_FOUND // MEMORY_FAULT ]`;

  return (
    <main
      className="terminal-page-wrapper"
      style={{
        minHeight: "100vh",
        backgroundColor: "#070a07",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 12px",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        color: "#facc15",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Matrix Digital Rain */}
      {matrixRain && (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.6,
            zIndex: 1,
          }}
        />
      )}

      {/* CRT Scanline Overlay */}
      {crtVibe && (
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
      )}

      {/* Precision-Engineered Phosphor CRT 404 Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "660px",
          backgroundColor: "#0d130d",
          border: "2px solid #facc15",
          borderRadius: "8px",
          boxShadow: "0 25px 70px rgba(0, 0, 0, 0.9), 0 0 45px rgba(250, 204, 21, 0.35)",
          padding: "clamp(20px, 4vw, 32px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2.2vw, 20px)",
          position: "relative",
          zIndex: 10,
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(250, 204, 21, 0.3)",
            paddingBottom: "12px",
            fontSize: "11px",
            color: "#fef08a",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#facc15",
                boxShadow: "0 0 10px #facc15",
                flexShrink: 0,
              }}
            />
            <span style={{ fontWeight: 700, letterSpacing: "0.08em" }}>
              SWAPLY-ONE COMPILER // 404 MEMORY FAULT
            </span>
          </div>

          {/* Vibe Toggles */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              type="button"
              onClick={() => setMatrixRain(!matrixRain)}
              style={{
                background: matrixRain ? "rgba(250, 204, 21, 0.15)" : "transparent",
                border: "1px solid rgba(250, 204, 21, 0.3)",
                borderRadius: "4px",
                padding: "4px 7px",
                color: matrixRain ? "#facc15" : "#6b7280",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              <Zap size={11} color={matrixRain ? "#facc15" : "#6b7280"} />
              <span>MATRIX</span>
            </button>

            <button
              type="button"
              onClick={() => setCrtVibe(!crtVibe)}
              style={{
                background: crtVibe ? "rgba(250, 204, 21, 0.15)" : "transparent",
                border: "1px solid rgba(250, 204, 21, 0.3)",
                borderRadius: "4px",
                padding: "4px 7px",
                color: crtVibe ? "#facc15" : "#6b7280",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              <Tv size={11} color={crtVibe ? "#facc15" : "#6b7280"} />
              <span>CRT</span>
            </button>

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              style={{
                background: soundEnabled ? "rgba(250, 204, 21, 0.15)" : "transparent",
                border: "1px solid rgba(250, 204, 21, 0.3)",
                borderRadius: "4px",
                padding: "4px 7px",
                color: soundEnabled ? "#facc15" : "#ef4444",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {soundEnabled ? <Volume2 size={11} color="#facc15" /> : <VolumeX size={11} />}
              <span>{soundEnabled ? "SFX" : "MUTE"}</span>
            </button>
          </div>
        </div>

        {/* Mascot Avatar */}
        <CRT404CyberBotCompanion onPoke={handlePokeMascot} isProbing={diagnosticRunning} />

        {/* ASCII Header Banner */}
        <div style={{ textAlign: "center", overflow: "hidden", width: "100%" }}>
          <pre
            style={{
              margin: "0 auto",
              fontSize: "clamp(5.2px, 1.4vw, 8.5px)",
              lineHeight: "1.2",
              fontWeight: 700,
              color: "#facc15",
              textShadow: "0 0 14px rgba(250, 204, 21, 0.65)",
              display: "inline-block",
              userSelect: "none",
              maxWidth: "100%",
              overflowX: "auto",
            }}
          >
            {asciiBanner404}
          </pre>
          <div style={{ marginTop: "6px", color: "#fef08a", fontSize: "12px", letterSpacing: "0.02em" }}>
            The requested compiler AST symbol was garbage-collected or moved to another universe.
          </div>
        </div>

        {/* Diagnostics & Stack Trace Panel */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            border: "1px solid rgba(250, 204, 21, 0.3)",
            borderRadius: "6px",
            padding: "12px 14px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11.5px",
            lineHeight: "1.6",
          }}
        >
          <div style={{ color: "#facc15", fontWeight: 700, marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Terminal size={13} />
            <span>LLVM MEMORY DIAGNOSTIC TRACE:</span>
          </div>
          <div style={{ color: "#ef4444" }}>• [SIGSEGV] Unresolved memory target at virtual pointer 0x404</div>
          <div style={{ color: "#94a3b8" }}>• lookupSymbolTable(target_route) -&gt; NULL (0x00000000)</div>
          <div style={{ color: "#4ade80" }}>• Safe execution entry points verified: [ /sign_in, /sign_up ]</div>

          {diagnosticLogs.length > 0 && (
            <div style={{ marginTop: 8, borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 6 }}>
              {diagnosticLogs.map((log, idx) => (
                <div key={idx} style={{ color: "#86efac" }}>&gt; {log}</div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <button
              type="button"
              onClick={() => {
                terminal404Audio.playKeypress(false, true);
                if (onGoHome) onGoHome();
              }}
              style={{
                backgroundColor: "#22c55e",
                color: "#051105",
                border: 0,
                borderRadius: "4px",
                padding: "12px 14px",
                fontWeight: 800,
                fontFamily: "inherit",
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                boxShadow: "0 0 16px rgba(34, 197, 94, 0.4)",
              }}
            >
              <KeyRound size={14} strokeWidth={2.5} />
              <span>[ 🔑 RETURN TO SIGN IN ]</span>
            </button>

            <button
              type="button"
              onClick={() => {
                terminal404Audio.playKeypress(false, true);
                if (onGoSignUp) onGoSignUp();
              }}
              style={{
                backgroundColor: "transparent",
                color: "#4ade80",
                border: "1.5px solid #22c55e",
                borderRadius: "4px",
                padding: "12px 14px",
                fontWeight: 800,
                fontFamily: "inherit",
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <UserPlus size={14} strokeWidth={2.5} />
              <span>[ ⚡ CREATE ACCOUNT ]</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleRunProbe}
            disabled={diagnosticRunning}
            style={{
              backgroundColor: "rgba(250, 204, 21, 0.12)",
              border: "1px solid rgba(250, 204, 21, 0.4)",
              borderRadius: "4px",
              padding: "10px 14px",
              color: "#fef08a",
              fontWeight: 700,
              fontFamily: "inherit",
              fontSize: "11.5px",
              cursor: diagnosticRunning ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <RefreshCw size={13} className={diagnosticRunning ? "animate-spin" : ""} />
            <span>{diagnosticRunning ? `RUNNING RECOVERY PROBE (${probeStep}/4)...` : "RUN ROUTE RECOVERY PROBE 🔍"}</span>
          </button>
        </div>
      </motion.div>
    </main>
  );
}
