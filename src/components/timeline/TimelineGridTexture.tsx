export function TimelineGridTexture({ patternId }: { patternId: string }) {
  return (
    <div className="tl-grid-texture" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={patternId} width="60" height="103.92" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
            <path
              d="M 60 0 L 0 34.64 L 0 69.28 L 60 103.92 L 120 69.28 L 120 34.64 Z"
              fill="none"
              stroke="#7093ff"
              strokeOpacity="0.3"
              strokeWidth="0.75"
            />
            <path d="M 0 34.64 L 60 69.28 L 120 34.64" fill="none" stroke="#7093ff" strokeOpacity="0.22" strokeWidth="0.75" />
            <path d="M 60 0 L 60 69.28" fill="none" stroke="#7093ff" strokeOpacity="0.16" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
