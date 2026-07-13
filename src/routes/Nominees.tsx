import { useMemo, useState } from 'react';
import { NomineeCard } from '../components/awards/NomineeCard';
import { categories, entries, getCreator, getWork } from '../data/awards';

export function Nominees() {
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState('all');
  const visible = useMemo(() => entries.filter((entry) => {
    const creator = getCreator(entry.creatorId);
    const work = getWork(entry.workId);
    const haystack = `${entry.title} ${entry.summary} ${creator?.name} ${creator?.handle} ${work?.genre}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesCategory = categoryId === 'all' || entry.categoryId === categoryId;
    return matchesQuery && matchesCategory;
  }), [query, categoryId]);

  return (
    <section className="page-section">
      <span className="eyebrow">Nominees directory</span>
      <h1>Browse works, creators, proofs, and preview scores.</h1>
      <div className="directory-tools">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search nominees, creators, genres..." />
        <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((category) => <option value={category.id} key={category.id}>{category.title}</option>)}
        </select>
      </div>
      <div className="nominee-list two-column">
        {visible.map((entry) => <NomineeCard key={entry.id} entry={entry} />)}
      </div>
    </section>
  );
}
