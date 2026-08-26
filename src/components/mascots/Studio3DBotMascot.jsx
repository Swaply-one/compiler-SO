import React, { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * Studio3DBotMascot Component
 * - Powered by 4 High-End 3D Studio Renders of the official Swaply Bot
 * - Interactive States:
 *   1. Idle / Normal (/mascot/idle.jpg)
 *   2. Email Focus (/mascot/email.jpg)
 *   3. Password Focus (/mascot/password.jpg - Eyes closed "I don't peek!")
 *   4. Password Toggle / Success (/mascot/success.jpg - Playful wink & glowing particles)
 * - 3D mouse parallax tilt & breathing floating physics
 */
export default function Studio3DBotMascot({
  passwordFocused,
  passwordVisible,
  emailFocused,
  error,
  success,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 160, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 160, damping: 20 });

  const rotateX = useTransform(smoothY, [-1, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [-1, 1], [-6, 6]);

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

  // Determine active state image and subtitle
  const { currentImage, stateKey } = useMemo(() => {
    if (success) {
      return { currentImage: "/mascot/success.jpg", stateKey: "success" };
    }
    if (passwordFocused && !passwordVisible) {
      return { currentImage: "/mascot/password.jpg", stateKey: "password" };
    }
    if (passwordFocused && passwordVisible) {
      return { currentImage: "/mascot/success.jpg", stateKey: "peek" };
    }
    if (emailFocused) {
      return { currentImage: "/mascot/email.jpg", stateKey: "email" };
    }
    return { currentImage: "/mascot/idle.jpg", stateKey: "idle" };
  }, [passwordFocused, passwordVisible, emailFocused, success]);

  return (
    <div
      style={{
        position: "relative",
        width: 320,
        height: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        perspective: 900,
      }}
    >
      {/* Dynamic 3D Neon Ambient Underglow */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 15,
          width: 220,
          height: 35,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(34, 197, 94, 0.45) 0%, rgba(16, 185, 129, 0.25) 45%, transparent 70%)",
          filter: "blur(8px)",
        }}
        animate={
          success
            ? { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }
            : { scale: [1, 0.92, 1], opacity: [0.55, 0.75, 0.55] }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating 3D Character Card with Parallax Tilt */}
      <motion.div
        style={{
          position: "relative",
          width: 280,
          height: 280,
          borderRadius: 28,
          overflow: "hidden",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px -5px rgba(34, 197, 94, 0.3)",
          border: "1.5px solid rgba(34, 197, 94, 0.3)",
          background: "#080c10",
        }}
        animate={
          success
            ? { y: [0, -18, 0], scale: [1, 1.05, 1] }
            : error
            ? { x: [-6, 6, -6, 6, 0], rotateZ: [-2, 2, -2, 2, 0] }
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
        {/* Seamless Cross-fade Between 3D Studio Render States */}
        <AnimatePresence mode="popLayout">
          <motion.img
            key={stateKey}
            src={currentImage}
            alt="Swaply One Compiler 3D Mascot"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            initial={{ opacity: 0.4, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.4, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Glossy Top Glass Shimmer Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 45%, rgba(34, 197, 94, 0.08) 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}
