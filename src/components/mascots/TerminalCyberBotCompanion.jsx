import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Zap, Laptop, Code2, AlertTriangle } from "lucide-react";

export default function TerminalCyberBotCompanion({
  isPasswordFocused,
  isEmailFocused,
  isCompiling,
  errorDetails,
  authSuccess,
  isRobotKicking = false,
  userEmail = "",
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Mouse & Touch tracking for robot eyes
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
    window.addEventListener("touchstart", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchstart", handlePointerMove);
    };
  }, []);

  // Periodic natural blinking
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPasswordFocused && !errorDetails) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 140);
      }
    }, 3800);
    return () => clearInterval(interval);
  }, [isPasswordFocused, errorDetails]);

  // Dialogue based on state
  const getDialogue = () => {
    if (authSuccess) {
      return "💻 HELLO BOSS! Welcome back! Initializing compiler workspace... 🚀✨";
    }
    if (errorDetails) {
      return "💥 *SPROINGGG!* 😵 CRITICAL ERROR! WRONG PASSWORD DETECTED!";
    }
    if (isCompiling) {
      return "⚡ Compiling developer tokens & linking LLVM targets...";
    }
    if (isPasswordFocused) {
      return "🙈 Respecting developer privacy — looking away!";
    }
    if (isEmailFocused) {
      return "🎯 Scanning developer identity matrix...";
    }
    return "🤖 Ready for input, Boss! Terminal is 100% online.";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        userSelect: "none",
        zIndex: 30,
        marginBottom: "-14px",
      }}
    >
      {/* Main Robot Avatar with Floating Hover Animation */}
      <motion.div
        style={{
          position: "relative",
          width: 105,
          height: 110,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transformOrigin: "bottom center",
          transform: "scale(clamp(0.72, 1.8vw, 0.95))",
        }}
        animate={
          isRobotKicking
            ? {
                x: [-35, 110, -90, 0],
                y: [-15, 30, -25, 0],
                rotate: [-25, 35, -20, 0],
                scale: [1, 1.25, 1],
              }
            : errorDetails
            ? {
                x: [-6, 6, -6, 6, -3, 3, 0],
                y: [0, -6, 2, -4, 0],
                rotate: [-4, 4, -4, 4, 0],
              }
            : authSuccess
            ? {
                y: [0, -18, 0],
                rotate: [-3, 3, -3],
                scale: [1, 1.08, 1],
              }
            : {
                y: [0, -6, 0],
              }
        }
        transition={
          isRobotKicking
            ? { duration: 0.45, ease: "easeInOut" }
            : errorDetails
            ? { duration: 0.4, repeat: 2 }
            : authSuccess
            ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* ================================================================= */}
        {/* 💥 POPPED SPRINGS (Triggered when errorDetails / Wrong Password)   */}
        {/* ================================================================= */}
        <AnimatePresence>
          {errorDetails && (
            <>
              {/* Left Popping Spring */}
              <motion.div
                key="spring-left"
                initial={{ scale: 0, y: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1.3, 1],
                  y: [-10, -42, -36],
                  x: [-5, -28, -24],
                  rotate: [-35, -55, -45],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 8,
                  zIndex: 25,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  filter: "drop-shadow(0 0 6px #ef4444)",
                }}
              >
                {/* SVG Coiled Spring */}
                <svg width="22" height="42" viewBox="0 0 24 50" fill="none">
                  <path
                    d="M12 45 C4 42, 4 38, 12 36 C20 34, 20 30, 12 28 C4 26, 4 22, 12 20 C20 18, 20 14, 12 12 C4 10, 4 6, 12 4 L12 0"
                    stroke="#f87171"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Metal Bolt on end */}
                  <circle cx="12" cy="4" r="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
                </svg>
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                  style={{ color: "#ef4444", fontSize: "9px", fontWeight: 800, marginTop: -4 }}
                >
                  ⚡SPROING!
                </motion.span>
              </motion.div>

              {/* Right Popping Spring */}
              <motion.div
                key="spring-right"
                initial={{ scale: 0, y: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1.3, 1],
                  y: [-10, -46, -38],
                  x: [5, 28, 24],
                  rotate: [35, 60, 48],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 9, delay: 0.05 }}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 8,
                  zIndex: 25,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  filter: "drop-shadow(0 0 6px #ef4444)",
                }}
              >
                {/* SVG Coiled Spring */}
                <svg width="22" height="42" viewBox="0 0 24 50" fill="none">
                  <path
                    d="M12 45 C20 42, 20 38, 12 36 C4 34, 4 30, 12 28 C20 26, 20 22, 12 20 C4 18, 4 14, 12 12 C20 10, 20 6, 12 4 L12 0"
                    stroke="#f87171"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="4" r="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
                </svg>
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                  style={{ color: "#facc15", fontSize: "9px", fontWeight: 800, marginTop: -4 }}
                >
                  *BOING*
                </motion.span>
              </motion.div>

              {/* Smoke / Spark Particles from Popped Sockets */}
              <motion.div
                key="smoke-fx"
                style={{
                  position: "absolute",
                  top: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 24,
                  display: "flex",
                  gap: 16,
                }}
              >
                <motion.div
                  animate={{ y: [-5, -25], opacity: [1, 0], scale: [0.5, 1.8] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444", filter: "blur(3px)" }}
                />
                <motion.div
                  animate={{ y: [-5, -28], opacity: [1, 0], scale: [0.5, 2] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                  style={{ width: 14, height: 14, borderRadius: "50%", background: "#f59e0b", filter: "blur(3px)" }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Sprout Leaf Antenna (Top) */}
        <motion.div
          style={{
            position: "absolute",
            top: -16,
            display: "flex",
            gap: 2,
            zIndex: 15,
          }}
          animate={
            errorDetails
              ? { rotate: [-25, 25, -25], scale: [1, 0.85, 1] }
              : authSuccess
              ? { rotate: [-15, 15, -15], scale: [1, 1.25, 1] }
              : { rotate: [-5, 5, -5] }
          }
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            style={{
              width: 10,
              height: 16,
              borderRadius: "50% 50% 10% 50%",
              background: errorDetails ? "#ef4444" : "#22c55e",
              boxShadow: errorDetails ? "0 0 10px #ef4444" : "0 0 10px #22c55e",
              transform: "rotate(-32deg)",
            }}
          />
          <div
            style={{
              width: 10,
              height: 16,
              borderRadius: "50% 50% 50% 10%",
              background: errorDetails ? "#ef4444" : "#22c55e",
              boxShadow: errorDetails ? "0 0 10px #ef4444" : "0 0 10px #22c55e",
              transform: "rotate(32deg)",
            }}
          />
        </motion.div>

        {/* Helmet Sphere Unit */}
        <motion.div
          style={{
            width: 90,
            height: 74,
            borderRadius: "32px 32px 26px 26px",
            background: errorDetails
              ? "radial-gradient(circle at 35% 30%, #fee2e2 0%, #fca5a5 60%, #ef4444 100%)"
              : "radial-gradient(circle at 35% 30%, #ffffff 0%, #e2e8f0 60%, #cbd5e1 100%)",
            border: errorDetails ? "2px solid #ef4444" : "2px solid #22c55e",
            boxShadow: errorDetails
              ? "0 0 25px rgba(239, 68, 68, 0.7), inset 0 2px 4px #fff"
              : authSuccess
              ? "0 0 25px rgba(34, 197, 94, 0.7), inset 0 2px 4px #fff"
              : "0 0 18px rgba(34, 197, 94, 0.35), inset 0 2px 4px #fff",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
          animate={{
            rotate: errorDetails ? [-4, 4, -4] : mousePos.x * 4,
          }}
        >
          {/* Side Headset Ear-cups */}
          <div
            style={{
              position: "absolute",
              left: -9,
              width: 12,
              height: 30,
              borderRadius: "6px",
              background: errorDetails ? "#7f1d1d" : "#0d130d",
              border: errorDetails ? "1.5px solid #ef4444" : "1.5px solid #22c55e",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -9,
              width: 12,
              height: 30,
              borderRadius: "6px",
              background: errorDetails ? "#7f1d1d" : "#0d130d",
              border: errorDetails ? "1.5px solid #ef4444" : "1.5px solid #22c55e",
            }}
          />

          {/* CRT Visor Screen */}
          <div
            style={{
              width: 68,
              height: 46,
              borderRadius: "18px",
              background: "#051105",
              border: errorDetails ? "1.5px solid #ef4444" : "1.5px solid #22c55e",
              boxShadow: errorDetails ? "inset 0 0 10px rgba(239,68,68,0.5)" : "inset 0 0 10px rgba(34,197,94,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Visor Glare */}
            <div
              style={{
                position: "absolute",
                top: 2,
                left: 4,
                width: 50,
                height: 10,
                borderRadius: "50%",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
                transform: "rotate(-10deg)",
              }}
            />

            {/* ============================================================= */}
            {/* VISOR EYES: Dynamic States (Dizzy X X, Coding Stars, Tracking) */}
            {/* ============================================================= */}
            {errorDetails ? (
              /* Malfunctioning Dizzy X X Eyes on Wrong Password */
              <div style={{ display: "flex", gap: 10, color: "#ef4444", fontWeight: 900, fontSize: "16px" }}>
                <motion.span
                  animate={{ rotate: [-20, 20, -20], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.25, repeat: Infinity }}
                >
                  ✕
                </motion.span>
                <motion.span
                  animate={{ rotate: [20, -20, 20], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.25, repeat: Infinity }}
                >
                  ✕
                </motion.span>
              </div>
            ) : authSuccess ? (
              /* Victory Star / Code Eyes on Success */
              <div style={{ display: "flex", gap: 6, color: "#22c55e", fontWeight: 900, fontSize: "14px" }}>
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.4, repeat: Infinity }}>
                  ★
                </motion.span>
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.4, repeat: Infinity }}>
                  ★
                </motion.span>
              </div>
            ) : isPasswordFocused ? (
              /* Closed Privacy Eyes (︶ ‿ ︶) */
              <div style={{ display: "flex", gap: 8, color: "#22c55e", fontWeight: 900, fontSize: "12px" }}>
                <span>︶</span>
                <span>︶</span>
              </div>
            ) : (
              /* Regular Tracking Pill Eyes */
              <>
                <motion.div
                  style={{
                    width: 8,
                    height: isBlinking ? 2 : 16,
                    borderRadius: "6px",
                    background: "#22c55e",
                    boxShadow: "0 0 10px #22c55e",
                  }}
                  animate={{
                    x: mousePos.x * 5,
                    y: mousePos.y * 3,
                  }}
                />
                <motion.div
                  style={{
                    width: 8,
                    height: isBlinking ? 2 : 16,
                    borderRadius: "6px",
                    background: "#22c55e",
                    boxShadow: "0 0 10px #22c55e",
                  }}
                  animate={{
                    x: mousePos.x * 5,
                    y: mousePos.y * 3,
                  }}
                />
              </>
            )}
          </div>
        </motion.div>

        {/* Robot Dev Body (Matrix / CRT Hoodie) */}
        <motion.div
          style={{
            position: "absolute",
            top: 66,
            width: 68,
            height: 48,
            borderRadius: "14px 14px 18px 18px",
            background: errorDetails
              ? "linear-gradient(145deg, #450a0a, #1f0404)"
              : "linear-gradient(145deg, #0d130d, #051105)",
            border: errorDetails ? "1.5px solid #ef4444" : "1.5px solid #22c55e",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 8,
            boxShadow: errorDetails ? "0 0 12px rgba(239,68,68,0.4)" : "0 0 12px rgba(34,197,94,0.2)",
          }}
        >
          {/* Coding Theme Hologram Laptop (Active on Success) */}
          {authSuccess ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "#22c55e",
                fontWeight: 800,
                fontSize: "10px",
                filter: "drop-shadow(0 0 6px #22c55e)",
              }}
            >
              <Laptop size={15} />
              <span>&lt;BOSS/&gt;</span>
            </motion.div>
          ) : (
            /* Chest Reactor Core */
            <motion.div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: errorDetails ? "#ef4444" : "#22c55e",
                boxShadow: errorDetails ? "0 0 10px #ef4444" : "0 0 10px #22c55e",
              }}
              animate={
                errorDetails
                  ? { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }
                  : { scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }
              }
              transition={{ duration: errorDetails ? 0.25 : 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Jet Thruster Glow Flame */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 6,
            width: 22,
            height: 18,
            background: errorDetails
              ? "radial-gradient(ellipse at top, #ef4444 0%, #b91c1c 60%, transparent 100%)"
              : "radial-gradient(ellipse at top, #22c55e 0%, #15803d 60%, transparent 100%)",
            borderRadius: "50%",
            filter: "blur(2px)",
            zIndex: 4,
          }}
          animate={{
            scaleY: errorDetails ? [1, 2.2, 1] : [1, 1.7, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{ duration: errorDetails ? 0.15 : 0.25, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
