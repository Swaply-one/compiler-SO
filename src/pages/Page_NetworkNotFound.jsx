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
  WifiOff,
  Wifi,
  Globe,
  Server,
  Activity,
  Check,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import "../styles/LoginPage.css";

// Web Audio Synthesizer for Network Dial-Up Handshake & Radar SFX
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

  playKeypress() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(850 + Math.random() * 300, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {}
  }

  playDialUpProbe() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Dual tone multi-frequency (DTMF) dial tone chirp
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = "sine";
      osc2.type = "sawtooth";

      osc1.frequency.setValueAtTime(1209, now);
      osc1.frequency.exponentialRampToValueAtTime(697, now + 0.22);

      osc2.frequency.setValueAtTime(1336, now);
      osc2.frequency.exponentialRampToValueAtTime(770, now + 0.22);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.22);
      osc2.stop(now + 0.22);
    } catch {}
  }

  playOfflineAlarm() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [
        { freq: 440, start: 0.0, dur: 0.15 },
        { freq: 330, start: 0.16, dur: 0.15 },
        { freq: 220, start: 0.32, dur: 0.4 },
      ];

      notes.forEach((n) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(n.freq, now + n.start);
        gain.gain.setValueAtTime(0.09, now + n.start);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.start + n.dur);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + n.start);
        osc.stop(now + n.start + n.dur);
      });
    } catch {}
  }

  playHandshakeSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const frequencies = [587.33, 739.99, 880.0, 1174.66];
      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        const startTime = this.ctx.currentTime + idx * 0.07;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.06, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {}
  }
}

const networkAudio = new NetworkAudioEngine();

/**
 * CyberBot Disconnected Mascot with Broken Wi-Fi Signals & Unplugged Cable
 */
