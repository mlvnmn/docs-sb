interface GalleryScrollBarProps {
  progress: number;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

export function GalleryScrollBar({ progress, onScrollLeft, onScrollRight }: GalleryScrollBarProps) {
  return (
    <footer className="fg-scrollbar-footer">
      <h2 className="fg-footer-title">
        <span className="fg-footer-title-word">Faculty</span>{' '}
        <span className="fg-footer-title-word fg-footer-title-accent">Directory</span>
      </h2>

      <div className="fg-footer-controls">
        <div className="fg-progress-track-wrap">
          <span className="fg-progress-label">Scroll Archive</span>
          <div className="fg-progress-track">
            <div className="fg-progress-fill" style={{ width: `${Math.max(progress, 8)}%` }} />
          </div>
          <span className="fg-progress-percent">{progress}%</span>
        </div>

        <div className="fg-arrow-group">
          <button aria-label="Scroll left" className="fg-arrow-btn" onClick={onScrollLeft}>
            &larr;
          </button>
          <button aria-label="Scroll right" className="fg-arrow-btn" onClick={onScrollRight}>
            &rarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
