import { Link } from 'react-router-dom';
import { categories } from '../data/awards';

export function MusicCategories() {
  const visible = categories.filter((category) => ['major', 'music', 'creator-integrity', 'community'].includes(category.group));
  return (
    <section className="page-section">
      <span className="eyebrow">Music Awards</span>
      <h1>Music categories</h1>
      <p className="lead">Music categories recognize artists, works, contributors, catalog integrity, and fan-supported creator relationships.</p>
      <div className="category-strip full">
        {visible.map((category) => <Link className="large-category-tile" to={`/music/categories/${category.slug}`} key={category.id}><span className="eyebrow">{category.group.replace('-', ' ')}</span><h3>{category.title}</h3><p>{category.summary}</p></Link>)}
      </div>
    </section>
  );
}
