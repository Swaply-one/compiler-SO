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
  Sparkles,
} from "lucide-react";
import FluffyPandaMascot from "../components/mascots/FluffyPandaMascot";
import "../styles/LoginPage.css";

export default function Page1_BaoPanda() {
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
      setError("Password must be at least 6 characters.");
    }
  };

  return (
    <main
      className="login-page"
      style={{
        background: `
          radial-gradient(circle at 15% 15%, rgba(34, 197, 94, 0.08), transparent 32%),
          radial-gradient(circle at 85% 80%, rgba(16, 185, 129, 0.06), transparent 30%),
          #f8faf9
        `,
      }}
    >
      <div className="ambient ambient-one" style={{ borderColor: "rgba(34, 197, 94, 0.12)" }} />
      <div className="ambient ambient-two" style={{ borderColor: "rgba(16, 185, 129, 0.1)" }} />

      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Character Panel */}
        <section
          className="character-panel"
          style={{
            background: "linear-gradient(150deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
          }}
        >
          <div className="brand">
            <div
              className="brand-mark"
              style={{
                background: "linear-gradient(135deg, #1e293b, #0f172a)",
                boxShadow: "0 5px 14px rgba(0, 0, 0, 0.25)",
                color: "#4ade80",
                fontWeight: 900,
              }}
            >
              🎋
            </div>
            <span>SwaplyPanda</span>
          </div>

          <div className="character-content">
            <motion.div
              className="character-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span>BAO THE BAMBOO PANDA</span>
              <h1>
                Zen compiling
                <br />
                <strong style={{ color: "#16a34a" }}>with Bao.</strong>
              </h1>
            </motion.div>

            <FluffyPandaMascot
              passwordFocused={passwordFocused}
              passwordVisible={passwordVisible}
              error={Boolean(error)}
              success={success}
            />

            <motion.p className="character-message" animate={{ opacity: 1 }}>
              {success
                ? "Zen Compiler Ready! 🎋✨"
                : passwordFocused
                ? passwordVisible
                  ? "Bao can see your key 👀"
                  : "Shhh... Bao won't look 🙈"
                : "Bao is chewing bamboo by your compiler."}
            </motion.p>
          </div>

          <div className="panel-footer">
            <span>Fast LLVM 18</span>
            <span className="footer-dot" style={{ background: "#16a34a" }} />
            <span>SwaplyPanda</span>
          </div>
        </section>

        {/* Form Panel */}
        <section className="form-panel">
          <div className="form-wrapper">
            <div className="mobile-brand">
              <div className="brand-mark" style={{ background: "#16a34a" }}>
                🎋
              </div>
              <span>SwaplyPanda</span>
            </div>

            <motion.div
              className="form-heading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <p className="eyebrow" style={{ color: "#16a34a" }}>
                DEVELOPER ACCOUNT
              </p>
              <h2>Sign in</h2>
              <p>Enter your details to launch your high-speed compiler.</p>
            </motion.div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="field">
                <label htmlFor="panda-email">Email address</label>
                <div className="input-wrapper" style={{ borderColor: "#bbf7d0" }}>
                  <Mail className="input-icon" size={19} strokeWidth={1.8} />
                  <input
                    id="panda-email"
                    type="email"
                    autoComplete="email"
                    placeholder="developer@swaply.io"
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
                  <label htmlFor="panda-password">Password</label>
                  <button
                    type="button"
                    className="forgot-button"
                    style={{ color: "#16a34a" }}
                    onClick={() => alert("Password reset link dispatched.")}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className={`input-wrapper ${passwordFocused ? "focused" : ""}`}>
                  <LockKeyhole className="input-icon" size={19} strokeWidth={1.8} />
                  <input
                    id="panda-password"
                    type={passwordVisible ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
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
                  background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                  boxShadow: "0 8px 20px rgba(22, 163, 74, 0.28)",
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
                      Welcome back
                    </motion.span>
                  ) : loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="button-content"
                    >
                      <Loader2 size={19} className="spinner" />
                      Signing in...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="button-content"
                    >
                      Sign in with Bao
                      <ArrowRight size={19} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            <div className="divider">
              <span />
              <p>or</p>
              <span />
            </div>

            <button
              type="button"
              className="create-account"
              onClick={() => alert("Redirecting to account creation...")}
            >
              Don't have an account? <strong style={{ color: "#16a34a" }}>Create one</strong>
            </button>
          </div>

          <div className="security-note">
            <LockKeyhole size={14} />
            <span>Encrypted cloud compiler pipeline.</span>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
