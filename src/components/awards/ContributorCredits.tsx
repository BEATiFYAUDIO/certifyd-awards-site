import { getCreator } from '../../data/awards';
import type { ContributorCredit } from '../../types';

export function ContributorCredits({ credits }: { credits: ContributorCredit[] }) {
  return (
    <div className="credit-grid">
      {credits.map((credit) => {
        const creator = getCreator(credit.creatorId);
        return (
          <article className="credit-card" key={`${credit.creatorId}-${credit.role}`}>
            <span className="avatar" style={{ background: creator?.avatarColor }}>{creator?.name.slice(0, 1)}</span>
            <div>
              <strong>{creator?.name}</strong>
              <p>@{creator?.handle} · {credit.role}</p>
              {credit.shareLabel ? <small>{credit.shareLabel}</small> : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
