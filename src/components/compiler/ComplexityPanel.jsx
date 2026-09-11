import React, { useState } from "react";
import {
  Clock,
  HardDrive,
  Cpu,
  Zap,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Code2,
  Flame,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

/**
 * ComplexityPanel Component (TASK-02)
 *
 * Dedicated panel for viewing:
 * 1. Space Complexity (Auxiliary memory, stack depth, heap usage)
 * 2. Time Complexity (Big-O asymptotic notation, best/average/worst case, operations estimate)
 * 3. Algorithm Used & Paradigms (Dynamic Programming, Greedy, Divide & Conquer, Sieve, etc.)
 * 4. Optimization Suggestions ("Use this code to get better complexity") with 1-click application
 */
export default function ComplexityPanel({
  analysis,
  selectedLang,
  onApplyCode,
  onReAnalyze,
  isAnalyzing = false,
}) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [appliedNotice, setAppliedNotice] = useState(false);

  if (!analysis) return null;

  const { timeComplexity, spaceComplexity, algorithm, suggestion } = analysis;

  const handleCopyCode = (codeText) => {
    if (!codeText) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeText);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleApply = (codeText) => {
    if (!codeText || !onApplyCode) return;
    onApplyCode(codeText);
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  // Complexity spectrum gauge calculation
  const getComplexityScalePercent = (bigO) => {
    if (bigO.includes("O(1)")) return 12;
    if (bigO.includes("O(log N)")) return 28;
    if (bigO.includes("O(N log log N)")) return 40;
    if (bigO.includes("O(N)")) return 52;
    if (bigO.includes("O(N log N)")) return 68;
    if (bigO.includes("O(N * √N)")) return 78;
    if (bigO.includes("O(N²)")) return 88;
    if (bigO.includes("O(N³)") || bigO.includes("O(2^N)") || bigO.includes("O(N!)")) return 98;
    return 50;
  };

  const scalePercent = getComplexityScalePercent(timeComplexity.bigO);

  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#030603",
        color: "#f8fafc",
        overflowY: "auto",
        padding: "14px 16px",
        boxSizing: "border-box",
        gap: 14,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Toast Notification when Suggested Code is Applied */}
      {appliedNotice && (
        <div
          style={{
            padding: "8px 14px",
            borderRadius: "6px",
            background: "linear-gradient(90deg, rgba(34, 197, 94, 0.25) 0%, rgba(56, 189, 248, 0.25) 100%)",
            border: "1px solid #22c55e",
            color: "#39ff14",
            fontSize: "12px",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 0 15px rgba(34, 197, 94, 0.35)",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Sparkles size={14} style={{ color: "#38bdf8" }} />
            <span>⚡ Optimized code successfully applied to your editor!</span>
          </div>
          <span style={{ fontSize: "11px", color: "#86efac" }}>Ready to compile (Ctrl+↵)</span>
        </div>
      )}

      {/* 1. TOP METRIC TILES: TIME, SPACE & ALGORITHM */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 10,
        }}
      >
        {/* Card A: Time Complexity */}
        <div
          style={{
            background: "rgba(10, 20, 14, 0.95)",
            border: `1.5px solid ${timeComplexity.color || "rgba(34, 197, 94, 0.4)"}`,
            borderRadius: "8px",
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            boxShadow: `0 4px 16px rgba(0, 0, 0, 0.5), 0 0 10px ${timeComplexity.color}22`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#94a3b8", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              <Clock size={13} style={{ color: timeComplexity.color }} />
              <span>Time Complexity</span>
            </div>
            <span
              style={{
                fontSize: "9.5px",
                fontWeight: 900,
                padding: "1px 6px",
                borderRadius: "3px",
                background: `${timeComplexity.color}25`,
                border: `1px solid ${timeComplexity.color}`,
                color: timeComplexity.color,
                letterSpacing: "0.04em",
              }}
            >
              {timeComplexity.badge}
            </span>
          </div>

          <div style={{ fontSize: "22px", fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: timeComplexity.color, textShadow: `0 0 10px ${timeComplexity.color}44` }}>
            {timeComplexity.bigO}
          </div>

          <div style={{ fontSize: "11.5px", color: "#cbd5e1", display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontWeight: 600 }}>{timeComplexity.label}</span>
            <span style={{ fontSize: "10.5px", color: "#64748b" }}>{timeComplexity.opsEstimate}</span>
          </div>
        </div>

        {/* Card B: Space Complexity */}
        <div
          style={{
            background: "rgba(10, 20, 14, 0.95)",
            border: `1.5px solid ${spaceComplexity.color || "rgba(34, 197, 94, 0.4)"}`,
            borderRadius: "8px",
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            boxShadow: `0 4px 16px rgba(0, 0, 0, 0.5), 0 0 10px ${spaceComplexity.color}22`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#94a3b8", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              <HardDrive size={13} style={{ color: spaceComplexity.color }} />
              <span>Space Complexity</span>
            </div>
            <span
              style={{
                fontSize: "9.5px",
                fontWeight: 900,
                padding: "1px 6px",
                borderRadius: "3px",
                background: `${spaceComplexity.color}25`,
                border: `1px solid ${spaceComplexity.color}`,
                color: spaceComplexity.color,
                letterSpacing: "0.04em",
              }}
            >
              {spaceComplexity.badge}
            </span>
          </div>

          <div style={{ fontSize: "22px", fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: spaceComplexity.color, textShadow: `0 0 10px ${spaceComplexity.color}44` }}>
            {spaceComplexity.bigO}
          </div>

          <div style={{ fontSize: "11.5px", color: "#cbd5e1", display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontWeight: 600 }}>{spaceComplexity.label}</span>
            <span style={{ fontSize: "10.5px", color: "#64748b" }}>{spaceComplexity.auxiliarySpace}</span>
          </div>
        </div>

        {/* Card C: Algorithm Used & Paradigm */}
        <div
          style={{
            background: "rgba(10, 20, 14, 0.95)",
            border: "1.5px solid rgba(56, 189, 248, 0.4)",
            borderRadius: "8px",
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5), 0 0 10px rgba(56, 189, 248, 0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#94a3b8", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              <Cpu size={13} style={{ color: "#38bdf8" }} />
              <span>Algorithm Used</span>
            </div>
            <span
              style={{
                fontSize: "9.5px",
                fontWeight: 900,
                padding: "1px 6px",
                borderRadius: "3px",
                background: "rgba(56, 189, 248, 0.15)",
                border: "1px solid #38bdf8",
                color: "#38bdf8",
              }}
            >
              {algorithm.paradigm}
            </span>
          </div>

          <div style={{ fontSize: "15px", fontWeight: 800, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {algorithm.name}
          </div>

          <div style={{ fontSize: "11px", color: "#94a3b8", lineHeight: "1.4" }}>
            {algorithm.summary}
          </div>
        </div>
      </div>

      {/* 2. VISUAL COMPLEXITY SPECTRUM GAUGE */}
      <div
        style={{
          background: "rgba(6, 12, 8, 0.8)",
          border: "1px solid rgba(34, 197, 94, 0.2)",
          borderRadius: "8px",
          padding: "10px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "11px" }}>
          <span style={{ color: "#94a3b8", fontWeight: 700, letterSpacing: "0.04em" }}>
            COMPLEXITY SPECTRUM SCALE
          </span>
          <span style={{ color: timeComplexity.color, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>
            Current: {timeComplexity.bigO}
          </span>
        </div>

        {/* Gradient spectrum bar */}
        <div
          style={{
            height: "8px",
            width: "100%",
            borderRadius: "4px",
            background: "linear-gradient(90deg, #22c55e 0%, #38bdf8 30%, #facc15 65%, #f97316 82%, #ef4444 100%)",
            position: "relative",
          }}
        >
          {/* Position Needle Marker */}
          <div
            style={{
              position: "absolute",
              top: "-4px",
              left: `${scalePercent}%`,
              transform: "translateX(-50%)",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              border: `3px solid ${timeComplexity.color}`,
              boxShadow: `0 0 10px ${timeComplexity.color}`,
              transition: "left 0.3s ease",
            }}
          />
        </div>

        {/* Big-O milestones */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "9.5px",
            color: "#64748b",
            fontFamily: "'JetBrains Mono', monospace",
            paddingTop: "2px",
          }}
        >
          <span style={{ color: "#22c55e" }}>O(1)</span>
          <span style={{ color: "#38bdf8" }}>O(log N)</span>
          <span style={{ color: "#4ade80" }}>O(N)</span>
          <span style={{ color: "#facc15" }}>O(N log N)</span>
          <span style={{ color: "#f97316" }}>O(N²)</span>
          <span style={{ color: "#ef4444" }}>O(2^N) / O(N!)</span>
        </div>
      </div>

      {/* 3. BOTTLENECKS SECTION (IF ANY) */}
      {algorithm.bottlenecks && algorithm.bottlenecks.length > 0 && (
        <div
          style={{
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            padding: "10px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#f87171", fontSize: "11.5px", fontWeight: 800 }}>
            <AlertTriangle size={13} />
            <span>DETECTED COMPLEXITY BOTTLENECKS</span>
          </div>
          {algorithm.bottlenecks.map((b, idx) => (
            <div key={idx} style={{ fontSize: "11.5px", color: "#cbd5e1", lineHeight: "1.4" }}>
              <span style={{ color: "#fca5a5", fontWeight: 700 }}>• {b.title}: </span>
              {b.desc}
            </div>
          ))}
        </div>
      )}

      {/* 4. "USE THIS CODE TO GET BETTER COMPLEXITY" OPTIMIZATION SECTION */}
      {suggestion ? (
        <div
          style={{
            background: "rgba(10, 22, 16, 0.98)",
            border: "1.5px solid rgba(34, 197, 94, 0.5)",
            borderRadius: "8px",
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: "0 6px 24px rgba(0, 0, 0, 0.7), 0 0 15px rgba(34, 197, 94, 0.15)",
          }}
        >
          {/* Suggestion Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  background: "linear-gradient(135deg, #15803d 0%, #22c55e 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#030603",
                  boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
                }}
              >
                <Zap size={16} fill="currentColor" />
              </div>
              <div>
                <div style={{ fontSize: "13.5px", fontWeight: 800, color: "#ffffff" }}>
                  {suggestion.title}
                </div>
                <div style={{ fontSize: "11.5px", color: "#86efac", fontWeight: 600 }}>
                  💡 {suggestion.benefit}
                </div>
              </div>
            </div>

            {/* Speedup Badge */}
            {suggestion.speedup && (
              <span
                style={{
                  padding: "3px 8px",
                  borderRadius: "4px",
                  background: "rgba(34, 197, 94, 0.2)",
                  border: "1px solid #22c55e",
                  color: "#39ff14",
                  fontSize: "11px",
                  fontWeight: 900,
                  letterSpacing: "0.04em",
                }}
              >
                ⚡ {suggestion.speedup}
              </span>
            )}
          </div>

          {/* Complexity Comparison Matrix */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: 8,
              background: "#030603",
              border: "1px solid rgba(34, 197, 94, 0.25)",
              borderRadius: "6px",
              padding: "10px 14px",
            }}
          >
            {/* Current Metrics */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>Current Code</span>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#f87171", fontFamily: "'JetBrains Mono', monospace" }}>
                Time: {suggestion.currentTime}
              </div>
              <div style={{ fontSize: "11px", color: "#cbd5e1" }}>
                Space: {suggestion.currentSpace}
              </div>
            </div>

            {/* Arrow Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(34, 197, 94, 0.2)",
                color: "#39ff14",
              }}
            >
              <ArrowRight size={14} />
            </div>

            {/* Improved Metrics */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3, textAlign: "right" }}>
              <span style={{ fontSize: "10px", color: "#86efac", fontWeight: 700, textTransform: "uppercase" }}>Optimized Target</span>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#39ff14", fontFamily: "'JetBrains Mono', monospace" }}>
                Time: {suggestion.improvedTime}
              </div>
              <div style={{ fontSize: "11px", color: "#86efac" }}>
                Space: {suggestion.improvedSpace}
              </div>
            </div>
          </div>

          {/* Code Preview Box */}
          {suggestion.code && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "6px",
                overflow: "hidden",
                border: "1.5px solid rgba(34, 197, 94, 0.35)",
                background: "#020502",
              }}
            >
              {/* Code Box Header with Actions */}
              <div
                style={{
                  height: "36px",
                  padding: "0 12px",
                  background: "rgba(10, 20, 12, 0.98)",
                  borderBottom: "1px solid rgba(34, 197, 94, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "11px", color: "#86efac", fontWeight: 700 }}>
                  <Code2 size={13} style={{ color: "#39ff14" }} />
                  <span>SUGGESTED OPTIMIZATION ({selectedLang.toUpperCase()})</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopyCode(suggestion.code)}
                    style={{
                      padding: "3px 8px",
                      borderRadius: "4px",
                      background: copiedCode ? "rgba(34, 197, 94, 0.25)" : "transparent",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: copiedCode ? "#39ff14" : "#94a3b8",
                      fontSize: "10.5px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      transition: "all 0.15s ease",
                    }}
                    title="Copy optimized code snippet"
                  >
                    {copiedCode ? <Check size={11} /> : <Copy size={11} />}
                    <span>{copiedCode ? "Copied" : "Copy"}</span>
                  </button>

                  {/* USE THIS CODE (APPLY) ACTION BUTTON */}
                  <button
                    onClick={() => handleApply(suggestion.code)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "4px",
                      background: "linear-gradient(135deg, #15803d 0%, #22c55e 100%)",
                      border: "1px solid #22c55e",
                      color: "#030603",
                      fontSize: "11px",
                      fontWeight: 900,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      boxShadow: "0 0 12px rgba(34, 197, 94, 0.5)",
                      transition: "all 0.15s ease",
                    }}
                    title="Replace editor code with this optimized implementation"
                  >
                    <Sparkles size={12} fill="#030603" />
                    <span>USE THIS CODE</span>
                  </button>
                </div>
              </div>

              {/* Code Snippet */}
              <pre
                style={{
                  margin: 0,
                  padding: "12px 14px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  lineHeight: "1.6",
                  color: "#39ff14",
                  overflowX: "auto",
                  maxHeight: "220px",
                  whiteSpace: "pre",
                  background: "#020402",
                }}
              >
                {suggestion.code}
              </pre>
            </div>
          )}
        </div>
      ) : (
        /* Optimal State Card when no major bottleneck exists */
        <div
          style={{
            background: "rgba(34, 197, 94, 0.08)",
            border: "1.5px solid rgba(34, 197, 94, 0.35)",
            borderRadius: "8px",
            padding: "14px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(34, 197, 94, 0.2)",
              border: "1px solid #22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#39ff14",
              flexShrink: 0,
            }}
          >
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "#ffffff" }}>
              High-Efficiency Algorithmic Implementation
            </div>
            <div style={{ fontSize: "11.5px", color: "#86efac", marginTop: "2px" }}>
              This code is operating within optimal computational complexity bounds with low auxiliary memory overhead.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
