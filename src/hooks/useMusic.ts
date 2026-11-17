import { useCallback, useEffect, useRef, useState } from 'react';
import { CONFIG } from '../config';

const NOTES = [261.6, 329.6, 392, 523.3, 392, 329.6, 293.7, 349.2, 440, 587.3, 440, 349.2];

export function useMusic() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVol] = useState(0.5);
  const audio = useRef<HTMLAudioElement | null>(null);
  const mode = useRef<'file' | 'synth'>('file');
  const ctx = useRef<AudioContext | null>(null);
  const master = useRef<GainNode | null>(null);
  const timer = useRef<number>();
  const started = useRef(false);
  const vol = useRef(0.5);
  const want = useRef(false);

  const synth = () => {
    if (!ctx.current) {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      ctx.current = new AC();
      master.current = ctx.current.createGain();
      master.current.gain.value = vol.current * 0.5;
      master.current.connect(ctx.current.destination);
    }
    const c = ctx.current!;
    c.resume();
    clearInterval(timer.current);
    let i = 0;
    timer.current = window.setInterval(() => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'triangle';
      o.frequency.value = NOTES[i++ % NOTES.length];
      g.gain.setValueAtTime(0, c.currentTime);
      g.gain.linearRampToValueAtTime(0.35, c.currentTime + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 1.4);
      o.connect(g).connect(master.current!);
      o.start();
      o.stop(c.currentTime + 1.5);
    }, 550);
  };

  const play = useCallback(() => {
    want.current = true;
    setPlaying(true);
    if (mode.current === 'synth') return synth();
    if (!audio.current) {
      const a = new Audio(CONFIG.music);
      a.loop = true;
      a.volume = vol.current;
      a.onerror = () => { mode.current = 'synth'; if (want.current) synth(); };
      audio.current = a;
    }
    audio.current.play().catch(() => { mode.current = 'synth'; if (want.current) synth(); });
  }, []);

  const pause = useCallback(() => {
    want.current = false;
    setPlaying(false);
    audio.current?.pause();
    clearInterval(timer.current);
    ctx.current?.suspend();
  }, []);

  const start = useCallback(() => { if (started.current) return; started.current = true; play(); }, [play]);
  const toggle = useCallback(() => { started.current = true; want.current ? pause() : play(); }, [play, pause]);
  const setVolume = useCallback((v: number) => {
    vol.current = v; setVol(v);
    if (audio.current) audio.current.volume = v;
    if (master.current) master.current.gain.value = v * 0.5;
  }, []);

  useEffect(() => () => { clearInterval(timer.current); audio.current?.pause(); ctx.current?.close().catch(() => {}); }, []);
  return { playing, volume, start, toggle, setVolume };
}
