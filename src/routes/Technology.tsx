import { Link } from 'react-router-dom';
import { technologyCategories, technicalRankings, getTechnicalProvider } from '../data/technology';

export function Technology() {
  const families = Array.from(new Set(technologyCategories.map((category) => category.family)));
  return (
    <section className="page-section awards-division-page">
      <span className="eyebrow">Day 1 · Creator Innovation</span>
      <h1>Creator Innovation</h1>
      <p className="lead">Celebrating the people, platforms, tools, and ideas helping creators make, publish, protect, and share their work.</p>
      <div className="division-hero tech-division">
        <div><h2>Technical excellence behind the work.</h2><p>Every result connects technical contribution back to creator benefit, with source, period, methodology, and data status clearly labeled.</p></div>
        <Link className="primary-action" to="/technology/categories">Creator Innovation Categories</Link>
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
        <div className="section-heading"><span className="eyebrow">Preview recognition</span><h2>Measurements shown with creator impact.</h2></div>
        <div className="ranking-grid">
          {technicalRankings.map((ranking) => {
            const provider = getTechnicalProvider(ranking.providerId);
            return <article className="ranking-card" key={ranking.id}><span className="status-pill preview">{ranking.source.status === 'demonstration' ? 'Demonstration model' : 'Preview ranking'}</span><h3>{ranking.title}</h3><p className="ranking-benefit">{provider?.summary}</p><strong>{ranking.value}</strong><p>{provider?.name} · {ranking.metricName}</p><small>{ranking.source.methodology}</small></article>;
          })}
        </div>
      </section>
    </section>
  );
}
