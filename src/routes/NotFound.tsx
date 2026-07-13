import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="page-section not-found">
      <span className="eyebrow">404</span>
      <h1>This award record was not found.</h1>
      <p className="lead">Use one of the public awards sections below.</p>
      <div className="hero-actions"><Link className="primary-action" to="/music">Creative Excellence</Link><Link className="secondary-action" to="/technology">Creator Innovation</Link><Link className="secondary-action" to="/nominees">Nominees</Link><Link className="secondary-action" to="/winners">Winners</Link><Link className="secondary-action" to="/methodology">Methodology</Link></div>
    </section>
  );
}
