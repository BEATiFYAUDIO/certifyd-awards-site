import { Link } from 'react-router-dom';

export function About() {
  return (
    <>
      <section className="standard-title-hero">
        <div className="standard-title-hero-content">
          <span className="eyebrow">About Certifyd Awards</span>
          <h1>About Certifyd Awards</h1>
          <p className="lead">Recognition for creators, contributors, platforms, providers, communities, and fans.</p>
        </div>
      </section>
      <section className="page-section standard-page-content">
        <div className="split-section">
          <div>
            <p className="lead">Certifyd Awards exists to celebrate remarkable work, recognize the people behind it, and make recognition more transparent. We honour creators first, while also acknowledging the contributors, platforms, providers, and technical systems that help creative work reach the world.</p>
            <p className="muted">That includes creators, performers, writers, producers, engineers, contributors, publishers, platforms, technical providers, communities, and fans.</p>
            <Link className="secondary-action" to="/music">Explore Creative Excellence</Link>
          </div>
          <div className="glass-card manifesto-card">
            <h2>Recognition should show</h2>
            <ul>
              <li>The creator and the work.</li>
              <li>The contributors who helped bring it to life.</li>
              <li>The story and cultural context behind it.</li>
              <li>The community support around it.</li>
              <li>The credits, proof, and evidence considered.</li>
              <li>How the result can be understood.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
