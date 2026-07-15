import { WinnerCard } from '../components/awards/WinnerCard';
import { Link } from 'react-router-dom';
import { awardYears, entries, foundersAward } from '../data/awards';
import { useFanHydratedEntries } from '../hooks/useFanHydratedEntries';

export function Winners() {
  const { entries: hydratedEntries } = useFanHydratedEntries(entries);
  const sampleWinners = hydratedEntries.slice(0, 5).map((entry) => ({ ...entry, resultStatus: 'sample-winner' as const }));

  return (
    <section className="page-section">
      <span className="eyebrow">Winners archive</span>
      <h1>Winner credentials will be public, explainable, and proof-linked.</h1>
      <p className="lead">The current archive is a demonstration of how winners will be presented. It is not a final production result set.</p>
      <aside className="honorary-archive-note">
        <div>
          <span className="eyebrow">Honorary Recognition</span>
          <h2>{foundersAward.name}</h2>
          <p>This non-competitive honor is separate from the ranked winner archive and will be presented only in exceptional circumstances.</p>
        </div>
        <Link className="secondary-action" to="/founders-award">Learn about the honor</Link>
      </aside>
      <div className="year-grid">
        {awardYears.map((year) => (
          <article className="glass-card" key={year.year}>
            <span className={`status-pill ${year.status}`}>{year.status}</span>
            <h3>{year.label}</h3>
            <p>{year.theme}</p>
            <small>Nominations: {year.nominationWindow}</small>
            <small>Voting: {year.votingWindow}</small>
            <small>Ceremony: {year.ceremonyDate}</small>
          </article>
        ))}
      </div>
      <div className="card-grid winner-grid">
        {sampleWinners.map((entry) => <WinnerCard key={entry.id} entry={entry} />)}
      </div>
    </section>
  );
}
