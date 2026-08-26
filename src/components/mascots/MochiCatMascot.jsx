import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Mochi the Cat Mascot
 * - Cute creamy kitty with caramel ear tips and pink inner pads
 * - Whiskers, cute cat nose, and (ω) smiling mouth
 * - Glossy catchlight cat pupils following cursor
 * - Cat paws with pink toe beans covering eyes on password focus
 * - Peeking when password is shown
 */
export default function MochiCatMascot({
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
    }, 4000);
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
        style={{ background: "radial-gradient(ellipse at center, rgba(180, 83, 9, 0.18) 0%, transparent 70%)" }}
        animate={success ? { scale: [1, 0.7, 1] } : { scale: [1, 0.92, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cat Head Body */}
      <motion.div
        className="character"
        style={{
          background: "radial-gradient(circle at 40% 30%, #fffbf5 0%, #fef3c7 65%, #fde68a 100%)",
          borderColor: "#f59e0b",
          boxShadow:
            "inset 0 -12px 16px rgba(217, 119, 6, 0.12), inset 0 6px 12px #ffffff, 0 20px 35px rgba(245, 158, 11, 0.12)",
        }}
        animate={{ scale: success ? 1.08 : error ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {/* Cat Ears */}
        <motion.div
          style={{
            position: "absolute",
            top: -24,
            left: 14,
            width: 54,
            height: 60,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "linear-gradient(135deg, #d97706 0%, #fef3c7 70%)",
            border: "2.5px solid #d97706",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: -1,
          }}
          animate={success ? { rotate: [-28, -18, -28] } : { rotate: [-22, -18, -22] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            style={{
              width: 28,
              height: 34,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              background: "#fecdd3",
              marginTop: 14,
            }}
          />
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            top: -24,
            right: 14,
            width: 54,
            height: 60,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "linear-gradient(225deg, #d97706 0%, #fef3c7 70%)",
            border: "2.5px solid #d97706",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: -1,
          }}
          animate={success ? { rotate: [28, 18, 28] } : { rotate: [22, 18, 22] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            style={{
              width: 28,
              height: 34,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              background: "#fecdd3",
              marginTop: 14,
            }}
          />
        </motion.div>

        {/* Tabby Forehead Stripes */}
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 3 }}>
          <div style={{ width: 4, height: 14, borderRadius: 2, background: "#f59e0b" }} />
          <div style={{ width: 4, height: 18, borderRadius: 2, background: "#f59e0b" }} />
          <div style={{ width: 4, height: 14, borderRadius: 2, background: "#f59e0b" }} />
        </div>

        {/* Face Frame */}
        <div className="character-face" style={{ background: "#ffffff" }}>
          {/* Whiskers */}
          <div style={{ position: "absolute", top: 84, left: 10, width: 18, height: 2, background: "#cbd5e1", borderRadius: 2, transform: "rotate(-6deg)" }} />
          <div style={{ position: "absolute", top: 92, left: 8, width: 18, height: 2, background: "#cbd5e1", borderRadius: 2, transform: "rotate(6deg)" }} />
          <div style={{ position: "absolute", top: 84, right: 10, width: 18, height: 2, background: "#cbd5e1", borderRadius: 2, transform: "rotate(6deg)" }} />
          <div style={{ position: "absolute", top: 92, right: 8, width: 18, height: 2, background: "#cbd5e1", borderRadius: 2, transform: "rotate(-6deg)" }} />

          {/* Eyes (Open) */}
          <div className="character-eyes">
            {/* Left Eye */}
            <motion.div
              className="eye"
              style={{ borderColor: "#78350f" }}
              animate={{
                opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 0 : 1,
                scaleY: isBlinking ? 0.1 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <motion.div
                className="pupil"
                style={{
                  background: "radial-gradient(circle at 40% 35%, #b45309 0%, #1c1917 100%)",
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
              style={{ borderColor: "#78350f" }}
              animate={{
                opacity: state === "cover" || (isBlinking && state !== "peek") ? 0 : 1,
                scaleY: isBlinking && state !== "peek" ? 0.1 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <motion.div
                className="pupil"
                style={{
                  background: "radial-gradient(circle at 40% 35%, #b45309 0%, #1c1917 100%)",
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
              style={{ borderTopColor: "#78350f" }}
              animate={{
                opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 1 : 0,
                scaleY: state === "cover" || isBlinking ? 1 : 0.4,
              }}
              transition={{ duration: 0.12 }}
            />
            <motion.div
              className="closed-eye-arc"
              style={{ borderTopColor: "#78350f" }}
              animate={{
                opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0,
                scaleY: state === "cover" || isBlinking ? 1 : 0.4,
              }}
              transition={{ duration: 0.12 }}
            />
          </div>

          {/* Cat Nose & Mouth (ω) */}
          <div className="character-snout" style={{ background: "transparent", boxShadow: "none" }}>
            {/* Cute Pink Cat Nose */}
            <div
              style={{
                width: 12,
                height: 9,
                borderRadius: "50% 50% 60% 60%",
                background: "#f43f5e",
                marginTop: 6,
              }}
            />

            {/* Cat Mouth (ω) */}
            <motion.div
              style={{
                marginTop: 2,
                border: "2px solid #78350f",
                borderTop: 0,
                background: "transparent",
              }}
              animate={
                success
                  ? { width: 24, height: 14, borderRadius: "0 0 16px 16px", background: "#f43f5e" }
                  : error
                  ? { width: 16, height: 6, borderRadius: "10px 10px 0 0", marginTop: 4 }
                  : state === "peek"
                  ? { width: 16, height: 10, borderRadius: "50%", background: "#f43f5e" }
                  : { width: 16, height: 7, borderRadius: "0 0 12px 12px" }
              }
            />
          </div>

          {/* Soft Cheeks */}
          <motion.div
            className="blush blush-left"
            style={{ background: "rgba(251, 113, 133, 0.45)" }}
            animate={{
              opacity: state === "peek" || state === "success" ? 1 : 0.4,
              scale: state === "peek" || state === "success" ? 1.15 : 1,
            }}
          />
          <motion.div
            className="blush blush-right"
            style={{ background: "rgba(251, 113, 133, 0.45)" }}
            animate={{
              opacity: state === "peek" || state === "success" ? 1 : 0.4,
              scale: state === "peek" || state === "success" ? 1.15 : 1,
            }}
          />
        </div>

        {/* Creamy Cat Paws with Pink Toe Beans */}
        <AnimatePresence>
          {(state === "cover" || state === "peek") && (
            <>
              <motion.div
                className="paw paw-left"
                style={{
                  background: "radial-gradient(circle at 50% 30%, #fffbeb 0%, #fef3c7 100%)",
                  borderColor: "#f59e0b",
                  zIndex: 30,
                }}
                initial={{ x: -20, y: 50, rotate: 20, opacity: 0 }}
                animate={{
                  x: 56, // Centered right over left eye
                  y: -36,
                  rotate: 15,
                  opacity: 1,
                }}
                exit={{ x: -20, y: 50, rotate: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div className="paw-toes">
                  <div className="paw-toe" style={{ background: "#fecdd3" }} />
                  <div className="paw-toe" style={{ background: "#fecdd3" }} />
                  <div className="paw-toe" style={{ background: "#fecdd3" }} />
                </div>
                <div className="paw-main-pad" style={{ background: "#fecdd3" }} />
              </motion.div>

              <motion.div
                className="paw paw-right"
                style={{
                  background: "radial-gradient(circle at 50% 30%, #fffbeb 0%, #fef3c7 100%)",
                  borderColor: "#f59e0b",
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
                        x: -56, // Centered right over right eye
                        y: -36,
                        rotate: -15,
                        opacity: 1,
                      }
                }
                exit={{ x: 20, y: 50, rotate: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div className="paw-toes">
                  <div className="paw-toe" style={{ background: "#fecdd3" }} />
                  <div className="paw-toe" style={{ background: "#fecdd3" }} />
                  <div className="paw-toe" style={{ background: "#fecdd3" }} />
                </div>
                <div className="paw-main-pad" style={{ background: "#fecdd3" }} />
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
                style={{ color: "#f59e0b" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1], y: [-5, -25] }}
              >
                ✦
              </motion.span>
              <motion.span
                className="sparkle sparkle-2"
                style={{ color: "#f43f5e" }}
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
