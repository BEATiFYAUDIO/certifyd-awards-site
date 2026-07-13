import { Link } from 'react-router-dom';
import { technologyCategories } from '../data/technology';

export function TechnologyCategories() {
  return (
    <section className="page-section">
      <span className="eyebrow">Technology Awards</span>
      <h1>Technology categories</h1>
      <p className="lead">Every category includes eligibility, technical signals, data status, and transparent measurement language.</p>
      <div className="category-strip full">
        {technologyCategories.map((category) => <Link className="large-category-tile" to={`/technology/categories/${category.slug}`} key={category.id}><span className="eyebrow">{category.family}</span><h3>{category.title}</h3><p>{category.summary}</p></Link>)}
      </div>
    </section>
  );
}
