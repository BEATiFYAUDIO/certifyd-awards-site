import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="page-section not-found">
      <span className="eyebrow">404</span>
      <h1>This award record was not found.</h1>
      <p className="lead">The page may have moved, or the preview record may not exist yet.</p>
      <Link className="primary-action" to="/">Return home</Link>
    </section>
  );
}
