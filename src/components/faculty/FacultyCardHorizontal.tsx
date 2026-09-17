import type { FacultyMember } from '../../types/content';
import { WireframeGlobe, SparkleDuo, FoldedCorner, PlusMarks } from './decorations';

export function FacultyCardHorizontal({
  member,
  mirror = false,
  eager,
}: {
  member: FacultyMember;
  mirror?: boolean;
  eager?: boolean;
}) {
  const { name, role, email, photo, accentColor } = member;
  const imgProps = eager ? {} : { loading: 'lazy' as const, decoding: 'async' as const };

  const photoBlock = (
    <div className="fg-h-photo-wrap">
      <div className="fg-h-photo" style={{ background: accentColor }}>
        <img {...imgProps} src={photo} alt={name} className="fg-photo-img" />
      </div>
    </div>
  );

  const textBlock = (
    <div className="fg-h-content">
      <h3 className="fg-name">{name}</h3>
      <PlusMarks className="fg-small" />
      <p className="fg-para fg-small fg-clamp-2">{role}</p>
      <p className="fg-email fg-small">
        <i className="fa-solid fa-envelope" /> {email}
      </p>
    </div>
  );

  return (
    <article className="fg-card fg-v-horizontal" data-purpose={mirror ? 'card-horizontal-left' : 'card-horizontal-top'}>
      {mirror ? (
        <WireframeGlobe size={28} style={{ top: '-14px', right: '48px' }} />
      ) : (
        <>
          <FoldedCorner color={accentColor} points="2,2 26,6 8,26" shadePoints="2,2 14,10 8,26" size={28} style={{ top: '-14px', left: '48px' }} />
          <SparkleDuo style={{ top: '14px', right: '20px' }} />
        </>
      )}
      <div className="fg-h-row">
        {mirror ? textBlock : photoBlock}
        {mirror ? photoBlock : textBlock}
      </div>
    </article>
  );
}
