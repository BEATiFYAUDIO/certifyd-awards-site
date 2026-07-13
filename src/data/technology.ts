import type { TechnicalCategory, TechnicalProvider, TechnicalRanking } from '../types';

export const technologyCategories: TechnicalCategory[] = [
  { id: 'tech-infra-provider', slug: 'infrastructure-provider-of-the-year', title: 'Infrastructure Partner of the Year', family: 'Infrastructure', summary: 'Recognizes a technical partner helping creators keep published work available, discoverable, and reliable.', eligibility: ['Public or partner-facing infrastructure', 'Operational telemetry available', 'Documented role in creator publishing or access'], metrics: ['Availability', 'Requests served', 'Proof resolution time', 'Operational transparency'] },
  { id: 'tech-public-node', slug: 'public-node-of-the-year', title: 'Public Node Excellence', family: 'Infrastructure', summary: 'Recognizes a public node that helps audiences discover creator works, profiles, and proof records.', eligibility: ['Public node origin', 'Discoverable records', 'Node identity continuity'], metrics: ['Uptime', 'Discovery response rate', 'Catalog size', 'Metadata completeness'] },
  { id: 'tech-identity-provider', slug: 'identity-provider-of-the-year', title: 'Creator Identity Excellence', family: 'Platforms and Providers', summary: 'Recognizes systems that help creators carry identity, verification, and trust across surfaces.', eligibility: ['Creator identity records', 'Verification process', 'Profile portability'], metrics: ['Verified identities', 'Profile completeness', 'Resolution latency'] },
  { id: 'tech-api-excellence', slug: 'api-excellence-award', title: 'Developer Experience Award', family: 'Developer Technology', summary: 'Recognizes developer tools that make creator proof, commerce, and playback authorization easier to integrate.', eligibility: ['Documented public or partner API', 'Stable error model', 'Versioning discipline'], metrics: ['Availability', 'Latency', 'Docs coverage', 'Developer adoption'] },
  { id: 'tech-commerce-platform', slug: 'creator-commerce-platform-of-the-year', title: 'Creator Commerce Platform of the Year', family: 'Commerce', summary: 'Recognizes commerce systems connecting support, receipts, unlocks, and creator-owned relationships.', eligibility: ['Creator payment flow', 'Receipt records', 'Access-state clarity'], metrics: ['Payment success', 'Receipt coverage', 'Unlock reliability'] },
  { id: 'tech-metadata', slug: 'metadata-excellence-award', title: 'Proof and Attribution Excellence', family: 'Data and Transparency', summary: 'Recognizes high-quality credits, metadata, rights, and manifest coverage that preserve authorship.', eligibility: ['Structured metadata', 'Contributor records', 'Rights fields'], metrics: ['Completeness', 'Consistency', 'Proof coverage'] },
  { id: 'tech-ai-responsible', slug: 'responsible-ai-award', title: 'Responsible AI Award', family: 'AI', summary: 'Recognizes AI tools that preserve attribution, creator consent, and transparency.', eligibility: ['AI workflow disclosure', 'Creator controls', 'Attribution safeguards'], metrics: ['Disclosure quality', 'Attribution support', 'Creator control coverage'] },
];

export const technicalProviders: TechnicalProvider[] = [
  { id: 'provider-contentbox', slug: 'contentbox', name: 'Contentbox', type: 'Creator commerce and access', summary: 'Canonical authority for payments, receipts, entitlements, publishing records, and playback authorization.', nodeOrigin: 'https://certifyd.darrylhillock.com', verificationStatus: 'Demonstration Data' },
  { id: 'provider-certifyd-network', slug: 'certifyd-network', name: 'Certifyd Network', type: 'Creator proof network', summary: 'Public discovery, proof, attribution, and creator graph infrastructure.', nodeOrigin: 'https://certifyd.me', verificationStatus: 'Demonstration Data' },
  { id: 'provider-beatify-node', slug: 'beatify-public-node', name: 'Beatify Public Node', type: 'Public creator node', summary: 'A public node demonstrating creator profiles, works, receipts, and node-origin discovery.', nodeOrigin: 'https://certifyd.beatifygroup.com', verificationStatus: 'Preview Ranking' },
];

export const technicalRankings: TechnicalRanking[] = [
  { id: 'rank-infra', title: 'Infrastructure Partner of the Year', categorySlug: 'infrastructure-provider-of-the-year', metricName: 'Preview availability', value: '99.2%', providerId: 'provider-contentbox', source: { label: 'Seeded measurement model', status: 'demonstration', lastUpdatedAt: '2026-07-13', period: '2026 preview window', methodology: 'Demonstrates how availability would be shown from public health checks and deployment telemetry.' } },
  { id: 'rank-public-node', title: 'Public Node Excellence', categorySlug: 'public-node-of-the-year', metricName: 'Discoverable works', value: '42 works', providerId: 'provider-beatify-node', source: { label: 'Seeded node inventory', status: 'preview', lastUpdatedAt: '2026-07-13', period: '2026 preview window', methodology: 'Shows how node catalog size and metadata completeness would be disclosed.' } },
  { id: 'rank-proof', title: 'Proof and Attribution Excellence', categorySlug: 'metadata-excellence-award', metricName: 'Proof coverage', value: '94%', providerId: 'provider-certifyd-network', source: { label: 'Seeded proof audit', status: 'demonstration', lastUpdatedAt: '2026-07-13', period: '2026 preview window', methodology: 'Calculated from seeded records with manifest, identity, contributor, and receipt proof fields.' } },
];

export function getTechnologyCategory(slug: string) {
  return technologyCategories.find((category) => category.slug === slug || category.id === slug);
}

export function getTechnicalProvider(id: string) {
  return technicalProviders.find((provider) => provider.id === id || provider.slug === id);
}
