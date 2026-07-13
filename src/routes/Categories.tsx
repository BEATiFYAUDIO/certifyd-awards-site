import { useMemo, useState } from 'react';
import { CategoryCard } from '../components/awards/CategoryCard';
import { categories } from '../data/awards';
import type { AwardGroup } from '../types';

const filters: Array<AwardGroup | 'all'> = ['all', 'major', 'music', 'creator-integrity', 'community', 'innovation'];

export function Categories() {
  const [active, setActive] = useState<AwardGroup | 'all'>('all');
  const visible = useMemo(() => active === 'all' ? categories : categories.filter((category) => category.group === active), [active]);

  return (
    <section className="page-section">
      <span className="eyebrow">Award categories</span>
      <h1>Consistent categories for craft, proof, support, and transparency.</h1>
      <div className="filter-row">
        {filters.map((filter) => <button className={active === filter ? 'active' : ''} key={filter} onClick={() => setActive(filter)}>{filter.replace('-', ' ')}</button>)}
      </div>
      <div className="card-grid categories-grid">
        {visible.map((category) => <CategoryCard key={category.id} category={category} />)}
      </div>
    </section>
  );
}
