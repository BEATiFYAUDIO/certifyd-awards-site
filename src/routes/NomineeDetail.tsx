import { Link, useParams } from 'react-router-dom';
import { ContributorCredits } from '../components/awards/ContributorCredits';
import { ProofRecordList } from '../components/awards/ProofRecordList';
import { ScoreBreakdown } from '../components/awards/ScoreBreakdown';
import { VerificationBadge } from '../components/VerificationBadge';
import { getCategory, getCreator, getEntry, getWork } from '../data/awards';
import { formatSats } from '../lib/formatting';
import { NotFound } from './NotFound';
import { artworkUrl } from '../lib/artwork';

export function NomineeDetail() {
  const { entryId } = useParams();
  const entry = entryId ? getEntry(entryId) : undefined;
  if (!entry) return <NotFound />;

  const creator = getCreator(entry.creatorId);
  const work = getWork(entry.workId);
  const category = getCategory(entry.categoryId);
  const artUrl = artworkUrl(work?.image);

  return (
    <section className="page-section detail-page">
      <div className="detail-hero glass-card">
        <div>
          <div className="card-meta"><VerificationBadge label={entry.resultStatus.replace('-', ' ')} /><span>{category?.title}</span></div>
          <h1>{entry.title}</h1>
          <p className="lead">{entry.summary}</p>
          <div className="proof-stack">
            <span>{creator?.name}</span><span>{work?.genre ?? creator?.role}</span><span>Community support: {formatSats(entry.fanSupportSats)}</span><span>{entry.publicVotes} preview participants</span><span>Proof available</span>
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
        <h2>No live production result is claimed.</h2>
        <p>This page demonstrates the structure of a Certifyd award credential: nominee identity, creator node, work proof, community support, contributors, and weighted scoring. Final live voting is not active on this site.</p>
        <div className="hero-actions">
          <Link className="secondary-action" to="/methodology">Read methodology</Link>
          {work?.publicUrl ? <a className="primary-action" href={work.publicUrl} target="_blank" rel="noreferrer">Open Public Work</a> : null}
        </div>
      </section>
    </section>
  );
}
