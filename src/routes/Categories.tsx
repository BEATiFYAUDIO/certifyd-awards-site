import { useMemo, useState } from 'react';
import { CategoryCard } from '../components/awards/CategoryCard';
import { categories } from '../data/awards';
import type { AwardGroup } from '../types';

const filters: Array<AwardGroup | 'all'> = ['all', 'major', 'music', 'news', 'technology', 'gaming', 'sports', 'media', 'published', 'creator-integrity', 'community', 'innovation'];
const labels: Record<AwardGroup | 'all', string> = {
  all: 'All',
  major: 'Signature',
  music: 'Music',
  news: 'News',
  technology: 'Technology',
  gaming: 'Gaming',
  sports: 'Sports',
  media: 'Video and media',
  published: 'Published work',
  'creator-integrity': 'Credits and trust',
  community: 'Community',
  innovation: 'Innovation',
};

export function Categories() {
  const [active, setActive] = useState<AwardGroup | 'all'>('all');
  const visible = useMemo(() => active === 'all' ? categories : categories.filter((category) => category.group === active), [active]);

  return (
    <>
      <section className="standard-title-hero">
        <div className="standard-title-hero-content">
          <span className="eyebrow">Creative Excellence</span>
          <h1>Award Categories</h1>
          <div className="filter-row standard-title-tools">
            {filters.map((filter) => <button className={active === filter ? 'active' : ''} key={filter} onClick={() => setActive(filter)}>{labels[filter]}</button>)}
          </div>
        </div>
      </section>
      <section className="page-section standard-page-content">
        <div className="card-grid categories-grid">
          {visible.map((category) => <CategoryCard key={category.id} category={category} />)}
        </div>
      </section>
    </>
  );
}
