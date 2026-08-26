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
  ShieldCheck,
  Terminal,
  ArrowRight,
  Check,
  AlertCircle,
  Loader2,
  KeyRound,
  Fingerprint,
  Cpu
} from "lucide-react";
import "../styles/Page3_ObsidianVault.css";

function ObsidianCharacter({
  passwordFocused,
  passwordVisible,
  error,
  success,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 20 });

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
      className="character-wrapper"
      animate={
        success
          ? { y: [-4, -22, -4], rotate: [-2, 2, -2] }
          : error
          ? { x: [-4, 4, -4, 4, 0], rotate: [-2, 2, -2, 2, 0] }
          : { y: [0, -5, 0] }
      }
      transition={
        success
          ? { duration: 0.7, ease: "easeInOut" }
          : error
          ? { duration: 0.45 }
          : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <motion.div
        className="character-shadow"
        animate={success ? { scale: [1, 0.7, 1] } : { scale: [1, 0.92, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="obsidian-char"
        animate={{ scale: success ? 1.06 : error ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        <div className="character-ear ear-left" style={{ background: "#1c1917", borderColor: "#f59e0b" }} />
        <div className="character-ear ear-right" style={{ background: "#1c1917", borderColor: "#f59e0b" }} />

        <div className="obsidian-face">
          <motion.div
            className="character-eyes"
            animate={{ opacity: state === "cover" ? 0 : 1 }}
            transition={{ duration: 0.12 }}
          >
            <div className="eye" style={{ background: "#0c0a09", borderColor: "#f59e0b" }}>
              <motion.div className="obsidian-pupil" style={{ x: eyeX, y: eyeY }} />
            </div>
            <div className="eye" style={{ background: "#0c0a09", borderColor: "#f59e0b" }}>
              <motion.div className="obsidian-pupil" style={{ x: eyeX, y: eyeY }} />
            </div>
          </motion.div>

          <motion.div
            className="closed-eyes"
            animate={{
              opacity: state === "cover" ? 1 : 0,
              scaleY: state === "cover" ? 1 : 0.5,
            }}
            transition={{ duration: 0.15 }}
          >
            <span style={{ background: "#f59e0b", boxShadow: "0 0 8px #f59e0b" }} />
            <span style={{ background: "#f59e0b", boxShadow: "0 0 8px #f59e0b" }} />
          </motion.div>

          <motion.div
            className="character-mouth"
            style={{ borderColor: "#f59e0b", background: "#09090b" }}
            animate={
              success
                ? { width: 32, height: 17, borderRadius: "0 0 24px 24px" }
                : error
                ? { width: 22, height: 10, borderRadius: "20px 20px 0 0" }
                : { width: 20, height: 10, borderRadius: "0 0 20px 20px" }
            }
          />

          <motion.div
            className="blush blush-left"
            style={{ background: "rgba(245, 158, 11, 0.35)" }}
            animate={{ opacity: state === "peek" || state === "success" ? 1 : 0.3 }}
          />
          <motion.div
            className="blush blush-right"
            style={{ background: "rgba(245, 158, 11, 0.35)" }}
            animate={{ opacity: state === "peek" || state === "success" ? 1 : 0.3 }}
          />
        </div>

        <AnimatePresence>
          {state === "cover" && (
            <>
              <motion.div
                className="obsidian-hand hand-left"
                initial={{ x: -35, y: 40, rotate: 30, opacity: 0 }}
                animate={{ x: 0, y: 0, rotate: -10, opacity: 1 }}
                exit={{ x: -35, y: 40, rotate: 30, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              />
              <motion.div
                className="obsidian-hand hand-right"
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

export default function Page3_ObsidianVault() {
  const [handle, setHandle] = useState("");
  const [key, setKey] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const canSubmit = handle.trim().length > 0 && key.trim().length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit || loading) return;

    setError("");
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (key.length >= 6) {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2400);
    } else {
      setLoading(false);
      setError("Security token rejected: minimum 6 hex bytes required.");
    }
  };

  return (
    <main className="obsidian-page">
      <motion.div
        className="obsidian-container"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Character Panel */}
        <section className="obsidian-char-panel">
          <div className="brand" style={{ color: "#fff" }}>
            <div className="brand-mark" style={{ background: "linear-gradient(135deg, #d97706, #ef4444)" }}>
              <ShieldCheck size={20} />
            </div>
            <span>VaultGuard</span>
          </div>

          <div className="character-content">
            <motion.div
              className="character-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span style={{ color: "#f59e0b" }}>SECURE VAULT ACCESS</span>
              <h1 style={{ color: "#fff" }}>
                Zero Trust
                <br />
                <strong style={{ color: "#f59e0b" }}>Daemon Auth.</strong>
              </h1>
            </motion.div>

            <ObsidianCharacter
              passwordFocused={passwordFocused}
              passwordVisible={passwordVisible}
              error={Boolean(error)}
              success={success}
            />

            <motion.p
              className="character-message"
              style={{ color: "#a8a29e" }}
              animate={{ opacity: 1 }}
            >
              {success
                ? "Root Execution Tunnel Opened! 🛡️"
                : passwordFocused
                ? passwordVisible
                  ? "Passkey visible on terminal 👀"
                  : "Shielding enclave memory 🙈"
                : "Hardened Golem Guard active."}
            </motion.p>
          </div>

          <div className="panel-footer" style={{ color: "#78716c" }}>
            <span>Hardware Enclave</span>
            <span className="footer-dot" style={{ background: "#f59e0b" }} />
            <span>FIPS-140-3</span>
          </div>
        </section>

        {/* Form Panel */}
        <section className="obsidian-form-panel">
          <div className="form-wrapper">
            <motion.div
              className="form-heading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <p className="eyebrow" style={{ color: "#f59e0b" }}>HARDENED TERMINAL</p>
              <h2 style={{ color: "#fff" }}>Enter Vault</h2>
              <p style={{ color: "#a8a29e" }}>
                Authenticate with cryptographic node credentials.
              </p>
            </motion.div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="obsidian-handle" style={{ color: "#e7e5e4" }}>Cluster Node Handle</label>
                <div className="input-wrapper" style={{ background: "rgba(12, 10, 9, 0.7)", borderColor: "rgba(245, 158, 11, 0.25)" }}>
                  <Fingerprint className="input-icon" size={19} color="#f59e0b" />
                  <input
                    id="obsidian-handle"
                    type="text"
                    placeholder="node_arch_01"
                    style={{ color: "#f5f5f4", fontFamily: "Fira Code" }}
                    value={handle}
                    onChange={(e) => {
                      setHandle(e.target.value);
                      setError("");
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <div className="password-label">
                  <label htmlFor="obsidian-key" style={{ color: "#e7e5e4" }}>RSA Passkey / Secret</label>
                  <button
                    type="button"
                    className="forgot-button"
                    style={{ color: "#f59e0b" }}
                    onClick={() => alert("RSA recovery requested.")}
                  >
                    Request Token?
                  </button>
                </div>

                <div className={`input-wrapper ${passwordFocused ? "focused" : ""}`} style={{ background: "rgba(12, 10, 9, 0.7)", borderColor: "rgba(245, 158, 11, 0.25)" }}>
                  <KeyRound className="input-icon" size={19} color="#f59e0b" />
                  <input
                    id="obsidian-key"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="••••••••••••"
                    style={{ color: "#f5f5f4", fontFamily: "Fira Code" }}
                    value={key}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    onChange={(e) => {
                      setKey(e.target.value);
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

              <motion.button
                className={`obsidian-login-btn ${success ? "success" : ""}`}
                type="submit"
                disabled={!canSubmit || loading || success}
                whileHover={canSubmit && !loading ? { y: -2 } : {}}
                whileTap={canSubmit && !loading ? { scale: 0.98 } : {}}
              >
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="button-content">
                      <Check size={19} />
                      Enclave Authenticated
                    </motion.span>
                  ) : loading ? (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="button-content">
                      <Loader2 size={19} className="spinner" />
                      Verifying Signature...
                    </motion.span>
                  ) : (
                    <motion.span key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="button-content">
                      Enter Security Vault
                      <ArrowRight size={19} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            <div className="divider">
              <span style={{ background: "rgba(255, 255, 255, 0.1)" }} />
              <p style={{ color: "#78716c" }}>or</p>
              <span style={{ background: "rgba(255, 255, 255, 0.1)" }} />
            </div>

            <button
              type="button"
              className="create-account"
              style={{ color: "#a8a29e" }}
              onClick={() => alert("Opening RSA token issuance...")}
            >
              Need root authorization? <strong style={{ color: "#f59e0b" }}>Generate Key</strong>
            </button>
          </div>

          <div className="security-note" style={{ color: "#78716c" }}>
            <Terminal size={14} />
            <span>Isolated Hardware Virtualization</span>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
