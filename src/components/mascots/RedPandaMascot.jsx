import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Nori the Red Panda Mascot
 * - Auburn & cream color palette with cute white brow spots
 * - Fluffy white-rimmed ears
 * - Glossy catchlight eyes tracking cursor
 * - Soft chocolate paws with cinnamon pads covering eyes on password focus & peek!
 */
export default function RedPandaMascot({
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
        style={{ background: "radial-gradient(ellipse at center, rgba(194, 65, 12, 0.22) 0%, transparent 70%)" }}
        animate={success ? { scale: [1, 0.7, 1] } : { scale: [1, 0.92, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Red Panda Head Body */}
      <motion.div
        className="character"
        style={{
          background: "radial-gradient(circle at 40% 30%, #fb923c 0%, #ea580c 60%, #c2410c 100%)",
          borderColor: "#9a3412",
          boxShadow:
            "inset 0 -12px 16px rgba(154, 52, 18, 0.35), inset 0 6px 12px rgba(255, 255, 255, 0.3), 0 20px 35px rgba(234, 88, 12, 0.2)",
        }}
        animate={{ scale: success ? 1.08 : error ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {/* Fluffy Red Panda Ears */}
        <motion.div
          style={{
            position: "absolute",
            top: -24,
            left: 8,
            width: 58,
            height: 60,
            borderRadius: "50% 50% 10% 50%",
            background: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
            border: "2.5px solid #9a3412",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: -1,
          }}
          animate={success ? { rotate: [-28, -18, -28] } : { rotate: [-22, -18, -22] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* White Inner Fluff */}
          <div style={{ width: 30, height: 32, borderRadius: "50% 50% 10% 50%", background: "#ffffff", border: "1.5px solid #fed7aa" }} />
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            top: -24,
            right: 8,
            width: 58,
            height: 60,
            borderRadius: "50% 50% 50% 10%",
            background: "linear-gradient(225deg, #ea580c 0%, #c2410c 100%)",
            border: "2.5px solid #9a3412",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: -1,
          }}
          animate={success ? { rotate: [28, 18, 28] } : { rotate: [22, 18, 22] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* White Inner Fluff */}
          <div style={{ width: 30, height: 32, borderRadius: "50% 50% 50% 10%", background: "#ffffff", border: "1.5px solid #fed7aa" }} />
        </motion.div>

        {/* Cute White Eyebrow Spots (Maromayu) */}
        <div style={{ position: "absolute", top: 22, left: 38, width: 14, height: 18, borderRadius: "50%", background: "#ffffff", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }} />
        <div style={{ position: "absolute", top: 22, right: 38, width: 14, height: 18, borderRadius: "50%", background: "#ffffff", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }} />

        {/* White Cheek / Muzzle Mask */}
        <div
          className="character-face"
          style={{
            background: "#ffffff",
            inset: "34px 14px 14px",
            borderRadius: "50% 50% 46% 46% / 40% 40% 55% 55%",
            border: "2px solid #fed7aa",
          }}
        >
          {/* Tear Mark Stripes under eyes */}
          <div style={{ position: "absolute", top: 48, left: 16, width: 8, height: 24, borderRadius: "4px", background: "#c2410c", transform: "rotate(-15deg)" }} />
          <div style={{ position: "absolute", top: 48, right: 16, width: 8, height: 24, borderRadius: "4px", background: "#c2410c", transform: "rotate(15deg)" }} />

          {/* Eyes (Open) */}
          <div className="character-eyes">
            {/* Left Eye */}
            <motion.div
              className="eye"
              style={{ borderColor: "#451a03" }}
              animate={{
                opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 0 : 1,
                scaleY: isBlinking ? 0.1 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <motion.div
                className="pupil"
                style={{
                  background: "radial-gradient(circle at 40% 35%, #78350f 0%, #1c1917 100%)",
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
              style={{ borderColor: "#451a03" }}
              animate={{
                opacity: state === "cover" || (isBlinking && state !== "peek") ? 0 : 1,
                scaleY: isBlinking && state !== "peek" ? 0.1 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <motion.div
                className="pupil"
                style={{
                  background: "radial-gradient(circle at 40% 35%, #78350f 0%, #1c1917 100%)",
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

          {/* Cute Black Snout Nose & Smile */}
          <div className="character-snout" style={{ background: "transparent", boxShadow: "none" }}>
            <div
              style={{
                width: 14,
                height: 10,
                borderRadius: "50% 50% 60% 60%",
                background: "#1c1917",
                marginTop: 6,
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", top: 2, left: 3, width: 4, height: 2, borderRadius: "50%", background: "rgba(255, 255, 255, 0.8)" }} />
            </div>

            <motion.div
              className="character-mouth"
              style={{ borderColor: "#1c1917" }}
              animate={
                success
                  ? { width: 26, height: 14, borderRadius: "0 0 18px 18px", background: "#f43f5e" }
                  : error
                  ? { width: 18, height: 6, borderRadius: "10px 10px 0 0" }
                  : state === "peek"
                  ? { width: 16, height: 10, borderRadius: "50%", background: "#f43f5e" }
                  : { width: 16, height: 8, borderRadius: "0 0 14px 14px" }
              }
            />
          </div>

          {/* Rosy Cheeks */}
          <motion.div
            className="blush blush-left"
            style={{ background: "rgba(251, 146, 60, 0.5)" }}
            animate={{
              opacity: state === "peek" || state === "success" ? 1 : 0.45,
              scale: state === "peek" || state === "success" ? 1.15 : 1,
            }}
          />
          <motion.div
            className="blush blush-right"
            style={{ background: "rgba(251, 146, 60, 0.5)" }}
            animate={{
              opacity: state === "peek" || state === "success" ? 1 : 0.45,
              scale: state === "peek" || state === "success" ? 1.15 : 1,
            }}
          />
        </div>

        {/* Chocolate Paws with Cinnamon Toe Beans */}
        <AnimatePresence>
          {(state === "cover" || state === "peek") && (
            <>
              <motion.div
                className="paw paw-left"
                style={{
                  background: "radial-gradient(circle at 50% 30%, #451a03 0%, #1c1917 100%)",
                  borderColor: "#78350f",
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
                  <div className="paw-toe" style={{ background: "#fb923c" }} />
                  <div className="paw-toe" style={{ background: "#fb923c" }} />
                  <div className="paw-toe" style={{ background: "#fb923c" }} />
                </div>
                <div className="paw-main-pad" style={{ background: "#fb923c" }} />
              </motion.div>

              <motion.div
                className="paw paw-right"
                style={{
                  background: "radial-gradient(circle at 50% 30%, #451a03 0%, #1c1917 100%)",
                  borderColor: "#78350f",
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
                  <div className="paw-toe" style={{ background: "#fb923c" }} />
                  <div className="paw-toe" style={{ background: "#fb923c" }} />
                  <div className="paw-toe" style={{ background: "#fb923c" }} />
                </div>
                <div className="paw-main-pad" style={{ background: "#fb923c" }} />
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
                style={{ color: "#ea580c" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1], y: [-5, -25] }}
              >
                🍁
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
