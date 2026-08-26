import React, { useState, useRef } from 'react';
import RiveCharacter from '../components/RiveCharacter';
import confetti from 'canvas-confetti';
import { 
  Terminal, 
  KeyRound, 
  ShieldCheck, 
  Cpu, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Hash,
  Fingerprint,
  HardDrive,
  Activity
} from 'lucide-react';

export default function RockyLoginPage() {
  const [authMode, setAuthMode] = useState('credentials');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState(null);

  // Character interactive state
  const [isChecking, setIsChecking] = useState(false);
  const [lookValue, setLookValue] = useState(50);
  const [isHandsUp, setIsHandsUp] = useState(false);

  const characterRef = useRef(null);

  const handleInputGaze = (text) => {
    setIsChecking(true);
    setIsHandsUp(false);
    const look = Math.min(Math.max(text.length * 3 + 10, 10), 90);
    setLookValue(look);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthStatus(null);

    const isKeyValid = authMode === 'apikey' ? apiKey.length > 8 : (username && password.length >= 6);

    if (!isKeyValid) {
      setAuthStatus({
        type: 'error',
        message: authMode === 'apikey' ? 'ERR: Security Token must be at least 8 hex bytes.' : 'ERR: Invalid credentials. Password must be >= 6 chars.'
      });
      characterRef.current?.triggerFail();
      return;
    }

    setIsLoading(true);
    setIsHandsUp(false);
    setIsChecking(false);

    setTimeout(() => {
      setIsLoading(false);
      setAuthStatus({
        type: 'success',
        message: 'ROOT_ACCESS_GRANTED: Terminal session spawned.'
      });
      characterRef.current?.triggerSuccess();
      confetti({
        particleCount: 100,
        spread: 90,
        colors: ['#10b981', '#06b6d4', '#3b82f6']
      });
    }, 1100);
  };

  return (
    <div className="split-hero-layout">
      {/* Left: Terminal & Hardened Security Showcase */}
      <div className="hero-showcase-pane">
        <div className="hero-pill-tag" style={{ background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <Terminal size={14} color="#10b981" />
          <span style={{ color: '#6ee7b7' }}>Hardened Compiler CLI & Daemon</span>
        </div>

        <h1 className="hero-headline rocky">
          Bare-Metal Performance & <span>Isolated Execution</span>
        </h1>

        <p className="hero-subtext">
          Direct kernel-level sandbox allocation with hardware memory protection. Build multi-target binaries for x86_64, ARM64, and RISC-V with sub-millisecond overhead.
        </p>

        {/* Live Code Preview Terminal */}
        <div className="code-preview-window" style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
          <div className="terminal-titlebar">
            <div className="terminal-dots">
              <span className="terminal-dot" style={{ background: '#ef4444' }}></span>
              <span className="terminal-dot" style={{ background: '#f59e0b' }}></span>
              <span className="terminal-dot" style={{ background: '#10b981' }}></span>
            </div>
            <span className="terminal-filename" style={{ color: '#6ee7b7' }}>daemon://swaply-cluster-01.cpp</span>
            <span style={{ fontSize: '0.7rem', color: '#10b981' }}>● SECURE_VAULT</span>
          </div>
          <pre className="code-content-block">
            <code>
              <span className="code-keyword">#include</span> <span className="code-str">&lt;swaply/isolated_jit.hpp&gt;</span><br />
              <br />
              <span className="code-type">auto</span> <span className="code-fn">compile_native</span>(<span className="code-keyword">const</span> <span className="code-type">std::string</span>&amp; src) -&gt; <span className="code-type">CompiledBinary</span> &#123;<br />
              &nbsp;&nbsp;<span className="code-keyword">auto</span> sandbox = swaply::create_seccomp_jail();<br />
              &nbsp;&nbsp;<span className="code-keyword">auto</span> asm_out = sandbox.<span className="code-fn">emit_opt_v3</span>(src, <span className="code-num">0x03</span>);<br />
              &nbsp;&nbsp;<span className="code-comment">// Verified zero-fault memory bounds</span><br />
              &nbsp;&nbsp;<span className="code-keyword">return</span> asm_out.<span className="code-fn">link_static</span>();<br />
              &#125;
            </code>
          </pre>
        </div>

        {/* Telemetry Row */}
        <div className="telemetry-row">
          <div className="telemetry-pill" style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
            <Activity size={14} color="#10b981" />
            <span>Seccomp-BPF Jail</span>
          </div>
          <div className="telemetry-pill" style={{ borderColor: 'rgba(6, 182, 212, 0.2)' }}>
            <HardDrive size={14} color="#06b6d4" />
            <span>Zero-Copy Shared Memory</span>
          </div>
          <div className="telemetry-pill" style={{ borderColor: 'rgba(245, 158, 11, 0.2)' }}>
            <ShieldCheck size={14} color="#f59e0b" />
            <span>FIPS-140-3 Validated</span>
          </div>
        </div>
      </div>

      {/* Right: Rocky Interactive Card */}
      <div className="auth-card-container">
        <div className="login-glass-card" style={{
          border: '1px solid rgba(16, 185, 129, 0.3)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 50px -10px rgba(16, 185, 129, 0.25)',
          background: 'rgba(10, 18, 25, 0.85)'
        }}>
          {/* Telemetry Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.35rem 0.65rem',
            borderRadius: '8px',
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            marginBottom: '0.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: '#6ee7b7'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Terminal size={14} color="#10b981" />
              <span>sec-vault://swaply/core</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#10b981' }}>
              <ShieldCheck size={13} />
              <span>HARDENED</span>
            </div>
          </div>

          {/* Character Stage with Rocky */}
          <div className="character-stage">
            <div className="character-pedestal-glow" style={{ background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.5) 0%, transparent 70%)' }}></div>
            <RiveCharacter
              ref={characterRef}
              src="/25899-48398-rocky-interactive-character-for-a-login-form.riv"
              lookValue={lookValue}
              isChecking={isChecking}
              isHandsUp={isHandsUp}
              height={190}
            />
          </div>

          {/* Form Header */}
          <div className="auth-header">
            <h2 className="auth-title">Rocky Guard Auth</h2>
            <p className="auth-subtitle">High-performance compiler daemon & cluster authentication</p>
          </div>

          {/* Auth Mode Toggle */}
          <div style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '10px',
            padding: '3px',
            marginBottom: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <button
              type="button"
              onClick={() => { setAuthMode('credentials'); setIsHandsUp(false); }}
              style={{
                flex: 1,
                padding: '0.4rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: authMode === 'credentials' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                color: authMode === 'credentials' ? '#6ee7b7' : '#94a3b8',
                border: authMode === 'credentials' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <Fingerprint size={14} />
              <span>User & Key</span>
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('apikey'); setIsHandsUp(false); }}
              style={{
                flex: 1,
                padding: '0.4rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: authMode === 'apikey' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                color: authMode === 'apikey' ? '#6ee7b7' : '#94a3b8',
                border: authMode === 'apikey' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <KeyRound size={14} />
              <span>API Secret</span>
            </button>
          </div>

          {/* Status Alert */}
          {authStatus && (
            <div className={`status-msg-banner ${authStatus.type}`} style={{ fontFamily: 'var(--font-mono)' }}>
              {authStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{authStatus.message}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {authMode === 'credentials' ? (
              <>
                <div className="field-group">
                  <label className="field-label" htmlFor="rocky-user">Cluster Handle / User</label>
                  <div className="field-input-box">
                    <Hash size={16} className="field-input-icon" color="#10b981" />
                    <input
                      id="rocky-user"
                      type="text"
                      className="custom-input"
                      style={{ fontFamily: 'var(--font-mono)', borderColor: 'rgba(16, 185, 129, 0.25)' }}
                      placeholder="arch_compiler_01"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        handleInputGaze(e.target.value);
                      }}
                      onFocus={() => { setIsChecking(true); setIsHandsUp(false); }}
                      onBlur={() => setIsChecking(false)}
                      required
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label" htmlFor="rocky-pass">Secret Passphrase</label>
                  <div className="field-input-box">
                    <KeyRound size={16} className="field-input-icon" color="#10b981" />
                    <input
                      id="rocky-pass"
                      type={showSecret ? 'text' : 'password'}
                      className="custom-input"
                      style={{ fontFamily: 'var(--font-mono)', borderColor: 'rgba(16, 185, 129, 0.25)' }}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => { setIsChecking(false); setIsHandsUp(true); }}
                      onBlur={() => setIsHandsUp(false)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowSecret(!showSecret)}
                    >
                      {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="field-group">
                <label className="field-label" htmlFor="rocky-token">Compiler API Token (Bearer)</label>
                <div className="field-input-box">
                  <Cpu size={16} className="field-input-icon" color="#06b6d4" />
                  <input
                    id="rocky-token"
                    type={showSecret ? 'text' : 'password'}
                    className="custom-input"
                    style={{ fontFamily: 'var(--font-mono)', borderColor: 'rgba(6, 182, 212, 0.3)' }}
                    placeholder="sk_compiler_live_99f8c2..."
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      handleInputGaze(e.target.value);
                    }}
                    onFocus={() => { setIsChecking(true); setIsHandsUp(false); }}
                    onBlur={() => setIsChecking(false)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowSecret(!showSecret)}
                  >
                    {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary-auth"
              disabled={isLoading}
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #0d9488 50%, #0284c7 100%)',
                boxShadow: '0 4px 20px -2px rgba(16, 185, 129, 0.4)'
              }}
            >
              {isLoading ? (
                <>
                  <div className="spinner-anim"></div>
                  <span>Validating Node Signature...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Rocky Emotions HUD */}
          <div className="character-emotions-hud">
            <div className="emotions-header">
              <span>Rocky Reaction Controls</span>
              <span style={{ color: '#10b981' }}>Live Test</span>
            </div>
            <div className="emotions-buttons">
              <button
                type="button"
                className="btn-emotion-chip"
                onClick={() => characterRef.current?.triggerSuccess()}
              >
                🛡️ Success
              </button>
              <button
                type="button"
                className="btn-emotion-chip"
                onClick={() => characterRef.current?.triggerFail()}
              >
                ⚠️ Deny
              </button>
              <button
                type="button"
                className="btn-emotion-chip"
                onClick={() => {
                  setIsHandsUp(!isHandsUp);
                  characterRef.current?.setHandsUp(!isHandsUp);
                }}
              >
                🙈 Hide Face
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
