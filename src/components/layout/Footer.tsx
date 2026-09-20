import {
  footerCollegeBranding,
  socialLinks,
  quickLinksColumn,
  resourcesColumn,
  footerContactInfo,
  copyrightText,
  creditText,
} from '../../data/footer';
import { SmartLink } from '../shared/SmartLink';

export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-container">
        <div className="footer-columns-grid">
          <div className="footer-col">
            <a
              href={footerCollegeBranding.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-college-banner"
            >
              <div className="f-crest-icon">
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://sbcollege.ac.in/wp-content/themes/sb/images/sb_contact.png"
                  alt="St Berchmans College Logo"
                  className="dept-logo-img-sm"
                />
              </div>
              <div>
                <h4 className="f-title">{footerCollegeBranding.title}</h4>
                <p className="f-sub-plain">{footerCollegeBranding.subText}</p>
                <span className="footer-visit-btn">
                  visit website <i className="fa-solid fa-up-right-from-square" />
                </span>
              </div>
            </a>

            <div className="footer-identity-divider" />
            <p className="col-text">Stay connected with the Department of Computer Science on social channels.</p>
            <div className="social-links-row">
              {socialLinks.map((s) => (
                <a href={s.href} className="social-icon" aria-label={s.label} key={s.label}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h5 className="col-heading">{quickLinksColumn.heading}</h5>
            <span className="col-heading-underline" aria-hidden="true" />
            <ul className="col-links">
              {quickLinksColumn.links.map((link) => (
                <li key={link.label}>
                  <SmartLink to={link.href}>
                    <span className="link-bullet">•</span> {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="col-heading">{resourcesColumn.heading}</h5>
            <span className="col-heading-underline" aria-hidden="true" />
            <ul className="col-links">
              {resourcesColumn.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>
                    <span className="link-bullet">•</span> {link.label}{' '}
                    {link.external && <span className="ext-icon">↗</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="col-heading">CONTACT INFO</h5>
            <span className="col-heading-underline" aria-hidden="true" />
            <ul className="contact-info-list">
              <li className="contact-item">
                <i className="fa-solid fa-location-dot contact-icon" />
                <div>
                  <span>
                    {footerContactInfo.address.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < footerContactInfo.address.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                  <p className="sub-contact-text">{footerContactInfo.addressSubText}</p>
                </div>
              </li>
              <li className="contact-item">
                <i className="fa-solid fa-phone contact-icon" />
                <span>{footerContactInfo.phone}</span>
              </li>
              {footerContactInfo.emails.map((email) => (
                <li className="contact-item" key={email}>
                  <i className="fa-solid fa-envelope contact-icon" />
                  <span>{email}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="copyright-text">{copyrightText}</p>
          <p className="credit-text">
            Designed and Developed by{' '}
            <a href={creditText.athlogixUrl} target="_blank" rel="noopener noreferrer" className="credit-athlogix">
              Athlogix
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
