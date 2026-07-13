import type { CSSProperties } from 'react';
import type { AwardCreator } from '../../types';

export function AwardCreatorCard({ creator, category, score }: { creator: AwardCreator; category?: string; score?: string }) {
  return (
    <article className="award-creator-card expressive-creator-card">
      <div className="creator-card-art" style={{ '--creator-accent': creator.accentColor } as CSSProperties}>
        {creator.wallpaperUrl ? <img className="creator-wallpaper" src={creator.wallpaperUrl} alt="" loading="lazy" /> : null}
        {creator.avatarUrl ? <img className="creator-avatar-image" src={creator.avatarUrl} alt="" loading="lazy" /> : <span>{creator.displayName.slice(0, 1)}</span>}
      </div>
      <div className="creator-card-copy">
        <div className="card-meta soft-meta"><span>{creator.verificationLabel}</span>{category ? <span>{category}</span> : null}</div>
        <h3>{creator.displayName}</h3>
        <p className="creator-line">{creator.primaryRole}</p>
        {creator.nominatedWorks.length ? <strong>Nominated for {creator.nominatedWorks[0]}</strong> : null}
        <p className="muted">A creator connected to public credits, proof, and award-season recognition.</p>
        <div className="creator-card-actions">
          {score ? <span className="score-chip">{score}</span> : null}
          <a href={creator.profileUrl} target="_blank" rel="noreferrer">View Creator Profile</a>
        </div>
      </div>
    </article>
  );
}
