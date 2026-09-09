import { TimelineGridTexture } from '../timeline/TimelineGridTexture';
import { InfrastructurePanel } from './InfrastructurePanel';
import { TimelineTeaser } from './TimelineTeaser';

export function LifeSection() {
  return (
    <section className="life-section" id="life">
      <TimelineGridTexture patternId="life-iso-grid" />
      <div className="life-glow-blob blob-life-left" aria-hidden="true" />
      <div className="life-glow-blob blob-life-right" aria-hidden="true" />

      <div className="life-container">
        <div className="life-grid">
          <div className="life-content">
            <TimelineTeaser />
          </div>

          <div className="life-media">
            <InfrastructurePanel />
          </div>
        </div>
      </div>
    </section>
  );
}
