import { galleryPageCopy } from '../../data/gallery';
import { Picture } from '../shared/Picture';

export function GalleryStory() {
  return (
    <section className="gallery-story">
      <div className="gallery-story-image-wrap">
        <div className="gallery-story-accent" aria-hidden="true" />
        <Picture
          src={galleryPageCopy.storyImage}
          alt="Campus"
          className="gallery-story-image"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="gallery-story-text">
        <span className="gallery-hero-eyebrow">{galleryPageCopy.storyEyebrow}</span>
        <h2 className="gallery-section-title">{galleryPageCopy.storyTitle}</h2>
        <p className="gallery-section-body">{galleryPageCopy.storyText}</p>
      </div>
    </section>
  );
}
