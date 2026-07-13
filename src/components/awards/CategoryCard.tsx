import { Link } from 'react-router-dom';
import type { AwardCategory } from '../../types';
import { titleCase } from '../../lib/formatting';

export function CategoryCard({ category }: { category: AwardCategory }) {
  return (
    <Link className="glass-card category-card" to={`/categories/${category.slug}`}>
      <span className="eyebrow">{titleCase(category.group)}</span>
      <h3>{category.title}</h3>
      <p>{category.summary}</p>
      <div className="criteria-row">
        {category.criteria.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
      </div>
    </Link>
  );
}
