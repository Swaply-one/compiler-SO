import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Luna the Lop-Eared Bunny Mascot
 * - Sweet pastel cream bunny with long floppy ears & pink inner pads
 * - Glossy ruby/plum catchlight pupils following cursor
 * - Twitchy pink bunny nose & smiling mouth
 * - Soft bunny paws with pink pads covering eyes on password focus & peek!
 */
export default function LopBunnyMascot({
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
    }, 3900);
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
        style={{ background: "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.18) 0%, transparent 70%)" }}
        animate={success ? { scale: [1, 0.7, 1] } : { scale: [1, 0.92, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Head Body */}
      <motion.div
        className="character"
        style={{
          background: "radial-gradient(circle at 40% 30%, #fff5f7 0%, #fdf2f8 65%, #fce7f3 100%)",
          borderColor: "#f472b6",
          boxShadow:
            "inset 0 -12px 16px rgba(244, 114, 182, 0.15), inset 0 6px 12px #ffffff, 0 20px 35px rgba(244, 114, 182, 0.15)",
        }}
        animate={{ scale: success ? 1.08 : error ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {/* Fluffy Forehead Hair Tuft */}
        <motion.div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 2,
            zIndex: 3,
          }}
          animate={success ? { rotate: [-15, 15, -15] } : { rotate: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={{ width: 10, height: 16, borderRadius: "50%", background: "#fdf2f8", border: "1.5px solid #f472b6", transform: "rotate(-15deg)" }} />
          <div style={{ width: 12, height: 20, borderRadius: "50%", background: "#ffffff", border: "1.5px solid #f472b6", marginTop: -4 }} />
          <div style={{ width: 10, height: 16, borderRadius: "50%", background: "#fdf2f8", border: "1.5px solid #f472b6", transform: "rotate(15deg)" }} />
        </motion.div>

        {/* Long Floppy Lop Bunny Ears (Hanging down with bounce!) */}
        <motion.div
          style={{
            position: "absolute",
            top: 25,
            left: -32,
            width: 38,
            height: 95,
            borderRadius: "50% 50% 45% 45%",
            background: "linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)",
            border: "2px solid #f472b6",
            boxShadow: "0 6px 14px rgba(244, 114, 182, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: -1,
          }}
          animate={success ? { rotate: [-24, -12, -24], y: [-5, 5, -5] } : { rotate: [-16, -10, -16] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={{ width: 20, height: 75, borderRadius: "50%", background: "#fbcfe8" }} />
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            top: 25,
            right: -32,
            width: 38,
            height: 95,
            borderRadius: "50% 50% 45% 45%",
            background: "linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)",
            border: "2px solid #f472b6",
            boxShadow: "0 6px 14px rgba(244, 114, 182, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: -1,
          }}
          animate={success ? { rotate: [24, 12, 24], y: [-5, 5, -5] } : { rotate: [16, 10, 16] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={{ width: 20, height: 75, borderRadius: "50%", background: "#fbcfe8" }} />
        </motion.div>

        {/* Face Frame */}
        <div className="character-face" style={{ background: "#ffffff" }}>
          {/* Eyes (Open) */}
          <div className="character-eyes">
            {/* Left Eye */}
            <motion.div
              className="eye"
              style={{ borderColor: "#831843" }}
              animate={{
                opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 0 : 1,
                scaleY: isBlinking ? 0.1 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <motion.div
                className="pupil"
                style={{
                  background: "radial-gradient(circle at 40% 35%, #db2777 0%, #831843 60%, #500724 100%)",
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
              style={{ borderColor: "#831843" }}
              animate={{
                opacity: state === "cover" || (isBlinking && state !== "peek") ? 0 : 1,
                scaleY: isBlinking && state !== "peek" ? 0.1 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <motion.div
                className="pupil"
                style={{
                  background: "radial-gradient(circle at 40% 35%, #db2777 0%, #831843 60%, #500724 100%)",
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
              style={{ borderTopColor: "#831843" }}
              animate={{
                opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 1 : 0,
                scaleY: state === "cover" || isBlinking ? 1 : 0.4,
              }}
              transition={{ duration: 0.12 }}
            />
            <motion.div
              className="closed-eye-arc"
              style={{ borderTopColor: "#831843" }}
              animate={{
                opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0,
                scaleY: state === "cover" || isBlinking ? 1 : 0.4,
              }}
              transition={{ duration: 0.12 }}
            />
          </div>

          {/* Bunny Snout with Pink Nose & Mouth */}
          <div className="character-snout" style={{ background: "transparent", boxShadow: "none" }}>
            <div
              style={{
                width: 14,
                height: 10,
                borderRadius: "50% 50% 60% 60%",
                background: "#ec4899",
                marginTop: 6,
                boxShadow: "0 2px 4px rgba(236, 72, 153, 0.3)",
              }}
            />

            <motion.div
              className="character-mouth"
              style={{ borderColor: "#831843" }}
              animate={
                success
                  ? { width: 24, height: 14, borderRadius: "0 0 20px 20px", background: "#f43f5e" }
                  : error
                  ? { width: 18, height: 7, borderRadius: "12px 12px 0 0", marginTop: 4 }
                  : state === "peek"
                  ? { width: 16, height: 10, borderRadius: "50%", background: "#f43f5e" }
                  : { width: 16, height: 8, borderRadius: "0 0 14px 14px" }
              }
            />
          </div>

          {/* Rosy Cheeks */}
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

        {/* Soft Bunny Paws with Pink Toe Beans */}
        <AnimatePresence>
          {(state === "cover" || state === "peek") && (
            <>
              <motion.div
                className="paw paw-left"
                style={{
                  background: "radial-gradient(circle at 50% 30%, #fff5f7 0%, #fce7f3 100%)",
                  borderColor: "#f472b6",
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
                  <div className="paw-toe" style={{ background: "#f472b6" }} />
                  <div className="paw-toe" style={{ background: "#f472b6" }} />
                  <div className="paw-toe" style={{ background: "#f472b6" }} />
                </div>
                <div className="paw-main-pad" style={{ background: "#f472b6" }} />
              </motion.div>

              <motion.div
                className="paw paw-right"
                style={{
                  background: "radial-gradient(circle at 50% 30%, #fff5f7 0%, #fce7f3 100%)",
                  borderColor: "#f472b6",
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
                  <div className="paw-toe" style={{ background: "#f472b6" }} />
                  <div className="paw-toe" style={{ background: "#f472b6" }} />
                  <div className="paw-toe" style={{ background: "#f472b6" }} />
                </div>
                <div className="paw-main-pad" style={{ background: "#f472b6" }} />
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
                style={{ color: "#ec4899" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1], y: [-5, -25] }}
              >
                🌸
              </motion.span>
              <motion.span
                className="sparkle sparkle-2"
                style={{ color: "#f472b6" }}
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
