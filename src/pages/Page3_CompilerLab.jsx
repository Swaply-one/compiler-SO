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
  Code2,
  Cpu,
  Zap,
  ShieldCheck,
  Terminal
} from "lucide-react";
import SwaplyBotMascot from "../components/mascots/SwaplyBotMascot";

export default function Page3_CompilerLab() {
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
      setError("Master token must contain at least 6 characters.");
    }
  };

  const mascotSubtitle = success
    ? "Compilation complete! Launching IDE 🚀"
    : passwordFocused
    ? passwordVisible
      ? "Password visible on screen 👀"
      : "I don't peek! Your secret is safe 💚"
    : emailFocused
    ? "Looking at your email... 🔍"
    : "Ready to compile your ideas! 😊";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px 32px",
        background: "radial-gradient(circle at 50% 0%, #0d1520 0%, #06090e 100%)",
        color: "#f8fafc",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1240,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "2.5rem",
          alignItems: "center",
        }}
      >
        {/* Left: Compiler Studio Preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.85rem",
              borderRadius: "9999px",
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.25)",
              color: "#86efac",
              fontSize: "0.8rem",
              fontWeight: 700,
              width: "fit-content",
            }}
          >
            <Code2 size={14} color="#22c55e" />
            <span>SWAPLY CLOUD COMPILER</span>
          </div>

          <h1
            style={{
              fontFamily: "Space Grotesk",
              fontSize: "clamp(36px, 4vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#ffffff",
              margin: 0,
            }}
          >
            Code in browser, <br />
            <span style={{ color: "#22c55e" }}>execute natively.</span>
          </h1>

          <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.6, maxWidth: 500, margin: 0 }}>
            Connect to Swaply's distributed LLVM cluster. Run C++, Rust, Go, Python, and TypeScript with zero-setup microsecond execution.
          </p>

          {/* Terminal Box */}
          <div
            style={{
              background: "rgba(15, 23, 36, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.6rem 1rem",
                background: "rgba(0, 0, 0, 0.35)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                fontFamily: "monospace",
                fontSize: "0.75rem",
                color: "#94a3b8",
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
              </div>
              <span>swaply_runtime.rs</span>
              <span style={{ color: "#22c55e" }}>● JIT Active</span>
            </div>

            <pre style={{ padding: "1rem 1.25rem", margin: 0, fontFamily: "monospace", fontSize: "0.825rem", color: "#e2e8f0", lineHeight: 1.65 }}>
              <code>
                <span style={{ color: "#f43f5e" }}>pub fn</span> <span style={{ color: "#38bdf8" }}>compile_and_run</span>() -&gt; <span style={{ color: "#a855f7" }}>Result&lt;()&gt;</span> &#123;<br />
                &nbsp;&nbsp;<span style={{ color: "#64748b" }}>// Instant AST optimization pass</span><br />
                &nbsp;&nbsp;<span style={{ color: "#f43f5e" }}>let</span> binary = swaply::build_wasm(source)?;<br />
                &nbsp;&nbsp;<span style={{ color: "#34d399" }}>println!</span>(<span style={{ color: "#86efac" }}>"🚀 Benchmark: 0.04ms compile speed"</span>);<br />
                &nbsp;&nbsp;<span style={{ color: "#a855f7" }}>Ok</span>(())<br />
                &#125;
              </code>
            </pre>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "#94a3b8", background: "rgba(255, 255, 255, 0.04)", padding: "0.35rem 0.75rem", borderRadius: 8 }}>
              <Cpu size={14} color="#22c55e" />
              <span>0.04ms JIT Speed</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "#94a3b8", background: "rgba(255, 255, 255, 0.04)", padding: "0.35rem 0.75rem", borderRadius: 8 }}>
              <Zap size={14} color="#38bdf8" />
              <span>WASM & Native</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "#94a3b8", background: "rgba(255, 255, 255, 0.04)", padding: "0.35rem 0.75rem", borderRadius: 8 }}>
              <ShieldCheck size={14} color="#22c55e" />
              <span>Sandboxed</span>
            </div>
          </div>
        </div>

        {/* Right: Swaply Mascot Auth Card */}
        <div
          style={{
            background: "rgba(13, 19, 28, 0.95)",
            border: "1px solid rgba(34, 197, 94, 0.25)",
            borderRadius: 28,
            padding: "2rem 2.25rem",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px -10px rgba(34, 197, 94, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Swaply Mascot */}
          <SwaplyBotMascot
            passwordFocused={passwordFocused}
            passwordVisible={passwordVisible}
            emailFocused={emailFocused}
            emailLength={email.length}
            error={Boolean(error)}
            success={success}
          />

          {/* Subtitle */}
          <p style={{ margin: "2px 0 16px", color: passwordFocused ? "#4ade80" : "#94a3b8", fontSize: "0.85rem", fontWeight: 600 }}>
            {mascotSubtitle}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#cbd5e1", textTransform: "uppercase", marginBottom: 4 }}>
                Developer Email
              </label>
              <div
                style={{
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 12,
                  background: "rgba(18, 26, 38, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <Mail size={17} color="#22c55e" style={{ marginLeft: 14 }} />
                <input
                  type="email"
                  placeholder="developer@swaply.io"
                  value={email}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  style={{ width: "100%", height: "100%", border: 0, outline: 0, padding: "0 12px", background: "transparent", color: "#fff", fontSize: 14 }}
                  required
                />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#cbd5e1", textTransform: "uppercase" }}>
                  Password
                </label>
                <button
                  type="button"
                  style={{ border: 0, background: "transparent", color: "#22c55e", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}
                  onClick={() => alert("Reset dispatched.")}
                >
                  Forgot key?
                </button>
              </div>

              <div
                style={{
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 12,
                  background: "rgba(18, 26, 38, 0.7)",
                  border: passwordFocused ? "1px solid #22c55e" : "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                <LockKeyhole size={17} color="#22c55e" style={{ marginLeft: 14 }} />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  style={{ width: "100%", height: "100%", border: 0, outline: 0, padding: "0 12px", background: "transparent", color: "#fff", fontSize: 14 }}
                  required
                />
                <button
                  type="button"
                  style={{ border: 0, background: "transparent", color: "#94a3b8", cursor: "pointer", marginRight: 10 }}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ color: "#f87171", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6 }}>
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit || loading || success}
              style={{
                height: 48,
                borderRadius: 12,
                border: 0,
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                marginTop: 4,
                boxShadow: "0 4px 16px rgba(34, 197, 94, 0.4)",
              }}
            >
              {loading ? "Authenticating..." : success ? "Workspace Ready ✨" : "Launch Compiler"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
