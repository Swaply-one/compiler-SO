import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Frodo the Matcha Froggy Mascot
 * - Bright matcha green cheerful frog with big round eyes on top
 * - Wide friendly smiling mouth & blushing cheeks
 * - Glossy catchlight eyes tracking cursor
 * - Cute suction-pad froggy hands covering eyes on password focus & peek!
 */
export default function MatchaFrogMascot({
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
        style={{ background: "radial-gradient(ellipse at center, rgba(34, 197, 94, 0.22) 0%, transparent 70%)" }}
        animate={success ? { scale: [1, 0.7, 1] } : { scale: [1, 0.92, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Froggy Head Body */}
      <motion.div
        className="character"
        style={{
          background: "radial-gradient(circle at 40% 30%, #86efac 0%, #4ade80 55%, #22c55e 85%, #16a34a 100%)",
          borderColor: "#15803d",
          boxShadow:
            "inset 0 -12px 16px rgba(21, 128, 61, 0.35), inset 0 6px 12px rgba(255, 255, 255, 0.4), 0 20px 35px rgba(34, 197, 94, 0.2)",
        }}
        animate={{ scale: success ? 1.08 : error ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {/* Big Top Froggy Eye Bulges */}
        <motion.div
          style={{
            position: "absolute",
            top: -24,
            left: 14,
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, #86efac 0%, #22c55e 60%, #16a34a 100%)",
            border: "2.5px solid #15803d",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          animate={success ? { rotate: [-10, 10, -10] } : {}}
        >
            {/* Eye in socket */}
            <motion.div
              className="eye"
              style={{ width: 38, height: 42, borderColor: "#14532d" }}
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
          </motion.div>

          <motion.div
            style={{
              position: "absolute",
              top: -24,
              right: 14,
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%, #86efac 0%, #22c55e 60%, #16a34a 100%)",
              border: "2.5px solid #15803d",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            animate={success ? { rotate: [10, -10, 10] } : {}}
          >
            {/* Eye in socket */}
            <motion.div
              className="eye"
              style={{ width: 38, height: 42, borderColor: "#14532d" }}
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
        </motion.div>

        {/* Closed Eyes */}
        <div style={{ position: "absolute", top: -8, left: 24, right: 24, display: "flex", justifyContent: "space-between", pointerEvents: "none", zIndex: 2 }}>
          <motion.div
            className="closed-eye-arc"
            style={{ borderTopColor: "#14532d", width: 36 }}
            animate={{
              opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 1 : 0,
              scaleY: state === "cover" || isBlinking ? 1 : 0.4,
            }}
            transition={{ duration: 0.12 }}
          />
          <motion.div
            className="closed-eye-arc"
            style={{ borderTopColor: "#14532d", width: 36 }}
            animate={{
              opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0,
              scaleY: state === "cover" || isBlinking ? 1 : 0.4,
            }}
            transition={{ duration: 0.12 }}
          />
        </div>

        {/* Little Crown / Lilypad on Top */}
        <motion.div
          style={{
            position: "absolute",
            top: -20,
            left: "50%",
            transform: "translateX(-50%)",
            width: 24,
            height: 16,
            borderRadius: "50% 50% 10% 10%",
            background: "linear-gradient(135deg, #facc15 0%, #eab308 100%)",
            border: "1.5px solid #ca8a04",
            boxShadow: "0 0 8px rgba(250, 204, 21, 0.6)",
            zIndex: 4,
          }}
          animate={success ? { rotate: [-15, 15, -15], scale: [1, 1.2, 1] } : {}}
        />

        {/* Cream Froggy Tummy Patch */}
        <div
          className="character-face"
          style={{
            background: "radial-gradient(circle at 50% 40%, #ffffff 0%, #fefce8 60%, #fef08a 100%)",
            inset: "40px 18px 14px",
            borderRadius: "45% 45% 50% 50%",
            border: "2px solid #ca8a04",
          }}
        >
          {/* Little Nostrils */}
          <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 10 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#14532d" }} />
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#14532d" }} />
          </div>

          {/* Wide Happy Froggy Mouth */}
          <motion.div
            style={{
              position: "absolute",
              top: 26,
              left: "50%",
              transform: "translateX(-50%)",
              border: "2.5px solid #14532d",
              borderTop: 0,
            }}
            animate={
              success
                ? { width: 44, height: 22, borderRadius: "0 0 26px 26px", background: "#f43f5e" }
                : error
                ? { width: 24, height: 8, borderRadius: "14px 14px 0 0" }
                : state === "peek"
                ? { width: 32, height: 16, borderRadius: "0 0 20px 20px", background: "#f43f5e" }
                : { width: 34, height: 12, borderRadius: "0 0 20px 20px" }
            }
          />

          {/* Rosy Cheeks */}
          <motion.div
            className="blush blush-left"
            style={{ background: "rgba(251, 113, 133, 0.5)", top: 16 }}
            animate={{
              opacity: state === "peek" || state === "success" ? 1 : 0.45,
              scale: state === "peek" || state === "success" ? 1.15 : 1,
            }}
          />
          <motion.div
            className="blush blush-right"
            style={{ background: "rgba(251, 113, 133, 0.5)", top: 16 }}
            animate={{
              opacity: state === "peek" || state === "success" ? 1 : 0.45,
              scale: state === "peek" || state === "success" ? 1.15 : 1,
            }}
          />
        </div>

        {/* Cute Webbed Froggy Hands with Round Pads */}
        <AnimatePresence>
          {(state === "cover" || state === "peek") && (
            <>
              <motion.div
                className="paw paw-left"
                style={{
                  background: "radial-gradient(circle at 50% 30%, #86efac 0%, #22c55e 100%)",
                  borderColor: "#15803d",
                  zIndex: 30,
                  top: 55,
                }}
                initial={{ x: -20, y: 50, rotate: 20, opacity: 0 }}
                animate={{
                  x: 52, // Covers left eye
                  y: -58,
                  rotate: 15,
                  opacity: 1,
                }}
                exit={{ x: -20, y: 50, rotate: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div className="paw-toes">
                  <div className="paw-toe" style={{ background: "#fef08a", width: 12, height: 12 }} />
                  <div className="paw-toe" style={{ background: "#fef08a", width: 12, height: 12 }} />
                  <div className="paw-toe" style={{ background: "#fef08a", width: 12, height: 12 }} />
                </div>
                <div className="paw-main-pad" style={{ background: "#fef08a" }} />
              </motion.div>

              <motion.div
                className="paw paw-right"
                style={{
                  background: "radial-gradient(circle at 50% 30%, #86efac 0%, #22c55e 100%)",
                  borderColor: "#15803d",
                  zIndex: 30,
                  top: 55,
                }}
                initial={{ x: 20, y: 50, rotate: -20, opacity: 0 }}
                animate={
                  state === "peek"
                    ? {
                        x: -10, // Lowered to peek
                        y: 10,
                        rotate: -28,
                        opacity: 1,
                      }
                    : {
                        x: -52, // Covers right eye
                        y: -58,
                        rotate: -15,
                        opacity: 1,
                      }
                }
                exit={{ x: 20, y: 50, rotate: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div className="paw-toes">
                  <div className="paw-toe" style={{ background: "#fef08a", width: 12, height: 12 }} />
                  <div className="paw-toe" style={{ background: "#fef08a", width: 12, height: 12 }} />
                  <div className="paw-toe" style={{ background: "#fef08a", width: 12, height: 12 }} />
                </div>
                <div className="paw-main-pad" style={{ background: "#fef08a" }} />
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
                🐸
              </motion.span>
              <motion.span
                className="sparkle sparkle-2"
                style={{ color: "#eab308" }}
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
