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
  RotateCcw,
  LayoutGrid
} from "lucide-react";
import SwaplyBotMascot from "../components/mascots/SwaplyBotMascot";
import CompilerWorkspace from "../components/compiler/CompilerWorkspace";
import confetti from "canvas-confetti";
import "../styles/LoginPage.css";

export default function Page_RobotAssembledLogin({ onReplayIntro, onSelectOtherPage }) {
  const [email, setEmail] = useState("developer@swaply.one");
  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [showPagesDrawer, setShowPagesDrawer] = useState(false);

  // Correct credentials for authentication
  const CORRECT_PASSWORD = "swaply123";

  const canSubmit = email.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit || loading) return;

    setError("");
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check wrong password
    if (password.length < 6) {
      setLoading(false);
      setError("WRONG PASSWORD: Passcode must be at least 6 characters!");
      return;
    }

    if (password !== CORRECT_PASSWORD && password !== "123456" && password !== "supersecret123") {
      setLoading(false);
      setError("WRONG PASSWORD! Access Denied. (Hint: Correct password is 'swaply123')");
      return;
    }

    // Success Authentication
    setLoading(false);
    setSuccess(true);
    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#228b22", "#15803d", "#86efac", "#fbbf24"],
      });
    } catch {}

    setTimeout(() => {
      setAuthenticated(true);
    }, 1200);
  };

  if (authenticated) {
    return (
      <CompilerWorkspace
        userEmail={email}
        onSignOut={() => {
          setAuthenticated(false);
          setSuccess(false);
          setPassword("");
        }}
      />
    );
  }

  return (
    <main
      className="login-page"
      style={{
        background: `
          radial-gradient(circle at 15% 15%, rgba(34, 139, 34, 0.08), transparent 32%),
          radial-gradient(circle at 85% 80%, rgba(34, 139, 34, 0.06), transparent 30%),
          #f7f7f2
        `,
      }}
    >
      <div className="ambient ambient-one" style={{ borderColor: "rgba(34, 139, 34, 0.08)" }} />
      <div className="ambient ambient-two" style={{ borderColor: "rgba(34, 139, 34, 0.08)" }} />

      {/* Top Floating Controls Bar */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 32,
          right: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 50,
        }}
      >
        <div className="brand" style={{ fontSize: 16 }}>
          <div className="brand-mark" style={{ width: 32, height: 32 }}>
            <Cpu size={18} />
          </div>
          <span>Swaply One</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 16px",
                borderRadius: 12,
                background: "#ffffff",
                border: "1px solid #dfe3d8",
                color: "#228b22",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(34, 139, 34, 0.1)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <RotateCcw size={15} />
              Replay Robot Setup 🤖
            </button>
          )}

          {onSelectOtherPage && (
            <button
              onClick={() => setShowPagesDrawer((prev) => !prev)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "8px 14px",
                borderRadius: 12,
                background: "#ffffff",
                border: "1px solid #dfe3d8",
                color: "#4a5568",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              }}
            >
              <LayoutGrid size={15} />
              Explore All Pages (28+)
            </button>
          )}
        </div>
      </div>

      {/* Main Login Card - Exact Github Theme */}
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Left Side: Character Panel */}
        <section
          className="character-panel"
          style={{
            background: "linear-gradient(150deg, #f3f6ec 0%, #ebf1e2 50%, #e3ecd8 100%)",
          }}
        >
          <div className="brand">
            <div className="brand-mark">
              <Cpu size={19} />
            </div>
            <span>SwaplyBot</span>
          </div>

          <div className="character-content">
            <motion.div
              className="character-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span>AI COMPILER ASSISTANT</span>
              <h1>
                Compile with
                <br />
                <strong style={{ color: "#228b22" }}>Byte the bot.</strong>
              </h1>
            </motion.div>

            {/* Interactive Live Mascot */}
            <div style={{ marginTop: 10, marginBottom: 10 }}>
              <SwaplyBotMascot
                passwordFocused={passwordFocused}
                passwordVisible={passwordVisible}
                emailFocused={emailFocused}
                emailLength={email.length}
                error={Boolean(error)}
                success={success}
              />
            </div>

            <motion.p className="character-message" animate={{ opacity: 1 }}>
              {success
                ? "Access granted! Launching compiler workspace 🚀✨"
                : error
                ? "Wrong password! Bot is shaking head ❌🙅‍♂️"
                : passwordFocused
                ? passwordVisible
                  ? "Byte is peeking at your password 👀"
                  : "Byte is covering eyes respectfully 🙈"
                : emailFocused
                ? "Byte is tracking your email cursor 🎯"
                : "Byte is ready to compile your code."}
            </motion.p>
          </div>

          <div className="character-footer">
            <span>● SWAPLY COMPILER v1.0.0</span>
            <p>Interactive compiler environment assembled & verified.</p>
          </div>
        </section>

        {/* Right Side: Form Panel */}
        <section className="form-panel">
          <div className="form-header">
            <span className="form-badge">WELCOME BACK</span>
            <h2>Sign in to continue</h2>
            <p>Enter your developer credentials to access the compiler suite.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <div className="field-group">
              <label htmlFor="email">Email address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={19} />
                <input
                  id="email"
                  type="email"
                  placeholder="developer@swaply.one"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field with Shake on Error */}
            <motion.div
              className="field-group"
              animate={error ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="field-label-row">
                <label htmlFor="password">Password</label>
                <button
                  type="button"
                  className="inline-link"
                  onClick={() => alert("Hint: Correct password is 'swaply123'")}
                >
                  Forgot password?
                </button>
              </div>
              <div
                className="input-wrapper"
                style={error ? { borderColor: "#ef4444", boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.15)" } : {}}
              >
                <LockKeyhole className="input-icon" size={19} color={error ? "#ef4444" : undefined} />
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter 'swaply123'"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                  title={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </motion.div>

            {/* Error Message Box */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="error-banner"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 14px",
                    borderRadius: 12,
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#dc2626",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <AlertCircle size={17} style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="submit-button"
              disabled={!canSubmit || loading}
              style={{
                background: "#228b22",
                boxShadow: canSubmit ? "0 12px 28px rgba(34, 139, 34, 0.22)" : "none",
              }}
              whileHover={canSubmit && !loading ? { scale: 1.01 } : {}}
              whileTap={canSubmit && !loading ? { scale: 0.99 } : {}}
            >
              {loading ? (
                <>
                  <Loader2 className="spinner" size={20} />
                  <span>Verifying credentials...</span>
                </>
              ) : success ? (
                <>
                  <Check size={20} />
                  <span>Access Granted</span>
                </>
              ) : (
                <>
                  <span>Sign in to Compiler</span>
                  <ArrowRight size={19} />
                </>
              )}
            </motion.button>
          </form>

          {/* Quick Demo Helper */}
          <div
            style={{
              marginTop: 24,
              padding: "12px 16px",
              borderRadius: 14,
              background: "#f3f6ec",
              border: "1px solid #dfe3d8",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 13,
              color: "#4a5568",
            }}
          >
            <div>
              <span style={{ fontWeight: 600, color: "#181a18" }}>Passcode: </span>
              <code style={{ background: "#e2e8d5", padding: "2px 6px", borderRadius: 4, color: "#228b22", fontWeight: 700 }}>
                swaply123
              </code>
            </div>
            <button
              onClick={() => {
                setPassword("swaply123");
                setError("");
              }}
              style={{
                background: "#228b22",
                border: "none",
                color: "#ffffff",
                borderRadius: 8,
                padding: "5px 10px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Auto-Fill ⚡
            </button>
          </div>
        </section>
      </motion.div>

      {/* Explore All Pages Drawer */}
      <AnimatePresence>
        {showPagesDrawer && (
          <motion.div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: "55vh",
              background: "#ffffff",
              borderTop: "2px solid #228b22",
              padding: "24px 36px",
              zIndex: 100,
              overflowY: "auto",
              boxShadow: "0 -20px 50px rgba(0,0,0,0.15)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#181a18" }}>
                Switch to Any Other Page in Repository (28+ Pages)
              </h3>
              <button
                onClick={() => setShowPagesDrawer(false)}
                style={{
                  background: "#f3f4f6",
                  border: "none",
                  color: "#374151",
                  padding: "6px 14px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Close ✕
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              {[
                { name: "Page_RetroCRTTerminal", label: "Retro CRT Terminal (IDE)" },
                { name: "Page_CompilerAuth", label: "Compiler Auth Portal" },
                { name: "RockyLoginPage", label: "Rocky Rive Mascot" },
                { name: "ScientistLoginPage", label: "Mad Scientist Rive" },
                { name: "TeddyLoginPage", label: "Teddy Bear Rive" },
                { name: "Page1_ThreeJSBot", label: "3D Three.js Bot" },
                { name: "Page1_CyberBot", label: "CyberBot Clean" },
                { name: "Page1_CyberDrone", label: "Cyber Drone" },
                { name: "Page1_RealisticTiger", label: "Realistic 3D Tiger" },
                { name: "Page1_BaoPanda", label: "Bao Panda" },
                { name: "Page1_MochiCat", label: "Mochi Cat" },
                { name: "Page3_CompilerLab", label: "Compiler Lab" },
              ].map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    setShowPagesDrawer(false);
                    if (onSelectOtherPage) onSelectOtherPage(p.name);
                  }}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    color: "#1e293b",
                    fontSize: 13,
                    fontWeight: 600,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#228b22";
                    e.currentTarget.style.background = "#f0fdf4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
