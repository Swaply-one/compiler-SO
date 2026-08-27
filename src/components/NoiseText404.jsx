import React, { useRef, useEffect } from "react";

/**
 * Animated Noise Texture 404 Typography Component (@react-bits/Noise filled text)
 * - Directly fills the 404 letters with the animated grain texture
 * - Uses source-atop composite clipping so the text itself is made of live cyber noise
 */
export default function NoiseText404({
  text = "404",
  patternRefreshInterval = 2,
  patternAlpha = 240,
  fontSize = 154,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animationId;

    const width = 480;
    const height = 180;
    canvas.width = width;
    canvas.height = height;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Generate live pixel grain texture
      const grainCanvas = document.createElement("canvas");
      grainCanvas.width = width;
      grainCanvas.height = height;
      const gCtx = grainCanvas.getContext("2d");
      if (!gCtx) return;

      const imgData = gCtx.createImageData(width, height);
      const d = imgData.data;

      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        // Cyber green illuminated grain matrix
        d[i] = v > 140 ? Math.min(255, v + 30) : v * 0.4;
        d[i + 1] = Math.min(255, v + 90);
        d[i + 2] = v * 0.6;
        d[i + 3] = patternAlpha;
      }
      gCtx.putImageData(imgData, 0, 0);

      // 2. Draw 404 Typography Mask
      ctx.save();
      ctx.font = `900 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Rich Gradient Base
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.25, "#a7f3d0");
      grad.addColorStop(0.65, "#4ade80");
      grad.addColorStop(1, "#22c55e");

      ctx.fillStyle = grad;
      ctx.shadowColor = "#4ade80";
      ctx.shadowBlur = 28;
      ctx.fillText(text, width / 2, height / 2 + 8);

      // 3. Composite live Noise Grain DIRECTLY INSIDE the 404 Letters!
      ctx.globalCompositeOperation = "source-atop";
      ctx.drawImage(grainCanvas, 0, 0);

      // 4. Subtle Crisp Contour Outline
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "rgba(134, 239, 172, 0.85)";
      ctx.lineWidth = 2;
      ctx.strokeText(text, width / 2, height / 2 + 8);

      ctx.restore();
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        render();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [text, patternRefreshInterval, patternAlpha, fontSize]);

  return (
    <div className="noise-text-container" style={{ position: "relative", width: "100%", maxWidth: "480px" }}>
      <canvas
        ref={canvasRef}
        className="noise-text-canvas"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          imageRendering: "pixelated",
          filter: "drop-shadow(0 0 20px rgba(74, 222, 128, 0.4)) drop-shadow(0 0 50px rgba(34, 197, 94, 0.25))",
          cursor: "default",
        }}
      />
    </div>
  );
}
