import type { CSSProperties } from 'react';
import type { AwardCreator } from '../../types';

export function AwardCreatorCard({ creator, category, score }: { creator: AwardCreator; category?: string; score?: string }) {
  return (
    <article className="award-creator-card">
      <div className="creator-card-art" style={{ '--creator-accent': creator.accentColor } as CSSProperties}>
        <span>{creator.displayName.slice(0, 1)}</span>
      </div>
      <div className="creator-card-copy">
        <div className="card-meta"><span>{creator.verificationLabel}</span>{category ? <span>{category}</span> : null}</div>
        <h3>{creator.displayName}</h3>
        <p>@{creator.slug} · {creator.primaryRole}</p>
        {creator.nominatedWorks.length ? <strong>{creator.nominatedWorks[0]}</strong> : null}
        <div className="creator-card-actions">
          {score ? <span className="score-chip">{score}</span> : null}
          <a href={creator.profileUrl} target="_blank" rel="noreferrer">Certifyd profile</a>
        </div>
      </div>
    </article>
  );
}
