import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Play,
  Terminal,
  FolderTree,
  FileCode,
  Settings,
  Cpu,
  CheckCircle2,
  LogOut,
  RefreshCw,
  Copy,
  ChevronRight,
  Code2,
} from "lucide-react";

export default function CompilerWorkspace({ userEmail = "developer@swaply.io", onSignOut }) {
  const [activeFile, setActiveFile] = useState("main.sw");
  const [targetArch, setTargetArch] = useState("x86_64-native");
  const [isRunning, setIsRunning] = useState(false);
  const [botMessage, setBotMessage] = useState("🤖 Welcome to your Compiler Workspace, Boss! Press [RUN F5] to execute code.");
  const [terminalOutput, setTerminalOutput] = useState([
    "╔═══════════════════════════════════════════════════════════════════════════════╗",
    "║                    ⚡ SWAPLY ONE COMPILER LAB // v1.0.0 ⚡                    ║",
    `║  AUTHENTICATED: ${(userEmail || "developer@swaply.io").padEnd(30, " ")} | ACCESS: 0xROOT_ADMIN        ║`,
    "║  LLVM BACKEND : 18.1.8-RELEASE-x86_64        | SIMD OPT: AVX-512 ACTIVE       ║",
    "╚═══════════════════════════════════════════════════════════════════════════════╝",
    "[runtime] LLVM JIT Compiler daemon ready.",
    "[runtime] Workspace mounted: swaply-core/main.sw",
    "Ready. Press 'RUN [F5]' to build and execute SIMD vector optimizations.",
  ]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "F5" || (e.ctrlKey && e.key === "Enter")) {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [targetArch]);

  const sourceCode = `// SwaplyOne Compiler — Target: Native x86_64
import std::io;
import std::time;

struct ComputationPayload {
    id: u64,
    timestamp: u64,
    metrics: [f64; 4],
}

pub fn main() -> Result<(), std::Error> {
    let timer = time::Instant::now();
    let payload = ComputationPayload {
        id: 0x9AF4_2048,
        timestamp: time::now_epoch(),
        metrics: [1.414, 2.718, 3.1415, 0.5772],
    };

    println!("[swaply-one] Executing SIMD vector optimizations...");
    let processed = payload.metrics.map(|x| x.sin() * 2.0);
    
    println!("[swaply-one] Pipeline compute finished in {:?}", timer.elapsed());
    println!("[swaply-one] Target emitted 0 errors, 0 warnings.");
    Ok(())
}`;

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setBotMessage("⚡ Compiling LLVM AST & emitting machine code...");
    setTerminalOutput((prev) => [
      ...prev,
      `> swaplyc compile --target=${targetArch} --opt-level=3 main.sw`,
      "[1/4] Lexing & Parsing AST (0.4ms)...",
      "[2/4] Typecheck & Borrow checking passed (0.8ms)...",
      "[3/4] LLVM IR SSA passes & Vectorization (1.2ms)...",
      "[4/4] Emitting ELF64 Machine Code (0.3ms)...",
      "[stdout] [swaply-one] Executing SIMD vector optimizations...",
      "[stdout] [swaply-one] Pipeline compute finished in 2.7ms",
      "[stdout] [swaply-one] Target emitted 0 errors, 0 warnings.",
      "✓ Process finished successfully with exit code 0.",
    ]);
    setTimeout(() => {
      setIsRunning(false);
      setBotMessage("🎉 Compilation successful! 0 errors, 0 warnings.");
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0D0F0D",
        color: "#F2F3ED",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top IDE Header Bar */}
      <header
        style={{
          height: "50px",
          backgroundColor: "#151815",
          borderBottom: "1px solid #292E29",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
        }}
      >
        {/* Brand & Project Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#228B22",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "13px",
              color: "#0D0F0D",
            }}
          >
            S
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
            <span style={{ color: "#8D958B" }}>workspace</span>
            <ChevronRight size={14} color="#8D958B" />
            <span style={{ fontWeight: 600, color: "#F2F3ED" }}>swaply-core</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                padding: "2px 6px",
                borderRadius: "3px",
                backgroundColor: "#1B1F1B",
                border: "1px solid #292E29",
                color: "#228B22",
                marginLeft: "4px",
              }}
            >
              v1.0.0
            </span>
          </div>
        </div>

        {/* Center Target Architecture & Run Trigger */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Target Selector */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#0D0F0D",
              border: "1px solid #292E29",
              borderRadius: "4px",
              padding: "4px 10px",
              fontSize: "12px",
              fontFamily: "'JetBrains Mono', monospace",
              color: "#8D958B",
            }}
          >
            <Cpu size={14} color="#228B22" />
            <span>Target:</span>
            <select
              value={targetArch}
              onChange={(e) => setTargetArch(e.target.value)}
              style={{
                backgroundColor: "transparent",
                border: 0,
                outline: 0,
                color: "#F2F3ED",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              <option value="x86_64-native" style={{ background: "#151815" }}>x86_64 Native (Linux/Win)</option>
              <option value="aarch64-apple" style={{ background: "#151815" }}>aarch64 ARM64 (Apple Silicon)</option>
              <option value="wasm32-unknown" style={{ background: "#151815" }}>wasm32 WebAssembly</option>
            </select>
          </div>

          {/* Run Button */}
          <button
            type="button"
            onClick={handleRun}
            disabled={isRunning}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#228B22",
              color: "#0D0F0D",
              border: 0,
              borderRadius: "4px",
              padding: "6px 14px",
              fontSize: "12.5px",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: "pointer",
              boxShadow: "0 0 14px rgba(34, 139, 34, 0.3)",
              transition: "all 0.15s ease",
            }}
          >
            {isRunning ? <RefreshCw size={13} className="spin" /> : <Play size={13} fill="#0D0F0D" />}
            <span>RUN [F5]</span>
          </button>
        </div>

        {/* Right User & Sign Out */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#8D958B" }}>
            <CheckCircle2 size={13} color="#228B22" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{userEmail || "developer@swaply.io"}</span>
          </div>
          <button
            type="button"
            onClick={onSignOut}
            title="Sign out of compiler"
            style={{
              background: "transparent",
              border: "1px solid #292E29",
              color: "#8D958B",
              borderRadius: "4px",
              padding: "5px 8px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "11.5px",
              cursor: "pointer",
            }}
          >
            <LogOut size={13} />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* Main IDE Workspace Grid */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "230px 1fr", minHeight: 0 }}>
        {/* Left File Tree Panel */}
        <aside
          style={{
            backgroundColor: "#151815",
            borderRight: "1px solid #292E29",
            display: "flex",
            flexDirection: "column",
            fontSize: "12.5px",
          }}
        >
          <div
            style={{
              padding: "12px 14px",
              borderBottom: "1px solid #292E29",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#8D958B",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <FolderTree size={13} />
              <span>Project Files</span>
            </span>
          </div>

          <div style={{ padding: "8px 0", display: "flex", flexDirection: "column", gap: "2px" }}>
            {[
              { name: "main.sw", active: activeFile === "main.sw" },
              { name: "lexer.sw", active: activeFile === "lexer.sw" },
              { name: "parser.sw", active: activeFile === "parser.sw" },
              { name: "optimizer.sw", active: activeFile === "optimizer.sw" },
              { name: "Swaply.toml", active: activeFile === "Swaply.toml" },
            ].map((f) => (
              <button
                key={f.name}
                type="button"
                onClick={() => setActiveFile(f.name)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 16px",
                  border: 0,
                  textAlign: "left",
                  backgroundColor: f.active ? "#1B1F1B" : "transparent",
                  color: f.active ? "#F2F3ED" : "#8D958B",
                  borderLeft: f.active ? "2px solid #228B22" : "2px solid transparent",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <FileCode size={14} color={f.active ? "#228B22" : "#8D958B"} />
                <span>{f.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Right Editor & Terminal Stack */}
        <div style={{ display: "grid", gridTemplateRows: "1fr 220px", minHeight: 0 }}>
          {/* Code Editor Panel */}
          <div
            style={{
              backgroundColor: "#0D0F0D",
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid #292E29",
              minHeight: 0,
              overflow: "auto",
            }}
          >
            {/* Editor File Tab */}
            <div
              style={{
                height: "36px",
                backgroundColor: "#151815",
                borderBottom: "1px solid #292E29",
                display: "flex",
                alignItems: "center",
                padding: "0 14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  height: "100%",
                  borderBottom: "2px solid #228B22",
                  padding: "0 8px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  color: "#F2F3ED",
                }}
              >
                <Code2 size={14} color="#228B22" />
                <span>{activeFile}</span>
              </div>
            </div>

            {/* Code Contents */}
            <div style={{ display: "flex", padding: "16px 0", flex: 1 }}>
              {/* Line numbers */}
              <div
                style={{
                  width: "48px",
                  textAlign: "right",
                  paddingRight: "14px",
                  color: "#3F473E",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "13px",
                  lineHeight: "1.7",
                  userSelect: "none",
                }}
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code Pre */}
              <pre
                style={{
                  margin: 0,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "13px",
                  lineHeight: "1.7",
                  color: "#F2F3ED",
                  whiteSpace: "pre",
                  tabSize: 4,
                  flex: 1,
                  paddingRight: "20px",
                }}
              >
                {sourceCode}
              </pre>
            </div>
          </div>

          {/* Bottom Live Terminal Output */}
          <div
            style={{
              backgroundColor: "#0D0F0D",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <div
              style={{
                height: "32px",
                backgroundColor: "#151815",
                borderBottom: "1px solid #292E29",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 14px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                color: "#8D958B",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Terminal size={13} color="#228B22" />
                <span>Compiler Output & Diagnostic Terminal</span>
              </div>
              <button
                type="button"
                onClick={() => setTerminalOutput(["[terminal] Cleared diagnostic logs."])}
                style={{
                  background: "transparent",
                  border: 0,
                  color: "#8D958B",
                  fontSize: "10.5px",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>

            <div
              style={{
                flex: 1,
                padding: "12px 16px",
                overflowY: "auto",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                lineHeight: "1.6",
                color: "#8D958B",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              {terminalOutput.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    color: line.startsWith("✓")
                      ? "#228B22"
                      : line.startsWith(">")
                      ? "#F2F3ED"
                      : line.startsWith("[stdout]")
                      ? "#F2F3ED"
                      : "#8D958B",
                    fontWeight: line.startsWith(">") ? 600 : 400,
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom IDE Status Bar with CyberBot Assistant */}
      <footer
        style={{
          height: "28px",
          backgroundColor: "#111411",
          borderTop: "1px solid #222722",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
          fontSize: "11px",
          fontFamily: "'JetBrains Mono', monospace",
          color: "#8D958B",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#22c55e", fontWeight: 700 }}>● SWAPLY_ONE_ONLINE</span>
          <span style={{ color: "#4ade80" }}>{botMessage}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span>UTF-8</span>
          <span>LF</span>
          <span>LLVM v18.1</span>
          <span style={{ color: "#228B22", fontWeight: 700 }}>[F5] RUN</span>
        </div>
      </footer>
    </div>
  );
}
