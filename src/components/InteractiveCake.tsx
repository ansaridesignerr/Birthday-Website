import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config';
import { boom } from '../lib/fx';
import CandleFlame from './CandleFlame';

const NS = 'http://www.w3.org/2000/svg';

export default function InteractiveCake() {
  const svg = useRef<SVGSVGElement>(null);
  const smoke = useRef<SVGGElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const raf = useRef(0);
  const actx = useRef<AudioContext | null>(null);
  const [out, setOut] = useState(false);
  const [msg, setMsg] = useState('');
  const [micMsg, setMicMsg] = useState('');
  const n = CONFIG.candles;
  const xs = Array.from({ length: n }, (_, i) => (n === 1 ? 200 : 150 + i * (100 / (n - 1))));

  const stopMic = () => {
    cancelAnimationFrame(raf.current);
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
    actx.current?.close().catch(() => {});
    actx.current = null;
  };
  useEffect(() => stopMic, []);

  const blow = () => {
    if (out) return;
    setOut(true); stopMic(); setMicMsg('');
    const flames = svg.current!.querySelectorAll('.flame');
    gsap.to(flames, { scale: 0, opacity: 0, duration: 0.6, stagger: 0.08 });
    xs.forEach((cx, i) => {
      for (let k = 0; k < 3; k++) {
        const c = document.createElementNS(NS, 'circle');
        c.setAttribute('cx', String(cx)); c.setAttribute('cy', '55'); c.setAttribute('r', '4'); c.setAttribute('fill', '#fff');
        smoke.current!.appendChild(c);
        gsap.fromTo(c, { opacity: 0.55, attr: { cy: 55, r: 3 } },
          { opacity: 0, attr: { cy: 5 - k * 14, r: 12, cx: cx + (Math.random() * 24 - 12) }, duration: 2.2, delay: 0.2 + i * 0.08 + k * 0.25, ease: 'power1.out', onComplete: () => c.remove() });
      }
    });
    setMsg('May All Your Wishes Come True! ✨');
    boom();
  };
  useEffect(() => { if (msg) gsap.fromTo('.win', { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(2)' }); }, [msg]);

  const relight = () => {
    setOut(false); setMsg('');
    gsap.to(svg.current!.querySelectorAll('.flame'), { scale: 1, opacity: 1, duration: 0.5, stagger: 0.06 });
  };

  const useMic = async () => {
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      actx.current = new AC();
      const an = actx.current.createAnalyser(); an.fftSize = 512;
      actx.current.createMediaStreamSource(stream.current).connect(an);
      const d = new Uint8Array(an.fftSize); let hits = 0;
      setMicMsg('Listening… blow gently toward your microphone 🌬️');
      const tick = () => {
        an.getByteTimeDomainData(d);
        let s = 0; for (const v of d) s += ((v - 128) / 128) ** 2;
        hits = Math.sqrt(s / d.length) > 0.22 ? hits + 1 : 0;
        if (hits > 6) { blow(); return; }
        raf.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      setMicMsg('Microphone isn’t available — the button works perfectly too 💕');
    }
  };

  return (
    <section id="cake" className="sec bg2">
      <h2>Make a Wish!</h2>
      <p className="sub">Close your eyes, make a beautiful wish, and blow out your candles.</p>
      <svg ref={svg} className="cake" viewBox="0 0 400 330" role="img" aria-label="Birthday cake with candles">
        <ellipse cx="200" cy="312" rx="190" ry="14" fill="#0006" />
        <ellipse cx="200" cy="300" rx="185" ry="16" fill="#DCC5F2" />
        <rect x="42" y="215" width="316" height="85" rx="16" fill="#8F1538" />
        <path d="M42 232q20 26 40 0t40 0 40 0 40 0 40 0 40 0 40 0 36 0v-17H42z" fill="#F5B8CE" />
        <rect x="42" y="268" width="316" height="10" fill="#60318D" />
        <rect x="82" y="150" width="236" height="70" rx="14" fill="#F5B8CE" />
        <path d="M82 166q20 24 39 0t39 0 39 0 39 0 39 0 39 0v-16H82z" fill="#DCC5F2" />
        <rect x="82" y="196" width="236" height="9" fill="#8F1538" />
        <rect x="122" y="92" width="156" height="62" rx="12" fill="#8F1538" />
        <path d="M122 108q16 22 32 0t32 0 32 0 32 0 30 0v-16H122z" fill="#FFF3EC" />
        <g>{xs.map((x, i) => <CandleFlame key={i} x={x} i={i} />)}</g>
        <g fontSize="26"><text x="68" y="212">🍒</text><text x="300" y="212">🍒</text><text x="146" y="146">🍓</text><text x="226" y="146">🍓</text><text x="186" y="287">🍒</text></g>
        <g fill="#FFF3EC"><circle cx="96" cy="300" r="7" /><circle cx="130" cy="300" r="7" /><circle cx="270" cy="300" r="7" /><circle cx="304" cy="300" r="7" /></g>
        <g ref={smoke} />
      </svg>
      <div className="win" aria-live="polite">{msg}</div>
      <div className="flex gap-3 flex-wrap justify-center">
        {!out && <button className="btn" onClick={blow}>Blow Out Candles 🌬️</button>}
        {!out && <button className="btn ghost" onClick={useMic}>Use Microphone 🎤</button>}
        {out && <button className="btn ghost" onClick={relight}>Light Candles Again 🕯️</button>}
      </div>
      <p className="sub !text-sm">{micMsg}</p>
    </section>
  );
}
