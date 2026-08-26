import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  Check,
  AlertCircle,
  Loader2,
  Cpu,
  Lock,
} from "lucide-react";
import ThreeDWebGLBotMascot from "../components/mascots/ThreeDWebGLBotMascot";

export default function Page1_ThreeDWebGL() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const canSubmit = email.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit || loading) return;

    setError("");
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1100));

    if (password.length >= 6) {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2400);
    } else {
      setLoading(false);
      setError("Password must be at least 6 characters.");
    }
  };

  const mascotSubtitle = success
    ? "Connected! Launching LLVM Core 🚀"
    : passwordFocused
    ? passwordVisible
      ? "Peeking through sensors 👀"
      : "I don't peek! Your secret is safe 💚"
    : emailFocused
    ? "Tracking your email input... 🔍"
    : "Interactive 3D WebGL Bot ready 😊";

  return (
    <main
      className="login-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        background: `
          radial-gradient(circle at 15% 15%, rgba(34, 197, 94, 0.12), transparent 35%),
          radial-gradient(circle at 85% 80%, rgba(16, 185, 129, 0.08), transparent 35%),
          #080c10
        `,
        color: "#f8fafc",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Ambient background glows */}
      <div
        className="ambient"
        style={{
          width: 450,
          height: 450,
          left: -100,
          top: -100,
          background: "radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="ambient"
        style={{
          width: 500,
          height: 500,
          right: -150,
          bottom: -150,
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="login-container"
        style={{
          width: "min(1080px, 100%)",
          minHeight: 680,
          display: "grid",
          gridTemplateColumns: "48% 52%",
          background: "rgba(13, 18, 24, 0.95)",
          border: "1px solid rgba(34, 197, 94, 0.25)",
          borderRadius: 32,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px -10px rgba(34, 197, 94, 0.2)",
          backdropFilter: "blur(20px)",
        }}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Left Mascot Panel */}
        <section
          className="character-panel"
          style={{
            padding: 38,
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(150deg, rgba(18, 26, 36, 0.9) 0%, rgba(10, 15, 20, 0.95) 100%)",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="brand" style={{ color: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
            <div
              className="brand-mark"
              style={{
                width: 34,
                height: 34,
                display: "grid",
                placeItems: "center",
                borderRadius: 10,
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)",
                color: "#fff",
                fontWeight: 800,
              }}
            >
              &lt;/&gt;
            </div>
            <span style={{ fontFamily: "Space Grotesk", fontSize: 17, fontWeight: 700 }}>SwaplyOne</span>
          </div>

          <div
            className="character-content"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <motion.div
              className="character-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ alignSelf: "flex-start", marginBottom: -6 }}
            >
              <span style={{ color: "#86efac", fontSize: 13, fontWeight: 700, letterSpacing: "1px" }}>
                INTERACTIVE 3D WEBGL ENGINE
              </span>
              <h1 style={{ color: "#ffffff", fontFamily: "Space Grotesk", fontSize: "clamp(32px, 3.8vw, 44px)", fontWeight: 500, margin: "4px 0 0" }}>
                Code & compile
                <br />
                <strong style={{ color: "#22c55e", fontWeight: 700 }}>in Real 3D.</strong>
              </h1>
            </motion.div>

            {/* Real 3D WebGL Canvas Mascot */}
            <ThreeDWebGLBotMascot
              passwordFocused={passwordFocused}
              passwordVisible={passwordVisible}
              emailFocused={emailFocused}
              error={Boolean(error)}
              success={success}
            />

            {/* Dynamic Subtitle */}
            <motion.p
              style={{
                minHeight: 28,
                margin: "4px 0 0",
                color: passwordFocused ? "#4ade80" : "#94a3b8",
                fontSize: 14.5,
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
              animate={{ opacity: 1 }}
            >
              {mascotSubtitle}
            </motion.p>
          </div>

          <div className="panel-footer" style={{ display: "flex", alignItems: "center", gap: 9, color: "#64748b", fontSize: 12 }}>
            <span>Real-time WebGL 3D Mesh</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#22c55e" }} />
            <span>Hardware Accelerated</span>
          </div>
        </section>

        {/* Right Form Panel */}
        <section
          className="form-panel"
          style={{
            padding: "60px 68px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "rgba(10, 14, 20, 0.98)",
          }}
        >
          <div className="form-wrapper" style={{ width: "100%", maxWidth: 390, margin: "0 auto" }}>
            <motion.div
              className="form-heading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{ marginBottom: 32 }}
            >
              <p style={{ color: "#22c55e", fontSize: 11, fontWeight: 700, letterSpacing: "0.13em", margin: "0 0 10px" }}>
                COMPILER LOGIN
              </p>
              <h2 style={{ color: "#ffffff", fontFamily: "Space Grotesk", fontSize: 38, margin: "0 0 8px" }}>
                Welcome Back
              </h2>
              <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>
                Enter your credentials to launch your compiler workspace.
              </p>
            </motion.div>

            <form className="login-form" onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {/* Email */}
              <div className="field" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label htmlFor="webgl-email" style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 600 }}>
                  Developer Email
                </label>
                <div
                  className="input-wrapper"
                  style={{
                    height: 52,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 14,
                    background: "rgba(18, 24, 34, 0.7)",
                    border: "1.5px solid rgba(255, 255, 255, 0.12)",
                    transition: "all 180ms ease",
                  }}
                >
                  <Mail className="input-icon" size={19} color="#22c55e" style={{ marginLeft: 16 }} />
                  <input
                    id="webgl-email"
                    type="email"
                    autoComplete="email"
                    placeholder="developer@swaply.io"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: 0,
                      outline: 0,
                      padding: "0 15px",
                      background: "transparent",
                      color: "#f8fafc",
                      fontSize: 14.5,
                    }}
                    value={email}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div className="password-label" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label htmlFor="webgl-password" style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 600 }}>
                    Master Key / Password
                  </label>
                  <button
                    type="button"
                    className="forgot-button"
                    style={{ border: 0, background: "transparent", color: "#22c55e", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                    onClick={() => alert("Password reset token dispatched.")}
                  >
                    Forgot key?
                  </button>
                </div>

                <div
                  className={`input-wrapper ${passwordFocused ? "focused" : ""}`}
                  style={{
                    height: 52,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 14,
                    background: "rgba(18, 24, 34, 0.7)",
                    border: passwordFocused ? "1.5px solid #22c55e" : "1.5px solid rgba(255, 255, 255, 0.12)",
                    boxShadow: passwordFocused ? "0 0 0 4px rgba(34, 197, 94, 0.15)" : "none",
                    transition: "all 180ms ease",
                  }}
                >
                  <LockKeyhole className="input-icon" size={19} color="#22c55e" style={{ marginLeft: 16 }} />
                  <input
                    id="webgl-password"
                    type={passwordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your master key"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: 0,
                      outline: 0,
                      padding: "0 15px",
                      background: "transparent",
                      color: "#f8fafc",
                      fontSize: 14.5,
                    }}
                    value={password}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    style={{
                      width: 40,
                      height: 40,
                      marginRight: 6,
                      border: 0,
                      background: "transparent",
                      color: "#94a3b8",
                      cursor: "pointer",
                      display: "grid",
                      placeItems: "center",
                    }}
                    onClick={() => setPasswordVisible((val) => !val)}
                  >
                    {passwordVisible ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    className="error-message"
                    style={{ color: "#f87171", fontSize: 12, display: "flex", alignItems: "center", gap: 6, marginTop: -6 }}
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                className={`login-button ${success ? "success" : ""}`}
                type="submit"
                style={{
                  height: 54,
                  borderRadius: 14,
                  border: 0,
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  color: "#ffffff",
                  fontSize: 14.5,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 8px 20px rgba(34, 197, 94, 0.35)",
                }}
                disabled={!canSubmit || loading || success}
                whileHover={canSubmit && !loading ? { y: -2, scale: 1.01 } : {}}
                whileTap={canSubmit && !loading ? { scale: 0.98 } : {}}
              >
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.span key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="button-content">
                      <Check size={19} />
                      Connected to LLVM Engine
                    </motion.span>
                  ) : loading ? (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="button-content">
                      <Loader2 size={19} className="spinner" />
                      Spawning Compiler Core...
                    </motion.span>
                  ) : (
                    <motion.span key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="button-content">
                      Launch Compiler Workspace
                      <ArrowRight size={19} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            <div className="divider" style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0 16px" }}>
              <span style={{ flex: 1, height: 1, background: "rgba(255, 255, 255, 0.1)" }} />
              <p style={{ color: "#64748b", fontSize: 11, margin: 0 }}>or</p>
              <span style={{ flex: 1, height: 1, background: "rgba(255, 255, 255, 0.1)" }} />
            </div>

            <button
              type="button"
              className="create-account"
              style={{ width: "100%", border: 0, background: "transparent", color: "#94a3b8", fontSize: 13, cursor: "pointer" }}
              onClick={() => alert("Redirecting to account creation...")}
            >
              Don't have a developer seat? <strong style={{ color: "#22c55e" }}>Create workspace</strong>
            </button>
          </div>

          <div className="security-note" style={{ color: "#64748b", fontSize: 10.5, marginTop: 24, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Lock size={13} />
            <span>End-to-End Encrypted Cloud Compiler Sandbox</span>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
