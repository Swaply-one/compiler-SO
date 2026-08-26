import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, Eye, EyeOff, AlertCircle, RefreshCw, XCircle, Volume2, VolumeX, AlertTriangle, Sparkles, Tv, Zap, Terminal } from "lucide-react";

// Web Audio Synthesizer with rich audio effects
class TerminalAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
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

      if (isEnter) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
        return;
      }

      if (isBackspace) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.05);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
        return;
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      const baseFreq = 750 + Math.random() * 450;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + 0.035);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);

      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = "square";
      clickOsc.frequency.setValueAtTime(1600 + Math.random() * 600, now);
      clickGain.gain.setValueAtTime(0.03, now);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
      clickOsc.connect(clickGain);
      clickGain.connect(this.ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.015);
    } catch (e) {}
  }

  // Hilarious "Sad Trombone" Sound
  playHilariousSadTrombone() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [
        { freq: 293.66, start: 0.0, dur: 0.22, vol: 0.18 },
        { freq: 277.18, start: 0.24, dur: 0.22, vol: 0.18 },
        { freq: 261.63, start: 0.48, dur: 0.22, vol: 0.18 },
        { freq: 233.08, start: 0.72, dur: 0.75, vol: 0.26 },
      ];

      notes.forEach((n, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";

        const noteStart = now + n.start;
        const noteEnd = noteStart + n.dur;

        if (idx === 3) {
          osc.frequency.setValueAtTime(n.freq, noteStart);
          osc.frequency.exponentialRampToValueAtTime(175, noteEnd - 0.05);

          const lfo = this.ctx.createOscillator();
          const lfoGain = this.ctx.createGain();
          lfo.frequency.setValueAtTime(7, noteStart);
          lfoGain.gain.setValueAtTime(14, noteStart);
          lfo.connect(osc.frequency);
          lfo.start(noteStart);
          lfo.stop(noteEnd);
        } else {
          osc.frequency.setValueAtTime(n.freq, noteStart);
          osc.frequency.exponentialRampToValueAtTime(n.freq * 0.94, noteEnd);
        }

        gain.gain.setValueAtTime(n.vol, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);

        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 700;
        filter.Q.value = 3.5;

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteStart);
        osc.stop(noteEnd);
      });
    } catch (e) {}
  }

  playCompileSeek() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.07);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1600;
      filter.Q.value = 4.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {}
  }

  playEasterEggFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        const start = this.ctx.currentTime + idx * 0.06;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.25);
      });
    } catch (e) {}
  }

  playErrorAlarm() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(140, now + 0.12);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "sawtooth";
      const start2 = now + 0.14;
      osc2.frequency.setValueAtTime(170, start2);
      osc2.frequency.exponentialRampToValueAtTime(90, start2 + 0.18);
      gain2.gain.setValueAtTime(0.18, start2);
      gain2.gain.exponentialRampToValueAtTime(0.0001, start2 + 0.18);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(start2);
      osc2.stop(start2 + 0.18);

      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(80, now);
      subGain.gain.setValueAtTime(0.15, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.32);
    } catch (e) {}
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
    } catch (e) {}
  }
}

const terminalAudio = new TerminalAudioEngine();

