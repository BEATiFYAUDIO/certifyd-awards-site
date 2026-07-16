import type { TechnicalCategory, TechnicalProvider, TechnicalRanking } from '../types';

export const networkAwardIntro =
  'Creator Innovation honors individuals, organizations, platforms, and institutions whose technical contributions materially advance how creators publish, distribute, document, and sustain their work.';

export const networkParticipationCopy =
  'These awards recognize outstanding technical significance in creator infrastructure: reliable access, portable identity, durable records, direct commerce, and systems that help creative work reach its audience.';

export const technologyCategories: TechnicalCategory[] = [
  {
    id: 'tech-network-partner',
    slug: 'network-partner-of-the-year',
    title: 'Network Partner of the Year',
    family: 'Network Excellence',
    summary: 'Recognizes a Certifyd Network participant making a substantial technical contribution to creator publishing, access, and direct commerce.',
    eligibility: ['Registered Certifyd Network node', 'Creator-facing services', 'Public operator identity', 'Reachable canonical provider URL'],
    metrics: ['Network participation', 'Creator profiles hosted', 'Recorded works served', 'Community contribution'],
  },
  {
    id: 'tech-public-node',
    slug: 'public-node-excellence',
    title: 'Public Node Excellence',
    family: 'Network Excellence',
    summary: 'Honors public nodes that make creator works, profiles, release records, and commerce endpoints available to audiences.',
    eligibility: ['Public node origin', 'Identity/content/records roles', 'Reachable public routes', 'Node identity continuity'],
    metrics: ['Availability', 'Successful discovery requests', 'Published works hosted', 'Average response time'],
  },
  {
    id: 'tech-community-node',
    slug: 'community-node-award',
    title: 'Community Node Award',
    family: 'Network Excellence',
    summary: 'Recognizes operators supporting independent creator communities with reliable discovery and commerce infrastructure.',
    eligibility: ['Community or creator-group operator', 'Public profile support', 'Record capability', 'Operator contact path'],
    metrics: ['Creator profiles hosted', 'Release records maintained', 'Community contribution', 'Network participation'],
  },
  {
    id: 'tech-open-network',
    slug: 'open-network-leadership-award',
    title: 'Open Network Leadership Award',
    family: 'Network Excellence',
    summary: 'Recognizes leadership in building open, creator-serving infrastructure instead of closed platform dependency.',
    eligibility: ['Public network participation', 'Stable canonical URL', 'Published capabilities', 'Creator benefit clearly documented'],
    metrics: ['Published works hosted', 'Review requests completed', 'Release records maintained', 'Network participation'],
  },
  {
    id: 'tech-availability',
    slug: 'network-reliability-award',
    title: 'Network Reliability Award',
    family: 'Network Excellence',
    summary: 'Recognizes nodes that help creators keep work online and accessible when fans try to discover or support it.',
    eligibility: ['Reachable public route', 'Durable node identity', 'Availability telemetry', 'Public service status'],
    metrics: ['Availability', 'Average response time', 'Successful discovery requests', 'Content availability'],
  },
  {
    id: 'tech-discovery',
    slug: 'discovery-excellence-award',
    title: 'Discovery Excellence Award',
    family: 'Network Excellence',
    summary: 'Recognizes nodes that make creator works easier to find, understand, and route back to the correct creator origin.',
    eligibility: ['Discovery endpoint support', 'Canonical work IDs', 'Creator profile links', 'Metadata completeness'],
    metrics: ['Successful discovery requests', 'Published works hosted', 'Creator profiles hosted', 'Metadata completeness'],
  },
  {
    id: 'tech-publishing',
    slug: 'publishing-excellence-award',
    title: 'Publishing Excellence Award',
    family: 'Network Providers',
    summary: 'Recognizes infrastructure that helps creators publish durable work records with clear identity and reviewable release materials.',
    eligibility: ['Content hosting capability', 'Public publishing surface', 'Manifest and release records', 'Creator-owned profile linkage'],
    metrics: ['Published works hosted', 'Recorded works served', 'Release records maintained', 'Content availability'],
  },
  {
    id: 'tech-identity',
    slug: 'identity-excellence-award',
    title: 'Identity Excellence Award',
    family: 'Network Providers',
    summary: 'Recognizes identity infrastructure that helps creators carry consistent profiles, handles, and attribution across surfaces.',
    eligibility: ['Identity capability', 'Public creator profiles', 'Stable handles', 'Profile portability'],
    metrics: ['Creator profiles hosted', 'Verification requests completed', 'Profile completeness', 'Network participation'],
  },
  {
    id: 'tech-verification',
    slug: 'verification-excellence-award',
    title: 'Verification Excellence Award',
    family: 'Network Providers',
    summary: 'Recognizes verification infrastructure that makes authorship, publishing, and receipt records easier to inspect.',
    eligibility: ['Verification capability', 'Public release records', 'Reviewable creator/work relationships', 'Inspectable source data'],
    metrics: ['Verification requests completed', 'Release records maintained', 'Recorded works served', 'Average response time'],
  },
  {
    id: 'tech-commerce',
    slug: 'creator-commerce-provider-award',
    title: 'Creator Commerce Provider',
    family: 'Network Providers',
    summary: 'Recognizes commerce services that help creators sell directly, settle support, and keep ownership visible.',
    eligibility: ['Commerce role advertised', 'Settlement role advertised', 'Canonical provider URL', 'Creator-facing buy/support flow'],
    metrics: ['Commerce readiness', 'Settlement readiness', 'Network participation', 'Community contribution'],
  },
];

