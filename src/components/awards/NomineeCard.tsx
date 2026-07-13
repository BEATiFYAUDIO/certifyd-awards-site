import { Link } from 'react-router-dom';
import { entryScore, formatScore } from '../../lib/scoring';
import { compactNumber, formatSats } from '../../lib/formatting';
import { getCategory, getCreator, getWork } from '../../data/awards';
import type { AwardEntry } from '../../types';
import { VerificationBadge } from '../VerificationBadge';

export function NomineeCard({ entry }: { entry: AwardEntry }) {
  const creator = getCreator(entry.creatorId);
  const work = getWork(entry.workId);
  const category = getCategory(entry.categoryId);

  return (
    <Link className="glass-card nominee-card" to={`/nominees/${entry.id}`}>
      <div className="nominee-art" style={{ background: work?.image ?? creator?.avatarColor }} />
      <div className="nominee-body">
        <div className="card-meta">
          <VerificationBadge label={entry.resultStatus.replace('-', ' ')} tone={entry.resultStatus === 'sample-winner' ? 'gold' : 'blue'} />
          <span>{category?.title}</span>
        </div>
        <h3>{entry.title}</h3>
        <p>{creator?.name} · {work?.genre ?? creator?.role}</p>
        <div className="metric-grid compact">
          <span><strong>{formatScore(entryScore(entry))}</strong><small>Score</small></span>
          <span><strong>{formatSats(entry.fanSupportSats)}</strong><small>Support</small></span>
          <span><strong>{compactNumber(entry.publicVotes)}</strong><small>Preview votes</small></span>
        </div>
      </div>
    </Link>
  );
}
