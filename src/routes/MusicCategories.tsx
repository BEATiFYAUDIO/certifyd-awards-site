import { Link } from 'react-router-dom';
import { categories, getCategoryAwardImageUrl } from '../data/awards';

export function MusicCategories() {
  const visible = categories.filter((category) => ['major', 'music', 'news', 'technology', 'gaming', 'sports', 'media', 'published', 'creator-integrity', 'community'].includes(category.group));
  return (
    <section className="page-section">
      <span className="eyebrow">Creative Excellence</span>
      <h1>Creative Excellence categories</h1>
      <p className="lead">Categories recognize original work, creators, contributors, catalog integrity, collaboration, and fan-supported relationships.</p>
      <div className="category-strip full award-category-section">
        {visible.map((category) => {
          const imageUrl = getCategoryAwardImageUrl(category);
          return (
            <Link className="large-category-tile" to={`/music/categories/${category.slug}`} key={category.id}>
              {imageUrl ? <img className="category-award-image" src={imageUrl} alt="" loading="lazy" /> : null}
              <span className="eyebrow">{category.group.replace('-', ' ')}</span>
              <h3>{category.title}</h3>
              <p>{category.summary}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
