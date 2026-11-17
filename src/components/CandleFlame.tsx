type Props = { x: number; i: number };

export default function CandleFlame({ x, i }: Props) {
  return (
    <g>
      <rect x={x - 4} y={62} width={8} height={32} rx={2} fill={i % 2 ? '#60318D' : '#F5B8CE'} />
      <ellipse className="flame" cx={x} cy={50} rx={6} ry={12} fill="#ffd36b"
        style={{ filter: 'drop-shadow(0 0 8px #ffb347)', animationDelay: `-${i * 0.07}s` }} />
    </g>
  );
}
