import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Cinematic 3D SwaplyOne Offline Core Canvas (Three.js WebGL)
 * - Hero 3D Abstract Compiler Core with layered circular structures, dark metallic finishes,
 *   translucent glass elements, and internal forest-green energy flow
 * - Storytelling particle lifecycle: active data streams -> slowing down -> quiet solitary offline state
 * - Cursor gravitational attraction and parallax tilt
 * - Reconnect wake-up sequence with expanding energy pulses and green data streams
 */
export default function OfflineCore3DCanvas({
  phase = "OFFLINE", // "TRANSITION_TO_OFFLINE" | "OFFLINE" | "SEARCHING" | "RESTORED" | "FAILED"
  isReconnecting = false,
  onCoreHover,
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    phase,
    isReconnecting,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0, hoverIntensity: 0 },
    storyTime: 0,
    pulseRadius: 0,
  });

  stateRef.current.phase = phase;
  stateRef.current.isReconnecting = isReconnecting;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera & High-Dynamic-Range Tone Mapping
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Restrained Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x060c08, 3.5);
    scene.add(ambientLight);

    const forestGreenLight = new THREE.PointLight(0x228B22, 4.0, 25);
    forestGreenLight.position.set(4, 5, 7);
    scene.add(forestGreenLight);

    const bronzeLight = new THREE.PointLight(0xc59b63, 3.0, 25);
    bronzeLight.position.set(-5, -4, 6);
    scene.add(bronzeLight);

    const innerCoreLight = new THREE.PointLight(0x4ade80, 1.8, 12);
    innerCoreLight.position.set(0, 0, 0);
    scene.add(innerCoreLight);

    // 3. Materials
    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x111c15,
      metalness: 0.94,
      roughness: 0.28,
    });

    const bronzeMaterial = new THREE.MeshStandardMaterial({
      color: 0xc59b63,
      metalness: 0.88,
      roughness: 0.24,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xebfbee,
      metalness: 0.08,
      roughness: 0.14,
      transmission: 0.88,
      thickness: 1.4,
      ior: 1.52,
      transparent: true,
      opacity: 0.92,
    });

    const wireGreenMaterial = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    const wireGoldMaterial = new THREE.MeshBasicMaterial({
      color: 0xe6ca9c,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    // 4. Hero 3D SwaplyOne Compiler Core Hierarchy
    const coreRoot = new THREE.Group();
    scene.add(coreRoot);
    coreRoot.position.set(0, 0.2, 0);

    // Layer 1: Outer Translucent Glass Torus
    const glassTorusGeo = new THREE.TorusGeometry(3.2, 0.13, 32, 120);
    const glassTorus = new THREE.Mesh(glassTorusGeo, glassMaterial);
    coreRoot.add(glassTorus);

    // Layer 2: Dual SwaplyOne Brand Orbital Crescent Rings
    const arcTopGeo = new THREE.TorusGeometry(2.7, 0.16, 24, 60, Math.PI * 0.95);
    const arcTop = new THREE.Mesh(arcTopGeo, darkMetalMaterial);
    arcTop.rotation.z = Math.PI * 0.12;
    coreRoot.add(arcTop);

    const arcBottomGeo = new THREE.TorusGeometry(2.7, 0.16, 24, 60, Math.PI * 0.95);
    const arcBottom = new THREE.Mesh(arcBottomGeo, bronzeMaterial);
    arcBottom.rotation.z = Math.PI * 1.12;
    coreRoot.add(arcBottom);

    // Layer 3: Smooth Mechanical Segmented Track
    const segGroup = new THREE.Group();
    const segCount = 16;
    for (let i = 0; i < segCount; i++) {
      const angle = (i / segCount) * Math.PI * 2;
      const segMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.35, 0.14),
        i % 4 === 0 ? bronzeMaterial : darkMetalMaterial
      );
      segMesh.position.set(Math.cos(angle) * 2.15, Math.sin(angle) * 2.15, 0);
      segMesh.rotation.z = angle;
      segGroup.add(segMesh);
    }
    coreRoot.add(segGroup);

    // Layer 4: Inner Gimbal Wireframe Rings
    const innerRing1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.06, 16, 80), wireGreenMaterial);
    coreRoot.add(innerRing1);

    const innerRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.05, 16, 80), wireGoldMaterial);
    coreRoot.add(innerRing2);

    // Layer 5: Inner Quantum Octahedron Prism & Glowing Heart
    const prismMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.95, 0), darkMetalMaterial);
    coreRoot.add(prismMesh);

    const prismWire = new THREE.Mesh(new THREE.OctahedronGeometry(1.08, 0), wireGreenMaterial);
    coreRoot.add(prismWire);

    const heartSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0x4ade80 })
    );
    coreRoot.add(heartSphere);

    // 5. Inward Traveling Connection Streams & Story Particles
    // Particles that start outside the screen and travel toward the Core
    const streamParticleCount = 80;
    const streamParticles = [];
    const streamGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const streamMatGreen = new THREE.MeshBasicMaterial({ color: 0x86efac, transparent: true, opacity: 0.8 });

    for (let i = 0; i < streamParticleCount; i++) {
      const pMesh = new THREE.Mesh(streamGeo, streamMatGreen);
      scene.add(pMesh);

      const angle = Math.random() * Math.PI * 2;
      const startDist = 8.5 + Math.random() * 8.0;
      const heightZ = (Math.random() - 0.5) * 4.0;

      streamParticles.push({
        mesh: pMesh,
        angle,
        startDist,
        dist: startDist,
        z: heightZ,
        speed: 0.03 + Math.random() * 0.03,
        fadeProgress: 1.0,
      });
    }

    // Solitary floating orbit motes around the Core (quiet offline state)
    const orbitCount = 28;
    const orbitMotes = [];
    const moteMat = new THREE.MeshBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 0.65 });

    for (let i = 0; i < orbitCount; i++) {
      const mMesh = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.12), i % 2 === 0 ? bronzeMaterial : moteMat);
      coreRoot.add(mMesh);

      const r = 3.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      orbitMotes.push({
        mesh: mMesh,
        r,
        theta,
        phi,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        floatFreq: 0.8 + Math.random() * 1.2,
      });
    }

    // 6. Expanding Pulse Shockwave (on Reconnect / Wake up)
    const shockwaveGeo = new THREE.RingGeometry(0.2, 0.35, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const shockwaveRing = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    scene.add(shockwaveRing);

    // 7. Event Handlers & Dynamic Cursor Interaction
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (width < 900) {
        camera.position.z = 18;
      } else {
        camera.position.z = 15;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const nx = (clientX / width) * 2 - 1;
      const ny = -(clientY / height) * 2 + 1;

      stateRef.current.mouse.targetX = nx;
      stateRef.current.mouse.targetY = ny;

      // Calculate distance to center core
      const distToCenter = Math.hypot(nx, ny);
      if (distToCenter < 0.35) {
        stateRef.current.mouse.hoverIntensity = 1.0;
        if (onCoreHover) onCoreHover(true);
      } else {
        stateRef.current.mouse.hoverIntensity = 0;
        if (onCoreHover) onCoreHover(false);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 8. Animation Loop
    let animId;
    let clock = new THREE.Clock();
    let reconnectPulseTime = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const { phase: currentPhase, isReconnecting: reconnecting, mouse } = stateRef.current;

      // Mouse Interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const isRestored = currentPhase === "RESTORED";
      const isSearching = currentPhase === "SEARCHING" || reconnecting;

      // Core rotation speed based on state
      const rotSpeed = isRestored ? 4.5 : isSearching ? 2.8 : 1.0;

      // Gyroscopic Layer Rotations
      glassTorus.rotation.x += 0.003 * rotSpeed;
      glassTorus.rotation.y += 0.006 * rotSpeed;
      arcTop.rotation.z += 0.008 * rotSpeed;
      arcBottom.rotation.z -= 0.008 * rotSpeed;
      segGroup.rotation.z -= 0.005 * rotSpeed;
      innerRing1.rotation.x += 0.012 * rotSpeed;
      innerRing1.rotation.y += 0.01 * rotSpeed;
      innerRing2.rotation.y -= 0.014 * rotSpeed;
      prismMesh.rotation.x += 0.01 * rotSpeed;
      prismMesh.rotation.y += 0.012 * rotSpeed;
      prismWire.rotation.x -= 0.007 * rotSpeed;

      // Core parallax tilt towards cursor with gravitational pull
      coreRoot.rotation.y = mouse.x * 0.4;
      coreRoot.rotation.x = -mouse.y * 0.32;

      // Internal Energy Glow Pulse
      const hoverBoost = mouse.hoverIntensity * 1.5;
      const basePulse = isRestored ? 4.5 : isSearching ? 3.0 : 1.6;
      innerCoreLight.intensity = basePulse + hoverBoost + Math.sin(time * (isSearching ? 8 : 2.5)) * 0.6;
      forestGreenLight.intensity = (isRestored ? 6.5 : 4.0) + hoverBoost;

      // Reconnect Expanding Pulse Shockwave
      if (isSearching || isRestored) {
        reconnectPulseTime += 0.022;
        if (reconnectPulseTime > 1) reconnectPulseTime = 0;
        const scale = 0.8 + reconnectPulseTime * 14;
        shockwaveRing.scale.set(scale, scale, 1);
        shockwaveMat.opacity = Math.sin(reconnectPulseTime * Math.PI) * (isRestored ? 0.9 : 0.6);
      } else {
        shockwaveMat.opacity = 0;
        reconnectPulseTime = 0;
      }

      // Inward Stream Particles (Active when restored/online, slowing/fading in offline)
      streamParticles.forEach((sp) => {
        if (isRestored) {
          // Fast incoming data stream
          sp.dist -= sp.speed * 2.5;
          if (sp.dist < 1.0) sp.dist = sp.startDist;
          sp.mesh.material.opacity = 0.85;
        } else if (isSearching) {
          // Searching stream attempts
          sp.dist -= sp.speed * 1.2;
          if (sp.dist < 1.5) sp.dist = sp.startDist;
          sp.mesh.material.opacity = 0.5;
        } else {
          // Offline: Incoming trails fade and stop outside
          sp.dist -= sp.speed * 0.15;
          if (sp.dist < 4.0) {
            sp.mesh.material.opacity = 0;
          } else {
            sp.mesh.material.opacity = Math.max(0, (sp.dist - 4.0) / 8.0) * 0.3;
          }
        }

        const posX = Math.cos(sp.angle) * sp.dist;
        const posY = Math.sin(sp.angle) * sp.dist;
        sp.mesh.position.set(posX, posY, sp.z);
      });

      // Solitary Orbiting Motes around Core
      orbitMotes.forEach((m, idx) => {
        m.theta += 0.006;
        const currentR = m.r + Math.sin(time * m.floatFreq + idx) * 0.2;
        m.mesh.position.x = currentR * Math.sin(m.phi) * Math.cos(m.theta);
        m.mesh.position.y = currentR * Math.sin(m.phi) * Math.sin(m.theta);
        m.mesh.position.z = currentR * Math.cos(m.phi) * 0.7;

        m.mesh.rotation.x += m.rotSpeedX;
        m.mesh.rotation.y += m.rotSpeedY;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="swaply-offline-canvas-container"
      aria-hidden="true"
    />
  );
}
