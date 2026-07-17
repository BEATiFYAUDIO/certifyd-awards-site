import { Link } from 'react-router-dom';
import { TitleVideoLayer } from '../components/TitleVideoLayer';
import { AwardCreatorCard } from '../components/awards/AwardCreatorCard';
import { NomineeCard } from '../components/awards/NomineeCard';
import { categories, getCategory } from '../data/awards';
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
        <TitleVideoLayer />
        <div className="division-title-copy hero-content">
          <span className="hero-kicker">Day 2 · Creative Excellence</span>
          <h1>Creative Excellence</h1>
          <p>Work. Stories. Performance. Community Impact.</p>
          <p className="hero-copy">Celebrating outstanding creators and original work through visible identity, publication records, collaborators, community support, and understandable scoring context.</p>
          <div className="hero-actions">
            <Link className="primary-action" to="/music/categories">Creative Excellence Categories</Link>
          </div>
        </div>
        <figure className="division-title-award hero-award-visual">
          <img src="/media/certifyd-awards-modern-trophy.png?v=20260717-fixed-logo-v7" alt="Certifyd Awards gold music note trophy" />
        </figure>
      </div>
      <section className="content-section tight award-category-section music-category-section"><div className="section-heading"><span className="eyebrow">Creative categories</span><h2>Work, stories, performance, and community impact.</h2></div><div className="category-strip">{creativeCategories.map((category) => (
        <Link className="large-category-tile text-category-tile" to={`/music/categories/${category.slug}`} key={category.id}><span className="eyebrow">{category.group.replace('-', ' ')}</span><h3>{category.title}</h3><p>{category.summary}</p></Link>
      ))}</div></section>
      <section className="content-section tight"><div className="section-heading"><span className="eyebrow">Featured nominees</span><h2>Works with visible credit and proof trails.</h2></div><div className="nominee-list two-column">{featuredEntries.map((entry) => <NomineeCard key={entry.id} entry={entry} />)}</div></section>
      <section className="content-section tight"><div className="section-heading"><span className="eyebrow">Creators</span><h2>People behind the work.</h2></div><div className="creator-awards-grid">{creators.map((creator, index) => <AwardCreatorCard key={creator.id} creator={creator} category={getCategory(featuredEntries[index]?.categoryId ?? '')?.title} score="Live fan signal" />)}</div></section>
    </section>
  );
}
