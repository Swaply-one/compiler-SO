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
  Leaf,
} from "lucide-react";
import CozyKoalaMascot from "../components/mascots/CozyKoalaMascot";
import "../styles/LoginPage.css";

export default function Page3_CozyKoala() {
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
          radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.08), transparent 32%),
          radial-gradient(circle at 85% 80%, rgba(100, 116, 139, 0.08), transparent 30%),
          #f8fafc
        `,
      }}
    >
      <div className="ambient ambient-one" style={{ borderColor: "rgba(16, 185, 129, 0.12)" }} />
      <div className="ambient ambient-two" style={{ borderColor: "rgba(100, 116, 139, 0.1)" }} />

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
            background: "linear-gradient(150deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
          }}
        >
          <div className="brand">
            <div
              className="brand-mark"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 5px 14px rgba(16, 185, 129, 0.3)",
                color: "#fff",
              }}
            >
              <Leaf size={19} />
            </div>
            <span>SwaplyOllie</span>
          </div>

          <div className="character-content">
            <motion.div
              className="character-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span>COZY EUCALYPTUS KOALA</span>
              <h1>
                Compile relaxed
                <br />
                <strong style={{ color: "#059669" }}>with Ollie Koala.</strong>
              </h1>
            </motion.div>

            <CozyKoalaMascot
              passwordFocused={passwordFocused}
              passwordVisible={passwordVisible}
              error={Boolean(error)}
              success={success}
            />

            <motion.p className="character-message" animate={{ opacity: 1 }}>
              {success
                ? "Ollie is cheering for you! 🌿✨"
                : passwordFocused
                ? passwordVisible
                  ? "Ollie sees your password 👀"
                  : "Ollie won't peek at your key 🙈"
                : "Ollie is keeping your compiler cozy."}
            </motion.p>
          </div>

          <div className="panel-footer">
            <span>Eucalyptus Engine</span>
            <span className="footer-dot" style={{ background: "#10b981" }} />
            <span>SwaplyOllie</span>
          </div>
        </section>

        {/* Form Panel */}
        <section className="form-panel">
          <div className="form-wrapper">
            <div className="mobile-brand">
              <div className="brand-mark" style={{ background: "#10b981" }}>
                <Leaf size={19} />
              </div>
              <span>SwaplyOllie</span>
            </div>

            <motion.div
              className="form-heading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <p className="eyebrow" style={{ color: "#059669" }}>
                DEVELOPER ACCESS
              </p>
              <h2>Sign in</h2>
              <p>Enter your details to launch your high-speed compiler.</p>
            </motion.div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="field">
                <label htmlFor="koala-email">Email address</label>
                <div className="input-wrapper" style={{ borderColor: "#cbd5e1" }}>
                  <Mail className="input-icon" size={19} strokeWidth={1.8} />
                  <input
                    id="koala-email"
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
                  <label htmlFor="koala-password">Password</label>
                  <button
                    type="button"
                    className="forgot-button"
                    style={{ color: "#059669" }}
                    onClick={() => alert("Password reset link dispatched.")}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className={`input-wrapper ${passwordFocused ? "focused" : ""}`}>
                  <LockKeyhole className="input-icon" size={19} strokeWidth={1.8} />
                  <input
                    id="koala-password"
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
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  boxShadow: "0 8px 20px rgba(16, 185, 129, 0.28)",
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
                      Loading Engine...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="button-content"
                    >
                      Sign in with Ollie
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
              Don't have an account? <strong style={{ color: "#059669" }}>Create one</strong>
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
