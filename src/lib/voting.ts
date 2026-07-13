import type { AwardEntry } from '../types';

export function previewVoteWeight(entry: AwardEntry): number {
  return Math.round(entry.publicVotes * 0.6 + entry.fanSupportSats / 1000);
}

export function votingDisclosure(): string {
  return 'Fans may support participating creators through transparent sats-backed community voting. Participation can produce public receipts and reduce spam, but community support is only one component. It does not replace craft, context, judging, or contributor recognition.';
}
