import { galleryPageCopy } from '../../data/gallery';
import { Picture } from '../shared/Picture';

export function GalleryCulture() {
  return (
    <section className="gallery-culture">
      <div className="gallery-culture-text">
        <span className="gallery-hero-eyebrow">{galleryPageCopy.cultureEyebrow}</span>
        <h2 className="gallery-section-title">{galleryPageCopy.cultureTitle}</h2>
        <p className="gallery-section-body">{galleryPageCopy.cultureText}</p>
      </div>

      <div className="gallery-culture-images">
        <Picture
          src={galleryPageCopy.cultureImageA}
          alt="Lab session"
          className="gallery-culture-img-a"
          loading="lazy"
          decoding="async"
        />
        <Picture
          src={galleryPageCopy.cultureImageB}
          alt="Department event"
          className="gallery-culture-img-b"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
