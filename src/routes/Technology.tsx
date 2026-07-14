import { Link } from 'react-router-dom';
import { technologyCategories, technicalRankings, getTechnicalProvider, networkAwardIntro, networkParticipationCopy } from '../data/technology';

export function Technology() {
  const families = Array.from(new Set(technologyCategories.map((category) => category.family)));
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
                <h3>{category.title}</h3><p>{category.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
      <section className="rankings-section">
        <div className="section-heading">
          <span className="eyebrow">Preview recognition</span>
          <h2>Founding node nominees.</h2>
          <p className="muted">Beatify Group and Certifyd Creator are the two active network nodes.</p>
        </div>
        <div className="ranking-grid">
          {technicalRankings.map((ranking) => {
            const provider = getTechnicalProvider(ranking.providerId);
            return <article className="ranking-card" key={ranking.id}><span className="status-pill preview">{ranking.source.status === 'demonstration' ? 'Demonstration model' : 'Preview ranking'}</span><h3>{ranking.title}</h3><p className="ranking-benefit">{provider?.summary}</p><strong>{ranking.value}</strong><p>{provider?.name} · {ranking.metricName}</p><small>{ranking.source.methodology}</small></article>;
          })}
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
