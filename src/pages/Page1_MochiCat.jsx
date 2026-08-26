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
  Cat,
} from "lucide-react";
import MochiCatMascot from "../components/mascots/MochiCatMascot";
import "../styles/LoginPage.css";

export default function Page1_MochiCat() {
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
          radial-gradient(circle at 15% 15%, rgba(245, 158, 11, 0.08), transparent 32%),
          radial-gradient(circle at 85% 80%, rgba(251, 191, 36, 0.06), transparent 30%),
          #faf8f5
        `,
      }}
    >
      <div className="ambient ambient-one" style={{ borderColor: "rgba(245, 158, 11, 0.12)" }} />
      <div className="ambient ambient-two" style={{ borderColor: "rgba(251, 191, 36, 0.1)" }} />

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
            background: "linear-gradient(150deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)",
          }}
        >
          <div className="brand">
            <div
              className="brand-mark"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                boxShadow: "0 5px 14px rgba(245, 158, 11, 0.3)",
              }}
            >
              <Cat size={19} />
            </div>
            <span>SwaplyMochi</span>
          </div>

          <div className="character-content">
            <motion.div
              className="character-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span>MOCHI THE CODING CAT</span>
              <h1>
                Purr-fect code
                <br />
                <strong style={{ color: "#d97706" }}>with Mochi.</strong>
              </h1>
            </motion.div>

            <MochiCatMascot
              passwordFocused={passwordFocused}
              passwordVisible={passwordVisible}
              error={Boolean(error)}
              success={success}
            />

            <motion.p className="character-message" animate={{ opacity: 1 }}>
              {success
                ? "Compilation Purr-fect! 🐾✨"
                : passwordFocused
                ? passwordVisible
                  ? "Mochi can see your key 👀"
                  : "Shhh... Mochi won't look 🙈"
                : "Mochi is purring by your compiler."}
            </motion.p>
          </div>

          <div className="panel-footer">
            <span>Fast Compiler</span>
            <span className="footer-dot" style={{ background: "#f59e0b" }} />
            <span>SwaplyMochi</span>
          </div>
        </section>

        {/* Form Panel */}
        <section className="form-panel">
          <div className="form-wrapper">
            <div className="mobile-brand">
              <div className="brand-mark" style={{ background: "#f59e0b" }}>
                <Cat size={19} />
              </div>
              <span>SwaplyMochi</span>
            </div>

            <motion.div
              className="form-heading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <p className="eyebrow" style={{ color: "#d97706" }}>
                DEVELOPER ACCESS
              </p>
              <h2>Sign in</h2>
              <p>Enter your credentials to launch your cloud workspace.</p>
            </motion.div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="field">
                <label htmlFor="cat-email">Email address</label>
                <div className="input-wrapper" style={{ borderColor: "#fde68a" }}>
                  <Mail className="input-icon" size={19} strokeWidth={1.8} />
                  <input
                    id="cat-email"
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
                  <label htmlFor="cat-password">Password</label>
                  <button
                    type="button"
                    className="forgot-button"
                    style={{ color: "#d97706" }}
                    onClick={() => alert("Password reset link sent to your email.")}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className={`input-wrapper ${passwordFocused ? "focused" : ""}`}>
                  <LockKeyhole className="input-icon" size={19} strokeWidth={1.8} />
                  <input
                    id="cat-password"
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
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  boxShadow: "0 8px 20px rgba(245, 158, 11, 0.28)",
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
                      Sign in with Mochi
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
              Don't have an account? <strong style={{ color: "#d97706" }}>Create one</strong>
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
