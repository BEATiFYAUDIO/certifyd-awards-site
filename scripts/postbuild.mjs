import { mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

const musicCategorySlugs = [
  'work-of-the-year',
  'song-of-the-year',
  'music-video-of-the-year',
  'artist-of-the-year',
  'new-artist-of-the-year',
  'producer-of-the-year',
  'songwriter-of-the-year',
  'independent-release-of-the-year',
  'most-transparent-creator',
  'best-verified-catalog',
  'proof-of-authorship',
  'creator-trust-award',
  'best-rights-documentation',
  'most-complete-credits',
  'fan-supported-creator',
];

const technologyCategorySlugs = [
  'infrastructure-provider-of-the-year',
  'public-node-of-the-year',
  'identity-provider-of-the-year',
  'api-excellence-award',
  'creator-commerce-platform-of-the-year',
  'metadata-excellence-award',
  'responsible-ai-award',
];

const nomineeSlugs = [
  'entry-godspeed-work-year',
  'entry-we-own-video',
  'entry-newsmax-commerce',
  'entry-transparent-darryl',
  'entry-suenos-song',
  'entry-blessed-fan',
];

const routes = [
  'technology',
  'creator-innovation',
  'technology/categories',
  'creator-innovation/categories',
  ...technologyCategorySlugs.map((slug) => `technology/categories/${slug}`),
  ...technologyCategorySlugs.map((slug) => `creator-innovation/categories/${slug}`),
  'music',
  'creative-excellence',
  'music/categories',
  'creative-excellence/categories',
  ...musicCategorySlugs.map((slug) => `music/categories/${slug}`),
  ...musicCategorySlugs.map((slug) => `creative-excellence/categories/${slug}`),
  'categories',
  ...musicCategorySlugs.map((slug) => `categories/${slug}`),
  'nominees',
  ...nomineeSlugs.map((slug) => `nominees/${slug}`),
  'winners',
  'winners/2026',
  'winners/2025',
  'founders-award',
  'methodology',
  'nominate',
  'about',
];

const indexPath = join('dist', 'index.html');
await copyFile(indexPath, join('dist', '404.html'));

await Promise.all(routes.map(async (route) => {
  const dir = join('dist', route);
  await mkdir(dir, { recursive: true });
  await copyFile(indexPath, join(dir, 'index.html'));
}));

console.log(`Generated SPA files for ${routes.length} direct routes.`);
