import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D Abstract Compiler Core Canvas (Three.js WebGL)
 * - Layered geometric rings, frosted glass surfaces, mechanical segments
 * - Dual orbital crescent rings echoing the SwaplyOne brand 'S' logo
 * - Floating broken data fragments and particle constellation
 * - Real-time cursor parallax and dynamic connection lines
 * - Recompile vortex acceleration and collapse sequence
 */
export default function CompilerCore3DCanvas({
  isRecompiling = false,
  mousePos = { x: 0, y: 0 },
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    isRecompiling: false,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
  });

  stateRef.current.isRecompiling = isRecompiling;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Atmospheric Lighting
    const ambientLight = new THREE.AmbientLight(0x111c14, 2.5);
    scene.add(ambientLight);

    const greenLight = new THREE.PointLight(0x22c55e, 4.5, 30);
    greenLight.position.set(6, 4, 8);
    scene.add(greenLight);

    const goldLight = new THREE.PointLight(0xc59b63, 4.0, 30);
    goldLight.position.set(-6, -4, 7);
    scene.add(goldLight);

    const centerCoreLight = new THREE.PointLight(0x4ade80, 2.0, 15);
    centerCoreLight.position.set(0, 0, 0);
    scene.add(centerCoreLight);

    // 3. Materials
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xebfbee,
      metalness: 0.1,
      roughness: 0.18,
      transmission: 0.82,
      thickness: 1.2,
      ior: 1.52,
      transparent: true,
      opacity: 0.9,
    });

    const bronzeMaterial = new THREE.MeshStandardMaterial({
      color: 0xc59b63,
      metalness: 0.85,
      roughness: 0.28,
      envMapIntensity: 1.2,
    });

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x18241c,
      metalness: 0.9,
      roughness: 0.35,
    });

    const wireframeGreenMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    const wireframeGoldMat = new THREE.MeshBasicMaterial({
      color: 0xe6ca9c,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    // 4. Main Compiler Core Hierarchy
    const coreRoot = new THREE.Group();
    scene.add(coreRoot);

    // Right-side core positioning (unified solid object)
    coreRoot.position.set(3.0, 0, 0);





    // --- Ring A: Outer Translucent Glass Torus ---
    const glassTorusGeo = new THREE.TorusGeometry(3.6, 0.14, 32, 120);
    const glassTorus = new THREE.Mesh(glassTorusGeo, glassMaterial);
    coreRoot.add(glassTorus);

    // --- Ring B: SwaplyOne Dual Orbital Crescent Arcs ---
    const arcTopGeo = new THREE.TorusGeometry(3.1, 0.18, 24, 60, Math.PI * 0.92);
    const arcTop = new THREE.Mesh(arcTopGeo, darkMetalMaterial);
    arcTop.rotation.z = Math.PI * 0.1;
    coreRoot.add(arcTop);

    const arcBottomGeo = new THREE.TorusGeometry(3.1, 0.18, 24, 60, Math.PI * 0.92);
    const arcBottom = new THREE.Mesh(arcBottomGeo, bronzeMaterial);
    arcBottom.rotation.z = Math.PI * 1.1;
    coreRoot.add(arcBottom);

    // --- Ring C: Segmented Data Track ---
    const segmentCount = 18;
    const trackGroup = new THREE.Group();
    for (let i = 0; i < segmentCount; i++) {
      const angle = (i / segmentCount) * Math.PI * 2;
      const segGeo = new THREE.BoxGeometry(0.16, 0.4, 0.18);
      const segMat = i % 3 === 0 ? bronzeMaterial : darkMetalMaterial;
      const segMesh = new THREE.Mesh(segGeo, segMat);
      segMesh.position.set(Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 0);
      segMesh.rotation.z = angle;
      trackGroup.add(segMesh);
    }
    coreRoot.add(trackGroup);

    // --- Ring D: Inner Gimbal Rings ---
    const innerRingGeo1 = new THREE.TorusGeometry(1.9, 0.08, 16, 80);
    const innerRing1 = new THREE.Mesh(innerRingGeo1, wireframeGreenMat);
    coreRoot.add(innerRing1);

    const innerRingGeo2 = new THREE.TorusGeometry(1.4, 0.06, 16, 80);
    const innerRing2 = new THREE.Mesh(innerRingGeo2, wireframeGoldMat);
    coreRoot.add(innerRing2);

    // --- Inner Quantum Prism / Crystalline Octahedron ---
    const prismGeo = new THREE.OctahedronGeometry(1.1, 0);
    const prismMesh = new THREE.Mesh(prismGeo, darkMetalMaterial);
    coreRoot.add(prismMesh);

    const prismWireGeo = new THREE.OctahedronGeometry(1.25, 0);
    const prismWire = new THREE.Mesh(prismWireGeo, wireframeGreenMat);
    coreRoot.add(prismWire);

    // Inner glowing core sphere
    const coreSphereGeo = new THREE.SphereGeometry(0.45, 24, 24);
    const coreSphereMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    coreRoot.add(coreSphere);

    // 5. Floating Broken Data Fragments
    const fragmentCount = 34;
    const fragments = [];
    const fragmentGroup = new THREE.Group();
    coreRoot.add(fragmentGroup);

    const fragmentGeos = [
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.TetrahedronGeometry(0.24, 0),
      new THREE.OctahedronGeometry(0.22, 0),
      new THREE.CylinderGeometry(0.08, 0.08, 0.35, 6),
    ];

    for (let i = 0; i < fragmentCount; i++) {
      const geo = fragmentGeos[i % fragmentGeos.length];
      const mat = i % 2 === 0 ? bronzeMaterial : darkMetalMaterial;
      const mesh = new THREE.Mesh(geo, mat);

      // Spherical orbital distribution
      const radius = 4.2 + Math.random() * 3.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const origX = radius * Math.sin(phi) * Math.cos(theta);
      const origY = radius * Math.sin(phi) * Math.sin(theta);
      const origZ = (radius * Math.cos(phi)) * 0.7;

      mesh.position.set(origX, origY, origZ);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      fragmentGroup.add(mesh);
      fragments.push({
        mesh,
        origX,
        origY,
        origZ,
        speedX: (Math.random() - 0.5) * 0.015,
        speedY: (Math.random() - 0.5) * 0.015,
        floatFreq: 0.8 + Math.random() * 1.5,
        floatAmp: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 6. Dynamic Cursor Follow & Responsive Resize

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Positioning: Right side on desktop, top-center on mobile
      if (width < 960) {
        coreRoot.position.set(0, 1.8, 0);
        camera.position.z = 18;
      } else {
        coreRoot.position.set(3.0, 0, 0);
        camera.position.z = 15;
      }
    };




    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.mouse.targetX = nx;
      stateRef.current.mouse.targetY = ny;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 8. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      const { isRecompiling: recompileActive } = stateRef.current;

      // Mouse smooth interpolation
      stateRef.current.mouse.x += (stateRef.current.mouse.targetX - stateRef.current.mouse.x) * 0.06;
      stateRef.current.mouse.y += (stateRef.current.mouse.targetY - stateRef.current.mouse.y) * 0.06;
      const mx = stateRef.current.mouse.x;
      const my = stateRef.current.mouse.y;

      // Dynamic rotation speed multiplier
      const rotSpeed = recompileActive ? 6.5 : 1.0;

      // Layered Gyroscopic Core Rotations
      glassTorus.rotation.x += 0.004 * rotSpeed;
      glassTorus.rotation.y += 0.007 * rotSpeed;

      arcTop.rotation.z += 0.009 * rotSpeed;
      arcBottom.rotation.z -= 0.009 * rotSpeed;

      trackGroup.rotation.z -= 0.006 * rotSpeed;

      innerRing1.rotation.x += 0.015 * rotSpeed;
      innerRing1.rotation.y += 0.012 * rotSpeed;

      innerRing2.rotation.y -= 0.018 * rotSpeed;
      innerRing2.rotation.z += 0.011 * rotSpeed;

      prismMesh.rotation.x += 0.01 * rotSpeed;
      prismMesh.rotation.y += 0.014 * rotSpeed;
      prismWire.rotation.x -= 0.008 * rotSpeed;
      prismWire.rotation.z -= 0.012 * rotSpeed;

      // Core root subtle mouse parallax tilt
      coreRoot.rotation.y = mx * 0.45;
      coreRoot.rotation.x = -my * 0.35;

      // Pulse core light
      const pulseBase = recompileActive ? 6.0 : 2.0;
      centerCoreLight.intensity = pulseBase + Math.sin(time * (recompileActive ? 12 : 3)) * (recompileActive ? 3.0 : 0.8);
      greenLight.intensity = recompileActive ? 7.0 : 4.5;
      goldLight.intensity = recompileActive ? 6.0 : 4.0;

      // Floating fragments motion (Organic float vs Recompile vortex collapse)
      fragments.forEach((f) => {
        if (recompileActive) {
          // Collapse toward center with high-frequency vortex
          f.mesh.position.x += (0 - f.mesh.position.x) * 0.12 + (Math.random() - 0.5) * 0.1;
          f.mesh.position.y += (0 - f.mesh.position.y) * 0.12 + (Math.random() - 0.5) * 0.1;
          f.mesh.position.z += (0 - f.mesh.position.z) * 0.12 + (Math.random() - 0.5) * 0.1;
          f.mesh.rotation.x += 0.1;
          f.mesh.rotation.y += 0.15;
        } else {
          // Organic orbital floating
          const targetY = f.origY + Math.sin(time * f.floatFreq + f.phase) * f.floatAmp;
          const targetX = f.origX + Math.cos(time * (f.floatFreq * 0.7) + f.phase) * (f.floatAmp * 0.8);

          f.mesh.position.x += (targetX - f.mesh.position.x) * 0.08;
          f.mesh.position.y += (targetY - f.mesh.position.y) * 0.08;
          f.mesh.position.z += (f.origZ - f.mesh.position.z) * 0.08;

          f.mesh.rotation.x += f.speedX;
          f.mesh.rotation.y += f.speedY;
        }
      });

      renderer.render(scene, camera);
    };


    animate();

    // 9. Cleanup
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
      className="swaply-404-canvas-container"
      aria-hidden="true"
    />
  );
}
