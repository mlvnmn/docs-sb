import { TimelineGridTexture } from './TimelineGridTexture';

export function TimelineHero() {
  return (
    <section className="tl-hero">
      <TimelineGridTexture patternId="tl-iso-grid-hero" />

      <div className="tl-hero-container">
        <h1 className="tl-hero-title">Our Milestones & Momentum</h1>

        <p className="tl-hero-sub">
          Trace the milestones that shaped the Department of Computer Science — from its founding batch to the
          research, infrastructure, and industry ties it holds today.
        </p>
      </div>
    </section>
  );
}
