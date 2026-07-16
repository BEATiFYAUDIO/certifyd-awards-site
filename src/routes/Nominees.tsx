import { useMemo, useState } from 'react';
import { NomineeCard } from '../components/awards/NomineeCard';
import { categories, getCreator, getWork } from '../data/awards';
import { useFanHydratedEntries } from '../hooks/useFanHydratedEntries';

export function Nominees() {
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState('all');
  const { entries: hydratedEntries } = useFanHydratedEntries();
  const visible = useMemo(() => hydratedEntries.filter((entry) => {
    const creator = getCreator(entry.creatorId);
    const work = getWork(entry.workId);
    const haystack = `${entry.title} ${entry.summary} ${creator?.name} ${creator?.handle} ${work?.genre}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesCategory = categoryId === 'all' || entry.categoryId === categoryId;
    return matchesQuery && matchesCategory;
  }), [hydratedEntries, query, categoryId]);

  return (
    <section className="page-section">
      <span className="eyebrow">Nominees directory</span>
      <h1>Browse works, creators, and scores.</h1>
      <div className="directory-tools">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search nominees, creators, genres..." />
        <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((category) => <option value={category.id} key={category.id}>{category.title}</option>)}
        </select>
      </div>
      <div className="nominee-list two-column">
        {visible.length ? visible.map((entry) => <NomineeCard key={entry.id} entry={entry} />) : <p className="muted">No entries match this view right now.</p>}
      </div>
    </section>
  );
}
