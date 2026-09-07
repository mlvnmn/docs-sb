import { HeroSlideshow } from './HeroSlideshow';
import { HeroWave } from './HeroWave';

export function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-card">
        <div className="hero-blob blob-pink hero-top-glow" aria-hidden="true" />
        <div className="hero-blob blob-blue hero-right-blue" aria-hidden="true" />
        <div className="hero-blob blob-green hero-bottom-green" aria-hidden="true" />
        <div className="hero-blob blob-yellow hero-left-yellow" aria-hidden="true" />

        <div className="hero-container">
          <HeroSlideshow />
        </div>
      </div>

      <HeroWave />
    </section>
  );
}
