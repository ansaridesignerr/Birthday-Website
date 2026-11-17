type Props = { playing: boolean; volume: number; toggle: () => void; setVolume: (v: number) => void };

export default function MusicPlayer({ playing, volume, toggle, setVolume }: Props) {
  return (
    <div id="mp" className={playing ? 'on' : ''}>
      <button onClick={toggle} aria-label={playing ? 'Pause music' : 'Play music'}>{playing ? '❚❚' : '▶'}</button>
      <div className="eq" aria-hidden="true"><i /><i /><i /></div>
      <input id="vol" type="range" min={0} max={1} step={0.05} value={volume} onChange={(e) => setVolume(+e.target.value)} aria-label="Volume" />
    </div>
  );
}
