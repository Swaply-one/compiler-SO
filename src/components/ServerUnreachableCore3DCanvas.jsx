import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Cinematic 3D SwaplyOne Server Unreachable Core Canvas (Three.js WebGL)
 * - NO CONTINUOUS SPINNING: Features purposeful mechanical aperture calibration,
 *   discrete stepper gear indexing, directional sector sweeping (+/- 22 deg),
 *   breathing recoil pulsation, and focused acoustic probe rays scanning the void
 * - Visual Storytelling: Internet is alive, but outbound queries dissolve without return
 */
export default function ServerUnreachableCore3DCanvas({
  phase = "UNREACHABLE", // "UNREACHABLE" | "RETRYING" | "RESTORED" | "FAILED"
  isRetrying = false,
  onCoreHover,
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    phase,
    isRetrying,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0, hoverIntensity: 0 },
    pulseTime: 0,
    cycleTimer: 0,
  });

  stateRef.current.phase = phase;
  stateRef.current.isRetrying = isRetrying;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera & ACES Filmic Tone Mapping
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    container.appendChild(renderer.domElement);

    // 2. Restrained Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0x060c08, 3.5);
    scene.add(ambientLight);

    const forestGreenLight = new THREE.PointLight(0x228B22, 4.2, 25);
    forestGreenLight.position.set(4, 5, 7);
    scene.add(forestGreenLight);

    const bronzeLight = new THREE.PointLight(0xc59b63, 3.2, 25);
    bronzeLight.position.set(-5, -4, 6);
    scene.add(bronzeLight);

    const innerCoreLight = new THREE.PointLight(0x4ade80, 2.4, 14);
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
      opacity: 0.5,
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

    // Layer 1: Outer Translucent Glass Torus (Mechanical Breathing Shutter)
    const glassTorusGeo = new THREE.TorusGeometry(3.2, 0.13, 32, 120);
    const glassTorus = new THREE.Mesh(glassTorusGeo, glassMaterial);
    coreRoot.add(glassTorus);

    // Layer 2: Dual SwaplyOne Brand Orbital Crescent Rings (Aperture Calipers)
    const arcTopGeo = new THREE.TorusGeometry(2.7, 0.16, 24, 60, Math.PI * 0.95);
    const arcTop = new THREE.Mesh(arcTopGeo, darkMetalMaterial);
    arcTop.rotation.z = Math.PI * 0.12;
    coreRoot.add(arcTop);

    const arcBottomGeo = new THREE.TorusGeometry(2.7, 0.16, 24, 60, Math.PI * 0.95);
    const arcBottom = new THREE.Mesh(arcBottomGeo, bronzeMaterial);
    arcBottom.rotation.z = Math.PI * 1.12;
    coreRoot.add(arcBottom);

    // Layer 3: Discrete Stepper Segmented Index Track
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

    // Layer 4: Inner Gimbal Optical Calibrators
    const innerRing1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.06, 16, 80), wireGreenMaterial);
    coreRoot.add(innerRing1);

    const innerRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.05, 16, 80), wireGoldMaterial);
    coreRoot.add(innerRing2);

    // Layer 5: Inner Quantum Octahedron Prism & Recoil Heart
    const prismGroup = new THREE.Group();
    coreRoot.add(prismGroup);

    const prismMesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.95, 0), darkMetalMaterial);
    prismGroup.add(prismMesh);

    const prismWire = new THREE.Mesh(new THREE.OctahedronGeometry(1.08, 0), wireGreenMaterial);
    prismGroup.add(prismWire);

    const heartSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0x4ade80 })
    );
    prismGroup.add(heartSphere);

    // Layer 6: Directional Acoustic Probing Rays (Laser Scan Cones in the Void)
    const scanRaysGroup = new THREE.Group();
    coreRoot.add(scanRaysGroup);

    const rayGeo = new THREE.CylinderGeometry(0.015, 0.12, 6.5, 12, 1, true);
    rayGeo.translate(0, 3.25, 0);
    const rayMat = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });

    const scanRay1 = new THREE.Mesh(rayGeo, rayMat);
    scanRay1.rotation.z = Math.PI * 0.5;
    scanRaysGroup.add(scanRay1);

    const scanRay2 = new THREE.Mesh(rayGeo, rayMat);
    scanRay2.rotation.z = -Math.PI * 0.5;
    scanRaysGroup.add(scanRay2);

    // 5. Outward Dissolving Request Streams (Visual Storytelling: Requests sent outward -> dissolve into void)
    const requestParticleCount = 60;
    const requestParticles = [];
    const packetGeo = new THREE.SphereGeometry(0.065, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x86efac, transparent: true, opacity: 0.85 });

    for (let i = 0; i < requestParticleCount; i++) {
      const pMesh = new THREE.Mesh(packetGeo, packetMat);
      scene.add(pMesh);

      const angle = (i / requestParticleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const startDist = 0.5 + (i % 6) * 0.9;
      const heightZ = (Math.random() - 0.5) * 2.0;

      requestParticles.push({
        mesh: pMesh,
        angle,
        dist: startDist,
        z: heightZ,
        speed: 0.04 + Math.random() * 0.02,
        maxDist: 6.4,
      });
    }

    // Floating orbit motes around the Core
    const orbitCount = 24;
    const orbitMotes = [];

    for (let i = 0; i < orbitCount; i++) {
      const mMesh = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, 0.11), i % 2 === 0 ? bronzeMaterial : wireGreenMaterial);
      coreRoot.add(mMesh);

      const r = 3.5 + Math.random() * 2.0;
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

    // 6. Subtle Outward Acoustic Probe Rings
    const waitingRingGeo = new THREE.RingGeometry(0.2, 0.35, 64);
    const waitingRingMat = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const waitingRing = new THREE.Mesh(waitingRingGeo, waitingRingMat);
    scene.add(waitingRing);

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

    // 8. Animation Loop with Purposeful Calibration Mechanics (No Cheap Spinning)
    let animId;
    let clock = new THREE.Clock();
    let waitingPulseTime = 0;
    let currentStepIndex = 0;
    let stepTargetAngle = 0;
    let stepCurrentAngle = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const { phase: currentPhase, isRetrying: retrying, mouse } = stateRef.current;

      // Mouse Smooth Damping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const isRestored = currentPhase === "RESTORED";
      const isRetryingActive = currentPhase === "RETRYING" || retrying;

      // =========================================================================
      // MECHANICAL CALIBRATION & SECTOR SCANNING LOGIC (INSTEAD OF JUST SPINNING)
      // =========================================================================

      if (isRestored) {
        // Full harmonious operational spin once connection is restored
        glassTorus.rotation.y += 0.015;
        arcTop.rotation.z += 0.02;
        arcBottom.rotation.z -= 0.02;
        prismGroup.rotation.x += 0.02;
        prismGroup.rotation.y += 0.025;
        prismGroup.position.z = 0;
      } else {
        // 1. Directional Sector Scanning: Smooth back-and-forth horizon probe (+/- 24 deg)
        const scanFreq = isRetryingActive ? 2.5 : 1.1;
        const sectorScanAngle = Math.sin(time * scanFreq) * 0.42; // ~24 degrees oscillation
        glassTorus.rotation.y = sectorScanAngle + mouse.x * 0.3;
        scanRaysGroup.rotation.z = sectorScanAngle * 1.5;

        // 2. Discrete Chronograph Stepper Indexing on the Segmented Track
        // Every 1.6s, shifts by 1 discrete notch with mechanical snap
        const stepCycle = Math.floor(time * (isRetryingActive ? 2.2 : 0.85));
        if (stepCycle !== currentStepIndex) {
          currentStepIndex = stepCycle;
          stepTargetAngle = (currentStepIndex * (Math.PI * 2 / segCount));
        }
        stepCurrentAngle += (stepTargetAngle - stepCurrentAngle) * 0.22; // Snappy mechanical spring
        segGroup.rotation.z = stepCurrentAngle;

        // 3. Aperture Breathing Expansion & Contraction
        // The dual crescent arcs breathe open when focusing query, contract on discharge
        const apertureBreath = Math.sin(time * (isRetryingActive ? 3.0 : 1.4));
        const arcSpread = 0.15 + apertureBreath * 0.08;
        arcTop.rotation.z = Math.PI * 0.12 + arcSpread;
        arcBottom.rotation.z = Math.PI * 1.12 - arcSpread;
        arcTop.position.x = apertureBreath * 0.1;
        arcBottom.position.x = -apertureBreath * 0.1;

        // 4. Optical Calibrator Gimbal Micro-Tilts
        innerRing1.rotation.x = Math.sin(time * 1.6) * 0.25;
        innerRing1.rotation.y = Math.cos(time * 1.2) * 0.25;
        innerRing2.rotation.x = -Math.cos(time * 1.4) * 0.28;
        innerRing2.rotation.y = Math.sin(time * 1.8) * 0.28;

        // 5. Mechanical Recoil & Pulse on Quantum Prism Heart
        // Emits a query pulse -> recoils back into core -> breathes forward
        const recoilWave = Math.sin(time * (isRetryingActive ? 4.5 : 2.0));
        prismGroup.position.z = recoilWave < -0.6 ? (recoilWave + 0.6) * 0.45 : 0; // Recoil shock bounce
        prismGroup.rotation.x = Math.sin(time * 0.8) * 0.15;
        prismGroup.rotation.y = Math.cos(time * 0.9) * 0.18;
      }

      // Parallax Tilt toward cursor
      coreRoot.rotation.y = mouse.x * 0.35;
      coreRoot.rotation.x = -mouse.y * 0.28;

      // Internal Energy Glow Pulse
      const hoverBoost = mouse.hoverIntensity * 1.5;
      const basePulse = isRestored ? 4.5 : isRetryingActive ? 3.4 : 2.0;
      innerCoreLight.intensity = basePulse + hoverBoost + Math.sin(time * (isRetryingActive ? 8 : 2.5)) * 0.6;
      forestGreenLight.intensity = (isRestored ? 6.5 : 4.2) + hoverBoost;

      // Outward Acoustic Waiting Pulse
      waitingPulseTime += isRetryingActive ? 0.024 : 0.012;
      if (waitingPulseTime > 1) waitingPulseTime = 0;

      const pScale = 0.6 + waitingPulseTime * (isRestored ? 14 : 8.0);
      waitingRing.scale.set(pScale, pScale, 1);
      waitingRingMat.opacity = Math.sin(waitingPulseTime * Math.PI) * (isRestored ? 0.85 : isRetryingActive ? 0.65 : 0.38);

      // Outward Dissolving Request Particles
      requestParticles.forEach((rp) => {
        if (isRestored) {
          // Return Signal Flow: Data streams rush back INTO the Core!
          rp.dist -= rp.speed * 2.8;
          if (rp.dist < 0.5) rp.dist = rp.maxDist;
          rp.mesh.material.opacity = 0.9;
        } else {
          // Normal Unreachable Flow: Stream travels outward, reaches boundary, and disappears
          rp.dist += rp.speed * (isRetryingActive ? 2.0 : 1.0);

          if (rp.dist >= rp.maxDist) {
            rp.dist = 0.5; // Reset to core center for next request
          }

          // Fade out as it approaches the invisible boundary
          if (rp.dist < 4.2) {
            rp.mesh.material.opacity = 0.75;
          } else {
            rp.mesh.material.opacity = Math.max(0, (rp.maxDist - rp.dist) / 2.2) * 0.75;
          }
        }

        const posX = Math.cos(rp.angle) * rp.dist;
        const posY = Math.sin(rp.angle) * rp.dist;
        rp.mesh.position.set(posX, posY, rp.z);
      });

      // Orbiting Motes around Core
      orbitMotes.forEach((m, idx) => {
        m.theta += 0.005;
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
      className="swaply-server-canvas-container"
      aria-hidden="true"
    />
  );
}
