import { useEffect } from 'react';
import type { Photo } from '../config';
import { Media } from './MemoryGallery';

type Props = { photos: Photo[]; index: number; onClose: () => void; onIndex: (i: number) => void };

export default function PhotoLightbox({ photos, index, onClose, onIndex }: Props) {
  const n = photos.length;
  const go = (d: number) => onIndex((index + d + n) % n);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });
  return (
    <div id="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <button className="nav" style={{ top: 14, right: 14 }} onClick={onClose} aria-label="Close" autoFocus>✕</button>
      <button className="nav" style={{ left: 10 }} onClick={() => go(-1)} aria-label="Previous">‹</button>
      <Media key={index} photo={photos[index]} i={index} />
      <div id="lbc">{photos[index].caption}</div>
      <button className="nav" style={{ right: 10 }} onClick={() => go(1)} aria-label="Next">›</button>
    </div>
  );
}
