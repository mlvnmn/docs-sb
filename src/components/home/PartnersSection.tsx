import { useRef, type CSSProperties } from 'react';
import { SmartLink } from '../shared/SmartLink';
import { usePartners } from '../../hooks/usePartners';
import { usePartnersKinetic } from '../../hooks/usePartnersKinetic';
import type { Recruiter } from '../../types/content';

/*
 * Homepage "OUR PARTNERS" — a kinetic type wall on a white ground:
 *
 *   § PLACEMENTS · 13 PARTNERS                                          lede
 *   OUR PARTNERS
 *   ──────────────────────────────────────────────────────────────────────────
 *   ← 01 TCS ✦ 02 INFOSYS ✦ 03 AMAZON ✦ 04 DELOITTE ✦ 05 COGNIZANT ✦     (solid)
 *      06 WIPRO ✦ 07 ZOHO ✦ 08 UST ✦ 09 EY ✦ →                            (outlined)
 *   ← 10 FEDERAL BANK ✦ 11 SOUTH INDIAN BANK ✦ 12 ICT ACADEMY ✦ 13 …      (solid)
 *   ──────────────────────────────────────────────────────────────────────────
 *   13 companies · 05 sectors                               Partner with us →
 *
 * The names are the visual. Rows are CSS marquees in alternating directions
 * (paused on hover); GSAP shears them with scroll velocity. Hovering a name
 * turns it coral and a logo card trails the cursor (usePartnersKinetic).
 * Touch devices show a small logo inline after each name instead.
 */

const pad = (n: number) => String(n).padStart(2, '0');

// 13 names → 3 rows (5 / 4 / 4). Rows alternate solid / outlined and direction.
const ROW_SIZES = [5, 4, 4];

interface RowItem {
  partner: Recruiter;
  index: number; // 0-based position in the full list
}

function splitRows(partners: Recruiter[]): RowItem[][] {
  const rows: RowItem[][] = [];
  let cursor = 0;
  ROW_SIZES.forEach((size, r) => {
    const take = r === ROW_SIZES.length - 1 ? partners.length - cursor : size;
    rows.push(partners.slice(cursor, cursor + take).map((partner, i) => ({ partner, index: cursor + i })));
    cursor += take;
  });
  return rows;
}

export function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const partners = usePartners();
  const kinetic = usePartnersKinetic(sectionRef);

  const rows = splitRows(partners);
  const sectorCount = new Set(partners.map((p) => p.sector).filter(Boolean)).size;
  const current = kinetic.hovered !== null ? partners[kinetic.hovered] : null;

  const renderTrack = (items: RowItem[], clone: boolean) => (
    <div className={`partners-track${clone ? ' is-clone' : ''}`} aria-hidden={clone || undefined}>
      {items.map(({ partner, index }) => (
        <span className="partners-word-wrap" key={`${partner.name}-${clone ? 'b' : 'a'}`}>
          <button
            type="button"
            className={`partners-word${kinetic.hovered === index ? ' is-hot' : ''}`}
            tabIndex={clone ? -1 : 0}
            onMouseEnter={(e) => kinetic.onWordEnter(index, e)}
            onMouseMove={kinetic.onWordMove}
            onMouseLeave={kinetic.onWordLeave}
            onFocus={(e) => kinetic.onWordFocus(index, e)}
            onBlur={kinetic.onWordLeave}
            aria-label={`${partner.name}${partner.sector ? ` — ${partner.sector}` : ''}`}
          >
            <sup className="partners-word-index">{pad(index + 1)}</sup>
            <span className="partners-word-text">{partner.short ?? partner.name}</span>
            <img className="partners-word-logo" src={partner.logo} alt="" loading="lazy" decoding="async" />
          </button>
          <span className="partners-word-sep" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="partners-section" id="partners" ref={sectionRef} aria-labelledby="partners-heading">
      <div className="partners-container">
        <header className="partners-head">
          <div>
            <span className="partners-title-bar" aria-hidden="true" />
            <h2 className="partners-title" id="partners-heading">
              <span className="partners-title-line">
                <span className="partners-title-line-inner">Our</span>
              </span>
              <span className="partners-title-line">
                <span className="partners-title-line-inner partners-title-accent">Partners</span>
              </span>
            </h2>
          </div>

          <p className="partners-lede">
            The companies that hire from the Department of Computer Science — through campus drives, internships and
            placement programmes, season after season.
          </p>
        </header>
      </div>

      {/* ---- Kinetic rows (full-bleed) --------------------------------------- */}
      <div className="partners-wall" role="list" aria-label="Recruiting partners">
        {rows.map((items, r) => (
          <div
            className={`partners-row partners-row--${r % 2 ? 'outline' : 'solid'}${r % 2 ? ' partners-row--reverse' : ''}`}
            role="listitem"
            key={r}
            style={{ '--row-duration': `${34 + r * 7}s` } as CSSProperties}
          >
            <div className="partners-marquee">
              {renderTrack(items, false)}
              {renderTrack(items, true)}
            </div>
          </div>
        ))}
      </div>

      {/* ---- Cursor card ------------------------------------------------------ */}
      {/* Outer element is positioned by GSAP (x / y / rotation); the inner one
          owns the CSS show/hide transition so the two never fight over transform. */}
      <div className="partners-card" ref={kinetic.cardRef} aria-hidden="true">
        <div className={`partners-card-inner${current ? ' is-visible' : ''}`}>
          {current && (
            <>
              <div className="partners-card-logo">
                <img src={current.logo} alt="" />
              </div>
              <div className="partners-card-foot">
                <span className="partners-card-index">{pad(kinetic.hovered! + 1)}</span>
                <span className="partners-card-sector">{current.sector}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="partners-container">
        <div className="partners-foot">
          <p className="partners-foot-stats">
            <span className="partners-foot-stat">
              <span className="partners-foot-num">{pad(partners.length)}</span> companies
            </span>
            <span className="partners-foot-stat">
              <span className="partners-foot-num">{pad(sectorCount)}</span> sectors
            </span>
            <span className="partners-foot-stat partners-foot-stat--wide">Campus drives · Internships · Placements</span>
          </p>
          <SmartLink to="/#contact" className="partners-foot-link">
            Partner with us <span aria-hidden="true">→</span>
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
