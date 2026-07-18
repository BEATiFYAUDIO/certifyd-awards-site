import { ScoreBreakdown } from '../components/awards/ScoreBreakdown';
import { VotingPreview } from '../components/awards/VotingPreview';
import { Link } from 'react-router-dom';
import { useFanHydratedEntries } from '../hooks/useFanHydratedEntries';

export function Methodology() {
  const { entries } = useFanHydratedEntries();
  const example = entries[0];

  return (
    <>
      <section className="standard-title-hero">
        <div className="standard-title-hero-content">
          <span className="eyebrow">Methodology and rules</span>
          <h1>Methodology</h1>
          <p className="lead">How recognition is reviewed, explained, and earned.</p>
        </div>
      </section>
      <section className="page-section standard-page-content">
        <div className="principle-grid">
          {[
            ['Creators first', 'The work, creator, story, and contributors lead the experience.'],
            ['Records support recognition', 'Identity, publication, receipt, and contributor records help explain why a nomination matters.'],
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
        {example ? <ScoreBreakdown scoring={example.scoring} /> : null}
        <VotingPreview />
      </section>
    </>
  );
}
