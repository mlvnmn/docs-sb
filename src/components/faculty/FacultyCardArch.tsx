import type { FacultyMember } from '../../types/content';
import { WireframeGlobe, FoldedCorner, PlusMarks } from './decorations';
import { Picture } from '../shared/Picture';

export function FacultyCardArch({ member, eager }: { member: FacultyMember; eager?: boolean }) {
  const { name, role, email, photo, accentColor } = member;
  const imgProps = eager ? {} : { loading: 'lazy' as const, decoding: 'async' as const };

  return (
    <div className="fg-card-wide" data-purpose="card-vertical-arch">
      <FoldedCorner color={accentColor} style={{ top: '-14px', left: '16px' }} />
      <article className="fg-card fg-v-arch">
        <WireframeGlobe style={{ right: '-12px', top: '64px' }} />
        <div className="fg-arch-photo-wrap">
          <div className="fg-arch-photo" style={{ background: accentColor }}>
            <Picture {...imgProps} src={photo} alt={name} className="fg-photo-img" />
          </div>
        </div>
        <div>
          <span className="fg-kicker-tag">{role}</span>
          <h3 className="fg-name">{name}</h3>
          <PlusMarks />
          <p className="fg-email">
            <i className="fa-solid fa-envelope" /> {email}
          </p>
        </div>
      </article>
    </div>
  );
}
