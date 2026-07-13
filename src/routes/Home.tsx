import { Link } from 'react-router-dom';
import { CategoryCard } from '../components/awards/CategoryCard';
import { NomineeCard } from '../components/awards/NomineeCard';
import { VotingPreview } from '../components/awards/VotingPreview';
import { categories, creators, entries } from '../data/awards';
import { compactNumber } from '../lib/formatting';

export function Home() {
  const featuredCategories = categories.filter((category) => category.featured).slice(0, 6);
  const featuredEntries = entries.slice(0, 4);
  const totalSats = entries.reduce((sum, entry) => sum + entry.fanSupportSats, 0);
  const verifiedCreators = creators.filter((creator) => creator.verified).length;

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Awards for the creator-proof era</span>
          <h1>The award site where every nomination has a public trail.</h1>
          <p>
            Certifyd Awards recognizes works, creators, credits, support, and transparency. This production site is ready for public launch with preview data while live voting and winner credentials remain clearly labeled.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" to="/nominate">Submit a nomination</Link>
            <Link className="secondary-action" to="/methodology">View methodology</Link>
          </div>
        </div>
        <div className="hero-panel glass-card">
          <span className="eyebrow">Network signal</span>
          <div className="metric-grid">
            <span><strong>{categories.length}</strong><small>Categories</small></span>
            <span><strong>{entries.length}</strong><small>Preview nominees</small></span>
            <span><strong>{verifiedCreators}</strong><small>Verified creators</small></span>
            <span><strong>{compactNumber(totalSats)}</strong><small>Preview sats support</small></span>
          </div>
          <div className="proof-stack">
            <span>Identity</span><span>Receipts</span><span>Credits</span><span>Lineage</span><span>Scoring</span>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading inline">
          <div>
            <span className="eyebrow">Featured categories</span>
            <h2>Major awards plus creator integrity awards.</h2>
          </div>
          <Link to="/categories">All categories</Link>
        </div>
        <div className="card-grid categories-grid">
          {featuredCategories.map((category) => <CategoryCard key={category.id} category={category} />)}
        </div>
      </section>

      <section className="content-section split-section">
        <div>
          <span className="eyebrow">Preview nominees</span>
          <h2>Recognition is attached to works, creators, and receipts.</h2>
          <p className="muted">Every nominee page includes contributors, proof records, weighted scoring inputs, and public voting disclosure.</p>
        </div>
        <div className="nominee-list">
          {featuredEntries.map((entry) => <NomineeCard key={entry.id} entry={entry} />)}
        </div>
      </section>

      <VotingPreview />
    </>
  );
}
