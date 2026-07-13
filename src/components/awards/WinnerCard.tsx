import type { AwardEntry } from '../../types';
import { getCategory, getCreator } from '../../data/awards';
import { entryScore, formatScore } from '../../lib/scoring';
import { VerificationBadge } from '../VerificationBadge';

export function WinnerCard({ entry }: { entry: AwardEntry }) {
  const creator = getCreator(entry.creatorId);
  const category = getCategory(entry.categoryId);
  return (
    <article className="glass-card winner-card">
      <VerificationBadge label="sample credential" />
      <h3>{category?.title}</h3>
      <p>{entry.title} · {creator?.name}</p>
      <strong>{formatScore(entryScore(entry))}</strong>
      <small>Preview score calculated from seeded proof data.</small>
    </article>
  );
}
