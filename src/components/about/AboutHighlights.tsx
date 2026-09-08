import { aboutContent } from '../../data/about';

export function AboutHighlights() {
  return (
    <section className="about-highlights">
      <div className="about-highlights-container">
        <h2 className="about-section-heading">
          Highlights
          <span className="about-heading-underline" />
        </h2>

        <div className="about-highlights-grid">
          {aboutContent.highlights.map((highlight) => (
            <div className="gradient-border-card" key={highlight.id}>
              <div className="gradient-border-card-inner about-highlight-card">
                <span className="about-highlight-check">
                  <i className="fa-solid fa-check" />
                </span>
                <span className="about-highlight-text">{highlight.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
