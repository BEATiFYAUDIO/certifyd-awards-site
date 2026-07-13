import { Link } from 'react-router-dom';
import { technologyCategories } from '../data/technology';

export function TechnologyCategories() {
  return (
    <section className="page-section">
      <span className="eyebrow">Creator Innovation</span>
      <h1>Creator Innovation categories</h1>
      <p className="lead">Recognizing people, tools, platforms, and technical contributions by how they help creators make, publish, protect, and share their work.</p>
      <div className="category-strip full">
        {technologyCategories.map((category) => <Link className="large-category-tile" to={`/technology/categories/${category.slug}`} key={category.id}><span className="eyebrow">{category.family}</span><h3>{category.title}</h3><p>{category.summary}</p></Link>)}
      </div>
    </section>
  );
}
