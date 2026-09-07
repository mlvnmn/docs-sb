export function HeroWave() {
  return (
    <div className="hero-wave-bottom" aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path
          className="wave-accent"
          d="M 1040,88 C 1150,88 1230,55 1310,28 C 1355,14 1400,5 1440,0 L 1440,105 L 1040,105 Z"
          fill="#213A8A"
        />
        <path
          className="wave-main"
          d="M 0,26 C 45,26 80,62 135,84 C 165,88 195,88 230,88 L 1160,88 C 1220,88 1280,72 1335,58 C 1375,48 1410,44 1440,42 L 1440,105 L 0,105 Z"
          fill="#101c56"
        />
      </svg>
    </div>
  );
}
