import { useState } from 'react';
import { gazetteNavLinks } from '../../data/gazette';

export function GazetteNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <nav className="gazette-nav">
      {gazetteNavLinks.map((link, i) => (
        <a
          href="#gazette"
          className={`g-link${i === activeIndex ? ' active' : ''}`}
          key={link.label}
          onClick={(e) => {
            e.preventDefault();
            setActiveIndex(i);
          }}
        >
          {link.label} {link.hasDropdown && <i className="fa-solid fa-chevron-down" />}
        </a>
      ))}
    </nav>
  );
}
