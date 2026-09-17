import type { CSSProperties } from 'react';

export function WireframeGlobe({ style, size = 32 }: { style?: CSSProperties; size?: number }) {
  return (
    <div className="fg-decor" style={style}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="#161616" strokeWidth="1.5">
        <circle cx="20" cy="20" r="18" />
        <ellipse cx="20" cy="20" rx="9" ry="18" />
        <line x1="2" y1="20" x2="38" y2="20" />
        <line x1="5" y1="11" x2="35" y2="11" />
        <line x1="5" y1="29" x2="35" y2="29" />
      </svg>
    </div>
  );
}

export function SparkleDuo({ style }: { style?: CSSProperties }) {
  return (
    <div className="fg-decor fg-sparkle" style={style}>
      <span>✦</span>
      <span>✦</span>
    </div>
  );
}

export function PlusMarks({ className = '' }: { className?: string }) {
  return <div className={`fg-plusmarks ${className}`}>+ + + + +</div>;
}

export function FoldedCorner({
  color,
  style,
  points = '4,2 32,2 2,32',
  shadePoints = '4,2 18,16 2,32',
  size = 34,
}: {
  color: string;
  style?: CSSProperties;
  points?: string;
  shadePoints?: string;
  size?: number;
}) {
  return (
    <div className="fg-decor" style={style}>
      <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
        <polygon points={points} fill={color} stroke="#161616" strokeWidth="1.8" strokeLinejoin="round" />
        <polygon points={shadePoints} fill="#000" opacity="0.18" />
      </svg>
    </div>
  );
}
