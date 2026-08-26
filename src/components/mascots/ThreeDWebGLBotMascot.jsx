import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive Real-Time 3D WebGL Mascot (Powered by Three.js)
 * Features:
 * - Real 3D PBR metallic & glass shaders with realistic point lights & shadows
 * - Real-time 3D head rotation tracking mouse cursor
 * - Glowing emissive LED pill eyes on curved visor
 * - 3D floating magnetic hands that physically fly up to cover eyes on password focus & peek!
 * - Real 3D floating particles & celebratory spin on login
 */
export default function ThreeDWebGLBotMascot({
  passwordFocused,
  passwordVisible,
  emailFocused,
  error,
  success,
}) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    passwordFocused,
    passwordVisible,
    emailFocused,
    error,
    success,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
  });

  // Keep stateRef in sync with props
  useEffect(() => {
    stateRef.current.passwordFocused = passwordFocused;
    stateRef.current.passwordVisible = passwordVisible;
    stateRef.current.emailFocused = emailFocused;
    stateRef.current.error = error;
    stateRef.current.success = success;
  }, [passwordFocused, passwordVisible, emailFocused, error, success]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainLight.position.set(5, 8, 6);
    scene.add(mainLight);

    const rimLight = new THREE.PointLight(0x22c55e, 4.5, 12);
    rimLight.position.set(-4, 3, -2);
    scene.add(rimLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 3.0, 10);
    cyanLight.position.set(4, -2, 2);
    scene.add(cyanLight);

    // 4. Robot Group
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // Head Unit
    const headGroup = new THREE.Group();
    robotGroup.add(headGroup);

    // White Helmet Shell
    const helmetGeo = new THREE.SphereGeometry(1.4, 48, 48);
    helmetGeo.scale(1, 0.94, 0.94);
    const helmetMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.25,
      metalness: 0.1,
    });
    const helmet = new THREE.Mesh(helmetGeo, helmetMat);
    headGroup.add(helmet);

    // Dark Glossy Visor Screen
    const visorGeo = new THREE.SphereGeometry(1.22, 48, 48);
    visorGeo.scale(0.92, 0.82, 0.88);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x07090e,
      roughness: 0.1,
      metalness: 0.85,
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0, 0.28);
    headGroup.add(visor);

    // Glowing Green LED Eyes (Pill Capsules)
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x4ade80,
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });

    const leftEyeGeo = new THREE.CapsuleGeometry(0.14, 0.28, 16, 16);
    const leftEye = new THREE.Mesh(leftEyeGeo, eyeMat);
    leftEye.position.set(-0.42, 0.08, 1.35);
    headGroup.add(leftEye);

    const rightEyeGeo = new THREE.CapsuleGeometry(0.14, 0.28, 16, 16);
    const rightEye = new THREE.Mesh(rightEyeGeo, eyeMat);
    rightEye.position.set(0.42, 0.08, 1.35);
    headGroup.add(rightEye);

    // Closed Eyes Arc (Torus arcs for (︶ ‿ ︶))
    const closedEyeGeo = new THREE.TorusGeometry(0.22, 0.04, 16, 32, Math.PI);
    const closedEyeMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 3.0,
    });

    const leftClosedEye = new THREE.Mesh(closedEyeGeo, closedEyeMat);
    leftClosedEye.position.set(-0.42, 0.02, 1.35);
    leftClosedEye.rotation.z = Math.PI;
    leftClosedEye.visible = false;
    headGroup.add(leftClosedEye);

    const rightClosedEye = new THREE.Mesh(closedEyeGeo, closedEyeMat);
    rightClosedEye.position.set(0.42, 0.02, 1.35);
    rightClosedEye.rotation.z = Math.PI;
    rightClosedEye.visible = false;
    headGroup.add(rightClosedEye);

    // Glowing Sprout Antenna on Top
    const sproutGroup = new THREE.Group();
    sproutGroup.position.set(0, 1.35, 0);

    const stemGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.25, 16);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.3 });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = 0.1;
    sproutGroup.add(stem);

    const leafGeo = new THREE.SphereGeometry(0.18, 16, 16);
    leafGeo.scale(1.4, 0.4, 0.6);
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 1.2,
      roughness: 0.2,
    });

    const leftLeaf = new THREE.Mesh(leafGeo, leafMat);
    leftLeaf.position.set(-0.16, 0.26, 0);
    leftLeaf.rotation.z = -0.5;
    sproutGroup.add(leftLeaf);

    const rightLeaf = new THREE.Mesh(leafGeo, leafMat);
    rightLeaf.position.set(0.16, 0.26, 0);
    rightLeaf.rotation.z = 0.5;
    sproutGroup.add(rightLeaf);

    headGroup.add(sproutGroup);

    // DJ Headphone Earcups
    const earcupMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.8 });
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 2 });

    const leftEarGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.25, 32);
    const leftEarcup = new THREE.Mesh(leftEarGeo, earcupMat);
    leftEarcup.position.set(-1.42, 0, 0);
    leftEarcup.rotation.z = Math.PI / 2;
    headGroup.add(leftEarcup);

    const leftRing = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.03, 16, 32), ringMat);
    leftRing.position.set(-1.55, 0, 0);
    leftRing.rotation.y = Math.PI / 2;
    headGroup.add(leftRing);

    const rightEarcup = new THREE.Mesh(leftEarGeo, earcupMat);
    rightEarcup.position.set(1.42, 0, 0);
    rightEarcup.rotation.z = Math.PI / 2;
    headGroup.add(rightEarcup);

    const rightRing = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.03, 16, 32), ringMat);
    rightRing.position.set(1.55, 0, 0);
    rightRing.rotation.y = Math.PI / 2;
    headGroup.add(rightRing);

    // 5. Floating Magnetic 3D Hands
    const handMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.2,
      metalness: 0.3,
    });
    const handPadMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 1.5,
    });

    const leftHandGroup = new THREE.Group();
    const leftHandMesh = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), handMat);
    leftHandMesh.scale.set(1, 1.1, 0.7);
    leftHandGroup.add(leftHandMesh);
    const leftHandPad = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.05, 16), handPadMat);
    leftHandPad.position.set(0, 0, 0.22);
    leftHandPad.rotation.x = Math.PI / 2;
    leftHandGroup.add(leftHandPad);
    robotGroup.add(leftHandGroup);

    const rightHandGroup = new THREE.Group();
    const rightHandMesh = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), handMat);
    rightHandMesh.scale.set(1, 1.1, 0.7);
    rightHandGroup.add(rightHandMesh);
    const rightHandPad = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.05, 16), handPadMat);
    rightHandPad.position.set(0, 0, 0.22);
    rightHandPad.rotation.x = Math.PI / 2;
    rightHandGroup.add(rightHandPad);
    robotGroup.add(rightHandGroup);

    // 6. Floating 3D Sparkle Particles
    const particlesCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x22c55e,
      size: 0.07,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mouse Listener
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / height) * 2 - 1);
      stateRef.current.targetMouseX = Math.max(-1, Math.min(1, x));
      stateRef.current.targetMouseY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 8. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const state = stateRef.current;

      // Smooth mouse interpolation
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.08;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.08;

      // Idle floating motion
      robotGroup.position.y = Math.sin(elapsedTime * 2) * 0.1;

      // Sprout gentle sway
      sproutGroup.rotation.z = Math.sin(elapsedTime * 3) * 0.08;

      // Head 3D rotation following cursor
      headGroup.rotation.y = state.mouseX * 0.45;
      headGroup.rotation.x = -state.mouseY * 0.35;

      // Password Focus State (Hands fly up to cover eyes!)
      if (state.passwordFocused && !state.passwordVisible) {
        // Closed eyes visible
        leftEye.visible = false;
        rightEye.visible = false;
        leftClosedEye.visible = true;
        rightClosedEye.visible = true;

        // Hands cover eyes in 3D space
        leftHandGroup.position.lerp(new THREE.Vector3(-0.42, 0.1, 1.48), 0.14);
        leftHandGroup.rotation.z = 0.2;

        rightHandGroup.position.lerp(new THREE.Vector3(0.42, 0.1, 1.48), 0.14);
        rightHandGroup.rotation.z = -0.2;
      } else if (state.passwordFocused && state.passwordVisible) {
        // Peek state: Left eye covered, right eye peeking!
        leftEye.visible = false;
        rightEye.visible = true;
        leftClosedEye.visible = true;
        rightClosedEye.visible = false;

        leftHandGroup.position.lerp(new THREE.Vector3(-0.42, 0.1, 1.48), 0.14);
        rightHandGroup.position.lerp(new THREE.Vector3(0.85, -0.4, 0.8), 0.14);
        rightHandGroup.rotation.z = -0.4;
      } else {
        // Normal / Idle state
        leftEye.visible = true;
        rightEye.visible = true;
        leftClosedEye.visible = false;
        rightClosedEye.visible = false;

        // Hands float naturally at sides
        const idleLeftHandY = -0.6 + Math.sin(elapsedTime * 2.5) * 0.08;
        const idleRightHandY = -0.6 + Math.cos(elapsedTime * 2.5) * 0.08;

        leftHandGroup.position.lerp(new THREE.Vector3(-1.6, idleLeftHandY, 0.4), 0.08);
        leftHandGroup.rotation.z = -0.15;

        rightHandGroup.position.lerp(new THREE.Vector3(1.6, idleRightHandY, 0.4), 0.08);
        rightHandGroup.rotation.z = 0.15;
      }

      // Success victory spin
      if (state.success) {
        robotGroup.rotation.y += 0.08;
        particleMat.opacity = 1;
        rimLight.intensity = 8;
      } else {
        robotGroup.rotation.y = 0;
        particleMat.opacity = 0.5;
        rimLight.intensity = 4.5;
      }

      // Slowly rotate background particles
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: 320,
        height: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        cursor: "grab",
      }}
    />
  );
}
