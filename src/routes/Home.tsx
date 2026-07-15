import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AwardCreatorCard } from '../components/awards/AwardCreatorCard';
import { NetworkCandidateCard } from '../components/awards/NetworkCandidateCard';
import { NomineeCard } from '../components/awards/NomineeCard';
import { ScoreBreakdown } from '../components/awards/ScoreBreakdown';
import { foundersAward, getCategory, getCreator, getWork } from '../data/awards';
import { artworkUrl } from '../lib/artwork';
import { useFanHydratedEntries } from '../hooks/useFanHydratedEntries';
import { useNetworkRankings } from '../hooks/useNetworkRankings';
import { creatorsFromFanEntries } from '../lib/fanDiscovery';

const creativeCategories = ['Work of the Year', 'Creator of the Year', 'Song of the Year', 'Album of the Year', 'Video of the Year', 'Podcast of the Year', 'Spoken Word of the Year', 'Independent Creator', 'Collaboration of the Year', 'Live Performance', 'Fan-Supported Work', 'Cultural Impact'];
const innovationCategories = ['Network Partner of the Year', 'Public Node Excellence', 'Creator Infrastructure Award', 'Publishing Excellence Award', 'Discovery Excellence Award', 'Identity Excellence Award', 'Community Node Award', 'Open Network Leadership Award', 'Verification Excellence Award', 'Creator Commerce Provider'];
const heroVideos = [
  '/media/awards-hero-carousel-1.mp4',
  '/media/awards-hero-carousel-2.mp4',
  '/media/awards-hero-carousel-3.mp4',
  '/media/awards-hero-carousel-4.mp4',
  '/media/awards-hero-carousel-5.mp4',
  '/media/awards-hero-carousel-6.mp4',
  '/media/awards-hero-carousel-7.mp4',
  '/media/awards-hero-carousel-8.mp4',
  '/media/awards-hero-carousel-9.mp4',
  '/media/awards-hero-carousel-10.mp4',
  '/media/awards-hero-carousel-11.mp4',
  '/media/awards-hero-carousel-12.mp4',
];