export default function Page_RetroCRTTerminal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtVibe, setCrtVibe] = useState(true);
  const [matrixRain, setMatrixRain] = useState(true);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileStep, setCompileStep] = useState(0);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  const [shakeKey, setShakeKey] = useState(0);

  const canvasRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    terminalAudio.enabled = soundEnabled;
  }, [soundEnabled]);

  // Subtle Matrix Rain Effect Canvas (Gentle & Slow Pace)
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

    const chars = "0123456789ABCDEF$#@<>{}[]=/*~";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -50));

    let frameCount = 0;

    const render = () => {
      frameCount++;
      // Only advance rain drops every 3 frames for a gentle, hypnotic slow rain vibe
      if (frameCount % 3 === 0) {
        ctx.fillStyle = "rgba(7, 10, 7, 0.22)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(34, 197, 94, 0.35)";
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars.charAt(Math.floor(Math.random() * chars.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
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

  const handleInputKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      terminalAudio.playKeypress(true, false);
    } else if (e.key === "Enter") {
      terminalAudio.playKeypress(false, true);
    } else if (e.key.length === 1) {
      terminalAudio.playKeypress(false, false);
    }
  };

  const checkForEasterEgg = (val) => {
    const lower = val.toLowerCase().trim();
    if (lower === "matrix" || lower === "hack" || lower === "swaply" || lower === "vibe" || lower === "party") {
      setEasterEggActive(true);
      terminalAudio.playEasterEggFanfare();
      setTimeout(() => setEasterEggActive(false), 4000);
    }
  };

  const asciiBanner = `
 ███████╗██╗    ██╗ █████╗ ██████╗ ██╗  ██╗   ██████╗ ███╗   ██╗███████╗
 ██╔════╝██║    ██║██╔══██╗██╔══██╗██║  ██║  ██╔═══██╗████╗  ██║██╔════╝
 ███████╗██║ █╗ ██║███████║██████╔╝███████║  ██║   ██║██╔██╗ ██║█████╗  
 ╚════██║██║███╗██║██╔══██║██╔═══╝ ╚════██║  ██║   ██║██║╚██╗██║██╔══╝  
 ███████║╚███╔███╔╝██║  ██║██║          ██║  ╚██████╔╝██║ ╚████║███████╗
 ╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝          ╚═╝   ╚═════╝ ╚═╝  ╚═══╝╚══════╝
                    [ SWAPLY ONE COMPILER v1.0.0 ]`;

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (isCompiling) return;

    if (!email.trim() && !password.trim()) {
      setShakeKey((prev) => prev + 1);
      terminalAudio.playHilariousSadTrombone();
      emailInputRef.current?.focus();
      setErrorDetails({
        title: "NULL_POINTER_EXCEPTION: COMPILING THE VOID 🎺",
        code: "ERR_404_GHOST_CREDENTIALS",
        targetField: "BOTH",
        reasons: [
          "Bro... you are trying to compile pure air and imagination.",
          "Neural Telepathy Link not detected. Please type something in the inputs!",
          "Tip: Click '[ AUTO-FILL DEMO ACCOUNT ]' if you are too lazy to type 😉",
        ],
      });
      return;
    }

    if (!email.trim()) {
      setShakeKey((prev) => prev + 1);
      terminalAudio.playHilariousSadTrombone();
      emailInputRef.current?.focus();
      setErrorDetails({
        title: "IDENTITY_MISSING: WHO ARE YOU? 🤔",
        code: "ERR_0x00_EMPTY_EMAIL",
        targetField: "EMAIL",
        reasons: [
          "Developer email field is completely blank.",
          "Compiler cannot authenticate an anonymous phantom developer.",
          "👉 Please type your email in the highlighted box above!",
        ],
      });
      return;
    }

    if (!password.trim()) {
      setShakeKey((prev) => prev + 1);
      terminalAudio.playHilariousSadTrombone();
      passwordInputRef.current?.focus();
      setErrorDetails({
        title: "SECURITY_KEY_MISSING: UNLOCKED DOOR 🚪",
        code: "ERR_0x00_EMPTY_PASSWORD",
        targetField: "PASSWORD",
        reasons: [
          "Master key field is empty. We cannot let you in with zero security.",
          "👉 Please enter your security key in the highlighted box above!",
        ],
      });
      return;
    }

    setErrorDetails(null);
    setAuthSuccess(false);
    setIsCompiling(true);
    terminalAudio.playCompileSeek();

    // Step 1: Lexing & Parsing
    setCompileStep(1);
    await new Promise((r) => setTimeout(r, 260));

    if (!validateEmail(email.trim())) {
      setIsCompiling(false);
      setCompileStep(0);
      setShakeKey((prev) => prev + 1);
      terminalAudio.playErrorAlarm();
      emailInputRef.current?.focus();
      setErrorDetails({
        title: "SYNTAX_ERROR: INVALID_IDENTITY_FORMAT",
        code: "ERR_0x01_BAD_EMAIL",
        targetField: "EMAIL",
        reasons: [
          `Input '${email}' failed RFC-5322 syntax validation.`,
          "Expected format: [username]@[domain].[extension] (e.g. developer@swaply.io).",
        ],
      });
      return;
    }

    // Step 2: SSA IR & Hash Computation
    setCompileStep(2);
    terminalAudio.playCompileSeek();
    await new Promise((r) => setTimeout(r, 260));

    if (password.length < 6) {
      setIsCompiling(false);
      setCompileStep(0);
      setShakeKey((prev) => prev + 1);
      terminalAudio.playErrorAlarm();
      passwordInputRef.current?.focus();
      setErrorDetails({
        title: "CIPHER_ERROR: KEY_ENTROPY_INSUFFICIENT",
        code: "ERR_0x02_SHORT_KEY",
        targetField: "PASSWORD",
        reasons: [
          `Password length of ${password.length} characters is below the 6-character minimum.`,
          "Requires at least 6 characters to generate valid cryptographic hash.",
        ],
      });
      return;
    }

    // Step 3: LLVM Target Linking & Database Verification
    setCompileStep(3);
    terminalAudio.playCompileSeek();
    await new Promise((r) => setTimeout(r, 280));

    const isValidCredential =
      email.includes("@swaply.io") ||
      password.includes("llvm") ||
      password.includes("compiler") ||
      password.includes("2026") ||
      password.length >= 8;

    if (!isValidCredential) {
      setIsCompiling(false);
      setCompileStep(0);
      setShakeKey((prev) => prev + 1);
      terminalAudio.playErrorAlarm();
      setErrorDetails({
        title: "AUTH_REJECTED: UNRECOGNIZED_CREDENTIALS",
        code: "ERR_0x03_VAULT_MISMATCH",
        targetField: "BOTH",
        reasons: [
          `Developer identity '${email}' not found in compiler registry.`,
          "Click '[ AUTO-FILL DEMO ACCOUNT ]' to load certified developer credentials.",
        ],
      });
      return;
    }

    // Step 4: Build Success
    setCompileStep(4);
    await new Promise((r) => setTimeout(r, 200));

    setIsCompiling(false);
    setAuthSuccess(true);
    terminalAudio.playSuccessChime();
  };

  const handleReset = () => {
    setAuthSuccess(false);
    setIsCompiling(false);
    setCompileStep(0);
    setPassword("");
    setErrorDetails(null);
    terminalAudio.playKeypress();
  };

  const getProgressBar = (step) => {
    const pcts = [0, 30, 65, 90, 100];
    const pct = pcts[step] || 0;
    const totalBars = 16;
    const filled = Math.round((pct / 100) * totalBars);
    const empty = totalBars - filled;
    return `[${"█".repeat(filled)}${"░".repeat(empty)}] ${pct}%`;
  };

  const isEmailError =
    errorDetails && (errorDetails.targetField === "EMAIL" || errorDetails.targetField === "BOTH");
  const isPasswordError =
    errorDetails && (errorDetails.targetField === "PASSWORD" || errorDetails.targetField === "BOTH");

  // Real-time password entropy gauge
  const getPasswordStrength = () => {
    if (!password) return { label: "EMPTY", bars: "░░░░░░░░", color: "#6b7280" };
    if (password.length < 6) return { label: "WEAK", bars: "██░░░░░░", color: "#ef4444" };
    if (password.length < 10) return { label: "DECENT", bars: "█████░░░", color: "#facc15" };
    return { label: "STRONG (256-BIT)", bars: "████████", color: "#22c55e" };
  };

  const entropy = getPasswordStrength();

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
        color: "#4ade80",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Matrix Digital Rain Canvas */}
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

      {/* CRT Scanline Overlay Effect */}
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

      {/* Easter Egg Overlay Notification */}
      <AnimatePresence>
        {easterEggActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: "fixed",
              top: "20px",
              zIndex: 100,
              backgroundColor: "#22c55e",
              color: "#051105",
              padding: "10px 20px",
              borderRadius: "6px",
              fontWeight: 800,
              fontSize: "13px",
              boxShadow: "0 0 30px rgba(34, 197, 94, 0.8)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Sparkles size={16} />
            <span>🎉 CYBERPUNK EASTER EGG UNLOCKED: MAXIMUM HACKER VIBE ACTIVATED! 🎉</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Precision-Engineered ASCII Terminal Card */}
      <motion.div
        key={shakeKey}
        initial={{ opacity: 0, y: 16 }}
        animate={
          shakeKey > 0
            ? { x: [-12, 12, -8, 8, -4, 4, 0], opacity: 1, y: 0 }
            : { opacity: 1, y: 0 }
        }
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "630px",
          backgroundColor: "#0d130d",
          border: errorDetails ? "2px solid #ef4444" : "1.5px solid #22c55e",
          borderRadius: "8px",
          boxShadow: errorDetails
            ? "0 25px 70px rgba(0, 0, 0, 0.9), 0 0 45px rgba(239, 68, 68, 0.5)"
            : "0 25px 70px rgba(0, 0, 0, 0.9), 0 0 35px -5px rgba(34, 197, 94, 0.3)",
          padding: "clamp(20px, 4vw, 32px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(18px, 3vw, 24px)",
          position: "relative",
          zIndex: 10,
          overflow: "hidden",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header Bar with Vibe Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(34, 197, 94, 0.25)",
            paddingBottom: "12px",
            fontSize: "11px",
            color: errorDetails ? "#f87171" : "#86efac",
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
                backgroundColor: errorDetails ? "#ef4444" : "#22c55e",
                boxShadow: errorDetails ? "0 0 12px #ef4444" : "0 0 10px #22c55e",
                flexShrink: 0,
              }}
            />
            <span style={{ fontWeight: 700, letterSpacing: "0.08em" }}>
              SWAPLY-ONE COMPILER TERMINAL
            </span>
          </div>

          {/* Vibe Toggles: SFX, CRT scanlines, Matrix Rain */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              type="button"
              title="Toggle Matrix Digital Rain"
              onClick={() => setMatrixRain(!matrixRain)}
              style={{
                background: matrixRain ? "rgba(34, 197, 94, 0.15)" : "transparent",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                borderRadius: "4px",
                padding: "4px 7px",
                color: matrixRain ? "#4ade80" : "#6b7280",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              <Zap size={11} color={matrixRain ? "#22c55e" : "#6b7280"} />
              <span>MATRIX</span>
            </button>

            <button
              type="button"
              title="Toggle CRT Scanlines"
              onClick={() => setCrtVibe(!crtVibe)}
              style={{
                background: crtVibe ? "rgba(34, 197, 94, 0.15)" : "transparent",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                borderRadius: "4px",
                padding: "4px 7px",
                color: crtVibe ? "#4ade80" : "#6b7280",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              <Tv size={11} color={crtVibe ? "#22c55e" : "#6b7280"} />
              <span>CRT</span>
            </button>

            <button
              type="button"
              title="Toggle Sound Effects"
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) terminalAudio.playKeypress();
              }}
              style={{
                background: soundEnabled ? "rgba(34, 197, 94, 0.15)" : "transparent",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                borderRadius: "4px",
                padding: "4px 7px",
                color: soundEnabled ? "#4ade80" : "#6b7280",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {soundEnabled ? <Volume2 size={11} color="#22c55e" /> : <VolumeX size={11} />}
              <span>{soundEnabled ? "SFX" : "MUTE"}</span>
            </button>
          </div>
        </div>

        {/* ASCII Header Banner with Live Reactor Core */}
        <div style={{ textAlign: "center", overflow: "hidden", width: "100%" }}>
          <pre
            style={{
              margin: "0 auto",
              fontSize: "clamp(5.2px, 1.4vw, 8.5px)",
              lineHeight: "1.2",
              fontWeight: 700,
              color: errorDetails ? "#ef4444" : "#22c55e",
              textShadow: errorDetails
                ? "0 0 14px rgba(239, 68, 68, 0.65)"
                : "0 0 14px rgba(34, 197, 94, 0.65)",
              display: "inline-block",
              userSelect: "none",
              transition: "color 0.25s ease",
              maxWidth: "100%",
              overflowX: "auto",
            }}
          >
            {asciiBanner}
          </pre>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", margin: "10px 0 0" }}>
            <span style={{ color: "#86efac", fontSize: "clamp(11.5px, 2.8vw, 13px)", letterSpacing: "0.02em" }}>
              Sign in to initialize your compiler environment.
            </span>
          </div>
        </div>

        {/* Dynamic State: Success View OR Login Form */}
        <AnimatePresence mode="wait">
          {authSuccess ? (
            /* Success Card View */
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.08)",
                border: "1.5px solid #22c55e",
                borderRadius: "6px",
                padding: "clamp(16px, 3.5vw, 24px)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                boxShadow: "0 0 25px rgba(34, 197, 94, 0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#4ade80", fontSize: "clamp(13px, 3.2vw, 14.5px)", fontWeight: 700, flexWrap: "wrap" }}>
                <Check size={18} strokeWidth={2.5} color="#22c55e" />
                <span>AUTHENTICATION GRANTED // ACCESS AUTHORIZED</span>
              </div>

              <div style={{ fontSize: "12px", lineHeight: "1.7", color: "#dcfce7", wordBreak: "break-all" }}>
                <div>• DEVELOPER_USER: <strong style={{ color: "#4ade80" }}>{email}</strong></div>
                <div>• SESSION_TOKEN: <strong style={{ color: "#4ade80" }}>0x9AF4_2048_AUTH_ACTIVE</strong></div>
                <div>• BUILD_STATUS: <strong style={{ color: "#4ade80" }}>0 ERRORS, 0 WARNINGS</strong></div>
              </div>

              <div style={{ marginTop: "4px" }}>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    backgroundColor: "#22c55e",
                    color: "#051105",
                    border: 0,
                    borderRadius: "4px",
                    padding: "10px 18px",
                    fontWeight: 700,
                    fontFamily: "inherit",
                    fontSize: "12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 0 15px rgba(34, 197, 94, 0.4)",
                  }}
                >
                  <RefreshCw size={13} />
                  <span>[ RESET / SIGN IN AGAIN ]</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Main Form */
            <motion.form
              key="form-view"
              onSubmit={handleLogin}
              style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}
            >
              {/* Quick Fill Header Pill */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px", fontSize: "11px" }}>
                <span style={{ color: "#86efac", letterSpacing: "0.05em", fontWeight: 600 }}>AUTHENTICATION PROMPT:</span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail("developer@swaply.io");
                    setPassword("llvm_compiler_2026");
                    setErrorDetails(null);
                    terminalAudio.playKeypress();
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(34, 197, 94, 0.4)",
                    borderRadius: "3px",
                    color: "#4ade80",
                    padding: "3px 8px",
                    fontSize: "10.5px",
                    cursor: "pointer",
                  }}
                >
                  [ AUTO-FILL DEMO ACCOUNT ]
                </button>
              </div>

              {/* Email Input Field with Spotlight */}
              <div
                style={{
                  backgroundColor: isEmailError ? "rgba(239, 68, 68, 0.08)" : "#070c07",
                  border: isEmailError
                    ? "2px solid #ef4444"
                    : isEmailFocused
                    ? "1.5px solid #22c55e"
                    : "1.5px solid rgba(34, 197, 94, 0.4)",
                  borderRadius: "4px",
                  padding: "10px 12px",
                  boxShadow: isEmailError
                    ? "0 0 20px rgba(239, 68, 68, 0.35)"
                    : isEmailFocused
                    ? "0 0 14px rgba(34, 197, 94, 0.25)"
                    : "none",
                  transition: "all 0.18s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  cursor: "text",
                  boxSizing: "border-box",
                }}
                onClick={() => emailInputRef.current?.focus()}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label
                    htmlFor="terminal-email"
                    style={{
                      fontSize: "10.5px",
                      color: isEmailError ? "#f87171" : isEmailFocused ? "#22c55e" : "#86efac",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                    }}
                  >
                    &gt; DEVELOPER EMAIL
                  </label>
                  {isEmailError && (
                    <span style={{ color: "#ef4444", fontSize: "10.5px", fontWeight: 700 }}>
                      [ ⚠️ EMAIL REQUIRED ]
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: isEmailError ? "#ef4444" : "#22c55e", marginRight: "8px", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>
                    ❯
                  </span>
                  <input
                    ref={emailInputRef}
                    id="terminal-email"
                    type="text"
                    autoComplete="email"
                    disabled={isCompiling}
                    value={email}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    onKeyDown={handleInputKeyDown}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorDetails(null);
                      checkForEasterEgg(e.target.value);
                    }}
                    placeholder="developer@swaply.io (try typing 'matrix')"
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: 0,
                      outline: 0,
                      color: "#f0fdf4",
                      fontFamily: "inherit",
                      fontSize: "15px",
                      padding: 0,
                      minHeight: "22px",
                    }}
                  />
                </div>
              </div>

              {/* Password Input Field with Live Entropy Meter */}
              <div
                style={{
                  backgroundColor: isPasswordError ? "rgba(239, 68, 68, 0.08)" : "#070c07",
                  border: isPasswordError
                    ? "2px solid #ef4444"
                    : isPasswordFocused
                    ? "1.5px solid #22c55e"
                    : "1.5px solid rgba(34, 197, 94, 0.4)",
                  borderRadius: "4px",
                  padding: "10px 12px",
                  boxShadow: isPasswordError
                    ? "0 0 20px rgba(239, 68, 68, 0.35)"
                    : isPasswordFocused
                    ? "0 0 14px rgba(34, 197, 94, 0.25)"
                    : "none",
                  transition: "all 0.18s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  cursor: "text",
                  boxSizing: "border-box",
                }}
                onClick={() => passwordInputRef.current?.focus()}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label
                    htmlFor="terminal-password"
                    style={{
                      fontSize: "10.5px",
                      color: isPasswordError ? "#f87171" : isPasswordFocused ? "#22c55e" : "#86efac",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                    }}
                  >
                    &gt; MASTER SECURITY KEY
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {isPasswordError ? (
                      <span style={{ color: "#ef4444", fontSize: "10.5px", fontWeight: 700 }}>
                        [ ⚠️ KEY REQUIRED ]
                      </span>
                    ) : (
                      <span style={{ color: entropy.color, fontSize: "10px", fontWeight: 700 }}>
                        ENTROPY: {entropy.bars} {entropy.label}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPassword(!showPassword);
                        terminalAudio.playKeypress();
                      }}
                      style={{
                        background: "transparent",
                        border: 0,
                        color: "#4ade80",
                        fontSize: "10px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: 0,
                      }}
                    >
                      {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                      <span>{showPassword ? "[ HIDE ]" : "[ SHOW ]"}</span>
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: isPasswordError ? "#ef4444" : "#22c55e", marginRight: "8px", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>
                    ❯
                  </span>
                  <input
                    ref={passwordInputRef}
                    id="terminal-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    disabled={isCompiling}
                    value={password}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    onKeyDown={handleInputKeyDown}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorDetails(null);
                      checkForEasterEgg(e.target.value);
                    }}
                    placeholder="Enter your security key"
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: 0,
                      outline: 0,
                      color: "#f0fdf4",
                      fontFamily: "inherit",
                      fontSize: "15px",
                      letterSpacing: showPassword ? "normal" : "0.2em",
                      padding: 0,
                      minHeight: "22px",
                    }}
                  />
                </div>
              </div>

              {/* Diagnostic Error Box */}
              <AnimatePresence>
                {errorDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4 }}
                    style={{
                      backgroundColor: "rgba(220, 38, 38, 0.15)",
                      border: "2px solid #ef4444",
                      borderRadius: "6px",
                      padding: "14px 16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      boxShadow: "0 0 30px rgba(239, 68, 68, 0.35)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#fecaca", fontWeight: 800, fontSize: "12.5px", flexWrap: "wrap" }}>
                      <AlertTriangle size={17} color="#ef4444" strokeWidth={2.5} />
                      <span style={{ color: "#f87171", textShadow: "0 0 10px rgba(239, 68, 68, 0.6)" }}>
                        {errorDetails.title}
                      </span>
                      <span style={{ fontSize: "11px", backgroundColor: "#ef4444", color: "#000", padding: "1px 6px", borderRadius: "3px", fontWeight: 700 }}>
                        {errorDetails.code}
                      </span>
                    </div>

                    <div style={{ fontSize: "12px", lineHeight: "1.6", color: "#fee2e2", backgroundColor: "rgba(0, 0, 0, 0.3)", padding: "8px 10px", borderRadius: "4px", borderLeft: "3px solid #ef4444" }}>
                      {errorDetails.reasons.map((r, i) => (
                        <div key={i} style={{ marginBottom: i < errorDetails.reasons.length - 1 ? "4px" : 0 }}>
                          • {r}
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEmail("developer@swaply.io");
                          setPassword("llvm_compiler_2026");
                          setErrorDetails(null);
                          terminalAudio.playKeypress();
                        }}
                        style={{
                          background: "#ef4444",
                          color: "#070c07",
                          border: 0,
                          borderRadius: "3px",
                          padding: "5px 10px",
                          fontSize: "11px",
                          fontWeight: 800,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <Sparkles size={12} />
                        <span>[ FIX WITH 1-CLICK AUTO-FILL ]</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Button */}
              <motion.button
                type="submit"
                disabled={isCompiling}
                whileHover={!isCompiling ? { scale: 1.01 } : {}}
                whileTap={!isCompiling ? { scale: 0.99 } : {}}
                style={{
                  minHeight: "48px",
                  marginTop: "2px",
                  backgroundColor: !email || !password ? "rgba(34, 197, 94, 0.2)" : "#22c55e",
                  color: !email || !password ? "#86efac" : "#051105",
                  border: "1px solid #22c55e",
                  borderRadius: "4px",
                  fontWeight: 800,
                  fontFamily: "inherit",
                  fontSize: "12.5px",
                  letterSpacing: "0.06em",
                  cursor: isCompiling ? "not-allowed" : "pointer",
                  boxShadow: email && password && !isCompiling ? "0 0 20px rgba(34, 197, 94, 0.4)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                  padding: "0 16px",
                  boxSizing: "border-box",
                }}
              >
                {isCompiling ? (
                  <span>COMPILING &amp; AUTHENTICATING...</span>
                ) : (
                  <>
                    <span>COMPILE &amp; ENTER WORKSPACE</span>
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Bottom Status & Progress Indicator */}
        <div
          style={{
            borderTop: "1px solid rgba(34, 197, 94, 0.25)",
            paddingTop: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "11px",
            color: errorDetails ? "#f87171" : "#86efac",
            flexWrap: "wrap",
            gap: "6px",
          }}
        >
          <span>
            STATUS:{" "}
            <strong
              style={{
                color: errorDetails
                  ? "#ef4444"
                  : authSuccess
                  ? "#4ade80"
                  : isCompiling
                  ? "#facc15"
                  : "#86efac",
              }}
            >
              {errorDetails
                ? `COMPILATION FAILED (${errorDetails.code})`
                : authSuccess
                ? "BUILD SUCCESSFUL (SESSION CREATED)"
                : isCompiling
                ? compileStep === 1
                  ? "LEXING & PARSING"
                  : compileStep === 2
                  ? "ARGON2id CRYPTO PASS"
                  : "LINKING RUNTIME"
                : "READY FOR INPUT"}
            </strong>
          </span>
          <span style={{ color: errorDetails ? "#ef4444" : "#4ade80", fontWeight: 700 }}>
            {errorDetails
              ? "[ FAILED ]"
              : isCompiling
              ? getProgressBar(compileStep)
              : "[ 100% READY ]"}
          </span>
        </div>
      </motion.div>
    </main>
  );
}
