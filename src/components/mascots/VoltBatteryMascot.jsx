import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Volt: The Floating Energy Battery Cell Mascot (NON-ANIMAL)
 * - Cylindrical power battery cell with top lightning electrode
 * - Glowing green charge meter bars
 * - Glossy electric eyes tracking cursor
 * - Floating plasma energy hands covering eyes on password focus & peek!
 */
export default function VoltBatteryMascot({
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
      {/* Contact Floor Glow */}
      <motion.div
        className="character-shadow"
        style={{ background: "radial-gradient(ellipse at center, rgba(34, 197, 94, 0.4) 0%, transparent 70%)" }}
        animate={success ? { scale: [1, 0.7, 1] } : { scale: [1, 0.92, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Battery Cylinder Body */}
      <motion.div
        style={{
          position: "relative",
          width: 200,
          height: 230,
          borderRadius: "32px",
          background: "radial-gradient(circle at 40% 30%, #1e293b 0%, #0f172a 70%, #020617 100%)",
          border: "3px solid #22c55e",
          boxShadow:
            "inset 0 -14px 18px rgba(0, 0, 0, 0.8), inset 0 6px 12px rgba(34, 197, 94, 0.3), 0 20px 40px rgba(34, 197, 94, 0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 18px",
          userSelect: "none",
        }}
        animate={{ scale: success ? 1.08 : error ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {/* Top Battery Terminal / Lightning Electrode */}
        <motion.div
          style={{
            position: "absolute",
            top: -22,
            width: 44,
            height: 20,
            borderRadius: "8px 8px 0 0",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            border: "2px solid #4ade80",
            boxShadow: "0 0 12px rgba(34, 197, 94, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: "11px",
            fontWeight: 900,
          }}
          animate={success ? { scale: [1, 1.25, 1] } : {}}
        >
          ⚡
        </motion.div>

        {/* Eyes (Open) */}
        <div
          style={{
            position: "relative",
            width: 120,
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Left Eye */}
          <motion.div
            className="eye"
            style={{ borderColor: "#14532d", width: 34, height: 44, background: "#052e16" }}
            animate={{
              opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 0 : 1,
              scaleY: isBlinking ? 0.1 : 1,
            }}
            transition={{ duration: 0.12 }}
          >
            <motion.div
              className="pupil"
              style={{
                background: "radial-gradient(circle at 40% 35%, #86efac 0%, #22c55e 60%, #15803d 100%)",
                boxShadow: "0 0 10px #22c55e",
                x: eyeX,
                y: eyeY,
              }}
            >
              <div className="pupil-highlight-large" />
              <div className="pupil-highlight-small" />
            </motion.div>
          </motion.div>

          {/* Right Eye */}
          <motion.div
            className="eye"
            style={{ borderColor: "#14532d", width: 34, height: 44, background: "#052e16" }}
            animate={{
              opacity: state === "cover" || (isBlinking && state !== "peek") ? 0 : 1,
              scaleY: isBlinking && state !== "peek" ? 0.1 : 1,
            }}
            transition={{ duration: 0.12 }}
          >
            <motion.div
              className="pupil"
              style={{
                background: "radial-gradient(circle at 40% 35%, #86efac 0%, #22c55e 60%, #15803d 100%)",
                boxShadow: "0 0 10px #22c55e",
                x: eyeX,
                y: eyeY,
              }}
            >
              <div className="pupil-highlight-large" />
              <div className="pupil-highlight-small" />
            </motion.div>
          </motion.div>
        </div>

        {/* Closed Digital Eyes */}
        <div style={{ position: "absolute", top: 58, left: 35, right: 35, display: "flex", justifyContent: "space-between", pointerEvents: "none" }}>
          <motion.div
            className="closed-eye-arc"
            style={{ borderTopColor: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
            animate={{
              opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 1 : 0,
              scaleY: state === "cover" || isBlinking ? 1 : 0.4,
            }}
            transition={{ duration: 0.12 }}
          />
          <motion.div
            className="closed-eye-arc"
            style={{ borderTopColor: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
            animate={{
              opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0,
              scaleY: state === "cover" || isBlinking ? 1 : 0.4,
            }}
            transition={{ duration: 0.12 }}
          />
        </div>

        {/* Cute Digital Smile */}
        <motion.div
          style={{
            marginTop: 18,
            border: "2.5px solid #22c55e",
            borderTop: 0,
            boxShadow: "0 0 8px #22c55e",
          }}
          animate={
            success
              ? { width: 28, height: 16, borderRadius: "0 0 20px 20px", background: "#4ade80" }
              : error
              ? { width: 18, height: 6, borderRadius: "10px 10px 0 0" }
              : state === "peek"
              ? { width: 18, height: 12, borderRadius: "50%", background: "#4ade80" }
              : { width: 18, height: 9, borderRadius: "0 0 16px 16px" }
          }
        />

        {/* Glowing Charge Level Bars */}
        <div style={{ marginTop: 22, display: "flex", gap: 6 }}>
          <motion.div
            style={{ width: 24, height: 8, borderRadius: "3px", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            style={{ width: 24, height: 8, borderRadius: "3px", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            style={{ width: 24, height: 8, borderRadius: "3px", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
        </div>

        {/* Floating Plasma Hands Covering Eyes */}
        <AnimatePresence>
          {(state === "cover" || state === "peek") && (
            <>
              <motion.div
                style={{
                  position: "absolute",
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 30%, #86efac 0%, #22c55e 60%, #15803d 100%)",
                  border: "2px solid #4ade80",
                  boxShadow: "0 0 16px rgba(34, 197, 94, 0.8), 0 8px 16px rgba(0,0,0,0.3)",
                  zIndex: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "14px",
                }}
                initial={{ x: -30, y: 60, rotate: 20, opacity: 0 }}
                animate={{
                  x: -36, // Covers left eye
                  y: -36,
                  rotate: 15,
                  opacity: 1,
                }}
                exit={{ x: -30, y: 60, rotate: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                ⚡
              </motion.div>

              <motion.div
                style={{
                  position: "absolute",
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 30%, #86efac 0%, #22c55e 60%, #15803d 100%)",
                  border: "2px solid #4ade80",
                  boxShadow: "0 0 16px rgba(34, 197, 94, 0.8), 0 8px 16px rgba(0,0,0,0.3)",
                  zIndex: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "14px",
                }}
                initial={{ x: 30, y: 60, rotate: -20, opacity: 0 }}
                animate={
                  state === "peek"
                    ? {
                        x: 48, // Lowers to peek
                        y: 18,
                        rotate: -28,
                        opacity: 1,
                      }
                    : {
                        x: 36, // Covers right eye
                        y: -36,
                        rotate: -15,
                        opacity: 1,
                      }
                }
                exit={{ x: 30, y: 60, rotate: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                ⚡
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
                style={{ color: "#4ade80" }}
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
