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
  Coffee,
} from "lucide-react";
import CozyCoffeeMascot from "../components/mascots/CozyCoffeeMascot";
import "../styles/LoginPage.css";

export default function Page2_CozyCoffee() {
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
          radial-gradient(circle at 15% 15%, rgba(217, 119, 6, 0.08), transparent 32%),
          radial-gradient(circle at 85% 80%, rgba(245, 158, 11, 0.06), transparent 30%),
          #faf7f2
        `,
      }}
    >
      <div className="ambient ambient-one" style={{ borderColor: "rgba(217, 119, 6, 0.12)" }} />
      <div className="ambient ambient-two" style={{ borderColor: "rgba(245, 158, 11, 0.1)" }} />

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
                background: "linear-gradient(135deg, #d97706, #b45309)",
                boxShadow: "0 5px 14px rgba(217, 119, 6, 0.3)",
                color: "#fff",
              }}
            >
              <Coffee size={19} />
            </div>
            <span>SwaplyMocha</span>
          </div>

          <div className="character-content">
            <motion.div
              className="character-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span>COZY COFFEE MUG</span>
              <h1>
                Brew & compile
                <br />
                <strong style={{ color: "#d97706" }}>with Mocha Mug.</strong>
              </h1>
            </motion.div>

            <CozyCoffeeMascot
              passwordFocused={passwordFocused}
              passwordVisible={passwordVisible}
              error={Boolean(error)}
              success={success}
            />

            <motion.p className="character-message" animate={{ opacity: 1 }}>
              {success
                ? "Fresh batch brewed! Welcome back ☕✨"
                : passwordFocused
                ? passwordVisible
                  ? "Mocha sees your secret key 👀"
                  : "Mocha has eyes covered with marshmallows 🙈"
                : "Mocha is brewing your compiler pipeline."}
            </motion.p>
          </div>

          <div className="panel-footer">
            <span>Arabica JIT Core</span>
            <span className="footer-dot" style={{ background: "#d97706" }} />
            <span>SwaplyMocha</span>
          </div>
        </section>

        {/* Form Panel */}
        <section className="form-panel">
          <div className="form-wrapper">
            <div className="mobile-brand">
              <div className="brand-mark" style={{ background: "#d97706" }}>
                <Coffee size={19} />
              </div>
              <span>SwaplyMocha</span>
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
              <p>Enter your details to launch your high-speed compiler.</p>
            </motion.div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="field">
                <label htmlFor="mocha-email">Email address</label>
                <div className="input-wrapper" style={{ borderColor: "#fde68a" }}>
                  <Mail className="input-icon" size={19} strokeWidth={1.8} />
                  <input
                    id="mocha-email"
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
                  <label htmlFor="mocha-password">Password</label>
                  <button
                    type="button"
                    className="forgot-button"
                    style={{ color: "#d97706" }}
                    onClick={() => alert("Password reset link dispatched.")}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className={`input-wrapper ${passwordFocused ? "focused" : ""}`}>
                  <LockKeyhole className="input-icon" size={19} strokeWidth={1.8} />
                  <input
                    id="mocha-password"
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
                  background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                  boxShadow: "0 8px 20px rgba(217, 119, 6, 0.28)",
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
                      Brewing Sandbox...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="button-content"
                    >
                      Sign in with Mocha
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
