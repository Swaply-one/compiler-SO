import React from "react";

/**
 * Official SwaplyOne Brand Logo
 * - Uses the official /swaply-favicon-bgl.png icon
 * - Includes typography wordmark "SwaplyOne"
 */
export default function SwaplyLogo({ size = 36, showWordmark = true, className = "" }) {
  return (
    <div
      className={`swaply-brand-logo ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        userSelect: "none",
      }}
    >
      <img
        src="/swaply-favicon-bgl.png"
        alt="SwaplyOne Logo"
        width={size}
        height={size}
        style={{
          display: "block",
          objectFit: "contain",
          flexShrink: 0,
          borderRadius: "6px",
        }}
      />

      {showWordmark && (
        <div style={{ display: "flex", alignItems: "baseline", gap: "4px", lineHeight: 1 }}>
          <span
            style={{
              fontFamily: "'Inter', -apple-system, sans-serif",
              fontSize: `${size * 0.48}px`,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#f8fafc",
            }}
          >
            Swaply
          </span>
          <span
            style={{
              fontFamily: "'Inter', -apple-system, sans-serif",
              fontSize: `${size * 0.48}px`,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#228B22",
              textShadow: "0 0 12px rgba(34, 139, 34, 0.4)",
            }}
          >
            One
          </span>
        </div>
      )}
    </div>
  );
}
