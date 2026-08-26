import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

export default function CyberBotMascot({
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
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, [passwordFocused]);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 22 });

  const eyeX = useTransform(smoothX, [-1, 1], [-9, 9]);
  const eyeY = useTransform(smoothY, [-1, 1], [-6, 6]);

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
          ? { y: [-4, -25, -4], rotate: [-2, 2, -2] }
          : error
          ? { x: [-6, 6, -6, 6, 0], rotate: [-3, 3, -3, 3, 0] }
          : { y: [0, -8, 0] }
      }
      transition={
        success
          ? { duration: 0.65, ease: "easeInOut" }
          : error
          ? { duration: 0.45 }
          : { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }
      whileHover={{ scale: 1.03 }}
    >
      {/* Floating Shadow */}
      <motion.div
        className="character-shadow"
        style={{ background: "radial-gradient(ellipse at center, rgba(14, 165, 233, 0.28) 0%, transparent 70%)" }}
        animate={success ? { scale: [1, 0.65, 1] } : { scale: [1, 0.88, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bot Head Body */}
      <motion.div
        className="character"
        style={{
          background: "radial-gradient(circle at 35% 25%, #ffffff 0%, #e2e8f0 60%, #cbd5e1 100%)",
          borderColor: "#94a3b8",
          boxShadow: "inset 0 -10px 16px rgba(100, 116, 139, 0.2), inset 0 6px 12px #fff, 0 20px 35px rgba(14, 165, 233, 0.15)"
        }}
        animate={{ scale: success ? 1.08 : error ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        {/* Antenna with Glowing Orb */}
        <motion.div
          style={{
            position: "absolute",
            top: -24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
          }}
          animate={success ? { rotate: [-15, 15, -15] } : { rotate: [-4, 4, -4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "radial-gradient(circle, #38bdf8 0%, #0284c7 100%)",
            boxShadow: "0 0 14px #38bdf8",
            border: "2px solid #fff"
          }} />
          <div style={{
            width: 4,
            height: 12,
            background: "#94a3b8",
            borderRadius: "2px"
          }} />
        </motion.div>

        {/* Side Headset Ear-Pads */}
        <div style={{
          position: "absolute",
          left: -14,
          top: 55,
          width: 24,
          height: 48,
          borderRadius: "10px",
          background: "linear-gradient(135deg, #0284c7, #0369a1)",
          border: "2px solid #38bdf8",
          boxShadow: "0 0 10px rgba(56, 189, 248, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: -1
        }}>
          <div style={{ width: 6, height: 20, borderRadius: 3, background: "#38bdf8", boxShadow: "0 0 6px #38bdf8" }} />
        </div>

        <div style={{
          position: "absolute",
          right: -14,
          top: 55,
          width: 24,
          height: 48,
          borderRadius: "10px",
          background: "linear-gradient(135deg, #0284c7, #0369a1)",
          border: "2px solid #38bdf8",
          boxShadow: "0 0 10px rgba(56, 189, 248, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: -1
        }}>
          <div style={{ width: 6, height: 20, borderRadius: 3, background: "#38bdf8", boxShadow: "0 0 6px #38bdf8" }} />
        </div>

        {/* Glossy Dark Visor */}
        <div style={{
          position: "absolute",
          inset: "20px 18px",
          borderRadius: "38px",
          background: "radial-gradient(circle at 50% 20%, #1e293b 0%, #090d16 100%)",
          border: "2px solid rgba(56, 189, 248, 0.3)",
          boxShadow: "inset 0 4px 12px rgba(255, 255, 255, 0.15), 0 4px 15px rgba(0, 0, 0, 0.4)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {/* Top Visor Glass Reflection */}
          <div style={{
            position: "absolute",
            top: 6,
            left: 20,
            right: 20,
            height: 12,
            borderRadius: "20px",
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, transparent 100%)"
          }} />

          {/* Glowing Eyes on Visor */}
          <div style={{
            position: "absolute",
            top: 38,
            left: 28,
            right: 28,
            display: "flex",
            justifyContent: "space-between"
          }}>
            {/* Left Eye */}
            <motion.div
              style={{
                width: 34,
                height: 38,
                borderRadius: "50%",
                background: "#0284c7",
                boxShadow: "0 0 16px #38bdf8",
                border: "2px solid #38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}
              animate={{
                opacity: state === "cover" || state === "peek" || isBlinking ? 0 : 1,
                scaleY: isBlinking ? 0.1 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <motion.div style={{
                width: 14,
                height: 18,
                borderRadius: "50%",
                background: "#ffffff",
                boxShadow: "0 0 8px #ffffff",
                x: eyeX,
                y: eyeY
              }} />
            </motion.div>

            {/* Right Eye */}
            <motion.div
              style={{
                width: 34,
                height: 38,
                borderRadius: "50%",
                background: "#0284c7",
                boxShadow: "0 0 16px #38bdf8",
                border: "2px solid #38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}
              animate={{
                opacity: state === "cover" || (isBlinking && state !== "peek") ? 0 : 1,
                scaleY: isBlinking && state !== "peek" ? 0.1 : 1,
              }}
              transition={{ duration: 0.12 }}
            >
              <motion.div style={{
                width: 14,
                height: 18,
                borderRadius: "50%",
                background: "#ffffff",
                boxShadow: "0 0 8px #ffffff",
                x: eyeX,
                y: eyeY
              }} />
            </motion.div>
          </div>

          {/* Closed Digital Eye Beams */}
          <div style={{
            position: "absolute",
            top: 54,
            left: 28,
            right: 28,
            display: "flex",
            justifyContent: "space-between",
            pointerEvents: "none"
          }}>
            <motion.div
              style={{ width: 34, height: 4, borderRadius: 4, background: "#38bdf8", boxShadow: "0 0 10px #38bdf8" }}
              animate={{
                opacity: state === "cover" || state === "peek" || isBlinking ? 1 : 0,
              }}
              transition={{ duration: 0.12 }}
            />
            <motion.div
              style={{ width: 34, height: 4, borderRadius: 4, background: "#38bdf8", boxShadow: "0 0 10px #38bdf8" }}
              animate={{
                opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0,
              }}
              transition={{ duration: 0.12 }}
            />
          </div>

          {/* LED Digital Mouth */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 26,
              background: "#38bdf8",
              boxShadow: "0 0 10px #38bdf8",
            }}
            animate={
              success
                ? { width: 32, height: 14, borderRadius: "0 0 20px 20px" }
                : error
                ? { width: 22, height: 5, borderRadius: "4px" }
                : state === "peek"
                ? { width: 14, height: 14, borderRadius: "50%" }
                : { width: 22, height: 7, borderRadius: "0 0 12px 12px" }
            }
          />
        </div>

        {/* Magnetic Robotic Hands - Directly Over Eyes */}
        <AnimatePresence>
          {(state === "cover" || state === "peek") && (
            <>
              {/* Left Hand */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 72,
                  left: -24,
                  width: 74,
                  height: 82,
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #e2e8f0, #cbd5e1)",
                  border: "2.5px solid #0284c7",
                  boxShadow: "0 10px 22px rgba(2, 132, 199, 0.35)",
                  zIndex: 30,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: 12
                }}
                initial={{ x: -20, y: 50, rotate: 20, opacity: 0 }}
                animate={{
                  x: 54, // Positioned right over the left eye
                  y: -36,
                  rotate: 15,
                  opacity: 1,
                }}
                exit={{ x: -20, y: 50, rotate: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                  <div style={{ width: 10, height: 12, borderRadius: 4, background: "#38bdf8", boxShadow: "0 0 6px #38bdf8" }} />
                  <div style={{ width: 10, height: 12, borderRadius: 4, background: "#38bdf8", boxShadow: "0 0 6px #38bdf8" }} />
                  <div style={{ width: 10, height: 12, borderRadius: 4, background: "#38bdf8", boxShadow: "0 0 6px #38bdf8" }} />
                </div>
                <div style={{ width: 26, height: 18, borderRadius: 6, background: "#0284c7" }} />
              </motion.div>

              {/* Right Hand */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 72,
                  right: -24,
                  width: 74,
                  height: 82,
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #e2e8f0, #cbd5e1)",
                  border: "2.5px solid #0284c7",
                  boxShadow: "0 10px 22px rgba(2, 132, 199, 0.35)",
                  zIndex: 30,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: 12
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
                        x: -54, // Positioned right over the right eye
                        y: -36,
                        rotate: -15,
                        opacity: 1,
                      }
                }
                exit={{ x: 20, y: 50, rotate: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                  <div style={{ width: 10, height: 12, borderRadius: 4, background: "#38bdf8", boxShadow: "0 0 6px #38bdf8" }} />
                  <div style={{ width: 10, height: 12, borderRadius: 4, background: "#38bdf8", boxShadow: "0 0 6px #38bdf8" }} />
                  <div style={{ width: 10, height: 12, borderRadius: 4, background: "#38bdf8", boxShadow: "0 0 6px #38bdf8" }} />
                </div>
                <div style={{ width: 26, height: 18, borderRadius: 6, background: "#0284c7" }} />
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
                style={{ color: "#0284c7", textShadow: "0 0 10px #38bdf8" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.3, 1], y: [-5, -25] }}
              >
                ⚡
              </motion.span>
              <motion.span
                className="sparkle sparkle-2"
                style={{ color: "#38bdf8", textShadow: "0 0 10px #38bdf8" }}
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
