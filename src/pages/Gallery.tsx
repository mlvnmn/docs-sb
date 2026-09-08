import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { galleryFolders } from '../data/gallery';
import { GalleryHero } from '../components/gallery/GalleryHero';
import { GalleryStory } from '../components/gallery/GalleryStory';
import { GalleryExplore } from '../components/gallery/GalleryExplore';
import { GalleryFolderCard } from '../components/gallery/GalleryFolderCard';
import { GalleryCulture } from '../components/gallery/GalleryCulture';
import { GalleryCta } from '../components/gallery/GalleryCta';
import { Footer } from '../components/layout/Footer';

export function Gallery() {
  useDocumentMeta(
    'Gallery | Department of Computer Science | St Berchmans College Autonomous',
    'Browse photos from department activities, campus moments, and our computer labs.',
  );

  return (
    <div className="gallery-page">
      <GalleryHero />
      <GalleryStory />
      <GalleryExplore />

      <section className="gallery-folders-section" id="folders">
        <span className="gallery-hero-eyebrow gallery-folders-eyebrow">BROWSE THE ARCHIVE</span>
        <h2 className="gallery-section-title gallery-folders-title">Pick A Folder</h2>

        <div className="gallery-folders-grid">
          {galleryFolders.map((folder) => (
            <GalleryFolderCard folder={folder} key={folder.id} />
          ))}
        </div>
      </section>

      <GalleryCulture />
      <GalleryCta />

      <Footer />
    </div>
  );
}
