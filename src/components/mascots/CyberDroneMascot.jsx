import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Aero: Floating Holographic Cyber Drone (Completely Distinct Silhouette)
 * - Aerodynamic sleek pod capsule floating in mid-air (NO bear shape!)
 * - Floating anti-gravity ring below with pulsing ion thrust
 * - Curved OLED display screen with neon green/cyan expressions
 * - Floating magnetic orb hands that levitate independently and cover visor
 * - Antennas & holographic compiler HUD
 */
export default function CyberDroneMascot({
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
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, [passwordFocused]);

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 22 });

  const eyeX = useTransform(smoothX, [-1, 1], [-9, 9]);
  const eyeY = useTransform(smoothY, [-1, 1], [-6, 6]);
  const droneTilt = useTransform(smoothX, [-1, 1], [-8, 8]);
  const droneRoll = useTransform(smoothY, [-1, 1], [-4, 4]);

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
      {/* Anti-Gravity Ion Glow on Floor */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 12,
          width: 180,
          height: 24,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(34, 197, 94, 0.45) 0%, rgba(14, 165, 233, 0.25) 50%, transparent 70%)",
          filter: "blur(6px)",
        }}
        animate={
          success
            ? { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }
            : { scale: [1, 0.85, 1], opacity: [0.5, 0.8, 0.5] }
        }
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Anti-Gravity Ring Under Drone */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 35,
          width: 130,
          height: 28,
          borderRadius: "50%",
          border: "2px solid #22c55e",
          boxShadow: "0 0 16px rgba(34, 197, 94, 0.8), inset 0 0 10px rgba(34, 197, 94, 0.5)",
          transform: "rotateX(70deg)",
          zIndex: 1,
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 1, 0.7],
          y: [0, 6, 0],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Cyber Drone Main Body */}
      <motion.div
        style={{
          position: "relative",
          width: 190,
          height: 220,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
          rotate: droneTilt,
          y: droneRoll,
        }}
        animate={
          success
            ? { y: [0, -35, 0], rotate: [-10, 10, -10] }
            : error
            ? { x: [-8, 8, -8, 8, 0], rotate: [-4, 4, -4, 4, 0] }
            : { y: [0, -12, 0] }
        }
        transition={
          success
            ? { duration: 0.7, ease: "easeInOut" }
            : error
            ? { duration: 0.45 }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Top Sensor Fin Antenna */}
        <motion.div
          style={{
            position: "absolute",
            top: -18,
            width: 16,
            height: 26,
            borderRadius: "50% 50% 10% 10%",
            background: "linear-gradient(180deg, #22c55e 0%, #0f172a 100%)",
            border: "1.5px solid #4ade80",
            boxShadow: "0 0 12px rgba(34, 197, 94, 0.8)",
            zIndex: 2,
          }}
          animate={success ? { scale: [1, 1.3, 1] } : {}}
        />

        {/* Sleek Aerodynamic Pod Capsule Shell */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "50% 50% 46% 46% / 60% 60% 40% 40%",
            background: "radial-gradient(circle at 35% 25%, #ffffff 0%, #f1f5f9 45%, #cbd5e1 75%, #64748b 100%)",
            boxShadow:
              "inset 0 -14px 20px rgba(15, 23, 42, 0.4), inset 0 8px 16px #ffffff, 0 20px 40px rgba(0, 0, 0, 0.35)",
            border: "2px solid #94a3b8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 24,
            overflow: "hidden",
          }}
        >
          {/* Side Thruster Wings with Cyan Neon Trim */}
          <div
            style={{
              position: "absolute",
              top: 75,
              left: -8,
              width: 14,
              height: 48,
              borderRadius: "8px 0 0 8px",
              background: "linear-gradient(135deg, #1e293b, #0f172a)",
              border: "1.5px solid #22c55e",
              boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 75,
              right: -8,
              width: 14,
              height: 48,
              borderRadius: "0 8px 8px 0",
              background: "linear-gradient(135deg, #1e293b, #0f172a)",
              border: "1.5px solid #22c55e",
              boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
            }}
          />

          {/* Curved Panoramic OLED Sensor Visor */}
          <div
            style={{
              position: "relative",
              width: 154,
              height: 110,
              borderRadius: "38px",
              background: "radial-gradient(circle at 50% 20%, #1e293b 0%, #070a0f 100%)",
              border: "2px solid rgba(34, 197, 94, 0.4)",
              boxShadow:
                "inset 0 4px 14px rgba(255, 255, 255, 0.2), inset 0 -4px 12px rgba(0, 0, 0, 0.9), 0 8px 25px rgba(0, 0, 0, 0.6)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Top Curved Glass Highlight */}
            <div
              style={{
                position: "absolute",
                top: 4,
                left: 16,
                right: 16,
                height: 12,
                borderRadius: "20px",
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, transparent 100%)",
              }}
            />

            {/* Glowing Neon Cyber Eyes */}
            <div
              style={{
                position: "absolute",
                top: 30,
                left: 24,
                right: 24,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* Left Cyber Eye */}
              <motion.div
                style={{
                  width: 26,
                  height: 38,
                  borderRadius: "14px",
                  background: "linear-gradient(180deg, #86efac 0%, #22c55e 60%, #15803d 100%)",
                  boxShadow: "0 0 16px #22c55e, inset 0 2px 4px #ffffff",
                }}
                animate={{
                  opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 0 : 1,
                  scaleY: isBlinking ? 0.1 : 1,
                  x: eyeX,
                  y: eyeY,
                }}
                transition={{ duration: 0.12 }}
              />

              {/* Right Cyber Eye */}
              <motion.div
                style={{
                  width: 26,
                  height: 38,
                  borderRadius: "14px",
                  background: "linear-gradient(180deg, #86efac 0%, #22c55e 60%, #15803d 100%)",
                  boxShadow: "0 0 16px #22c55e, inset 0 2px 4px #ffffff",
                }}
                animate={{
                  opacity: state === "cover" || (isBlinking && state !== "peek") ? 0 : 1,
                  scaleY: isBlinking && state !== "peek" ? 0.1 : 1,
                  x: eyeX,
                  y: eyeY,
                }}
                transition={{ duration: 0.12 }}
              />
            </div>

            {/* Closed Digital Arc Lines */}
            <div style={{ position: "absolute", top: 44, left: 24, right: 24, display: "flex", justifyContent: "space-between", pointerEvents: "none" }}>
              <motion.div
                style={{ width: 28, height: 10, borderRadius: "50%", borderBottom: "3.5px solid #22c55e", boxShadow: "0 4px 10px rgba(34, 197, 94, 0.8)" }}
                animate={{ opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 1 : 0 }}
                transition={{ duration: 0.12 }}
              />
              <motion.div
                style={{ width: 28, height: 10, borderRadius: "50%", borderBottom: "3.5px solid #22c55e", boxShadow: "0 4px 10px rgba(34, 197, 94, 0.8)" }}
                animate={{ opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0 }}
                transition={{ duration: 0.12 }}
              />
            </div>

            {/* Digital LED Mouth Bar */}
            <motion.div
              style={{
                position: "absolute",
                bottom: 18,
                background: "#22c55e",
                boxShadow: "0 0 10px #22c55e",
              }}
              animate={
                success
                  ? { width: 34, height: 12, borderRadius: "0 0 16px 16px" }
                  : error
                  ? { width: 22, height: 4, borderRadius: "2px" }
                  : state === "peek"
                  ? { width: 14, height: 14, borderRadius: "50%" }
                  : { width: 22, height: 6, borderRadius: "0 0 12px 12px" }
              }
            />
          </div>

          {/* Lower Core Vent with Glowing </> */}
          <div
            style={{
              marginTop: 12,
              padding: "3px 12px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #1e293b, #0f172a)",
              border: "1px solid #22c55e",
              boxShadow: "0 0 10px rgba(34, 197, 94, 0.3)",
              color: "#4ade80",
              fontSize: "12px",
              fontFamily: "monospace",
              fontWeight: 900,
            }}
          >
            &lt;/&gt;
          </div>
        </div>
      </motion.div>

      {/* =================================================================== */}
      {/* FLOATING MAGNETIC ORB HANDS (Levitates Freely & Covers Screen)      */}
      {/* =================================================================== */}
      {/* Left Magnetic Orb Hand */}
      <motion.div
        style={{
          position: "absolute",
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 25%, #ffffff 0%, #cbd5e1 55%, #475569 100%)",
          border: "2px solid #22c55e",
          boxShadow: "0 0 16px rgba(34, 197, 94, 0.6), 0 10px 20px rgba(0, 0, 0, 0.3)",
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
                top: 86, // Floats right over the left sensor eye!
                scale: 1.05,
              }
            : {
                left: 15,
                top: [125, 138, 125], // Idle magnetic floating
                scale: 1,
              }
        }
        transition={
          state === "cover" || state === "peek"
            ? { type: "spring", stiffness: 280, damping: 22 }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
      </motion.div>

      {/* Right Magnetic Orb Hand */}
      <motion.div
        style={{
          position: "absolute",
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 25%, #ffffff 0%, #cbd5e1 55%, #475569 100%)",
          border: "2px solid #22c55e",
          boxShadow: "0 0 16px rgba(34, 197, 94, 0.6), 0 10px 20px rgba(0, 0, 0, 0.3)",
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
                top: 86, // Floats over right sensor eye!
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
                top: [138, 125, 138], // Idle magnetic floating
                scale: 1,
              }
        }
        transition={
          state === "cover" || state === "peek"
            ? { type: "spring", stiffness: 280, damping: 22 }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
      </motion.div>

      {/* Success Sparkles */}
      <AnimatePresence>
        {success && (
          <>
            <motion.span
              style={{ position: "absolute", top: 15, left: 10, fontSize: 26, color: "#22c55e", textShadow: "0 0 12px #22c55e" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.4, 1], y: [-5, -25] }}
            >
              ⚡
            </motion.span>
            <motion.span
              style={{ position: "absolute", top: 35, right: 10, fontSize: 26, color: "#4ade80", textShadow: "0 0 12px #22c55e" }}
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
