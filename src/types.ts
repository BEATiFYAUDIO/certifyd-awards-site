export type AwardStatus = 'preview' | 'upcoming' | 'open' | 'closed' | 'archived';

export type AwardGroup =
  | 'major'
  | 'music'
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

export interface VotingRound {
  id: string;
  title: string;
  status: AwardStatus;
  description: string;
  startsAt: string;
  endsAt: string;
}
