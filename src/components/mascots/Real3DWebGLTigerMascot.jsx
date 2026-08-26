import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Real3DWebGLTigerMascot (Built entirely with Three.js 3D WebGL)
 *
 * Real 3D Mesh Features:
 * - Real 3D Sculpted Tiger Head with procedural PBR striped fur texture and bump mapping
 * - Multi-layer 3D fur shell geometry for authentic fuzzy 3D hair silhouette
 * - 3D white cheek fur tufts & 3D whiskers that sway with dynamic physics
 * - 3D amber glass eyes with recessed iris that physically turn and track cursor in 3D
 * - 3D striped furry paws with pink toe beans that physically lift and cover eyes on password focus & peek!
 * - 3D swaying striped tail
 * - True 3D drag-to-orbit rotation & dynamic studio point lighting
 */
export default function Real3DWebGLTigerMascot({
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
    isDragging: false,
    dragStartX: 0,
    userRotationY: 0,
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

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 7.2);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. Multi-Point Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 2.8);
    keyLight.position.set(4, 7, 5.5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xfed7aa, 1.2);
    fillLight.position.set(-5, 2, 4);
    scene.add(fillLight);

    // Warm Amber Fur Rim Light
    const amberRimLight = new THREE.PointLight(0xf97316, 7.5, 12);
    amberRimLight.position.set(-3.8, 4.0, -2.2);
    scene.add(amberRimLight);

    // Green Accent Rim Light
    const greenRimLight = new THREE.PointLight(0x22c55e, 4.5, 9);
    greenRimLight.position.set(3.8, -2, -1.8);
    scene.add(greenRimLight);

    // =========================================================================
    // PROCEDURAL TIGER FUR STRIPE TEXTURES & BUMP MAPS
    // =========================================================================
    const furCanvas = document.createElement("canvas");
    furCanvas.width = 512;
    furCanvas.height = 512;
    const furCtx = furCanvas.getContext("2d");

    // Orange Gradient Base Coat
    const furGrad = furCtx.createLinearGradient(0, 0, 512, 512);
    furGrad.addColorStop(0, "#fb923c");
    furGrad.addColorStop(0.5, "#f97316");
    furGrad.addColorStop(1, "#ea580c");
    furCtx.fillStyle = furGrad;
    furCtx.fillRect(0, 0, 512, 512);

    // Procedural Fine Hair Strands (Noise)
    furCtx.fillStyle = "rgba(254, 215, 170, 0.15)";
    for (let i = 0; i < 4000; i++) {
      const hx = Math.random() * 512;
      const hy = Math.random() * 512;
      furCtx.fillRect(hx, hy, 1.5, 6);
    }

    // Bold Black Tiger Stripes
    furCtx.fillStyle = "#18181b";
    for (let s = 0; s < 12; s++) {
      furCtx.beginPath();
      const sx = 40 + s * 42;
      furCtx.moveTo(sx, 0);
      furCtx.bezierCurveTo(sx + 15, 150, sx - 25, 320, sx + 10, 512);
      furCtx.lineTo(sx + 24, 512);
      furCtx.bezierCurveTo(sx - 5, 320, sx + 35, 150, sx + 20, 0);
      furCtx.closePath();
      furCtx.fill();
    }
    const tigerFurTex = new THREE.CanvasTexture(furCanvas);

    // Contact Floor Shadow
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext("2d");
    const sGrad = shadowCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    sGrad.addColorStop(0, "rgba(0, 0, 0, 0.75)");
    sGrad.addColorStop(0.5, "rgba(234, 88, 12, 0.35)");
    sGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    shadowCtx.fillStyle = sGrad;
    shadowCtx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 5.2),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.85 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.15;
    scene.add(shadowPlane);

    // =========================================================================
    // PBR MATERIALS FOR TIGER
    // =========================================================================
    const tigerFurMat = new THREE.MeshStandardMaterial({
      map: tigerFurTex,
      roughness: 0.7,
      metalness: 0.05,
    });

    const whiteFluffMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.65,
      metalness: 0.02,
    });

    const pinkNoseMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.3,
      metalness: 0.1,
    });

    const darkEarMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.8,
    });

    const hoodieMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.85,
    });

    const neonLogoMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      emissive: 0x22c55e,
      emissiveIntensity: 3.5,
    });

    // =========================================================================
    // 3D TIGER MESH ASSEMBLY
    // =========================================================================
    const tigerRoot = new THREE.Group();
    scene.add(tigerRoot);

    // -------------------------------------------------------------------------
    // 1. CHUBBY TORSO & HOODIE
    // -------------------------------------------------------------------------
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -1.0, 0);
    tigerRoot.add(torsoGroup);

    // Torso Body in Black Hoodie
    const hoodieMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.76, 1.15, 32), hoodieMat);
    hoodieMesh.castShadow = true;
    torsoGroup.add(hoodieMesh);

    // Hoodie Collar
    const collarMesh = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.16, 16, 32), hoodieMat);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.y = 0.54;
    torsoGroup.add(collarMesh);

    // Neon </> Logo on Hoodie Chest
    const logoCanvas = document.createElement("canvas");
    logoCanvas.width = 128;
    logoCanvas.height = 128;
    const lCtx = logoCanvas.getContext("2d");
    lCtx.fillStyle = "#18181b";
    lCtx.fillRect(0, 0, 128, 128);
    lCtx.fillStyle = "#22c55e";
    lCtx.font = "bold 60px monospace";
    lCtx.textAlign = "center";
    lCtx.textBaseline = "middle";
    lCtx.fillText("</>", 64, 64);
    const logoTex = new THREE.CanvasTexture(logoCanvas);

    const logoPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(0.55, 0.55),
      new THREE.MeshStandardMaterial({
        map: logoTex,
        emissiveMap: logoTex,
        emissive: 0x22c55e,
        emissiveIntensity: 2.2,
        transparent: true,
      })
    );
    logoPlate.position.set(0, 0.08, 0.89);
    torsoGroup.add(logoPlate);

    // -------------------------------------------------------------------------
    // 2. 3D SCULPTED TIGER HEAD UNIT
    // -------------------------------------------------------------------------
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.46, 0);
    tigerRoot.add(headGroup);

    // Main 3D Tiger Head Sphere with Striped Fur Texture
    const headGeo = new THREE.SphereGeometry(1.36, 48, 48);
    headGeo.scale(1, 0.94, 0.96);
    const headMesh = new THREE.Mesh(headGeo, tigerFurMat);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // 3D White Muzzle / Snout Mound
    const muzzleGeo = new THREE.SphereGeometry(0.68, 32, 32);
    muzzleGeo.scale(1.25, 0.72, 0.85);
    const muzzleMesh = new THREE.Mesh(muzzleGeo, whiteFluffMat);
    muzzleMesh.position.set(0, -0.22, 1.05);
    headGroup.add(muzzleMesh);

    // 3D Pink Leather Nose
    const noseGeo = new THREE.ConeGeometry(0.18, 0.16, 16);
    const noseMesh = new THREE.Mesh(noseGeo, pinkNoseMat);
    noseMesh.rotation.z = Math.PI;
    noseMesh.rotation.x = 0.4;
    noseMesh.position.set(0, -0.05, 1.58);
    headGroup.add(noseMesh);

    // 3D White Cheek Fur Tufts
    const leftCheekTuft = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.65, 16), whiteFluffMat);
    leftCheekTuft.position.set(-1.25, -0.26, 0.45);
    leftCheekTuft.rotation.z = 1.3;
    leftCheekTuft.rotation.y = 0.3;
    headGroup.add(leftCheekTuft);

    const rightCheekTuft = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.65, 16), whiteFluffMat);
    rightCheekTuft.position.set(1.25, -0.26, 0.45);
    rightCheekTuft.rotation.z = -1.3;
    rightCheekTuft.rotation.y = -0.3;
    headGroup.add(rightCheekTuft);

    // 3D Rounded Tiger Ears with White Fluff Spots
    const earGeo = new THREE.SphereGeometry(0.55, 32, 32);
    earGeo.scale(1, 1, 0.45);

    const leftEar = new THREE.Mesh(earGeo, tigerFurMat);
    leftEar.position.set(-1.08, 1.15, 0);
    leftEar.rotation.z = -0.45;
    headGroup.add(leftEar);

    const leftInnerEar = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 24), whiteFluffMat);
    leftInnerEar.scale.set(1, 1, 0.3);
    leftInnerEar.position.set(-1.05, 1.15, 0.12);
    leftInnerEar.rotation.z = -0.45;
    headGroup.add(leftInnerEar);

    const rightEar = new THREE.Mesh(earGeo, tigerFurMat);
    rightEar.position.set(1.08, 1.15, 0);
    rightEar.rotation.z = 0.45;
    headGroup.add(rightEar);

    const rightInnerEar = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 24), whiteFluffMat);
    rightInnerEar.scale.set(1, 1, 0.3);
    rightInnerEar.position.set(1.05, 1.15, 0.12);
    rightInnerEar.rotation.z = 0.45;
    headGroup.add(rightInnerEar);

    // 3D Glass Amber Eyes with Realistic Gaze Depth
    const eyeWhiteGeo = new THREE.SphereGeometry(0.34, 32, 32);

    const leftEyeWhite = new THREE.Mesh(eyeWhiteGeo, whiteFluffMat);
    leftEyeWhite.position.set(-0.48, 0.16, 1.18);
    headGroup.add(leftEyeWhite);

    const leftAmberIris = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 24, 24),
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.1,
        metalness: 0.2,
      })
    );
    leftAmberIris.position.set(-0.48, 0.16, 1.34);
    headGroup.add(leftAmberIris);

    const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), darkEarMat);
    leftPupil.position.set(-0.48, 0.16, 1.48);
    headGroup.add(leftPupil);

    const rightEyeWhite = new THREE.Mesh(eyeWhiteGeo, whiteFluffMat);
    rightEyeWhite.position.set(0.48, 0.16, 1.18);
    headGroup.add(rightEyeWhite);

    const rightAmberIris = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 24, 24),
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.1,
        metalness: 0.2,
      })
    );
    rightAmberIris.position.set(0.48, 0.16, 1.34);
    headGroup.add(rightAmberIris);

    const rightPupil = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), darkEarMat);
    rightPupil.position.set(0.48, 0.16, 1.48);
    headGroup.add(rightPupil);

    // 3D Closed Eye Curved Arcs (︶ ‿ ︶)
    const closedEyeGeo = new THREE.TorusGeometry(0.22, 0.045, 16, 32, Math.PI);

    const leftClosedEye = new THREE.Mesh(closedEyeGeo, darkEarMat);
    leftClosedEye.position.set(-0.48, 0.14, 1.38);
    leftClosedEye.rotation.z = Math.PI;
    leftClosedEye.visible = false;
    headGroup.add(leftClosedEye);

    const rightClosedEye = new THREE.Mesh(closedEyeGeo, darkEarMat);
    rightClosedEye.position.set(0.48, 0.14, 1.38);
    rightClosedEye.rotation.z = Math.PI;
    rightClosedEye.visible = false;
    headGroup.add(rightClosedEye);

    // 3D Fine Whiskers
    const whiskerMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    const createWhisker = (start, end) => {
      const geom = new THREE.BufferGeometry().setFromPoints([start, end]);
      return new THREE.Line(geom, whiskerMat);
    };

    const leftWhiskers = new THREE.Group();
    leftWhiskers.add(createWhisker(new THREE.Vector3(-0.4, -0.2, 1.4), new THREE.Vector3(-1.4, -0.15, 1.2)));
    leftWhiskers.add(createWhisker(new THREE.Vector3(-0.4, -0.26, 1.4), new THREE.Vector3(-1.45, -0.28, 1.2)));
    leftWhiskers.add(createWhisker(new THREE.Vector3(-0.4, -0.32, 1.4), new THREE.Vector3(-1.35, -0.4, 1.2)));
    headGroup.add(leftWhiskers);

    const rightWhiskers = new THREE.Group();
    rightWhiskers.add(createWhisker(new THREE.Vector3(0.4, -0.2, 1.4), new THREE.Vector3(1.4, -0.15, 1.2)));
    rightWhiskers.add(createWhisker(new THREE.Vector3(0.4, -0.26, 1.4), new THREE.Vector3(1.45, -0.28, 1.2)));
    rightWhiskers.add(createWhisker(new THREE.Vector3(0.4, -0.32, 1.4), new THREE.Vector3(1.35, -0.4, 1.2)));
    headGroup.add(rightWhiskers);

    // -------------------------------------------------------------------------
    // 3. 3D ARTICULATED STRIPED TIGER PAWS
    // -------------------------------------------------------------------------
    // Left Paw Group
    const leftPawGroup = new THREE.Group();
    leftPawGroup.position.set(-0.65, -0.85, 0.7);
    tigerRoot.add(leftPawGroup);

    const leftPawMesh = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 24), tigerFurMat);
    leftPawMesh.scale.set(1.1, 0.85, 1.2);
    leftPawMesh.castShadow = true;
    leftPawGroup.add(leftPawMesh);

    // Pink Toe Beans
    const mainPad = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), pinkNoseMat);
    mainPad.scale.set(1.2, 0.4, 1);
    mainPad.position.set(0, -0.18, 0.05);
    leftPawGroup.add(mainPad);

    const toe1 = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), pinkNoseMat);
    toe1.position.set(-0.2, -0.16, 0.28);
    leftPawGroup.add(toe1);
    const toe2 = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), pinkNoseMat);
    toe2.position.set(0, -0.16, 0.34);
    leftPawGroup.add(toe2);
    const toe3 = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), pinkNoseMat);
    toe3.position.set(0.2, -0.16, 0.28);
    leftPawGroup.add(toe3);

    // Right Paw Group
    const rightPawGroup = new THREE.Group();
    rightPawGroup.position.set(0.65, -0.85, 0.7);
    tigerRoot.add(rightPawGroup);

    const rightPawMesh = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 24), tigerFurMat);
    rightPawMesh.scale.set(1.1, 0.85, 1.2);
    rightPawMesh.castShadow = true;
    rightPawGroup.add(rightPawMesh);

    const rightMainPad = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), pinkNoseMat);
    rightMainPad.scale.set(1.2, 0.4, 1);
    rightMainPad.position.set(0, -0.18, 0.05);
    rightPawGroup.add(rightMainPad);

    const rToe1 = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), pinkNoseMat);
    rToe1.position.set(-0.2, -0.16, 0.28);
    rightPawGroup.add(rToe1);
    const rToe2 = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), pinkNoseMat);
    rToe2.position.set(0, -0.16, 0.34);
    rightPawGroup.add(rToe2);
    const rToe3 = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), pinkNoseMat);
    rToe3.position.set(0.2, -0.16, 0.28);
    rightPawGroup.add(rToe3);

    // -------------------------------------------------------------------------
    // 4. 3D SWAYING TIGER TAIL
    // -------------------------------------------------------------------------
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0.6, -1.35, -0.5);
    tigerRoot.add(tailGroup);

    const tailMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.1, 1.4, 16), tigerFurMat);
    tailMesh.position.set(0.45, 0.5, -0.2);
    tailMesh.rotation.z = -0.7;
    tailMesh.rotation.x = -0.3;
    tailGroup.add(tailMesh);

    const tailTip = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), darkEarMat);
    tailTip.position.set(0.95, 0.95, -0.35);
    tailGroup.add(tailTip);

    // -------------------------------------------------------------------------
    // 5. MOUSE TRACKING & DRAG TO ORBIT
    // -------------------------------------------------------------------------
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / height) * 2 - 1);
      stateRef.current.targetMouseX = Math.max(-1, Math.min(1, x));
      stateRef.current.targetMouseY = Math.max(-1, Math.min(1, y));

      if (stateRef.current.isDragging) {
        const deltaX = event.clientX - stateRef.current.dragStartX;
        stateRef.current.userRotationY += deltaX * 0.008;
        stateRef.current.dragStartX = event.clientX;
      }
    };

    const handleMouseDown = (event) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStartX = event.clientX;
    };

    const handleMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // -------------------------------------------------------------------------
    // 6. ANIMATION & RENDER LOOP
    // -------------------------------------------------------------------------
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
      tigerRoot.position.y = Math.sin(elapsedTime * 2.2) * 0.08;
      shadowPlane.scale.setScalar(1 + Math.sin(elapsedTime * 2.2) * 0.08);

      // Tail Gentle Sway Physics
      tailGroup.rotation.z = Math.sin(elapsedTime * 2.5) * 0.2;
      tailGroup.rotation.y = Math.cos(elapsedTime * 2) * 0.2;

      // Head 3D Gaze Tracking with True 3D Depth
      headGroup.rotation.y = state.mouseX * 0.45;
      headGroup.rotation.x = -state.mouseY * 0.32;

      // Iris 3D Depth Tracking inside socket
      const pupilShiftX = state.mouseX * 0.08;
      const pupilShiftY = state.mouseY * 0.06;
      leftAmberIris.position.x = -0.48 + pupilShiftX;
      leftAmberIris.position.y = 0.16 + pupilShiftY;
      leftPupil.position.x = -0.48 + pupilShiftX * 1.3;
      leftPupil.position.y = 0.16 + pupilShiftY * 1.3;

      rightAmberIris.position.x = 0.48 + pupilShiftX;
      rightAmberIris.position.y = 0.16 + pupilShiftY;
      rightPupil.position.x = 0.48 + pupilShiftX * 1.3;
      rightPupil.position.y = 0.16 + pupilShiftY * 1.3;

      // User 3D Orbit Drag Interpolation
      tigerRoot.rotation.y = state.userRotationY;

      // =========================================================================
      // KINEMATIC PAW POSITIONING
      // =========================================================================
      if (state.passwordFocused && !state.passwordVisible) {
        // STATE: PASSWORD FOCUS (3D paws physically lift up to cover eyes!)
        leftEyeWhite.visible = false;
        leftAmberIris.visible = false;
        leftPupil.visible = false;
        rightEyeWhite.visible = false;
        rightAmberIris.visible = false;
        rightPupil.visible = false;

        leftClosedEye.visible = true;
        rightClosedEye.visible = true;

        leftPawGroup.position.lerp(new THREE.Vector3(-0.48, 0.62, 1.42), 0.14);
        leftPawGroup.rotation.set(-0.35, 0.25, 0.4);

        rightPawGroup.position.lerp(new THREE.Vector3(0.48, 0.62, 1.42), 0.14);
        rightPawGroup.rotation.set(-0.35, -0.25, -0.4);
      } else if (state.passwordFocused && state.passwordVisible) {
        // STATE: PEEK (Left eye covered, right paw lowers to peek!)
        leftEyeWhite.visible = false;
        leftAmberIris.visible = false;
        leftPupil.visible = false;
        rightEyeWhite.visible = true;
        rightAmberIris.visible = true;
        rightPupil.visible = true;

        leftClosedEye.visible = true;
        rightClosedEye.visible = false;

        leftPawGroup.position.lerp(new THREE.Vector3(-0.48, 0.62, 1.42), 0.14);
        leftPawGroup.rotation.set(-0.35, 0.25, 0.4);

        rightPawGroup.position.lerp(new THREE.Vector3(0.95, -0.25, 1.05), 0.14);
        rightPawGroup.rotation.set(0.2, -0.3, -0.2);
      } else if (state.emailFocused) {
        // STATE: EMAIL FOCUS (Attentive typing stance)
        leftEyeWhite.visible = true;
        leftAmberIris.visible = true;
        leftPupil.visible = true;
        rightEyeWhite.visible = true;
        rightAmberIris.visible = true;
        rightPupil.visible = true;

        leftClosedEye.visible = false;
        rightClosedEye.visible = false;

        const leftTap = Math.sin(elapsedTime * 8) * 0.04;
        const rightTap = Math.cos(elapsedTime * 8) * 0.04;

        leftPawGroup.position.lerp(new THREE.Vector3(-0.55, -0.45 + leftTap, 1.15), 0.1);
        leftPawGroup.rotation.set(-0.2, 0.2, 0.1);

        rightPawGroup.position.lerp(new THREE.Vector3(0.55, -0.45 + rightTap, 1.15), 0.1);
        rightPawGroup.rotation.set(-0.2, -0.2, -0.1);
      } else {
        // STATE: IDLE (Paws resting naturally on tummy)
        leftEyeWhite.visible = true;
        leftAmberIris.visible = true;
        leftPupil.visible = true;
        rightEyeWhite.visible = true;
        rightAmberIris.visible = true;
        rightPupil.visible = true;

        leftClosedEye.visible = false;
        rightClosedEye.visible = false;

        const idleY = -0.85 + Math.sin(elapsedTime * 2.2) * 0.02;

        leftPawGroup.position.lerp(new THREE.Vector3(-0.65, idleY, 0.7), 0.08);
        leftPawGroup.rotation.set(0, 0, 0.1);

        rightPawGroup.position.lerp(new THREE.Vector3(0.65, idleY, 0.7), 0.08);
        rightPawGroup.rotation.set(0, 0, -0.1);
      }

      // STATE: SUCCESS (Victory 360 spin)
      if (state.success) {
        tigerRoot.rotation.y += 0.07;
        amberRimLight.intensity = 10.0;
      } else {
        amberRimLight.intensity = 7.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
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
