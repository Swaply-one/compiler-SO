import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Byte: The Retro CRT Computer Terminal Mascot (NON-ANIMAL)
 * - Vintage beige/grey CRT monitor chassis with rounded screen
 * - Glowing phosphor green / amber pixel eyes tracking cursor
 * - Floppy disk slot & status LEDs
 * - Cute mechanical keyboard/floppy hands covering screen on password focus & peek!
 */
export default function RetroTerminalMascot({
  passwordFocused,
  passwordVisible,
  error,
  success,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!passwordFocused) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 140);
      }
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, [passwordFocused]);

  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 20 });

  const eyeX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const eyeY = useTransform(smoothY, [-1, 1], [-5, 5]);

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

  const state = useMemo(() => {
    if (success) return "success";
    if (error) return "error";
    if (passwordFocused && !passwordVisible) return "cover";
    if (passwordFocused && passwordVisible) return "peek";
    return "normal";
  }, [passwordFocused, passwordVisible, error, success]);

  return (
    <motion.div
      className="character-wrapper"
      animate={
        success
          ? { y: [-4, -24, -4], rotate: [-3, 3, -3] }
          : error
          ? { x: [-6, 6, -6, 6, 0], rotate: [-3, 3, -3, 3, 0] }
          : { y: [0, -6, 0] }
      }
      transition={
        success
          ? { duration: 0.7, ease: "easeInOut" }
          : error
          ? { duration: 0.45 }
          : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
      }
      whileHover={{ scale: 1.03 }}
    >
      {/* Contact Shadow */}
      <motion.div
        className="character-shadow"
        style={{ background: "radial-gradient(ellipse at center, rgba(34, 197, 94, 0.25) 0%, transparent 70%)" }}
        animate={success ? { scale: [1, 0.7, 1] } : { scale: [1, 0.92, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Retro Computer Monitor Chassis */}
      <motion.div
        style={{
          position: "relative",
          width: 230,
          height: 220,
          borderRadius: "28px",
          background: "radial-gradient(circle at 40% 25%, #f8fafc 0%, #e2e8f0 55%, #cbd5e1 100%)",
          border: "3px solid #94a3b8",
          boxShadow:
            "inset 0 -10px 16px rgba(100, 116, 139, 0.3), inset 0 6px 10px #ffffff, 0 20px 40px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 16px 12px",
          userSelect: "none",
        }}
        animate={{ scale: success ? 1.08 : error ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {/* Top Antenna / Handle */}
        <motion.div
          style={{
            position: "absolute",
            top: -18,
            width: 44,
            height: 16,
            borderRadius: "10px 10px 0 0",
            border: "3px solid #94a3b8",
            borderBottom: 0,
            background: "transparent",
          }}
        />

        {/* Curved CRT Glass Screen Bezel */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 145,
            borderRadius: "20px",
            background: "radial-gradient(circle at 50% 20%, #1e293b 0%, #090d14 100%)",
            border: "2.5px solid #334155",
            boxShadow:
              "inset 0 4px 12px rgba(255, 255, 255, 0.15), inset 0 -4px 12px rgba(0, 0, 0, 0.9), 0 4px 12px rgba(0, 0, 0, 0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* CRT Scanline Effect */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
              backgroundSize: "100% 4px",
              pointerEvents: "none",
              zIndex: 10,
              opacity: 0.6,
            }}
          />

          {/* Top Glass Shimmer */}
          <div
            style={{
              position: "absolute",
              top: 4,
              left: 12,
              right: 12,
              height: 10,
              borderRadius: "12px",
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, transparent 100%)",
              zIndex: 11,
            }}
          />

          {/* Glowing Green Phosphor Eyes */}
          <div
            style={{
              position: "relative",
              width: 120,
              display: "flex",
              justifyContent: "space-between",
              zIndex: 5,
            }}
          >
            {/* Left Eye */}
            <motion.div
              style={{
                width: 32,
                height: 42,
                borderRadius: "14px",
                background: "linear-gradient(180deg, #86efac 0%, #22c55e 60%, #15803d 100%)",
                boxShadow: "0 0 16px #22c55e, inset 0 2px 4px #ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              animate={{
                opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 0 : 1,
                scaleY: isBlinking ? 0.1 : 1,
                x: eyeX,
                y: eyeY,
              }}
              transition={{ duration: 0.12 }}
            />

            {/* Right Eye */}
            <motion.div
              style={{
                width: 32,
                height: 42,
                borderRadius: "14px",
                background: "linear-gradient(180deg, #86efac 0%, #22c55e 60%, #15803d 100%)",
                boxShadow: "0 0 16px #22c55e, inset 0 2px 4px #ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              animate={{
                opacity: state === "cover" || (isBlinking && state !== "peek") ? 0 : 1,
                scaleY: isBlinking && state !== "peek" ? 0.1 : 1,
                x: eyeX,
                y: eyeY,
              }}
              transition={{ duration: 0.12 }}
            />
          </div>

          {/* Closed Digital Arc Lines (︶ ‿ ︶) */}
          <div style={{ position: "absolute", top: 52, left: 24, right: 24, display: "flex", justifyContent: "space-between", pointerEvents: "none", zIndex: 6 }}>
            <motion.div
              style={{ width: 34, height: 12, borderRadius: "50%", borderBottom: "4px solid #22c55e", boxShadow: "0 4px 10px rgba(34, 197, 94, 0.9)" }}
              animate={{ opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 1 : 0 }}
              transition={{ duration: 0.12 }}
            />
            <motion.div
              style={{ width: 34, height: 12, borderRadius: "50%", borderBottom: "4px solid #22c55e", boxShadow: "0 4px 10px rgba(34, 197, 94, 0.9)" }}
              animate={{ opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0 }}
              transition={{ duration: 0.12 }}
            />
          </div>

          {/* Digital Smile */}
          <motion.div
            style={{
              marginTop: 14,
              border: "3px solid #22c55e",
              borderTop: 0,
              boxShadow: "0 0 8px #22c55e",
              zIndex: 5,
            }}
            animate={
              success
                ? { width: 32, height: 14, borderRadius: "0 0 16px 16px", background: "#4ade80" }
                : error
                ? { width: 20, height: 4, borderRadius: "2px" }
                : state === "peek"
                ? { width: 16, height: 12, borderRadius: "50%", background: "#4ade80" }
                : { width: 22, height: 8, borderRadius: "0 0 12px 12px" }
            }
          />
        </div>

        {/* Lower Chin: Floppy Slot, Power Button, Status LEDs */}
        <div
          style={{
            width: "100%",
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 6px",
          }}
        >
          {/* 3.5" Floppy Disk Slot */}
          <div
            style={{
              width: 80,
              height: 7,
              borderRadius: "4px",
              background: "#64748b",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.6)",
            }}
          />

          {/* Status LEDs */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <motion.div
              style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#f59e0b", opacity: 0.8 }} />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #cbd5e1, #94a3b8)",
                border: "1.5px solid #64748b",
                boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        </div>

        {/* Cute Floppy Disk / Keyboard Hands Covering Screen */}
        <AnimatePresence>
          {(state === "cover" || state === "peek") && (
            <>
              {/* Left Hand */}
              <motion.div
                style={{
                  position: "absolute",
                  width: 58,
                  height: 52,
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
                  border: "2px solid #0369a1",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.35), inset 0 2px 4px #bae6fd",
                  zIndex: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 900,
                }}
                initial={{ x: -40, y: 80, rotate: 20, opacity: 0 }}
                animate={{
                  x: -36, // Covers left screen eye
                  y: -24,
                  rotate: 12,
                  opacity: 1,
                }}
                exit={{ x: -40, y: 80, rotate: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                💾
              </motion.div>

              {/* Right Hand */}
              <motion.div
                style={{
                  position: "absolute",
                  width: 58,
                  height: 52,
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
                  border: "2px solid #0369a1",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.35), inset 0 2px 4px #bae6fd",
                  zIndex: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: 900,
                }}
                initial={{ x: 40, y: 80, rotate: -20, opacity: 0 }}
                animate={
                  state === "peek"
                    ? {
                        x: 48, // Lowers to peek
                        y: 35,
                        rotate: -24,
                        opacity: 1,
                      }
                    : {
                        x: 36, // Covers right screen eye
                        y: -24,
                        rotate: -12,
                        opacity: 1,
                      }
                }
                exit={{ x: 40, y: 80, rotate: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                💾
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Success Sparks */}
        <AnimatePresence>
          {success && (
            <>
              <motion.span
                className="sparkle sparkle-1"
                style={{ color: "#22c55e" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1], y: [-5, -25] }}
              >
                ⚡
              </motion.span>
              <motion.span
                className="sparkle sparkle-2"
                style={{ color: "#38bdf8" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1], y: [-5, -25] }}
              >
                ✨
              </motion.span>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
