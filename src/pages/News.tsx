import { useState } from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { GazetteSection } from '../components/home/GazetteSection';
import { useNews } from '../hooks/useNews';
import { ArticleModal } from '../components/news/ArticleModal';
import { Footer } from '../components/layout/Footer';

export function News() {
  useDocumentMeta(
    'The Gazette & News | Department of Computer Science | St Berchmans College Autonomous',
    'Official Gazette and news publication of the Department of Computer Science at St Berchmans College Autonomous. In-depth reports, research dispatches, and campus chronicles.',
  );

  const {
    filteredArticles,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    activeArticle,
    openArticle,
    closeArticle,
    allArticles,
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

  // Dedicated sections for broadsheet layout
  const leadStory = allArticles[1] || allArticles[0];
  const secondaryStories = allArticles.slice(2, 4);
  const editorialArticles = allArticles.slice(4, 7);

  return (
    <div className="broadsheet-page-wrapper">
      {/* Front Page Glimpse Section (Same as Home Page) */}
      <GazetteSection
        isFullPage={true}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      <div className="broadsheet-container" id="newsFeed">


        {/* SECTION A: SPECIAL DISPATCH & LEAD ANALYSIS */}
        <section className="broadsheet-section-a">
          <div className="section-header-banner">
            <span className="section-banner-title">PAGE II — SPECIAL DISPATCH & IN-DEPTH REPORTS</span>
          </div>

          <div className="broadsheet-two-col">
            {/* Left Column: Lead Story */}
            <article className="lead-broadsheet-story" onClick={() => openArticle(leadStory)}>
              <span className="broadsheet-category-badge">{leadStory.category}</span>
              <h2 className="lead-story-title">{leadStory.title}</h2>
              <div className="broadsheet-byline">
                <span>BY {leadStory.author ? leadStory.author.toUpperCase() : 'EDITORIAL DESK'}</span>
                <span className="byline-sep">•</span>
                <span>{leadStory.date.toUpperCase()}</span>
                <span className="byline-sep">•</span>
                <span>{leadStory.readTime || '5 MIN READ'}</span>
              </div>

              <div className="lead-media-box">
                <img src={leadStory.image} alt={leadStory.title} className="lead-img" />
                <span className="image-caption">
                  Fig 1. Research laboratory & experimental apparatus at SB Department of Computer Science.
                </span>
              </div>

              <p className="lead-paragraph drop-cap">{leadStory.excerpt}</p>
              <p className="lead-body-preview">{leadStory.body.slice(0, 320)}...</p>

              <div className="broadsheet-read-more">
                <span>READ FULL DISPATCH</span> <i className="fa-solid fa-arrow-right-long" />
              </div>
            </article>

            {/* Right Column: Stacked Secondary Stories */}
            <aside className="broadsheet-secondary-col">
              <h3 className="column-heading">FEATURED CHRONICLES</h3>
              {secondaryStories.map((story) => (
                <article
                  className="secondary-broadsheet-card"
                  key={story.id}
                  onClick={() => openArticle(story)}
                >
                  <span className="broadsheet-category-badge">{story.category}</span>
                  <h4 className="secondary-story-title">{story.title}</h4>
                  <div className="broadsheet-byline small">
                    <span>{story.date.toUpperCase()}</span>
                    <span className="byline-sep">•</span>
                    <span>{story.comments} COMMENTS</span>
                  </div>
                  <div className="secondary-story-grid">
                    <img src={story.image} alt={story.title} className="secondary-thumb" />
                    <p className="secondary-excerpt">{story.excerpt}</p>
                  </div>
                  <div className="broadsheet-read-more small">
                    <span>READ STORY</span> <i className="fa-solid fa-angle-right" />
                  </div>
                </article>
              ))}
            </aside>
          </div>
        </section>

        {/* SECTION B: EDITORIAL & PERSPECTIVE COLUMNS */}
        <section className="broadsheet-section-b">
          <div className="section-header-banner">
            <span className="section-banner-title">PAGE III — EDITORIAL & FACULTY PERSPECTIVES</span>
          </div>

          <div className="broadsheet-three-col">
            {editorialArticles.map((article, idx) => (
              <article
                className="editorial-col-card"
                key={article.id}
                onClick={() => openArticle(article)}
              >
                <div className="col-num-badge">COL. 0{idx + 1}</div>
                <span className="broadsheet-category-badge">{article.category}</span>
                <h3 className="editorial-title">{article.title}</h3>
                <div className="broadsheet-byline small">
                  <span>BY {article.author ? article.author.toUpperCase() : 'EDITORIAL DESK'}</span>
                </div>
                <blockquote className="editorial-quote">
                  "{article.excerpt.slice(0, 110)}..."
                </blockquote>
                <p className="editorial-text">{article.body.slice(0, 180)}...</p>
                <div className="broadsheet-read-more small">
                  <span>CONTINUE READING</span> <i className="fa-solid fa-arrow-right" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION C: CONTINUOUS BROADSHEET GAZETTE GRID */}
        <section className="broadsheet-section-c">
          <div className="section-header-banner">
            <span className="section-banner-title">
              PAGE IV — THE GAZETTE FEED ({selectedCategory.toUpperCase()})
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
                    <img src={article.image} alt={article.title} className="grid-item-img" />
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
              <h4 className="empty-title">NO MATCHING DISPATCHES FOUND</h4>
              <p className="empty-desc">
                No newspaper articles match your search query "{searchQuery}" under {selectedCategory}.
              </p>
              <button
                className="btn-broadsheet-reset"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
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
