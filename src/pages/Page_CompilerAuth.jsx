import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Eye, EyeOff, AlertCircle, Check } from "lucide-react";
import CompilerPipeline from "../components/compiler/CompilerPipeline";
import CompilerWorkspace from "../components/compiler/CompilerWorkspace";

export default function Page_CompilerAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileStep, setCompileStep] = useState(0); // 0..6
  const [compileLogs, setCompileLogs] = useState([]);
  const [statusMessage, setStatusMessage] = useState("READY FOR AUTHENTICATION");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mouse position for subtle cursor-following light
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCompile = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || isCompiling) return;

    if (password.length < 6) {
      setErrorMessage("KEY_LEN_ERROR: Password must be at least 6 characters.");
      setStatusMessage("COMPILATION FAILED: SYNTAX_ERROR");
      return;
    }

    setErrorMessage("");
    setIsCompiling(true);
    setCompileLogs([]);
    setCompileStep(1);

    const steps = [
      { step: 1, text: "INITIALIZING AUTHENTICATION...", delay: 220 },
      { step: 2, text: "✓ USER IDENTIFIED", delay: 240 },
      { step: 3, text: "✓ PASSWORD VERIFIED", delay: 240 },
      { step: 4, text: "✓ HASH VALIDATED", delay: 220 },
      { step: 5, text: "✓ DATABASE VERIFIED", delay: 200 },
      { step: 6, text: "✓ SESSION CREATED", delay: 220 },
    ];

    for (const s of steps) {
      setStatusMessage(s.text);
      setCompileLogs((prev) => [...prev, s.text]);
      setCompileStep(s.step);
      await new Promise((r) => setTimeout(r, s.delay));
    }

    setStatusMessage("BUILD SUCCESSFUL — ACCESS GRANTED");
    setCompileLogs((prev) => [...prev, "BUILD SUCCESSFUL", "ACCESS GRANTED"]);
    setCompileStep(7);

    // Smooth transition into Compiler Workspace
    await new Promise((r) => setTimeout(r, 650));
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return (
      <CompilerWorkspace
        userEmail={email}
        onSignOut={() => {
          setIsAuthenticated(false);
          setIsCompiling(false);
          setCompileStep(0);
          setCompileLogs([]);
          setStatusMessage("READY FOR AUTHENTICATION");
          setPassword("");
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: "100vh",
        backgroundColor: "#0D0F0D",
        color: "#F2F3ED",
        fontFamily: "'Inter', -apple-system, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle cursor-following ambient highlight */}
      <div
        style={{
          position: "absolute",
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34, 139, 34, 0.04) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Main Split Screen Container */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "min(1120px, 100%)",
          minHeight: "680px",
          display: "grid",
          gridTemplateColumns: "1.05fr 1fr",
          backgroundColor: "#151815",
          border: "1px solid #292E29",
          borderRadius: "8px",
          boxShadow: "0 24px 64px -12px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.04)",
          overflow: "hidden",
        }}
      >
        {/* ================================================================= */}
        {/* LEFT SIDE: Compiler Pipeline Architecture Visualization           */}
        {/* ================================================================= */}
        <div
          style={{
            padding: "44px 40px",
            backgroundColor: "#0D0F0D",
            borderRight: "1px solid #292E29",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top Stage Descriptor */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 600,
                color: "#228B22",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Compiler Execution Graph
            </div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#F2F3ED",
                margin: "0 0 4px",
                letterSpacing: "-0.02em",
              }}
            >
              Authentication Pipeline
            </h2>
            <p style={{ fontSize: "13px", color: "#8D958B", margin: 0, lineHeight: 1.5 }}>
              Security tokens are tokenized, parsed into IR, and verified natively.
            </p>
          </div>

          {/* Interactive Pipeline Nodes */}
          <div style={{ margin: "24px 0" }}>
            <CompilerPipeline
              emailLength={email.length}
              passwordLength={password.length}
              compileStep={compileStep}
              isCompiling={isCompiling}
              isSuccess={compileStep === 7}
            />
          </div>

          {/* Bottom Live Execution Terminal Snippet */}
          <div
            style={{
              padding: "12px 14px",
              backgroundColor: "#151815",
              border: "1px solid #292E29",
              borderRadius: "4px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: "#8D958B",
              minHeight: "68px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#8D958B", marginBottom: "4px" }}>
              <span style={{ color: "#228B22" }}>$</span>
              <span>swaplyc --verify-session</span>
            </div>
            <div style={{ color: isCompiling ? "#F2F3ED" : "#8D958B" }}>
              {compileLogs.length > 0 ? (
                <span>{compileLogs[compileLogs.length - 1]}</span>
              ) : (
                <span style={{ color: "#5A6258" }}>Waiting for credentials input stream...</span>
              )}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT SIDE: Authentication Interface                               */}
        {/* ================================================================= */}
        <div
          style={{
            padding: "48px 52px",
            backgroundColor: "#151815",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top Brand & Version Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Geometric 'S' Mark */}
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  backgroundColor: "#228B22",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "14px",
                  color: "#0D0F0D",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                S
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "13px",
                    letterSpacing: "0.14em",
                    color: "#F2F3ED",
                    lineHeight: 1.1,
                  }}
                >
                  SWAPLYONE
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.16em",
                    color: "#8D958B",
                  }}
                >
                  COMPILER
                </span>
              </div>
            </div>

            {/* Version Indicator */}
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                color: "#8D958B",
                backgroundColor: "#1B1F1B",
                border: "1px solid #292E29",
                borderRadius: "3px",
                padding: "3px 7px",
              }}
            >
              v1.0.0
            </span>
          </div>

          {/* Form Content */}
          <div style={{ margin: "32px 0" }}>
            {/* Title & Subtitle */}
            <div style={{ marginBottom: "28px" }}>
              <h1
                style={{
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                  fontSize: "26px",
                  fontWeight: 600,
                  color: "#F2F3ED",
                  margin: "0 0 6px",
                  letterSpacing: "-0.02em",
                }}
              >
                WELCOME BACK.
              </h1>
              <p
                style={{
                  fontSize: "13.5px",
                  color: "#8D958B",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Sign in to continue to your compiler workspace.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleCompile} noValidate style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Email Field */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label
                  htmlFor="compiler-email"
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 500,
                    color: "#F2F3ED",
                  }}
                >
                  Email address
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="compiler-email"
                    type="email"
                    autoComplete="email"
                    disabled={isCompiling}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage("");
                      if (e.target.value) {
                        setStatusMessage("PIPELINE: SOURCE STREAM CONNECTED");
                      } else {
                        setStatusMessage("READY FOR AUTHENTICATION");
                      }
                    }}
                    placeholder="developer@swaply.io"
                    style={{
                      width: "100%",
                      height: "44px",
                      backgroundColor: "#1B1F1B",
                      border: "1px solid #292E29",
                      borderRadius: "4px",
                      padding: "0 14px",
                      color: "#F2F3ED",
                      fontSize: "13.5px",
                      fontFamily: "'JetBrains Mono', monospace",
                      outline: 0,
                      boxSizing: "border-box",
                      transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#228B22";
                      e.target.style.boxShadow = "0 0 0 1px #228B22";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#292E29";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label
                    htmlFor="compiler-password"
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 500,
                      color: "#F2F3ED",
                    }}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Password reset protocol initiated.")}
                    style={{
                      background: "transparent",
                      border: 0,
                      padding: 0,
                      color: "#8D958B",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <div style={{ position: "relative" }}>
                  <input
                    id="compiler-password"
                    type={passwordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    disabled={isCompiling}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage("");
                      if (e.target.value) {
                        setStatusMessage("PIPELINE: ENCRYPTION CIPHER INITIALIZED");
                      } else if (email) {
                        setStatusMessage("PIPELINE: SOURCE STREAM CONNECTED");
                      } else {
                        setStatusMessage("READY FOR AUTHENTICATION");
                      }
                    }}
                    placeholder="Enter your master key"
                    style={{
                      width: "100%",
                      height: "44px",
                      backgroundColor: "#1B1F1B",
                      border: "1px solid #292E29",
                      borderRadius: "4px",
                      padding: "0 40px 0 14px",
                      color: "#F2F3ED",
                      fontSize: "13.5px",
                      fontFamily: "'JetBrains Mono', monospace",
                      outline: 0,
                      boxSizing: "border-box",
                      transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#228B22";
                      e.target.style.boxShadow = "0 0 0 1px #228B22";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#292E29";
                      e.target.style.boxShadow = "none";
                    }}
                  />

                  {/* Password Visibility Toggle ◉ */}
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    title={passwordVisible ? "Hide password" : "Show password"}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: 0,
                      color: passwordVisible ? "#228B22" : "#8D958B",
                      cursor: "pointer",
                      padding: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error Banner */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      backgroundColor: "rgba(220, 38, 38, 0.1)",
                      border: "1px solid rgba(220, 38, 38, 0.3)",
                      borderRadius: "4px",
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#f87171",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11.5px",
                    }}
                  >
                    <AlertCircle size={14} />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Large Primary Action Button */}
              <motion.button
                type="submit"
                disabled={isCompiling || !email || !password}
                whileHover={!isCompiling && email && password ? { scale: 1.005 } : {}}
                whileTap={!isCompiling && email && password ? { scale: 0.99 } : {}}
                style={{
                  marginTop: "8px",
                  height: "46px",
                  backgroundColor: compileStep === 7 ? "#228B22" : "#228B22",
                  color: "#0D0F0D",
                  border: 0,
                  borderRadius: "4px",
                  fontWeight: 700,
                  fontSize: "13px",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.06em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: isCompiling || !email || !password ? "not-allowed" : "pointer",
                  opacity: !email || !password ? 0.45 : 1,
                  boxShadow: email && password ? "0 0 20px -4px rgba(34, 139, 34, 0.4)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                {compileStep === 7 ? (
                  <>
                    <Check size={16} strokeWidth={3} />
                    <span>ACCESS GRANTED</span>
                  </>
                ) : isCompiling ? (
                  <span>COMPILING...</span>
                ) : (
                  <>
                    <span>COMPILE & ENTER</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Bottom Compiler Status Indicator */}
          <div
            style={{
              paddingTop: "16px",
              borderTop: "1px solid #292E29",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: isCompiling || compileStep === 7 ? "#228B22" : "#8D958B",
                  boxShadow: isCompiling || compileStep === 7 ? "0 0 8px #228B22" : "none",
                }}
              />
              <span style={{ color: "#8D958B", letterSpacing: "0.06em" }}>STATUS:</span>
              <span
                style={{
                  color: compileStep === 7 ? "#228B22" : isCompiling ? "#F2F3ED" : "#8D958B",
                  fontWeight: 600,
                }}
              >
                {statusMessage}
              </span>
            </div>

            <span style={{ color: "#5A6258", fontSize: "10.5px" }}>TLS 1.3 • AES-256-GCM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
