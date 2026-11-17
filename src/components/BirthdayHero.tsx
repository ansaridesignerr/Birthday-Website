import { CONFIG } from '../config';
import { emojiBurst } from '../lib/fx';

const HEARTS = [
  { e: '💖', s: { left: '10%', top: '22%' } }, { e: '💗', s: { right: '12%', top: '30%', animationDelay: '-1s' } },
  { e: '🍒', s: { left: '18%', bottom: '24%', animationDelay: '-2s' } }, { e: '🌸', s: { right: '16%', bottom: '20%', animationDelay: '-3s' } },
];

export default function BirthdayHero() {
  return (
    <section id="hero" className="sec hero bg1">
      {HEARTS.map((h, i) => (
        <button key={i} className="hbtn" style={h.s} aria-label="Send a little love"
          onClick={(ev) => { const r = ev.currentTarget.getBoundingClientRect(); emojiBurst('💖', { x: (r.left + r.width / 2) / innerWidth, y: (r.top + r.height / 2) / innerHeight }); }}>{h.e}</button>
      ))}
      <p className="text-3xl m-0">🎀</p>
      <h1>{CONFIG.heroTitle}<em>{CONFIG.name}!</em></h1>
      <p className="sub">{CONFIG.heroSub}</p>
      <button className="btn" onClick={() => document.getElementById('cake')?.scrollIntoView({ behavior: 'smooth' })}>Let’s Celebrate 🎉</button>
      <div className="scroll" aria-hidden="true">⌄</div>
    </section>
  );
}
