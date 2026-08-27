import React, { useEffect, useRef, useState, useCallback } from "react";
import "../styles/OtpVerificationGyre.css";

/**
 * Clean Cyber HUD OTP Verification
 * - High-tech HUD Reticle Brackets [ ┌ ┐ └ ┘ ] that clamp shut on focus & lock.
 * - In-place Digital Phosphor Cipher Scramble with Horizontal Scanning Laser.
 * - Zero spinning or rotating elements. Ultra-clean, futuristic, and distraction-free.
 */
export default function OtpVerificationGyre({
  onSuccess,
  onCancel,
  targetIdentity = "+1 415 ••• 0142",
  expectedCode = "4719",
  cooldownSeconds = 30,
}) {
  const N = 4;
  const CIPHER_GLYPHS = [
    "0", "1", "A", "F", "X", "7", "#", "@", "$", "%", "§", "9", "C", "Ø", "µ", "Ж", "¥", "λ", "Ω", "&", "8", "E", "D", "3", "B", "K", "Z", "4", "Ψ", "∆", "⚡", "{", "}", ";", "<", ">", "π", "0x"
  ];

  const [state, setState] = useState("idle"); // idle | filling | checking | ok | error
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [displayDigits, setDisplayDigits] = useState(["", "", "", ""]);
  const [activeSlotIdx, setActiveSlotIdx] = useState(0);
  const [lockedSlots, setLockedSlots] = useState([false, false, false, false]);
  const [errorMessage, setErrorMessage] = useState("");
  const [liveMessage, setLiveMessage] = useState("");
  const [isSmsVisible, setIsSmsVisible] = useState(false);
  const [cooldown, setCooldown] = useState(cooldownSeconds);
  const [resendDisabled, setResendDisabled] = useState(true);

  const sheetRef = useRef(null);
  const canvasRef = useRef(null);
  const codeRef = useRef(null);
  const slotsRef = useRef([]);
  const inputsRef = useRef([]);
  const sparksRef = useRef([]);
  const burstRef = useRef(null);
  const shockwaveRef = useRef(null);
  const doneRef = useRef(null);
  const contRef = useRef(null);

  const runningAnimsRef = useRef([]);
  const runIdRef = useRef(0);
  const clearTimerRef = useRef(0);
  const coolTimerRef = useRef(0);
  const audioCtxRef = useRef(null);
  const noiseBufRef = useRef(null);

  // Audio Context initialization on user gesture
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        try {
          audioCtxRef.current = new AudioContextClass();
        } catch {
          audioCtxRef.current = null;
        }
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const getNoiseSource = useCallback((ctx) => {
    if (!noiseBufRef.current) {
      const len = Math.floor(ctx.sampleRate * 0.6);
      noiseBufRef.current = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = noiseBufRef.current.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    const src = ctx.createBufferSource();
    src.buffer = noiseBufRef.current;
    src.loop = true;
    return src;
  }, []);

  const playFoleyClick = useCallback(() => {
    const ctx = initAudio();
    if (!ctx) return;
    const t = ctx.currentTime;

    const hi = getNoiseSource(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 4400;
    bp.Q.value = 0.9;
    const gh = ctx.createGain();
    gh.gain.setValueAtTime(0.0001, t);
    gh.gain.exponentialRampToValueAtTime(0.12, t + 0.001);
    gh.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);
    hi.connect(bp).connect(gh).connect(ctx.destination);
    hi.start(t);
    hi.stop(t + 0.04);
  }, [initAudio, getNoiseSource]);

  const playCipherTick = useCallback(() => {
    const ctx = initAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sawtooth";
    const freq = 1400 + Math.random() * 2200;
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, t + 0.022);

    g.gain.setValueAtTime(0.045, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.022);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.025);
  }, [initAudio]);

  const playMechanicalLock = useCallback((slotIdx) => {
    const ctx = initAudio();
    if (!ctx) return;
    const t = ctx.currentTime;

    // Sub-bass heavy relay thud
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = "sine";
    const baseFreq = 180 + slotIdx * 50;
    sub.frequency.setValueAtTime(baseFreq, t);
    sub.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    subGain.gain.setValueAtTime(0.2, t);
    subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    sub.connect(subGain).connect(ctx.destination);
    sub.start(t);
    sub.stop(t + 0.16);

    // High metal snap click
    const click = getNoiseSource(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 3400 + slotIdx * 400;
    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.14, t);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    click.connect(filter).connect(clickGain).connect(ctx.destination);
    click.start(t);
    click.stop(t + 0.04);
  }, [initAudio, getNoiseSource]);

  const playTone = useCallback(
    (freq, dur, vol, type = "sine", at = 0) => {
      const ctx = initAudio();
      if (!ctx) return;
      const t = ctx.currentTime + at;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + dur + 0.02);
    },
    [initAudio]
  );

  const sndOk = useCallback(() => {
    playTone(523, 0.12, 0.08, "triangle");
    playTone(659, 0.14, 0.09, "sine", 0.07);
    playTone(784, 0.18, 0.09, "sine", 0.14);
    playTone(1046, 0.35, 0.1, "sine", 0.22);
  }, [playTone]);

  const sndErr = useCallback(() => {
    playTone(196, 0.16, 0.085, "sawtooth");
    playTone(147, 0.22, 0.065, "sawtooth", 0.09);
  }, [playTone]);

  const playAnim = (el, frames, opts) => {
    if (!el || !el.animate) return null;
    const a = el.animate(frames, opts);
    runningAnimsRef.current.push(a);
    return a;
  };

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const TAU = Math.PI * 2;

  // Background Interactive Circuit Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.offsetWidth || 440);
    let height = (canvas.height = canvas.offsetHeight || 160);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 440;
      height = canvas.height = canvas.offsetHeight || 160;
    };
    window.addEventListener("resize", handleResize);

    const pulses = [];
    for (let i = 0; i < 14; i++) {
      pulses.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Faint high-tech circuit bus line
      ctx.strokeStyle = "rgba(34, 197, 94, 0.1)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, height * 0.5);
      ctx.lineTo(width - 20, height * 0.5);
      ctx.stroke();

      // Energy particles
      pulses.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = state === "checking" ? "rgba(74, 222, 128, 0.8)" : "rgba(34, 197, 94, 0.35)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, TAU);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [state]);

  // Border charge animation on input
  const chargeSlot = (idx) => {
    const spark = sparksRef.current[idx];
    if (!spark) return;
    const arc = spark.querySelector(".slot__arc");
    if (!arc) return;
    spark.style.opacity = "1";
    playAnim(
      arc,
      [
        { strokeDasharray: "0.22 1", strokeDashoffset: "0", opacity: 1 },
        { strokeDasharray: "0.28 1", strokeDashoffset: "-0.5", opacity: 1, offset: 0.5 },
        { strokeDasharray: "0.08 1", strokeDashoffset: "-1.02", opacity: 0 },
      ],
      { duration: 360, easing: "cubic-bezier(0.2, 0.8, 0.4, 1)", fill: "forwards" }
    );
  };

  const triggerShockwave = () => {
    const sw = shockwaveRef.current;
    if (!sw) return;
    playAnim(
      sw,
      [
        { transform: "scale(0.3)", opacity: 1 },
        { transform: "scale(2.5)", opacity: 0 },
      ],
      { duration: 650, easing: "cubic-bezier(0.1, 0.9, 0.2, 1)", fill: "forwards" }
    );
  };

  const throwMotes = () => {
    const burst = burstRef.current;
    if (!burst) return;
    burst.replaceChildren();
    const count = 26;
    for (let i = 0; i < count; i++) {
      const m = document.createElement("span");
      m.className = "mote";
      burst.appendChild(m);

      const angle = (i / count) * TAU + (Math.random() - 0.5) * 0.25;
      const dist = 45 + Math.random() * 70;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;
      const delay = Math.random() * 70;

      playAnim(
        m,
        [
          { transform: "translate3d(0,0,0) scale(1)", opacity: 0.95, offset: 0 },
          { transform: `translate3d(${x * 0.6}px, ${y * 0.6}px, 0) scale(1.4)`, opacity: 0.9, offset: 0.35 },
          { transform: `translate3d(${x}px, ${y}px, 0) scale(0)`, opacity: 0, offset: 1 },
        ],
        { duration: 580 + Math.random() * 180, delay, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" }
      );
    }
  };

  // In-place Digital Phosphor Cipher Scrambler Sequence
  const runEncryptionCipher = async (codeStr) => {
    const currentRunToken = ++runIdRef.current;
    setState("checking");
    setIsSmsVisible(false);
    setLockedSlots([false, false, false, false]);

    const finalChars = codeStr.split("");
    const tempDisplay = [...finalChars];
    const totalSlots = N;
    const durationPerSlot = 300; // ms per slot scramble

    // Cascade each slot sequentially from left to right with in-place cipher scrambling
    for (let sIdx = 0; sIdx < totalSlots; sIdx++) {
      const startTime = Date.now();
      const scrambleInterval = 32;

      while (Date.now() - startTime < durationPerSlot) {
        if (currentRunToken !== runIdRef.current) return;

        for (let j = sIdx; j < totalSlots; j++) {
          tempDisplay[j] = CIPHER_GLYPHS[Math.floor(Math.random() * CIPHER_GLYPHS.length)];
        }
        setDisplayDigits([...tempDisplay]);

        playCipherTick();
        await wait(scrambleInterval);
      }

      // Lock current slot with target digit
      tempDisplay[sIdx] = finalChars[sIdx];
      setDisplayDigits([...tempDisplay]);

      setLockedSlots((prev) => {
        const next = [...prev];
        next[sIdx] = true;
        return next;
      });

      playMechanicalLock(sIdx);

      // Hydraulic slam & neon flare on the locked slot
      const sEl = slotsRef.current[sIdx];
      if (sEl) {
        playAnim(
          sEl,
          [
            { transform: "translateY(-4px) scale(1.1)", boxShadow: "0 0 35px #4ade80, inset 0 0 0 2px #86efac" },
            { transform: "translateY(2px) scale(0.97)", boxShadow: "0 0 20px #22c55e, inset 0 0 0 2px #4ade80" },
            { transform: "translateY(0) scale(1)", boxShadow: "0 0 16px rgba(34, 197, 94, 0.6), inset 0 0 0 2px #22c55e" },
          ],
          { duration: 260, easing: "cubic-bezier(0.2, 1.4, 0.35, 1)" }
        );
      }

      await wait(60);
    }

    if (currentRunToken !== runIdRef.current) return;

    // Final Lock-in & Shockwave
    if (sheetRef.current) sheetRef.current.dataset.locked = "";

    triggerShockwave();

    // Whole array electromagnetic pulse
    slotsRef.current.forEach((s) => {
      if (s) {
        playAnim(
          s,
          [
            { transform: "scale(1)", boxShadow: "0 0 12px rgba(34, 197, 94, 0.4)" },
            { transform: "scale(1.06)", boxShadow: "0 0 40px #4ade80, inset 0 0 0 2px #86efac" },
            { transform: "scale(1)", boxShadow: "0 0 16px rgba(34, 197, 94, 0.7)" },
          ],
          { duration: 400, easing: "cubic-bezier(0.2, 0.8, 0.4, 1)" }
        );
      }
    });

    await wait(360);

    setState("ok");
    setLiveMessage("Token compiled & verified. Access granted.");
    sndOk();
    throwMotes();

    if (onSuccess) onSuccess(expectedCode);
  };

  const handleFail = () => {
    setState("error");
    setErrorMessage("COMPILER ERROR: Token signature mismatch.");
    setLiveMessage("Compiler error: Token signature mismatch.");
    sndErr();

    inputsRef.current.forEach((el) => {
      if (el) {
        el.disabled = false;
        el.setAttribute("aria-invalid", "true");
      }
    });

    focusSlot(0);

    const token = ++runIdRef.current;
    clearTimerRef.current = setTimeout(async () => {
      if (token !== runIdRef.current) return;
      for (let i = N - 1; i >= 0; i--) {
        setDigits((prev) => {
          const next = [...prev];
          next[i] = "";
          return next;
        });
        setDisplayDigits((prev) => {
          const next = [...prev];
          next[i] = "";
          return next;
        });
        await wait(50);
      }
      setErrorMessage("");
      setState("filling");
      focusSlot(0);
    }, 950);
  };

  const checkCode = async (codeStr) => {
    setState("checking");
    setIsSmsVisible(false);
    inputsRef.current.forEach((el) => {
      if (el) el.disabled = true;
    });

    if (codeStr === expectedCode) {
      await runEncryptionCipher(codeStr);
    } else {
      await wait(450);
      handleFail();
    }
  };

  const focusSlot = (idx) => {
    setActiveSlotIdx(idx);
    const el = inputsRef.current[idx];
    if (el) el.focus();
  };

  const handleInputChange = (idx, e) => {
    playFoleyClick();
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      setDigits((prev) => {
        const next = [...prev];
        next[idx] = "";
        return next;
      });
      setDisplayDigits((prev) => {
        const next = [...prev];
        next[idx] = "";
        return next;
      });
      return;
    }

    if (val.length === 1) {
      setDigits((prev) => {
        const next = [...prev];
        next[idx] = val;
        return next;
      });
      setDisplayDigits((prev) => {
        const next = [...prev];
        next[idx] = val;
        return next;
      });
      chargeSlot(idx);
      setState("filling");

      if (idx < N - 1) {
        focusSlot(idx + 1);
      } else {
        const fullCode = digits.map((d, i) => (i === idx ? val : d)).join("");
        if (fullCode.length === N) checkCode(fullCode);
      }
    } else if (val.length >= N) {
      const chars = val.slice(0, N).split("");
      setDigits(chars);
      setDisplayDigits(chars);
      chars.forEach((_, i) => chargeSlot(i));
      checkCode(chars.join(""));
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      focusSlot(idx - 1);
    } else if (e.key === "ArrowLeft" && idx > 0) {
      focusSlot(idx - 1);
    } else if (e.key === "ArrowRight" && idx < N - 1) {
      focusSlot(idx + 1);
    } else if (e.key === "Escape") {
      reset();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasted.length >= N) {
      const chars = pasted.slice(0, N).split("");
      setDigits(chars);
      setDisplayDigits(chars);
      chars.forEach((_, i) => chargeSlot(i));
      checkCode(chars.join(""));
    }
  };

  const reset = () => {
    runIdRef.current++;
    clearTimeout(clearTimerRef.current);
    runningAnimsRef.current.forEach((a) => a.cancel());
    runningAnimsRef.current = [];

    slotsRef.current.forEach((s) => {
      if (s) {
        s.style.transform = "";
        s.style.opacity = "";
      }
    });

    if (sheetRef.current) delete sheetRef.current.dataset.locked;
    if (burstRef.current) burstRef.current.replaceChildren();

    setDigits(["", "", "", ""]);
    setDisplayDigits(["", "", "", ""]);
    setLockedSlots([false, false, false, false]);
    setErrorMessage("");
    setState("idle");
    focusSlot(0);
  };

  const handleFillDemo = () => {
    initAudio();
    setIsSmsVisible(false);
    const chars = expectedCode.split("");
    chars.forEach((ch, i) => {
      setTimeout(() => {
        setDigits((prev) => {
          const next = [...prev];
          next[i] = ch;
          return next;
        });
        setDisplayDigits((prev) => {
          const next = [...prev];
          next[i] = ch;
          return next;
        });
        chargeSlot(i);
        playFoleyClick();
        if (i === N - 1) {
          setTimeout(() => checkCode(expectedCode), 200);
        }
      }, i * 160);
    });
  };

  // Cooldown countdown
  useEffect(() => {
    coolTimerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(coolTimerRef.current);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(coolTimerRef.current);
  }, []);

  // Show autofill chip after short beat
  useEffect(() => {
    const t = setTimeout(() => {
      if (state === "idle" || state === "filling") {
        setIsSmsVisible(true);
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [state]);

  // Initial focus
  useEffect(() => {
    focusSlot(0);
  }, []);

  return (
    <div className="otp-gyre-container">
      <div className="room" aria-hidden="true" />
      <div className="crt-scanlines" aria-hidden="true" />

      <main className="stage">
        <header className="masthead">
          <p className="masthead__eyebrow">[ 2FA CRYPTOGRAPHIC AUTHENTICATION ]</p>
          <h1 className="masthead__title">
            SECURITY VERIFICATION <span className="masthead__ver">AES-256</span>
          </h1>
        </header>

        <section
          ref={sheetRef}
          className="sheet"
          data-state={state}
          data-msg={isSmsVisible ? "" : undefined}
          aria-label="Terminal 2FA verification"
        >
          {/* Electromagnetic Shockwave Ring */}
          <div className="crypto-shockwave" ref={shockwaveRef} aria-hidden="true" />

          {/* Terminal Window Header Bar */}
          <div className="terminal-header-bar">
            <div className="terminal-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="terminal-title">
              <span className="terminal-prompt">root@swaply-compiler:~#</span> 2fa-verify
            </div>
            <div className="terminal-status">
              <span className="status-live-dot" /> ENCRYPTED
            </div>
          </div>

          <form className="verify" onSubmit={(e) => e.preventDefault()} noValidate>
            <h2 className="verify__title" id="v-title">
              <span className="verify__title-in" data-title-idle>
                // ENTER ACCESS TOKEN
              </span>
              <span className="verify__title-in" data-title-ok>
                ⚡ ACCESS GRANTED // 0x00_OK
              </span>
            </h2>

            <p className="verify__sub" id="v-sub">
              <span className="verify__sub-in" data-sub-idle>
                Transmitted to <b>{targetIdentity}</b>
              </span>
              <span className="verify__sub-in" data-sub-ok>
                Cryptographic authentication complete.
              </span>
            </p>

            {/* Cipher Stage */}
            <div className="code-wrap">
              {/* Background Interactive Cyber Circuit Canvas */}
              <canvas ref={canvasRef} className="circuit-bus-canvas" />

              {/* Horizontal Precision Laser Scanline */}
              {state === "checking" && <div className="cipher-laser-sweep" />}

              {/* 4 Digit Memory Registers with HUD Target Reticles */}
              <div className="code" ref={codeRef} role="group" aria-labelledby="v-title">
                {[0, 1, 2, 3].map((idx) => (
                  <label
                    key={idx}
                    ref={(el) => (slotsRef.current[idx] = el)}
                    className={`slot ${digits[idx] ? "is-filled" : ""} ${lockedSlots[idx] ? "is-locked-slot" : ""} ${activeSlotIdx === idx && state !== "checking" && state !== "ok" ? "is-active-slot" : ""} ${state === "checking" && !lockedSlots[idx] ? "is-scrambling" : ""}`}
                  >
                    <span className="sr-only">Register {idx} of 4</span>

                    {/* HUD Corner Reticle Brackets [ ┌ ┐ └ ┘ ] */}
                    <span className="reticle-corner reticle-tl" aria-hidden="true" />
                    <span className="reticle-corner reticle-tr" aria-hidden="true" />
                    <span className="reticle-corner reticle-bl" aria-hidden="true" />
                    <span className="reticle-corner reticle-br" aria-hidden="true" />

                    {/* Compiler Memory Register Tag */}
                    <span className="slot-register-tag" aria-hidden="true">
                      {lockedSlots[idx] ? `R${idx}:OK` : `REG_0x${idx}`}
                    </span>

                    <input
                      ref={(el) => (inputsRef.current[idx] = el)}
                      className="slot__input"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={idx === 0 ? 4 : 1}
                      autoComplete={idx === 0 ? "one-time-code" : "off"}
                      value={digits[idx]}
                      onFocus={() => setActiveSlotIdx(idx)}
                      onChange={(e) => handleInputChange(idx, e)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      onPaste={handlePaste}
                      disabled={state === "checking" || state === "ok"}
                    />

                    {/* In-place Clean Digital Character Display */}
                    <div className="slot__char-window" aria-hidden="true">
                      <span className={`slot__digit-text ${lockedSlots[idx] ? "digit-locked" : ""} ${state === "checking" && !lockedSlots[idx] ? "digit-scrambling" : ""}`}>
                        {displayDigits[idx] || ""}
                      </span>
                    </div>

                    {/* Compiler JIT Bolt indicator on locked slots */}
                    {lockedSlots[idx] && (
                      <span className="slot-corner-bolt" aria-hidden="true">
                        ⚡
                      </span>
                    )}

                    <span className="slot__glow" aria-hidden="true" />
                    <svg
                      className="slot__spark"
                      ref={(el) => (sparksRef.current[idx] = el)}
                      viewBox="0 0 64 64"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <rect
                        className="slot__arc"
                        x="1"
                        y="1"
                        width="62"
                        height="62"
                        rx="15"
                        pathLength="1"
                        strokeLinecap="round"
                      />
                    </svg>
                  </label>
                ))}
              </div>

              {/* Burst Light Motes */}
              <div className="burst" ref={burstRef} aria-hidden="true" />
            </div>

            {/* Error Message */}
            <p className="verify__err" data-err>
              {errorMessage}
            </p>

            {/* Footer Actions */}
            <div className="verify__actions">
              <div className="verify__foot">
                <span className="verify__foot-label">// NO CODE?</span>
                <button
                  type="button"
                  className="resend"
                  disabled={resendDisabled}
                  onClick={() => {
                    setResendDisabled(true);
                    setCooldown(30);
                    setDigits(["", "", "", ""]);
                    setDisplayDigits(["", "", "", ""]);
                    setLockedSlots([false, false, false, false]);
                    setState("filling");
                    focusSlot(0);
                    setIsSmsVisible(true);
                  }}
                >
                  <span className="resend__label">
                    {resendDisabled ? `[ RESEND IN ${cooldown}s ]` : "[ RESEND TOKEN ]"}
                  </span>
                </button>
              </div>

              <div className="verify__done" ref={doneRef}>
                <button
                  type="button"
                  className="cta cta-compiler"
                  ref={contRef}
                  onClick={() => {
                    if (onSuccess) onSuccess(digits.join("") || expectedCode);
                    else reset();
                  }}
                >
                  [ ⚡ ENTER COMPILER WORKSPACE → ]
                </button>
              </div>
            </div>
          </form>

          {/* Transmission Autofill Chip */}
          <aside className={`sms ${isSmsVisible ? "is-in" : ""}`}>
            <span className="sms__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" focusable="false">
                <path
                  d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.3 9.3 0 0 1-2.6-.4L4 21l1.6-4a8.2 8.2 0 0 1-1.6-5A8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="sms__body">
              <span className="sms__from">TRANSMISSION // DECRYPTED OTP</span>
              <span className="sms__text">
                PASSCODE <b>[ {expectedCode} ]</b> READY FOR INJECTION
              </span>
            </span>
            <button type="button" className="sms__fill" onClick={handleFillDemo}>
              INJECT
            </button>
          </aside>
        </section>

        {onCancel && (
          <button onClick={onCancel} className="otp-back-btn">
            [ ← RETURN TO TERMINAL ]
          </button>
        )}
      </main>

      <p className="sr-only" role="status" aria-live="polite">
        {liveMessage}
      </p>
    </div>
  );
}
