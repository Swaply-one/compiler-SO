import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, Eye, EyeOff, AlertCircle, RefreshCw, XCircle, Volume2, VolumeX, AlertTriangle, Sparkles, Tv, Zap, Terminal } from "lucide-react";
import TerminalCyberBotCompanion from "../components/mascots/TerminalCyberBotCompanion";
import MatrixHelloBossTransition from "../components/MatrixHelloBossTransition";
import AsciiEyesVideoPlayer from "../components/AsciiEyesVideoPlayer";
import CompilerWorkspace from "../components/compiler/CompilerWorkspace";

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

export default function Page_RetroCRTTerminal({ onReplayIntro }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtVibe, setCrtVibe] = useState(true);
  const [matrixRain, setMatrixRain] = useState(true);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [isRobotKicking, setIsRobotKicking] = useState(false);
  const [isNewUserRegistration, setIsNewUserRegistration] = useState(false);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileStep, setCompileStep] = useState(0);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [showHelloBossTransition, setShowHelloBossTransition] = useState(false);
  const [showAsciiEyesVideo, setShowAsciiEyesVideo] = useState(false);
  const [inWorkspace, setInWorkspace] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  const [shakeKey, setShakeKey] = useState(0);

  const canvasRef = useRef(null);
  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

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
 ███████╗██╗    ██╗ █████╗ ██████╗ ██╗     ██╗   ██╗   ██████╗ ███╗   ██╗███████╗
 ██╔════╝██║    ██║██╔══██╗██╔══██╗██║     ╚██╗ ██╔╝  ██╔═══██╗████╗  ██║██╔════╝
 ███████╗██║ █╗ ██║███████║██████╔╝██║      ╚████╔╝   ██║   ██║██╔██╗ ██║█████╗  
 ╚════██║██║███╗██║██╔══██║██╔═══╝ ██║       ╚██╔╝    ██║   ██║██║╚██╗██║██╔══╝  
 ███████║╚███╔███╔╝██║  ██║██║     ███████╗   ██║     ╚██████╔╝██║ ╚████║███████╗
 ╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝     ╚══════╝   ╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝
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
        title: "WRONG PASSWORD: KEY_ENTROPY_INSUFFICIENT",
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
      password === "swaply123" ||
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
        title: "WRONG PASSWORD: AUTH_REJECTED",
        code: "ERR_0x03_VAULT_MISMATCH",
        targetField: "PASSWORD",
        reasons: [
          `WRONG PASSWORD: Incorrect passkey provided for user '${email}'.`,
          "Click '[ AUTO-FILL DEMO ACCOUNT ]' to load valid credentials (Password: 'swaply123').",
        ],
      });
      return;
    }

    // Step 4: Build Success
    setCompileStep(4);
    await new Promise((r) => setTimeout(r, 200));

    setIsCompiling(false);
    setAuthSuccess(true);
    setShowAsciiEyesVideo(true);
    terminalAudio.playSuccessChime();
  };

  const handleSignUp = async (e) => {
    if (e) e.preventDefault();
    if (isCompiling) return;
    setErrorDetails(null);

    if (!username.trim() || username.length < 3) {
      setShakeKey((k) => k + 1);
      terminalAudio.playErrorAlarm();
      setErrorDetails({
        title: "WRONG HANDLE: INVALID_SYNTAX",
        code: "ERR_0x04_BAD_HANDLE",
        targetField: "BOTH",
        reasons: ["Developer handle must contain at least 3 characters."],
      });
      return;
    }

    if (!validateEmail(email)) {
      setShakeKey((k) => k + 1);
      terminalAudio.playErrorAlarm();
      setErrorDetails({
        title: "WRONG EMAIL: INVALID_SYNTAX",
        code: "ERR_0x01_BAD_EMAIL",
        targetField: "EMAIL",
        reasons: ["Workspace email must follow standard RFC-5322 format."],
      });
      return;
    }

    if (!password || password.length < 6) {
      setShakeKey((k) => k + 1);
      terminalAudio.playErrorAlarm();
      setErrorDetails({
        title: "SECURITY REJECTED: LOW ENTROPY",
        code: "ERR_0x02_LOW_ENTROPY",
        targetField: "PASSWORD",
        reasons: ["Master security key must be at least 6 characters."],
      });
      return;
    }

    if (password !== confirmPassword) {
      setShakeKey((k) => k + 1);
      terminalAudio.playErrorAlarm();
      setErrorDetails({
        title: "WRONG PASSKEY: MISMATCH DETECTED",
        code: "ERR_0x05_PASSKEY_MISMATCH",
        targetField: "PASSWORD",
        reasons: ["Master security key and confirmation passkey do not match."],
      });
      return;
    }

    // Account creation compiler simulation
    setIsCompiling(true);
    setCompileStep(1);
    terminalAudio.playKeypress();
    await new Promise((r) => setTimeout(r, 250));

    setCompileStep(2);
    await new Promise((r) => setTimeout(r, 300));

    setCompileStep(3);
    await new Promise((r) => setTimeout(r, 250));

    setCompileStep(4);
    setIsCompiling(false);
    setIsNewUserRegistration(true);
    setAuthSuccess(true);
    setShowAsciiEyesVideo(true);
    terminalAudio.playSuccessChime();
  };

  const toggleMode = (targetSignUp) => {
    setIsRobotKicking(true);
    terminalAudio.playKeypress();
    setErrorDetails(null);
    setTimeout(() => {
      setIsSignUp(targetSignUp);
      setTimeout(() => setIsRobotKicking(false), 380);
    }, 200);
  };

  const handleReset = () => {
    setAuthSuccess(false);
    setIsCompiling(false);
    setCompileStep(0);
    setPassword("");
    setConfirmPassword("");
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

  if (inWorkspace) {
    return (
      <CompilerWorkspace
        userEmail={email || "developer@swaply.io"}
        onSignOut={() => {
          setInWorkspace(false);
          setAuthSuccess(false);
          setPassword("");
          setConfirmPassword("");
          setCompileStep(0);
          setErrorDetails(null);
        }}
      />
    );
  }

  return (
    <main
      className="terminal-page-wrapper"
      style={{
        height: "100dvh",
        maxHeight: "100dvh",
        backgroundColor: "#070a07",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(4px, 1vh, 12px) clamp(8px, 2vw, 16px)",
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

      {/* Cinematic ASCII Eyes Video Player Overlay */}
      <AnimatePresence>
        {showAsciiEyesVideo && (
          <AsciiEyesVideoPlayer
            userEmail={email || "developer@swaply.io"}
            fps={6}
            onComplete={() => {
              setShowAsciiEyesVideo(false);
              setInWorkspace(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Fullscreen Matrix "HELLO BOSS" Cyber Transition Overlay */}
      <AnimatePresence>
        {showHelloBossTransition && (
          <MatrixHelloBossTransition
            userEmail={email || "developer@swaply.io"}
            isNewUser={isNewUserRegistration}
            onComplete={() => {
              setShowHelloBossTransition(false);
              setInWorkspace(true);
            }}
          />
        )}
      </AnimatePresence>

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
              padding: "8px 16px",
              borderRadius: "6px",
              fontWeight: 800,
              fontSize: "12px",
              boxShadow: "0 0 30px rgba(34, 197, 94, 0.8)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Sparkles size={15} />
            <span>🎉 CYBERPUNK EASTER EGG UNLOCKED: MAXIMUM HACKER VIBE ACTIVATED! 🎉</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Centered Main Layout with Live CyberBot Companion (Never Disappears!) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "600px",
          position: "relative",
          zIndex: 10,
          gap: "clamp(2px, 0.6vh, 6px)",
          padding: 0,
          maxHeight: "100%",
        }}
      >
        {/* The Live CyberBot Companion */}
        <TerminalCyberBotCompanion
          isPasswordFocused={isPasswordFocused || isConfirmPasswordFocused}
          isEmailFocused={isEmailFocused || isUsernameFocused}
          isCompiling={isCompiling}
          errorDetails={errorDetails}
          authSuccess={authSuccess}
          isRobotKicking={isRobotKicking}
          userEmail={email}
        />

        {/* Precision-Engineered ASCII Terminal Card */}
        <motion.div
          key={shakeKey}
          initial={{ opacity: 0, y: 12 }}
          animate={
            shakeKey > 0
              ? { x: [-10, 10, -6, 6, -3, 3, 0], opacity: 1, y: 0 }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "#0d130d",
            border: errorDetails ? "2px solid #ef4444" : "1.5px solid #22c55e",
            borderRadius: "8px",
            boxShadow: errorDetails
              ? "0 20px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(239, 68, 68, 0.5)"
              : "0 20px 60px rgba(0, 0, 0, 0.9), 0 0 25px -5px rgba(34, 197, 94, 0.3)",
            padding: "clamp(10px, 1.4vh, 18px) clamp(12px, 3vw, 22px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(6px, 1.1vh, 12px)",
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

            <button
              type="button"
              title="Play ASCII Eyes Awakening Video"
              onClick={() => setShowAsciiEyesVideo(true)}
              style={{
                background: "rgba(34, 197, 94, 0.2)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                borderRadius: "4px",
                padding: "4px 8px",
                color: "#86efac",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                cursor: "pointer",
                fontWeight: 700,
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.2)",
              }}
            >
              <Eye size={11} color="#22c55e" />
              <span>ASCII EYES</span>
            </button>

            {onReplayIntro && (
              <button
                type="button"
                title="Replay Robot Setup Animation"
                onClick={onReplayIntro}
                style={{
                  background: "rgba(34, 197, 94, 0.2)",
                  border: "1px solid rgba(34, 197, 94, 0.4)",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  color: "#86efac",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "10px",
                  cursor: "pointer",
                  fontWeight: 700,
                  boxShadow: "0 0 10px rgba(34, 197, 94, 0.2)",
                }}
              >
                <span>🤖 ROBOT BOOT</span>
              </button>
            )}
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

        {/* Dynamic State: Success View OR Login/SignUp Form */}
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
                padding: "clamp(12px, 2.5vw, 18px)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                boxShadow: "0 0 25px rgba(34, 197, 94, 0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#4ade80", fontSize: "clamp(12.5px, 2.8vw, 14px)", fontWeight: 700, flexWrap: "wrap" }}>
                <Check size={18} strokeWidth={2.5} color="#22c55e" />
                <span>{isNewUserRegistration ? "ACCOUNT CREATED // DEVELOPER REGISTERED" : "AUTHENTICATION GRANTED // ACCESS AUTHORIZED"}</span>
              </div>

              <div style={{ fontSize: "11.5px", lineHeight: "1.6", color: "#dcfce7", wordBreak: "break-all" }}>
                {isNewUserRegistration && <div>• DEVELOPER_HANDLE: <strong style={{ color: "#4ade80" }}>{username || "@swaply_dev"}</strong></div>}
                <div>• DEVELOPER_EMAIL: <strong style={{ color: "#4ade80" }}>{email}</strong></div>
                <div>• SESSION_TOKEN: <strong style={{ color: "#4ade80" }}>0x9AF4_2048_AUTH_ACTIVE</strong></div>
                <div>• VAULT_STATUS: <strong style={{ color: "#4ade80" }}>ENCRYPTED (ARGON2id)</strong></div>
              </div>

              <div style={{ marginTop: "4px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => setInWorkspace(true)}
                  style={{
                    backgroundColor: "#22c55e",
                    color: "#051105",
                    border: 0,
                    borderRadius: "4px",
                    padding: "8px 16px",
                    fontWeight: 800,
                    fontFamily: "inherit",
                    fontSize: "11.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 0 15px rgba(34, 197, 94, 0.4)",
                  }}
                >
                  <Sparkles size={13} />
                  <span>[ 🚀 ENTER COMPILER WORKSPACE ]</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAsciiEyesVideo(true)}
                  style={{
                    backgroundColor: "rgba(34, 197, 94, 0.15)",
                    color: "#4ade80",
                    border: "1px solid rgba(34, 197, 94, 0.4)",
                    borderRadius: "4px",
                    padding: "8px 14px",
                    fontWeight: 700,
                    fontFamily: "inherit",
                    fontSize: "11.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Eye size={12} />
                  <span>[ 👁️ REPLAY ASCII EYES ]</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    backgroundColor: "transparent",
                    color: "#86efac",
                    border: "1px solid rgba(34, 197, 94, 0.4)",
                    borderRadius: "4px",
                    padding: "8px 14px",
                    fontWeight: 700,
                    fontFamily: "inherit",
                    fontSize: "11.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <RefreshCw size={12} />
                  <span>[ RESET / SIGN IN AGAIN ]</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Main Form (Sign In OR Sign Up with Robot Kick-Out Transition) */
            <motion.form
              key={isSignUp ? "signup-form" : "signin-form"}
              initial={{ x: isSignUp ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isSignUp ? -300 : 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onSubmit={isSignUp ? handleSignUp : handleLogin}
              style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1.3vh, 14px)", width: "100%" }}
            >
              {/* Quick Fill Header Pill */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px", fontSize: "10.5px" }}>
                <span style={{ color: "#86efac", letterSpacing: "0.05em", fontWeight: 700 }}>
                  {isSignUp ? "REGISTER NEW DEVELOPER:" : "AUTHENTICATION PROMPT:"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (isSignUp) {
                      setUsername("cyber_developer");
                      setEmail("developer@swaply.io");
                      setPassword("swaply123");
                      setConfirmPassword("swaply123");
                    } else {
                      setEmail("developer@swaply.io");
                      setPassword("swaply123");
                    }
                    setErrorDetails(null);
                    terminalAudio.playKeypress();
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(34, 197, 94, 0.4)",
                    borderRadius: "3px",
                    color: "#4ade80",
                    padding: "2px 7px",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                >
                  {isSignUp ? "[ AUTO-FILL DEMO SIGN-UP ]" : "[ AUTO-FILL DEMO ACCOUNT ]"}
                </button>
              </div>

              {/* Developer Handle / Username (Only for Sign Up) */}
              {isSignUp && (
                <div
                  style={{
                    backgroundColor: "#070c07",
                    border: isUsernameFocused ? "1.5px solid #22c55e" : "1.5px solid rgba(34, 197, 94, 0.4)",
                    borderRadius: "4px",
                    padding: "8px 10px",
                    boxShadow: isUsernameFocused ? "0 0 14px rgba(34, 197, 94, 0.25)" : "none",
                    transition: "all 0.18s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    cursor: "text",
                    boxSizing: "border-box",
                  }}
                  onClick={() => usernameInputRef.current?.focus()}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "4px" }}>
                    <label
                      htmlFor="terminal-username"
                      style={{
                        fontSize: "10px",
                        color: isUsernameFocused ? "#22c55e" : "#86efac",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      &gt; DEVELOPER HANDLE (USERNAME)
                    </label>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ color: "#22c55e", marginRight: "8px", fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>
                      ❯
                    </span>
                    <input
                      ref={usernameInputRef}
                      id="terminal-username"
                      type="text"
                      autoComplete="username"
                      disabled={isCompiling}
                      value={username}
                      onFocus={() => setIsUsernameFocused(true)}
                      onBlur={() => setIsUsernameFocused(false)}
                      onKeyDown={handleInputKeyDown}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        setErrorDetails(null);
                      }}
                      placeholder="e.g. cyber_developer"
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: 0,
                        outline: 0,
                        color: "#f0fdf4",
                        fontFamily: "inherit",
                        fontSize: "13.5px",
                        padding: 0,
                        minHeight: "20px",
                      }}
                    />
                  </div>
                </div>
              )}

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
                  padding: "8px 10px",
                  boxShadow: isEmailError
                    ? "0 0 20px rgba(239, 68, 68, 0.35)"
                    : isEmailFocused
                    ? "0 0 14px rgba(34, 197, 94, 0.25)"
                    : "none",
                  transition: "all 0.18s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  cursor: "text",
                  boxSizing: "border-box",
                }}
                onClick={() => emailInputRef.current?.focus()}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "4px" }}>
                  <label
                    htmlFor="terminal-email"
                    style={{
                      fontSize: "10px",
                      color: isEmailError ? "#f87171" : isEmailFocused ? "#22c55e" : "#86efac",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    &gt; {isSignUp ? "WORKSPACE EMAIL" : "DEVELOPER EMAIL"}
                  </label>
                  {isEmailError && (
                    <span style={{ color: "#ef4444", fontSize: "9.5px", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>
                      [ ⚠️ EMAIL REQUIRED ]
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: isEmailError ? "#ef4444" : "#22c55e", marginRight: "8px", fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>
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
                      fontSize: "13.5px",
                      padding: 0,
                      minHeight: "20px",
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
                  padding: "8px 10px",
                  boxShadow: isPasswordError
                    ? "0 0 20px rgba(239, 68, 68, 0.35)"
                    : isPasswordFocused
                    ? "0 0 14px rgba(34, 197, 94, 0.25)"
                    : "none",
                  transition: "all 0.18s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  cursor: "text",
                  boxSizing: "border-box",
                }}
                onClick={() => passwordInputRef.current?.focus()}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "4px" }}>
                  <label
                    htmlFor="terminal-password"
                    style={{
                      fontSize: "10px",
                      color: isPasswordError ? "#f87171" : isPasswordFocused ? "#22c55e" : "#86efac",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    &gt; MASTER SECURITY KEY
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                    {isPasswordError ? (
                      <span style={{ color: "#ef4444", fontSize: "9.5px", fontWeight: 700, whiteSpace: "nowrap" }}>
                        [ ⚠️ KEY REQUIRED ]
                      </span>
                    ) : (
                      <span style={{ color: entropy.color, fontSize: "9px", fontWeight: 700, whiteSpace: "nowrap" }}>
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
                        fontSize: "9.5px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                        padding: "0 2px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {showPassword ? <EyeOff size={11} /> : <Eye size={11} />}
                      <span>{showPassword ? "[ HIDE ]" : "[ SHOW ]"}</span>
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: isPasswordError ? "#ef4444" : "#22c55e", marginRight: "8px", fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>
                    ❯
                  </span>
                  <input
                    ref={passwordInputRef}
                    id="terminal-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isSignUp ? "new-password" : "current-password"}
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
                      fontSize: "13.5px",
                      letterSpacing: showPassword ? "normal" : "0.2em",
                      padding: 0,
                      minHeight: "20px",
                    }}
                  />
                </div>
              </div>

              {/* Confirm Passkey (Only for Sign Up) */}
              {isSignUp && (
                <div
                  style={{
                    backgroundColor: "#070c07",
                    border: isConfirmPasswordFocused ? "1.5px solid #22c55e" : "1.5px solid rgba(34, 197, 94, 0.4)",
                    borderRadius: "4px",
                    padding: "8px 10px",
                    boxShadow: isConfirmPasswordFocused ? "0 0 14px rgba(34, 197, 94, 0.25)" : "none",
                    transition: "all 0.18s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    cursor: "text",
                    boxSizing: "border-box",
                  }}
                  onClick={() => confirmPasswordInputRef.current?.focus()}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "4px" }}>
                    <label
                      htmlFor="terminal-confirm-password"
                      style={{
                        fontSize: "10px",
                        color: isConfirmPasswordFocused ? "#22c55e" : "#86efac",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      &gt; CONFIRM SECURITY PASSKEY
                    </label>
                    {confirmPassword && password && (
                      <span style={{ color: password === confirmPassword ? "#22c55e" : "#ef4444", fontSize: "9px", fontWeight: 700 }}>
                        {password === confirmPassword ? "[ MATCHED ✓ ]" : "[ MISMATCH ✕ ]"}
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ color: "#22c55e", marginRight: "8px", fontWeight: 700, fontSize: "13px", flexShrink: 0 }}>
                      ❯
                    </span>
                    <input
                      ref={confirmPasswordInputRef}
                      id="terminal-confirm-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      disabled={isCompiling}
                      value={confirmPassword}
                      onFocus={() => setIsConfirmPasswordFocused(true)}
                      onBlur={() => setIsConfirmPasswordFocused(false)}
                      onKeyDown={handleInputKeyDown}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrorDetails(null);
                      }}
                      placeholder="Re-enter security key to confirm"
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: 0,
                        outline: 0,
                        color: "#f0fdf4",
                        fontFamily: "inherit",
                        fontSize: "13.5px",
                        letterSpacing: showPassword ? "normal" : "0.2em",
                        padding: 0,
                        minHeight: "20px",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Diagnostic Error Box */}
              <AnimatePresence>
                {errorDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4 }}
                    style={{
                      backgroundColor: "rgba(220, 38, 38, 0.15)",
                      border: "1.5px solid #ef4444",
                      borderRadius: "4px",
                      padding: "8px 10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px", flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#fca5a5", fontWeight: 800, fontSize: "clamp(10px, 2.2vw, 11.5px)" }}>
                        <AlertTriangle size={13} color="#ef4444" strokeWidth={2.5} />
                        <span>{errorDetails.title}</span>
                        <span style={{ fontSize: "9px", backgroundColor: "#ef4444", color: "#000", padding: "1px 4px", borderRadius: "2px", fontWeight: 700 }}>
                          {errorDetails.code}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (isSignUp) {
                            setUsername("cyber_developer");
                            setEmail("developer@swaply.io");
                            setPassword("swaply123");
                            setConfirmPassword("swaply123");
                          } else {
                            setEmail("developer@swaply.io");
                            setPassword("swaply123");
                          }
                          setErrorDetails(null);
                          terminalAudio.playKeypress();
                        }}
                        style={{
                          background: "#ef4444",
                          color: "#070c07",
                          border: 0,
                          borderRadius: "3px",
                          padding: "3px 7px",
                          fontSize: "9.5px",
                          fontWeight: 800,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Sparkles size={10} />
                        <span>[ FIX: AUTO-FILL ]</span>
                      </button>
                    </div>
                    <div style={{ fontSize: "10px", color: "#fee2e2", opacity: 0.9 }}>
                      • {errorDetails.reasons[0] || "Auth key rejected by compiler runtime."}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Submit Button */}
              <motion.button
                type="submit"
                disabled={isCompiling}
                whileHover={!isCompiling ? { scale: 1.01 } : {}}
                whileTap={!isCompiling ? { scale: 0.99 } : {}}
                style={{
                  minHeight: "42px",
                  marginTop: "2px",
                  backgroundColor: !email || !password ? "rgba(34, 197, 94, 0.2)" : "#22c55e",
                  color: !email || !password ? "#86efac" : "#051105",
                  border: "1px solid #22c55e",
                  borderRadius: "4px",
                  fontWeight: 800,
                  fontFamily: "inherit",
                  fontSize: "12px",
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
                  <span>{isSignUp ? "INITIALIZING DEVELOPER ACCOUNT..." : "COMPILING &amp; AUTHENTICATING..."}</span>
                ) : (
                  <>
                    <span>{isSignUp ? "INITIALIZE DEVELOPER ACCOUNT" : "COMPILE &amp; ENTER WORKSPACE"}</span>
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </>
                )}
              </motion.button>

              {/* Mode Switch Button (Robot Kick-Out Transition) */}
              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <button
                  type="button"
                  onClick={() => toggleMode(!isSignUp)}
                  style={{
                    background: "rgba(13, 19, 13, 0.9)",
                    border: "1px dashed rgba(34, 197, 94, 0.4)",
                    borderRadius: "4px",
                    padding: "4px 10px",
                    color: "#86efac",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#22c55e")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(34, 197, 94, 0.4)")}
                >
                  <span>{isSignUp ? "⬅ ALREADY REGISTERED? SIGN IN" : "🤖 NEW DEVELOPER? CREATE ACCOUNT →"}</span>
                </button>
              </div>
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
      </div>
    </main>
  );
}
