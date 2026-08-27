import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * 3D Server Reconnection Canvas using Uploaded 3D GLB Models
 * - LEFT: Sci-Fi 90s Laptop Model (/models/sci_fi_laptop_alternative_90s.glb)
 * - RIGHT: Professional Server Rack Model (/models/server_rack.glb)
 * - CUTTER: Utility Knife Model (/models/utility_knife.glb)
 * - CABLE PLUG: Real 3D USB Cable Plug Model (/models/usb_cable.glb) mounted on interactive grab handle
 */
export default function PhysicalCableServerCanvas({
  isRestored = false,
  onCutTriggered,
  onPlugConnected,
  onPlugRelease,
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    isRestored,
    isCut: false,
    isDragging: false,
    isNearSocket: false,
    isConnected: false,
    mouse: { x: 0, y: 0, worldPos: new THREE.Vector3() },
  });

  stateRef.current.isRestored = isRestored;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera & ACES Filmic Studio Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 14.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    container.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    // 2. Clear Studio Lighting (High-Visibility on both Laptop & Server)
    const ambientLight = new THREE.AmbientLight(0x2d3a32, 5.0);
    scene.add(ambientLight);

    const keyTopLight = new THREE.DirectionalLight(0xf1f8f4, 4.2);
    keyTopLight.position.set(2, 10, 8);
    scene.add(keyTopLight);

    // Dedicated Laptop Studio Key Light
    const laptopKeyLight = new THREE.PointLight(0xe2fbf2, 5.2, 18);
    laptopKeyLight.position.set(-5.0, 2.5, 4.5);
    scene.add(laptopKeyLight);

    const clientRimLight = new THREE.PointLight(0x4ade80, 4.5, 20);
    clientRimLight.position.set(-6.5, 1.5, 3.5);
    scene.add(clientRimLight);

    // Server Studio Key Light
    const serverKeyLight = new THREE.PointLight(0xf1f8f4, 4.5, 20);
    serverKeyLight.position.set(5.0, 2.5, 4.5);
    scene.add(serverKeyLight);

    const serverRimLight = new THREE.PointLight(0x228B22, 5.5, 20);
    serverRimLight.position.set(6.5, 1.5, 3.5);
    scene.add(serverRimLight);

    const rackPortLight = new THREE.PointLight(0x228B22, 0, 8);
    rackPortLight.position.set(3.8, -0.4, 1.2);
    scene.add(rackPortLight);

    const cutFlashLight = new THREE.PointLight(0xffffff, 0, 35);
    cutFlashLight.position.set(0, 0, 3);
    scene.add(cutFlashLight);

    // 3. Materials
    const whiteCableMat = new THREE.MeshStandardMaterial({
      color: 0xf3f4f6,
      metalness: 0.2,
      roughness: 0.35,
    });
    const silverCollarMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.2 });
    const phosphorGlowMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });

    // 4. MODEL GROUPS & GLTF NORMALIZED LOADER
    const loader = new GLTFLoader();

    // Accurate Center & Scale Helper Function for GLTF
    const loadAndNormalize = (url, targetSize, onLoadSuccess) => {
      loader.load(
        url,
        (gltf) => {
          const root = gltf.scene;
          root.updateMatrixWorld(true);
          const box = new THREE.Box3().setFromObject(root);
          const size = new THREE.Vector3();
          box.getSize(size);
          const center = new THREE.Vector3();
          box.getCenter(center);

          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const scale = targetSize / maxDim;

          const wrapper = new THREE.Group();
          root.position.set(-center.x, -center.y, -center.z);
          wrapper.add(root);
          wrapper.scale.setScalar(scale);

          onLoadSuccess(wrapper);
        },
        undefined,
        (err) => console.warn("GLTF Load Error on " + url, err)
      );
    };

    // 4A. Left: Sci-Fi 90s Laptop
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(-5.0, -0.6, 0);
    laptopGroup.rotation.y = Math.PI * 0.22;
    scene.add(laptopGroup);

    loadAndNormalize("/models/sci_fi_laptop_alternative_90s.glb", 3.5, (modelWrapper) => {
      laptopGroup.add(modelWrapper);
    });

    // 4B. Right: Server Rack Model (Front facing)
    const serverGroup = new THREE.Group();
    serverGroup.position.set(5.0, -0.2, 0);
    serverGroup.rotation.y = Math.PI - 0.32;
    scene.add(serverGroup);

    loadAndNormalize("/models/server_rack.glb", 4.6, (modelWrapper) => {
      serverGroup.add(modelWrapper);
    });

    // 4C. Center Top: Utility Knife Model
    const knifeGroup = new THREE.Group();
    knifeGroup.position.set(0.0, 5.0, 0.2);
    scene.add(knifeGroup);

    loadAndNormalize("/models/utility_knife.glb", 2.2, (modelWrapper) => {
      modelWrapper.rotation.z = Math.PI * 0.75;
      modelWrapper.rotation.y = Math.PI * 0.5;
      knifeGroup.add(modelWrapper);
    });

    // 5. THE PHYSICAL DATA CABLE & REAL 3D USB CABLE PLUG
    const socketWorldPos = new THREE.Vector3(3.8, -0.4, 0.4);
    const clientPortWorldPos = new THREE.Vector3(-3.85, -0.52, 0.1);

    const cablePoints = [
      clientPortWorldPos.clone(),
      new THREE.Vector3(-2.2, -0.65, 0.3),
      new THREE.Vector3(-0.4, -0.68, 0.2),
      socketWorldPos.clone(),
    ];
    let cableCurve = new THREE.CatmullRomCurve3(cablePoints);
    let cableGeo = new THREE.TubeGeometry(cableCurve, 48, 0.09, 16, false);
    const cableMesh = new THREE.Mesh(cableGeo, whiteCableMat);
    scene.add(cableMesh);

    // Cable Strain Relief Collar at Laptop End
    const laptopStrainRelief = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.28, 16), silverCollarMat);
    laptopStrainRelief.rotation.z = Math.PI * 0.5;
    laptopStrainRelief.position.copy(clientPortWorldPos);
    scene.add(laptopStrainRelief);

    // Interactive Plug Group with Real 3D USB Cable Model
    const plugGroup = new THREE.Group();
    plugGroup.position.copy(socketWorldPos);
    scene.add(plugGroup);

    // Fallback/Base Plug Body
    const defaultPlugMesh = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.26, 0.3), silverCollarMat);
    plugGroup.add(defaultPlugMesh);

    // Load Real 3D USB Cable Model onto Plug Group
    loadAndNormalize("/models/usb_cable.glb", 1.4, (cableModelWrapper) => {
      plugGroup.remove(defaultPlugMesh);
      cableModelWrapper.rotation.y = Math.PI * 0.5; // Oriented toward the server socket
      plugGroup.add(cableModelWrapper);
    });

    const plugGlowRing = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.03, 12, 24), phosphorGlowMat);
    plugGlowRing.rotation.y = Math.PI * 0.5;
    plugGlowRing.position.x = -0.15;
    plugGroup.add(plugGlowRing);

    // Generous Transparent Hit Sphere for Reliable Grabbing
    const plugHitSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 16, 16),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
    );
    plugGroup.add(plugHitSphere);

    // 6. Traveling Data Pulse
    const packetMesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), phosphorGlowMat);
    scene.add(packetMesh);

    // 7. Spark Particles at Cut
    const sparkCount = 20;
    const sparks = [];
    const sparkGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0x86efac });

    for (let i = 0; i < sparkCount; i++) {
      const s = new THREE.Mesh(sparkGeo, sparkMat);
      scene.add(s);
      sparks.push({ mesh: s, vx: 0, vy: 0, vz: 0, life: 0 });
    }

    // 8. Verlet Physics State for Plug
    const plugPos = socketWorldPos.clone();
    const plugTarget = socketWorldPos.clone();
    const plugVel = new THREE.Vector3(0, 0, 0);
    const severedHangRest = new THREE.Vector3(-0.5, -0.7, 0.3);

    // 9. Pointer Events for Physically Grabbing & Dragging the Plug
    const handlePointerDown = (e) => {
      if (!stateRef.current.isCut || stateRef.current.isConnected || stateRef.current.isRestored) return;

      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / height) * 2 - 1);

      raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
      const intersectionPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeZ, intersectionPoint);

      const distToPlug = intersectionPoint.distanceTo(plugPos);

      // Generous grab radius: within 2.4 units of plug
      if (distToPlug < 2.4) {
        stateRef.current.isDragging = true;
        stateRef.current.mouse.worldPos.copy(intersectionPoint);
        container.style.cursor = "grabbing";
        document.body.style.cursor = "grabbing";
      }
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / height) * 2 - 1);

      stateRef.current.mouse.x = nx;
      stateRef.current.mouse.y = ny;

      raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
      const intersectionPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeZ, intersectionPoint);
      stateRef.current.mouse.worldPos.copy(intersectionPoint);

      if (!stateRef.current.isDragging && stateRef.current.isCut && !stateRef.current.isConnected) {
        const distToPlug = intersectionPoint.distanceTo(plugPos);
        container.style.cursor = distToPlug < 2.0 ? "grab" : "default";
      }
    };

    const handlePointerUp = () => {
      if (stateRef.current.isDragging) {
        stateRef.current.isDragging = false;
        container.style.cursor = "grab";
        document.body.style.cursor = "default";

        // Check if released within magnetic socket connection zone (distance < 1.8)
        const distToSocket = plugPos.distanceTo(socketWorldPos);
        if (distToSocket < 1.8) {
          stateRef.current.isConnected = true;
          if (onPlugConnected) onPlugConnected();
        } else {
          if (onPlugRelease) onPlugRelease();
        }
      }
    };

    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // 10. MASTER TIMELINE ANIMATION LOOP
    const startTime = performance.now();
    let packetProgress = 0;
    let flashTimer = 0;

    const animate = () => {
      const animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) / 1000;
      const { isCut, isDragging, isConnected, isRestored: restored, mouse } = stateRef.current;

      // Camera Composition: Zooms in close during the cut (3.8s to 5.2s), then returns wide
      if (elapsed >= 3.6 && elapsed < 5.2 && !isConnected && !restored) {
        const zoomT = Math.sin(((elapsed - 3.6) / 1.6) * Math.PI);
        camera.position.z = 14.5 - zoomT * 4.5;
        camera.position.y = 0.4 - zoomT * 0.4;
      } else {
        camera.position.z = 14.5;
        camera.position.y = 0.4 + mouse.y * 0.25;
      }
      camera.position.x = mouse.x * 0.45;
      camera.lookAt(0, -0.2, 0);

      // CUTTING EVENT (at 4.2s)
      if (elapsed >= 3.8 && elapsed < 4.2 && !isCut) {
        const descendT = (elapsed - 3.8) / 0.4;
        knifeGroup.position.y = 5.0 - descendT * 5.6; // Knife descends onto cable!
      } else if (elapsed >= 4.2 && !isCut && !isConnected && !restored) {
        stateRef.current.isCut = true;
        flashTimer = 1.0;
        knifeGroup.position.y = -0.6;

        if (onCutTriggered) onCutTriggered();

        // Snap recoil impulse velocity on plug
        plugVel.set(-3.2, -3.8, 1.6);

        // Spawn electrical sparks at cutting point
        sparks.forEach((s) => {
          s.mesh.position.set(0, -0.65, 0.2);
          s.vx = (Math.random() - 0.5) * 0.18;
          s.vy = Math.random() * 0.16;
          s.vz = (Math.random() - 0.5) * 0.18;
          s.life = 1.0;
        });
      } else if (isCut && elapsed >= 4.5 && elapsed < 5.6) {
        const retractT = (elapsed - 4.5) / 1.1;
        knifeGroup.position.y = -0.6 + retractT * 6.2;
      }

      // Bright Flash Effect
      if (flashTimer > 0) {
        cutFlashLight.intensity = flashTimer * 14.0;
        flashTimer -= 0.08;
      } else {
        cutFlashLight.intensity = 0;
      }

      // Server Lights & Port Luminescence
      if (restored || isConnected) {
        rackPortLight.intensity = 4.5;
        serverRimLight.intensity = 5.5;
      } else if (isCut) {
        rackPortLight.intensity = 0;
        serverRimLight.intensity = 1.5;
      } else {
        rackPortLight.intensity = 2.0;
        serverRimLight.intensity = 4.5;
      }

      // 11. PLUG VERLET PHYSICS & MAGNETIC ATTRACTION
      if (restored || isConnected) {
        plugTarget.copy(socketWorldPos);
      } else if (isDragging) {
        plugTarget.copy(stateRef.current.mouse.worldPos);

        const distToSocket = plugTarget.distanceTo(socketWorldPos);
        if (distToSocket < 2.5) {
          rackPortLight.intensity = (2.5 - distToSocket) * 2.0;
          if (distToSocket < 1.2) {
            plugTarget.lerp(socketWorldPos, 0.45);
          }
        }
      } else if (isCut) {
        plugTarget.set(
          severedHangRest.x + Math.sin(elapsed * 1.5) * 0.08,
          severedHangRest.y + Math.cos(elapsed * 1.2) * 0.06,
          severedHangRest.z
        );
      } else {
        plugTarget.copy(socketWorldPos);
      }

      // Spring Physics
      const springK = isDragging ? 0.32 : isCut ? 0.08 : 0.35;
      const damping = 0.85;

      plugVel.add(plugTarget.clone().sub(plugPos).multiplyScalar(springK)).multiplyScalar(damping);
      plugPos.add(plugVel);

      plugGroup.position.copy(plugPos);

      // Orientation toward server port
      if (isConnected || restored) {
        plugGroup.rotation.z = 0;
      } else if (isDragging) {
        const angleToSocket = Math.atan2(socketWorldPos.y - plugPos.y, socketWorldPos.x - plugPos.x);
        plugGroup.rotation.z = angleToSocket * 0.4;
      } else if (isCut) {
        plugGroup.rotation.z = -Math.PI * 0.2 + Math.sin(elapsed * 1.5) * 0.1;
      } else {
        plugGroup.rotation.z = 0;
      }

      // 12. RECONSTRUCT THICK CABLE TUBE GEOMETRY
      cablePoints[3].copy(plugPos);
      cablePoints[2].set(
        clientPortWorldPos.x * 0.25 + plugPos.x * 0.75,
        Math.min(clientPortWorldPos.y, plugPos.y) - 0.4,
        plugPos.z * 0.6
      );
      cableCurve = new THREE.CatmullRomCurve3(cablePoints);
      cableMesh.geometry.dispose();
      cableMesh.geometry = new THREE.TubeGeometry(cableCurve, 48, 0.09, 16, false);

      // 13. DATA PACKET ANIMATION
      if (restored || (!isCut && !isConnected)) {
        packetProgress += 0.02;
        if (packetProgress > 1) packetProgress = 0;
        const pt = cableCurve.getPoint(packetProgress);
        packetMesh.position.copy(pt);
        packetMesh.scale.setScalar(1);
      } else {
        packetMesh.scale.setScalar(0);
      }

      // 14. SPARK PARTICLES UPDATE
      sparks.forEach((s) => {
        if (s.life > 0) {
          s.mesh.position.x += s.vx;
          s.mesh.position.y += s.vy;
          s.mesh.position.z += s.vz;
          s.vy -= 0.005;
          s.life -= 0.025;
          s.mesh.scale.setScalar(Math.max(0, s.life));
        } else {
          s.mesh.scale.setScalar(0);
        }
      });

      renderer.render(scene, camera);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="swaply-cable-canvas-container"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "auto",
        touchAction: "none",
      }}
    />
  );
}
