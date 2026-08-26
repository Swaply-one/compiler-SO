import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Cpu, CheckCircle2, X, Zap } from "lucide-react";

// Static constants outside component to ensure zero reference recreation
const MATRIX_GLYPHS = "0123456789ABCDEF$#@<>{}[]=/*~±§µ¶!&%";

const MINI_ASCII_HELLO = [
  "╔═╗╔═╗╦  ╦  ╔═╗   ╔╗ ╔═╗╔═╗╔═╗",
  "╠═╣║╣ ║  ║  ║ ║   ╠╩╗║ ║╚═╗╚═╗",
  "╩ ╩╚═╝╩═╝╩═╝╚═╝   ╚═╝╚═╝╚═╝╚═╝",
];

const MINI_ASCII_WELCOME = [
  "╦ ╦╔═╗╦  ╔═╗╔═╗╔╦╗╔═╗   ╔╗ ╔═╗╔═╗╔═╗",
  "║║║║╣ ║  ║  ║ ║║║║║╣    ╠╩╗║ ║╚═╗╚═╗",
  "╚╩╝╚═╝╩═╝╚═╝╚═╝╩ ╩╚═╝   ╚═╝╚═╝╚═╝╚═╝",
];

export default function MatrixHelloBossTransition({
  onComplete,
  isNewUser = false,
  userEmail = "developer@swaply.io",
}) {
  const canvasRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const targetTitle = isNewUser ? "WELCOME BOSS" : "HELLO BOSS";
  const targetSub = isNewUser
    ? ">>> NEW DEVELOPER ACCOUNT INITIALIZED // WELCOME TO SWAPLY ONE <<<"
    : ">>> ACCESS GRANTED // MATRIX ROOT PROTOCOL ACTIVE <<<";
  const activeMiniAscii = isNewUser ? MINI_ASCII_WELCOME : MINI_ASCII_HELLO;

  const [phase, setPhase] = useState("matrix_in"); // "matrix_in" -> "hold" -> "matrix_out"
  const [progress, setProgress] = useState(0);
  const [decodedTitle, setDecodedTitle] = useState(targetTitle);
  const [decodedMiniAscii, setDecodedMiniAscii] = useState(activeMiniAscii);
  const [subtitleText, setSubtitleText] = useState(targetSub);

  // Instant Dismiss / Finish handler
  const handleFinish = useRef(() => {
    if (onCompleteRef.current) onCompleteRef.current();
  }).current;

  // Single Frame-Accurate RAF Animation Engine (Immune to React re-render thrashing)
  useEffect(() => {
    const startTime = performance.now();
    let hasPlayedSound = false;
    let animId;

    const playCyberChime = () => {
      if (hasPlayedSound) return;
      hasPlayedSound = true;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        if (ctx.state === "suspended") ctx.resume();

        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

          gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + idx * 0.06 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.5);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.06);
          osc.stop(ctx.currentTime + idx * 0.06 + 0.55);
        });
      } catch {}
    };

    const tick = (now) => {
      const elapsed = now - startTime;

      // 1. Progress Bar (0% to 100% in 500ms)
      const currentProgress = Math.min(100, Math.round((elapsed / 500) * 100));
      setProgress(currentProgress);

      // 2. Title Decoding (completes by 400ms)
      const titleRatio = Math.min(1, elapsed / 400);
      const titleCharsRevealed = Math.floor(titleRatio * targetTitle.length);
      setDecodedTitle(
        targetTitle
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < titleCharsRevealed) return char;
            return MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)];
          })
          .join("")
      );

      // 3. Mini ASCII Decoding (completes by 350ms)
      const asciiRatio = Math.min(1, elapsed / 350);
      const asciiCharsRevealed = Math.floor(asciiRatio * activeMiniAscii[0].length);
      setDecodedMiniAscii(
        activeMiniAscii.map((line) =>
          line
            .split("")
            .map((char, idx) => {
              if (char === " ") return " ";
              if (idx < asciiCharsRevealed) return char;
              return MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)];
            })
            .join("")
        )
      );

      // 4. Subtitle Decoding (completes by 350ms)
      const subRatio = Math.min(1, elapsed / 350);
      const subCharsRevealed = Math.floor(subRatio * targetSub.length);
      setSubtitleText(
        targetSub
          .split("")
          .map((char, idx) => {
            if (char === " " || char === "/" || char === ">" || char === "<") return char;
            if (idx < subCharsRevealed) return targetSub[idx];
            return MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)];
          })
          .join("")
      );

      // Sound chime trigger
      if (elapsed >= 450) {
        playCyberChime();
        setPhase("hold");
      }

      // Matrix Out transition
      if (elapsed >= 1050) {
        setPhase("matrix_out");
      }

      // Completion trigger
      if (elapsed >= 1350) {
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
        return;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (onCompleteRef.current) onCompleteRef.current();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animId);
    };
  }, [targetTitle, targetSub, activeMiniAscii]);

  // Falling Matrix Rain Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let rainAnimId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -50));

    const render = () => {
      ctx.fillStyle = "rgba(4, 9, 5, 0.22)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = MATRIX_GLYPHS.charAt(Math.floor(Math.random() * MATRIX_GLYPHS.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.shadowColor = "#22c55e";
        ctx.shadowBlur = 8;

        if (Math.random() > 0.88) {
          ctx.fillStyle = "#ffffff";
        } else {
          ctx.fillStyle = "#4ade80";
        }
        ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillText(text, x, y);

        ctx.fillStyle = "rgba(34, 197, 94, 0.4)";
        ctx.fillText(MATRIX_GLYPHS.charAt(Math.floor(Math.random() * MATRIX_GLYPHS.length)), x, y - fontSize);

        if (y > canvas.height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i] += 1.8;
      }

      rainAnimId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rainAnimId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={phase === "matrix_out" ? { opacity: 0, scale: 1.04, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: phase === "matrix_out" ? 0.45 : 0.2, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "16px",
        backgroundColor: "rgba(3, 7, 4, 0.97)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        pointerEvents: "auto",
      }}
    >
      {/* Falling Matrix Rain Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.85,
        }}
      />

      {/* CRT Scanline and Vignette Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          background: `
            linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%),
            radial-gradient(circle at center, rgba(34, 197, 94, 0.14) 0%, rgba(3, 7, 4, 0.75) 65%, rgba(1, 4, 2, 0.98) 100%)
          `,
          backgroundSize: "100% 4px, 100% 100%",
        }}
      />

      {/* Quick Dismiss / Skip Button */}
      <button
        onClick={handleFinish}
        type="button"
        title="Skip Transition (Esc)"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(10, 25, 12, 0.85)",
          border: "1px solid rgba(34, 197, 94, 0.45)",
          borderRadius: "6px",
          padding: "6px 12px",
          color: "#86efac",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 0 15px rgba(34, 197, 94, 0.2)",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(34, 197, 94, 0.25)";
          e.currentTarget.style.borderColor = "#22c55e";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(10, 25, 12, 0.85)";
          e.currentTarget.style.borderColor = "rgba(34, 197, 94, 0.45)";
        }}
      >
        <span>[ SKIP ESC ]</span>
        <X size={13} color="#22c55e" />
      </button>

      {/* Main Holographic Cyber Card */}
      <motion.div
        initial={{ y: -30, opacity: 0, scale: 0.94 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
          maxWidth: "760px",
          width: "100%",
          backgroundColor: "rgba(5, 15, 8, 0.94)",
          border: "1.5px solid rgba(34, 197, 94, 0.75)",
          borderRadius: "14px",
          padding: "clamp(20px, 4vw, 34px) clamp(16px, 3.5vw, 30px)",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(34, 197, 94, 0.35), inset 0 0 35px rgba(34, 197, 94, 0.08)",
          boxSizing: "border-box",
        }}
      >
        {/* Holographic Corner Accent Brackets */}
        <div style={{ position: "absolute", top: 8, left: 10, color: "#22c55e", fontSize: "14px", fontWeight: 900, userSelect: "none" }}>⌜</div>
        <div style={{ position: "absolute", top: 8, right: 10, color: "#22c55e", fontSize: "14px", fontWeight: 900, userSelect: "none" }}>⌝</div>
        <div style={{ position: "absolute", bottom: 8, left: 10, color: "#22c55e", fontSize: "14px", fontWeight: 900, userSelect: "none" }}>⌞</div>
        <div style={{ position: "absolute", bottom: 8, right: 10, color: "#22c55e", fontSize: "14px", fontWeight: 900, userSelect: "none" }}>⌟</div>

        {/* Top Cyber Telemetry Header */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(34, 197, 94, 0.3)",
            paddingBottom: "10px",
            marginBottom: "14px",
            fontSize: "clamp(9.5px, 2vw, 11px)",
            color: "#86efac",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 10px #22c55e",
              }}
            />
            <strong style={{ color: "#4ade80", letterSpacing: "0.08em" }}>
              SWAPLY-ONE ROOT AUTH // MATRIX PROTOCOL
            </strong>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#86efac", opacity: 0.9 }}>
              USER: <strong style={{ color: "#22c55e" }}>{userEmail}</strong>
            </span>
            <span style={{ background: "rgba(34, 197, 94, 0.2)", color: "#4ade80", padding: "2px 6px", borderRadius: "3px", fontWeight: 800, fontSize: "9px" }}>
              AUTH: 0xROOT
            </span>
          </div>
        </div>

        {/* Mini Accent ASCII Banner (Responsive & Never Wraps) */}
        <pre
          style={{
            margin: "0 auto 8px",
            fontSize: isNewUser ? "clamp(7px, 1.6vw, 11px)" : "clamp(8.5px, 2vw, 13px)",
            lineHeight: "1.15",
            fontWeight: 800,
            color: phase === "hold" ? "#22c55e" : "#4ade80",
            textShadow: "0 0 14px rgba(34, 197, 94, 0.7)",
            letterSpacing: "0.04em",
            userSelect: "none",
            display: "inline-block",
            overflowX: "hidden",
          }}
        >
          {decodedMiniAscii.join("\n")}
        </pre>

        {/* Massive Glowing Matrix Typography: "HELLO BOSS" / "WELCOME BOSS" */}
        <div
          style={{
            fontSize: isNewUser ? "clamp(24px, 5.2vw, 42px)" : "clamp(28px, 6.2vw, 50px)",
            fontWeight: 900,
            letterSpacing: "0.18em",
            color: phase === "hold" ? "#ffffff" : "#4ade80",
            textShadow: phase === "hold"
              ? "0 0 12px #ffffff, 0 0 25px #22c55e, 0 0 50px #16a34a, 0 0 80px rgba(34, 197, 94, 0.8)"
              : "0 0 15px #22c55e, 0 0 35px #16a34a",
            margin: "2px 0 10px",
            userSelect: "none",
            transition: "all 0.15s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Zap size={22} color="#22c55e" />
          <span>{decodedTitle}</span>
          <Zap size={22} color="#22c55e" />
        </div>

        {/* Subtitle decoding tag */}
        <div
          style={{
            fontSize: "clamp(9.5px, 2vw, 11.5px)",
            fontWeight: 800,
            color: "#86efac",
            letterSpacing: "0.14em",
            textShadow: "0 0 12px #22c55e",
            marginBottom: "12px",
            backgroundColor: "rgba(34, 197, 94, 0.12)",
            padding: "4px 12px",
            borderRadius: "4px",
            border: "1px dashed rgba(34, 197, 94, 0.4)",
            display: "inline-block",
          }}
        >
          {subtitleText}
        </div>

        {/* Cyber Progress Indicator */}
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "10px",
              color: "#86efac",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            <span>[ COMPILER RUNTIME INITIALIZATION ]</span>
            <span style={{ color: "#22c55e" }}>{progress}%</span>
          </div>

          {/* Glowing Progress Track */}
          <div
            style={{
              width: "100%",
              height: "6px",
              backgroundColor: "rgba(34, 197, 94, 0.15)",
              borderRadius: "3px",
              overflow: "hidden",
              border: "1px solid rgba(34, 197, 94, 0.4)",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 12px #22c55e",
                width: `${progress}%`,
                transition: "width 0.05s linear",
              }}
            />
          </div>
        </div>

        {/* Status System Badges */}
        <div
          style={{
            marginTop: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            fontSize: "clamp(9.5px, 2vw, 11.5px)",
            fontWeight: 700,
            color: "#4ade80",
            letterSpacing: "0.08em",
            textShadow: "0 0 12px rgba(34, 197, 94, 0.9)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(34, 197, 94, 0.15)",
              border: "1px solid rgba(34, 197, 94, 0.35)",
              padding: "4px 10px",
              borderRadius: "4px",
            }}
          >
            <CheckCircle2 size={13} color={progress >= 50 ? "#22c55e" : "#86efac"} />
            <span>
              {progress < 50
                ? "DECRYPTING RSA-4096 ROOT VAULT..."
                : "RSA-4096 ROOT VAULT DECRYPTED"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(34, 197, 94, 0.15)",
              border: "1px solid rgba(34, 197, 94, 0.35)",
              padding: "4px 10px",
              borderRadius: "4px",
            }}
          >
            <Cpu size={13} color={progress >= 100 ? "#22c55e" : "#86efac"} />
            <span>
              {progress < 100
                ? "MOUNTING COMPILER RUNTIME..."
                : isNewUser
                ? "NEW DEVELOPER ENVIRONMENT READY"
                : "COMPILER SESSION 100% ONLINE"}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
