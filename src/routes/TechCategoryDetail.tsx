import { Link, useParams } from 'react-router-dom';
import { getTechnologyCategory, getTechnologyAwardImageUrl } from '../data/technology';
import { NotFound } from './NotFound';
import { useNetworkRankings } from '../hooks/useNetworkRankings';

export function TechCategoryDetail() {
  const { categoryId } = useParams();
  const category = categoryId ? getTechnologyCategory(categoryId) : undefined;
  const { rankings, loading } = useNetworkRankings(category?.slug);
  if (!category) return <NotFound />;
  const imageUrl = getTechnologyAwardImageUrl(category);

  return (
    <section className="page-section detail-page">
      <div className="category-detail-hero">
        <div>
          <span className="eyebrow">Creator Innovation · {category.family}</span>
          <h1>{category.title}</h1>
          <p className="lead">{category.summary}</p>
        </div>
        {imageUrl ? <img className="category-detail-award technology-award-image" src={imageUrl} alt={`${category.title} award trophy`} /> : null}
      </div>
      <div className="category-detail-grid">
        <article className="glass-card"><span className="eyebrow">Who or what is recognized</span><ul>{category.eligibility.map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article className="glass-card"><span className="eyebrow">Evidence considered</span><ul>{category.metrics.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </div>
      <section className="rankings-section">
        <div className="section-heading">
          <span className="eyebrow">Live recognition</span>
          <h2>{loading ? 'Eligible network candidates' : `${rankings.length} eligible network candidates`}</h2>
          <p className="muted">Filtered against the Certifyd Network map for this category&apos;s evidence.</p>
        </div>
        {loading ? <p className="muted">Loading network operators…</p> : null}
        {rankings.length ? <div className="ranking-grid operator-candidate-grid">{rankings.map((ranking, index) => <article className="ranking-card technology-ranking-card operator-candidate-card" key={ranking.id}><span className="status-pill ok">Candidate {index + 1} of {rankings.length}</span><h3>{ranking.title}</h3><p className="ranking-benefit">{ranking.source.methodology}</p><div className="ranking-metric"><strong>{ranking.value}</strong><span>{ranking.metricName}</span></div><small>{ranking.source.label} · Source snapshot: {ranking.source.lastUpdatedAt}</small></article>)}</div> : <div className="empty-state"><h3>No network operator rankings are available right now.</h3><p>Recognition appears when the Certifyd Network map returns eligible nodes.</p></div>}
      </section>
      <div className="hero-actions">
        <Link className="secondary-action" to="/technology">Back to Creator Innovation</Link>
        <a className="secondary-action" href="https://network.certifyd.me/join" target="_blank" rel="noreferrer">Become a Node Operator</a>
      </div>
    </section>
  );
}
