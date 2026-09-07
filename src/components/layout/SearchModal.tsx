import type { RefObject } from 'react';

const QUICK_TAGS = ['MCA Syllabus', 'BCA Admission', 'Faculty List', 'Lab Schedule'];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  onQuickTag: (text: string) => void;
}

export function SearchModal({ isOpen, onClose, inputRef, onQuickTag }: SearchModalProps) {
  return (
    <div
      className={`modal-overlay${isOpen ? ' active' : ''}`}
      id="searchModal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-container search-modal-box">
        <button className="modal-close" id="closeSearchModal" onClick={onClose}>
          &times;
        </button>
        <h3>Search CS Portal</h3>
        <div className="search-input-wrap">
          <i className="fa-solid fa-magnifying-glass" />
          <input
            type="text"
            placeholder="Search courses, faculty, announcements, syllabus..."
            id="searchInput"
            ref={inputRef}
          />
        </div>
        <div className="search-quick-tags">
          <span>Popular:</span>
          {QUICK_TAGS.map((tag) => (
            <button className="quick-tag" key={tag} onClick={() => onQuickTag(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
