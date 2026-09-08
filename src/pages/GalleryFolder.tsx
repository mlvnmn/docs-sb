import { useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useGalleryReveal } from '../hooks/useGalleryReveal';
import { useGalleryParallax } from '../hooks/useGalleryParallax';
import { galleryFolders } from '../data/gallery';
import { SmartLink } from '../components/shared/SmartLink';
import { Footer } from '../components/layout/Footer';

// Repeating rhythm of tile sizes so the grid reads as a hand-built photo
// collage (mixed big/tall/wide tiles) rather than a uniform camera-roll.
const TILE_PATTERN = ['big', 'normal', 'tall', 'wide', 'normal'] as const;

// Stagger each tile's reveal delay so nearby tiles don't all animate at
// once, without depending on grid position (dense auto-flow reorders tiles).
const STAGGER_STEPS = 6;
const STAGGER_MS = 70;

export function GalleryFolder() {
  const { slug } = useParams<{ slug: string }>();
  const folder = galleryFolders.find((item) => item.slug === slug);
  const gridRef = useRef<HTMLDivElement>(null);
  useGalleryReveal(gridRef, folder?.photos.length ?? 0);
  useGalleryParallax(gridRef, folder?.photos.length ?? 0);

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
        <div className="gallery-photos-grid" ref={gridRef}>
          {folder.photos.map((photo, index) => {
            const size = TILE_PATTERN[index % TILE_PATTERN.length];
            const delay = (index % STAGGER_STEPS) * STAGGER_MS;
            return (
              <div
                className={`gallery-photo-card gallery-photo-card--${size}`}
                style={{ transitionDelay: `${delay}ms` }}
                key={photo + index}
              >
                <img src={photo} alt={`${folder.title} ${index + 1}`} loading={index === 0 ? undefined : 'lazy'} />
                <div className="gallery-photo-overlay" />
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
