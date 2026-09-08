import { Navigate, useParams } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { galleryFolders } from '../data/gallery';
import { SmartLink } from '../components/shared/SmartLink';
import { Footer } from '../components/layout/Footer';

export function GalleryFolder() {
  const { slug } = useParams<{ slug: string }>();
  const folder = galleryFolders.find((item) => item.slug === slug);

  useDocumentMeta(
    folder
      ? `${folder.title} | Gallery | Department of Computer Science`
      : 'Gallery | Department of Computer Science',
    folder?.description ?? 'Browse photos from the Department of Computer Science.',
  );

  if (!folder) {
    return <Navigate to="/gallery" replace />;
  }

  return (
    <div className="gallery-page">
      <span className="gallery-vertical-edge">ARCHIVE</span>
      <div className="gallery-stripes" aria-hidden="true" />

      <section className="gallery-folder-hero">
        <SmartLink to="/gallery" className="gallery-back-link">
          <i className="fa-solid fa-arrow-left" />
          Back to Gallery
        </SmartLink>
        <span className="gallery-hero-eyebrow">FOLDER</span>
        <h1 className="gallery-hero-title">{folder.title}</h1>
        <p className="gallery-hero-sub">{folder.description}</p>
      </section>

      <section className="gallery-photos-section">
        <div className="gallery-photos-grid">
          {folder.photos.map((photo, index) => (
            <div className="gallery-photo-card" key={photo + index}>
              <img src={photo} alt={`${folder.title} ${index + 1}`} loading={index === 0 ? undefined : 'lazy'} />
              <div className="gallery-photo-overlay" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
