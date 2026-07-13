import type { AwardEntry } from '../types';

export function previewVoteWeight(entry: AwardEntry): number {
  return Math.round(entry.publicVotes * 0.6 + entry.fanSupportSats / 1000);
}

export function votingDisclosure(): string {
  return 'Voting is a public preview model only. No live production votes or blockchain commitments are being recorded on this site.';
}
