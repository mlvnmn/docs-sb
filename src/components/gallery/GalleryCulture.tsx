import { galleryPageCopy } from '../../data/gallery';

export function GalleryCulture() {
  return (
    <section className="gallery-culture">
      <div className="gallery-culture-text">
        <span className="gallery-hero-eyebrow">{galleryPageCopy.cultureEyebrow}</span>
        <h2 className="gallery-section-title">{galleryPageCopy.cultureTitle}</h2>
        <p className="gallery-section-body">{galleryPageCopy.cultureText}</p>
      </div>

      <div className="gallery-culture-images">
        <img src={galleryPageCopy.cultureImageA} alt="Lab session" className="gallery-culture-img-a" />
        <img src={galleryPageCopy.cultureImageB} alt="Department event" className="gallery-culture-img-b" />
      </div>
    </section>
  );
}
