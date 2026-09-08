import { SmartLink } from '../shared/SmartLink';
import type { GalleryFolder } from '../../types/content';

interface GalleryFolderCardProps {
  folder: GalleryFolder;
}

export function GalleryFolderCard({ folder }: GalleryFolderCardProps) {
  return (
    <SmartLink to={`/gallery/${folder.slug}`} className="gallery-folder-card">
      <img src={folder.coverImage} alt={folder.title} className="gallery-folder-img" loading="lazy" />
      <div className="gallery-folder-overlay" />
      <span className="gallery-folder-vertical">{folder.title}</span>
      <span className="gallery-folder-more">
        View Folder
        <i className="fa-solid fa-arrow-right" />
      </span>
    </SmartLink>
  );
}