export function Home() {
  const [activeHeroVideo, setActiveHeroVideo] = useState(0);
  const { entries: hydratedEntries, loading: fanHydrating, updatedAt: fanUpdatedAt } = useFanHydratedEntries();
  const { rankings: liveTechnologyRankings, loading: networkLoading } = useNetworkRankings(undefined, 4);
  const featuredEntries = hydratedEntries.slice(0, 4);
  const creators = creatorsFromFanEntries(hydratedEntries, 3);
  const featured = featuredEntries[0];
  const featuredCreator = featured ? getCreator(featured.creatorId) : undefined;
  const featuredWork = featured ? getWork(featured.workId) : undefined;
  const featuredCategory = featured ? getCategory(featured.categoryId) : undefined;
  const featuredArtUrl = featured?.fanItem?.coverUrl || artworkUrl(featuredWork?.image);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveHeroVideo((current) => (current + 1) % heroVideos.length);
    }, 9000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className="awards-hero creator-hero">
        <video
          key={heroVideos[activeHeroVideo]}
          className="hero-video"
          src={heroVideos[activeHeroVideo]}
          autoPlay
          muted
          loop
          playsInline
          poster="/media/awards-stage.webp"
          aria-hidden="true"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <h1>Certifyd<br />Awards</h1>
          <p>Creators. Work. Credits. Culture.</p>
          <div className="hero-actions">
            <Link className="primary-action" to="/music">Explore the Awards</Link>
            <Link className="secondary-action" to="/nominate">Submit a Nomination</Link>
          </div>
        </div>
        <aside className="hero-award-visual" aria-label="Certifyd Awards trophy concept">
          <img src="/media/certifyd-awards-music-note-20260715.webp" alt="Certifyd Awards gold music note trophy" />
          <div className="hero-score-panel human-proof-panel">
            <span>Certifyd Awards</span>
            <p>Great work first. Evidence close behind.</p>
          </div>
        </aside>
      </section>

      {featured ? (
        <section className="featured-story-section">
          <div className="featured-story-art" style={featuredArtUrl ? undefined : { background: featuredWork?.image }} aria-hidden="true">
            {featuredArtUrl ? <img src={featuredArtUrl} alt="" /> : null}
          </div>
          <div className="featured-story-copy">
            <span className="eyebrow">Stories Worth Celebrating</span>
            <h2>{featured.title}</h2>
            <p>{featured.summary}</p>
            <div className="story-meta-list">
              <span>{featuredCreator?.name}</span>
              {featured.fanItem?.creatorHandle ? <span>@{String(featured.fanItem.creatorHandle).replace(/^@+/, '')}</span> : null}
              <span>{featuredCategory?.title}</span>
              <span>{featured.contributors.length} credited contributors</span>
              <span>Proof available</span>
            </div>
            <div className="story-actions">
              <Link className="secondary-action" to={`/nominees/${featured.id}`}>View the Story</Link>
              {featured.fanItem?.buyUrl || featured.fanItem?.publicUrl || featuredWork?.publicUrl ? <a className="secondary-action" href={String(featured.fanItem?.buyUrl || featured.fanItem?.publicUrl || featuredWork?.publicUrl)} target="_blank" rel="noreferrer">Open Work</a> : null}
            </div>
            <small className="muted">Live public discovery{fanUpdatedAt ? ` · ${fanUpdatedAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}` : ''}</small>
          </div>
        </section>
      ) : fanHydrating ? null : <section className="featured-story-section"><div className="featured-story-copy"><span className="eyebrow">Stories Worth Celebrating</span><h2>No live public discovery entries available.</h2><p>Current awards surfaces only show works returned by public creator-node discovery.</p></div></section>}

      <section className="weekend-section">
        <div className="section-heading centered">
          <span className="eyebrow">Certifyd Awards Weekend</span>
          <h2>Creative work. Creator infrastructure. Public proof.</h2>
        </div>
        <div className="pillar-grid">
          <article className="event-pillar music-pillar creator-pillar">
            <span className="day-label">Day 2</span>
            <h3>Creative Excellence</h3>
            <div className="proof-stack">{creativeCategories.slice(0, 6).map((label) => <span key={label}>{label}</span>)}</div>
            <Link to="/music">Explore Creative Excellence</Link>
          </article>
          <article className="event-pillar tech-pillar creator-pillar">
            <span className="day-label">Day 1</span>
            <h3>Creator Innovation</h3>
            <div className="proof-stack">{innovationCategories.slice(0, 6).map((label) => <span key={label}>{label}</span>)}</div>
            <Link to="/technology">Explore Creator Innovation</Link>
          </article>
        </div>
      </section>

      <section className="founders-home-section">
        <div className="founders-home-copy">
          <span className="eyebrow">The Highest Honor</span>
          <h2>The Vassal Benford<br />Founders&apos; Award</h2>
          <p>Presented only in exceptional circumstances, the Vassal Benford Founders&apos; Award recognizes an individual whose lifetime of leadership, creativity, innovation, mentorship, and service has fundamentally advanced creators, music, culture, and the wider creative community.</p>
          <p>Unlike competitive categories, this honor is not defined by a single work or a single year. It recognizes those whose vision opened doors for others and helped shape the future of creative independence.</p>
          <strong>Presented only when truly earned.</strong>
          <div className="story-actions">
            <Link className="primary-action" to="/founders-award">Learn About the Founders&apos; Award</Link>
            <span className="status-pill preview">Non-competitive honor</span>
          </div>
        </div>
        <figure className="founders-home-visual" aria-label={foundersAward.name}>
          <img src="/media/certifyd-awards-music-note-20260715.webp" alt="Certifyd Awards gold music note trophy" />
        </figure>
      </section>

      <section className="content-section">
        <div className="section-heading inline">
          <div>
            <span className="eyebrow">Featured nominees</span>
            <h2>Works with visible proof.</h2>
          </div>
          <span className="status-pill preview">Preview season</span>
        </div>
        <div className="nominee-list two-column editorial-list">
          {featuredEntries.map((entry) => <NomineeCard key={entry.id} entry={entry} />)}
        </div>
      </section>

      <section className="behind-work-section">
        <div>
          <span className="eyebrow">Behind Every Great Work</span>
          <h2>Credit the people behind it.</h2>
        </div>
        <div className="contributor-cloud">
          {['Creator', 'Songwriter', 'Producer', 'Engineer', 'Performer', 'Visual artist', 'Publisher', 'Platform', 'Provider', 'Technical collaborator'].map((role) => <span key={role}>{role}</span>)}
        </div>
      </section>

      <section className="content-section scoring-showcase warm-scoring">
        <div>
          <span className="eyebrow">Recognition Backed by Proof</span>
          <h2>Clear signals. Human judgment.</h2>
        </div>
        {featured ? <ScoreBreakdown scoring={featured.scoring} /> : null}
      </section>

      <section className="content-section">
        <div className="section-heading inline">
          <div>
            <span className="eyebrow">Creator and contributor spotlights</span>
            <h2>People behind the work.</h2>
          </div>
          <Link to="/nominees">View nominees</Link>
        </div>
        <div className="creator-awards-grid">
          {creators.map((creator, index) => <AwardCreatorCard key={creator.id} creator={creator} category={getCategory(featuredEntries[index]?.categoryId ?? '')?.title} score="Live fan signal" />)}
        </div>
      </section>

      <section className="rankings-section innovation-rankings">
        <div className="section-heading inline">
          <div>
            <span className="eyebrow">Network operators supporting creators</span>
            <h2>{networkLoading ? 'Eligible network candidates' : `${liveTechnologyRankings.length} eligible network candidates`}</h2>
            <p className="muted">Pulled from the Certifyd Network map. This is the current operator candidate pool, not a broad public leaderboard.</p>
          </div>
          <Link to="/technology">Explore Creator Innovation</Link>
        </div>
        <div className="ranking-grid innovation-ranking-grid operator-candidate-grid">
          {liveTechnologyRankings.map((ranking, index) => (
            <NetworkCandidateCard ranking={ranking} index={index} total={liveTechnologyRankings.length} key={ranking.id} />
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="vegas-image" aria-hidden="true" />
        <div>
          <span className="eyebrow">Participation</span>
          <h2>Nominate work worth celebrating.</h2>
          <p>Submit a creator, work, collaboration, or provider with public proof.</p>
          <Link className="primary-action" to="/nominate">Submit a Nomination</Link>
        </div>
      </section>
    </>
  );
}
