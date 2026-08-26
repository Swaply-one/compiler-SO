import React, { useState, useRef } from 'react';
import RiveCharacter from '../components/RiveCharacter';
import confetti from 'canvas-confetti';
import { 
  FlaskConical, 
  Atom, 
  Binary, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Flame,
  Sparkles,
  ArrowRight,
  Radio
} from 'lucide-react';

export default function ScientistLoginPage() {
  const [researcherId, setResearcherId] = useState('');
  const [formulaPass, setFormulaPass] = useState('');
  const [showFormula, setShowFormula] = useState(false);
  const [targetArch, setTargetArch] = useState('wasm32-wasi');
  const [isLoading, setIsLoading] = useState(false);
  const [compilationStage, setCompilationStage] = useState('');
  const [authStatus, setAuthStatus] = useState(null);

  // Rive Character Interactive States
  const [isChecking, setIsChecking] = useState(false);
  const [lookValue, setLookValue] = useState(50);
  const [isHandsUp, setIsHandsUp] = useState(false);

  const characterRef = useRef(null);

  const handleIdChange = (e) => {
    const val = e.target.value;
    setResearcherId(val);
    setIsChecking(true);
    setIsHandsUp(false);
    
    const look = Math.min(Math.max(val.length * 3.2 + 10, 10), 90);
    setLookValue(look);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthStatus(null);

    if (!researcherId || !formulaPass) {
      setAuthStatus({
        type: 'error',
        message: 'SYNTAX_ERROR: Researcher ID and Formula Passcode required!'
      });
      characterRef.current?.triggerFail();
      return;
    }

    setIsLoading(true);
    setIsHandsUp(false);
    setIsChecking(false);
    setCompilationStage('Synthesizing AST Tokens...');

    setTimeout(() => {
      setCompilationStage('Applying LLVM Optimization Pass (O3)...');
    }, 550);

    setTimeout(() => {
      setIsLoading(false);
      setCompilationStage('');
      if (formulaPass.length >= 6) {
        setAuthStatus({
          type: 'success',
          message: 'QUANTUM SYNTHESIS COMPLETE: Welcome to the Lab!'
        });
        characterRef.current?.triggerSuccess();
        confetti({
          particleCount: 110,
          spread: 80,
          colors: ['#10e760', '#8b5cf6', '#06d6a0']
        });
      } else {
        setAuthStatus({
          type: 'error',
          message: 'QUANTUM INSTABILITY: Passcode rejected by compiler core!'
        });
        characterRef.current?.triggerFail();
      }
    }, 1300);
  };

  return (
    <div className="split-hero-layout">
      {/* Left: Quantum AST Alchemy Showcase */}
      <div className="hero-showcase-pane">
        <div className="hero-pill-tag" style={{ background: 'rgba(16, 231, 96, 0.08)', borderColor: 'rgba(16, 231, 96, 0.3)' }}>
          <FlaskConical size={14} color="#10e760" />
          <span style={{ color: '#86efac' }}>Quantum AST & Polyglot Transpiler</span>
        </div>

        <h1 className="hero-headline scientist">
          Transmute Any Code Into <span>Micro-Bytecode</span>
        </h1>

        <p className="hero-subtext">
          Harness experimental JIT optimization algorithms. Automatically transpile high-level source into WebAssembly (WASI), parallel SIMD vectors, and machine code.
        </p>

        {/* Live Code Preview Terminal */}
        <div className="code-preview-window" style={{ borderColor: 'rgba(16, 231, 96, 0.2)' }}>
          <div className="terminal-titlebar">
            <div className="terminal-dots">
              <span className="terminal-dot" style={{ background: '#10e760' }}></span>
              <span className="terminal-dot" style={{ background: '#8b5cf6' }}></span>
              <span className="terminal-dot" style={{ background: '#06d6a0' }}></span>
            </div>
            <span className="terminal-filename" style={{ color: '#86efac' }}>quantum_ast_synth.ts</span>
            <span style={{ fontSize: '0.7rem', color: '#10e760' }}>● REACTOR_STABLE</span>
          </div>
          <pre className="code-content-block">
            <code>
              <span className="code-keyword">import</span> &#123; <span className="code-fn">SynthesizeAST</span> &#125; <span className="code-keyword">from</span> <span className="code-str">'@swaply/quantum'</span>;<br />
              <br />
              <span className="code-keyword">export async function</span> <span className="code-fn">transpileModule</span>(tree: <span className="code-type">SyntaxNode</span>) &#123;<br />
              &nbsp;&nbsp;<span className="code-keyword">const</span> reactor = <span className="code-keyword">new</span> <span className="code-fn">JITQuantumReactor</span>();<br />
              &nbsp;&nbsp;<span className="code-keyword">const</span> binary = <span className="code-keyword">await</span> reactor.<span className="code-fn">synthesize</span>(tree, &#123;<br />
              &nbsp;&nbsp;&nbsp;&nbsp;target: <span className="code-str">'wasm32-wasi'</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;vectorize: <span className="code-keyword">true</span><br />
              &nbsp;&nbsp;&#125;);<br />
              &nbsp;&nbsp;<span className="code-keyword">return</span> binary;<br />
              &#125;
            </code>
          </pre>
        </div>

        {/* Telemetry Row */}
        <div className="telemetry-row">
          <div className="telemetry-pill" style={{ borderColor: 'rgba(16, 231, 96, 0.2)' }}>
            <Atom size={14} color="#10e760" />
            <span>AST Synthesis Engine</span>
          </div>
          <div className="telemetry-pill" style={{ borderColor: 'rgba(139, 92, 246, 0.2)' }}>
            <Radio size={14} color="#a855f7" />
            <span>Multi-Thread WASI</span>
          </div>
          <div className="telemetry-pill" style={{ borderColor: 'rgba(6, 214, 160, 0.2)' }}>
            <Sparkles size={14} color="#06d6a0" />
            <span>SIMD Accelerated</span>
          </div>
        </div>
      </div>

      {/* Right: Mad Scientist Card */}
      <div className="auth-card-container">
        <div className="login-glass-card" style={{
          border: '1px solid rgba(16, 231, 96, 0.3)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 50px -10px rgba(16, 231, 96, 0.25)',
          background: 'rgba(8, 18, 26, 0.88)'
        }}>
          {/* Reactor Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.35rem 0.65rem',
            borderRadius: '8px',
            background: 'linear-gradient(90deg, rgba(16, 231, 96, 0.12), rgba(139, 92, 246, 0.12))',
            border: '1px solid rgba(16, 231, 96, 0.25)',
            marginBottom: '0.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#86efac', fontSize: '0.72rem', fontWeight: 700 }}>
              <FlaskConical size={14} color="#10e760" />
              <span>QUANTUM LAB AUTH</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#c084fc', fontSize: '0.7rem', fontWeight: 600 }}>
              <Atom size={13} />
              <span>AST Core 4.9</span>
            </div>
          </div>

          {/* Character Stage with Mad Scientist */}
          <div className="character-stage">
            <div className="character-pedestal-glow" style={{ background: 'radial-gradient(ellipse at center, rgba(16, 231, 96, 0.5) 0%, transparent 70%)' }}></div>
            <RiveCharacter
              ref={characterRef}
              src="/412-781-mad-scientist-login.riv"
              lookValue={lookValue}
              isChecking={isChecking}
              isHandsUp={isHandsUp}
              height={190}
            />
          </div>

          {/* Form Header */}
          <div className="auth-header">
            <h2 className="auth-title">Lab Scientist Access</h2>
            <p className="auth-subtitle">Enter the quantum sandbox to transmute code into bytecode</p>
          </div>

          {/* Status Alert */}
          {authStatus && (
            <div className={`status-msg-banner ${authStatus.type}`}>
              {authStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
              <span>{authStatus.message}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Researcher ID */}
            <div className="field-group">
              <label className="field-label" htmlFor="sci-id">Lead Researcher ID</label>
              <div className="field-input-box">
                <User size={16} className="field-input-icon" color="#10e760" />
                <input
                  id="sci-id"
                  type="text"
                  className="custom-input"
                  style={{ borderColor: 'rgba(16, 231, 96, 0.25)' }}
                  placeholder="dr_curie@quantum.lab"
                  value={researcherId}
                  onChange={handleIdChange}
                  onFocus={() => { setIsChecking(true); setIsHandsUp(false); }}
                  onBlur={() => setIsChecking(false)}
                  required
                />
              </div>
            </div>

            {/* Formula Passcode */}
            <div className="field-group">
              <label className="field-label" htmlFor="sci-pass">Formula Passcode</label>
              <div className="field-input-box">
                <Lock size={16} className="field-input-icon" color="#10e760" />
                <input
                  id="sci-pass"
                  type={showFormula ? 'text' : 'password'}
                  className="custom-input"
                  style={{ borderColor: 'rgba(16, 231, 96, 0.25)' }}
                  placeholder="••••••••••••"
                  value={formulaPass}
                  onChange={(e) => setFormulaPass(e.target.value)}
                  onFocus={() => { setIsChecking(false); setIsHandsUp(true); }}
                  onBlur={() => setIsHandsUp(false)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowFormula(!showFormula)}
                >
                  {showFormula ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Architecture Selector */}
            <div className="field-group">
              <label className="field-label" htmlFor="sci-arch">Transpiler Architecture</label>
              <select
                id="sci-arch"
                className="custom-input"
                value={targetArch}
                onChange={(e) => setTargetArch(e.target.value)}
                style={{ paddingLeft: '0.85rem', cursor: 'pointer', borderColor: 'rgba(16, 231, 96, 0.25)' }}
              >
                <option value="wasm32-wasi">WebAssembly (wasm32-wasi JIT)</option>
                <option value="x86_64-v3">x86_64-v3 (AVX-512 Native)</option>
                <option value="aarch64-darwin">Apple Silicon (aarch64-darwin)</option>
                <option value="riscv64-gc">RISC-V 64GC (Emulated Core)</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary-auth"
              disabled={isLoading}
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10e760 50%, #7c3aed 100%)',
                boxShadow: '0 4px 20px -2px rgba(16, 231, 96, 0.4)'
              }}
            >
              {isLoading ? (
                <>
                  <div className="spinner-anim"></div>
                  <span>{compilationStage || 'Compiling Bytecode...'}</span>
                </>
              ) : (
                <>
                  <Zap size={17} />
                  <span>Transpile & Enter Lab</span>
                </>
              )}
            </button>
          </form>

          {/* Mad Scientist Emotions HUD */}
          <div className="character-emotions-hud">
            <div className="emotions-header">
              <span>Scientist Reaction Controls</span>
              <span style={{ color: '#10e760' }}>Lab Test</span>
            </div>
            <div className="emotions-buttons">
              <button
                type="button"
                className="btn-emotion-chip"
                onClick={() => characterRef.current?.triggerSuccess()}
              >
                🧪 Eureka!
              </button>
              <button
                type="button"
                className="btn-emotion-chip"
                onClick={() => characterRef.current?.triggerFail()}
              >
                💥 Explosion
              </button>
              <button
                type="button"
                className="btn-emotion-chip"
                onClick={() => {
                  setIsHandsUp(!isHandsUp);
                  characterRef.current?.setHandsUp(!isHandsUp);
                }}
              >
                🙈 Cover Eyes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
