import { useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { reduceMotion } from '../lib/fx';

type Props = { onOpen: () => void; onTouch: () => void };

export default function CurtainIntro({ onOpen, onTouch }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const L = useRef<HTMLDivElement>(null);
  const R = useRef<HTMLDivElement>(null);
  const T = useRef<HTMLDivElement>(null);
  const o = useRef({ v: 0 });
  const s = useRef({ drag: false, sx: 0, opened: false });
  const [grab, setGrab] = useState(false);
  const stars = useMemo(() => Array.from({ length: 40 }, () => ({ l: Math.random() * 100, t: Math.random() * 100, d: Math.random() * 3 })), []);

  const apply = () => {
    gsap.set(L.current, { xPercent: -o.current.v * 100 });
    gsap.set(R.current, { xPercent: o.current.v * 100 });
    gsap.set(T.current, { opacity: Math.max(0, 1 - o.current.v * 2.2) });
  };
  const to = (v: number, d: number, ease: string) =>
    gsap.to(o.current, { v, duration: d, ease, overwrite: true, onUpdate: apply, onComplete: () => { if (v === 1) onOpen(); } });
  const open = () => { if (s.current.opened) return; s.current.opened = true; to(1, reduceMotion() ? 0.01 : 1.5, 'power3.inOut'); };

  const down = (e: React.PointerEvent) => {
    if (s.current.opened) return;
    s.current.drag = true; s.current.sx = e.clientX; setGrab(true);
    root.current?.setPointerCapture(e.pointerId);
    onTouch();
  };
  const move = (e: React.PointerEvent) => {
    if (!s.current.drag || s.current.opened) return;
    const raw = Math.min(1, Math.abs(e.clientX - s.current.sx) / (window.innerWidth * 0.42));
    to(Math.pow(raw, 1.15) * 0.9, 0.35, 'power2.out'); // resistance: never reaches 100% by dragging alone
  };
  const up = () => {
    if (!s.current.drag || s.current.opened) return;
    s.current.drag = false; setGrab(false);
    if (o.current.v > 0.3) open(); else to(0, 0.9, 'elastic.out(1,.5)');
  };

  return (
    <div id="curtain" ref={root} className={grab ? 'grab' : ''} role="dialog" aria-label="Curtain: drag to open"
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
      {stars.map((st, i) => <i key={i} className="star" style={{ left: `${st.l}%`, top: `${st.t}%`, animationDelay: `-${st.d}s` }} />)}
      <div ref={L} className="panel pl" />
      <div ref={R} className="panel pr" />
      <div ref={T} className="ctext">
        <h1>A Little Surprise For You…</h1>
        <p className="sub">Something special is waiting behind these curtains.</p>
        <button className="handle" aria-label="Open curtain"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTouch(); open(); } }}>💗</button>
        <div className="hint">Grab and pull to reveal your surprise.</div>
      </div>
    </div>
  );
}
