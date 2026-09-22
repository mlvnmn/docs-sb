import type { FacultyMember } from '../../types/content';
import { WireframeGlobe, PlusMarks } from './decorations';
import { Picture } from '../shared/Picture';

export function FacultyCardCenterSplit({ member, eager }: { member: FacultyMember; eager?: boolean }) {
  const { name, role, email, photo, accentColor } = member;
  const imgProps = eager ? {} : { loading: 'lazy' as const, decoding: 'async' as const };

  return (
    <div className="fg-card-wide" data-purpose="card-circular-center-split">
      <div className="fg-decor" style={{ right: '-24px', top: '32px' }}>
        <svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="#161616" strokeWidth="1.5">
          <line x1="25" y1="2" x2="25" y2="48" />
          <line x1="2" y1="25" x2="48" y2="25" />
          <line x1="8" y1="8" x2="42" y2="42" />
          <line x1="8" y1="42" x2="42" y2="8" />
        </svg>
      </div>
      <article className="fg-card fg-v-split">
        <div className="fg-center">
          <span className="fg-kicker-tag">{role}</span>
          <PlusMarks className="fg-center fg-mt" />
        </div>
        <div className="fg-split-divider">
          <div className="fg-split-line" />
          <div className="fg-split-globe-badge">
            <WireframeGlobe size={16} style={{ position: 'static' }} />
          </div>
          <div className="fg-split-avatar" style={{ borderColor: accentColor }}>
            <Picture {...imgProps} src={photo} alt={name} className="fg-photo-img" style={{ borderRadius: '9999px' }} />
          </div>
        </div>
        <div className="fg-center">
          <h3 className="fg-name">{name}</h3>
          <p className="fg-email">
            <i className="fa-solid fa-envelope" /> {email}
          </p>
        </div>
      </article>
    </div>
  );
}
