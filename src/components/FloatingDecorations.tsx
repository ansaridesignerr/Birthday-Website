import { useMemo } from 'react';
import { reduceMotion } from '../lib/fx';

const EMOJI = ['💗', '🍒', '🎈', '✨', '💖', '🌸'];

export default function FloatingDecorations() {
  const items = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({
      e: EMOJI[i % 6], left: Math.random() * 96, size: 16 + Math.random() * 22,
      dur: 14 + Math.random() * 16, delay: Math.random() * 25,
    })), []);
  if (reduceMotion()) return null;
  return (
    <div id="fx" aria-hidden="true">
      {items.map((d, i) => (
        <span key={i} className="fl" style={{ left: `${d.left}%`, fontSize: d.size, animationDuration: `${d.dur}s`, animationDelay: `-${d.delay}s` }}>{d.e}</span>
      ))}
    </div>
  );
}
