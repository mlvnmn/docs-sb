import { useEffect, useState } from 'react';
import { heroSlides } from '../../data/heroSlides';
import { useHeroSlideshow } from '../../hooks/useHeroSlideshow';

export function HeroSlideshow() {
  const { currentSlide, isPlaying, goToSlide, togglePlay } = useHeroSlideshow(heroSlides.length);

  // The progress-fill bar starts at width:0% and only animates to 100% (like a
  // video scrubber) once the "animating" class is applied on a frame AFTER the
  // 0% state has actually painted — adding it in the same render as the reset
  // gives the browser no "before" state to transition from, so it would just
  // snap straight to full. The double rAF forces that paint to happen first.
  const [fillAnimating, setFillAnimating] = useState(false);

  useEffect(() => {
    setFillAnimating(false);
    if (!isPlaying) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setFillAnimating(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [currentSlide, isPlaying]);

  return (
    <div className="hero-slider-card" id="heroSliderCard">
      <div className="hero-slides-wrapper">
        {heroSlides.map((slide, i) => (
          <div className={`hero-slide${i === currentSlide ? ' active' : ''}`} data-index={i} key={slide.image}>
            <img src={slide.image} alt={slide.alt} className="hero-slide-img" />
            <div className="hero-slide-overlay" />
            <div className={`hero-slide-content${slide.position ? ` pos-${slide.position}` : ''}`}>
              <h1 className="hero-slide-title">
                {slide.titleLines.map((line, li) => (
                  <span key={li}>
                    {line}
                    {li < slide.titleLines.length - 1 && <br />}
                  </span>
                ))}
              </h1>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-controls-widget">
        <div className="hero-counter" id="heroCounter">
          <span className="current-num">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="total-num">/{String(heroSlides.length).padStart(2, '0')}</span>
        </div>
        <div className="hero-dots-row">
          {heroSlides.map((slide, i) => (
            <span
              className={`hero-dot${i === currentSlide ? ' active' : ''}`}
              data-slide={i}
              key={slide.image}
              onClick={() => goToSlide(i)}
            />
          ))}
          <button className="hero-play-btn" id="heroPlayBtn" aria-label="Pause / Play Slideshow" onClick={togglePlay}>
            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} id="heroPlayIcon" />
          </button>
        </div>
      </div>

      <div className="hero-tabs-bar">
        {heroSlides.map((slide, i) => {
          let className = 'hero-tab-item';
          if (i < currentSlide) className += ' past';
          else if (i === currentSlide) className += ` active${fillAnimating ? ' animating' : ''}`;

          return (
            <button className={className} data-slide={i} key={slide.image} onClick={() => goToSlide(i)}>
              <div className="tab-progress-track">
                <div className="tab-progress-fill" key={`${i}-${currentSlide}`} />
              </div>
              <span className="tab-label">{slide.tabLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
