import { aboutContent } from '../../data/about';

export function AboutStory() {
  const { story } = aboutContent;

  return (
    <section className="about-story">
      <div className="about-story-container">
        <div className="about-story-media">
          <span className="about-blob about-blob-blue about-blob-story-tl" aria-hidden="true" />
          <span className="about-blob about-blob-pink about-blob-story-br" aria-hidden="true" />
          <img src={story.image} alt="St Berchmans College campus" loading="lazy" decoding="async" />
        </div>

        <div className="about-story-copy">
          <span className="about-hero-badge">{story.eyebrow}</span>
          <h2 className="about-story-title">{story.title}</h2>
          {story.paragraphs.map((paragraph) => (
            <p className="about-story-text" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <span className="about-heading-underline about-heading-underline-left" />
        </div>
      </div>
    </section>
  );
}
