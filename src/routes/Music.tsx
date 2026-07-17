import { Link } from 'react-router-dom';
import { AwardCreatorCard } from '../components/awards/AwardCreatorCard';
import { NomineeCard } from '../components/awards/NomineeCard';
import { categories, getCategory, getCategoryAwardImageUrl } from '../data/awards';
import { useFanHydratedEntries } from '../hooks/useFanHydratedEntries';
import { creatorsFromFanEntries } from '../lib/fanDiscovery';

export function Music() {
  const creativeCategories = categories.filter((category) => ['major', 'music', 'news', 'technology', 'gaming', 'sports', 'media', 'published', 'creator-integrity', 'community'].includes(category.group));
  const { entries: hydratedEntries } = useFanHydratedEntries();
  const featuredEntries = hydratedEntries.slice(0, 5);
  const creators = creatorsFromFanEntries(hydratedEntries);

  return (
    <section className="page-section awards-division-page">
      <div className="division-title-hero music-title-hero">
        <div className="division-title-copy">
          <span className="eyebrow">Day 2 · Creative Excellence</span>
          <h1>Creative Excellence</h1>
          <p className="lead">Celebrating outstanding creators, performances, stories, recordings, collaborations, and original work.</p>
          <p>Creator recognition that shows the work behind the work through identity, publication records, collaborators, community support, and understandable scoring context.</p>
          <div className="hero-actions">
            <Link className="primary-action" to="/music/categories">Creative Excellence Categories</Link>
          </div>
        </div>
        <figure className="division-title-award">
          <img src="/media/certifyd-awards-modern-trophy.png?v=20260717-fixed-logo-v7" alt="Certifyd Awards gold music note trophy" />
        </figure>
      </div>
      <section className="content-section tight award-category-section"><div className="section-heading"><span className="eyebrow">Creative categories</span><h2>Work, stories, performance, and community impact.</h2></div><div className="category-strip">{creativeCategories.map((category) => {
        const imageUrl = getCategoryAwardImageUrl(category);
        return <Link className="large-category-tile" to={`/music/categories/${category.slug}`} key={category.id}>{imageUrl ? <img className="category-award-image" src={imageUrl} alt="" loading="lazy" /> : null}<h3>{category.title}</h3><p>{category.summary}</p></Link>;
      })}</div></section>
      <section className="content-section tight"><div className="section-heading"><span className="eyebrow">Featured nominees</span><h2>Works with visible credit and proof trails.</h2></div><div className="nominee-list two-column">{featuredEntries.map((entry) => <NomineeCard key={entry.id} entry={entry} />)}</div></section>
      <section className="content-section tight"><div className="section-heading"><span className="eyebrow">Creators</span><h2>People behind the work.</h2></div><div className="creator-awards-grid">{creators.map((creator, index) => <AwardCreatorCard key={creator.id} creator={creator} category={getCategory(featuredEntries[index]?.categoryId ?? '')?.title} score="Live fan signal" />)}</div></section>
    </section>
  );
}
