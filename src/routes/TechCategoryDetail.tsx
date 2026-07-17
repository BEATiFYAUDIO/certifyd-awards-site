import { Link, useParams } from 'react-router-dom';
import { NetworkCandidateCard } from '../components/awards/NetworkCandidateCard';
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
    <section className="page-section detail-page filtered-page-section">
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
        <article className="glass-card"><span className="eyebrow">Technical considerations</span><ul>{category.metrics.map((item) => <li key={item}>{item}</li>)}</ul></article>
      </div>
      <section className="rankings-section">
        <div className="section-heading">
          <span className="eyebrow">Current technical candidates</span>
          <h2>{loading ? 'Eligible contributors' : `${rankings.length} eligible technical contributors`}</h2>
          <p className="muted">Filtered against the Certifyd Network map for this category&apos;s technical considerations.</p>
        </div>
        {loading ? <p className="muted">Loading technical contributors…</p> : null}
        {rankings.length ? <div className="ranking-grid operator-candidate-grid">{rankings.map((ranking, index) => <NetworkCandidateCard ranking={ranking} index={index} total={rankings.length} key={ranking.id} />)}</div> : <div className="empty-state"><h3>No technical candidates are available right now.</h3><p>Recognition appears when the Certifyd Network map returns eligible services.</p></div>}
      </section>
      <div className="hero-actions">
        <Link className="secondary-action" to="/technology">Back to Creator Innovation</Link>
        <a className="secondary-action" href="https://network.certifyd.me/join" target="_blank" rel="noreferrer">Become a Node Operator</a>
      </div>
    </section>
  );
}
