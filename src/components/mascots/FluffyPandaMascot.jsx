import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Bao the Fluffy Panda - Full Body 3D Realistic Edition
 * Features:
 * - Full chubby 3D body with fluffy white belly & black shoulders
 * - 3D sitting feet with bamboo green paw pads
 * - Ultra-realistic glass eyes with dual catchlights & gaze tracking
 * - 3D shaded black ears & bamboo sprig 🌱
 * - Lifelike arms that raise from resting on belly to cover eyes & peek!
 */
export default function FluffyPandaMascot({
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

  const eyeX = useTransform(smoothX, [-1, 1], [-7, 7]);
  const eyeY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const headRotate = useTransform(smoothX, [-1, 1], [-3, 3]);

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
    <div
      style={{
        position: "relative",
        width: 280,
        height: 310,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
      }}
    >
      {/* 3D Contact Shadow on Floor */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 10,
          width: 230,
          height: 30,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(15, 23, 42, 0.45) 0%, rgba(34, 197, 94, 0.2) 40%, transparent 70%)",
          filter: "blur(6px)",
        }}
        animate={
          success
            ? { scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }
            : { scale: [1, 0.94, 1], opacity: [0.6, 0.8, 0.6] }
        }
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Full Body Mascot Container */}
      <motion.div
        style={{
          position: "relative",
          width: 240,
          height: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        animate={
          success
            ? { y: [0, -22, 0], rotate: [-2, 2, -2] }
            : error
            ? { x: [-5, 5, -5, 5, 0], rotate: [-2, 2, -2, 2, 0] }
            : { y: [0, -5, 0] }
        }
        transition={
          success
            ? { duration: 0.7, ease: "easeInOut" }
            : error
            ? { duration: 0.45 }
            : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* ================================================================= */}
        {/* 1. HEAD UNIT (3D Shaded Panda Head)                                */}
        {/* ================================================================= */}
        <motion.div
          style={{
            position: "relative",
            width: 175,
            height: 145,
            zIndex: 20,
            rotate: headRotate,
          }}
        >
          {/* Bamboo Sprout on Head */}
          <motion.div
            style={{
              position: "absolute",
              top: -20,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 2,
              zIndex: 3,
            }}
            animate={success ? { rotate: [-18, 18, -18] } : { rotate: [-4, 4, -4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              style={{
                width: 14,
                height: 22,
                borderRadius: "50% 50% 10% 50%",
                background: "linear-gradient(135deg, #4ade80, #15803d)",
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.6)",
                transform: "rotate(-28deg)",
              }}
            />
            <div
              style={{
                width: 12,
                height: 18,
                borderRadius: "50% 50% 50% 10%",
                background: "linear-gradient(135deg, #86efac, #22c55e)",
                boxShadow: "0 0 8px rgba(34, 197, 94, 0.6)",
                transform: "rotate(28deg)",
                marginLeft: -6,
              }}
            />
          </motion.div>

          {/* 3D Fluffy Panda Ears */}
          <motion.div
            style={{
              position: "absolute",
              top: -12,
              left: 6,
              width: 50,
              height: 52,
              borderRadius: "50% 50% 40% 40%",
              background: "radial-gradient(circle at 35% 30%, #334155 0%, #0f172a 70%, #020617 100%)",
              border: "2px solid #0f172a",
              boxShadow: "inset 0 4px 8px rgba(255, 255, 255, 0.2), 0 6px 12px rgba(0, 0, 0, 0.3)",
              zIndex: -1,
            }}
            animate={success ? { rotate: [-30, -18, -30] } : { rotate: [-24, -18, -24] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div style={{ width: 22, height: 26, borderRadius: "50%", background: "rgba(255, 255, 255, 0.12)", margin: "10px auto 0" }} />
          </motion.div>

          <motion.div
            style={{
              position: "absolute",
              top: -12,
              right: 6,
              width: 50,
              height: 52,
              borderRadius: "50% 50% 40% 40%",
              background: "radial-gradient(circle at 35% 30%, #334155 0%, #0f172a 70%, #020617 100%)",
              border: "2px solid #0f172a",
              boxShadow: "inset 0 4px 8px rgba(255, 255, 255, 0.2), 0 6px 12px rgba(0, 0, 0, 0.3)",
              zIndex: -1,
            }}
            animate={success ? { rotate: [30, 18, 30] } : { rotate: [24, 18, 24] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div style={{ width: 22, height: 26, borderRadius: "50%", background: "rgba(255, 255, 255, 0.12)", margin: "10px auto 0" }} />
          </motion.div>

          {/* 3D Panda Head Sphere */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "50% 50% 46% 46% / 54% 54% 44% 44%",
              background: "radial-gradient(circle at 38% 28%, #ffffff 0%, #f8fafc 55%, #e2e8f0 85%, #cbd5e1 100%)",
              boxShadow:
                "inset 0 -10px 16px rgba(100, 116, 139, 0.25), inset 0 8px 14px #ffffff, 0 16px 30px rgba(0, 0, 0, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 3D Black Panda Eye Patches */}
            <div
              style={{
                position: "absolute",
                top: 34,
                left: 20,
                width: 48,
                height: 58,
                borderRadius: "50% 50% 46% 46% / 60% 60% 40% 40%",
                background: "radial-gradient(circle at 40% 30%, #334155 0%, #0f172a 65%, #020617 100%)",
                transform: "rotate(-16deg)",
                boxShadow: "inset 0 3px 6px rgba(255, 255, 255, 0.2), 0 4px 10px rgba(0, 0, 0, 0.25)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 34,
                right: 20,
                width: 48,
                height: 58,
                borderRadius: "50% 50% 46% 46% / 60% 60% 40% 40%",
                background: "radial-gradient(circle at 40% 30%, #334155 0%, #0f172a 65%, #020617 100%)",
                transform: "rotate(16deg)",
                boxShadow: "inset 0 3px 6px rgba(255, 255, 255, 0.2), 0 4px 10px rgba(0, 0, 0, 0.25)",
              }}
            />

            {/* Glowing Emerald / Glass Eyes */}
            <div
              style={{
                position: "absolute",
                top: 42,
                left: 28,
                right: 28,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* Left Eye */}
              <motion.div
                style={{
                  width: 32,
                  height: 40,
                  borderRadius: "50%",
                  background: "#ffffff",
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.9), inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
                animate={{
                  opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 0 : 1,
                  scaleY: isBlinking ? 0.1 : 1,
                }}
                transition={{ duration: 0.12 }}
              >
                <motion.div
                  style={{
                    width: 20,
                    height: 24,
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 35% 30%, #34d399 0%, #059669 45%, #064e3b 80%, #022c22 100%)",
                    boxShadow: "0 0 8px rgba(16, 185, 129, 0.8)",
                    position: "relative",
                    x: eyeX,
                    y: eyeY,
                  }}
                >
                  <div style={{ position: "absolute", top: 3, left: 4, width: 6, height: 6, borderRadius: "50%", background: "#ffffff", boxShadow: "0 0 4px #ffffff" }} />
                  <div style={{ position: "absolute", bottom: 4, right: 4, width: 3, height: 3, borderRadius: "50%", background: "#ffffff" }} />
                </motion.div>
              </motion.div>

              {/* Right Eye */}
              <motion.div
                style={{
                  width: 32,
                  height: 40,
                  borderRadius: "50%",
                  background: "#ffffff",
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.9), inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
                animate={{
                  opacity: state === "cover" || (isBlinking && state !== "peek") ? 0 : 1,
                  scaleY: isBlinking && state !== "peek" ? 0.1 : 1,
                }}
                transition={{ duration: 0.12 }}
              >
                <motion.div
                  style={{
                    width: 20,
                    height: 24,
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 35% 30%, #34d399 0%, #059669 45%, #064e3b 80%, #022c22 100%)",
                    boxShadow: "0 0 8px rgba(16, 185, 129, 0.8)",
                    position: "relative",
                    x: eyeX,
                    y: eyeY,
                  }}
                >
                  <div style={{ position: "absolute", top: 3, left: 4, width: 6, height: 6, borderRadius: "50%", background: "#ffffff", boxShadow: "0 0 4px #ffffff" }} />
                  <div style={{ position: "absolute", bottom: 4, right: 4, width: 3, height: 3, borderRadius: "50%", background: "#ffffff" }} />
                </motion.div>
              </motion.div>
            </div>

            {/* Closed Eye Arcs */}
            <div style={{ position: "absolute", top: 56, left: 28, right: 28, display: "flex", justifyContent: "space-between", pointerEvents: "none" }}>
              <motion.div
                style={{ width: 32, height: 12, borderRadius: "50%", borderBottom: "4px solid #ffffff", boxShadow: "0 4px 10px rgba(255, 255, 255, 0.8)" }}
                animate={{ opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 1 : 0 }}
                transition={{ duration: 0.12 }}
              />
              <motion.div
                style={{ width: 32, height: 12, borderRadius: "50%", borderBottom: "4px solid #ffffff", boxShadow: "0 4px 10px rgba(255, 255, 255, 0.8)" }}
                animate={{ opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0 }}
                transition={{ duration: 0.12 }}
              />
            </div>

            {/* 3D Snout with Wet Nose & Smile */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                width: 60,
                height: 44,
                borderRadius: "50%",
                background: "radial-gradient(circle at 45% 30%, #ffffff 0%, #f1f5f9 70%, #e2e8f0 100%)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08), inset 0 2px 4px #ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 6,
              }}
            >
              {/* Black Nose with Specular Highlight */}
              <div
                style={{
                  width: 18,
                  height: 12,
                  borderRadius: "50% 50% 60% 60%",
                  background: "radial-gradient(circle at 40% 30%, #334155 0%, #0f172a 70%, #020617 100%)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  position: "relative",
                }}
              >
                <div style={{ position: "absolute", top: 2, left: 4, width: 5, height: 3, borderRadius: "50%", background: "rgba(255, 255, 255, 0.8)" }} />
              </div>

              {/* Smiling Mouth */}
              <motion.div
                style={{
                  marginTop: 2,
                  border: "2px solid #0f172a",
                  borderTop: 0,
                }}
                animate={
                  success
                    ? { width: 26, height: 14, borderRadius: "0 0 18px 18px", background: "#f43f5e" }
                    : error
                    ? { width: 16, height: 6, borderRadius: "10px 10px 0 0" }
                    : state === "peek"
                    ? { width: 16, height: 10, borderRadius: "50%", background: "#f43f5e" }
                    : { width: 16, height: 8, borderRadius: "0 0 14px 14px" }
                }
              />
            </div>

            {/* Soft Rosy Cheeks */}
            <div style={{ position: "absolute", top: 76, left: 16, width: 20, height: 12, borderRadius: "50%", background: "rgba(251, 113, 133, 0.4)", filter: "blur(2px)" }} />
            <div style={{ position: "absolute", top: 76, right: 16, width: 20, height: 12, borderRadius: "50%", background: "rgba(251, 113, 133, 0.4)", filter: "blur(2px)" }} />
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* 2. CHUBBY 3D BODY & SITTING FEET                                  */}
        {/* ================================================================= */}
        <div
          style={{
            position: "relative",
            width: 220,
            height: 155,
            marginTop: -22,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Black Fur Shoulders + White Chubby Belly */}
          <div
            style={{
              position: "relative",
              width: 160,
              height: 105,
              borderRadius: "50% 50% 40% 40% / 45% 45% 55% 55%",
              background: "radial-gradient(circle at 50% 20%, #1e293b 0%, #0f172a 70%, #020617 100%)",
              boxShadow: "0 10px 24px rgba(0, 0, 0, 0.35), inset 0 2px 6px rgba(255, 255, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
            }}
          >
            {/* Fluffy White Belly Oval */}
            <div
              style={{
                width: 105,
                height: 80,
                marginTop: 10,
                borderRadius: "50%",
                background: "radial-gradient(circle at 45% 35%, #ffffff 0%, #f8fafc 60%, #e2e8f0 100%)",
                boxShadow: "inset 0 -6px 12px rgba(148, 163, 184, 0.3), 0 4px 10px rgba(0, 0, 0, 0.15)",
              }}
            />
          </div>

          {/* 3D Sitting Feet with Bamboo Green Pads */}
          <div
            style={{
              position: "absolute",
              bottom: 4,
              width: 210,
              height: 52,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 6,
            }}
          >
            {/* Left Foot */}
            <div
              style={{
                width: 72,
                height: 44,
                borderRadius: "50% 40% 35% 50%",
                background: "radial-gradient(circle at 40% 30%, #334155 0%, #0f172a 70%, #020617 100%)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 2,
              }}
            >
              {/* Toe Beans */}
              <div style={{ display: "flex", gap: 3, marginBottom: 2 }}>
                <div style={{ width: 6, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
                <div style={{ width: 7, height: 9, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
                <div style={{ width: 6, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
              </div>
              {/* Main Pad */}
              <div style={{ width: 22, height: 16, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74, 222, 128, 0.8)" }} />
            </div>

            {/* Right Foot */}
            <div
              style={{
                width: 72,
                height: 44,
                borderRadius: "40% 50% 50% 35%",
                background: "radial-gradient(circle at 40% 30%, #334155 0%, #0f172a 70%, #020617 100%)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 2,
              }}
            >
              <div style={{ display: "flex", gap: 3, marginBottom: 2 }}>
                <div style={{ width: 6, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
                <div style={{ width: 7, height: 9, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
                <div style={{ width: 6, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
              </div>
              <div style={{ width: 22, height: 16, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74, 222, 128, 0.8)" }} />
            </div>
          </div>

          {/* =============================================================== */}
          {/* 3. 3D ARMS & PAWS (Smoothly Lift from Belly to Cover Eyes)        */}
          {/* =============================================================== */}
          {/* Left Arm & Paw */}
          <motion.div
            style={{
              position: "absolute",
              width: 72,
              height: 76,
              borderRadius: "28px",
              background: "radial-gradient(circle at 35% 30%, #334155 0%, #0f172a 70%, #020617 100%)",
              boxShadow: "0 10px 22px rgba(0, 0, 0, 0.4), inset 0 3px 6px rgba(255, 255, 255, 0.2)",
              border: "2px solid #0f172a",
              zIndex: 35,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 10,
            }}
            initial={{ left: 10, top: 18, rotate: 22 }}
            animate={
              state === "cover" || state === "peek"
                ? {
                    left: 42,
                    top: -96, // Lifts right up to cover left eye!
                    rotate: 15,
                  }
                : {
                    left: 10,
                    top: 18, // Resting comfortably on belly
                    rotate: 22,
                  }
            }
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          >
            <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
              <div style={{ width: 8, height: 10, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
              <div style={{ width: 9, height: 11, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
              <div style={{ width: 8, height: 10, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
            </div>
            <div style={{ width: 26, height: 20, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74, 222, 128, 0.9)" }} />
          </motion.div>

          {/* Right Arm & Paw */}
          <motion.div
            style={{
              position: "absolute",
              width: 72,
              height: 76,
              borderRadius: "28px",
              background: "radial-gradient(circle at 35% 30%, #334155 0%, #0f172a 70%, #020617 100%)",
              boxShadow: "0 10px 22px rgba(0, 0, 0, 0.4), inset 0 3px 6px rgba(255, 255, 255, 0.2)",
              border: "2px solid #0f172a",
              zIndex: 35,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 10,
            }}
            initial={{ right: 10, top: 18, rotate: -22 }}
            animate={
              state === "cover"
                ? {
                    right: 42,
                    top: -96, // Covers right eye
                    rotate: -15,
                  }
                : state === "peek"
                ? {
                    right: 18,
                    top: -45, // Pulled down to peek!
                    rotate: -28,
                  }
                : {
                    right: 10,
                    top: 18, // Resting comfortably on belly
                    rotate: -22,
                  }
            }
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          >
            <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
              <div style={{ width: 8, height: 10, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
              <div style={{ width: 9, height: 11, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
              <div style={{ width: 8, height: 10, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
            </div>
            <div style={{ width: 26, height: 20, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74, 222, 128, 0.9)" }} />
          </motion.div>
        </div>
      </motion.div>

      {/* Success Sparkles */}
      <AnimatePresence>
        {success && (
          <>
            <motion.span
              style={{ position: "absolute", top: 15, left: 10, fontSize: 26, color: "#22c55e", textShadow: "0 0 10px #22c55e" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.3, 1], y: [-5, -25] }}
            >
              🎋
            </motion.span>
            <motion.span
              style={{ position: "absolute", top: 35, right: 10, fontSize: 26, color: "#4ade80", textShadow: "0 0 10px #22c55e" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.3, 1], y: [-5, -25] }}
            >
              ✨
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
