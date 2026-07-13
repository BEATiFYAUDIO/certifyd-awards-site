import { ScoreBreakdown } from '../components/awards/ScoreBreakdown';
import { VotingPreview } from '../components/awards/VotingPreview';
import { entries } from '../data/awards';

export function Methodology() {
  return (
    <section className="page-section">
      <span className="eyebrow">Methodology and rules</span>
      <h1>Certifyd Awards separates proof, craft, support, and transparency.</h1>
      <p className="lead">Awards should be understandable after the ceremony. The score model is designed to show what mattered, what was verified, and what remains preview-only.</p>
      <div className="principle-grid">
        {[
          ['Proof first', 'Identity, publication, receipt, and contributor records are shown before results.'],
          ['No hidden winners', 'Final credentials should include score components and public award context.'],
          ['Support is signal', 'Fan support can influence rankings, but it does not replace craft or transparency.'],
          ['Preview means preview', 'This site does not pretend seeded examples are final live awards.'],
        ].map(([title, copy]) => <article className="glass-card" key={title}><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
      <ScoreBreakdown scoring={entries[0].scoring} />
      <VotingPreview />
    </section>
  );
}
