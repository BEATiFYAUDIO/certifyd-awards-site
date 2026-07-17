import { Link } from 'react-router-dom';
import { technologyCategories, getTechnologyAwardImageUrl, networkAwardIntro } from '../data/technology';

export function TechnologyCategories() {
  return (
    <section className="page-section filtered-page-section">
      <span className="eyebrow">Creator Innovation</span>
      <h1>Creator Innovation categories</h1>
      <p className="lead">{networkAwardIntro}</p>
      <div className="category-strip full award-category-section">
        {technologyCategories.map((category) => (
          <Link className="large-category-tile" to={`/technology/categories/${category.slug}`} key={category.id}>
            {getTechnologyAwardImageUrl(category) ? <img className="category-award-image technology-award-image" src={getTechnologyAwardImageUrl(category)} alt="" loading="lazy" /> : null}
            <span className="eyebrow">{category.family}</span>
            <h3>{category.title}</h3>
            <p>{category.summary}</p>
          </Link>
        ))}
      </div>
      <div className="hero-actions">
        <a className="secondary-action" href="https://network.certifyd.me/" target="_blank" rel="noreferrer">View the Network Map</a>
      </div>
    </section>
  );
}
