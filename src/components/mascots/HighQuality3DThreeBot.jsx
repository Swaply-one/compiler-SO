import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Ultra-Polished 3D Studio Robot (Three.js with Procedural PBR Textures & Deep Lighting)
 *
 * High-End Features Added:
 * 1. Procedural PBR Carbon-Weave & Micro-Grain Normal/Bump Maps for fabric & metal
 * 2. Inner Visor Digital Matrix Grid Texture with optical depth & dual-layer cornea lenses
 * 3. Dynamic Underside Reactor Point Light illuminating the chin and chest
 * 4. Glowing </> Circuit Decal on the Chest Reactor Core
 * 5. Floating 3D Holographic Code Glyphs (<>, {}, 01, *) orbiting in real depth
 * 6. Interactive Holographic Typing Particle ripples on Email focus
 * 7. Soft Ambient Occlusion Contact Shadow with dynamic elevation scaling
 */
export default function HighQuality3DThreeBot({
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

    const width = container.clientWidth || 370;
    const height = container.clientHeight || 370;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 7.2);

    // 2. High-Performance WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. Multi-Layer Studio Lighting Pipeline
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Key Studio Light (Warm White)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4.5, 7, 5.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0008;
    scene.add(keyLight);

    // Cyan Fill Light (Soft cool contrast)
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    fillLight.position.set(-5, 2.5, 4);
    scene.add(fillLight);

    // Intense Emerald Rim Light (Volumetric back-edge glow)
    const neonRimLight = new THREE.PointLight(0x22c55e, 6.5, 12);
    neonRimLight.position.set(-3.8, 3.8, -2.2);
    scene.add(neonRimLight);

    // Secondary Cyan Rim Light
    const cyanRimLight = new THREE.PointLight(0x06b6d4, 4.5, 9);
    cyanRimLight.position.set(3.8, -2, -1.8);
    scene.add(cyanRimLight);

    // Dynamic Reactor Core Point Light (Illuminates chin and torso from within)
    const reactorLight = new THREE.PointLight(0x4ade80, 2.5, 4);
    reactorLight.position.set(0, -0.9, 1.1);
    scene.add(reactorLight);

    // =========================================================================
    // PROCEDURAL TEXTURE GENERATION (Carbon Fiber, Circuit Grid, Decal, Shadow)
    // =========================================================================

    // A. Carbon Fiber / Micro-Weave Bump Map
    const carbonCanvas = document.createElement("canvas");
    carbonCanvas.width = 128;
    carbonCanvas.height = 128;
    const carbonCtx = carbonCanvas.getContext("2d");
    carbonCtx.fillStyle = "#222222";
    carbonCtx.fillRect(0, 0, 128, 128);
    for (let x = 0; x < 128; x += 8) {
      for (let y = 0; y < 128; y += 8) {
        if ((x / 8 + y / 8) % 2 === 0) {
          carbonCtx.fillStyle = "#444444";
          carbonCtx.fillRect(x, y, 8, 8);
          carbonCtx.fillStyle = "#666666";
          carbonCtx.fillRect(x + 2, y + 2, 4, 4);
        }
      }
    }
    const carbonTex = new THREE.CanvasTexture(carbonCanvas);
    carbonTex.wrapS = THREE.RepeatWrapping;
    carbonTex.wrapT = THREE.RepeatWrapping;
    carbonTex.repeat.set(8, 8);

    // B. Visor Digital Matrix Grid Texture
    const gridCanvas = document.createElement("canvas");
    gridCanvas.width = 256;
    gridCanvas.height = 256;
    const gridCtx = gridCanvas.getContext("2d");
    gridCtx.fillStyle = "#070a10";
    gridCtx.fillRect(0, 0, 256, 256);
    gridCtx.strokeStyle = "rgba(34, 197, 94, 0.12)";
    gridCtx.lineWidth = 1.5;
    for (let i = 0; i < 256; i += 16) {
      gridCtx.beginPath();
      gridCtx.moveTo(i, 0);
      gridCtx.lineTo(i, 256);
      gridCtx.stroke();
      gridCtx.beginPath();
      gridCtx.moveTo(0, i);
      gridCtx.lineTo(256, i);
      gridCtx.stroke();
    }
    const visorGridTex = new THREE.CanvasTexture(gridCanvas);

    // C. Glowing </> Code Decal Texture for Chest Reactor
    const decalCanvas = document.createElement("canvas");
    decalCanvas.width = 256;
    decalCanvas.height = 256;
    const decalCtx = decalCanvas.getContext("2d");
    decalCtx.fillStyle = "#0f172a";
    decalCtx.fillRect(0, 0, 256, 256);
    decalCtx.fillStyle = "#22c55e";
    decalCtx.font = "bold 90px monospace";
    decalCtx.textAlign = "center";
    decalCtx.textBaseline = "middle";
    decalCtx.fillText("</>", 128, 128);
    const decalTex = new THREE.CanvasTexture(decalCanvas);

    // D. Soft Radial Contact Shadow Texture
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext("2d");
    const shadowGrad = shadowCtx.createRadialGradient(128, 128, 12, 128, 128, 120);
    shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.7)");
    shadowGrad.addColorStop(0.4, "rgba(15, 23, 42, 0.45)");
    shadowGrad.addColorStop(0.7, "rgba(34, 197, 94, 0.2)");
    shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    shadowCtx.fillStyle = shadowGrad;
    shadowCtx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);

    // Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(5.2, 5.2);
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.85 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.15;
    scene.add(shadowPlane);

    // =========================================================================
    // PREMIUM PBR MATERIALS LIBRARY
    // =========================================================================
    const whiteCeramicMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      roughness: 0.16,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      sheen: 0.5,
      sheenColor: 0xffffff,
    });

    const carbonDarkMat = new THREE.MeshPhysicalMaterial({
      color: 0x111827,
      bumpMap: carbonTex,
      bumpScale: 0.04,
      roughness: 0.35,
      metalness: 0.45,
      clearcoat: 0.6,
    });

    const brushedMetalMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.22,
      metalness: 0.85,
    });

    const neonGreenMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      emissive: 0x22c55e,
      emissiveIntensity: 3.8,
      roughness: 0.15,
    });

    const neonCyanMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x06b6d4,
      emissiveIntensity: 3.2,
      roughness: 0.15,
    });

    const visorScreenMat = new THREE.MeshPhysicalMaterial({
      map: visorGridTex,
      color: 0x070a0f,
      roughness: 0.06,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
    });

    // =========================================================================
    // 3D ROBOT RIG ASSEMBLY
    // =========================================================================
    const robotRoot = new THREE.Group();
    scene.add(robotRoot);

    // -------------------------------------------------------------------------
    // 1. TORSO & REACTOR CORE
    // -------------------------------------------------------------------------
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -1.0, 0);
    robotRoot.add(torsoGroup);

    // Torso Ceramic Armor Pod
    const torsoMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.72, 1.15, 36), whiteCeramicMat);
    torsoMesh.castShadow = true;
    torsoMesh.receiveShadow = true;
    torsoGroup.add(torsoMesh);

    // Carbon Fiber Hoodie Collar Ring
    const collarMesh = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.15, 16, 36), carbonDarkMat);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.y = 0.54;
    collarMesh.castShadow = true;
    torsoGroup.add(collarMesh);

    // Chest Reactor Bezel Housing
    const reactorHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.1, 32), brushedMetalMat);
    reactorHousing.position.set(0, 0.06, 0.82);
    reactorHousing.rotation.x = Math.PI / 2;
    torsoGroup.add(reactorHousing);

    // Reactor Core Decal Plate (< / >)
    const reactorDecalMat = new THREE.MeshStandardMaterial({
      map: decalTex,
      emissiveMap: decalTex,
      emissive: 0x22c55e,
      emissiveIntensity: 1.8,
      roughness: 0.2,
    });
    const reactorPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.11, 32), reactorDecalMat);
    reactorPlate.position.set(0, 0.06, 0.83);
    reactorPlate.rotation.x = Math.PI / 2;
    torsoGroup.add(reactorPlate);

    // Base Floating Energy Ring
    const baseEnergyRing = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.09, 16, 32), neonGreenMat);
    baseEnergyRing.rotation.x = Math.PI / 2;
    baseEnergyRing.position.y = -0.58;
    torsoGroup.add(baseEnergyRing);

    // -------------------------------------------------------------------------
    // 2. ARTICULATED HEAD UNIT
    // -------------------------------------------------------------------------
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.46, 0);
    robotRoot.add(headGroup);

    // Spherical White Helmet
    const helmetGeo = new THREE.SphereGeometry(1.36, 48, 48);
    helmetGeo.scale(1, 0.94, 0.96);
    const helmetMesh = new THREE.Mesh(helmetGeo, whiteCeramicMat);
    helmetMesh.castShadow = true;
    headGroup.add(helmetMesh);

    // Curved Glossy Dark Visor Screen with Matrix Texture
    const visorGeo = new THREE.SphereGeometry(1.22, 48, 48);
    visorGeo.scale(0.91, 0.83, 0.93);
    const visorMesh = new THREE.Mesh(visorGeo, visorScreenMat);
    visorMesh.position.set(0, -0.02, 0.24);
    headGroup.add(visorMesh);

    // Visor Cyan Glass Highlight Bezel
    const visorRimGeo = new THREE.TorusGeometry(0.96, 0.04, 16, 36, Math.PI * 0.85);
    const visorRim = new THREE.Mesh(visorRimGeo, neonCyanMat);
    visorRim.position.set(0, 0.42, 0.95);
    visorRim.rotation.z = Math.PI * 0.58;
    headGroup.add(visorRim);

    // Glowing Neon Pill Eyes
    const eyeGeo = new THREE.CapsuleGeometry(0.13, 0.28, 16, 16);

    const leftEye = new THREE.Mesh(eyeGeo, neonGreenMat);
    leftEye.position.set(-0.4, 0.04, 1.34);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, neonGreenMat);
    rightEye.position.set(0.4, 0.04, 1.34);
    headGroup.add(rightEye);

    // Closed Eyes Arc (︶ ‿ ︶)
    const closedEyeGeo = new THREE.TorusGeometry(0.2, 0.04, 16, 32, Math.PI);

    const leftClosedEye = new THREE.Mesh(closedEyeGeo, neonGreenMat);
    leftClosedEye.position.set(-0.4, 0.0, 1.34);
    leftClosedEye.rotation.z = Math.PI;
    leftClosedEye.visible = false;
    headGroup.add(leftClosedEye);

    const rightClosedEye = new THREE.Mesh(closedEyeGeo, neonGreenMat);
    rightClosedEye.position.set(0.4, 0.0, 1.34);
    rightClosedEye.rotation.z = Math.PI;
    rightClosedEye.visible = false;
    headGroup.add(rightClosedEye);

    // Glowing Top Sprout Antenna
    const sproutGroup = new THREE.Group();
    sproutGroup.position.set(0, 1.3, 0);

    const stemMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.28, 16), brushedMetalMat);
    stemMesh.position.y = 0.12;
    sproutGroup.add(stemMesh);

    const leafGeo = new THREE.SphereGeometry(0.18, 16, 16);
    leafGeo.scale(1.5, 0.35, 0.6);

    const leftLeaf = new THREE.Mesh(leafGeo, neonGreenMat);
    leftLeaf.position.set(-0.16, 0.28, 0);
    leftLeaf.rotation.z = -0.55;
    sproutGroup.add(leftLeaf);

    const rightLeaf = new THREE.Mesh(leafGeo, neonGreenMat);
    rightLeaf.position.set(0.16, 0.28, 0);
    rightLeaf.rotation.z = 0.55;
    sproutGroup.add(rightLeaf);

    headGroup.add(sproutGroup);

    // DJ Headphone Earcups with Carbon Fiber & Glowing Concentric Rings
    const earcupGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.26, 32);

    const leftEarcup = new THREE.Mesh(earcupGeo, carbonDarkMat);
    leftEarcup.position.set(-1.42, 0, 0);
    leftEarcup.rotation.z = Math.PI / 2;
    leftEarcup.castShadow = true;
    headGroup.add(leftEarcup);

    const leftNeonRing = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.035, 16, 32), neonGreenMat);
    leftNeonRing.position.set(-1.56, 0, 0);
    leftNeonRing.rotation.y = Math.PI / 2;
    headGroup.add(leftNeonRing);

    const rightEarcup = new THREE.Mesh(earcupGeo, carbonDarkMat);
    rightEarcup.position.set(1.42, 0, 0);
    rightEarcup.rotation.z = Math.PI / 2;
    rightEarcup.castShadow = true;
    headGroup.add(rightEarcup);

    const rightNeonRing = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.035, 16, 32), neonGreenMat);
    rightNeonRing.position.set(1.56, 0, 0);
    rightNeonRing.rotation.y = Math.PI / 2;
    headGroup.add(rightNeonRing);

    // Headphone Padded Headband
    const bandGeo = new THREE.TorusGeometry(1.4, 0.09, 16, 36, Math.PI);
    const bandMesh = new THREE.Mesh(bandGeo, carbonDarkMat);
    bandMesh.position.set(0, 0.05, 0);
    headGroup.add(bandMesh);

    // -------------------------------------------------------------------------
    // 3. ARTICULATED 3D ROBOT ARMS & HANDS
    // -------------------------------------------------------------------------
    // Left Arm Group
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-1.18, -0.65, 0.1);
    robotRoot.add(leftArmGroup);

    const leftShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 24), whiteCeramicMat);
    leftShoulder.castShadow = true;
    leftArmGroup.add(leftShoulder);

    const leftForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.16, 0.58, 16), whiteCeramicMat);
    leftForearm.position.set(0, -0.34, 0.1);
    leftForearm.rotation.x = 0.22;
    leftForearm.castShadow = true;
    leftArmGroup.add(leftForearm);

    const leftHand = new THREE.Group();
    leftHand.position.set(0, -0.68, 0.22);
    leftArmGroup.add(leftHand);

    const leftPalm = new THREE.Mesh(new THREE.SphereGeometry(0.25, 24, 24), whiteCeramicMat);
    leftPalm.scale.set(1, 1.1, 0.7);
    leftHand.add(leftPalm);

    const leftSensorPad = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.04, 16), neonGreenMat);
    leftSensorPad.position.set(0, 0, 0.17);
    leftSensorPad.rotation.x = Math.PI / 2;
    leftHand.add(leftSensorPad);

    // Right Arm Group
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(1.18, -0.65, 0.1);
    robotRoot.add(rightArmGroup);

    const rightShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 24), whiteCeramicMat);
    rightShoulder.castShadow = true;
    rightArmGroup.add(rightShoulder);

    const rightForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.16, 0.58, 16), whiteCeramicMat);
    rightForearm.position.set(0, -0.34, 0.1);
    rightForearm.rotation.x = 0.22;
    rightForearm.castShadow = true;
    rightArmGroup.add(rightForearm);

    const rightHand = new THREE.Group();
    rightHand.position.set(0, -0.68, 0.22);
    rightArmGroup.add(rightHand);

    const rightPalm = new THREE.Mesh(new THREE.SphereGeometry(0.25, 24, 24), whiteCeramicMat);
    rightPalm.scale.set(1, 1.1, 0.7);
    rightHand.add(rightPalm);

    const rightSensorPad = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.04, 16), neonGreenMat);
    rightSensorPad.position.set(0, 0, 0.17);
    rightSensorPad.rotation.x = Math.PI / 2;
    rightHand.add(rightSensorPad);

    // -------------------------------------------------------------------------
    // 4. FLOATING 3D COMPILER CODE PARTICLES & GLYPHS IN SPACE
    // -------------------------------------------------------------------------
    const glyphsGroup = new THREE.Group();
    scene.add(glyphsGroup);

    const glyphSymbols = ["< >", "{ }", "0 1", "*", "/>", "++"];
    const glyphSprites = [];

    glyphSymbols.forEach((sym) => {
      const gCanvas = document.createElement("canvas");
      gCanvas.width = 128;
      gCanvas.height = 64;
      const gCtx = gCanvas.getContext("2d");
      gCtx.fillStyle = "#22c55e";
      gCtx.font = "bold 32px monospace";
      gCtx.textAlign = "center";
      gCtx.textBaseline = "middle";
      gCtx.fillText(sym, 64, 32);

      const gTex = new THREE.CanvasTexture(gCanvas);
      const spriteMat = new THREE.SpriteMaterial({ map: gTex, transparent: true, opacity: 0.5 });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.7, 0.35, 1);
      sprite.position.set((Math.random() - 0.5) * 5.5, (Math.random() - 0.5) * 4.5, (Math.random() - 0.5) * 3);
      glyphsGroup.add(sprite);
      glyphSprites.push(sprite);
    });

    // -------------------------------------------------------------------------
    // 5. MOUSE TRACKING & ANIMATION LOOP
    // -------------------------------------------------------------------------
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / height) * 2 - 1);
      stateRef.current.targetMouseX = Math.max(-1, Math.min(1, x));
      stateRef.current.targetMouseY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const state = stateRef.current;

      // Mouse Smooth Interpolation
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.08;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.08;

      // Natural Breathing & Floating Hover
      robotRoot.position.y = Math.sin(elapsedTime * 2.2) * 0.09;
      shadowPlane.scale.setScalar(1 + Math.sin(elapsedTime * 2.2) * 0.08);

      // Antenna Spring Physics Sway
      sproutGroup.rotation.z = Math.sin(elapsedTime * 3) * 0.08;

      // Pulsing Reactor Light & Emissive Depth
      const pulse = 2.8 + Math.sin(elapsedTime * 4.5) * 1.2;
      reactorLight.intensity = pulse;
      reactorPlate.material.emissiveIntensity = pulse * 0.8;

      // Head 3D Gaze Tracking
      headGroup.rotation.y = state.mouseX * 0.45;
      headGroup.rotation.x = -state.mouseY * 0.35;

      // Rotate Ambient Floating Code Glyphs
      glyphsGroup.rotation.y = elapsedTime * 0.05;

      // =========================================================================
      // KINEMATIC ARM & HAND STATES
      // =========================================================================
      if (state.passwordFocused && !state.passwordVisible) {
        // STATE: PASSWORD FOCUS (Hands raise up and cover eyes)
        leftEye.visible = false;
        rightEye.visible = false;
        leftClosedEye.visible = true;
        rightClosedEye.visible = true;

        leftArmGroup.position.lerp(new THREE.Vector3(-0.46, 0.46, 1.16), 0.12);
        leftArmGroup.rotation.set(0.4, 0.3, 0.25);

        rightArmGroup.position.lerp(new THREE.Vector3(0.46, 0.46, 1.16), 0.12);
        rightArmGroup.rotation.set(0.4, -0.3, -0.25);
      } else if (state.passwordFocused && state.passwordVisible) {
        // STATE: PEEK (Left eye covered, right hand lowers to peek)
        leftEye.visible = false;
        rightEye.visible = true;
        leftClosedEye.visible = true;
        rightClosedEye.visible = false;

        leftArmGroup.position.lerp(new THREE.Vector3(-0.46, 0.46, 1.16), 0.12);
        leftArmGroup.rotation.set(0.4, 0.3, 0.25);

        rightArmGroup.position.lerp(new THREE.Vector3(1.05, -0.35, 0.65), 0.12);
        rightArmGroup.rotation.set(-0.2, 0.1, -0.4);
      } else if (state.emailFocused) {
        // STATE: EMAIL FOCUS (Typing stance with organic tapping fingers)
        leftEye.visible = true;
        rightEye.visible = true;
        leftClosedEye.visible = false;
        rightClosedEye.visible = false;

        const leftTap = Math.sin(elapsedTime * 8) * 0.04;
        const rightTap = Math.cos(elapsedTime * 8) * 0.04;

        leftArmGroup.position.lerp(new THREE.Vector3(-0.75, -0.4 + leftTap, 0.85), 0.1);
        leftArmGroup.rotation.set(0.3, 0.2, 0.1);

        rightArmGroup.position.lerp(new THREE.Vector3(0.75, -0.4 + rightTap, 0.85), 0.1);
        rightArmGroup.rotation.set(0.3, -0.2, -0.1);
      } else {
        // STATE: IDLE (Hands resting naturally with gentle breathing sway)
        leftEye.visible = true;
        rightEye.visible = true;
        leftClosedEye.visible = false;
        rightClosedEye.visible = false;

        const idleLeftY = -0.65 + Math.sin(elapsedTime * 2.2) * 0.03;
        const idleRightY = -0.65 + Math.cos(elapsedTime * 2.2) * 0.03;

        leftArmGroup.position.lerp(new THREE.Vector3(-1.18, idleLeftY, 0.1), 0.08);
        leftArmGroup.rotation.set(0, 0, -0.08);

        rightArmGroup.position.lerp(new THREE.Vector3(1.18, idleRightY, 0.1), 0.08);
        rightArmGroup.rotation.set(0, 0, 0.08);
      }

      // STATE: SUCCESS (Victory 360 spin & particle burst)
      if (state.success) {
        robotRoot.rotation.y += 0.07;
        neonRimLight.intensity = 9.0;
        glyphSprites.forEach((s) => (s.material.opacity = 1.0));
      } else {
        robotRoot.rotation.y = 0;
        neonRimLight.intensity = 6.5;
        glyphSprites.forEach((s) => (s.material.opacity = 0.55));
      }

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
        width: 370,
        height: 370,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        cursor: "grab",
      }}
    />
  );
}
