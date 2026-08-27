import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

export default function FoxPandaMascot({
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
          ? { y: [-4, -25, -4], rotate: [-3, 3, -3] }
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
      {/* Warm Shadow */}
      <motion.div
        className="character-shadow"
        style={{ background: "radial-gradient(ellipse at center, rgba(124, 45, 18, 0.22) 0%, transparent 70%)" }}
        animate={success ? { scale: [1, 0.7, 1] } : { scale: [1, 0.92, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Fox Head Body */}
      <motion.div
        className="character"
        style={{
          background: "radial-gradient(circle at 45% 30%, #fb923c 0%, #ea580c 70%, #c2410c 100%)",
          borderColor: "#9a3412",
          boxShadow: "inset 0 -12px 16px rgba(124, 45, 18, 0.35), inset 0 6px 12px rgba(255, 255, 255, 0.4), 0 20px 35px rgba(234, 88, 12, 0.16)"
        }}
        animate={{ scale: success ? 1.08 : error ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {/* Fluffy Forehead Mark */}
        <div style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 18,
          height: 24,
          background: "rgba(255, 255, 255, 0.35)",
          borderRadius: "50% 50% 40% 40%",
          filter: "blur(1px)"
        }} />

        {/* Pointy Fox Ears with White Fluff */}
        <motion.div
          style={{
            position: "absolute",
            top: -30,
            left: 10,
            width: 58,
            height: 72,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "linear-gradient(135deg, #18181b 0%, #ea580c 45%)",
            border: "2px solid #7c2d12",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: -1
          }}
          animate={success ? { rotate: [-25, -15, -25] } : { rotate: [-20, -16, -20] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={{
            width: 32,
            height: 44,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "#fef3c7",
            marginTop: 18
          }} />
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            top: -30,
            right: 10,
            width: 58,
            height: 72,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "linear-gradient(225deg, #18181b 0%, #ea580c 45%)",
            border: "2px solid #7c2d12",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: -1
          }}
          animate={success ? { rotate: [25, 15, 25] } : { rotate: [20, 16, 20] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={{
            width: 32,
            height: 44,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "#fef3c7",
            marginTop: 18
          }} />
        </motion.div>

        {/* White Cheek / Muzzle Mask */}
        <div style={{
          position: "absolute",
          inset: "36px 14px 14px",
          borderRadius: "50% 50% 46% 46% / 40% 40% 55% 55%",
          background: "#ffffff",
          boxShadow: "inset 0 -4px 8px rgba(0, 0, 0, 0.05)",
          overflow: "hidden"
        }}>
          {/* Whiskers */}
          <div style={{ position: "absolute", top: 58, left: 10, width: 16, height: 2, background: "#cbd5e1", borderRadius: 2 }} />
          <div style={{ position: "absolute", top: 66, left: 8, width: 18, height: 2, background: "#cbd5e1", borderRadius: 2 }} />
          <div style={{ position: "absolute", top: 58, right: 10, width: 16, height: 2, background: "#cbd5e1", borderRadius: 2 }} />
          <div style={{ position: "absolute", top: 66, right: 8, width: 18, height: 2, background: "#cbd5e1", borderRadius: 2 }} />

          {/* Glossy Amber Eyes */}
          <div style={{
            position: "absolute",
            top: 24,
            left: 26,
            right: 26,
            display: "flex",
            justifyContent: "space-between"
          }}>
            {/* Left Eye */}
            <motion.div
              className="eye"
              style={{ borderColor: "#14532d" }}
              animate={{
                opacity: state === "cover" || state === "peek" || isBlinking ? 0 : 1,
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
                  y: eyeY
                }}
              >
                <div className="pupil-highlight-large" />
                <div className="pupil-highlight-small" />
              </motion.div>
            </motion.div>

            {/* Right Eye */}
            <motion.div
              className="eye"
              style={{ borderColor: "#14532d" }}
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
                  y: eyeY
                }}
              >
                <div className="pupil-highlight-large" />
                <div className="pupil-highlight-small" />
              </motion.div>
            </motion.div>
          </div>

          {/* Closed Eyes */}
          <div style={{ position: "absolute", top: 38, left: 26, right: 26, display: "flex", justifyContent: "space-between", pointerEvents: "none" }}>
            <motion.div
              className="closed-eye-arc"
              style={{ borderTopColor: "#451a03" }}
              animate={{
                opacity: state === "cover" || state === "peek" || isBlinking ? 1 : 0,
                scaleY: state === "cover" || state === "peek" || isBlinking ? 1 : 0.4,
              }}
              transition={{ duration: 0.12 }}
            />
            <motion.div
              className="closed-eye-arc"
              style={{ borderTopColor: "#451a03" }}
              animate={{
                opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0,
                scaleY: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0.4,
              }}
              transition={{ duration: 0.12 }}
            />
          </div>

          {/* Cute Black Snout Nose & Mouth */}
          <div style={{
            position: "absolute",
            bottom: 22,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div style={{
              width: 16,
              height: 11,
              borderRadius: "50% 50% 60% 60%",
              background: "#1c1917",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: 2,
                left: 3,
                width: 4,
                height: 2.5,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.7)"
              }} />
            </div>

            <motion.div
              style={{
                marginTop: 2,
                border: "2.5px solid #1c1917",
                borderTop: 0,
                background: "#ea580c"
              }}
              animate={
                success
                  ? { width: 26, height: 14, borderRadius: "0 0 18px 18px" }
                  : error
                  ? { width: 18, height: 7, borderRadius: "12px 12px 0 0", marginTop: 4 }
                  : state === "peek"
                  ? { width: 16, height: 11, borderRadius: "50%" }
                  : { width: 16, height: 8, borderRadius: "0 0 14px 14px" }
              }
            />
          </div>
        </div>

        {/* Chocolate Brown Paws - Directly Covering Eyes */}
        <AnimatePresence>
          {(state === "cover" || state === "peek") && (
            <>
              <motion.div
                className="paw paw-left"
                style={{
                  background: "radial-gradient(circle at 50% 30%, #451a03 0%, #292524 100%)",
                  borderColor: "#78350f",
                  zIndex: 30
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
                  <div className="paw-toe" style={{ background: "#fb923c" }} />
                  <div className="paw-toe" style={{ background: "#fb923c" }} />
                  <div className="paw-toe" style={{ background: "#fb923c" }} />
                </div>
                <div className="paw-main-pad" style={{ background: "#fb923c" }} />
              </motion.div>

              <motion.div
                className="paw paw-right"
                style={{
                  background: "radial-gradient(circle at 50% 30%, #451a03 0%, #292524 100%)",
                  borderColor: "#78350f",
                  zIndex: 30
                }}
                initial={{ x: 20, y: 50, rotate: -20, opacity: 0 }}
                animate={
                  state === "peek"
                    ? {
                        x: -12, // Pulls down to peek!
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
                ✦
              </motion.span>
              <motion.span
                className="sparkle sparkle-2"
                style={{ color: "#f59e0b" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1], y: [-5, -25] }}
              >
                ✦
              </motion.span>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
