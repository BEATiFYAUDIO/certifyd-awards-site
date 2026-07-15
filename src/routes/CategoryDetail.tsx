import { Link, useParams } from 'react-router-dom';
import { NomineeCard } from '../components/awards/NomineeCard';
import { ScoreBreakdown } from '../components/awards/ScoreBreakdown';
import { entries, getCategory, getCategoryAwardImageUrl } from '../data/awards';
import { useFanHydratedEntries } from '../hooks/useFanHydratedEntries';
import { NotFound } from './NotFound';

export function CategoryDetail() {
  const { categoryId } = useParams();
  const category = categoryId ? getCategory(categoryId) : undefined;
  const categoryEntries = category ? entries.filter((entry) => entry.categoryId === category.id) : [];
  const { entries: nominees } = useFanHydratedEntries(categoryEntries);
  if (!category) return <NotFound />;
  const example = nominees[0];
  const imageUrl = getCategoryAwardImageUrl(category);

  return (
    <section className="page-section">
      <div className="category-detail-hero">
        <div>
          <span className="eyebrow">{category.group.replace('-', ' ')}</span>
          <h1>{category.title}</h1>
          <p className="lead">{category.summary}</p>
          <div className="criteria-row large">
            {category.criteria.map((criterion) => <span key={criterion}>{criterion}</span>)}
          </div>
        </div>
        {imageUrl ? <img className="category-detail-award" src={imageUrl} alt={`${category.title} award trophy`} /> : null}
      </div>
      {example ? <ScoreBreakdown scoring={example.scoring} /> : null}
      <div className="section-heading inline">
        <div><span className="eyebrow">Nominees</span><h2>Preview entries</h2></div>
        <Link to="/nominate">Submit a nomination</Link>
      </div>
      <div className="nominee-list two-column">
        {nominees.length ? nominees.map((entry) => <NomineeCard key={entry.id} entry={entry} />) : <p className="muted">No preview entries are seeded for this category yet.</p>}
      </div>
    </section>
  );
}
