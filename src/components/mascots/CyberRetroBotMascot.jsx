import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { Sparkles, AlertTriangle, CheckCircle2, ShieldAlert, Cpu, UserPlus } from "lucide-react";

/**
 * CyberRetroBotMascot: Next-Gen Interactive Robot Compiler Mascot
 * Features:
 * - Real-time cursor tracking eyes & head tilt
 * - RIGHT ANSWER (Success): Celebratory victory dance, sparkling emerald eyes, arms up, confetti sparks
 * - WRONG ANSWER (Error): Frantic headshake, crimson warning strobe, glitching [X X] eyes, steam/sparks
 * - PASSWORD TYPING: Mechanical hands cover eyes (or peeks if password visible)
 * - Sign In & Sign Up tailored contextual dialogue & animations
 */
export default function CyberRetroBotMascot({
  authMode = "login", // "login" | "signup"
  handle = "",
  passwordFocused,
  passwordVisible,
  isCompiling,
  compileStep,
  error,
  success,
  email,
  password,
  confirmPassword = "",
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isBlinking, setIsBlinking] = useState(false);

  // Periodic natural blinking when not in error or success
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!passwordFocused && !error && !success) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, [passwordFocused, error, success]);

  // Smooth spring physics for eye & head tracking
  const smoothX = useSpring(mouseX, { stiffness: 220, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 220, damping: 20 });

  const eyeX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const eyeY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const headRotate = useTransform(smoothX, [-1, 1], [-6, 6]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // State derivation
  const robotState = useMemo(() => {
    if (authMode === "404") return "404_SEARCH";
    if (success) return "SUCCESS";
    if (error) return "ERROR";
    if (isCompiling) return "COMPILING";
    if (passwordFocused && !passwordVisible) return "COVER_EYES";
    if (passwordFocused && passwordVisible) return "PEEK_EYES";
    if (authMode === "signup" && handle && handle.length > 0 && !email) return "SCANNING_HANDLE";
    if (email && email.length > 0) return "SCANNING_EMAIL";
    return "IDLE";
  }, [authMode, success, error, isCompiling, passwordFocused, passwordVisible, handle, email]);

  // Dynamic Contextual Dialogue
  const speechMessage = useMemo(() => {
    if (authMode === "404") {
      return "404 ERROR: MEMORY SECTOR UNRESOLVED! RUNNING RECOVERY RADAR 📡⚡";
    }

    if (authMode === "signup") {
      if (success) return "DEVELOPER INITIALIZED! WELCOME TO THE SWAPLY GRID! 🚀✨";
      if (error) return "BZZT! REGISTRATION GLITCH! CHECK SECURITY KEY & FIELDS! 🛑";
      if (isCompiling) return `PROVISIONING LLVM KEYPAIR (STEP ${compileStep}/4)... ⚙️`;
      if (passwordFocused && !passwordVisible) return "TOP SECRET! COVERING OPTICAL SENSORS! 🙈🔒";
      if (passwordFocused && passwordVisible) return "PEEKABOO! MASTER KEY CIPHER VISIBLE! 👀✨";
      if (confirmPassword && password && confirmPassword === password) return "CIPHERS MATCH 100%! READY TO REGISTER! 🔐✓";
      if (confirmPassword && password && confirmPassword !== password) return "CIPHER MISMATCH! CONFIRM KEY DOES NOT MATCH! ⚠️";
      if (handle && handle.length > 0 && !email) return `RECORDING CALLSIGN @${handle.toUpperCase()}... 📡`;
      if (email && email.length > 0) return "STREAMING DEVELOPER IDENTITY PROTOCOL... 📡";
      return "NEW DEVELOPER ENROLLMENT // INITIALIZE REGISTRY ⚡";
    }

    // Default Sign In Mode
    if (success) return "ACCESS GRANTED! WELCOME BACK, CREATOR! 🚀✨";
    if (error) return "BZZT! ACCESS DENIED! GLITCH DETECTED! 🛑";
    if (isCompiling) return `COMPILING LLVM IR (PASS ${compileStep}/3)... ⚙️`;
    if (passwordFocused && !passwordVisible) return "TOP SECRET! I'M NOT LOOKING! 🙈🔒";
    if (passwordFocused && passwordVisible) return "PEEKABOO! I CAN SEE YOUR MASTER KEY! 👀✨";
    if (email && email.length > 0) return "SCANNING DEVELOPER CREDENTIAL STREAM... 📡";
    return "SWAPLY-BOT v1.0 ONLINE // READY TO COMPILE ⚡";
  }, [authMode, success, error, isCompiling, compileStep, passwordFocused, passwordVisible, confirmPassword, password, handle, email]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        margin: "6px 0 10px",
        userSelect: "none",
      }}
    >
      {/* Dynamic HUD Speech Bubble */}
      <motion.div
        key={speechMessage}
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          marginBottom: "10px",
          padding: "5px 14px",
          borderRadius: "20px",
          background: success
            ? "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.35))"
            : error
            ? "linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(220, 38, 38, 0.4))"
            : isCompiling
            ? "linear-gradient(135deg, rgba(250, 204, 21, 0.2), rgba(234, 179, 8, 0.35))"
            : "rgba(18, 26, 18, 0.85)",
          border: success
            ? "1px solid #22c55e"
            : error
            ? "1px solid #ef4444"
            : isCompiling
            ? "1px solid #facc15"
            : "1px solid rgba(34, 197, 94, 0.3)",
          boxShadow: success
            ? "0 0 20px rgba(34, 197, 94, 0.35)"
            : error
            ? "0 0 20px rgba(239, 68, 68, 0.4)"
            : "0 4px 14px rgba(0, 0, 0, 0.4)",
          color: success ? "#86efac" : error ? "#fca5a5" : isCompiling ? "#fef08a" : "#4ade80",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          textAlign: "center",
          maxWidth: "92%",
        }}
      >
        {success && <CheckCircle2 size={13} color="#22c55e" />}
        {error && <ShieldAlert size={13} color="#ef4444" />}
        {isCompiling && <Cpu size={13} color="#facc15" />}
        {!success && !error && !isCompiling && authMode === "signup" && <UserPlus size={13} color="#4ade80" />}
        <span>{speechMessage}</span>
      </motion.div>

      {/* Main Robot Container with Hover / State Physics */}
      <motion.div
        animate={
          success
            ? {
                y: [-4, -20, -4, -14, 0],
                rotate: [-4, 4, -4, 4, 0],
                scale: [1, 1.08, 1],
              }
            : error
            ? {
                x: [-14, 14, -10, 10, -5, 5, 0],
                rotate: [-6, 6, -4, 4, 0],
                scale: [1, 0.96, 1],
              }
            : isCompiling
            ? {
                y: [0, -6, 0],
                rotate: [-2, 2, -2],
              }
            : {
                y: [0, -7, 0],
              }
        }
        transition={
          success
            ? { duration: 0.8, ease: "easeInOut" }
            : error
            ? { duration: 0.45, ease: "easeOut" }
            : isCompiling
            ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
        style={{
          position: "relative",
          width: 170,
          height: 155,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Ground Radial Contact Shadow */}
        <motion.div
          animate={
            success
              ? { scale: [1, 0.6, 1], opacity: [0.3, 0.6, 0.3] }
              : error
              ? { scale: [1, 1.1, 1], opacity: 0.4 }
              : { scale: [1, 0.88, 1], opacity: [0.25, 0.4, 0.25] }
          }
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: -8,
            width: 130,
            height: 16,
            borderRadius: "50%",
            background: success
              ? "radial-gradient(ellipse at center, rgba(34, 197, 94, 0.45) 0%, transparent 70%)"
              : error
              ? "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.45) 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(34, 197, 94, 0.25) 0%, transparent 70%)",
            filter: "blur(4px)",
            pointerEvents: "none",
          }}
        />

        {/* LEFT ARM */}
        <motion.div
          animate={
            success
              ? {
                  x: -62,
                  y: -50,
                  rotate: -135,
                }
              : error
              ? {
                  x: -30,
                  y: -15,
                  rotate: 45,
                }
              : robotState === "COVER_EYES"
              ? {
                  x: -12,
                  y: -18,
                  rotate: 28,
                  zIndex: 25,
                }
              : robotState === "PEEK_EYES"
              ? {
                  x: -12,
                  y: -18,
                  rotate: 28,
                  zIndex: 25,
                }
              : {
                  x: -68,
                  y: 12,
                  rotate: [-8, 4, -8],
                }
          }
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{
            position: "absolute",
            width: 24,
            height: 38,
            borderRadius: "12px",
            background: error
              ? "linear-gradient(135deg, #ef4444, #991b1b)"
              : success
              ? "linear-gradient(135deg, #4ade80, #16a34a)"
              : "linear-gradient(135deg, #1e2e1e, #0d170d)",
            border: error ? "2px solid #fca5a5" : success ? "2px solid #bbf7d0" : "1.5px solid #22c55e",
            boxShadow: error
              ? "0 0 12px rgba(239, 68, 68, 0.6)"
              : success
              ? "0 0 14px rgba(34, 197, 94, 0.7)"
              : "0 4px 10px rgba(0, 0, 0, 0.5)",
            zIndex: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 2px",
          }}
        >
          {/* Finger Pads */}
          <div style={{ display: "flex", gap: "2px" }}>
            <div style={{ width: 4, height: 6, borderRadius: 2, background: error ? "#fee2e2" : success ? "#dcfce7" : "#4ade80" }} />
            <div style={{ width: 4, height: 6, borderRadius: 2, background: error ? "#fee2e2" : success ? "#dcfce7" : "#4ade80" }} />
          </div>
          <div style={{ width: 10, height: 4, borderRadius: 2, background: error ? "#fee2e2" : success ? "#dcfce7" : "#22c55e" }} />
        </motion.div>

        {/* RIGHT ARM */}
        <motion.div
          animate={
            success
              ? {
                  x: 62,
                  y: -50,
                  rotate: 135,
                }
              : error
              ? {
                  x: 30,
                  y: -15,
                  rotate: -45,
                }
              : robotState === "COVER_EYES"
              ? {
                  x: 12,
                  y: -18,
                  rotate: -28,
                  zIndex: 25,
                }
              : robotState === "PEEK_EYES"
              ? {
                  x: 26,
                  y: 18,
                  rotate: -15,
                  zIndex: 25,
                }
              : {
                  x: 68,
                  y: 12,
                  rotate: [8, -4, 8],
                }
          }
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{
            position: "absolute",
            width: 24,
            height: 38,
            borderRadius: "12px",
            background: error
              ? "linear-gradient(135deg, #ef4444, #991b1b)"
              : success
              ? "linear-gradient(135deg, #4ade80, #16a34a)"
              : "linear-gradient(135deg, #1e2e1e, #0d170d)",
            border: error ? "2px solid #fca5a5" : success ? "2px solid #bbf7d0" : "1.5px solid #22c55e",
            boxShadow: error
              ? "0 0 12px rgba(239, 68, 68, 0.6)"
              : success
              ? "0 0 14px rgba(34, 197, 94, 0.7)"
              : "0 4px 10px rgba(0, 0, 0, 0.5)",
            zIndex: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 2px",
          }}
        >
          {/* Finger Pads */}
          <div style={{ display: "flex", gap: "2px" }}>
            <div style={{ width: 4, height: 6, borderRadius: 2, background: error ? "#fee2e2" : success ? "#dcfce7" : "#4ade80" }} />
            <div style={{ width: 4, height: 6, borderRadius: 2, background: error ? "#fee2e2" : success ? "#dcfce7" : "#4ade80" }} />
          </div>
          <div style={{ width: 10, height: 4, borderRadius: 2, background: error ? "#fee2e2" : success ? "#dcfce7" : "#22c55e" }} />
        </motion.div>

        {/* ROBOT HEAD CHASSIS (Curved Retro-Futuristic Monitor Head) */}
        <motion.div
          style={{
            rotate: headRotate,
            width: 142,
            height: 120,
            borderRadius: "26px",
            background: "linear-gradient(150deg, #162416 0%, #0b140b 60%, #050a05 100%)",
            border: error ? "2.5px solid #ef4444" : success ? "2.5px solid #4ade80" : "2px solid #22c55e",
            boxShadow: error
              ? "inset 0 0 20px rgba(239, 68, 68, 0.35), 0 0 30px rgba(239, 68, 68, 0.45)"
              : success
              ? "inset 0 0 25px rgba(34, 197, 94, 0.45), 0 0 35px rgba(34, 197, 94, 0.6)"
              : "inset 0 0 16px rgba(34, 197, 94, 0.2), 0 10px 25px rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 10,
            padding: "10px",
            boxSizing: "border-box",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          {/* Top Antenna Beacon with Emergency Strobe */}
          <div
            style={{
              position: "absolute",
              top: -24,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Antenna Orb Bulb */}
            <motion.div
              animate={
                error
                  ? {
                      scale: [1, 1.4, 1],
                      backgroundColor: ["#ef4444", "#ff0000", "#ef4444"],
                      boxShadow: [
                        "0 0 15px #ef4444",
                        "0 0 35px #ff0000",
                        "0 0 15px #ef4444",
                      ],
                    }
                  : success
                  ? {
                      scale: [1, 1.3, 1],
                      backgroundColor: ["#22c55e", "#4ade80", "#22c55e"],
                      boxShadow: [
                        "0 0 15px #22c55e",
                        "0 0 30px #4ade80",
                        "0 0 15px #22c55e",
                      ],
                    }
                  : {
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 8px #22c55e",
                        "0 0 14px #4ade80",
                        "0 0 8px #22c55e",
                      ],
                    }
              }
              transition={{
                duration: error ? 0.3 : success ? 0.6 : 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: error ? "#ef4444" : success ? "#22c55e" : "#22c55e",
                border: "2px solid #ffffff",
              }}
            />
            {/* Antenna Stem */}
            <div
              style={{
                width: 4,
                height: 10,
                backgroundColor: error ? "#991b1b" : success ? "#15803d" : "#1f3a1f",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Left Audio Muffler Ear */}
          <div
            style={{
              position: "absolute",
              left: -12,
              width: 12,
              height: 32,
              borderRadius: "6px",
              background: error ? "#ef4444" : success ? "#4ade80" : "#1b331b",
              border: "1.5px solid #22c55e",
              boxShadow: "0 0 8px rgba(34, 197, 94, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 3, height: 16, background: "#ffffff", borderRadius: 2 }} />
          </div>

          {/* Right Audio Muffler Ear */}
          <div
            style={{
              position: "absolute",
              right: -12,
              width: 12,
              height: 32,
              borderRadius: "6px",
              background: error ? "#ef4444" : success ? "#4ade80" : "#1b331b",
              border: "1.5px solid #22c55e",
              boxShadow: "0 0 8px rgba(34, 197, 94, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 3, height: 16, background: "#ffffff", borderRadius: 2 }} />
          </div>

          {/* INNER CRT VISOR SCREEN */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "18px",
              background: error
                ? "radial-gradient(circle at 50% 30%, #3b0707 0%, #1a0303 100%)"
                : success
                ? "radial-gradient(circle at 50% 30%, #052e16 0%, #021a0c 100%)"
                : "radial-gradient(circle at 50% 30%, #071a07 0%, #020a02 100%)",
              border: error ? "1.5px solid #ef4444" : "1.5px solid rgba(34, 197, 94, 0.4)",
              boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.9)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px",
            }}
          >
            {/* CRT Horizontal Scanlines */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.35) 50%)",
                backgroundSize: "100% 3px",
                pointerEvents: "none",
                zIndex: 5,
                opacity: 0.8,
              }}
            />

            {/* Top Visor Glass Reflection */}
            <div
              style={{
                position: "absolute",
                top: 3,
                left: 10,
                right: 10,
                height: 8,
                borderRadius: "10px",
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, transparent 100%)",
                zIndex: 6,
              }}
            />

            {/* DYNAMIC EYES CONTAINER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
                zIndex: 10,
                marginTop: "4px",
              }}
            >
              {/* CASE 1: RIGHT ANSWER (SUCCESS) -> Happy Stars / Arc Eyes */}
              {success ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], rotate: [-10, 10, -10] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    style={{
                      fontSize: "22px",
                      color: "#4ade80",
                      textShadow: "0 0 14px #22c55e, 0 0 24px #4ade80",
                      fontWeight: 900,
                    }}
                  >
                    ★
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], rotate: [10, -10, 10] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    style={{
                      fontSize: "22px",
                      color: "#4ade80",
                      textShadow: "0 0 14px #22c55e, 0 0 24px #4ade80",
                      fontWeight: 900,
                    }}
                  >
                    ★
                  </motion.div>
                </>
              ) : /* CASE 2: WRONG ANSWER (ERROR) -> Glitching [X X] Alarm Eyes */
              error ? (
                <>
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 0.9, 1.2, 1],
                      rotate: [-15, 15, -10, 10, 0],
                    }}
                    transition={{ duration: 0.35, repeat: Infinity }}
                    style={{
                      fontSize: "20px",
                      color: "#ef4444",
                      textShadow: "0 0 16px #ef4444, 0 0 25px #ff0000",
                      fontWeight: 900,
                      fontFamily: "monospace",
                    }}
                  >
                    ✖
                  </motion.div>
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 0.9, 1.2, 1],
                      rotate: [15, -15, 10, -10, 0],
                    }}
                    transition={{ duration: 0.35, repeat: Infinity }}
                    style={{
                      fontSize: "20px",
                      color: "#ef4444",
                      textShadow: "0 0 16px #ef4444, 0 0 25px #ff0000",
                      fontWeight: 900,
                      fontFamily: "monospace",
                    }}
                  >
                    ✖
                  </motion.div>
                </>
              ) : /* CASE 3: COVERING EYES (Password input focused & hidden) */
              robotState === "COVER_EYES" ? (
                <>
                  <div
                    style={{
                      width: 22,
                      height: 4,
                      borderRadius: "2px",
                      background: "#22c55e",
                      boxShadow: "0 0 10px #22c55e",
                    }}
                  />
                  <div
                    style={{
                      width: 22,
                      height: 4,
                      borderRadius: "2px",
                      background: "#22c55e",
                      boxShadow: "0 0 10px #22c55e",
                    }}
                  />
                </>
              ) : /* CASE 4: PEEKING EYE (Password visible) */
              robotState === "PEEK_EYES" ? (
                <>
                  {/* Closed Left Eye */}
                  <div
                    style={{
                      width: 22,
                      height: 4,
                      borderRadius: "2px",
                      background: "#22c55e",
                      boxShadow: "0 0 10px #22c55e",
                    }}
                  />
                  {/* Wide Open Peeking Right Eye */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{
                      width: 24,
                      height: 26,
                      borderRadius: "50%",
                      background: "radial-gradient(circle, #86efac 20%, #22c55e 70%, #15803d 100%)",
                      boxShadow: "0 0 16px #4ade80",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <motion.div
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        background: "#ffffff",
                        boxShadow: "0 0 6px #ffffff",
                        x: eyeX,
                        y: eyeY,
                      }}
                    />
                  </motion.div>
                </>
              ) : (
                /* CASE 5: NORMAL IDLE / SCANNING (Tracking Mouse Cursor) */
                <>
                  {/* Left Eye */}
                  <motion.div
                    style={{
                      width: 22,
                      height: isBlinking ? 3 : 26,
                      borderRadius: isBlinking ? "2px" : "10px",
                      background: "radial-gradient(circle, #86efac 15%, #22c55e 65%, #15803d 100%)",
                      boxShadow: "0 0 14px #22c55e, inset 0 1px 3px #ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "height 0.12s ease",
                    }}
                  >
                    {!isBlinking && (
                      <motion.div
                        style={{
                          width: 8,
                          height: 10,
                          borderRadius: "4px",
                          background: "#ffffff",
                          boxShadow: "0 0 6px #ffffff",
                          x: eyeX,
                          y: eyeY,
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Right Eye */}
                  <motion.div
                    style={{
                      width: 22,
                      height: isBlinking ? 3 : 26,
                      borderRadius: isBlinking ? "2px" : "10px",
                      background: "radial-gradient(circle, #86efac 15%, #22c55e 65%, #15803d 100%)",
                      boxShadow: "0 0 14px #22c55e, inset 0 1px 3px #ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "height 0.12s ease",
                    }}
                  >
                    {!isBlinking && (
                      <motion.div
                        style={{
                          width: 8,
                          height: 10,
                          borderRadius: "4px",
                          background: "#ffffff",
                          boxShadow: "0 0 6px #ffffff",
                          x: eyeX,
                          y: eyeY,
                        }}
                      />
                    )}
                  </motion.div>
                </>
              )}
            </div>

            {/* DIGITAL LED MOUTH */}
            <motion.div
              animate={
                success
                  ? {
                      width: 28,
                      height: 12,
                      borderRadius: "0 0 16px 16px",
                      backgroundColor: "#4ade80",
                      boxShadow: "0 0 12px #22c55e",
                    }
                  : error
                  ? {
                      width: 24,
                      height: 4,
                      borderRadius: "2px",
                      backgroundColor: "#ef4444",
                      boxShadow: "0 0 12px #ef4444",
                    }
                  : isCompiling
                  ? {
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: "#facc15",
                      boxShadow: "0 0 10px #facc15",
                    }
                  : robotState === "PEEK_EYES"
                  ? {
                      width: 14,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: "#4ade80",
                      boxShadow: "0 0 8px #22c55e",
                    }
                  : {
                      width: 18,
                      height: 6,
                      borderRadius: "0 0 10px 10px",
                      backgroundColor: "#22c55e",
                      boxShadow: "0 0 8px #22c55e",
                    }
              }
              style={{
                marginTop: "10px",
                zIndex: 10,
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
