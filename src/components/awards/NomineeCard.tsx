import { Link } from 'react-router-dom';
import { entryScore, formatScore } from '../../lib/scoring';
import { formatSats } from '../../lib/formatting';
import { getCategory, getCreator, getWork } from '../../data/awards';
import type { AwardEntry } from '../../types';
import { VerificationBadge } from '../VerificationBadge';

function resultLabel(status: AwardEntry['resultStatus']) {
  if (status === 'sample-winner') return 'Sample recognition';
  if (status === 'finalist') return 'Finalist preview';
  return 'Nominee preview';
}

export function NomineeCard({ entry }: { entry: AwardEntry }) {
  const creator = getCreator(entry.creatorId);
  const work = getWork(entry.workId);
  const category = getCategory(entry.categoryId);

  return (
    <Link className="glass-card nominee-card creator-first-card" to={`/nominees/${entry.id}`}>
      <div className="nominee-art" style={{ background: work?.image ?? creator?.avatarColor }} />
      <div className="nominee-body">
        <div className="card-meta soft-meta">
          <VerificationBadge label={resultLabel(entry.resultStatus)} tone={entry.resultStatus === 'sample-winner' ? 'gold' : 'blue'} />
          <span>{category?.title}</span>
        </div>
        <h3>{entry.title}</h3>
        <p className="creator-line">{creator?.name}</p>
        <p>{entry.summary}</p>
        <div className="proof-stack card-proof-stack">
          <span>{creator?.verified ? 'Verified creator' : 'Identity pending'}</span>
          <span>Credits available</span>
          <span>Proof available</span>
          <span>Community support</span>
        </div>
        <div className="supporting-metrics">
          <span>Preview score: {formatScore(entryScore(entry))}</span>
          <span>Community support: {formatSats(entry.fanSupportSats)}</span>
        </div>
        <strong className="story-link-label">View the Story</strong>
      </div>
    </Link>
  );
}
