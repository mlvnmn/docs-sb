import '../styles/routes/news.css';
import { useState } from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { GazetteSection } from '../components/news/GazetteSection';
import { useNews } from '../hooks/useNews';
import { ArticleModal } from '../components/news/ArticleModal';
import { Footer } from '../components/layout/Footer';
import { Picture } from '../components/shared/Picture';

export function News() {
  useDocumentMeta(
    'The Gazette & News | Department of Computer Science | St Berchmans College Autonomous',
    'Official Gazette and news publication of the Department of Computer Science at St Berchmans College Autonomous. In-depth reports, research dispatches, and campus chronicles.',
  );

  const {
    filteredArticles,
    selectedCategory,
    setSelectedCategory,
    activeArticle,
    openArticle,
    closeArticle,
  } = useNews();

  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setSubscribeStatus('Subscription Confirmed — Welcome to The Daily Chronicle Dispatch.');
    setSubscribeEmail('');
    setTimeout(() => setSubscribeStatus(null), 5000);
  };

  return (
    <div className="broadsheet-page-wrapper">
      {/* Front Page Glimpse Section (Same as Home Page) */}
      <GazetteSection
        isFullPage={true}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      <div className="broadsheet-container" id="newsFeed">


        {/* SECTION C: CONTINUOUS BROADSHEET GAZETTE GRID */}
        <section className="broadsheet-section-c">
          <div className="section-header-banner">
            <span className="section-banner-title">
              THE GAZETTE FEED ({selectedCategory.toUpperCase()})
            </span>
            <span className="story-count-tag">{filteredArticles.length} ARTICLES IN ARCHIVE</span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="broadsheet-grid-3col">
              {filteredArticles.map((article) => (
                <article
                  className="broadsheet-grid-item"
                  key={article.id}
                  onClick={() => openArticle(article)}
                >
                  <div className="grid-item-media">
                    <Picture
                      src={article.image}
                      alt={article.title}
                      className="grid-item-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="grid-item-content">
                    <span className="broadsheet-category-badge">{article.category}</span>
                    <h4 className="grid-item-title">{article.title}</h4>
                    <div className="broadsheet-byline micro">
                      <span>{article.date.toUpperCase()}</span>
                      <span className="byline-sep">•</span>
                      <span>{article.comments} COMMENTS</span>
                    </div>
                    <p className="grid-item-excerpt">{article.excerpt}</p>
                    <div className="broadsheet-read-more micro">
                      <span>READ STORY</span> <i className="fa-solid fa-angle-right" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="broadsheet-empty-state">
              <div className="empty-rule" />
              <i className="fa-regular fa-newspaper empty-icon" aria-hidden="true" />
              <h4 className="empty-title">NO NEWS YET</h4>
              <p className="empty-desc">
                There are no dispatches under {selectedCategory} yet. Check back soon.
              </p>
              <button
                className="btn-broadsheet-reset"
                onClick={() => {
                  setSelectedCategory('All');
                  document.getElementById('gazette')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                RETURN TO FRONT PAGE
              </button>
              <div className="empty-rule" />
            </div>
          )}
        </section>

        {/* SECTION D: GAZETTE CLASSIFIEDS & SUBSCRIPTION COUPON */}
        <section className="broadsheet-section-d">
          <div className="classifieds-wrapper">
            <div className="classifieds-col">
              <h4 className="classifieds-heading">CAMPUS NOTICES & DISPATCHES</h4>
              <ul className="classifieds-list">
                <li>
                  <strong>DEPARTMENT SEMINAR:</strong> Quantum Computing & NISQ Applications — March 15, 2025 @ Seminar Hall.
                </li>
                <li>
                  <strong>PLACEMENT NOTICE:</strong> Campus recruitment drive for Batch 2025 starts Feb 25. Check portal.
                </li>
                <li>
                  <strong>RESEARCH CALL:</strong> Submissions open for SB Journal of Computer Science (Vol. 12).
                </li>
                <li>
                  <strong>STUDENT CLUB:</strong> ACM Student Chapter meeting every Thursday at 4:00 PM in Lab 2.
                </li>
              </ul>
            </div>

            <div className="subscription-coupon">
              <div className="coupon-border">
                <span className="coupon-tag">GAZETTE SUBSCRIPTION ORDER</span>
                <h4 className="coupon-title">Receive The Gazette Dispatch</h4>
                <p className="coupon-desc">
                  Subscribe to receive print copies and digital editions of St Berchmans CS Chronicle directly.
                </p>
                <form className="coupon-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address..."
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    className="coupon-input"
                  />
                  <button type="submit" className="coupon-btn">
                    SUBSCRIBE NOW
                  </button>
                </form>
                {subscribeStatus && <div className="coupon-status">{subscribeStatus}</div>}
              </div>
            </div>
          </div>
        </section>

        {/* BROADSHEET COLOPHON */}
        <footer className="broadsheet-colophon">
          <div className="colophon-line" />
          <div className="colophon-details">
            <p>
              <strong>THE ST BERCHMANS COMPUTER SCIENCE GAZETTE</strong> • Published by the Department of Computer Science, St Berchmans College Autonomous, Changanasserry.
            </p>
            <p>
              Chief Editor: Department Faculty Board • Copy Editor: Student Publications Cell • ISSN 2455-9083 • All Rights Reserved.
            </p>
          </div>
          <div className="colophon-line" />
        </footer>
      </div>

      {/* Reading Modal */}
      <ArticleModal article={activeArticle} onClose={closeArticle} />

      {/* Main Website Footer */}
      <Footer />
    </div>
  );
}
