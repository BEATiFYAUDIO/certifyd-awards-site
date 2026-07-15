export type AwardStatus = 'preview' | 'upcoming' | 'open' | 'closed' | 'archived';

export type AwardGroup =
  | 'major'
  | 'music'
  | 'news'
  | 'technology'
  | 'gaming'
  | 'sports'
  | 'media'
  | 'published'
  | 'creator-integrity'
  | 'community'
  | 'innovation';

export type RenderType = 'song' | 'album' | 'video' | 'creator' | 'catalog' | 'proof' | 'commerce';

export interface Creator {
  id: string;
  name: string;
  handle: string;
  role: string;
  bio: string;
  nodeOrigin: string;
  avatarColor: string;
  avatarUrl?: string;
  wallpaperUrl?: string;
  verified: boolean;
  trustScore: number;
  followers: number;
  publicWorks: number;
}

export interface CreativeWork {
  id: string;
  title: string;
  creatorId: string;
  type: RenderType;
  genre: string;
  year: number;
  publicOrigin: string;
  sourceContentId?: string;
  publicUrl?: string;
  priceSats?: number;
  image: string;
  description: string;
  proofHash: string;
  manifestHash: string;
}

export interface ContributorCredit {
  creatorId: string;
  role: string;
  shareLabel?: string;
}

export interface ProofRecord {
  id: string;
  label: string;
  status: 'verified' | 'public' | 'pending';
  hash: string;
  source: string;
}

export interface ScoreComponent {
  label: string;
  reason: string;
  normalizedScore: number;
  weight: number;
}

export interface AwardCategory {
  id: string;
  slug: string;
  title: string;
  group: AwardGroup;
  summary: string;
  criteria: string[];
  status: AwardStatus;
  featured?: boolean;
}

export interface AwardEntry {
  id: string;
  year: number;
  categoryId: string;
  workId?: string;
  creatorId: string;
  title: string;
  summary: string;
  contributors: ContributorCredit[];
  proofs: ProofRecord[];
  scoring: ScoreComponent[];
  fanSupportSats: number;
  publicVotes: number;
  resultStatus: 'nominee' | 'sample-winner' | 'finalist';
}

export interface AwardYear {
  year: number;
  label: string;
  status: AwardStatus;
  theme: string;
  nominationWindow: string;
  votingWindow: string;
  ceremonyDate: string;
}

export interface HonoraryAward {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  status: 'established' | 'not-presented' | 'announced' | 'presented';
  selectionModel: string;
  values: string[];
  eligibility: string[];
  recipientIds: string[];
  presentationHistory: string[];
  citation: string | null;
}

export interface VotingRound {
  id: string;
  title: string;
  status: AwardStatus;
  description: string;
  startsAt: string;
  endsAt: string;
}

export interface TechnicalCategory {
  id: string;
  slug: string;
  title: string;
  family: 'Network Excellence' | 'Network Providers' | 'Infrastructure' | 'Platforms and Providers' | 'Developer Technology' | 'Commerce' | 'Data and Transparency' | 'AI';
  summary: string;
  eligibility: string[];
  metrics: string[];
}

export interface MeasurementSource {
  label: string;
  status: 'demonstration' | 'preview' | 'verified' | 'unavailable';
  lastUpdatedAt: string;
  period: string;
  methodology: string;
}

export interface TechnicalProvider {
  id: string;
  slug: string;
  name: string;
  type: string;
  summary: string;
  nodeOrigin: string;
  verificationStatus: 'Demonstration Data' | 'Preview Ranking' | 'Verified';
}

export interface TechnicalRanking {
  id: string;
  title: string;
  categorySlug: string;
  metricName: string;
  value: string;
  providerId: string;
  source: MeasurementSource;
}

export interface AwardCreator {
  id: string;
  slug: string;
  displayName: string;
  profileUrl: string;
  avatarUrl?: string;
  wallpaperUrl?: string;
  verified: boolean;
  verificationLabel: string;
  primaryRole: string;
  nominatedWorks: string[];
  source: 'seeded-awards-data' | 'creator-node';
  sourceUpdatedAt: string;
  accentColor: string;
}
