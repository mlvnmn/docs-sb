import { aboutContent } from '../../data/about';
import { SmartLink } from '../shared/SmartLink';

export function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero-container">
        <div className="about-hero-copy">
          <h1 className="about-hero-title">{aboutContent.title}</h1>
          <span className="about-heading-underline about-heading-underline-left" />
          <p className="about-hero-intro">{aboutContent.intro}</p>

          <div className="about-hero-actions">
            <SmartLink to="/bcaacadamics" className="about-cta-btn">
              Academics
              <i className="fa-solid fa-arrow-right" />
            </SmartLink>
          </div>
        </div>

        <div className="about-hero-media">
          <span className="about-blob about-blob-blue about-blob-hero-tl" aria-hidden="true" />
          <span className="about-blob about-blob-pink about-blob-hero-br" aria-hidden="true" />
          <img
            className="about-hero-photo"
            src="/assets/images/about/computer-lab.jpg"
            alt="Students working in the department's computer lab"
            loading="eager"
          />
          <span className="about-hero-arrow" aria-hidden="true">
            <i className="fa-solid fa-angles-right" />
          </span>
          <span className="about-hero-script" aria-hidden="true">
            Learn
            <br />
            Build
            <br />
            Grow
          </span>
        </div>
      </div>
    </section>
  );
}
