import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Mocha: The Cozy Coffee Mug Mascot (NON-ANIMAL)
 * - Ceramic warm latte/coffee cup with ceramic side handle
 * - Animated warm rising steam wisps
 * - Glossy catchlight eyes tracking cursor
 * - Cute marshmallow hands covering eyes on password focus & peek!
 */
export default function CozyCoffeeMascot({
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
        style={{ background: "radial-gradient(ellipse at center, rgba(180, 83, 9, 0.22) 0%, transparent 70%)" }}
        animate={success ? { scale: [1, 0.7, 1] } : { scale: [1, 0.92, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated Rising Steam Wisps */}
      <div style={{ position: "absolute", top: -38, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 14, zIndex: 1 }}>
        <motion.div
          style={{ width: 6, height: 26, borderRadius: "50%", background: "linear-gradient(180deg, transparent 0%, rgba(217, 119, 6, 0.4) 100%)", filter: "blur(2px)" }}
          animate={{ y: [0, -18, -28], opacity: [0, 0.8, 0], scaleX: [1, 1.4, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{ width: 8, height: 32, borderRadius: "50%", background: "linear-gradient(180deg, transparent 0%, rgba(217, 119, 6, 0.5) 100%)", filter: "blur(2px)" }}
          animate={{ y: [0, -22, -34], opacity: [0, 0.9, 0], scaleX: [1, 1.3, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          style={{ width: 6, height: 24, borderRadius: "50%", background: "linear-gradient(180deg, transparent 0%, rgba(217, 119, 6, 0.4) 100%)", filter: "blur(2px)" }}
          animate={{ y: [0, -16, -26], opacity: [0, 0.7, 0], scaleX: [1, 1.5, 0.8] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
        />
      </div>

      {/* Ceramic Coffee Mug Body */}
      <motion.div
        style={{
          position: "relative",
          width: 210,
          height: 210,
          borderRadius: "32px 32px 42px 42px",
          background: "radial-gradient(circle at 40% 30%, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)",
          border: "3px solid #d97706",
          boxShadow:
            "inset 0 -14px 18px rgba(180, 83, 9, 0.25), inset 0 8px 14px #ffffff, 0 20px 40px rgba(217, 119, 6, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "24px 18px",
          userSelect: "none",
        }}
        animate={{ scale: success ? 1.08 : error ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {/* Ceramic Mug Side Handle */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: -36,
            width: 48,
            height: 85,
            borderRadius: "0 34px 34px 0",
            border: "12px solid #fde68a",
            borderLeft: 0,
            boxShadow: "4px 4px 10px rgba(217, 119, 6, 0.2), inset 0 2px 4px #ffffff",
            zIndex: -1,
          }}
        />

        {/* Coffee Surface Rim Top */}
        <div
          style={{
            position: "absolute",
            top: -12,
            width: 170,
            height: 32,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, #78350f 0%, #451a03 70%, #292524 100%)",
            border: "3px solid #d97706",
            boxShadow: "inset 0 2px 6px rgba(255,255,255,0.4), 0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Latte Art Heart / Swirl */}
          <div style={{ width: 28, height: 18, borderRadius: "50%", background: "#fef3c7", opacity: 0.85 }} />
        </div>

        {/* Eyes (Open) */}
        <div
          style={{
            position: "relative",
            width: 120,
            marginTop: 32,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Left Eye */}
          <motion.div
            className="eye"
            style={{ borderColor: "#14532d", width: 34, height: 42 }}
            animate={{
              opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 0 : 1,
              scaleY: isBlinking ? 0.1 : 1,
            }}
            transition={{ duration: 0.12 }}
          >
            <motion.div
              className="pupil"
              style={{
                background: "radial-gradient(circle at 40% 35%, #4ade80 0%, #22c55e 55%, #15803d 100%)",
                boxShadow: "0 0 8px rgba(34, 197, 94, 0.45)",
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
            style={{ borderColor: "#14532d", width: 34, height: 42 }}
            animate={{
              opacity: state === "cover" || (isBlinking && state !== "peek") ? 0 : 1,
              scaleY: isBlinking && state !== "peek" ? 0.1 : 1,
            }}
            transition={{ duration: 0.12 }}
          >
            <motion.div
              className="pupil"
              style={{
                background: "radial-gradient(circle at 40% 35%, #4ade80 0%, #22c55e 55%, #15803d 100%)",
                boxShadow: "0 0 8px rgba(34, 197, 94, 0.45)",
                x: eyeX,
                y: eyeY,
              }}
            >
              <div className="pupil-highlight-large" />
              <div className="pupil-highlight-small" />
            </motion.div>
          </motion.div>
        </div>

        {/* Closed Eyes */}
        <div style={{ position: "absolute", top: 62, left: 35, right: 35, display: "flex", justifyContent: "space-between", pointerEvents: "none" }}>
          <motion.div
            className="closed-eye-arc"
            style={{ borderTopColor: "#451a03" }}
            animate={{
              opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 1 : 0,
              scaleY: state === "cover" || isBlinking ? 1 : 0.4,
            }}
            transition={{ duration: 0.12 }}
          />
          <motion.div
            className="closed-eye-arc"
            style={{ borderTopColor: "#451a03" }}
            animate={{
              opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0,
              scaleY: state === "cover" || isBlinking ? 1 : 0.4,
            }}
            transition={{ duration: 0.12 }}
          />
        </div>

        {/* Cute Smiling Mouth */}
        <motion.div
          className="character-mouth"
          style={{ borderColor: "#451a03", marginTop: 18 }}
          animate={
            success
              ? { width: 28, height: 16, borderRadius: "0 0 20px 20px", background: "#f43f5e" }
              : error
              ? { width: 18, height: 6, borderRadius: "10px 10px 0 0" }
              : state === "peek"
              ? { width: 18, height: 12, borderRadius: "50%", background: "#f43f5e" }
              : { width: 18, height: 9, borderRadius: "0 0 16px 16px" }
          }
        />

        {/* Rosy Cheeks */}
        <motion.div
          className="blush blush-left"
          style={{ background: "rgba(251, 146, 60, 0.55)", top: 88, left: 24 }}
          animate={{
            opacity: state === "peek" || state === "success" ? 1 : 0.45,
            scale: state === "peek" || state === "success" ? 1.15 : 1,
          }}
        />
        <motion.div
          className="blush blush-right"
          style={{ background: "rgba(251, 146, 60, 0.55)", top: 88, right: 24 }}
          animate={{
            opacity: state === "peek" || state === "success" ? 1 : 0.45,
            scale: state === "peek" || state === "success" ? 1.15 : 1,
          }}
        />

        {/* Coffee Bean Stamp on Lower Belly */}
        <div
          style={{
            marginTop: 18,
            width: 22,
            height: 28,
            borderRadius: "50%",
            background: "#b45309",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 3, height: 22, borderRadius: "2px", background: "#fef3c7" }} />
        </div>

        {/* Marshmallow Hands Covering Eyes */}
        <AnimatePresence>
          {(state === "cover" || state === "peek") && (
            <>
              <motion.div
                style={{
                  position: "absolute",
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 30%, #ffffff 0%, #fef3c7 70%, #fde68a 100%)",
                  border: "2.5px solid #d97706",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.25), inset 0 2px 4px #ffffff",
                  zIndex: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                initial={{ x: -30, y: 60, rotate: 20, opacity: 0 }}
                animate={{
                  x: -36, // Covers left eye
                  y: -40,
                  rotate: 15,
                  opacity: 1,
                }}
                exit={{ x: -30, y: 60, rotate: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fcd34d" }} />
              </motion.div>

              <motion.div
                style={{
                  position: "absolute",
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 30%, #ffffff 0%, #fef3c7 70%, #fde68a 100%)",
                  border: "2.5px solid #d97706",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.25), inset 0 2px 4px #ffffff",
                  zIndex: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                        y: -40,
                        rotate: -15,
                        opacity: 1,
                      }
                }
                exit={{ x: 30, y: 60, rotate: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fcd34d" }} />
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
                style={{ color: "#d97706" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1], y: [-5, -25] }}
              >
                ☕
              </motion.span>
              <motion.span
                className="sparkle sparkle-2"
                style={{ color: "#f59e0b" }}
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