function NetworkOfflineCyberBot({ onPoke, isProbing, isOnline }) {
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
    }, 3600);
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
      title="Click to Poke / Broadcast Network Handshake Ping!"
    >
      {/* Speech HUD Dialogue */}
      <motion.div
        key={isOnline ? "online" : isProbing ? "probing" : "offline"}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          marginBottom: "8px",
          padding: "4px 14px",
          borderRadius: "20px",
          background: isOnline
            ? "linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(16, 185, 129, 0.35))"
            : isProbing
            ? "rgba(56, 189, 248, 0.2)"
            : "rgba(18, 26, 18, 0.9)",
          border: isOnline ? "1px solid #22c55e" : isProbing ? "1px solid #38bdf8" : "1px solid #ef4444",
          boxShadow: isOnline
            ? "0 0 18px rgba(34, 197, 94, 0.35)"
            : isProbing
            ? "0 0 18px rgba(56, 189, 248, 0.35)"
            : "0 0 15px rgba(239, 68, 68, 0.3)",
          color: isOnline ? "#86efac" : isProbing ? "#bae6fd" : "#fca5a5",
          fontSize: "11px",
          fontWeight: 700,
          fontFamily: "'JetBrains Mono', monospace",
          textAlign: "center",
        }}
      >
        {isOnline
          ? "⚡ HANDSHAKE RE-ESTABLISHED! COMPILER MESH 100% ONLINE! 🚀"
          : isProbing
          ? "📡 BROADCASTING DHCP & SOCKET PROBES... SEARCHING GATEWAY!"
          : "📶 NETWORK OFFLINE! PACKET LOSS 100% — CHECK WI-FI / ROUTER!"}
      </motion.div>

      {/* Floating Robot Figure */}
      <motion.div
        key={bounceKey}
        animate={{
          y: bounceKey > 0 ? [-22, 0] : [0, -8, 0],
          rotate: bounceKey > 0 ? [-10, 10, 0] : [-2, 2, -2],
        }}
        transition={{
          y: bounceKey > 0 ? { duration: 0.35, ease: "easeOut" } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
          rotate: bounceKey > 0 ? { duration: 0.4 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.05 }}
        style={{
          position: "relative",
          width: 115,
          height: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Disconnected Wi-Fi Wave Rings above Head */}
        <motion.div
          style={{
            position: "absolute",
            top: -24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 25,
          }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          {isOnline ? (
            <Wifi size={22} color="#22c55e" style={{ filter: "drop-shadow(0 0 8px #22c55e)" }} />
          ) : (
            <WifiOff size={22} color="#ef4444" style={{ filter: "drop-shadow(0 0 8px #ef4444)" }} />
          )}
        </motion.div>

        {/* Head Box */}
        <div
          style={{
            position: "relative",
            width: 84,
            height: 64,
            borderRadius: "14px",
            backgroundColor: "#0d180d",
            border: isOnline ? "2px solid #22c55e" : "2px solid #ef4444",
            boxShadow: isOnline
              ? "0 0 20px rgba(34, 197, 94, 0.4), inset 0 0 12px rgba(34, 197, 94, 0.2)"
              : "0 0 20px rgba(239, 68, 68, 0.4), inset 0 0 12px rgba(239, 68, 68, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `rotate(${headRotate}deg)`,
            zIndex: 10,
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
        >
          {/* Expressive Network Signal Eyes */}
          <div style={{ display: "flex", gap: "18px", marginTop: "2px" }}>
            {/* Left Eye */}
            <div
              style={{
                width: 15,
                height: isBlinking ? 2 : 18,
                borderRadius: isBlinking ? "2px" : "6px",
                backgroundColor: isOnline ? "#4ade80" : "#ef4444",
                boxShadow: isOnline ? "0 0 12px #22c55e" : "0 0 12px #ef4444",
                transform: `translate(${eyeX}px, ${eyeY}px)`,
                transition: "height 0.1s, transform 0.05s ease-out, background-color 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 900,
                color: "#000",
              }}
            >
              {!isBlinking && (isOnline ? "●" : "✕")}
            </div>

            {/* Right Eye */}
            <div
              style={{
                width: 15,
                height: isBlinking ? 2 : 18,
                borderRadius: isBlinking ? "2px" : "6px",
                backgroundColor: isOnline ? "#4ade80" : "#ef4444",
                boxShadow: isOnline ? "0 0 12px #22c55e" : "0 0 12px #ef4444",
                transform: `translate(${eyeX}px, ${eyeY}px)`,
                transition: "height 0.1s, transform 0.05s ease-out, background-color 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 900,
                color: "#000",
              }}
            >
              {!isBlinking && (isOnline ? "●" : "✕")}
            </div>
          </div>

          {/* Wavy Mouth */}
          <div
            style={{
              width: 16,
              height: 3,
              borderRadius: 2,
              backgroundColor: isOnline ? "#4ade80" : "#ef4444",
              boxShadow: isOnline ? "0 0 6px #22c55e" : "0 0 6px #ef4444",
              marginTop: 6,
            }}
          />
        </div>

        {/* Neck */}
        <div style={{ width: 14, height: 6, backgroundColor: isOnline ? "#22c55e" : "#ef4444", boxShadow: isOnline ? "0 0 8px #22c55e" : "0 0 8px #ef4444" }} />

        {/* Body Unit with Unplugged Cable */}
        <div
          style={{
            position: "relative",
            width: 60,
            height: 36,
            borderRadius: "6px",
            backgroundColor: "#070e07",
            border: isOnline ? "1.5px solid rgba(34, 197, 94, 0.4)" : "1.5px solid rgba(239, 68, 68, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isOnline ? "#4ade80" : "#fca5a5",
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "0.5px",
          }}
        >
          {isOnline ? "ONLINE" : "OFFLINE"}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Dedicated Phosphor CRT Network Not Found / Offline Page
 */
export default function Page_NetworkNotFound({ onGoHome, onGoSignUp, onReplayIntro }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtVibe, setCrtVibe] = useState(true);
  const [matrixRain, setMatrixRain] = useState(true);
  const [diagnosticRunning, setDiagnosticRunning] = useState(false);
  const [diagnosticLogs, setDiagnosticLogs] = useState([]);
  const [probeStep, setProbeStep] = useState(0);
  const [isHandshakeDone, setIsHandshakeDone] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    networkAudio.enabled = soundEnabled;
  }, [soundEnabled]);

  // Matrix Digital Rain with Disconnected Network Glyphs
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

    const chars = "ERR_NET_DISCONNECTED#PACKET_LOSS_100%@PING_TIMEOUT{}01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -50));

    let frameCount = 0;
    const render = () => {
      frameCount++;
      if (frameCount % 2 === 0) {
        ctx.fillStyle = "rgba(7, 10, 7, 0.22)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = isHandshakeDone ? "rgba(34, 197, 94, 0.35)" : "rgba(239, 68, 68, 0.32)";
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
  }, [matrixRain, isHandshakeDone]);

  // Handle Robot Poke
  const handlePokeMascot = () => {
    networkAudio.playDialUpProbe();
    confetti({
      particleCount: 30,
      spread: 65,
      origin: { y: 0.45 },
      colors: isHandshakeDone ? ["#22c55e", "#86efac", "#ffffff"] : ["#ef4444", "#f87171", "#fbbf24"],
    });
  };

  // Run Network Reconnect Probe
  const handleRunNetworkProbe = async () => {
    if (diagnosticRunning) return;
    setDiagnosticRunning(true);
    setDiagnosticLogs([]);
    setProbeStep(0);
    setIsHandshakeDone(false);
    networkAudio.playOfflineAlarm();

    const steps = [
      "SOCKET 1/4: Testing Loopback Interface (127.0.0.1)... OK [0.2ms] ✓",
      "SOCKET 2/4: Probing Default Gateway & DHCP Lease (192.168.1.1)... REACHABLE ✓",
      "SOCKET 3/4: Resolving DNS Cluster (1.1.1.1, 8.8.8.8)... SYN/ACK RECEIVED ✓",
      "SOCKET 4/4: Mesh Handshake Established! Swaply Compiler Grid 100% ONLINE! 🚀",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 420));
      setProbeStep(i + 1);
      setDiagnosticLogs((prev) => [...prev, steps[i]]);
      networkAudio.playDialUpProbe();
    }

    setDiagnosticRunning(false);
    setIsHandshakeDone(true);
    networkAudio.playHandshakeSuccess();
    confetti({
      particleCount: 90,
      spread: 85,
      origin: { y: 0.55 },
      colors: ["#22c55e", "#38bdf8", "#86efac", "#fbbf24", "#ffffff"],
    });
  };

  const asciiNetworkError = `
 ███╗   ██╗███████╗████████╗    ███████╗ █████╗ ██╗██╗     
 ████╗  ██║██╔════╝╚══██╔══╝    ██╔════╝██╔══██╗██║██║     
 ██╔██╗ ██║█████╗     ██║       █████╗  ███████║██║██║     
 ██║╚██╗██║██╔══╝     ██║       ██╔══╝  ██╔══██║██║██║     
 ██║ ╚████║███████╗   ██║       ██║     ██║  ██║██║███████╗
 ╚═╝  ╚═══╝╚══════╝   ╚═╝       ╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝
        [ ERR_NETWORK_NOT_FOUND // CONNECTION_TIMEOUT ]`;

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
        color: isHandshakeDone ? "#4ade80" : "#f87171",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Matrix Digital Rain */}
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

      {/* CRT Scanline Filter */}
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

      {/* Phosphor CRT Network Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "660px",
          backgroundColor: "#0d130d",
          border: isHandshakeDone ? "2px solid #22c55e" : "2px solid #ef4444",
          borderRadius: "8px",
          boxShadow: isHandshakeDone
            ? "0 25px 70px rgba(0, 0, 0, 0.9), 0 0 45px rgba(34, 197, 94, 0.4)"
            : "0 25px 70px rgba(0, 0, 0, 0.9), 0 0 45px rgba(239, 68, 68, 0.35)",
          padding: "clamp(20px, 4vw, 32px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px, 2.2vw, 20px)",
          position: "relative",
          zIndex: 10,
          overflow: "hidden",
          boxSizing: "border-box",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: isHandshakeDone
              ? "1px solid rgba(34, 197, 94, 0.3)"
              : "1px solid rgba(239, 68, 68, 0.3)",
            paddingBottom: "12px",
            fontSize: "11px",
            color: isHandshakeDone ? "#86efac" : "#fca5a5",
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
                backgroundColor: isHandshakeDone ? "#22c55e" : "#ef4444",
                boxShadow: isHandshakeDone ? "0 0 10px #22c55e" : "0 0 10px #ef4444",
                flexShrink: 0,
              }}
            />
            <span style={{ fontWeight: 700, letterSpacing: "0.08em" }}>
              SWAPLY-ONE COMPILER // {isHandshakeDone ? "NETWORK LINK ONLINE" : "NETWORK LINK OFFLINE"}
            </span>
          </div>

          {/* Vibe Toggles */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              type="button"
              onClick={() => setMatrixRain(!matrixRain)}
              style={{
                background: matrixRain ? "rgba(239, 68, 68, 0.15)" : "transparent",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "4px",
                padding: "4px 7px",
                color: matrixRain ? "#f87171" : "#6b7280",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              <Zap size={11} color={matrixRain ? "#ef4444" : "#6b7280"} />
              <span>MATRIX</span>
            </button>

            <button
              type="button"
              onClick={() => setCrtVibe(!crtVibe)}
              style={{
                background: crtVibe ? "rgba(239, 68, 68, 0.15)" : "transparent",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "4px",
                padding: "4px 7px",
                color: crtVibe ? "#f87171" : "#6b7280",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              <Tv size={11} color={crtVibe ? "#ef4444" : "#6b7280"} />
              <span>CRT</span>
            </button>

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              style={{
                background: soundEnabled ? "rgba(239, 68, 68, 0.15)" : "transparent",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "4px",
                padding: "4px 7px",
                color: soundEnabled ? "#f87171" : "#6b7280",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {soundEnabled ? <Volume2 size={11} color="#ef4444" /> : <VolumeX size={11} />}
              <span>{soundEnabled ? "SFX" : "MUTE"}</span>
            </button>
          </div>
        </div>

        {/* Mascot Avatar */}
        <NetworkOfflineCyberBot
          onPoke={handlePokeMascot}
          isProbing={diagnosticRunning}
          isOnline={isHandshakeDone}
        />

        {/* ASCII Header Banner */}
        <div style={{ textAlign: "center", overflow: "hidden", width: "100%" }}>
          <pre
            style={{
              margin: "0 auto",
              fontSize: "clamp(5.2px, 1.4vw, 8.5px)",
              lineHeight: "1.2",
              fontWeight: 700,
              color: isHandshakeDone ? "#22c55e" : "#ef4444",
              textShadow: isHandshakeDone
                ? "0 0 14px rgba(34, 197, 94, 0.65)"
                : "0 0 14px rgba(239, 68, 68, 0.65)",
              display: "inline-block",
              userSelect: "none",
              maxWidth: "100%",
              overflowX: "auto",
              transition: "color 0.3s, text-shadow 0.3s",
            }}
          >
            {asciiNetworkError}
          </pre>
          <div style={{ marginTop: "6px", color: isHandshakeDone ? "#86efac" : "#fca5a5", fontSize: "12px", letterSpacing: "0.02em" }}>
            {isHandshakeDone
              ? "All remote compiler nodes and socket streams are operational!"
              : "Unable to establish socket handshake with Swaply Compiler Cluster."}
          </div>
        </div>

        {/* Live Network Latency & Diagnostic Trace */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            border: isHandshakeDone
              ? "1px solid rgba(34, 197, 94, 0.3)"
              : "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "6px",
            padding: "12px 14px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11.5px",
            lineHeight: "1.6",
          }}
        >
          <div style={{ color: isHandshakeDone ? "#4ade80" : "#f87171", fontWeight: 700, marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Activity size={13} />
            <span>SOCKET DIAGNOSTIC TRACE:</span>
          </div>

          <div style={{ color: isHandshakeDone ? "#4ade80" : "#ef4444" }}>
            • [SOCKET_STATUS]: {isHandshakeDone ? "CONNECTED (TCP ESTABLISHED)" : "ERR_INTERNET_DISCONNECTED (0x00000503)"}
          </div>
          <div style={{ color: "#94a3b8" }}>
            • GATEWAY_PING: {isHandshakeDone ? "192.168.1.1 [0.4ms] RTT" : "192.168.1.1 [TIMEOUT 100% LOSS]"}
          </div>
          <div style={{ color: "#94a3b8" }}>
            • REMOTE_CLUSTER: {isHandshakeDone ? "api.swaply.one [AUTHENTICATED]" : "api.swaply.one [DNS_UNRESOLVED]"}
          </div>

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
                networkAudio.playKeypress();
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
              <span>[ 🔑 RETURN TO TERMINAL ]</span>
            </button>

            <button
              type="button"
              onClick={() => {
                networkAudio.playKeypress();
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
              <span>[ ⚡ LOCAL SIGN UP ]</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleRunNetworkProbe}
            disabled={diagnosticRunning}
            style={{
              backgroundColor: isHandshakeDone
                ? "rgba(34, 197, 94, 0.15)"
                : "rgba(239, 68, 68, 0.15)",
              border: isHandshakeDone
                ? "1px solid rgba(34, 197, 94, 0.4)"
                : "1px solid rgba(239, 68, 68, 0.4)",
              borderRadius: "4px",
              padding: "11px 14px",
              color: isHandshakeDone ? "#86efac" : "#fca5a5",
              fontWeight: 800,
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
            <span>
              {diagnosticRunning
                ? `RUNNING SOCKET PROBE (${probeStep}/4)...`
                : isHandshakeDone
                ? "RE-PROBE NETWORK HANDSHAKE 📡"
                : "RUN NETWORK RECONNECT PROBE 📡"}
            </span>
          </button>
        </div>
      </motion.div>
    </main>
  );
}
