import { WinnerCard } from '../components/awards/WinnerCard';
import { awardYears, entries } from '../data/awards';
import { rankEntries } from '../lib/scoring';

export function Winners() {
  const sampleWinners = rankEntries(entries).slice(0, 5).map((entry) => ({ ...entry, resultStatus: 'sample-winner' as const }));

  return (
    <section className="page-section">
      <span className="eyebrow">Winners archive</span>
      <h1>Winner credentials will be public, explainable, and proof-linked.</h1>
      <p className="lead">The current archive is a demonstration of how winners will be presented. It is not a final production result set.</p>
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
