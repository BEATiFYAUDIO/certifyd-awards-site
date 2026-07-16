import { Link, useParams } from 'react-router-dom';
import { NomineeCard } from '../components/awards/NomineeCard';
import { ScoreBreakdown } from '../components/awards/ScoreBreakdown';
import { getCategory, getCategoryAwardImageUrl } from '../data/awards';
import { useFanHydratedEntries } from '../hooks/useFanHydratedEntries';
import { NotFound } from './NotFound';

export function CategoryDetail() {
  const { categoryId } = useParams();
  const category = categoryId ? getCategory(categoryId) : undefined;
  const { entries: liveEntries } = useFanHydratedEntries();
  const nominees = category ? liveEntries.filter((entry) => entry.categoryId === category.id) : [];
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
        <div><span className="eyebrow">Nominees</span><h2>Nominees</h2></div>
        <Link to="/nominate">Submit a nomination</Link>
      </div>
      <div className="nominee-list two-column">
        {nominees.length ? nominees.map((entry) => <NomineeCard key={entry.id} entry={entry} />) : <p className="muted">No entries are available for this category right now.</p>}
      </div>
    </section>
  );
}
