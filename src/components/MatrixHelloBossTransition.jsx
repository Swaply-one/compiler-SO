import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export default function MatrixHelloBossTransition({ onComplete, isNewUser = false }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("matrix_in"); // "matrix_in" -> "hold" -> "matrix_out"

  // Exact ASCII block banner matching SWAPLY ONE
  const asciiHelloBoss = [
    "██╗  ██╗███████╗██╗     ██╗      ██████╗     ██████╗  ██████╗ ███████╗███████╗",
    "██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ██╔══██╗██╔═══██╗██╔════╝██╔════╝",
    "███████║█████╗  ██║     ██║     ██║   ██║    ██████╔╝██║   ██║███████╗███████╗",
    "██╔══██║██╔══╝  ██║     ██║     ██║   ██║    ██╔══██╗██╔═══╝ ╚════██║╚════██║",
    "██║  ██║███████╗███████╗███████╗╚██████╔╝    ██████╔╝██║     ███████║███████╗",
    "╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝     ╚═════╝ ╚═╝     ╚══════╝╚══════╝",
  ];

  const asciiWelcomeBoss = [
    "██╗    ██╗███████╗██╗     ██████╗  ██████╗ ███╗   ███╗███████╗    ██████╗  ██████╗ ███████╗███████╗",
    "██║    ██║██╔════╝██║    ██╔════╝ ██╔═══██╗████╗ ████║██╔════╝    ██╔══██╗██╔═══██╗██╔════╝██╔════╝",
    "██║ █╗ ██║█████╗  ██║    ██║      ██║   ██║██╔████╔██║█████╗      ██████╔╝██║   ██║███████╗███████╗",
    "██║███╗██║██╔══╝  ██║    ██║      ██║   ██║██║╚██╔╝██║██╔══╝      ██╔══██╗██║   ██║╚════██║╚════██║",
    "╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗    ██████╔╝╚██████╔╝███████║███████║",
    " ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝",
  ];

  const activeAscii = isNewUser ? asciiWelcomeBoss : asciiHelloBoss;
  const matrixGlyphs = "0123456789ABCDEF$#@<>{}[]=/*~±§µ¶";

  const [decodedLines, setDecodedLines] = useState(() =>
    activeAscii.map((line) =>
      line
        .split("")
        .map((char) => (char === " " ? " " : matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)]))
        .join("")
    )
  );

  const targetSub = isNewUser
    ? ">>> NEW DEVELOPER ACCOUNT INITIALIZED // WELCOME TO SWAPLY ONE <<<"
    : ">>> ACCESS GRANTED // MATRIX PROTOCOL ACTIVE <<<";

  const [subtitleText, setSubtitleText] = useState(">>> [MATRIX_DECODING_AUTHENTICATION] <<<");

  useEffect(() => {
    let iteration = 0;
    let subIteration = 0;

    // Step 1: Decode ASCII lines letter by letter
    const decodeInterval = setInterval(() => {
      setDecodedLines((prev) =>
        activeAscii.map((line) =>
          line
            .split("")
            .map((char, charIdx) => {
              if (char === " ") return " ";
              if (charIdx < iteration) {
                return char;
              }
              return matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)];
            })
            .join("")
        )
      );

      iteration += 3.8;

      if (iteration >= activeAscii[0].length) {
        clearInterval(decodeInterval);
        setDecodedLines(activeAscii);
        setPhase("hold");
      }
    }, 38);

    // Step 2: Decode subtitle
    const subInterval = setInterval(() => {
      setSubtitleText(
        targetSub
          .split("")
          .map((char, idx) => {
            if (char === " " || char === "/" || char === ">" || char === "<") return char;
            if (idx < subIteration) return targetSub[idx];
            return matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)];
          })
          .join("")
      );

      subIteration += 2.8;
      if (subIteration >= targetSub.length) {
        clearInterval(subInterval);
        setSubtitleText(targetSub);
      }
    }, 30);

    // Step 3: Rain Out Cascade
    const tOut = setTimeout(() => {
      setPhase("matrix_out");

      const glitchOutInterval = setInterval(() => {
        setDecodedLines(
          activeAscii.map((line) =>
            line
              .split("")
              .map((char) => (char === " " ? " " : matrixGlyphs[Math.floor(Math.random() * matrixGlyphs.length)]))
              .join("")
          )
        );
      }, 45);

      setTimeout(() => clearInterval(glitchOutInterval), 700);
    }, 2300);

    const tComplete = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2950);

    return () => {
      clearInterval(decodeInterval);
      clearInterval(subInterval);
      clearTimeout(tOut);
      clearTimeout(tComplete);
    };
  }, [onComplete, isNewUser]);

  // Transparent Matrix Rain Canvas
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

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -50));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = matrixGlyphs.charAt(Math.floor(Math.random() * matrixGlyphs.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.shadowColor = "#22c55e";
        ctx.shadowBlur = 10;

        if (Math.random() > 0.85) {
          ctx.fillStyle = "#ffffff";
        } else {
          ctx.fillStyle = "#4ade80";
        }
        ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
        ctx.fillText(text, x, y);

        ctx.fillStyle = "rgba(34, 197, 94, 0.4)";
        ctx.fillText(matrixGlyphs.charAt(Math.floor(Math.random() * matrixGlyphs.length)), x, y - fontSize);

        if (y > canvas.height && Math.random() > 0.96) {
          drops[i] = 0;
        }
        drops[i] += 1.9;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "16px",
      }}
    >
      {/* Falling Matrix Rain Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Actively Decoding Matrix ASCII Banner Overlay */}
      <motion.div
        initial={{ y: -120, opacity: 0, scale: 0.92 }}
        animate={
          phase === "matrix_out"
            ? { y: 220, opacity: 0, scale: 0.95, filter: "blur(8px)" }
            : { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{
          duration: phase === "matrix_out" ? 0.65 : 0.45,
          ease: phase === "matrix_out" ? "easeIn" : [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          pointerEvents: "none",
          maxWidth: "100%",
        }}
      >
        {/* Subtitle tag */}
        <div
          style={{
            fontSize: "clamp(9.5px, 2vw, 12.5px)",
            fontWeight: 800,
            color: "#86efac",
            letterSpacing: "0.2em",
            textShadow: "0 0 15px #22c55e",
            marginBottom: "10px",
          }}
        >
          {subtitleText}
        </div>

        {/* Real-Time Matrix Decoding ASCII Banner */}
        <pre
          style={{
            margin: "0 auto",
            fontSize: isNewUser ? "clamp(3.5px, 1vw, 7.5px)" : "clamp(4.2px, 1.2vw, 9.5px)",
            lineHeight: "1.18",
            fontWeight: 900,
            color: phase === "hold" ? "#22c55e" : "#4ade80",
            textShadow: "0 0 20px #22c55e, 0 0 45px #16a34a",
            letterSpacing: "0.02em",
            display: "inline-block",
            maxWidth: "100%",
            overflowX: "hidden",
            transition: "color 0.2s ease",
          }}
        >
          {decodedLines.join("\n")}
        </pre>

        {/* Status Line */}
        <div
          style={{
            marginTop: "14px",
            fontSize: "clamp(10.5px, 2vw, 13.5px)",
            fontWeight: 700,
            color: "#4ade80",
            letterSpacing: "0.12em",
            textShadow: "0 0 12px rgba(34, 197, 94, 0.9)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              boxShadow: "0 0 10px #22c55e",
            }}
          />
          <span>
            {isNewUser
              ? "[ DEVELOPER INITIALIZATION COMPLETE // WELCOME BOSS ]"
              : "[ 0xROOT_AUTH_SUCCESS // 100% INITIALIZED ]"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
