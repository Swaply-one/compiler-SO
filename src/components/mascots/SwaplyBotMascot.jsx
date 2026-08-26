import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Ultra High-Fidelity Swaply One Compiler Bot Mascot
 * Faithfully engineered from the official reference artwork:
 * - 3D Spherical white helmet with glossy curved visor
 * - 3-Leaf glowing sprout antenna 🌱 with fluid spring physics
 * - Side DJ-style headphones with glowing </> symbols
 * - Matte black dev hoodie with neon green drawstrings and chest logo
 * - Realistic dark-slate laptop with glowing green 'S' lid logo
 * - Cross-legged robot pose with green-soled sneakers
 * - 4 Authentic Interactive States:
 *    1. Idle: Green pill eyes looking straight, gentle breathing
 *    2. Email Focus: Head tilts & eyes smoothly track cursor position
 *    3. Password Focus: Eyes politely close into glowing green arcs (︶ ‿ ︶) with spark lines
 *    4. Password Toggle / Success: Peek wink & happy victory jump with green sparkles
 */
export default function SwaplyBotMascot({
  passwordFocused,
  passwordVisible,
  emailFocused,
  emailLength = 0,
  error,
  success,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isBlinking, setIsBlinking] = useState(false);

  // Periodic natural eye blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!passwordFocused) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 140);
      }
    }, 4200);
    return () => clearInterval(blinkInterval);
  }, [passwordFocused]);

  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  // Gaze & head tilt tracking
  const eyeX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const eyeY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const headRotate = useTransform(smoothX, [-1, 1], [-4, 4]);
  const headTiltY = useTransform(smoothY, [-1, 1], [-2, 3]);

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
    if (emailFocused) return "email";
    return "idle";
  }, [passwordFocused, passwordVisible, emailFocused, error, success]);

  return (
    <div
      style={{
        position: "relative",
        width: 300,
        height: 330,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
      }}
    >
      {/* Dynamic Ambient Floor Glow */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 14,
          width: 240,
          height: 32,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(34, 197, 94, 0.35) 0%, rgba(34, 197, 94, 0) 70%)",
          filter: "blur(6px)",
        }}
        animate={
          success
            ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }
            : { scale: [1, 0.92, 1], opacity: [0.5, 0.7, 0.5] }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Mascot Figure */}
      <motion.div
        style={{
          position: "relative",
          width: 260,
          height: 310,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        animate={
          success
            ? { y: [0, -24, 0], rotate: [-2, 2, -2] }
            : error
            ? { x: [-5, 5, -5, 5, 0], rotate: [-2, 2, -2, 2, 0] }
            : state === "email"
            ? { y: [0, -3, 0], rotate: [0, 2, 0] }
            : { y: [0, -5, 0] }
        }
        transition={
          success
            ? { duration: 0.7, ease: "easeInOut" }
            : error
            ? { duration: 0.45 }
            : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* ================================================================= */}
        {/* Head Unit: Helmet + Sprout + Visor + Headphones                   */}
        {/* ================================================================= */}
        <motion.div
          style={{
            position: "relative",
            width: 180,
            height: 148,
            zIndex: 10,
            rotate: headRotate,
            y: headTiltY,
          }}
        >
          {/* Sprout Leaf Antenna (Top) */}
          <motion.div
            style={{
              position: "absolute",
              top: -26,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              zIndex: 3,
            }}
            animate={
              success
                ? { rotate: [-18, 18, -18], scale: [1, 1.25, 1] }
                : state === "cover"
                ? { rotate: [0, 4, 0] }
                : { rotate: [-5, 5, -5] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Left Leaf */}
            <div
              style={{
                width: 13,
                height: 20,
                borderRadius: "50% 50% 10% 50%",
                background: "linear-gradient(135deg, #86efac 0%, #22c55e 60%, #15803d 100%)",
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.7)",
                transform: "rotate(-36deg) translateY(2px)",
                marginRight: -4,
              }}
            />
            {/* Main Center Leaf */}
            <div
              style={{
                width: 16,
                height: 28,
                borderRadius: "50% 50% 30% 30%",
                background: "radial-gradient(circle at 40% 30%, #bbf7d0 0%, #22c55e 55%, #166534 100%)",
                boxShadow: "0 0 14px rgba(34, 197, 94, 0.9)",
                zIndex: 2,
              }}
            />
            {/* Right Leaf */}
            <div
              style={{
                width: 12,
                height: 18,
                borderRadius: "50% 50% 50% 10%",
                background: "linear-gradient(135deg, #86efac 0%, #22c55e 60%, #15803d 100%)",
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.7)",
                transform: "rotate(36deg) translateY(3px)",
                marginLeft: -4,
              }}
            />
          </motion.div>

          {/* Spherical White Helmet */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "50% 50% 46% 46% / 54% 54% 44% 44%",
              background: "radial-gradient(circle at 35% 25%, #ffffff 0%, #f1f5f9 55%, #cbd5e1 90%, #94a3b8 100%)",
              boxShadow:
                "inset 0 -10px 16px rgba(71, 85, 105, 0.35), inset 0 8px 14px #ffffff, 0 18px 35px rgba(0, 0, 0, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Headphone Earcups with Glow </> */}
            {/* Left Earcup */}
            <div
              style={{
                position: "absolute",
                left: -16,
                top: 44,
                width: 26,
                height: 56,
                borderRadius: "14px",
                background: "linear-gradient(135deg, #1e293b 0%, #090d16 100%)",
                border: "2.5px solid #22c55e",
                boxShadow: "0 0 14px rgba(34, 197, 94, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4ade80",
                fontSize: "12px",
                fontWeight: 900,
                fontFamily: "monospace",
                zIndex: -1,
              }}
            >
              &lt;/&gt;
            </div>

            {/* Right Earcup */}
            <div
              style={{
                position: "absolute",
                right: -16,
                top: 44,
                width: 26,
                height: 56,
                borderRadius: "14px",
                background: "linear-gradient(135deg, #1e293b 0%, #090d16 100%)",
                border: "2.5px solid #22c55e",
                boxShadow: "0 0 14px rgba(34, 197, 94, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4ade80",
                fontSize: "12px",
                fontWeight: 900,
                fontFamily: "monospace",
                zIndex: -1,
              }}
            >
              &lt;/&gt;
            </div>

            {/* Dark Glossy Visor Screen */}
            <div
              style={{
                position: "absolute",
                inset: "16px 15px",
                borderRadius: "46px",
                background: "radial-gradient(circle at 50% 20%, #1e293b 0%, #07090e 100%)",
                border: "2px solid rgba(255, 255, 255, 0.15)",
                boxShadow:
                  "inset 0 6px 14px rgba(255, 255, 255, 0.22), inset 0 -4px 10px rgba(0, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.7)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Top Curved Glass Reflection */}
              <div
                style={{
                  position: "absolute",
                  top: 6,
                  left: 20,
                  right: 20,
                  height: 14,
                  borderRadius: "20px",
                  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, transparent 100%)",
                }}
              />

              {/* State 3: Little cute green spark lines blinking when eyes are closed */}
              <AnimatePresence>
                {state === "cover" && (
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 22,
                      right: 18,
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div style={{ width: 8, height: 2.5, borderRadius: 2, background: "#22c55e", boxShadow: "0 0 6px #22c55e", transform: "rotate(30deg)" }} />
                    <div style={{ width: 12, height: 2.5, borderRadius: 2, background: "#4ade80", boxShadow: "0 0 8px #4ade80", transform: "rotate(15deg)", marginLeft: 2 }} />
                    <div style={{ width: 8, height: 2.5, borderRadius: 2, background: "#22c55e", boxShadow: "0 0 6px #22c55e", transform: "rotate(0deg)" }} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ======================================================= */}
              {/* Glowing Green Expressive Eyes                           */}
              {/* ======================================================= */}
              {/* 1. Open Pill Eyes (Idle, Email Focus, & Peek) */}
              <div
                style={{
                  position: "absolute",
                  top: 38,
                  left: 28,
                  right: 28,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* Left Eye */}
                <motion.div
                  style={{
                    width: 26,
                    height: 36,
                    borderRadius: "15px",
                    background: "radial-gradient(circle at 40% 30%, #bbf7d0 0%, #22c55e 55%, #15803d 100%)",
                    boxShadow: "0 0 18px #22c55e, inset 0 2px 5px #ffffff",
                  }}
                  animate={{
                    opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 0 : 1,
                    scaleY: isBlinking ? 0.1 : 1,
                    x: eyeX,
                    y: eyeY,
                  }}
                  transition={{ duration: 0.12 }}
                />

                {/* Right Eye (Visible in Peek Mode!) */}
                <motion.div
                  style={{
                    width: 26,
                    height: 36,
                    borderRadius: "15px",
                    background: "radial-gradient(circle at 40% 30%, #bbf7d0 0%, #22c55e 55%, #15803d 100%)",
                    boxShadow: "0 0 18px #22c55e, inset 0 2px 5px #ffffff",
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

              {/* 2. Closed Curved Eyes (State 3: Password Focus "I don't peek!") */}
              <div
                style={{
                  position: "absolute",
                  top: 48,
                  left: 26,
                  right: 26,
                  display: "flex",
                  justifyContent: "space-between",
                  pointerEvents: "none",
                }}
              >
                {/* Left Closed Eye Arc (︶) */}
                <motion.div
                  style={{
                    width: 30,
                    height: 14,
                    borderRadius: "50%",
                    borderBottom: "4px solid #22c55e",
                    boxShadow: "0 4px 12px rgba(34, 197, 94, 0.7)",
                  }}
                  animate={{
                    opacity: state === "cover" || (state === "peek" && !passwordVisible) || isBlinking ? 1 : 0,
                  }}
                  transition={{ duration: 0.12 }}
                />

                {/* Right Closed Eye Arc */}
                <motion.div
                  style={{
                    width: 30,
                    height: 14,
                    borderRadius: "50%",
                    borderBottom: "4px solid #22c55e",
                    boxShadow: "0 4px 12px rgba(34, 197, 94, 0.7)",
                  }}
                  animate={{
                    opacity: state === "cover" || (isBlinking && state !== "peek") ? 1 : 0,
                  }}
                  transition={{ duration: 0.12 }}
                />
              </div>

              {/* Smiling Green Mouth */}
              <motion.div
                style={{
                  position: "absolute",
                  bottom: 22,
                  borderBottom: "3.5px solid #22c55e",
                  borderRadius: "50%",
                  boxShadow: "0 2px 10px rgba(34, 197, 94, 0.6)",
                }}
                animate={
                  success
                    ? { width: 26, height: 14, borderBottomWidth: "4px" }
                    : error
                    ? { width: 16, height: 4, borderRadius: "2px" }
                    : state === "cover"
                    ? { width: 20, height: 9 }
                    : { width: 20, height: 10 }
                }
              />
            </div>
          </div>
        </motion.div>

        {/* ================================================================= */}
        {/* Body Unit: Black Hoodie + Laptop + Cross-Legged Robot Legs       */}
        {/* ================================================================= */}
        <div
          style={{
            position: "relative",
            width: 220,
            height: 165,
            marginTop: -16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Black Dev Hoodie */}
          <div
            style={{
              position: "relative",
              width: 146,
              height: 94,
              borderRadius: "30px 30px 22px 22px",
              background: "linear-gradient(180deg, #181c24 0%, #0f131a 100%)",
              boxShadow: "0 10px 22px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 16,
              zIndex: 5,
            }}
          >
            {/* Neon Green Drawstrings */}
            <div style={{ display: "flex", gap: 18, marginBottom: 4 }}>
              <div style={{ width: 3.5, height: 18, background: "#22c55e", borderRadius: 2, boxShadow: "0 0 8px #22c55e" }} />
              <div style={{ width: 3.5, height: 18, background: "#22c55e", borderRadius: 2, boxShadow: "0 0 8px #22c55e" }} />
            </div>

            {/* Neon Green Chest Logo </> */}
            <div
              style={{
                color: "#22c55e",
                fontWeight: 900,
                fontSize: 17,
                fontFamily: "monospace",
                letterSpacing: "1px",
                textShadow: "0 0 12px rgba(34, 197, 94, 0.9)",
              }}
            >
              &lt;/&gt;
            </div>
          </div>

          {/* White Robot Arms with Green Cuffs */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 8,
              width: 34,
              height: 58,
              borderRadius: "18px",
              background: "radial-gradient(circle at 30% 30%, #ffffff, #cbd5e1)",
              border: "2px solid #94a3b8",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
              transform: "rotate(28deg)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 4,
              zIndex: 6,
            }}
          >
            <div style={{ width: "100%", height: 6, background: "#22c55e", borderRadius: 3 }} />
          </div>

          <div
            style={{
              position: "absolute",
              top: 10,
              right: 8,
              width: 34,
              height: 58,
              borderRadius: "18px",
              background: "radial-gradient(circle at 30% 30%, #ffffff, #cbd5e1)",
              border: "2px solid #94a3b8",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
              transform: "rotate(-28deg)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 4,
              zIndex: 6,
            }}
          >
            <div style={{ width: "100%", height: 6, background: "#22c55e", borderRadius: 3 }} />
          </div>

          {/* Sleek Dark Laptop with Green 'S' Logo on Lid */}
          <motion.div
            style={{
              position: "absolute",
              top: 50,
              width: 118,
              height: 72,
              borderRadius: "12px",
              background: "linear-gradient(145deg, #1e293b 0%, #090d16 100%)",
              border: "1.5px solid rgba(255, 255, 255, 0.18)",
              boxShadow:
                "0 12px 28px rgba(0, 0, 0, 0.7), 0 0 20px rgba(34, 197, 94, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "perspective(350px) rotateX(14deg)",
              zIndex: 8,
            }}
            animate={
              state === "email"
                ? { y: [-1.5, 1.5, -1.5] }
                : {}
            }
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            {/* Glowing Green 'S' Logo */}
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 24,
                fontWeight: 800,
                fontStyle: "italic",
                color: "#22c55e",
                textShadow: "0 0 14px #22c55e, 0 0 24px rgba(34, 197, 94, 0.7)",
              }}
            >
              S
            </div>
          </motion.div>

          {/* Cross-Legged White Legs with Green Sneaker Soles */}
          <div
            style={{
              position: "absolute",
              bottom: 4,
              width: 198,
              height: 50,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 4,
            }}
          >
            {/* Left Foot */}
            <div
              style={{
                width: 78,
                height: 40,
                borderRadius: "26px 18px 22px 26px",
                background: "radial-gradient(circle at 35% 30%, #ffffff, #cbd5e1)",
                border: "2px solid #94a3b8",
                boxShadow: "0 6px 14px rgba(0, 0, 0, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingLeft: 8,
              }}
            >
              <div style={{ width: 20, height: 22, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} />
            </div>

            {/* Right Foot */}
            <div
              style={{
                width: 78,
                height: 40,
                borderRadius: "18px 26px 26px 22px",
                background: "radial-gradient(circle at 35% 30%, #ffffff, #cbd5e1)",
                border: "2px solid #94a3b8",
                boxShadow: "0 6px 14px rgba(0, 0, 0, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 8,
              }}
            >
              <div style={{ width: 20, height: 22, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Sparks */}
      <AnimatePresence>
        {success && (
          <>
            <motion.span
              style={{ position: "absolute", top: 15, left: 10, color: "#22c55e", fontSize: 28, textShadow: "0 0 12px #22c55e" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.4, 1], y: [-5, -25] }}
            >
              ✨
            </motion.span>
            <motion.span
              style={{ position: "absolute", top: 35, right: 10, color: "#4ade80", fontSize: 26, textShadow: "0 0 12px #22c55e" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: [0, 1.4, 1], y: [-5, -25] }}
            >
              ✦
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
