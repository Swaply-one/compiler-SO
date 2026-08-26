import React, { useMemo } from "react";
import { motion } from "motion/react";
import { FileCode, Binary, Cpu, ShieldCheck, Zap, Layers } from "lucide-react";

/**
 * CompilerPipeline Component
 * Abstract interactive compiler architecture visualization:
 * SOURCE -> LEXER -> PARSER -> INTERMEDIATE REPRESENTATION -> OPTIMIZER -> BINARY
 */
export default function CompilerPipeline({
  emailLength,
  passwordLength,
  compileStep, // 0 = idle, 1..6 = step in progress, 7 = success
  isCompiling,
  isSuccess,
}) {
  const stages = useMemo(
    () => [
      {
        id: "source",
        label: "SOURCE",
        desc: "Raw ASCII & UTF-8 Stream",
        icon: FileCode,
        detail: emailLength > 0 ? `stream_len: ${emailLength}B` : "stdin::pipe_open",
        codeSnippet: emailLength > 0 ? "fn main() -> AuthContext {" : "0x00000000",
        active: emailLength > 0 || compileStep >= 1 || isSuccess,
        completed: compileStep > 1 || isSuccess,
      },
      {
        id: "lexer",
        label: "LEXER",
        desc: "Lexical Analyzer & Tokenizer",
        icon: Zap,
        detail: emailLength > 0 ? "TOK_IDENT, TOK_AT_SYM" : "scan::idle_wait",
        codeSnippet: emailLength > 0 ? "[T_USER, T_DOMAIN, T_EXT]" : "T_NULL",
        active: emailLength > 3 || compileStep >= 2 || isSuccess,
        completed: compileStep > 2 || isSuccess,
      },
      {
        id: "parser",
        label: "PARSER",
        desc: "Abstract Syntax Tree Builder",
        icon: Layers,
        detail: passwordLength > 0 ? `ast_depth: 4 • nodes: ${passwordLength * 2}` : "grammar::strict",
        codeSnippet: passwordLength > 0 ? "ASTNode::AuthCredentials" : "AST_ROOT",
        active: passwordLength > 0 || compileStep >= 3 || isSuccess,
        completed: compileStep > 3 || isSuccess,
      },
      {
        id: "ir",
        label: "INTERMEDIATE REPRESENTATION",
        desc: "Static Single Assignment (SSA IR)",
        icon: Cpu,
        detail: passwordLength > 0 ? "%auth.v1 = ssa_hash(key)" : "llvm_ir::pass_0",
        codeSnippet: passwordLength > 0 ? "%1 = call @argon2_sha256" : "%0 = void",
        active: passwordLength >= 4 || compileStep >= 4 || isSuccess,
        completed: compileStep > 4 || isSuccess,
      },
      {
        id: "optimizer",
        label: "OPTIMIZER",
        desc: "Constant Folding & Inline Pass",
        icon: ShieldCheck,
        detail: compileStep >= 5 || isSuccess ? "zero_leak_crypto_pass" : "opt_level: O3",
        codeSnippet: compileStep >= 5 || isSuccess ? "llvm.optimize.inline(true)" : "no_inline",
        active: compileStep >= 5 || isSuccess,
        completed: compileStep > 5 || isSuccess,
      },
      {
        id: "binary",
        label: "BINARY",
        desc: "Target Machine Code & Session Bytecode",
        icon: Binary,
        detail: isSuccess ? "ELF64 • session_entry_ok" : "arch: x86_64_v3",
        codeSnippet: isSuccess ? "0x7F 0x45 0x4C 0x46 (EXEC)" : "0x00 0x00 0x00 0x00",
        active: compileStep >= 6 || isSuccess,
        completed: isSuccess,
      },
    ],
    [emailLength, passwordLength, compileStep, isSuccess]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        maxWidth: 480,
        margin: "0 auto",
        justifyContent: "space-between",
        userSelect: "none",
      }}
    >
      {/* Top Telemetry Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "16px",
          borderBottom: "1px solid #292E29",
          marginBottom: "18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: isSuccess ? "#228B22" : isCompiling ? "#4ade80" : "#8D958B",
              boxShadow: isCompiling || isSuccess ? "0 0 10px #228B22" : "none",
              transition: "all 0.3s ease",
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#8D958B",
              textTransform: "uppercase",
            }}
          >
            Pipeline Architecture
          </span>
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "#8D958B",
          }}
        >
          LLVM Target: <strong style={{ color: "#F2F3ED", fontWeight: 500 }}>Native</strong>
        </span>
      </div>

      {/* Pipeline Stage Nodes */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative" }}>
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isLast = index === stages.length - 1;

          return (
            <div key={stage.id} style={{ position: "relative" }}>
              {/* Vertical Connector Line */}
              {!isLast && (
                <div
                  style={{
                    position: "absolute",
                    left: "20px",
                    top: "44px",
                    bottom: "-14px",
                    width: "1px",
                    backgroundColor: stage.active ? "rgba(34, 139, 34, 0.45)" : "#292E29",
                    transition: "background-color 0.3s ease",
                    zIndex: 0,
                  }}
                >
                  {/* Flowing Data Particle when active */}
                  {stage.active && (
                    <motion.div
                      style={{
                        position: "absolute",
                        width: "3px",
                        height: "8px",
                        left: "-1px",
                        borderRadius: "1px",
                        backgroundColor: "#228B22",
                        boxShadow: "0 0 6px #228B22",
                      }}
                      animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </div>
              )}

              {/* Stage Node Box */}
              <motion.div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  borderRadius: "6px",
                  backgroundColor: stage.active ? "#1B1F1B" : "#151815",
                  border: "1px solid",
                  borderColor: stage.completed
                    ? "#228B22"
                    : stage.active
                    ? "rgba(34, 139, 34, 0.55)"
                    : "#292E29",
                  boxShadow:
                    stage.active && !stage.completed
                      ? "0 0 16px -4px rgba(34, 139, 34, 0.25)"
                      : stage.completed
                      ? "0 0 18px -4px rgba(34, 139, 34, 0.35)"
                      : "none",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                whileHover={{ x: 2 }}
              >
                {/* Left Node Meta */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: stage.active ? "rgba(34, 139, 34, 0.15)" : "#0D0F0D",
                      border: "1px solid",
                      borderColor: stage.active ? "rgba(34, 139, 34, 0.4)" : "#292E29",
                      color: stage.active ? "#F2F3ED" : "#8D958B",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <Icon size={14} color={stage.active ? "#228B22" : "#8D958B"} strokeWidth={1.75} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "11.5px",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          color: stage.active ? "#F2F3ED" : "#8D958B",
                        }}
                      >
                        {stage.label}
                      </span>
                      {stage.completed && (
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "10px",
                            color: "#228B22",
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: "11px", color: "#8D958B", marginTop: "1px" }}>
                      {stage.desc}
                    </span>
                  </div>
                </div>

                {/* Right Node Code Telemetry */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    textAlign: "right",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10.5px",
                      color: stage.active ? "#228B22" : "#5A6258",
                      fontWeight: 500,
                    }}
                  >
                    {stage.codeSnippet}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9.5px",
                      color: "#8D958B",
                      marginTop: "2px",
                    }}
                  >
                    {stage.detail}
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Bottom Compiler Bus Status */}
      <div
        style={{
          marginTop: "18px",
          paddingTop: "14px",
          borderTop: "1px solid #292E29",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10.5px",
          color: "#8D958B",
        }}
      >
        <span>
          MEM: <strong style={{ color: "#F2F3ED", fontWeight: 500 }}>0.42 MB</strong>
        </span>
        <span>
          LATENCY: <strong style={{ color: "#F2F3ED", fontWeight: 500 }}>0.8ms</strong>
        </span>
        <span>
          PASSES: <strong style={{ color: "#F2F3ED", fontWeight: 500 }}>6/6</strong>
        </span>
      </div>
    </div>
  );
}
