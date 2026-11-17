import { useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config';
import { emojiBurst } from '../lib/fx';

export default function BirthdayLetter() {
  const [open, setOpen] = useState(false);
  const card = useRef<HTMLDivElement>(null);

  const openLetter = () => {
    setOpen(true);
    requestAnimationFrame(() => gsap.fromTo(card.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'power3.out' }));
    emojiBurst('💗', { x: 0.5, y: 0.5 }, 18);
  };

  return (
    <section id="letter" className="sec bg3">
      <h2>A Little Letter For You</h2>
      <p className="sub">Some wishes are too special to fit into a simple birthday message.</p>
      <div className={`env ${open ? 'open' : ''}`} aria-hidden="true">
        <div className="back" /><div className="flap" /><div className="seal">❤️</div><div className="front" />
      </div>
      {!open && <button className="btn" onClick={openLetter}>Open Your Letter</button>}
      {open && <div ref={card} className="card" style={{ opacity: 0 }} role="region" aria-label="Your letter">{CONFIG.letter}</div>}
    </section>
  );
}
