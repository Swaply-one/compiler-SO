import React, { useEffect, useRef } from "react";

/**
 * Lightning Granules & Electric Shimmer Canvas for 404
 * - Renders high-frequency electrical granules, sparks, and lightning arcs
 * - Shimmers across the 404 digits with neon phosphor bloom
 */
export default function LightningGranules404({ isGlitching = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 150);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle granules system (dense electrical micro-stippling)
    const granuleCount = 140;
    const granules = [];
    for (let i = 0; i < granuleCount; i++) {
      granules.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: 0.8 + Math.random() * 2.0,
        life: Math.random(),
        speed: 0.012 + Math.random() * 0.028,
        color: Math.random() > 0.4 ? "#4ade80" : Math.random() > 0.5 ? "#86efac" : "#ffffff",
      });
    }


    // Micro lightning bolts
    let bolts = [];
    let lastBoltTime = 0;

    const createBolt = (startX, startY, endX, endY) => {
      const segments = [];
      let curX = startX;
      let curY = startY;
      const steps = 6;
      const dx = (endX - startX) / steps;
      const dy = (endY - startY) / steps;

      for (let i = 0; i < steps; i++) {
        const nextX = curX + dx + (Math.random() - 0.5) * 18;
        const nextY = curY + dy + (Math.random() - 0.5) * 18;
        segments.push({ x1: curX, y1: curY, x2: nextX, y2: nextY });
        curX = nextX;
        curY = nextY;
      }
      segments.push({ x1: curX, y1: curY, x2: endX, y2: endY });
      return { segments, life: 1.0, color: Math.random() > 0.3 ? "#86efac" : "#ffffff" };
    };

    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // 1. Draw and update electric granules
      ctx.shadowBlur = 10;
      granules.forEach((g) => {
        g.x += g.vx * (isGlitching ? 2.5 : 1);
        g.y += g.vy * (isGlitching ? 2.5 : 1);
        g.life += g.speed * (isGlitching ? 2 : 1);

        if (g.x < 0) g.x = width;
        if (g.x > width) g.x = 0;
        if (g.y < 0) g.y = height;
        if (g.y > height) g.y = 0;
        if (g.life > 1) g.life = 0;

        const alpha = Math.sin(g.life * Math.PI) * (0.4 + Math.random() * 0.5);
        ctx.fillStyle = g.color;
        ctx.shadowColor = "#4ade80";
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Spawn periodic micro lightning discharges
      const boltInterval = isGlitching ? 80 : 260;
      const now = performance.now();
      if (now - lastBoltTime > boltInterval) {
        lastBoltTime = now;
        const x1 = Math.random() * width;
        const y1 = Math.random() * height;
        const x2 = x1 + (Math.random() - 0.5) * 70;
        const y2 = y1 + (Math.random() - 0.5) * 70;
        bolts.push(createBolt(x1, y1, x2, y2));
      }

      // 3. Render and decay lightning bolts
      ctx.shadowBlur = 14;
      bolts = bolts.filter((bolt) => {
        bolt.life -= isGlitching ? 0.12 : 0.08;
        if (bolt.life <= 0) return false;

        ctx.strokeStyle = bolt.color;
        ctx.shadowColor = "#4ade80";
        ctx.globalAlpha = bolt.life * 0.85;
        ctx.lineWidth = bolt.life * (isGlitching ? 2.2 : 1.5);

        ctx.beginPath();
        bolt.segments.forEach((seg, idx) => {
          if (idx === 0) ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        });
        ctx.stroke();
        return true;
      });

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isGlitching]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: "-10px -20px",
        width: "calc(100% + 40px)",
        height: "calc(100% + 20px)",
        pointerEvents: "none",
        zIndex: 3,
        mixBlendMode: "screen",
      }}
    />
  );
}
