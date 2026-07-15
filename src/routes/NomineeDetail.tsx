import { Link, useParams } from 'react-router-dom';
import { ContributorCredits } from '../components/awards/ContributorCredits';
import { ProofRecordList } from '../components/awards/ProofRecordList';
import { ScoreBreakdown } from '../components/awards/ScoreBreakdown';
import { VerificationBadge } from '../components/VerificationBadge';
import { getCategory, getCreator, getEntry, getWork } from '../data/awards';
import { formatSats } from '../lib/formatting';
import { NotFound } from './NotFound';
import { artworkUrl } from '../lib/artwork';
import { useFanHydratedEntries } from '../hooks/useFanHydratedEntries';
import type { FanHydratedEntry } from '../lib/fanDiscovery';

export function NomineeDetail() {
  const { entryId } = useParams();
  const { entries: liveEntries, loading } = useFanHydratedEntries();
  const entry = entryId ? liveEntries.find((row) => row.id === entryId) : undefined;
  const staleSeededEntry = entryId ? getEntry(entryId) : undefined;
  if (!entry) {
    if (loading) return <section className="page-section"><p className="lead">Loading live Fan PWA award entry…</p></section>;
    if (staleSeededEntry) {
      return (
        <section className="page-section">
          <span className="eyebrow">Offline entry</span>
          <h1>This work is not live in Fan PWA discovery right now.</h1>
          <p className="lead">Awards pages now render current Fan PWA data only. If the creator node returns this content again, it will reappear automatically.</p>
          <Link className="secondary-action" to="/nominees">Back to live nominees</Link>
        </section>
      );
    }
    return <NotFound />;
  }

  const creator = getCreator(entry.creatorId);
  const work = getWork(entry.workId);
  const category = getCategory(entry.categoryId);
  const liveEntry = entry as FanHydratedEntry;
  const artUrl = liveEntry.fanItem?.coverUrl || artworkUrl(work?.image);
  const creatorLabel = liveEntry.fanItem?.creatorHandle ? `@${String(liveEntry.fanItem.creatorHandle).replace(/^@+/, '')}` : creator?.name;

  return (
    <section className="page-section detail-page">
      <div className="detail-hero glass-card">
        <div>
          <div className="card-meta"><VerificationBadge label={entry.resultStatus.replace('-', ' ')} /><span>{category?.title}</span></div>
          <h1>{entry.title}</h1>
          <p className="lead">{entry.summary}</p>
          <div className="proof-stack">
            <span>{creatorLabel}</span><span>{work?.genre ?? String(liveEntry.fanItem?.contentType || creator?.role || 'Work')}</span><span>Public support signal: {liveEntry.fanSupportScore || formatSats(entry.fanSupportSats)}</span><span>Fan PWA live entry</span><span>Proof available</span>
          </div>
        </div>
        <div className="detail-art" style={artUrl ? undefined : { background: work?.image ?? creator?.avatarColor }}>
          {artUrl ? <img src={artUrl} alt="" /> : null}
        </div>
      </div>

      <ScoreBreakdown scoring={entry.scoring} />

      <section className="glass-card">
        <div className="section-heading"><span className="eyebrow">Attribution</span><h2>Contributors and public credits</h2></div>
        <ContributorCredits credits={entry.contributors} />
      </section>

      <section className="glass-card">
        <div className="section-heading"><span className="eyebrow">Proof records</span><h2>Inspectable records behind this nomination</h2></div>
        <ProofRecordList proofs={entry.proofs} />
      </section>

      <section className="glass-card disclosure-card">
        <span className="eyebrow">Preview disclosure</span>
        <h2>Live discovery data, not seeded placement.</h2>
        <p>This page is built from the current Fan PWA discovery feed. Ranking uses public support, recency, relationship, and availability signals returned by creator nodes.</p>
        <div className="hero-actions">
          <Link className="secondary-action" to="/methodology">Read methodology</Link>
          {liveEntry.fanItem?.buyUrl || liveEntry.fanItem?.publicUrl || work?.publicUrl ? <a className="primary-action" href={String(liveEntry.fanItem?.buyUrl || liveEntry.fanItem?.publicUrl || work?.publicUrl)} target="_blank" rel="noreferrer">Open Public Work</a> : null}
        </div>
      </section>
    </section>
  );
}
