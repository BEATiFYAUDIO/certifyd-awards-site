import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  ['/', 'Awards'],
  ['/music', 'Creative Excellence'],
  ['/technology', 'Creator Innovation'],
  ['/nominees', 'Nominees'],
  ['/winners', 'Winners'],
  ['/methodology', 'Methodology'],
];

export function Layout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="https://vassal.certifyd.me" className="brand-lockup" aria-label="Certifyd home">
          <span className="brand-mark"><img src="/certifyd-logo-refined.svg" alt="" /></span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : undefined)} end={to === '/'}>{label}</NavLink>)}
        </nav>
        <NavLink className="primary-action header-action" to="/nominate">Submit a Nomination</NavLink>
      </header>
      <main><Outlet /></main>
      <footer className="site-footer">
        <div><strong>Certifyd Awards Weekend</strong><p>Creative Excellence, Creator Innovation, and honorary recognition. Preview data is clearly labeled; live voting is not active.</p></div>
        <div className="footer-links"><NavLink to="/music">Creative Excellence</NavLink><NavLink to="/technology">Creator Innovation</NavLink><NavLink to="/founders-award">Founders&apos; Award</NavLink><NavLink to="/methodology">Methodology</NavLink><NavLink to="/about">About</NavLink></div>
      </footer>
    </div>
  );
}
