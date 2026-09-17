import { aboutContent } from '../../data/about';

const VARIANTS = ['pink', 'blue', 'teal', 'purple', 'amber'];

export function AboutHighlights() {
  return (
    <section className="about-highlights">
      <div className="about-highlights-container">
        <span className="about-section-eyebrow">WHY CHOOSE US</span>
        <h2 className="about-section-heading">
          Department Highlights
          <span className="about-heading-underline" />
        </h2>

        <div className="about-highlights-grid">
          {aboutContent.highlights.map((highlight, index) => {
            const variant = VARIANTS[index % VARIANTS.length];
            return (
              <div className="about-highlight-card" key={highlight.id}>
                <span className={`about-highlight-icon about-${variant}`}>
                  <i className={highlight.icon} />
                </span>
                <span className="about-highlight-body">
                  <span className="about-highlight-text">{highlight.text}</span>
                  <span className={`about-highlight-underline about-${variant}`} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
