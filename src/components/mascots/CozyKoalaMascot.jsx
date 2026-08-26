import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Ollie the Cozy Koala Mascot
 * - Fuzzy grey coat with large fluffy white ears
 * - Iconic large smooth dark oval koala nose
 * - Glossy catchlight eyes tracking cursor
 * - Charcoal koala paws with pink pads covering eyes on password focus & peek!
 */
export default function CozyKoalaMascot({
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
        style={{ background: "radial-gradient(ellipse at center, rgba(100, 116, 139, 0.22) 0%, transparent 70%)" }}
        animate={success ? { scale: [1, 0.7, 1] } : { scale: [1, 0.92, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Koala Head Body */}
      <motion.div
        className="character"
        style={{
          background: "radial-gradient(circle at 40% 30%, #f1f5f9 0%, #cbd5e1 60%, #94a3b8 100%)",
          borderColor: "#64748b",
          boxShadow:
            "inset 0 -12px 16px rgba(71, 85, 105, 0.25), inset 0 6px 12px #ffffff, 0 20px 35px rgba(100, 116, 139, 0.15)",
        }}
        animate={{ scale: success ? 1.08 : error ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {/* Large Fluffy Koala Ears */}
        <motion.div
          style={{
            position: "absolute",
            top: -16,
            left: -18,
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, #cbd5e1 0%, #94a3b8 70%, #64748b 100%)",
            border: "2.5px solid #64748b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: -1,
          }}
          animate={success ? { rotate: [-24, -14, -24] } : { rotate: [-18, -14, -18] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Fluffy White Inner Ear */}
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#ffffff", border: "2px solid #e2e8f0" }} />
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            top: -16,
            right: -18,
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, #cbd5e1 0%, #94a3b8 70%, #64748b 100%)",
            border: "2.5px solid #64748b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: -1,
          }}
          animate={success ? { rotate: [24, 14, 24] } : { rotate: [18, 14, 18] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Fluffy White Inner Ear */}
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#ffffff", border: "2px solid #e2e8f0" }} />
        </motion.div>

        {/* Eucalyptus Leaf on Top */}
        <motion.div
          style={{
            position: "absolute",
            top: -16,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            zIndex: 3,
          }}
          animate={success ? { rotate: [-15, 15, -15] } : { rotate: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            style={{
              width: 14,
              height: 22,
              borderRadius: "50% 50% 10% 50%",
              background: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
              boxShadow: "0 0 8px rgba(16, 185, 129, 0.5)",
              transform: "rotate(-20deg)",
            }}
          />
        </motion.div>

        {/* Face Frame */}
        <div className="character-face" style={{ background: "#ffffff" }}>
          {/* Eyes (Open) */}
          <div className="character-eyes">
            {/* Left Eye */}
            <motion.div
              className="eye"
              style={{ borderColor: "#1e293b" }}
              animate={{
                opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 0 : 1,
                scaleY: isBlinking ? 0.1 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <motion.div
                className="pupil"
                style={{
                  background: "radial-gradient(circle at 40% 35%, #334155 0%, #0f172a 100%)",
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
              style={{ borderColor: "#1e293b" }}
              animate={{
                opacity: state === "cover" || (isBlinking && state !== "peek") ? 0 : 1,
                scaleY: isBlinking && state !== "peek" ? 0.1 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <motion.div
                className="pupil"
                style={{
                  background: "radial-gradient(circle at 40% 35%, #334155 0%, #0f172a 100%)",
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
          <div className="closed-eyes">
            <motion.div
              className="closed-eye-arc"
              style={{ borderTopColor: "#1e293b" }}
              animate={{
                opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 1 : 0,
                scaleY: state === "cover" || isBlinking ? 1 : 0.4,
              }}
              transition={{ duration: 0.12 }}
            />
            <motion.div
              className="closed-eye-arc"
              style={{ borderTopColor: "#1e293b" }}
              animate={{
                opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0,
                scaleY: state === "cover" || isBlinking ? 1 : 0.4,
              }}
              transition={{ duration: 0.12 }}
            />
          </div>

          {/* Big Iconic Koala Nose & Mouth */}
          <div className="character-snout" style={{ background: "transparent", boxShadow: "none", bottom: 10 }}>
            {/* Big Smooth Dark Oval Koala Nose */}
            <div
              style={{
                width: 32,
                height: 44,
                borderRadius: "50% 50% 46% 46% / 55% 55% 45% 45%",
                background: "radial-gradient(circle at 40% 30%, #334155 0%, #0f172a 70%, #020617 100%)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", top: 6, left: 8, width: 8, height: 4, borderRadius: "50%", background: "rgba(255, 255, 255, 0.7)" }} />
            </div>

            {/* Cute Smile */}
            <motion.div
              className="character-mouth"
              style={{ borderColor: "#1e293b", marginTop: 2 }}
              animate={
                success
                  ? { width: 24, height: 12, borderRadius: "0 0 16px 16px", background: "#fda4af" }
                  : error
                  ? { width: 16, height: 6, borderRadius: "10px 10px 0 0" }
                  : state === "peek"
                  ? { width: 16, height: 10, borderRadius: "50%", background: "#fda4af" }
                  : { width: 16, height: 7, borderRadius: "0 0 12px 12px" }
              }
            />
          </div>

          {/* Soft Cheeks */}
          <motion.div
            className="blush blush-left"
            style={{ background: "rgba(244, 114, 182, 0.45)" }}
            animate={{
              opacity: state === "peek" || state === "success" ? 1 : 0.4,
              scale: state === "peek" || state === "success" ? 1.15 : 1,
            }}
          />
          <motion.div
            className="blush blush-right"
            style={{ background: "rgba(244, 114, 182, 0.45)" }}
            animate={{
              opacity: state === "peek" || state === "success" ? 1 : 0.4,
              scale: state === "peek" || state === "success" ? 1.15 : 1,
            }}
          />
        </div>

        {/* Charcoal Koala Paws with Pink Toe Beans */}
        <AnimatePresence>
          {(state === "cover" || state === "peek") && (
            <>
              <motion.div
                className="paw paw-left"
                style={{
                  background: "radial-gradient(circle at 50% 30%, #475569 0%, #1e293b 100%)",
                  borderColor: "#334155",
                  zIndex: 30,
                }}
                initial={{ x: -20, y: 50, rotate: 20, opacity: 0 }}
                animate={{
                  x: 56, // Covers left eye
                  y: -36,
                  rotate: 15,
                  opacity: 1,
                }}
                exit={{ x: -20, y: 50, rotate: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div className="paw-toes">
                  <div className="paw-toe" style={{ background: "#fda4af" }} />
                  <div className="paw-toe" style={{ background: "#fda4af" }} />
                  <div className="paw-toe" style={{ background: "#fda4af" }} />
                </div>
                <div className="paw-main-pad" style={{ background: "#fda4af" }} />
              </motion.div>

              <motion.div
                className="paw paw-right"
                style={{
                  background: "radial-gradient(circle at 50% 30%, #475569 0%, #1e293b 100%)",
                  borderColor: "#334155",
                  zIndex: 30,
                }}
                initial={{ x: 20, y: 50, rotate: -20, opacity: 0 }}
                animate={
                  state === "peek"
                    ? {
                        x: -12, // Lowered to peek
                        y: 16,
                        rotate: -28,
                        opacity: 1,
                      }
                    : {
                        x: -56, // Covers right eye
                        y: -36,
                        rotate: -15,
                        opacity: 1,
                      }
                }
                exit={{ x: 20, y: 50, rotate: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div className="paw-toes">
                  <div className="paw-toe" style={{ background: "#fda4af" }} />
                  <div className="paw-toe" style={{ background: "#fda4af" }} />
                  <div className="paw-toe" style={{ background: "#fda4af" }} />
                </div>
                <div className="paw-main-pad" style={{ background: "#fda4af" }} />
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
                style={{ color: "#10b981" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1], y: [-5, -25] }}
              >
                🌿
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
