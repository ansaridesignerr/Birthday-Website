import { useRef, useState } from 'react';
import gsap from 'gsap';
import { CONFIG } from '../config';
import { boom } from '../lib/fx';

export default function GiftReveal() {
  const root = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);

  const open = () => {
    if (opened) return;
    setOpened(true);
    const q = gsap.utils.selector(root);
    const t = gsap.timeline();
    t.to(q('.gift'), { x: 8, duration: 0.07, repeat: 9, yoyo: true, ease: 'none' })
      .to(q('.gift'), { x: 0, duration: 0.1 })
      .to(q('.bow'), { y: -40, rotation: 40, opacity: 0, duration: 0.5 }, '<')
      .to(q('.lid .rib'), { scaleX: 0, duration: 0.3 }, '<')
      .to(q('.lid'), { y: -70, rotation: -28, x: -30, duration: 0.7, ease: 'back.out(2)' })
      .to(q('.inside'), { opacity: 1, y: -60, duration: 0.6 }, '<')
      .call(boom, undefined, '<');
    requestAnimationFrame(() => gsap.fromTo(q('.gmsg'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, delay: 1.3 }));
  };

  return (
    <section id="gift" className="sec bg3" ref={root}>
      <h2>There’s One More Surprise!</h2>
      <p className="sub">Because you deserve a little extra magic today.</p>
      <div className="gift">
        <div className="inside">💌</div>
        <div className="box"><div className="rib" /></div>
        <div className="lid"><div className="rib" /><div className="bow">🎀</div></div>
      </div>
      {opened && <div className="gmsg" style={{ opacity: 0 }}>{CONFIG.gift}</div>}
      {!opened && <button className="btn" onClick={open}>Open Your Gift</button>}
    </section>
  );
}
