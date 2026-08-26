import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
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
  Sparkles,
  Terminal
} from "lucide-react";
import "../styles/Page1_CyberCompiler.css";

/* -------------------------------------------------------------------------- */
/*                               Cyber Character                              */
/* -------------------------------------------------------------------------- */

function CyberCharacter({
  passwordFocused,
  passwordVisible,
  error,
  success,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 180,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 180,
    damping: 20,
  });

  const eyeX = useTransform(smoothX, [-1, 1], [-7, 7]);
  const eyeY = useTransform(smoothY, [-1, 1], [-4, 4]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const state = useMemo(() => {
    if (success) return "success";
    if (error) return "error";
    if (passwordFocused && !passwordVisible) return "cover";
    if (passwordFocused && passwordVisible) return "peek";
    return "normal";
  }, [passwordFocused, passwordVisible, error, success]);

  return (
    <motion.div
      className="cyber-char-wrapper"
      animate={
        success
          ? {
              y: [-4, -22, -4],
              rotate: [-2, 2, -2],
            }
          : error
          ? {
              x: [-4, 4, -4, 4, 0],
              rotate: [-2, 2, -2, 2, 0],
            }
          : {
              y: [0, -5, 0],
            }
      }
      transition={
        success
          ? { duration: 0.7, ease: "easeInOut" }
          : error
          ? { duration: 0.45 }
          : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
      }
    >
      {/* Shadow */}
      <motion.div
        className="cyber-char-shadow"
        animate={
          success ? { scale: [1, 0.7, 1] } : { scale: [1, 0.92, 1] }
        }
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyber Body */}
      <motion.div
        className="cyber-char"
        animate={{ scale: success ? 1.06 : error ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        <div className="cyber-ear cyber-ear-left" />
        <div className="cyber-ear cyber-ear-right" />

        {/* Face */}
        <div className="cyber-face">
          {/* Eyes */}
          <motion.div
            className="cyber-eyes"
            animate={{ opacity: state === "cover" ? 0 : 1 }}
            transition={{ duration: 0.12 }}
          >
            <div className="cyber-eye">
              <motion.div className="cyber-pupil" style={{ x: eyeX, y: eyeY }} />
            </div>
            <div className="cyber-eye">
              <motion.div className="cyber-pupil" style={{ x: eyeX, y: eyeY }} />
            </div>
          </motion.div>

          {/* Closed Eyes */}
          <motion.div
            className="cyber-closed-eyes"
            animate={{
              opacity: state === "cover" ? 1 : 0,
              scaleY: state === "cover" ? 1 : 0.5,
            }}
            transition={{ duration: 0.15 }}
          >
            <span />
            <span />
          </motion.div>

          {/* Mouth */}
          <motion.div
            className="cyber-mouth"
            animate={
              success
                ? { width: 32, height: 17, borderRadius: "0 0 24px 24px" }
                : error
                ? { width: 22, height: 10, borderRadius: "20px 20px 0 0" }
                : { width: 20, height: 10, borderRadius: "0 0 20px 20px" }
            }
          />

          {/* Blush */}
          <motion.div
            className="cyber-blush cyber-blush-left"
            animate={{ opacity: state === "peek" || state === "success" ? 1 : 0.3 }}
          />
          <motion.div
            className="cyber-blush cyber-blush-right"
            animate={{ opacity: state === "peek" || state === "success" ? 1 : 0.3 }}
          />
        </div>

        {/* Robotic Hands */}
        <AnimatePresence>
          {state === "cover" && (
            <>
              <motion.div
                className="cyber-hand cyber-hand-left"
                initial={{ x: -35, y: 40, rotate: 30, opacity: 0 }}
                animate={{ x: 0, y: 0, rotate: -10, opacity: 1 }}
                exit={{ x: -35, y: 40, rotate: 30, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              />
              <motion.div
                className="cyber-hand cyber-hand-right"
                initial={{ x: 35, y: 40, rotate: -30, opacity: 0 }}
                animate={{ x: 0, y: 0, rotate: 10, opacity: 1 }}
                exit={{ x: 35, y: 40, rotate: -30, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Page 1 Component                             */
/* -------------------------------------------------------------------------- */

export default function Page1_CyberCompiler() {
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

    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (password.length >= 6) {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2400);
    } else {
      setLoading(false);
      setError("Passcode must be at least 6 characters.");
    }
  };

  return (
    <main className="cyber-page">
      <div className="cyber-ambient cyber-ambient-1" />
      <div className="cyber-ambient cyber-ambient-2" />

      <motion.div
        className="cyber-container"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Left Character Panel */}
        <section className="cyber-char-panel">
          <div className="cyber-brand">
            <div className="cyber-brand-mark">
              <Cpu size={20} />
            </div>
            <span>Swaply IDE</span>
          </div>

          <div className="cyber-char-content">
            <motion.div
              className="cyber-char-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span>Developer Auth</span>
              <h1>
                Compile at
                <br />
                <strong>light speed.</strong>
              </h1>
            </motion.div>

            <CyberCharacter
              passwordFocused={passwordFocused}
              passwordVisible={passwordVisible}
              error={Boolean(error)}
              success={success}
            />

            <motion.p
              className="character-message"
              style={{ color: "#94a3b8" }}
              animate={{ opacity: 1 }}
            >
              {success
                ? "LLVM Cluster Authenticated! ✨"
                : passwordFocused
                ? passwordVisible
                  ? "Careful, master key exposed 👀"
                  : "Shielding compiler secret key 🙈"
                : "AI Code Guardian standing by."}
            </motion.p>
          </div>

          <div className="panel-footer" style={{ color: "#64748b" }}>
            <span>LLVM 18.1.4 Ready</span>
            <span className="footer-dot" style={{ background: "#6366f1" }} />
            <span>Swaply Core</span>
          </div>
        </section>

        {/* Right Form Panel */}
        <section className="cyber-form-panel">
          <div className="form-wrapper">
            <motion.div
              className="form-heading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <p className="cyber-eyebrow">
                <Sparkles size={13} />
                COMPILER CLOUD AUTH
              </p>
              <h2 style={{ color: "#fff", fontFamily: "Space Grotesk" }}>Sign in</h2>
              <p style={{ color: "#94a3b8" }}>
                Connect your workspace to distributed build runners.
              </p>
            </motion.div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="field">
                <label htmlFor="cyber-email" style={{ color: "#cbd5e1" }}>Developer Email</label>
                <div className="cyber-input-wrapper">
                  <Mail className="input-icon" size={19} color="#818cf8" />
                  <input
                    id="cyber-email"
                    type="email"
                    placeholder="developer@swaply.io"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field">
                <div className="password-label">
                  <label htmlFor="cyber-pass" style={{ color: "#cbd5e1" }}>Master Passphrase</label>
                  <button
                    type="button"
                    className="forgot-button"
                    style={{ color: "#818cf8" }}
                    onClick={() => alert("Recovery email dispatched.")}
                  >
                    Forgot key?
                  </button>
                </div>

                <div className={`cyber-input-wrapper ${passwordFocused ? "focused" : ""}`}>
                  <LockKeyhole className="input-icon" size={19} color="#818cf8" />
                  <input
                    id="cyber-pass"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter master key"
                    value={password}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                className={`cyber-login-btn ${success ? "success" : ""}`}
                type="submit"
                disabled={!canSubmit || loading || success}
                whileHover={canSubmit && !loading ? { y: -2 } : {}}
                whileTap={canSubmit && !loading ? { scale: 0.98 } : {}}
              >
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="button-content"
                    >
                      <Check size={19} />
                      Connected to Engine
                    </motion.span>
                  ) : loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="button-content"
                    >
                      <Loader2 size={19} className="spinner" />
                      Allocating Runner...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="button-content"
                    >
                      Launch Compiler Workspace
                      <ArrowRight size={19} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            <div className="divider">
              <span style={{ background: "rgba(255, 255, 255, 0.1)" }} />
              <p style={{ color: "#64748b" }}>or</p>
              <span style={{ background: "rgba(255, 255, 255, 0.1)" }} />
            </div>

            <button
              type="button"
              className="create-account"
              style={{ color: "#94a3b8" }}
              onClick={() => alert("Opening account registration...")}
            >
              Need a compiler seat? <strong style={{ color: "#818cf8" }}>Create workspace</strong>
            </button>
          </div>

          <div className="security-note" style={{ color: "#64748b" }}>
            <LockKeyhole size={14} />
            <span>Zero-Knowledge AES-256 Cloud Encryption</span>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
