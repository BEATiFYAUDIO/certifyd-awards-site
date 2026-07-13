import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  ['/', 'Awards'],
  ['/technology', 'Technology'],
  ['/music', 'Music'],
  ['/nominees', 'Nominees'],
  ['/winners', 'Winners'],
  ['/methodology', 'Methodology'],
];

export function Layout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink to="/" className="brand-lockup" aria-label="Certifyd Awards home">
          <span className="brand-mark"><img src="/certifyd-logo-refined.svg" alt="" /></span>
          <span><strong>Certifyd Awards</strong><small>Recognition backed by proof.</small></span>
        </NavLink>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : undefined)} end={to === '/'}>{label}</NavLink>)}
        </nav>
        <NavLink className="primary-action header-action" to="/nominate">Submit a Nomination</NavLink>
      </header>
      <main><Outlet /></main>
      <footer className="site-footer">
        <div><strong>Certifyd Awards Weekend</strong><p>Day 1 Technology Awards. Day 2 Music Awards. Preview data is clearly labeled; live voting is not active.</p></div>
        <div className="footer-links"><NavLink to="/technology">Technology</NavLink><NavLink to="/music">Music</NavLink><NavLink to="/methodology">Methodology</NavLink><NavLink to="/about">About</NavLink></div>
      </footer>
    </div>
  );
}
