import type { AwardEntry } from '../types';

export function verifiedProofCount(entry: AwardEntry): number {
  return entry.proofs.filter((proof) => proof.status === 'verified').length;
}

export function hasPublicReceiptTrail(entry: AwardEntry): boolean {
  return entry.proofs.some((proof) => /receipt|support|sats/i.test(proof.label));
}
