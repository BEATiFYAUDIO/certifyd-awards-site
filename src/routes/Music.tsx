import { Link } from 'react-router-dom';
import { AwardCreatorCard } from '../components/awards/AwardCreatorCard';
import { NomineeCard } from '../components/awards/NomineeCard';
import { categories, entries } from '../data/awards';
import { getAwardCreators } from '../lib/creatorAdapter';
import { entryScore, formatScore, rankEntries } from '../lib/scoring';

export function Music() {
  const musicCategories = categories.filter((category) => ['major', 'music', 'creator-integrity', 'community'].includes(category.group));
  const featuredEntries = rankEntries(entries).slice(0, 5);
  const creators = getAwardCreators();

  return (
    <section className="page-section awards-division-page">
      <span className="eyebrow">Day 2</span>
      <h1>Music Awards</h1>
      <p className="lead">Recognizing artists, works, contributors, performances, and creator excellence with complete credits and explainable results.</p>
      <div className="division-hero music-division">
        <div><h2>Creator recognition that shows the work behind the work.</h2><p>Music awards include identity, publication manifests, collaborators, support receipts, and weighted scoring context.</p></div>
        <Link className="primary-action" to="/music/categories">Music Categories</Link>
      </div>
      <section className="content-section tight"><div className="section-heading"><span className="eyebrow">Major and signature categories</span><h2>Music categories</h2></div><div className="category-strip">{musicCategories.map((category) => <Link className="large-category-tile" to={`/music/categories/${category.slug}`} key={category.id}><h3>{category.title}</h3><p>{category.summary}</p></Link>)}</div></section>
      <section className="content-section tight"><div className="section-heading"><span className="eyebrow">Featured nominees</span><h2>Works with visible proof trails</h2></div><div className="nominee-list two-column">{featuredEntries.map((entry) => <NomineeCard key={entry.id} entry={entry} />)}</div></section>
      <section className="content-section tight"><div className="section-heading"><span className="eyebrow">Creators</span><h2>Awards-specific creator cards</h2></div><div className="creator-awards-grid">{creators.map((creator, index) => <AwardCreatorCard key={creator.id} creator={creator} score={`${formatScore(entryScore(featuredEntries[index] ?? featuredEntries[0]))} score`} />)}</div></section>
    </section>
  );
}
