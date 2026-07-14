import { ScoreBreakdown } from '../components/awards/ScoreBreakdown';
import { VotingPreview } from '../components/awards/VotingPreview';
import { Link } from 'react-router-dom';
import { entries } from '../data/awards';

export function Methodology() {
  return (
    <section className="page-section">
      <span className="eyebrow">Methodology and rules</span>
      <h1>Recognition should be meaningful, understandable, and earned.</h1>
      <p className="lead">Certifyd Awards makes the reasoning behind every result easier to understand. Data supports recognition; it does not replace human creativity, context, or judgment.</p>
      <div className="principle-grid">
        {[
          ['Creators first', 'The work, creator, story, and contributors lead the experience.'],
          ['Proof supports recognition', 'Identity, publication, receipt, and contributor records help explain why a nomination matters.'],
          ['Community support is one signal', 'Sats-backed community voting can be transparent without replacing craft or judging.'],
          ['Preview means preview', 'This site does not present seeded examples as final live awards.'],
        ].map(([title, copy]) => <article className="glass-card" key={title}><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
      <aside className="methodology-honor-note">
        <span className="eyebrow">Separate from scoring</span>
        <h2>The Founders&apos; Award is honorary.</h2>
        <p>The Vassal Benford Founders&apos; Award is not ranked, voted on, or included in competitive scoring. It has its own council review model and public citation standard.</p>
        <Link className="secondary-action" to="/founders-award">Read the honorary award model</Link>
      </aside>
      <ScoreBreakdown scoring={entries[0].scoring} />
      <VotingPreview />
    </section>
  );
}
