import React, { useState, useRef } from 'react';
import RiveCharacter from '../components/RiveCharacter';
import confetti from 'canvas-confetti';
import { 
  Code2, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Cpu,
  Zap,
  Shield,
  Terminal
} from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function TeddyLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState(null);

  // Interactive Rive states
  const [isChecking, setIsChecking] = useState(false);
  const [lookValue, setLookValue] = useState(50);
  const [isHandsUp, setIsHandsUp] = useState(false);

  const characterRef = useRef(null);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setIsChecking(true);
    setIsHandsUp(false);
    
    // Gaze tracking calculation based on input length
    const calculatedLook = Math.min(Math.max(val.length * 3 + 10, 10), 90);
    setLookValue(calculatedLook);
  };

  const handleEmailFocus = () => {
    setIsChecking(true);
    setIsHandsUp(false);
  };

  const handleEmailBlur = () => {
    setIsChecking(false);
  };

  const handlePasswordFocus = () => {
    setIsChecking(false);
    setIsHandsUp(true);
  };

  const handlePasswordBlur = () => {
    setIsHandsUp(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthStatus(null);

    if (!email || !password) {
      setAuthStatus({
        type: 'error',
        message: 'Please provide developer email and master password.'
      });
      characterRef.current?.triggerFail();
      return;
    }

    setIsLoading(true);
    setIsHandsUp(false);
    setIsChecking(false);

    setTimeout(() => {
      setIsLoading(false);
      if (password.length >= 6) {
        setAuthStatus({
          type: 'success',
          message: 'Workspace authenticated! Launching Swaply Compiler IDE...'
        });
        characterRef.current?.triggerSuccess();
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      } else {
        setAuthStatus({
          type: 'error',
          message: 'Invalid password. Must contain at least 6 characters.'
        });
        characterRef.current?.triggerFail();
      }
    }, 1100);
  };

  return (
    <div className="split-hero-layout">
      {/* Left: Compiler Engine Showcase */}
      <div className="hero-showcase-pane">
        <div className="hero-pill-tag">
          <Sparkles size={14} color="#818cf8" />
          <span style={{ color: '#c7d2fe' }}>Next-Gen Cloud Compiler Engine</span>
        </div>

        <h1 className="hero-headline">
          High Speed Code Execution & <span>Instant Transpilation</span>
        </h1>

        <p className="hero-subtext">
          Connect your dev environment to Swaply's distributed LLVM cluster. Run C++, Rust, Go, Python, and TypeScript with microsecond latency.
        </p>

        {/* Live Code Preview Terminal */}
        <div className="code-preview-window">
          <div className="terminal-titlebar">
            <div className="terminal-dots">
              <span className="terminal-dot" style={{ background: '#f43f5e' }}></span>
              <span className="terminal-dot" style={{ background: '#f59e0b' }}></span>
              <span className="terminal-dot" style={{ background: '#10b981' }}></span>
            </div>
            <span className="terminal-filename">swaply_compiler_core.rs</span>
            <span style={{ fontSize: '0.7rem', color: '#10b981' }}>● LLVM-18 JIT</span>
          </div>
          <pre className="code-content-block">
            <code>
              <span className="code-keyword">pub async fn</span> <span className="code-fn">execute_pipeline</span>(source: <span className="code-type">&str</span>) -&gt; <span className="code-type">Result&lt;WasmModule, Error&gt;</span> &#123;<br />
              &nbsp;&nbsp;<span className="code-comment">// 1. Tokenize AST & syntax graph</span><br />
              &nbsp;&nbsp;<span className="code-keyword">let</span> ast = parser::parse(source)?;<br />
              &nbsp;&nbsp;<span className="code-comment">// 2. Optimize LLVM IR passes (O3)</span><br />
              &nbsp;&nbsp;<span className="code-keyword">let</span> bytecode = llvm_engine::compile_optimized(&amp;ast).<span className="code-fn">await</span>?;<br />
              &nbsp;&nbsp;<span className="code-fn">println!</span>(<span className="code-str">"⚡ Execution completed in 0.04ms"</span>);<br />
              &nbsp;&nbsp;<span className="code-type">Ok</span>(bytecode)<br />
              &#125;
            </code>
          </pre>
        </div>

        {/* Telemetry Row */}
        <div className="telemetry-row">
          <div className="telemetry-pill">
            <Cpu size={14} color="#6366f1" />
            <span>0.04ms Compile Speed</span>
          </div>
          <div className="telemetry-pill">
            <Zap size={14} color="#38bdf8" />
            <span>WASM & Native Binary</span>
          </div>
          <div className="telemetry-pill">
            <Shield size={14} color="#10b981" />
            <span>Sandboxed Cloud</span>
          </div>
        </div>
      </div>

      {/* Right: Interactive Rive Login Card */}
      <div className="auth-card-container">
        <div className="login-glass-card" style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px -10px rgba(99, 102, 241, 0.25)'
        }}>
          {/* Top Card Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.25rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.725rem',
              fontWeight: 700,
              color: '#818cf8',
              background: 'rgba(99, 102, 241, 0.12)',
              padding: '0.25rem 0.6rem',
              borderRadius: '6px',
              border: '1px solid rgba(99, 102, 241, 0.25)'
            }}>
              <Code2 size={13} />
              <span>SWAPLY STUDIO AUTH</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', color: '#34d399' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
              <span>Cluster Ready</span>
            </div>
          </div>

          {/* Character Stage with Rive Canvas */}
          <div className="character-stage">
            <div className="character-pedestal-glow"></div>
            <RiveCharacter
              ref={characterRef}
              src="/14370-27077-login-page.riv"
              lookValue={lookValue}
              isChecking={isChecking}
              isHandsUp={isHandsUp}
              height={190}
            />
          </div>

          {/* Header */}
          <div className="auth-header">
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Sign in to your compiler workspace & code runners</p>
          </div>

          {/* Status Message Banner */}
          {authStatus && (
            <div className={`status-msg-banner ${authStatus.type}`}>
              {authStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{authStatus.message}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="field-group">
              <label className="field-label" htmlFor="teddy-email">Developer Email</label>
              <div className="field-input-box">
                <Mail size={16} className="field-input-icon" />
                <input
                  id="teddy-email"
                  type="email"
                  className="custom-input"
                  placeholder="developer@swaply.io"
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="field-group">
              <label className="field-label" htmlFor="teddy-pass">Password / Master Token</label>
              <div className="field-input-box">
                <Lock size={16} className="field-input-icon" />
                <input
                  id="teddy-pass"
                  type={showPassword ? 'text' : 'password'}
                  className="custom-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem', fontSize: '0.8rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#94a3b8', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  style={{ accentColor: '#6366f1' }}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember session</span>
              </label>
              <button 
                type="button" 
                style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', fontWeight: 500 }}
                onClick={() => alert('Password reset dispatched!')}
              >
                Forgot key?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary-auth"
              disabled={isLoading}
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #4f46e5 100%)',
                boxShadow: '0 4px 20px -2px rgba(99, 102, 241, 0.5)'
              }}
            >
              {isLoading ? (
                <>
                  <div className="spinner-anim"></div>
                  <span>Connecting to Cluster...</span>
                </>
              ) : (
                <>
                  <span>Launch Compiler IDE</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Social Quick Login */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginTop: '1rem' }}>
            <button
              type="button"
              className="btn-emotion-chip"
              style={{ padding: '0.55rem', color: '#cbd5e1' }}
              onClick={() => {
                setEmail('github_dev@swaply.io');
                setIsChecking(true);
                setLookValue(45);
              }}
            >
              <GithubIcon size={15} />
              <span>GitHub Dev</span>
            </button>
            <button
              type="button"
              className="btn-emotion-chip"
              style={{ padding: '0.55rem', color: '#cbd5e1' }}
              onClick={() => {
                setEmail('google_dev@swaply.io');
                setIsChecking(true);
                setLookValue(70);
              }}
            >
              <Sparkles size={15} color="#818cf8" />
              <span>Google SSO</span>
            </button>
          </div>

          {/* Character Interactive Test HUD */}
          <div className="character-emotions-hud">
            <div className="emotions-header">
              <span>Interactive Character Controls</span>
              <span style={{ color: '#818cf8' }}>Test Reactions</span>
            </div>
            <div className="emotions-buttons">
              <button
                type="button"
                className="btn-emotion-chip"
                onClick={() => characterRef.current?.triggerSuccess()}
                title="Trigger Victory Animation"
              >
                🎉 Success
              </button>
              <button
                type="button"
                className="btn-emotion-chip"
                onClick={() => characterRef.current?.triggerFail()}
                title="Trigger Error Animation"
              >
                ❌ Error
              </button>
              <button
                type="button"
                className="btn-emotion-chip"
                onClick={() => {
                  setIsHandsUp(!isHandsUp);
                  characterRef.current?.setHandsUp(!isHandsUp);
                }}
                title="Toggle Covering Eyes"
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
