import { Link } from 'react-router-dom';
import { technologyCategories, getTechnologyAwardImageUrl, networkAwardIntro, networkParticipationCopy } from '../data/technology';
import { useNetworkRankings } from '../hooks/useNetworkRankings';

export function Technology() {
  const families = Array.from(new Set(technologyCategories.map((category) => category.family)));
  const { rankings: liveRankings, loading } = useNetworkRankings();
  return (
    <section className="page-section awards-division-page">
      <span className="eyebrow">Day 1 · Creator Innovation</span>
      <h1>Creator Innovation</h1>
      <p className="lead">{networkAwardIntro}</p>
      <div className="division-hero tech-division">
        <div><h2>How did this organization help creators?</h2><p>{networkParticipationCopy}</p></div>
        <div className="hero-actions">
          <Link className="primary-action" to="/technology/categories">Creator Innovation Categories</Link>
          <a className="secondary-action" href="https://network.certifyd.me/" target="_blank" rel="noreferrer">Learn more about the Certifyd Network</a>
        </div>
      </div>
      {families.map((family) => (
        <section className="content-section tight" key={family}>
          <div className="section-heading"><span className="eyebrow">{family}</span><h2>{family}</h2></div>
          <div className="category-strip">
            {technologyCategories.filter((category) => category.family === family).map((category) => (
              <Link className="large-category-tile" to={`/technology/categories/${category.slug}`} key={category.id}>
                {getTechnologyAwardImageUrl(category) ? <img className="category-award-image technology-award-image" src={getTechnologyAwardImageUrl(category)} alt="" loading="lazy" /> : null}
                <h3>{category.title}</h3><p>{category.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
      <section className="rankings-section">
        <div className="section-heading">
          <span className="eyebrow">Live recognition</span>
          <h2>{loading ? 'Eligible network candidates' : `${liveRankings.length} eligible network candidates`}</h2>
          <p className="muted">Hydrated from the Certifyd Network map. These are the current operator candidates with registered node status, advertised roles, and proof records.</p>
        </div>
        {loading ? <p className="muted">Loading network operators…</p> : null}
        <div className="ranking-grid innovation-ranking-grid operator-candidate-grid">
          {liveRankings.map((ranking, index) => (
            <article className="ranking-card technology-ranking-card operator-candidate-card" key={ranking.id}>
              <span className="status-pill ok">Candidate {index + 1} of {liveRankings.length}</span>
              <h3>{ranking.title}</h3>
              <p className="ranking-benefit">{ranking.source.methodology}</p>
              <div className="ranking-metric">
                <strong>{ranking.value}</strong>
                <span>{ranking.metricName}</span>
              </div>
              <small>{ranking.source.label} · {ranking.source.period} · Updated {ranking.source.lastUpdatedAt}</small>
            </article>
          ))}
        </div>
      </section>
      <section className="glass-card network-cta-card">
        <span className="eyebrow">Network participation</span>
        <h2>Run a node. Help creators publish, sell, and verify work.</h2>
        <div className="hero-actions">
          <a className="primary-action" href="https://network.certifyd.me/join" target="_blank" rel="noreferrer">Become a Node Operator</a>
          <a className="secondary-action" href="https://network.certifyd.me/" target="_blank" rel="noreferrer">View Network Map</a>
        </div>
      </section>
    </section>
  );
}
