import type { FacultyMember } from '../../types/content';
import { PlusMarks } from './decorations';
import { Picture } from '../shared/Picture';

export function FacultyCardTallPhoto({
  member,
  wide = false,
  eager,
}: {
  member: FacultyMember;
  wide?: boolean;
  eager?: boolean;
}) {
  const { name, role, email, photo, accentColor } = member;
  const imgProps = eager ? {} : { loading: 'lazy' as const, decoding: 'async' as const };

  return (
    <div className={wide ? 'fg-card-extra-wide' : 'fg-card-wide'} data-purpose="card-tall-photo">
      <div className="fg-decor" style={{ bottom: '-8px', right: '8px' }}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <polygon points="28,2 4,16 26,28" fill={accentColor} stroke="#161616" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </div>
      <article className="fg-card fg-v-tall-photo">
        <div className={wide ? 'fg-tall-photo fg-tall-photo-wide' : 'fg-tall-photo'} style={{ background: accentColor }}>
          <Picture {...imgProps} src={photo} alt={name} className="fg-photo-img" />
        </div>
        <div className="fg-center">
          <p className="fg-para">{role}</p>
          <PlusMarks className="fg-center" />
          <h3 className="fg-name">{name}</h3>
          <p className="fg-email">
            <i className="fa-solid fa-envelope" /> {email}
          </p>
        </div>
      </article>
    </div>
  );
}
