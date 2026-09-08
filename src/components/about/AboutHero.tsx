import { aboutContent } from '../../data/about';
import { SmartLink } from '../shared/SmartLink';

export function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero-container">
        <span className="about-hero-badge">SINCE {aboutContent.since}</span>
        <h1 className="about-hero-title">{aboutContent.title}</h1>
        <p className="about-hero-intro">{aboutContent.intro}</p>

        <SmartLink to="/faculty" className="about-cta-btn">
          Meet Our Faculty
          <i className="fa-solid fa-arrow-right" />
        </SmartLink>
      </div>
    </section>
  );
}
