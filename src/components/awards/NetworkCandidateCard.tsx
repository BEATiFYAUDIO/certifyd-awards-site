import type { CSSProperties } from 'react';
import type { NetworkRanking } from '../../lib/networkNodes';

function initialsFor(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function NetworkCandidateCard({ ranking, index, total }: { ranking: NetworkRanking; index: number; total: number }) {
  const { profile } = ranking;
  const readyServices = profile.services.filter((service) => service.status === 'Ready');
  const limitedServices = profile.services.filter((service) => service.status === 'Limited');
  const style = {
    '--network-wallpaper': profile.wallpaperUrl ? `url("${profile.wallpaperUrl}")` : undefined,
    '--network-accent': profile.accentColor || undefined,
  } as CSSProperties;

  return (
    <article className="network-profile-card" style={style}>
      <div className="network-profile-topline">
        <span className="status-pill ok">Candidate {index + 1} of {total}</span>
        <span className={`network-status status-${profile.status.toLowerCase()}`}>{profile.status}</span>
      </div>
      <div className="network-profile-main">
        <div className="network-profile-avatar" aria-hidden="true">
          {profile.avatarUrl ? <img src={profile.avatarUrl} alt="" loading="lazy" /> : initialsFor(ranking.title)}
        </div>
        <div>
          <h3>{ranking.title}</h3>
          <p>{profile.operator}{profile.location ? ` · ${profile.location}` : ''}</p>
        </div>
      </div>
      <p className="network-profile-summary">{ranking.source.methodology}</p>
      <div className="network-profile-stats">
        <span><strong>{profile.roles.length}</strong> capabilities</span>
        <span><strong>{profile.proofCount}</strong> public records</span>
        <span><strong>{profile.nodeAgeDays ?? '—'}</strong> days active</span>
      </div>
      <div className="network-service-strip" aria-label="Network service status">
        {readyServices.map((service) => <span className="service-ready" key={service.label}>{service.label}</span>)}
        {limitedServices.map((service) => <span className="service-limited" key={service.label}>{service.label}{service.score ? ` ${service.score}` : ''}</span>)}
      </div>
      <div className="network-profile-actions">
        <a className="primary-action" href={profile.networkProfileUrl} target="_blank" rel="noreferrer">View Network Profile</a>
        {profile.providerUrl ? <a className="secondary-action" href={profile.providerUrl} target="_blank" rel="noreferrer">Open Provider</a> : null}
      </div>
      <small>{ranking.source.label} · Updated {ranking.source.lastUpdatedAt}</small>
    </article>
  );
}
