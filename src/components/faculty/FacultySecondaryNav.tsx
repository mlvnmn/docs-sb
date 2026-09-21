const LINKS = ['All', 'DOCS', 'AI&DS', 'MCA'];

export function FacultySecondaryNav() {
  return (
    <nav className="fg-secondary-nav" aria-label="Section navigation">
      {LINKS.map((label, i) => (
        <span key={label} className={`fg-secondary-nav-link${i === 0 ? ' fg-secondary-nav-link-active' : ''}`}>
          {i === 0 && <span className="fg-secondary-nav-dot" aria-hidden="true" />}
          {label.toUpperCase()}
        </span>
      ))}
    </nav>
  );
}
