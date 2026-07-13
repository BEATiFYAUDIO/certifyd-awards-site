import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  ['/', 'Home'],
  ['/categories', 'Categories'],
  ['/nominees', 'Nominees'],
  ['/winners', 'Winners'],
  ['/methodology', 'Rules'],
  ['/nominate', 'Nominate'],
  ['/about', 'About'],
];

export function Layout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink to="/" className="brand-lockup" aria-label="Certifyd Awards home">
          <span className="brand-mark"><img src="/certifyd-logo-refined.svg" alt="" /></span>
          <span>
            <strong>Certifyd Awards</strong>
            <small>Proof-backed creator recognition</small>
          </span>
        </NavLink>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : undefined)} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div>
          <strong>Certifyd Awards</strong>
          <p>Preview site. No live production voting, blockchain recording, or final award results are claimed here.</p>
        </div>
        <div className="footer-links">
          <NavLink to="/methodology">Methodology</NavLink>
          <NavLink to="/nominate">Submit a work</NavLink>
          <a href="https://certifyd.me" rel="noreferrer">Certifyd</a>
        </div>
      </footer>
    </div>
  );
}
