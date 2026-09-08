import { galleryPageCopy } from '../../data/gallery';

export function GalleryHero() {
  return (
    <section className="gallery-hero-full">
      <span className="gallery-vertical-edge">OUR WORK</span>
      <div className="gallery-stripes" aria-hidden="true" />

      <div className="gallery-hero-grid">
        <div className="gallery-hero-text">
          <span className="gallery-hero-eyebrow">{galleryPageCopy.heroEyebrow}</span>
          <h1 className="gallery-hero-title">
            {galleryPageCopy.heroTitle.split('\n').map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className="gallery-hero-sub">{galleryPageCopy.heroSub}</p>
          <a href="#folders" className="gallery-hero-cta">
            {galleryPageCopy.heroCta}
            <i className="fa-solid fa-arrow-right" />
          </a>
        </div>

        <div className="gallery-hero-images">
          <div className="gallery-hero-img-main">
            <img src={galleryPageCopy.heroMainImage} alt="Department activity" />
          </div>
          <div className="gallery-hero-img-sub-a">
            <img src={galleryPageCopy.heroSubImageA} alt="Computer lab" />
          </div>
          <div className="gallery-hero-img-sub-b">
            <img src={galleryPageCopy.heroSubImageB} alt="Campus moment" />
          </div>
        </div>
      </div>
    </section>
  );
}
