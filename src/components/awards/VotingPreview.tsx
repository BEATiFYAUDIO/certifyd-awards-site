import { votingDisclosure } from '../../lib/voting';
import { votingRounds } from '../../data/awards';

export function VotingPreview() {
  return (
    <section className="glass-card voting-preview">
      <span className="eyebrow">Voting preview</span>
      <h2>Sats-backed voting, disclosed as public signal</h2>
      <p>{votingDisclosure()}</p>
      <div className="timeline">
        {votingRounds.map((round) => (
          <article key={round.id}>
            <span className={`status-pill ${round.status}`}>{round.status}</span>
            <h3>{round.title}</h3>
            <p>{round.description}</p>
            <small>{round.startsAt} → {round.endsAt}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
