import { Link } from 'react-router-dom';
import { technologyCategories, technicalRankings, getTechnicalProvider } from '../data/technology';

export function Technology() {
  const families = Array.from(new Set(technologyCategories.map((category) => category.family)));
  return (
    <section className="page-section awards-division-page">
      <span className="eyebrow">Day 1</span>
      <h1>Technology Awards</h1>
      <p className="lead">Recognizing the infrastructure, platforms, developers, providers, and technical systems powering the creator economy.</p>
      <div className="division-hero tech-division">
        <div><h2>Builder recognition with explainable technical evidence.</h2><p>Every technical metric is labeled with source, period, methodology, and data status. Seeded records are explicitly marked as demonstration data.</p></div>
        <Link className="primary-action" to="/technology/categories">Technology Categories</Link>
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
        <div className="section-heading"><span className="eyebrow">Preview rankings</span><h2>Technical rankings include source and methodology.</h2></div>
        <div className="ranking-grid">
          {technicalRankings.map((ranking) => {
            const provider = getTechnicalProvider(ranking.providerId);
            return <article className="ranking-card" key={ranking.id}><span className="status-pill preview">{ranking.source.status === 'demonstration' ? 'Demonstration Data' : 'Preview Ranking'}</span><h3>{ranking.title}</h3><strong>{ranking.value}</strong><p>{provider?.name} · {ranking.metricName}</p><small>{ranking.source.methodology}</small></article>;
          })}
        </div>
      </section>
    </section>
  );
}
