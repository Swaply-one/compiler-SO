import React, { useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";

/**
 * RealisticFurTigerMascot Component
 * - Features hyper-detailed realistic hair/fur grooming, individual hair strands & velvety peach fuzz
 * - 4 High-Fidelity 3D Studio States:
 *   1. Idle / Normal (/mascot/tiger/idle.jpg)
 *   2. Email Focus (/mascot/tiger/email.jpg)
 *   3. Password Focus (/mascot/tiger/password.jpg - Fluffy paws covering eyes 🙈)
 *   4. Password Toggle / Success (/mascot/tiger/success.jpg - Playful peeking wink & green compiler particles 👀)
 * - 3D mouse parallax tilt & breathing floating physics
 */
export default function RealisticFurTigerMascot({
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

  // Determine active state image and key
  const { currentImage, stateKey } = useMemo(() => {
    if (success) {
      return { currentImage: "/mascot/tiger/success.jpg", stateKey: "success" };
    }
    if (passwordFocused && !passwordVisible) {
      return { currentImage: "/mascot/tiger/password.jpg", stateKey: "password" };
    }
    if (passwordFocused && passwordVisible) {
      return { currentImage: "/mascot/tiger/success.jpg", stateKey: "peek" };
    }
    if (emailFocused) {
      return { currentImage: "/mascot/tiger/email.jpg", stateKey: "email" };
    }
    return { currentImage: "/mascot/tiger/idle.jpg", stateKey: "idle" };
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
      {/* Warm Amber Contact Underglow */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 12,
          width: 230,
          height: 35,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(234, 88, 12, 0.45) 0%, rgba(245, 158, 11, 0.25) 45%, transparent 70%)",
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
          width: 290,
          height: 290,
          borderRadius: 30,
          overflow: "hidden",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 35px -5px rgba(234, 88, 12, 0.35)",
          border: "1.5px solid rgba(245, 158, 11, 0.35)",
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
        {/* Seamless Cross-fade Between 3D Fur Tiger States */}
        <AnimatePresence mode="popLayout">
          <motion.img
            key={stateKey}
            src={currentImage}
            alt="Swaply One Compiler Realistic Fur Tiger Mascot"
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
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 45%, rgba(234, 88, 12, 0.08) 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}
