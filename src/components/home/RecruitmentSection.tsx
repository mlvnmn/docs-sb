import { recruiters } from '../../data/recruiters';

// Eight logos scattered along the two arcs around the tower, closest-to-farthest
// from the center on each side (mirrors the reference's hand-placed orbit).
const leftLogos = [recruiters[0], recruiters[4], recruiters[5], recruiters[7]];
const rightLogos = [recruiters[1], recruiters[2], recruiters[3], recruiters[9]];

export function RecruitmentSection() {
  return (
    <section className="recruitment-section" id="partners">
      <div className="recruitment-arcs" aria-hidden="true" />

      <div className="recruitment-orbit">
        {leftLogos.map((r, i) => (
          <div className={`orbit-logo orbit-left-${i + 1}`} key={r.name}>
            <img loading="lazy" decoding="async" src={r.logo} alt={r.name} />
          </div>
        ))}
        {rightLogos.map((r, i) => (
          <div className={`orbit-logo orbit-right-${i + 1}`} key={r.name}>
            <img loading="lazy" decoding="async" src={r.logo} alt={r.name} />
          </div>
        ))}

        <svg className="recruitment-tower" viewBox="0 0 200 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <line x1="100" y1="6" x2="100" y2="26" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="4" r="3" stroke="currentColor" strokeWidth="1.5" />
          <rect x="90" y="26" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M78 40 L100 30 L122 40 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="82" y="40" width="36" height="26" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M70 66 L100 52 L130 66 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="66" y="66" width="68" height="60" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M100 76 a12 12 0 0 1 12 12 v10 h-24 v-10 a12 12 0 0 1 12 -12 Z" stroke="currentColor" strokeWidth="1.3" />
          <path d="M78 98 a8 8 0 0 1 8 8 v10 h-16 v-10 a8 8 0 0 1 8 -8 Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M122 98 a8 8 0 0 1 8 8 v10 h-16 v-10 a8 8 0 0 1 8 -8 Z" stroke="currentColor" strokeWidth="1.2" />
          <rect x="56" y="126" width="88" height="70" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M76 152 a10 10 0 0 1 10 10 v14 h-20 v-14 a10 10 0 0 1 10 -10 Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M124 152 a10 10 0 0 1 10 10 v14 h-20 v-14 a10 10 0 0 1 10 -10 Z" stroke="currentColor" strokeWidth="1.2" />
          <rect x="44" y="196" width="112" height="52" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M64 218 a12 12 0 0 1 12 12 v18 h-24 v-18 a12 12 0 0 1 12 -12 Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M100 218 a12 12 0 0 1 12 12 v18 h-24 v-18 a12 12 0 0 1 12 -12 Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M136 218 a12 12 0 0 1 12 12 v18 h-24 v-18 a12 12 0 0 1 12 -12 Z" stroke="currentColor" strokeWidth="1.2" />
          <line x1="40" y1="248" x2="160" y2="248" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="recruitment-heading">
        <span className="recruitment-kicker">Our Top</span>
        <h2 className="recruitment-title">Recruiting Partners</h2>
      </div>
    </section>
  );
}
