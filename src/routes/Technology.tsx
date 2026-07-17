import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NetworkCandidateCard } from '../components/awards/NetworkCandidateCard';
import { technologyCategories, networkAwardIntro, networkParticipationCopy } from '../data/technology';
import { useNetworkRankings } from '../hooks/useNetworkRankings';

const heroVideos = [
  '/media/awards-hero-carousel-2.mp4',
  '/media/awards-hero-carousel-3.mp4',
  '/media/awards-hero-carousel-4.mp4',
  '/media/awards-hero-carousel-5.mp4',
  '/media/awards-hero-carousel-8.mp4',
  '/media/awards-hero-carousel-9.mp4',
  '/media/awards-hero-carousel-10.mp4',
  '/media/awards-hero-carousel-11.mp4',
];

export function Technology() {
  const [activeHeroVideo, setActiveHeroVideo] = useState(0);
  const families = Array.from(new Set(technologyCategories.map((category) => category.family)));
  const { rankings: liveRankings, loading } = useNetworkRankings();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveHeroVideo((current) => (current + 1) % heroVideos.length);
    }, 9000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className="awards-hero creator-hero technology-page-hero">
        <video
          key={heroVideos[activeHeroVideo]}
          className="hero-video"
          src={heroVideos[activeHeroVideo]}
          autoPlay
          muted
          loop
          playsInline
          poster="/media/awards-stage.webp"
          aria-hidden="true"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="hero-kicker">Day 1 · Creator Innovation</span>
          <h1>Creator<br />Innovation</h1>
          <p>Infrastructure. Identity. Discovery. Commerce.</p>
          <p className="hero-copy">{networkAwardIntro}</p>
          <p className="hero-copy">{networkParticipationCopy}</p>
          <div className="hero-actions">
            <Link className="primary-action" to="/technology/categories">Creator Innovation Categories</Link>
            <a className="secondary-action" href="https://network.certifyd.me/" target="_blank" rel="noreferrer">Learn more about the Certifyd Network</a>
          </div>
        </div>
        <aside className="hero-award-visual" aria-hidden="true">
          <img src="/media/certifyd-awards-modern-trophy.png?v=20260717-fixed-logo-v7" alt="" />
        </aside>
        <div className="hero-proof-strip" aria-label="Creator Innovation values">
          <div><span aria-hidden="true">⬡</span><strong>Network Proof</strong><small>Public infrastructure records</small></div>
          <div><span aria-hidden="true">♙</span><strong>Creator Access</strong><small>Services creators can use</small></div>
          <div><span aria-hidden="true">◎</span><strong>Reliable Discovery</strong><small>Reachable profiles and endpoints</small></div>
          <div><span aria-hidden="true">♕</span><strong>Commerce Ready</strong><small>Direct support and ownership</small></div>
        </div>
      </section>
      <section className="page-section awards-division-page technology-category-section">
        <div className="section-heading">
          <span className="eyebrow">Creator Innovation categories</span>
          <h2>Outstanding technical contribution to creator infrastructure.</h2>
        </div>
        {families.map((family) => (
          <section className="content-section tight award-category-section" key={family}>
            <div className="section-heading"><span className="eyebrow">{family}</span><h2>{family}</h2></div>
            <div className="category-strip">
              {technologyCategories.filter((category) => category.family === family).map((category) => (
                <Link className="large-category-tile text-category-tile" to={`/technology/categories/${category.slug}`} key={category.id}>
                  <span className="eyebrow">{category.family}</span>
                  <h3>{category.title}</h3><p>{category.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
        <section className="rankings-section">
          <div className="section-heading">
            <span className="eyebrow">Current technical candidates</span>
            <h2>{loading ? 'Eligible contributors' : `${liveRankings.length} eligible technical contributors`}</h2>
            <p className="muted">Sourced from the Certifyd Network map. Candidates are reviewed for registered service status, creator-facing capabilities, public availability, and documented technical contribution.</p>
          </div>
          {loading ? <p className="muted">Loading technical contributors…</p> : null}
          <div className="ranking-grid innovation-ranking-grid operator-candidate-grid">
            {liveRankings.map((ranking, index) => (
              <NetworkCandidateCard ranking={ranking} index={index} total={liveRankings.length} key={ranking.id} />
            ))}
          </div>
        </section>
        <section className="glass-card network-cta-card">
          <span className="eyebrow">Network participation</span>
          <h2>Run a service. Help creators publish, distribute, and sustain their work.</h2>
          <div className="hero-actions">
            <a className="primary-action" href="https://network.certifyd.me/join" target="_blank" rel="noreferrer">Become a Node Operator</a>
            <a className="secondary-action" href="https://network.certifyd.me/" target="_blank" rel="noreferrer">View Network Map</a>
          </div>
        </section>
      </section>
    </>
  );
}
