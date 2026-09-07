import { peopleTeaser } from '../../data/peopleTeaser';
import { StarRating } from '../shared/StarRating';
import { PeopleWave } from './PeopleWave';
import { SmartLink } from '../shared/SmartLink';

export function PeopleTeaserSection() {
  const [archPerson, landscapePerson] = peopleTeaser;

  return (
    <>
      <PeopleWave variant="top" />
      <section className="people-section" id="people">
        <div className="retro-star star-1">✦</div>
        <div className="retro-star star-2">✧</div>
        <div className="retro-star star-3">✦</div>
        <div className="retro-star star-4">✦</div>

        <div className="people-container">
          <h2 className="people-title">OUR PEOPLE</h2>

          <div className="people-grid">
            <div className="brutalist-card card-stephanie" style={{ textAlign: 'center' }}>
              <div className="card-accent-triangle triangle-left" />
              <div className="wireframe-globe globe-bottom" />

              <div className="person-photo-arch">
                <div className="arch-backdrop" style={{ background: archPerson.accentColor }} />
                <img
                  loading="lazy"
                  decoding="async"
                  src={archPerson.photo}
                  alt={archPerson.name}
                  className="person-img"
                />
              </div>

              <h4 className="person-name">{archPerson.name}</h4>

              <StarRating />

              <p className="person-quote">{archPerson.quote}</p>
            </div>

            <div className="brutalist-card card-salimon">
              <div className="wireframe-globe globe-top" />
              <div className="card-accent-triangle triangle-mid" />

              <div className="salimon-layout">
                <div className="salimon-photo-frame" style={{ borderColor: '#000', background: landscapePerson.accentColor }}>
                  <img
                    loading="lazy"
                    decoding="async"
                    src={landscapePerson.photo}
                    alt={landscapePerson.name}
                    className="salimon-img"
                  />
                </div>

                <div className="salimon-content">
                  <p className="salimon-quote">{landscapePerson.quote}</p>

                  <StarRating className="salimon-stars" />

                  <div className="salimon-badge-btn" style={{ background: landscapePerson.accentColor, color: '#fff' }}>
                    <span>{landscapePerson.name.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="people-view-all">
            <SmartLink to="/faculty" className="pixel-link">
              VIEW ALL -&gt;
              <div className="pixel-line" />
            </SmartLink>
          </div>
        </div>
      </section>

      <PeopleWave variant="bottom" />
    </>
  );
}
