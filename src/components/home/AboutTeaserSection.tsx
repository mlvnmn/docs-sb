import { aboutContent } from '../../data/about';
import { SmartLink } from '../shared/SmartLink';

export function AboutTeaserSection() {
  // The data layer stores one combined title ("About Our Department") for the
  // /about page's single-heading hero; this card splits it into a small kicker
  // and a large heading instead of duplicating the copy.
  const [kicker, ...rest] = aboutContent.title.split(' ');
  const heading = rest.join(' ');

  return (
    <section className="about-teaser-section" id="about">
      <span className="about-teaser-glow" aria-hidden="true" />
      <span className="about-teaser-watermark" aria-hidden="true">
        DCS
      </span>

      <div className="about-teaser-card">
        <div className="about-teaser-content">
          <span className="about-teaser-kicker">{kicker}</span>
          <h2 className="about-teaser-title">{heading}</h2>
          <p className="about-teaser-text">{aboutContent.intro}</p>

          <SmartLink to="/faculty" className="about-teaser-link">
            Expert Faculties
            <i className="fa-solid fa-arrow-right" />
          </SmartLink>
        </div>

        <div className="about-teaser-image">
          <img src="/assets/images/sb_college_campus_mirrored.jpg" alt="St Berchmans College campus tower" />
        </div>
      </div>
    </section>
  );
}
