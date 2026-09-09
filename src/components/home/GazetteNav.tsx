import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gazetteNavLinks } from '../../data/gazette';

interface GazetteNavProps {
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string;
}

export function GazetteNav({ onSelectCategory, selectedCategory }: GazetteNavProps) {
  const [internalActive, setInternalActive] = useState(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleCategoryClick = (label: string, index: number) => {
    setInternalActive(index);

    if (pathname !== '/news') {
      const targetCategory = label.toLowerCase();
      const targetUrl = label === 'All' ? '/news#newsFeed' : `/news?category=${encodeURIComponent(targetCategory)}#newsFeed`;
      navigate(targetUrl);
    } else {
      if (onSelectCategory) {
        onSelectCategory(label);
      }
      const feedElem = document.getElementById('newsFeed') || document.getElementById('broadsheetFeed');
      if (feedElem) {
        feedElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="gazette-nav-bar">
      <div className="gazette-category-links">
        {gazetteNavLinks.map((link, i) => {
          const isActive = selectedCategory
            ? selectedCategory.toLowerCase() === link.label.toLowerCase()
            : i === internalActive;

          return (
            <button
              type="button"
              className={`g-link${isActive ? ' active' : ''}`}
              key={link.label}
              onClick={() => handleCategoryClick(link.label, i)}
            >
              {link.label.toUpperCase()}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
