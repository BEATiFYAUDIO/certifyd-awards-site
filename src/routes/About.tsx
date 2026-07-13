import { Link } from 'react-router-dom';

export function About() {
  return (
    <section className="page-section">
      <span className="eyebrow">About Certifyd Awards</span>
      <h1>Awards for creator-owned networks, not opaque recommendation systems.</h1>
      <div className="split-section">
        <div>
          <p className="lead">Certifyd Awards is built around the idea that recognition should be traceable. Works, creators, contributors, receipts, and support signals should be visible enough that fans can understand why something was nominated or awarded.</p>
          <p className="muted">The public site is intentionally separate from live entitlement and voting infrastructure. Contentbox remains the authority for identity, publishing, commerce, receipts, and access.</p>
          <Link className="secondary-action" to="/categories">Explore categories</Link>
        </div>
        <div className="glass-card manifesto-card">
          <h2>What should be visible?</h2>
          <ul>
            <li>Who created the work.</li>
            <li>Who contributed to it.</li>
            <li>Where the public record lives.</li>
            <li>What proof was considered.</li>
            <li>How the score was calculated.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