export const technicalProviders: TechnicalProvider[] = [
  {
    id: 'provider-certifyd-creator-node',
    slug: 'certifyd-creator',
    name: 'Certifyd Creator',
    type: 'Founding Certifyd node operator',
    summary: 'Public creator-node participation is tracked on the Certifyd Network map; awards discovery cards show live works returned by creator nodes.',
    nodeOrigin: 'https://public.certifyd.me',
    verificationStatus: 'Preview Ranking',
  },
];

export const technicalRankings: TechnicalRanking[] = [
  {
    id: 'rank-network-partner-certifyd',
    title: 'Network Partner of the Year',
    categorySlug: 'network-partner-of-the-year',
    metricName: 'Network participation',
    value: '6 roles',
    providerId: 'provider-certifyd-creator-node',
    source: { label: 'Network map preview', status: 'preview', lastUpdatedAt: '2026-07-13', period: '2026 preview window', methodology: 'Certifyd Creator advertises creator, identity, content, commerce, settlement, and records roles. This supports creator-owned commerce without forcing creators into a single closed platform.' },
  },
  {
    id: 'rank-public-node-certifyd',
    title: 'Public Node Excellence',
    categorySlug: 'public-node-excellence',
    metricName: 'Published works hosted',
    value: '12 works',
    providerId: 'provider-certifyd-creator-node',
    source: { label: 'Creator impact preview', status: 'preview', lastUpdatedAt: '2026-07-13', period: '2026 preview window', methodology: 'Published works hosted is treated as creator impact, not raw infrastructure trivia: it reflects how much work can be surfaced and routed back to its creator node.' },
  },
  {
    id: 'rank-reliability-certifyd',
    title: 'Network Reliability Award',
    categorySlug: 'network-reliability-award',
    metricName: 'Reachability',
    value: 'Ready',
    providerId: 'provider-certifyd-creator-node',
    source: { label: 'Network map preview', status: 'preview', lastUpdatedAt: '2026-07-13', period: '2026 preview window', methodology: 'Reachability matters because creators lose discovery and commerce opportunities when their public node cannot be reached.' },
  },
  {
    id: 'rank-identity-certifyd',
    title: 'Identity Excellence Award',
    categorySlug: 'identity-excellence-award',
    metricName: 'Creator profiles hosted',
    value: '12 profiles',
    providerId: 'provider-certifyd-creator-node',
    source: { label: 'Profile preview data', status: 'preview', lastUpdatedAt: '2026-07-13', period: '2026 preview window', methodology: 'Creator profiles hosted is presented because identity is how creators carry attribution, credits, and commerce context across the network.' },
  },
];

export function getTechnologyCategory(slug: string) {
  return technologyCategories.find((category) => category.slug === slug || category.id === slug);
}

export function getTechnicalProvider(id: string) {
  return technicalProviders.find((provider) => provider.id === id || provider.slug === id);
}

const technologyAwardImageSlugs = new Set(technologyCategories.map((category) => category.slug));
export function getTechnologyAwardImageUrl(category: TechnicalCategory) {
  return technologyAwardImageSlugs.has(category.slug) ? `/media/technology-categories/${category.slug}.webp?v=20260715-network-revert` : undefined;
}
