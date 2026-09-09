import { GazetteNav } from './GazetteNav';
import { useNews } from '../../hooks/useNews';
import { SmartLink } from '../shared/SmartLink';

interface GazetteSectionProps {
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string;
  isFullPage?: boolean;
}

export function GazetteSection({
  onSelectCategory,
  selectedCategory,
  isFullPage = false,
}: GazetteSectionProps) {
  const { featuredArticle, topicCards } = useNews();

  return (
    <section className="gazette-section" id="gazette">
      <div className="gazette-container">
        <div className="gazette-masthead">
          <div className="masthead-double-rule" />
          <div className="masthead-banner">
            <h2 className="masthead-title">The Computer Science Chronicle</h2>
          </div>
          <div className="masthead-single-rule" />

          <GazetteNav
            onSelectCategory={onSelectCategory}
            selectedCategory={selectedCategory}
          />
          <div className="masthead-single-rule" />
        </div>

        <div className="gazette-grid">
          <div className="gazette-main">
            <h3 className="section-heading">Featured News</h3>

            <div className="news-main-card">
              <div className="news-text-col">
                <span className="category-badge">{featuredArticle.category}</span>
                <h4 className="article-title">{featuredArticle.title}</h4>
                <div className="article-meta">
                  <span className="meta-date">{featuredArticle.date}</span>
                  <span className="meta-comments">
                    <i className="fa-regular fa-comment" /> {featuredArticle.comments}
                  </span>
                </div>
                <p className="article-excerpt">{featuredArticle.excerpt}</p>
              </div>

              <div className="news-media-col">
                <div className="article-image-box">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="news-img"
                  />
                </div>
                <p className="article-body-latin">{featuredArticle.body.slice(0, 200)}...</p>
              </div>
            </div>

            {!isFullPage && (
              <div className="gazette-footer-action">
                <SmartLink to="/news" className="btn-gazette-viewall">
                  View all <i className="fa-solid fa-arrow-right-long" />
                </SmartLink>
              </div>
            )}
          </div>

          <aside className="gazette-sidebar">
            <h3 className="section-heading">Topic</h3>

            <div className="topic-list">
              {topicCards.map((topic) => (
                <article className="topic-card" key={topic.title}>
                  <div className="topic-thumb">
                    <img loading="lazy" decoding="async" src={topic.image} alt={topic.alt} />
                  </div>
                  <div className="topic-details">
                    <h5 className="topic-title">{topic.title}</h5>
                  </div>
                </article>
              ))}

              <div className="topic-magazine-spread">
                <div className="magazine-stack">
                  <div className="mag-page p1">
                    <div className="mag-mini-header">The Day - News Magazine</div>
                    <div className="mag-mini-body">
                      <div className="mini-lines" />
                      <div className="mini-lines" />
                      <div className="mini-box" />
                    </div>
                  </div>
                  <div className="mag-page p2">
                    <div className="mini-pic" />
                    <div className="mini-lines" />
                  </div>
                  <div className="mag-page p3">
                    <div className="mag-mini-headline">THE DAILY CHRONICLE</div>
                    <div className="mini-cols">
                      <div />
                      <div />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
