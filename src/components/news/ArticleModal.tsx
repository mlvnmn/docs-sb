import { useEffect } from 'react';
import type { NewsArticle } from '../../types/content';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div className="article-modal-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="article-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="article-modal-close" onClick={onClose} aria-label="Close article">
          <i className="fa-solid fa-xmark" />
        </button>

        <header className="article-modal-header">
          <span className="category-badge">{article.category}</span>
          <h2 className="article-modal-title">{article.title}</h2>
          <div className="article-meta">
            {article.author && <span className="meta-author"><i className="fa-regular fa-user" /> {article.author}</span>}
            <span className="meta-date"><i className="fa-regular fa-calendar" /> {article.date}</span>
            {article.readTime && <span className="meta-readtime"><i className="fa-regular fa-clock" /> {article.readTime}</span>}
            <span className="meta-comments">
              <i className="fa-regular fa-comment" /> {article.comments} Comments
            </span>
          </div>
        </header>

        {article.image && (
          <div className="article-modal-image-wrapper">
            <img src={article.image} alt={article.title} className="article-modal-img" />
          </div>
        )}

        <div className="article-modal-content">
          {article.body.split('\n\n').map((paragraph, index) => (
            <p key={index} className="article-modal-paragraph">
              {paragraph}
            </p>
          ))}
        </div>

        {article.tags && article.tags.length > 0 && (
          <footer className="article-modal-footer">
            <div className="article-tags">
              <span className="tags-label"><i className="fa-solid fa-tags" /> Tags:</span>
              {article.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="article-actions">
              <button
                className="btn-article-action"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: article.title, text: article.excerpt, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }
                }}
              >
                <i className="fa-solid fa-share-nodes" /> Share
              </button>
              <button className="btn-article-action" onClick={() => window.print()}>
                <i className="fa-solid fa-print" /> Print
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
