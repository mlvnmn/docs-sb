import { SmartLink } from '../shared/SmartLink';
import { galleryPageCopy } from '../../data/gallery';

export function GalleryCta() {
  return (
    <section className="gallery-cta-bar">
      <div className="gallery-cta-left">{galleryPageCopy.ctaTitle}</div>
      <SmartLink to="/#contact" className="gallery-cta-right">
        {galleryPageCopy.ctaSub}
        <i className="fa-solid fa-arrow-right" />
      </SmartLink>
    </section>
  );
}
