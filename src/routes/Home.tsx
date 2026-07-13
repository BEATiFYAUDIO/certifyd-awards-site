import { Link } from 'react-router-dom';
import { AwardCreatorCard } from '../components/awards/AwardCreatorCard';
import { NomineeCard } from '../components/awards/NomineeCard';
import { ScoreBreakdown } from '../components/awards/ScoreBreakdown';
import { entries } from '../data/awards';
import { technicalRankings, getTechnicalProvider } from '../data/technology';
import { compactNumber } from '../lib/formatting';
import { getAwardCreators } from '../lib/creatorAdapter';
import { entryScore, formatScore, rankEntries } from '../lib/scoring';

export function Home() {
  const featuredEntries = rankEntries(entries).slice(0, 3);
  const creators = getAwardCreators().slice(0, 3);
  const totalSats = entries.reduce((sum, entry) => sum + entry.fanSupportSats, 0);
  const strongest = featuredEntries[0];

  return (
    <>
      <section className="awards-hero">
        <video className="hero-video" src="/media/awards-hero-1080.mp4" autoPlay muted loop playsInline poster="/media/awards-stage.webp" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow">Certifyd Awards</span>
          <h1>Recognition<br />Backed by Proof.</h1>
          <p>A two-day celebration of creators and the technology that powers them.</p>
          <div className="hero-actions">
            <Link className="primary-action" to="/technology">Explore the Awards</Link>
            <Link className="secondary-action" to="/nominate">Submit a Nomination</Link>
          </div>
        </div>
        <aside className="hero-award-visual" aria-label="Certifyd Awards trophy concept">
          <img src="/media/awards-trophy.webp" alt="Certifyd Awards trophy concept with blue and orange lighting" />
          <div className="hero-score-panel">
            <span>Preview score model</span>
            <strong>{strongest ? formatScore(entryScore(strongest)) : '—'}</strong>
            <p>{strongest?.title} · explainable weighted score</p>
          </div>
        </aside>
      </section>

      <section className="weekend-section">
        <div className="section-heading centered">
          <span className="eyebrow">Certifyd Awards Weekend</span>
          <h2>Two days recognizing both sides of the creator economy.</h2>
          <p>Day 1 celebrates builders, infrastructure, and technical systems. Day 2 celebrates artists, works, contributors, and creator excellence.</p>
        </div>
        <div className="pillar-grid">
          <article className="event-pillar tech-pillar">
            <span className="day-label">Day 1</span>
            <h3>Technology Awards</h3>
            <p>Celebrating the platforms, infrastructure, developers, providers, and technical systems powering the creator economy.</p>
            <div className="proof-stack"><span>Infrastructure</span><span>Nodes</span><span>Identity</span><span>Commerce</span><span>AI tools</span></div>
            <Link to="/technology">Explore Technology Awards</Link>
          </article>
          <article className="event-pillar music-pillar">
            <span className="day-label">Day 2</span>
            <h3>Music Awards</h3>
            <p>Celebrating artists, original works, contributors, performances, and creator excellence.</p>
            <div className="proof-stack"><span>Major Awards</span><span>Artists</span><span>Songs</span><span>Credits</span><span>Fan support</span></div>
            <Link to="/music">Explore Music Awards</Link>
          </article>
        </div>
      </section>

      <section className="editorial-split">
        <div className="editorial-image stage-image" role="img" aria-label="Concert stage and crowd" />
        <div>
          <span className="eyebrow">Featured entries</span>
          <h2>Nominees are shown with identity, category, score, and proof context.</h2>
          <div className="nominee-list editorial-list">
            {featuredEntries.map((entry) => <NomineeCard key={entry.id} entry={entry} />)}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading inline">
          <div>
            <span className="eyebrow">Awards creator cards</span>
            <h2>Creator cards are editorial, not player controls.</h2>
          </div>
          <span className="status-pill preview">Seeded awards data</span>
        </div>
        <div className="creator-awards-grid">
          {creators.map((creator, index) => <AwardCreatorCard key={creator.id} creator={creator} score={`${formatScore(entryScore(featuredEntries[index] ?? featuredEntries[0]))} score`} />)}
        </div>
      </section>

      <section className="content-section scoring-showcase">
        <div>
          <span className="eyebrow">Transparent scoring demonstration</span>
          <h2>Why the winner won should be visible.</h2>
          <p className="muted">Scores are calculated from structured components. The current records are preview data, not final live award results.</p>
        </div>
        {strongest ? <ScoreBreakdown scoring={strongest.scoring} /> : null}
      </section>

      <section className="rankings-section">
        <div className="section-heading inline">
          <div><span className="eyebrow">Technical rankings</span><h2>Network excellence, clearly labeled.</h2></div>
          <Link to="/technology">Technology Awards</Link>
        </div>
        <div className="ranking-grid">
          {technicalRankings.map((ranking) => {
            const provider = getTechnicalProvider(ranking.providerId);
            return (
              <article className="ranking-card" key={ranking.id}>
                <span className="status-pill preview">{ranking.source.status === 'demonstration' ? 'Demonstration Data' : 'Preview Ranking'}</span>
                <h3>{ranking.title}</h3>
                <strong>{ranking.value}</strong>
                <p>{provider?.name} · {ranking.metricName}</p>
                <small>{ranking.source.period} · Updated {ranking.source.lastUpdatedAt}</small>
              </article>
            );
          })}
        </div>
      </section>

      <section className="final-cta">
        <div className="vegas-image" aria-hidden="true" />
        <div>
          <span className="eyebrow">Participation</span>
          <h2>Nominate the creators and builders who made the year matter.</h2>
          <p>{compactNumber(totalSats)} preview sats of fan support are represented in seeded records. Live public voting opens only when the production round begins.</p>
          <Link className="primary-action" to="/nominate">Submit a Nomination</Link>
        </div>
      </section>
    </>
  );
}
