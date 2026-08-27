import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D Interactive Network Topology Canvas (Three.js WebGL)
 * - Central SwaplyOne Core Node with layered geometric rings and dark metallic structure
 * - 7 Surrounding Computational Service Nodes (API, AUTH, DATABASE, WEBSOCKET, COMPILER, EDGE, CACHE)
 * - Animated data packet pulses along healthy lines
 * - Broken connections with interrupted gap lines and 'x' markers
 * - Real-time cursor attraction, node displacement, and diagnostic scan waves on reconnect
 */
export default function NetworkCore3DCanvas({
  isReconnecting = false,
  connectionState = "DISCONNECTED", // "DISCONNECTED" | "SCANNING" | "RESTORED" | "FAILED"
  onNodeClick,
  onHoverNode,
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    isReconnecting,
    connectionState,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0, rayPos: new THREE.Vector2(-999, -999) },
    pulseRadius: 0,
    pulseActive: false,
  });

  stateRef.current.isReconnecting = isReconnecting;
  stateRef.current.connectionState = connectionState;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2(-999, -999);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x0a140d, 3.0);
    scene.add(ambientLight);

    const greenLight = new THREE.PointLight(0x22c55e, 5.0, 30);
    greenLight.position.set(4, 5, 8);
    scene.add(greenLight);

    const goldLight = new THREE.PointLight(0xc59b63, 4.0, 30);
    goldLight.position.set(-5, -4, 7);
    scene.add(goldLight);

    const centerLight = new THREE.PointLight(0x4ade80, 2.5, 12);
    centerLight.position.set(0, 0, 0);
    scene.add(centerLight);

    // 3. Materials
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x141f17,
      metalness: 0.92,
      roughness: 0.32,
    });

    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0xc59b63,
      metalness: 0.85,
      roughness: 0.28,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe2fbf2,
      metalness: 0.1,
      roughness: 0.16,
      transmission: 0.85,
      thickness: 1.2,
      ior: 1.5,
      transparent: true,
      opacity: 0.88,
    });

    const wireGreenMat = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    const wireGoldMat = new THREE.MeshBasicMaterial({
      color: 0xe6ca9c,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    // 4. Main Network World Group (Shifted Clearly to Right Side of Viewport)
    const networkWorld = new THREE.Group();
    scene.add(networkWorld);
    networkWorld.position.set(5.2, 0, 0);

    // Central SwaplyOne Core Node
    const coreRoot = new THREE.Group();
    networkWorld.add(coreRoot);
    coreRoot.position.set(0, 0, 0);

    // Outer Glass Torus
    const glassTorus = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.12, 24, 100), glassMat);
    coreRoot.add(glassTorus);

    // SwaplyOne Orbital Crescent Rings
    const arcTop = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.14, 20, 60, Math.PI * 0.95), darkMetalMat);
    arcTop.rotation.z = Math.PI * 0.1;
    coreRoot.add(arcTop);

    const arcBottom = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.14, 20, 60, Math.PI * 0.95), bronzeMat);
    arcBottom.rotation.z = Math.PI * 1.1;
    coreRoot.add(arcBottom);

    // Inner Quantum Core
    const prismMesh = new THREE.Mesh(new THREE.OctahedronGeometry(1.0, 0), darkMetalMat);
    coreRoot.add(prismMesh);

    const prismWire = new THREE.Mesh(new THREE.OctahedronGeometry(1.15, 0), wireGreenMat);
    coreRoot.add(prismWire);

    const innerSphere = new THREE.Mesh(new THREE.SphereGeometry(0.4, 24, 24), new THREE.MeshBasicMaterial({ color: 0x4ade80 }));
    coreRoot.add(innerSphere);

    // Hit target for core hover
    const coreHitGeo = new THREE.SphereGeometry(2.5, 12, 12);
    const coreHitMat = new THREE.MeshBasicMaterial({ visible: false });
    const coreHitMesh = new THREE.Mesh(coreHitGeo, coreHitMat);
    coreHitMesh.userData = { id: "SWAPLYONE CORE", isCore: true };
    coreRoot.add(coreHitMesh);

    // 5. Surrounding Computational Network Nodes
    const nodeDefs = [
      { id: "API GATEWAY", code: "api", angle: (0 / 7) * Math.PI * 2, dist: 5.6, isBroken: true, status: "TIMEOUT" },
      { id: "AUTH SERVICE", code: "auth", angle: (1 / 7) * Math.PI * 2, dist: 5.2, isBroken: false, status: "ONLINE" },
      { id: "DATABASE CLUSTER", code: "db", angle: (2 / 7) * Math.PI * 2, dist: 5.8, isBroken: true, status: "UNREACHABLE" },
      { id: "WEBSOCKET STREAM", code: "ws", angle: (3 / 7) * Math.PI * 2, dist: 5.4, isBroken: true, status: "DISCONNECTED" },
      { id: "COMPILER VM", code: "vm", angle: (4 / 7) * Math.PI * 2, dist: 5.7, isBroken: false, status: "STANDBY" },
      { id: "EDGE ROUTER", code: "edge", angle: (5 / 7) * Math.PI * 2, dist: 5.1, isBroken: false, status: "ACTIVE" },
      { id: "REDIS CACHE", code: "cache", angle: (6 / 7) * Math.PI * 2, dist: 5.5, isBroken: true, status: "DROPPED" },
    ];

    const nodes = [];
    const interactiveMeshes = [coreHitMesh];

    nodeDefs.forEach((def, index) => {
      const nodeGroup = new THREE.Group();
      const origX = Math.cos(def.angle) * def.dist;
      const origY = Math.sin(def.angle) * def.dist;
      const origZ = (Math.sin(def.angle * 2) * 0.8);

      nodeGroup.position.set(origX, origY, origZ);
      networkWorld.add(nodeGroup);

      // Node mesh: faceted icosahedron
      const nodeGeo = new THREE.IcosahedronGeometry(0.42, 0);
      const nodeMat = def.isBroken
        ? new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.8, roughness: 0.3, emissive: 0x991b1b, emissiveIntensity: 0.35 })
        : new THREE.MeshStandardMaterial({ color: 0x22c55e, metalness: 0.8, roughness: 0.3, emissive: 0x15803d, emissiveIntensity: 0.45 });

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeGroup.add(nodeMesh);

      // Outer orbital mini ring
      const ringGeo = new THREE.TorusGeometry(0.65, 0.03, 12, 32);
      const ringMat = def.isBroken ? new THREE.MeshBasicMaterial({ color: 0xf87171, transparent: true, opacity: 0.6 }) : wireGreenMat;
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      nodeGroup.add(ringMesh);

      // Hit sphere for raycasting
      const hitMesh = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 12), coreHitMat);
      hitMesh.userData = { ...def, nodeGroup, index };
      nodeGroup.add(hitMesh);
      interactiveMeshes.push(hitMesh);

      nodes.push({
        ...def,
        group: nodeGroup,
        mesh: nodeMesh,
        ring: ringMesh,
        origX,
        origY,
        origZ,
        curX: origX,
        curY: origY,
        curZ: origZ,
        pulseScale: 1,
      });
    });

    // 6. Dynamic Connection Lines & Traveling Data Packets
    const lineGroup = new THREE.Group();
    networkWorld.add(lineGroup);

    // Data packets (small glowing spheres traveling along connections)
    const packets = [];
    const packetGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const packetGreenMat = new THREE.MeshBasicMaterial({ color: 0x86efac });
    const packetRedMat = new THREE.MeshBasicMaterial({ color: 0xfca5a5 });

    nodes.forEach((node) => {
      // 2 data packets per link
      for (let p = 0; p < 2; p++) {
        const pMesh = new THREE.Mesh(packetGeo, node.isBroken ? packetRedMat : packetGreenMat);
        networkWorld.add(pMesh);
        packets.push({
          mesh: pMesh,
          nodeIndex: nodes.indexOf(node),
          progress: (p * 0.5 + Math.random() * 0.3) % 1,
          speed: 0.008 + Math.random() * 0.006,
        });
      }
    });

    // Reusable Line Geometry Pool
    const lineObjects = nodes.map((node) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(6);
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

      const lineMat = new THREE.LineDashedMaterial({
        color: node.isBroken ? 0xef4444 : 0x22c55e,
        dashSize: node.isBroken ? 0.35 : 100,
        gapSize: node.isBroken ? 0.25 : 0,
        linewidth: 1,
        transparent: true,
        opacity: node.isBroken ? 0.45 : 0.75,
      });

      const line = new THREE.Line(geo, lineMat);
      if (node.isBroken) line.computeLineDistances();
      lineGroup.add(line);
      return { line, geo, pos, mat: lineMat };
    });

    // 7. Reconnect Shockwave Scan Ring
    const pulseRingGeo = new THREE.RingGeometry(0.1, 0.25, 48);
    const pulseRingMat = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const pulseRing = new THREE.Mesh(pulseRingGeo, pulseRingMat);
    networkWorld.add(pulseRing);

    // 8. Event Handlers & Mouse Raycasting
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (width < 900) {
        networkWorld.position.set(0, 0, 0);
        camera.position.z = 20;
      } else {
        const halfVisibleWidth = camera.position.z * Math.tan(((camera.fov / 2) * Math.PI) / 180) * (width / height);
        networkWorld.position.set(Math.max(4.2, Math.min(6.2, halfVisibleWidth * 0.48)), 0, 0);
        camera.position.z = 16;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouseVector.x = (clientX / width) * 2 - 1;
      mouseVector.y = -(clientY / height) * 2 + 1;

      stateRef.current.mouse.targetX = mouseVector.x;
      stateRef.current.mouse.targetY = mouseVector.y;

      // Raycast hover check
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object.userData;
        if (onHoverNode) onHoverNode(hit);
      } else {
        if (onHoverNode) onHoverNode(null);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleClick = (e) => {
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);
      if (intersects.length > 0) {
        const hit = intersects[0].object.userData;
        if (onNodeClick) onNodeClick(hit);

        // Pulse clicked node
        if (hit.index !== undefined) {
          nodes[hit.index].pulseScale = 1.6;
        }
      }
    };
    window.addEventListener("click", handleClick);

    // 9. Animation Render Loop
    let animId;
    let clock = new THREE.Clock();
    let pulseProgress = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const { isReconnecting: reconnecting, connectionState: connState } = stateRef.current;

      // Mouse Smooth Damping
      stateRef.current.mouse.x += (stateRef.current.mouse.targetX - stateRef.current.mouse.x) * 0.06;
      stateRef.current.mouse.y += (stateRef.current.mouse.targetY - stateRef.current.mouse.y) * 0.06;
      const mx = stateRef.current.mouse.x;
      const my = stateRef.current.mouse.y;

      const speedMult = reconnecting ? 4.0 : 1.0;

      // Core Rotation
      glassTorus.rotation.x += 0.005 * speedMult;
      glassTorus.rotation.y += 0.008 * speedMult;
      arcTop.rotation.z += 0.01 * speedMult;
      arcBottom.rotation.z -= 0.01 * speedMult;
      prismMesh.rotation.x += 0.012 * speedMult;
      prismMesh.rotation.y += 0.015 * speedMult;
      prismWire.rotation.x -= 0.008 * speedMult;

      // Core subtle mouse parallax
      coreRoot.rotation.y = mx * 0.35;
      coreRoot.rotation.x = -my * 0.28;

      // Scan Pulse on Reconnect
      if (reconnecting) {
        pulseProgress += 0.025;
        if (pulseProgress > 1) pulseProgress = 0;

        const pScale = 0.5 + pulseProgress * 12;
        pulseRing.scale.set(pScale, pScale, 1);
        pulseRingMat.opacity = Math.sin(pulseProgress * Math.PI) * 0.75;
      } else {
        pulseRingMat.opacity = 0;
        pulseProgress = 0;
      }

      // Update Surrounding Nodes & Connections
      nodes.forEach((node, idx) => {
        // Subtle floating wave
        const floatY = Math.sin(time * 1.5 + idx) * 0.15;
        const floatX = Math.cos(time * 1.2 + idx) * 0.15;

        // Cursor attraction / repulsion
        const dx = mx * 4 - node.origX;
        const dy = my * 4 - node.origY;
        const distToMouse = Math.hypot(dx, dy);
        const repelFactor = Math.max(0, 1 - distToMouse / 5);

        node.curX = node.origX + floatX + (dx / (distToMouse + 0.1)) * repelFactor * 0.6;
        node.curY = node.origY + floatY + (dy / (distToMouse + 0.1)) * repelFactor * 0.6;

        node.group.position.set(node.curX, node.curY, node.origZ);
        node.ring.rotation.z += 0.02;

        // Pulse scale spring back
        if (node.pulseScale > 1) {
          node.pulseScale -= 0.04;
          node.group.scale.setScalar(node.pulseScale);
        } else {
          node.group.scale.setScalar(1);
        }

        // Status update if connection restored
        if (connState === "RESTORED") {
          node.mesh.material.color.setHex(0x22c55e);
          node.mesh.material.emissive.setHex(0x15803d);
          lineObjects[idx].mat.color.setHex(0x22c55e);
          lineObjects[idx].mat.dashSize = 100;
          lineObjects[idx].mat.gapSize = 0;
          lineObjects[idx].mat.opacity = 0.85;
        }

        // Update Line Geometry from Core (0,0,0) to Node (curX, curY, origZ)
        const { pos, geo, line } = lineObjects[idx];
        pos[0] = 0; pos[1] = 0; pos[2] = 0;
        pos[3] = node.curX; pos[4] = node.curY; pos[5] = node.origZ;
        geo.attributes.position.needsUpdate = true;
        if (node.isBroken && connState !== "RESTORED") {
          line.computeLineDistances();
        }
      });

      // Update Data Packets
      packets.forEach((p) => {
        const targetNode = nodes[p.nodeIndex];
        p.progress += p.speed * speedMult;

        // If broken link, stop midway at 48% with hesitation flicker
        if (targetNode.isBroken && connState !== "RESTORED") {
          if (p.progress > 0.48) {
            p.progress = 0.48;
            p.mesh.scale.setScalar(0.7 + Math.sin(time * 12) * 0.3);
          }
        } else {
          p.mesh.scale.setScalar(1);
          if (p.progress >= 1) p.progress = 0;
        }

        const px = targetNode.curX * p.progress;
        const py = targetNode.curY * p.progress;
        const pz = targetNode.origZ * p.progress;
        p.mesh.position.set(px, py, pz);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="swaply-network-canvas-container"
      aria-hidden="true"
    />
  );
}
