export function GeometricArt() {
  return (
    <div className="geometric-art" aria-hidden="true">
      <svg viewBox="0 0 420 265" fill="none" xmlns="http://www.w3.org/2000/svg" className="geometric-svg">
        <rect x="15" y="15" width="115" height="52" rx="26" fill="#F46A9E" />

        <path
          d="M 155,42 C 155,30 165,20 175,20 C 188,20 195,30 195,42 C 195,58 180,68 165,68 C 145,68 135,52 135,36"
          stroke="#4B8BF5"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        <circle cx="230" cy="42" r="38" fill="#4B8BF5" />

        <g fill="#93C5FD" opacity="0.75">
          <circle cx="320" cy="20" r="2.5" />
          <circle cx="335" cy="20" r="2.5" />
          <circle cx="350" cy="20" r="2.5" />
          <circle cx="365" cy="20" r="2.5" />
          <circle cx="320" cy="35" r="2.5" />
          <circle cx="335" cy="35" r="2.5" />
          <circle cx="350" cy="35" r="2.5" />
          <circle cx="365" cy="35" r="2.5" />
          <circle cx="320" cy="50" r="2.5" />
          <circle cx="335" cy="50" r="2.5" />
          <circle cx="350" cy="50" r="2.5" />
          <circle cx="365" cy="50" r="2.5" />
          <circle cx="320" cy="65" r="2.5" />
          <circle cx="335" cy="65" r="2.5" />
          <circle cx="350" cy="65" r="2.5" />
          <circle cx="365" cy="65" r="2.5" />
        </g>

        <rect x="25" y="100" width="100" height="100" rx="20" fill="#F59E0B" />

        <path d="M 160,100 A 50,50 0 0,1 160,200 Z" fill="#22C55E" />

        <g fill="#93C5FD" opacity="0.75">
          <circle cx="235" cy="115" r="2.5" />
          <circle cx="250" cy="115" r="2.5" />
          <circle cx="265" cy="115" r="2.5" />
          <circle cx="280" cy="115" r="2.5" />
          <circle cx="235" cy="130" r="2.5" />
          <circle cx="250" cy="130" r="2.5" />
          <circle cx="265" cy="130" r="2.5" />
          <circle cx="280" cy="130" r="2.5" />
          <circle cx="235" cy="145" r="2.5" />
          <circle cx="250" cy="145" r="2.5" />
          <circle cx="265" cy="145" r="2.5" />
          <circle cx="280" cy="145" r="2.5" />
        </g>

        <path d="M 310,105 C 310,80 375,80 375,105 L 375,170 C 375,190 310,190 310,170 Z" fill="#F59E0B" />

        <g transform="translate(75, 200)">
          <g className="starburst-spinner" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" opacity="0.85">
            <line x1="0" y1="-26" x2="0" y2="26" />
            <line x1="0" y1="-26" x2="0" y2="26" transform="rotate(22.5)" />
            <line x1="0" y1="-26" x2="0" y2="26" transform="rotate(45)" />
            <line x1="0" y1="-26" x2="0" y2="26" transform="rotate(67.5)" />
            <line x1="0" y1="-26" x2="0" y2="26" transform="rotate(90)" />
            <line x1="0" y1="-26" x2="0" y2="26" transform="rotate(112.5)" />
            <line x1="0" y1="-26" x2="0" y2="26" transform="rotate(135)" />
            <line x1="0" y1="-26" x2="0" y2="26" transform="rotate(157.5)" />
          </g>
        </g>

        <g stroke="#3B82F6" strokeWidth="1.2" fill="none" opacity="0.45">
          <circle cx="270" cy="200" r="12" />
          <circle cx="270" cy="200" r="22" />
          <circle cx="270" cy="200" r="32" />
          <circle cx="270" cy="200" r="42" />
          <circle cx="270" cy="200" r="52" />
        </g>

        <polygon points="340,225 375,155 410,225" fill="#F43F5E" />
      </svg>
    </div>
  );
}
