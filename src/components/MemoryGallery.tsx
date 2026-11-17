import { useEffect, useRef, useState } from 'react';
import { CONFIG, type Photo } from '../config';
import PhotoLightbox from './PhotoLightbox';

const HUES = [['#8F1538', '#F5B8CE'], ['#60318D', '#DCC5F2'], ['#64152F', '#F5B8CE'], ['#60318D', '#F5B8CE']];
const EMO = ['🌸', '💕', '🍒', '🎀', '✨', '🌷', '💖', '🦋'];
const STK = ['🍒', '💗', '🍓', '💜'];

// Shows the real photo if the file exists, otherwise an elegant placeholder.
export function Media({ photo, i }: { photo: Photo; i: number }) {
  const [ok, setOk] = useState(false);
  const h = HUES[i % 4];
  return (
    <div className="ph" style={{ ['--c1' as any]: h[0], ['--c2' as any]: h[1] }}>
      {!ok && EMO[i % 8]}
      <img src={photo.src} alt={photo.alt} loading="lazy" style={{ display: ok ? 'block' : 'none' }} onLoad={() => setOk(true)} onError={() => setOk(false)} />
    </div>
  );
}

function Polaroid({ photo, i, onOpen }: { photo: Photo; i: number; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <button ref={ref} className={`pol ${seen ? 'in' : ''}`} data-s={STK[i % 4]} aria-label={`Open photo: ${photo.alt}`}
      style={{ ['--r' as any]: `${((i * 37) % 9) - 4}deg`, transitionDelay: `${(i % 4) * 0.1}s` }} onClick={onOpen}>
      <Media photo={photo} i={i} />
      <span className="cap">{photo.caption}</span>
    </button>
  );
}

export default function MemoryGallery() {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <section id="gallery" className="sec bg2">
      <h2>Little Moments, Beautiful Memories</h2>
      <p className="sub">Every picture tells a story, and every memory is worth keeping.</p>
      <div className="grid2">
        {CONFIG.photos.map((p, i) => <Polaroid key={i} photo={p} i={i} onOpen={() => setIdx(i)} />)}
      </div>
      {idx !== null && <PhotoLightbox photos={CONFIG.photos} index={idx} onIndex={setIdx} onClose={() => setIdx(null)} />}
    </section>
  );
}
