import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Milo the Corgi Puppy - Full Body 3D Realistic Edition
 * Features:
 * - Full chubby 3D golden-caramel body with white chest fluff & developer bandana
 * - 3D sitting feet with pink puppy paw pads
 * - Ultra-realistic glass eyes with dual catchlights & gaze tracking
 * - 3D shaded perky ears & white forehead blaze
 * - Lifelike arms that raise from resting on belly to cover eyes & peek!
 */
export default function CorgiPuppyMascot({
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
      {/* 3D Contact Floor Shadow */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 10,
          width: 230,
          height: 30,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(15, 23, 42, 0.4) 0%, rgba(217, 119, 6, 0.2) 40%, transparent 70%)",
          filter: "blur(6px)",
        }}
        animate={
          success
            ? { scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }
            : { scale: [1, 0.94, 1], opacity: [0.6, 0.8, 0.6] }
        }
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Full Body Figure */}
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
        {/* 1. HEAD UNIT                                                      */}
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
          {/* Perky Corgi Ears */}
          <motion.div
            style={{
              position: "absolute",
              top: -26,
              left: 10,
              width: 50,
              height: 68,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              background: "linear-gradient(135deg, #b45309 0%, #f59e0b 60%)",
              border: "2px solid #92400e",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: -1,
            }}
            animate={success ? { rotate: [-28, -16, -28] } : { rotate: [-20, -16, -20] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div style={{ width: 26, height: 42, clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", background: "#fecdd3", marginTop: 18 }} />
          </motion.div>

          <motion.div
            style={{
              position: "absolute",
              top: -26,
              right: 10,
              width: 50,
              height: 68,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              background: "linear-gradient(225deg, #b45309 0%, #f59e0b 60%)",
              border: "2px solid #92400e",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: -1,
            }}
            animate={success ? { rotate: [28, 16, 28] } : { rotate: [20, 16, 20] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div style={{ width: 26, height: 42, clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", background: "#fecdd3", marginTop: 18 }} />
          </motion.div>

          {/* 3D Corgi Head Sphere */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "50% 50% 46% 46% / 54% 54% 44% 44%",
              background: "radial-gradient(circle at 38% 28%, #fef3c7 0%, #f59e0b 55%, #d97706 85%, #b45309 100%)",
              boxShadow:
                "inset 0 -10px 16px rgba(146, 64, 14, 0.4), inset 0 8px 14px rgba(255, 255, 255, 0.45), 0 16px 30px rgba(245, 158, 11, 0.25)",
              border: "2px solid #b45309",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* White Forehead Blaze */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 32,
                height: 56,
                background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                borderRadius: "0 0 16px 16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
                zIndex: 1,
              }}
            />

            {/* Glossy Dark Amber Eyes */}
            <div
              style={{
                position: "absolute",
                top: 40,
                left: 28,
                right: 28,
                display: "flex",
                justifyContent: "space-between",
                zIndex: 2,
              }}
            >
              {/* Left Eye */}
              <motion.div
                style={{
                  width: 32,
                  height: 40,
                  borderRadius: "50%",
                  background: "#ffffff",
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.9), inset 0 2px 4px rgba(0, 0, 0, 0.15)",
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
                    background: "radial-gradient(circle at 35% 30%, #b45309 0%, #451a03 60%, #1c1917 100%)",
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
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.9), inset 0 2px 4px rgba(0, 0, 0, 0.15)",
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
                    background: "radial-gradient(circle at 35% 30%, #b45309 0%, #451a03 60%, #1c1917 100%)",
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
            <div style={{ position: "absolute", top: 54, left: 28, right: 28, display: "flex", justifyContent: "space-between", pointerEvents: "none", zIndex: 3 }}>
              <motion.div
                style={{ width: 32, height: 12, borderRadius: "50%", borderBottom: "4px solid #78350f", boxShadow: "0 2px 6px rgba(120, 53, 15, 0.6)" }}
                animate={{ opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 1 : 0 }}
                transition={{ duration: 0.12 }}
              />
              <motion.div
                style={{ width: 32, height: 12, borderRadius: "50%", borderBottom: "4px solid #78350f", boxShadow: "0 2px 6px rgba(120, 53, 15, 0.6)" }}
                animate={{ opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0 }}
                transition={{ duration: 0.12 }}
              />
            </div>

            {/* 3D Snout with Boop Nose & Smile */}
            <div
              style={{
                position: "absolute",
                bottom: 14,
                left: "50%",
                transform: "translateX(-50%)",
                width: 66,
                height: 48,
                borderRadius: "50%",
                background: "radial-gradient(circle at 45% 30%, #ffffff 0%, #f8fafc 70%, #e2e8f0 100%)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08), inset 0 2px 4px #ffffff",
                border: "1.5px solid #cbd5e1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 6,
                zIndex: 4,
              }}
            >
              {/* Black Nose */}
              <div
                style={{
                  width: 20,
                  height: 14,
                  borderRadius: "50% 50% 60% 60%",
                  background: "radial-gradient(circle at 40% 30%, #334155 0%, #0f172a 70%, #020617 100%)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  position: "relative",
                }}
              >
                <div style={{ position: "absolute", top: 2, left: 4, width: 6, height: 3, borderRadius: "50%", background: "rgba(255, 255, 255, 0.8)" }} />
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
                    ? { width: 28, height: 16, borderRadius: "0 0 20px 20px", background: "#f43f5e" }
                    : error
                    ? { width: 18, height: 6, borderRadius: "10px 10px 0 0" }
                    : state === "peek"
                    ? { width: 18, height: 12, borderRadius: "50%", background: "#f43f5e" }
                    : { width: 18, height: 9, borderRadius: "0 0 16px 16px" }
                }
              />
            </div>

            {/* Soft Rosy Cheeks */}
            <div style={{ position: "absolute", top: 74, left: 16, width: 22, height: 14, borderRadius: "50%", background: "rgba(251, 113, 133, 0.45)", filter: "blur(2px)", zIndex: 2 }} />
            <div style={{ position: "absolute", top: 74, right: 16, width: 22, height: 14, borderRadius: "50%", background: "rgba(251, 113, 133, 0.45)", filter: "blur(2px)", zIndex: 2 }} />
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
          {/* Developer Bandana at Neck */}
          <div
            style={{
              position: "absolute",
              top: -6,
              width: 90,
              height: 28,
              clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
              background: "linear-gradient(135deg, #10b981 0%, #047857 100%)",
              boxShadow: "0 4px 10px rgba(16, 185, 129, 0.4)",
              zIndex: 10,
            }}
          />

          {/* Golden Corgi Chubby Body + White Chest Fluff */}
          <div
            style={{
              position: "relative",
              width: 160,
              height: 105,
              borderRadius: "50% 50% 40% 40% / 45% 45% 55% 55%",
              background: "radial-gradient(circle at 50% 20%, #fef3c7 0%, #f59e0b 55%, #d97706 100%)",
              boxShadow: "0 10px 24px rgba(180, 83, 9, 0.35), inset 0 2px 6px rgba(255, 255, 255, 0.3)",
              border: "2px solid #b45309",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
            }}
          >
            {/* White Chest Fluff Oval */}
            <div
              style={{
                width: 105,
                height: 80,
                marginTop: 10,
                borderRadius: "50%",
                background: "radial-gradient(circle at 45% 35%, #ffffff 0%, #f8fafc 60%, #e2e8f0 100%)",
                boxShadow: "inset 0 -6px 12px rgba(148, 163, 184, 0.3), 0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>

          {/* 3D Sitting Feet with Pink Pads */}
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
                background: "radial-gradient(circle at 40% 30%, #fef3c7 0%, #f59e0b 55%, #d97706 100%)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
                border: "2px solid #b45309",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 2,
              }}
            >
              <div style={{ display: "flex", gap: 3, marginBottom: 2 }}>
                <div style={{ width: 6, height: 8, borderRadius: "50%", background: "#fecdd3" }} />
                <div style={{ width: 7, height: 9, borderRadius: "50%", background: "#fecdd3" }} />
                <div style={{ width: 6, height: 8, borderRadius: "50%", background: "#fecdd3" }} />
              </div>
              <div style={{ width: 22, height: 16, borderRadius: "50%", background: "#fecdd3", boxShadow: "0 0 6px rgba(254, 205, 211, 0.8)" }} />
            </div>

            {/* Right Foot */}
            <div
              style={{
                width: 72,
                height: 44,
                borderRadius: "40% 50% 50% 35%",
                background: "radial-gradient(circle at 40% 30%, #fef3c7 0%, #f59e0b 55%, #d97706 100%)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
                border: "2px solid #b45309",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 2,
              }}
            >
              <div style={{ display: "flex", gap: 3, marginBottom: 2 }}>
                <div style={{ width: 6, height: 8, borderRadius: "50%", background: "#fecdd3" }} />
                <div style={{ width: 7, height: 9, borderRadius: "50%", background: "#fecdd3" }} />
                <div style={{ width: 6, height: 8, borderRadius: "50%", background: "#fecdd3" }} />
              </div>
              <div style={{ width: 22, height: 16, borderRadius: "50%", background: "#fecdd3", boxShadow: "0 0 6px rgba(254, 205, 211, 0.8)" }} />
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
              background: "radial-gradient(circle at 35% 30%, #fef3c7 0%, #f59e0b 55%, #d97706 100%)",
              boxShadow: "0 10px 22px rgba(180, 83, 9, 0.4), inset 0 3px 6px rgba(255, 255, 255, 0.35)",
              border: "2px solid #b45309",
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
              <div style={{ width: 8, height: 10, borderRadius: "50%", background: "#fecdd3" }} />
              <div style={{ width: 9, height: 11, borderRadius: "50%", background: "#fecdd3" }} />
              <div style={{ width: 8, height: 10, borderRadius: "50%", background: "#fecdd3" }} />
            </div>
            <div style={{ width: 26, height: 20, borderRadius: "50%", background: "#fecdd3", boxShadow: "0 0 8px rgba(254, 205, 211, 0.9)" }} />
          </motion.div>

          {/* Right Arm & Paw */}
          <motion.div
            style={{
              position: "absolute",
              width: 72,
              height: 76,
              borderRadius: "28px",
              background: "radial-gradient(circle at 35% 30%, #fef3c7 0%, #f59e0b 55%, #d97706 100%)",
              boxShadow: "0 10px 22px rgba(180, 83, 9, 0.4), inset 0 3px 6px rgba(255, 255, 255, 0.35)",
              border: "2px solid #b45309",
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
              <div style={{ width: 8, height: 10, borderRadius: "50%", background: "#fecdd3" }} />
              <div style={{ width: 9, height: 11, borderRadius: "50%", background: "#fecdd3" }} />
              <div style={{ width: 8, height: 10, borderRadius: "50%", background: "#fecdd3" }} />
            </div>
            <div style={{ width: 26, height: 20, borderRadius: "50%", background: "#fecdd3", boxShadow: "0 0 8px rgba(254, 205, 211, 0.9)" }} />
          </motion.div>
        </div>
      </motion.div>

      {/* Success Sparkles */}
      <AnimatePresence>
        {success && (
          <>
            <motion.span
              style={{ position: "absolute", top: 15, left: 10, fontSize: 26, color: "#f59e0b", textShadow: "0 0 10px #f59e0b" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.3, 1], y: [-5, -25] }}
            >
              🐾
            </motion.span>
            <motion.span
              style={{ position: "absolute", top: 35, right: 10, fontSize: 26, color: "#10b981", textShadow: "0 0 10px #10b981" }}
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
