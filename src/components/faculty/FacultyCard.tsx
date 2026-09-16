import type { FacultyMember } from '../../types/content';
import { StarRating } from '../shared/StarRating';

interface FacultyCardProps {
  member: FacultyMember;
  eager?: boolean;
}

export function FacultyCard({ member, eager = false }: FacultyCardProps) {
  const { name, role, email, photo, accentColor, archetype } = member;
  const imgProps = eager ? {} : { loading: 'lazy' as const, decoding: 'async' as const };

  if (archetype === 'a') {
    return (
      <div className="brutalist-card faculty-card card-archetype-a">
        <i className="fa-solid fa-paper-plane card-accent-arrow arrow-top-right" style={{ color: accentColor }} />
        <div className="wireframe-globe globe-bottom-right" />

        <div className="person-photo-arch">
          <div className="arch-backdrop" style={{ background: accentColor }} />
          <img {...imgProps} src={photo} alt={name} className="person-img" />
        </div>

        <div className="card-body-content" style={{ textAlign: 'center' }}>
          <span className="faculty-role-badge" style={{ background: accentColor, color: '#fff' }}>
            {role}
          </span>
          <h3 className="person-name">{name}</h3>
          <p className="person-email">
            <i className="fa-solid fa-envelope" /> {email}
          </p>
          <StarRating />
        </div>
      </div>
    );
  }

  if (archetype === 'b') {
    return (
      <div className="brutalist-card faculty-card card-archetype-b">
        <i className="fa-solid fa-paper-plane card-accent-arrow arrow-left" style={{ color: accentColor }} />
        <div className="wireframe-globe globe-top-right" />

        <div className="landscape-layout">
          <div className="landscape-photo-frame" style={{ borderColor: '#000', background: accentColor }}>
            <img {...imgProps} src={photo} alt={name} className="landscape-img" />
          </div>

          <div className="landscape-content">
            <span className="faculty-role-badge" style={{ background: accentColor, color: '#fff' }}>
              {role}
            </span>
            <h3 className="person-name">{name}</h3>
            <p className="person-email">
              <i className="fa-solid fa-envelope" /> {email}
            </p>
            <StarRating />
            <div className="badge-tag-btn" style={{ background: accentColor, color: '#fff' }}>
              <span>{name.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (archetype === 'c') {
    return (
      <div className="brutalist-card faculty-card card-archetype-c">
        <i className="fa-solid fa-paper-plane card-accent-arrow arrow-top-left" style={{ color: accentColor }} />

        <div className="banner-photo-box" style={{ background: accentColor }}>
          <img {...imgProps} src={photo} alt={name} className="banner-img" />
          <span className="banner-role-tag" style={{ background: accentColor, color: '#fff' }}>
            {role}
          </span>
        </div>

        <div className="banner-content" style={{ textAlign: 'center', paddingTop: '0.8rem' }}>
          <h3 className="person-name">{name}</h3>
          <p className="person-email">
            <i className="fa-solid fa-envelope" /> {email}
          </p>
          <StarRating />
        </div>
      </div>
    );
  }

  return (
    <div className="brutalist-card faculty-card card-archetype-d">
      <div className="wireframe-globe globe-top-left" />
      <i className="fa-solid fa-paper-plane card-accent-arrow arrow-bottom-right" style={{ color: accentColor }} />

      <div className="avatar-center-header" style={{ textAlign: 'center' }}>
        <span className="faculty-role-badge" style={{ background: accentColor, color: '#fff', marginBottom: '0.8rem' }}>
          {role}
        </span>

        <div className="circle-avatar-box" style={{ borderColor: '#000' }}>
          <img {...imgProps} src={photo} alt={name} className="circle-img" />
        </div>

        <h3 className="person-name" style={{ marginTop: '0.6rem' }}>
          {name}
        </h3>
        <p className="person-email">
          <i className="fa-solid fa-envelope" /> {email}
        </p>
        <StarRating />
      </div>
    </div>
  );
}
