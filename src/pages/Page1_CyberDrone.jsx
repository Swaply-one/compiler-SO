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
} from "lucide-react";
import CyberDroneMascot from "../components/mascots/CyberDroneMascot";
import "../styles/LoginPage.css";

export default function Page1_CyberDrone() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      setError("Token key must be at least 6 characters.");
    }
  };

  return (
    <main
      className="login-page"
      style={{
        background: `
          radial-gradient(circle at 15% 15%, rgba(34, 197, 94, 0.1), transparent 32%),
          radial-gradient(circle at 85% 80%, rgba(14, 165, 233, 0.08), transparent 30%),
          #0b0f17
        `,
        color: "#f8fafc",
      }}
    >
      <div className="ambient ambient-one" style={{ borderColor: "rgba(34, 197, 94, 0.15)" }} />
      <div className="ambient ambient-two" style={{ borderColor: "rgba(14, 165, 233, 0.15)" }} />

      <motion.div
        className="login-container"
        style={{
          background: "rgba(15, 23, 38, 0.95)",
          border: "1px solid rgba(34, 197, 94, 0.25)",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px -10px rgba(34, 197, 94, 0.2)",
        }}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Character Panel */}
        <section
          className="character-panel"
          style={{
            background: "linear-gradient(150deg, #111827 0%, #0b0f19 100%)",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="brand" style={{ color: "#fff" }}>
            <div
              className="brand-mark"
              style={{
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)",
                color: "#fff",
              }}
            >
              <Cpu size={19} />
            </div>
            <span>SwaplyAero</span>
          </div>

          <div className="character-content">
            <motion.div
              className="character-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span style={{ color: "#4ade80" }}>AUTONOMOUS AI COMPILER</span>
              <h1 style={{ color: "#fff" }}>
                Compile native
                <br />
                <strong style={{ color: "#22c55e" }}>with Aero Drone.</strong>
              </h1>
            </motion.div>

            <CyberDroneMascot
              passwordFocused={passwordFocused}
              passwordVisible={passwordVisible}
              error={Boolean(error)}
              success={success}
            />

            <motion.p className="character-message" style={{ color: passwordFocused ? "#4ade80" : "#94a3b8" }} animate={{ opacity: 1 }}>
              {success
                ? "Thrusters engaged! Welcome back 🚀"
                : passwordFocused
                ? passwordVisible
                  ? "Optical sensor detecting key 👀"
                  : "Sensor shielding active 🙈"
                : "Aero is stabilizing your compiler environment."}
            </motion.p>
          </div>

          <div className="panel-footer" style={{ color: "#64748b" }}>
            <span>Zero-G Sandbox</span>
            <span className="footer-dot" style={{ background: "#22c55e" }} />
            <span>SwaplyAero</span>
          </div>
        </section>

        {/* Form Panel */}
        <section className="form-panel" style={{ background: "rgba(11, 15, 23, 0.98)" }}>
          <div className="form-wrapper">
            <div className="mobile-brand" style={{ color: "#fff" }}>
              <div className="brand-mark" style={{ background: "#22c55e" }}>
                <Cpu size={19} />
              </div>
              <span>SwaplyAero</span>
            </div>

            <motion.div
              className="form-heading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <p className="eyebrow" style={{ color: "#22c55e" }}>
                DEVELOPER ACCESS
              </p>
              <h2 style={{ color: "#fff" }}>Sign in</h2>
              <p style={{ color: "#94a3b8" }}>Enter your credentials to launch cloud instance.</p>
            </motion.div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="field">
                <label htmlFor="drone-email" style={{ color: "#cbd5e1" }}>Email address</label>
                <div
                  className="input-wrapper"
                  style={{
                    background: "rgba(18, 26, 38, 0.7)",
                    borderColor: "rgba(255, 255, 255, 0.12)",
                  }}
                >
                  <Mail className="input-icon" size={19} color="#22c55e" strokeWidth={1.8} />
                  <input
                    id="drone-email"
                    type="email"
                    autoComplete="email"
                    placeholder="developer@swaply.io"
                    style={{ color: "#fff" }}
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field">
                <div className="password-label">
                  <label htmlFor="drone-password" style={{ color: "#cbd5e1" }}>Password / Token</label>
                  <button
                    type="button"
                    className="forgot-button"
                    style={{ color: "#22c55e" }}
                    onClick={() => alert("Password reset token dispatched.")}
                  >
                    Forgot key?
                  </button>
                </div>

                <div
                  className={`input-wrapper ${passwordFocused ? "focused" : ""}`}
                  style={{
                    background: "rgba(18, 26, 38, 0.7)",
                    borderColor: passwordFocused ? "#22c55e" : "rgba(255, 255, 255, 0.12)",
                    boxShadow: passwordFocused ? "0 0 0 4px rgba(34, 197, 94, 0.15)" : "none",
                  }}
                >
                  <LockKeyhole className="input-icon" size={19} color="#22c55e" strokeWidth={1.8} />
                  <input
                    id="drone-password"
                    type={passwordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your security token"
                    style={{ color: "#fff" }}
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
                    style={{ color: "#94a3b8" }}
                    aria-label={passwordVisible ? "Hide password" : "Show password"}
                    onClick={() => setPasswordVisible((val) => !val)}
                  >
                    {passwordVisible ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Error Alert */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    className="error-message"
                    style={{ color: "#f87171" }}
                    initial={{ opacity: 0, height: 0, y: -5 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                className={`login-button ${success ? "success" : ""}`}
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  boxShadow: "0 8px 20px rgba(34, 197, 94, 0.35)",
                  color: "#fff",
                }}
                disabled={!canSubmit || loading || success}
                whileHover={canSubmit && !loading ? { y: -2, scale: 1.01 } : {}}
                whileTap={canSubmit && !loading ? { scale: 0.98 } : {}}
              >
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="button-content"
                    >
                      <Check size={19} />
                      Connected to LLVM Core
                    </motion.span>
                  ) : loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="button-content"
                    >
                      <Loader2 size={19} className="spinner" />
                      Authenticating Node...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="button-content"
                    >
                      Launch Aero Sandbox
                      <ArrowRight size={19} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            <div className="divider" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <span style={{ background: "rgba(255, 255, 255, 0.1)" }} />
              <p style={{ color: "#64748b" }}>or</p>
              <span style={{ background: "rgba(255, 255, 255, 0.1)" }} />
            </div>

            <button
              type="button"
              className="create-account"
              style={{ color: "#94a3b8" }}
              onClick={() => alert("Redirecting to account creation...")}
            >
              Don't have a developer key? <strong style={{ color: "#22c55e" }}>Deploy Node</strong>
            </button>
          </div>

          <div className="security-note" style={{ color: "#64748b" }}>
            <LockKeyhole size={14} />
            <span>End-to-End Encrypted Cloud Compiler Sandbox.</span>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
