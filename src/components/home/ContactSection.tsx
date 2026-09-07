import { siteInfo } from '../../data/siteInfo';
import { GeometricArt } from './GeometricArt';
import { ContactForm } from './ContactForm';

export function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-blob blob-contact-left" aria-hidden="true" />
      <div className="contact-blob blob-contact-right" aria-hidden="true" />

      <div className="contact-container">
        <div className="contact-header">
          <div className="contact-header-left">
            <h2 className="contact-title">TALK TO US!</h2>
            <div className="contact-title-bar" />
            <p className="contact-desc">
              We're here to help! Reach out to us for any questions, collaborations, or general inquiries.
            </p>

            <div className="contact-connect-block">
              <h3 className="connect-heading">Connect with us</h3>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="info-badge">
                    <i className="fa-solid fa-phone" />
                  </div>
                  <a href={siteInfo.phoneHref} className="info-link">
                    {siteInfo.phone}
                  </a>
                </div>

                <div className="contact-info-item">
                  <div className="info-badge">
                    <i className="fa-solid fa-envelope" />
                  </div>
                  <a href={`mailto:${siteInfo.email}`} className="info-link">
                    {siteInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-header-right">
            <GeometricArt />
          </div>
        </div>

        <div className="contact-main-grid">
          <div className="contact-card-map">
            <div className="map-view-box">
              <iframe
                src={siteInfo.mapEmbedUrl}
                className="google-map-iframe"
                loading="lazy"
                allowFullScreen
                title="St Berchmans College Location Map"
              />
            </div>

            <div className="address-card-blue">
              <svg className="addr-ripple-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="160" cy="160" r="35" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                <circle cx="160" cy="160" r="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                <circle cx="160" cy="160" r="85" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <circle cx="160" cy="160" r="115" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
              </svg>

              <div className="addr-content-wrap">
                <div className="addr-header-row">
                  <div className="addr-icon-badge">
                    <i className="fa-solid fa-location-dot" />
                  </div>
                  <div className="addr-text-block">
                    <h4 className="addr-heading">Our Address</h4>
                    <p className="addr-lines">
                      {siteInfo.address.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < siteInfo.address.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="addr-action-row">
                  <a href={siteInfo.mapLinkUrl} target="_blank" rel="noopener noreferrer" className="view-map-link">
                    View on Google Maps <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
