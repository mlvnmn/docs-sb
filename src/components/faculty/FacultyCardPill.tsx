import type { FacultyMember } from '../../types/content';
import { FoldedCorner, PlusMarks } from './decorations';

export function FacultyCardPill({ member, eager }: { member: FacultyMember; eager?: boolean }) {
  const { name, role, email, photo, accentColor } = member;
  const imgProps = eager ? {} : { loading: 'lazy' as const, decoding: 'async' as const };

  return (
    <div className="fg-card-wide" data-purpose="card-vertical-portrait-pill">
      <FoldedCorner
        color={accentColor}
        points="2,2 30,10 8,32"
        shadePoints="2,2 16,16 8,32"
        style={{ top: '208px', left: '-14px' }}
      />
      <article className="fg-card fg-v-pill">
        <div className="fg-pill-photo-group">
          <div className="fg-pill-photo" style={{ background: accentColor }}>
            <img {...imgProps} src={photo} alt={name} className="fg-photo-img" />
          </div>
          <div className="fg-pill-badge" style={{ background: accentColor }}>
            <h3 className="fg-name">{name}</h3>
          </div>
        </div>
        <div>
          <PlusMarks className="fg-mt" />
          <p className="fg-para">{role}</p>
          <p className="fg-email">
            <i className="fa-solid fa-envelope" /> {email}
          </p>
        </div>
      </article>
    </div>
  );
}
