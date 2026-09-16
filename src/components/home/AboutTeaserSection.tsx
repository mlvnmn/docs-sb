import { aboutContent } from '../../data/about';
import { SmartLink } from '../shared/SmartLink';

const TOWER_SRC = '/assets/images/about/tower-lineart.png';
const WATERMARK_SRC = '/assets/images/dcs-watermark.png';

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

  return (
    <section className="about-v2-section" id="about">
      <div className="about-v2-frame">
        <img className="about-v2-watermark" src={WATERMARK_SRC} alt="" aria-hidden="true" loading="lazy" decoding="async" />

        <div className="about-v2-content">
          <h2 className="about-v2-title">
            <span className="about-v2-title-line">
              <span className="about-v2-title-line-inner">{headingFirstLine}</span>
            </span>
            <span className="about-v2-title-line">
              <span className="about-v2-title-line-inner about-v2-title-accent">{headingSecondLine}</span>
            </span>
          </h2>
          <p className="about-v2-text">{aboutContent.intro}</p>

          <SmartLink to="/faculty" className="about-v2-link">
            Expert Faculties
            <i className="fa-solid fa-arrow-right" />
          </SmartLink>
        </div>

        <img className="about-v2-tower" src={TOWER_SRC} alt="St Berchmans College tower" loading="lazy" decoding="async" />
      </div>
    </section>
  );
}
