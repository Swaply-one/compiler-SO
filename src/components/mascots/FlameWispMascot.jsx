import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Ignis: The Floating Cyber Flame Wisp Mascot (Completely Distinct Silhouette)
 * - Teardrop fluid glowing fire wisp with floating tail (NO bear silhouette!)
 * - Floating fiery orb hands that glide up over eyes
 * - Glossy ruby/amber eyes with live mouse cursor tracking
 * - Swirling ember particles & fluid fire crest
 */
export default function FlameWispMascot({
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
    }, 4200);
    return () => clearInterval(blinkInterval);
  }, [passwordFocused]);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 22 });

  const eyeX = useTransform(smoothX, [-1, 1], [-9, 9]);
  const eyeY = useTransform(smoothY, [-1, 1], [-6, 6]);
  const flameTilt = useTransform(smoothX, [-1, 1], [-8, 8]);

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
        width: 300,
        height: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
      }}
    >
      {/* Dynamic Ambient Fire Floor Glow */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 12,
          width: 200,
          height: 28,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(234, 88, 12, 0.45) 0%, rgba(245, 158, 11, 0.25) 50%, transparent 70%)",
          filter: "blur(6px)",
        }}
        animate={
          success
            ? { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }
            : { scale: [1, 0.85, 1], opacity: [0.5, 0.8, 0.5] }
        }
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Flame Body */}
      <motion.div
        style={{
          position: "relative",
          width: 190,
          height: 240,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
          rotate: flameTilt,
        }}
        animate={
          success
            ? { y: [0, -35, 0], scale: [1, 1.15, 1] }
            : error
            ? { x: [-8, 8, -8, 8, 0], rotate: [-4, 4, -4, 4, 0] }
            : { y: [0, -14, 0] }
        }
        transition={
          success
            ? { duration: 0.7, ease: "easeInOut" }
            : error
            ? { duration: 0.45 }
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Animated Fluid Top Flame Crest */}
        <motion.div
          style={{
            position: "absolute",
            top: -24,
            width: 32,
            height: 52,
            borderRadius: "50% 50% 20% 50%",
            background: "linear-gradient(135deg, #fef08a 0%, #f59e0b 50%, #ea580c 100%)",
            boxShadow: "0 0 20px rgba(245, 158, 11, 0.9)",
            transform: "rotate(-25deg)",
            zIndex: 1,
          }}
          animate={{
            rotate: [-28, -18, -28],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main Glowing Flame Core Silhouette */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "50% 50% 46% 46% / 60% 60% 40% 40%",
            background: "radial-gradient(circle at 45% 35%, #fffbeb 0%, #fde047 30%, #f97316 70%, #c2410c 100%)",
            boxShadow:
              "inset 0 -14px 20px rgba(154, 52, 18, 0.5), inset 0 8px 16px #fef08a, 0 20px 45px rgba(234, 88, 12, 0.45)",
            border: "2px solid #ea580c",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 50,
          }}
        >
          {/* Glowing Eyes */}
          <div
            style={{
              position: "relative",
              width: 130,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Left Eye */}
            <motion.div
              style={{
                width: 32,
                height: 42,
                borderRadius: "50%",
                background: "#ffffff",
                boxShadow: "0 0 14px rgba(255, 255, 255, 0.9), inset 0 2px 4px rgba(0, 0, 0, 0.2)",
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
                  height: 26,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 30%, #f59e0b 0%, #b45309 60%, #451a03 100%)",
                  boxShadow: "0 0 10px rgba(245, 158, 11, 0.9)",
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
                height: 42,
                borderRadius: "50%",
                background: "#ffffff",
                boxShadow: "0 0 14px rgba(255, 255, 255, 0.9), inset 0 2px 4px rgba(0, 0, 0, 0.2)",
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
                  height: 26,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 30%, #f59e0b 0%, #b45309 60%, #451a03 100%)",
                  boxShadow: "0 0 10px rgba(245, 158, 11, 0.9)",
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

          {/* Closed Eyes */}
          <div style={{ position: "absolute", top: 68, left: 30, right: 30, display: "flex", justifyContent: "space-between", pointerEvents: "none" }}>
            <motion.div
              style={{ width: 32, height: 12, borderRadius: "50%", borderBottom: "4px solid #7c2d12", boxShadow: "0 4px 10px rgba(124, 45, 18, 0.8)" }}
              animate={{ opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 1 : 0 }}
              transition={{ duration: 0.12 }}
            />
            <motion.div
              style={{ width: 32, height: 12, borderRadius: "50%", borderBottom: "4px solid #7c2d12", boxShadow: "0 4px 10px rgba(124, 45, 18, 0.8)" }}
              animate={{ opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0 }}
              transition={{ duration: 0.12 }}
            />
          </div>

          {/* Flame Mouth */}
          <motion.div
            style={{
              marginTop: 18,
              border: "2.5px solid #7c2d12",
              borderTop: 0,
              background: "transparent",
            }}
            animate={
              success
                ? { width: 28, height: 16, borderRadius: "0 0 20px 20px", background: "#fef08a" }
                : error
                ? { width: 18, height: 6, borderRadius: "10px 10px 0 0" }
                : state === "peek"
                ? { width: 18, height: 12, borderRadius: "50%", background: "#fef08a" }
                : { width: 18, height: 9, borderRadius: "0 0 16px 16px" }
            }
          />
        </div>
      </motion.div>

      {/* =================================================================== */}
      {/* FLOATING FIRE ORB HANDS                                             */}
      {/* =================================================================== */}
      {/* Left Hand */}
      <motion.div
        style={{
          position: "absolute",
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 25%, #fef08a 0%, #f97316 65%, #c2410c 100%)",
          border: "2px solid #ea580c",
          boxShadow: "0 0 18px rgba(249, 115, 22, 0.8), 0 8px 18px rgba(0, 0, 0, 0.3)",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        initial={{ left: 15, top: 130 }}
        animate={
          state === "cover" || state === "peek"
            ? {
                left: 88,
                top: 86, // Covers left eye!
                scale: 1.05,
              }
            : {
                left: 15,
                top: [125, 138, 125], // Idle floating
                scale: 1,
              }
        }
        transition={
          state === "cover" || state === "peek"
            ? { type: "spring", stiffness: 280, damping: 22 }
            : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fef08a", boxShadow: "0 0 8px #fef08a" }} />
      </motion.div>

      {/* Right Hand */}
      <motion.div
        style={{
          position: "absolute",
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 25%, #fef08a 0%, #f97316 65%, #c2410c 100%)",
          border: "2px solid #ea580c",
          boxShadow: "0 0 18px rgba(249, 115, 22, 0.8), 0 8px 18px rgba(0, 0, 0, 0.3)",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        initial={{ right: 15, top: 130 }}
        animate={
          state === "cover"
            ? {
                right: 88,
                top: 86, // Covers right eye!
                scale: 1.05,
              }
            : state === "peek"
            ? {
                right: 32,
                top: 155, // Glides away to peek!
                scale: 0.95,
              }
            : {
                right: 15,
                top: [138, 125, 138], // Idle floating
                scale: 1,
              }
        }
        transition={
          state === "cover" || state === "peek"
            ? { type: "spring", stiffness: 280, damping: 22 }
            : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fef08a", boxShadow: "0 0 8px #fef08a" }} />
      </motion.div>

      {/* Success Sparkles */}
      <AnimatePresence>
        {success && (
          <>
            <motion.span
              style={{ position: "absolute", top: 15, left: 10, fontSize: 26, color: "#f59e0b", textShadow: "0 0 12px #f59e0b" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.4, 1], y: [-5, -25] }}
            >
              🔥
            </motion.span>
            <motion.span
              style={{ position: "absolute", top: 35, right: 10, fontSize: 26, color: "#ea580c", textShadow: "0 0 12px #ea580c" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.4, 1], y: [-5, -25] }}
            >
              ✨
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
