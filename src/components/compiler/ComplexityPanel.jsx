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
 * ComplexityPanel Component (TASK-02 & TASK-04)
 *
 * Dedicated panel for viewing:
 * 1. Space Complexity (Auxiliary memory, stack depth, heap usage)
 * 2. Time Complexity (Big-O asymptotic notation, best/average/worst case, operations estimate)
 * 3. Algorithm Used & Paradigms (Dynamic Programming, Greedy, Divide & Conquer, Sieve, etc.)
 * 4. Optimization Suggestions ("Use this code to get better complexity") with 1-click application
 * 5. Supports both Studio White (Free) and Cyber Matrix (Premium) theme modes.
 */
export default function ComplexityPanel({
  analysis,
  selectedLang,
  onApplyCode,
  onReAnalyze,
  isAnalyzing = false,
  themeMode = "matrix",
}) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [appliedNotice, setAppliedNotice] = useState(false);

  if (!analysis) return null;

  const isWhite = themeMode === "white";
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
        background: isWhite ? "#ffffff" : "#030603",
        color: isWhite ? "#0f172a" : "#f8fafc",
        overflowY: "auto",
        padding: "14px 16px",
        boxSizing: "border-box",
        gap: 14,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP HEADER BANNER & RE-ANALYZE ACTION */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderRadius: "8px",
          background: isWhite ? "#f8fafc" : "rgba(56, 189, 248, 0.08)",
          border: isWhite ? "1px solid #e2e8f0" : "1px solid rgba(56, 189, 248, 0.3)",
          boxShadow: isWhite ? "0 1px 3px rgba(0,0,0,0.04)" : "none",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              background: isWhite ? "#eff6ff" : "rgba(56, 189, 248, 0.2)",
              border: isWhite ? "1px solid #bfdbfe" : "1px solid #38bdf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isWhite ? "#2563eb" : "#38bdf8",
            }}
          >
            <Cpu size={16} />
          </div>
          <div>
            <div style={{ fontSize: "12.5px", fontWeight: 800, color: isWhite ? "#0f172a" : "#f8fafc" }}>
              Algorithmic Engine Analysis
            </div>
            <div style={{ fontSize: "11px", color: isWhite ? "#64748b" : "#94a3b8" }}>
              Real-time asymptotic notation & optimization advisor
            </div>
          </div>
        </div>

        <button
          onClick={onReAnalyze}
          disabled={isAnalyzing}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 11px",
            borderRadius: "5px",
            background: isWhite ? "#ffffff" : "rgba(56, 189, 248, 0.15)",
            border: isWhite ? "1px solid #cbd5e1" : "1px solid rgba(56, 189, 248, 0.4)",
            color: isWhite ? "#2563eb" : "#38bdf8",
            fontSize: "11px",
            fontWeight: 700,
            cursor: isAnalyzing ? "not-allowed" : "pointer",
            transition: "all 0.15s ease",
          }}
          title="Re-run static algorithm analyzer"
        >
          <RefreshCw size={12} className={isAnalyzing ? "animate-spin" : ""} />
          <span>{isAnalyzing ? "Analyzing..." : "Re-Analyze"}</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. TIME & SPACE COMPLEXITY METRIC CARDS (SIDE-BY-SIDE) */}
      {/* ------------------------------------------------------------- */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flexShrink: 0 }}>
        {/* TIME COMPLEXITY CARD */}
        <div
          style={{
            background: isWhite ? "#f8fafc" : "#060c07",
            border: isWhite ? "1px solid #e2e8f0" : `1.5px solid ${timeComplexity.color || "#22c55e"}55`,
            borderRadius: "8px",
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            boxShadow: isWhite ? "0 1px 3px rgba(0,0,0,0.03)" : `0 4px 20px ${timeComplexity.color || "#22c55e"}15`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Clock size={15} color={timeComplexity.color || (isWhite ? "#16a34a" : "#22c55e")} />
              <span style={{ fontSize: "11.5px", fontWeight: 700, color: isWhite ? "#475569" : "#94a3b8", textTransform: "uppercase" }}>
                Time Complexity
              </span>
            </div>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                padding: "2px 7px",
                borderRadius: "4px",
                background: `${timeComplexity.color || "#22c55e"}22`,
                color: timeComplexity.color || (isWhite ? "#16a34a" : "#22c55e"),
                border: `1px solid ${timeComplexity.color || "#22c55e"}44`,
              }}
            >
              {timeComplexity.rating}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "24px",
                fontWeight: 900,
                color: isWhite ? (timeComplexity.color === "#39ff14" || timeComplexity.color === "#22c55e" ? "#16a34a" : timeComplexity.color || "#16a34a") : (timeComplexity.color || "#39ff14"),
                letterSpacing: "-0.02em",
              }}
            >
              {timeComplexity.bigO}
            </div>
          </div>

          <div style={{ fontSize: "11px", color: isWhite ? "#475569" : "#cbd5e1", lineHeight: "1.45" }}>
            {timeComplexity.explanation}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 4,
              paddingTop: "6px",
              borderTop: isWhite ? "1px solid #e2e8f0" : "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "10.5px",
              color: isWhite ? "#64748b" : "#94a3b8",
            }}
          >
            <div>
              Best: <strong style={{ color: isWhite ? "#0f172a" : "#f8fafc", fontFamily: "'JetBrains Mono', monospace" }}>{timeComplexity.bestCase}</strong>
            </div>
            <div>
              Worst: <strong style={{ color: isWhite ? "#0f172a" : "#f8fafc", fontFamily: "'JetBrains Mono', monospace" }}>{timeComplexity.worstCase}</strong>
            </div>
          </div>
        </div>

        {/* SPACE COMPLEXITY CARD */}
        <div
          style={{
            background: isWhite ? "#f8fafc" : "#060c07",
            border: isWhite ? "1px solid #e2e8f0" : `1.5px solid ${spaceComplexity.color || "#38bdf8"}55`,
            borderRadius: "8px",
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            boxShadow: isWhite ? "0 1px 3px rgba(0,0,0,0.03)" : `0 4px 20px ${spaceComplexity.color || "#38bdf8"}15`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <HardDrive size={15} color={spaceComplexity.color || (isWhite ? "#0284c7" : "#38bdf8")} />
              <span style={{ fontSize: "11.5px", fontWeight: 700, color: isWhite ? "#475569" : "#94a3b8", textTransform: "uppercase" }}>
                Space Complexity
              </span>
            </div>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                padding: "2px 7px",
                borderRadius: "4px",
                background: `${spaceComplexity.color || "#38bdf8"}22`,
                color: spaceComplexity.color || (isWhite ? "#0284c7" : "#38bdf8"),
                border: `1px solid ${spaceComplexity.color || "#38bdf8"}44`,
              }}
            >
              {spaceComplexity.rating}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "24px",
                fontWeight: 900,
                color: isWhite ? (spaceComplexity.color === "#38bdf8" ? "#0284c7" : spaceComplexity.color || "#0284c7") : (spaceComplexity.color || "#38bdf8"),
                letterSpacing: "-0.02em",
              }}
            >
              {spaceComplexity.bigO}
            </div>
          </div>

          <div style={{ fontSize: "11px", color: isWhite ? "#475569" : "#cbd5e1", lineHeight: "1.45" }}>
            {spaceComplexity.explanation}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 4,
              paddingTop: "6px",
              borderTop: isWhite ? "1px solid #e2e8f0" : "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "10.5px",
              color: isWhite ? "#64748b" : "#94a3b8",
            }}
          >
            <div>
              Stack: <strong style={{ color: isWhite ? "#0f172a" : "#f8fafc", fontFamily: "'JetBrains Mono', monospace" }}>{spaceComplexity.stackDepth}</strong>
            </div>
            <div>
              Heap: <strong style={{ color: isWhite ? "#0f172a" : "#f8fafc", fontFamily: "'JetBrains Mono', monospace" }}>{spaceComplexity.heapAllocations}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. ASYMPTOTIC SCALE GAUGE METER */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          background: isWhite ? "#f8fafc" : "#060c07",
          border: isWhite ? "1px solid #e2e8f0" : "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "8px",
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px" }}>
          <span style={{ fontWeight: 700, color: isWhite ? "#475569" : "#94a3b8" }}>
            Asymptotic Growth Spectrum
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: timeComplexity.color || (isWhite ? "#16a34a" : "#39ff14"), fontWeight: 700 }}>
            {timeComplexity.bigO} ({scalePercent}% scale)
          </span>
        </div>

        {/* Multi-tier Gradient Bar */}
        <div
          style={{
            height: "8px",
            width: "100%",
            borderRadius: "4px",
            background: "linear-gradient(to right, #22c55e 0%, #38bdf8 30%, #eab308 65%, #ef4444 100%)",
            position: "relative",
          }}
        >
          {/* Position Pin Pointer */}
          <div
            style={{
              position: "absolute",
              top: "-4px",
              left: `${scalePercent}%`,
              transform: "translateX(-50%)",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "#ffffff",
              border: `3px solid ${timeComplexity.color || "#22c55e"}`,
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              transition: "left 0.4s ease",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "9.5px",
            color: isWhite ? "#94a3b8" : "#64748b",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span>O(1) Constant</span>
          <span>O(log N)</span>
          <span>O(N) Linear</span>
          <span>O(N log N)</span>
          <span>O(N²) Quad</span>
          <span>O(2^N) Exp</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. ALGORITHM USED & DETECTED PATTERNS */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          background: isWhite ? "#f8fafc" : "#060c07",
          border: isWhite ? "1px solid #e2e8f0" : "1px solid rgba(168, 85, 247, 0.3)",
          borderRadius: "8px",
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Layers size={15} color={isWhite ? "#7c3aed" : "#c084fc"} />
            <span style={{ fontSize: "11.5px", fontWeight: 700, color: isWhite ? "#475569" : "#94a3b8", textTransform: "uppercase" }}>
              Detected Algorithm
            </span>
          </div>
          <span
            style={{
              fontSize: "10.5px",
              fontWeight: 800,
              padding: "2px 8px",
              borderRadius: "4px",
              background: isWhite ? "#f3e8ff" : "rgba(168, 85, 247, 0.15)",
              color: isWhite ? "#7c3aed" : "#c084fc",
              border: isWhite ? "1px solid #d8b4fe" : "1px solid rgba(168, 85, 247, 0.4)",
            }}
          >
            {algorithm.paradigm}
          </span>
        </div>

        <div style={{ fontSize: "14px", fontWeight: 800, color: isWhite ? "#0f172a" : "#f8fafc" }}>
          {algorithm.name}
        </div>

        <div style={{ fontSize: "11.5px", color: isWhite ? "#475569" : "#cbd5e1", lineHeight: "1.5" }}>
          {algorithm.description}
        </div>

        {algorithm.identifiedPatterns && algorithm.identifiedPatterns.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: "4px" }}>
            {algorithm.identifiedPatterns.map((pat, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                  background: isWhite ? "#f1f5f9" : "rgba(255, 255, 255, 0.06)",
                  border: isWhite ? "1px solid #e2e8f0" : "1px solid rgba(255, 255, 255, 0.12)",
                  color: isWhite ? "#334155" : "#e2e8f0",
                  padding: "2px 7px",
                  borderRadius: "4px",
                }}
              >
                #{pat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. CODE OPTIMIZATION SUGGESTION (DYNAMIC 1-CLICK APPLY) */}
      {/* ------------------------------------------------------------- */}
      {suggestion && (
        <div
          style={{
            background: isWhite ? "#eff6ff" : "rgba(14, 165, 233, 0.08)",
            border: isWhite ? "1.5px solid #93c5fd" : "1.5px solid rgba(14, 165, 233, 0.45)",
            borderRadius: "8px",
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            flexShrink: 0,
            boxShadow: isWhite ? "0 4px 12px rgba(37, 99, 235, 0.06)" : "0 4px 20px rgba(14, 165, 233, 0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Sparkles size={16} color={isWhite ? "#2563eb" : "#38bdf8"} />
              <span style={{ fontSize: "12.5px", fontWeight: 800, color: isWhite ? "#1e40af" : "#38bdf8" }}>
                Optimization Recommendation
              </span>
            </div>
            <div
              style={{
                fontSize: "10.5px",
                fontWeight: 800,
                padding: "3px 8px",
                borderRadius: "4px",
                background: isWhite ? "#dcfce7" : "rgba(34, 197, 94, 0.2)",
                color: isWhite ? "#15803d" : "#4ade80",
                border: isWhite ? "1px solid #86efac" : "1px solid rgba(34, 197, 94, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <TrendingUp size={11} />
              <span>{suggestion.improvement}</span>
            </div>
          </div>

          <div style={{ fontSize: "13px", fontWeight: 700, color: isWhite ? "#0f172a" : "#f8fafc" }}>
            {suggestion.title}
          </div>

          <div style={{ fontSize: "11.5px", color: isWhite ? "#334155" : "#cbd5e1", lineHeight: "1.5" }}>
            {suggestion.description}
          </div>

          {/* Optimized Code Snippet Box */}
          {suggestion.suggestedCode && (
            <div
              style={{
                borderRadius: "6px",
                overflow: "hidden",
                border: isWhite ? "1px solid #cbd5e1" : "1px solid rgba(255, 255, 255, 0.15)",
                background: isWhite ? "#ffffff" : "#020402",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 10px",
                  background: isWhite ? "#f1f5f9" : "rgba(255, 255, 255, 0.05)",
                  borderBottom: isWhite ? "1px solid #e2e8f0" : "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <span style={{ fontSize: "10.5px", fontWeight: 700, color: isWhite ? "#64748b" : "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>
                  💡 Optimized {selectedLang.toUpperCase()} Implementation
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button
                    onClick={() => handleCopyCode(suggestion.suggestedCode)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "3px 8px",
                      borderRadius: "4px",
                      background: "transparent",
                      border: isWhite ? "1px solid #cbd5e1" : "1px solid rgba(255, 255, 255, 0.2)",
                      color: isWhite ? "#475569" : "#e2e8f0",
                      fontSize: "10.5px",
                      cursor: "pointer",
                    }}
                    title="Copy suggested code"
                  >
                    {copiedCode ? <Check size={11} color="#22c55e" /> : <Copy size={11} />}
                    <span>{copiedCode ? "Copied" : "Copy"}</span>
                  </button>

                  <button
                    onClick={() => handleApply(suggestion.suggestedCode)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "3px 10px",
                      borderRadius: "4px",
                      background: isWhite ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" : "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                      border: isWhite ? "1px solid #2563eb" : "1px solid #38bdf8",
                      color: "#ffffff",
                      fontSize: "10.5px",
                      fontWeight: 800,
                      cursor: "pointer",
                      boxShadow: isWhite ? "0 2px 6px rgba(37, 99, 235, 0.25)" : "0 0 10px rgba(56, 189, 248, 0.35)",
                    }}
                    title="Replace current editor code with optimized algorithm"
                  >
                    {appliedNotice ? <CheckCircle2 size={12} /> : <ArrowRight size={12} />}
                    <span>{appliedNotice ? "Applied to Editor!" : "Apply to Editor"}</span>
                  </button>
                </div>
              </div>

              <pre
                style={{
                  margin: 0,
                  padding: "10px 12px",
                  fontSize: "11.5px",
                  fontFamily: "'JetBrains Mono', monospace",
                  lineHeight: "1.55",
                  color: isWhite ? "#0f172a" : "#86efac",
                  overflowX: "auto",
                  whiteSpace: "pre",
                  maxHeight: "180px",
                  overflowY: "auto",
                }}
              >
                {suggestion.suggestedCode}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
