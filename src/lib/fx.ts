import confetti from 'canvas-confetti';

export const reduceMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

const colors = ['#8F1538', '#F5B8CE', '#60318D', '#DCC5F2', '#FFF3EC'];

export const conf = (o: confetti.Options = {}) => {
  try { confetti({ disableForReducedMotion: true, colors, ...o }); } catch {}
};

export const boom = () => {
  conf({ particleCount: 140, spread: 100, origin: { y: 0.6 } });
  setTimeout(() => conf({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.7 } }), 200);
  setTimeout(() => conf({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.7 } }), 350);
};

export const sparkle = () =>
  conf({ particleCount: 60, spread: 360, startVelocity: 20, ticks: 120, scalar: 0.9, origin: { x: 0.5, y: 0.4 }, shapes: ['star'] });

export const emojiBurst = (emoji: string, origin: { x: number; y: number }, count = 14) => {
  let shape: confetti.Shape | undefined;
  try { shape = confetti.shapeFromText({ text: emoji, scalar: 2 }); } catch {}
  conf({ particleCount: count, spread: 80, scalar: 2, gravity: 0.5, shapes: shape ? [shape] : ['circle'], origin });
};
