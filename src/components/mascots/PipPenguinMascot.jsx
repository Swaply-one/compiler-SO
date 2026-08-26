import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Pip the Penguin Mascot
 * - Cute chubby baby penguin with soft knit pom-pom beanie
 * - Big glossy catchlight eyes following cursor
 * - Golden-orange smiling beak
 * - Cute penguin flipper wings covering eyes on password focus
 * - Peeking when password is shown
 */
export default function PipPenguinMascot({
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
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 4200);
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
          ? { x: [-5, 5, -5, 5, 0], rotate: [-3, 3, -3, 3, 0] }
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
      {/* Shadow */}
      <motion.div
        className="character-shadow"
        style={{ background: "radial-gradient(ellipse at center, rgba(14, 116, 144, 0.2) 0%, transparent 70%)" }}
        animate={success ? { scale: [1, 0.7, 1] } : { scale: [1, 0.92, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Penguin Head Body */}
      <motion.div
        className="character"
        style={{
          background: "radial-gradient(circle at 40% 30%, #1e293b 0%, #0f172a 70%, #020617 100%)",
          borderColor: "#334155",
          boxShadow:
            "inset 0 -12px 16px rgba(0, 0, 0, 0.4), inset 0 6px 12px rgba(255, 255, 255, 0.15), 0 20px 35px rgba(14, 165, 233, 0.15)",
        }}
        animate={{ scale: success ? 1.08 : error ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {/* Knit Beanie with Pom-Pom (Top) */}
        <motion.div
          style={{
            position: "absolute",
            top: -26,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 4,
          }}
          animate={success ? { rotate: [-15, 15, -15] } : { rotate: [-3, 3, -3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Fluffy Beanie Pom-Pom */}
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%, #ffffff 0%, #e0f2fe 60%, #38bdf8 100%)",
              boxShadow: "0 0 10px rgba(56, 189, 248, 0.5)",
              border: "2px solid #bae6fd",
            }}
          />
          {/* Beanie Cap Fold */}
          <div
            style={{
              width: 58,
              height: 18,
              borderRadius: "14px 14px 4px 4px",
              background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
              border: "2px solid #38bdf8",
              marginTop: -6,
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            }}
          />
        </motion.div>

        {/* White Penguin Face Mask */}
        <div
          className="character-face"
          style={{
            background: "#ffffff",
            inset: "24px 18px 16px",
            borderRadius: "48% 48% 44% 44% / 55% 55% 42% 42%",
          }}
        >
          {/* Eyes (Open) */}
          <div className="character-eyes" style={{ top: 34 }}>
            {/* Left Eye */}
            <motion.div
              className="eye"
              style={{ borderColor: "#0f172a", width: 34, height: 42 }}
              animate={{
                opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 0 : 1,
                scaleY: isBlinking ? 0.1 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <motion.div
                className="pupil"
                style={{
                  background: "radial-gradient(circle at 40% 35%, #0284c7 0%, #090d16 100%)",
                  x: eyeX,
                  y: eyeY,
                  width: 18,
                  height: 22,
                }}
              >
                <div className="pupil-highlight-large" />
                <div className="pupil-highlight-small" />
              </motion.div>
            </motion.div>

            {/* Right Eye */}
            <motion.div
              className="eye"
              style={{ borderColor: "#0f172a", width: 34, height: 42 }}
              animate={{
                opacity: state === "cover" || (isBlinking && state !== "peek") ? 0 : 1,
                scaleY: isBlinking && state !== "peek" ? 0.1 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <motion.div
                className="pupil"
                style={{
                  background: "radial-gradient(circle at 40% 35%, #0284c7 0%, #090d16 100%)",
                  x: eyeX,
                  y: eyeY,
                  width: 18,
                  height: 22,
                }}
              >
                <div className="pupil-highlight-large" />
                <div className="pupil-highlight-small" />
              </motion.div>
            </motion.div>
          </div>

          {/* Closed Eyes */}
          <div className="closed-eyes" style={{ top: 48 }}>
            <motion.div
              className="closed-eye-arc"
              style={{ borderTopColor: "#0f172a" }}
              animate={{
                opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 1 : 0,
                scaleY: state === "cover" || isBlinking ? 1 : 0.4,
              }}
              transition={{ duration: 0.12 }}
            />
            <motion.div
              className="closed-eye-arc"
              style={{ borderTopColor: "#0f172a" }}
              animate={{
                opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0,
                scaleY: state === "cover" || isBlinking ? 1 : 0.4,
              }}
              transition={{ duration: 0.12 }}
            />
          </div>

          {/* Cute Golden Orange Beak */}
          <div
            style={{
              position: "absolute",
              bottom: 22,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <motion.div
              style={{
                width: 24,
                height: 18,
                borderRadius: "50% 50% 60% 60%",
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                border: "1.5px solid #b45309",
                position: "relative",
              }}
              animate={
                success
                  ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }
                  : state === "peek"
                  ? { scale: 1.1 }
                  : {}
              }
            >
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  left: 4,
                  width: 6,
                  height: 3,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.6)",
                }}
              />
            </motion.div>
          </div>

          {/* Rosy Penguin Cheeks */}
          <motion.div
            className="blush blush-left"
            style={{ background: "rgba(244, 63, 94, 0.4)" }}
            animate={{
              opacity: state === "peek" || state === "success" ? 1 : 0.4,
              scale: state === "peek" || state === "success" ? 1.15 : 1,
            }}
          />
          <motion.div
            className="blush blush-right"
            style={{ background: "rgba(244, 63, 94, 0.4)" }}
            animate={{
              opacity: state === "peek" || state === "success" ? 1 : 0.4,
              scale: state === "peek" || state === "success" ? 1.15 : 1,
            }}
          />
        </div>

        {/* Penguin Flippers / Wings Covering Eyes */}
        <AnimatePresence>
          {(state === "cover" || state === "peek") && (
            <>
              {/* Left Flipper */}
              <motion.div
                className="paw paw-left"
                style={{
                  background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                  borderColor: "#334155",
                  borderRadius: "50% 50% 30% 30%",
                  zIndex: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                initial={{ x: -20, y: 50, rotate: 20, opacity: 0 }}
                animate={{
                  x: 56, // Centered right over left eye
                  y: -36,
                  rotate: 18,
                  opacity: 1,
                }}
                exit={{ x: -20, y: 50, rotate: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div
                  style={{
                    width: 32,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.15)",
                  }}
                />
              </motion.div>

              {/* Right Flipper */}
              <motion.div
                className="paw paw-right"
                style={{
                  background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                  borderColor: "#334155",
                  borderRadius: "50% 50% 30% 30%",
                  zIndex: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                initial={{ x: 20, y: 50, rotate: -20, opacity: 0 }}
                animate={
                  state === "peek"
                    ? {
                        x: -12, // Pulls down to peek
                        y: 16,
                        rotate: -28,
                        opacity: 1,
                      }
                    : {
                        x: -56, // Centered right over right eye
                        y: -36,
                        rotate: -18,
                        opacity: 1,
                      }
                }
                exit={{ x: 20, y: 50, rotate: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div
                  style={{
                    width: 32,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.15)",
                  }}
                />
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
                style={{ color: "#38bdf8" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1], y: [-5, -25] }}
              >
                ❄️
              </motion.span>
              <motion.span
                className="sparkle sparkle-2"
                style={{ color: "#0ea5e9" }}
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
