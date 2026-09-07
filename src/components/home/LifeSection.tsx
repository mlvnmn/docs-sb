import { InfrastructurePanel } from './InfrastructurePanel';

export function LifeSection() {
  return (
    <section className="life-section" id="life">
      <div className="life-container">
        <div className="life-grid">
          <div className="life-content" />

          <div className="life-media">
            <InfrastructurePanel />
          </div>
        </div>
      </div>
    </section>
  );
}
