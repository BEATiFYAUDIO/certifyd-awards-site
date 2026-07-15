import { Link } from 'react-router-dom';
import { formatSats } from '../../lib/formatting';
import { getCategory, getCreator, getWork } from '../../data/awards';
import type { AwardEntry } from '../../types';
import { VerificationBadge } from '../VerificationBadge';
import { artworkUrl } from '../../lib/artwork';
import type { FanHydratedEntry } from '../../lib/fanDiscovery';

function resultLabel(status: AwardEntry['resultStatus']) {
  if (status === 'sample-winner') return 'Sample recognition';
  if (status === 'finalist') return 'Finalist preview';
  return 'Nominee preview';
}

export function NomineeCard({ entry }: { entry: AwardEntry }) {
  const creator = getCreator(entry.creatorId);
  const work = getWork(entry.workId);
  const category = getCategory(entry.categoryId);
  const liveEntry = entry as AwardEntry & Partial<FanHydratedEntry>;
  const artUrl = liveEntry.fanItem?.coverUrl || artworkUrl(work?.image);
  const creatorLabel = liveEntry.fanItem?.creatorHandle ? `@${String(liveEntry.fanItem.creatorHandle).replace(/^@+/, '')}` : creator?.name;

  return (
    <Link className="glass-card nominee-card creator-first-card" to={`/nominees/${entry.id}`}>
      <div className="nominee-art" style={artUrl ? undefined : { background: work?.image ?? creator?.avatarColor }}>
        {artUrl ? <img src={artUrl} alt="" loading="lazy" /> : null}
      </div>
      <div className="nominee-body">
        <div className="card-meta soft-meta">
          <VerificationBadge label={resultLabel(entry.resultStatus)} tone={entry.resultStatus === 'sample-winner' ? 'gold' : 'blue'} />
          <span>{category?.title}</span>
          {liveEntry.liveRankSource === 'public-discovery' ? <span>Live discovery</span> : null}
        </div>
        <h3>{entry.title}</h3>
        <p className="creator-line">{creatorLabel}</p>
        <p>{entry.summary}</p>
        <div className="proof-stack card-proof-stack">
          <span>{creator?.verified ? 'Verified creator' : 'Identity pending'}</span>
          <span>Credits available</span>
          <span>Proof available</span>
          <span>Community support</span>
        </div>
        <div className="supporting-metrics">
          <span>Live fan signal</span>
          <span>Community support: {liveEntry.fanSupportScore ? `${liveEntry.fanSupportScore} public signals` : formatSats(entry.fanSupportSats)}</span>
        </div>
        <strong className="story-link-label">View the Story</strong>
      </div>
    </Link>
  );
}
