import { useEffect, useRef } from 'react';
import { CONFIG } from '../config';
import { conf } from '../lib/fx';

export default function FinalCelebration() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) conf({ particleCount: 70, spread: 120, origin: { y: 0.4 } }); }, { threshold: 0.6 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section id="final" ref={ref} className="sec final bg4">
      <div className="big" aria-hidden="true">💖</div>
      <h2>{CONFIG.finalTitle}</h2>
      <p className="sub">{CONFIG.finalSub}</p>
      <p className="font-hand text-pink font-bold text-3xl">{CONFIG.finalNote}</p>
      <footer>Made with ❤️ Just For You</footer>
    </section>
  );
}
