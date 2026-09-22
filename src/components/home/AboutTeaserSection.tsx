import { useRef } from 'react';
import { aboutContent } from '../../data/about';
import { SmartLink } from '../shared/SmartLink';
import { useAboutTeaserReveal } from '../../hooks/useAboutTeaserReveal';
import { Picture } from '../shared/Picture';

const TOWER_SRC = '/assets/images/brand/tower-lineart.png';
const WATERMARK_SRC = '/assets/images/brand/dcs-watermark.png';

// Figma frame is a fixed 1900x912 canvas; every absolutely-positioned layer
// below is converted to a % of that canvas (left/width as % of 1900, top/
// height as % of 912) so .about-v2-frame's `aspect-ratio: 1900 / 912` keeps
// them all in the same relative spot at any viewport width.
export function AboutTeaserSection() {
  // The data layer stores one combined title ("About Our Department"); this
  // section renders it as two lines — all words but the last solid, the last
  // word outlined — matching the "Our Partners" heading treatment.
  const titleWords = aboutContent.title.split(' ');
  const headingFirstLine = titleWords.slice(0, -1).join(' ');
  const headingSecondLine = titleWords[titleWords.length - 1];
  const sectionRef = useRef<HTMLElement | null>(null);
  useAboutTeaserReveal(sectionRef);

  return (
    <section className="about-v2-section" id="about" ref={sectionRef}>
      <div className="about-v2-frame">
        <Picture className="about-v2-watermark" src={WATERMARK_SRC} alt="" aria-hidden="true" loading="lazy" decoding="async" />

        <div className="about-v2-content">
          <span className="about-v2-title-bar" aria-hidden="true" />
          <h2 className="about-v2-title">
            <span className="about-v2-title-line">
              <span className="about-v2-title-line-inner">{headingFirstLine}</span>
            </span>
            <span className="about-v2-title-line">
              <span className="about-v2-title-line-inner about-v2-title-accent">{headingSecondLine}</span>
            </span>
          </h2>
          <p className="about-v2-text">{aboutContent.teaserIntro}</p>

          <SmartLink to="/faculty" className="about-v2-link">
            Expert Faculties
            <i className="fa-solid fa-arrow-right" />
          </SmartLink>
        </div>

        <Picture className="about-v2-tower" src={TOWER_SRC} alt="St Berchmans College tower" loading="lazy" decoding="async" />
      </div>
    </section>
  );
}
