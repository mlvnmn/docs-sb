import { useLocation } from 'react-router-dom';
import { navLinks } from '../../data/navLinks';
import { useHeaderScroll } from '../../hooks/useHeaderScroll';
import { useMobileMenu } from '../../hooks/useMobileMenu';
import { SmartLink } from '../shared/SmartLink';

interface HeaderProps {
  onSearchOpen: () => void;
}

export function Header({ onSearchOpen }: HeaderProps) {
  const isScrolled = useHeaderScroll();
  const { isOpen: isMobileOpen, toggle: toggleMobile, close: closeMobile } = useMobileMenu();
  const { pathname } = useLocation();

  const isActive = (label: string) => {
    if (label === 'Home') return pathname === '/';
    if (label === 'Faculty') return pathname.startsWith('/faculty');
    if (label === 'Timeline') return pathname.startsWith('/timeline');
    if (label === 'About') return pathname.startsWith('/about');
    if (label === 'Gallery') return pathname.startsWith('/gallery');
    if (label === 'News') return pathname.startsWith('/news');
    return false;
  };

  // Clicking the logo/Home link while already on "/" is a same-page, no-op
  // navigation for react-router (no pathname or hash change), so it wouldn't
  // otherwise scroll anywhere — do that explicitly to match a normal "go home" click.
  const goHome = () => {
    closeMobile();
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="site-header"
      id="siteHeader"
      style={{
        boxShadow: isScrolled
          ? '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)'
          : '0 8px 30px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.03)',
        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
      }}
    >
      <div className="header-container">
        <SmartLink to="/" className="brand-logo" onClick={goHome}>
          <div className="logo-mark">
            <img
              src="/assets/images/dept_logo.jpeg"
              alt="Department of Computer Science Logo"
              className="dept-logo-img"
            />
          </div>
          <div className="brand-text">
            <span className="brand-title">Department of Computer Science</span>
            <span className="brand-sub">
              St Berchmans College <span className="badge-autonomous">Autonomous</span>
            </span>
          </div>
        </SmartLink>

        <nav className={`nav-menu${isMobileOpen ? ' mobile-open' : ''}`} id="navMenu">
          <ul className="nav-list">
            {navLinks.map((item) => (
              <li className="nav-item" key={item.label}>
                <SmartLink
                  to={item.href}
                  className={`nav-link${isActive(item.label) ? ' active' : ''}`}
                  onClick={item.label === 'Home' ? goHome : closeMobile}
                >
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button className="search-btn" id="searchBtn" aria-label="Search" onClick={onSearchOpen}>
            <i className="fa-solid fa-magnifying-glass" />
          </button>
          <SmartLink to="/#contact" className="btn-contact">
            Contact Us
          </SmartLink>
          <button
            className={`mobile-toggle${isMobileOpen ? ' active' : ''}`}
            id="mobileToggle"
            aria-label="Toggle Menu"
            onClick={toggleMobile}
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>
      </div>
    </header>
  );
}
