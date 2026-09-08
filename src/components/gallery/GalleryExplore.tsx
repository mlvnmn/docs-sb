import { galleryFolders, galleryPageCopy } from '../../data/gallery';

export function GalleryExplore() {
  return (
    <section className="gallery-explore">
      <div className="gallery-explore-text">
        <span className="gallery-hero-eyebrow">{galleryPageCopy.exploreEyebrow}</span>
        <h2 className="gallery-section-title">{galleryPageCopy.exploreTitle}</h2>

        <div className="gallery-explore-pills">
          {galleryFolders.map((folder) => (
            <span className="gallery-pill" key={folder.id}>
              {folder.title}
            </span>
          ))}
        </div>

        <p className="gallery-section-body">{galleryPageCopy.exploreText}</p>

        <a href="#folders" className="gallery-hero-cta">
          {galleryPageCopy.exploreCta}
          <i className="fa-solid fa-arrow-right" />
        </a>
      </div>

      <div className="gallery-explore-image-wrap">
        <img src={galleryPageCopy.exploreImage} alt="Campus moment" className="gallery-explore-image" />
      </div>
    </section>
  );
}
