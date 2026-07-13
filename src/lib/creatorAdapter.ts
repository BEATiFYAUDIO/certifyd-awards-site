import { entries, getCreator, getWork } from '../data/awards';
import type { AwardCreator, Creator } from '../types';

function safeUrl(value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return 'https://certifyd.me';
    return url.origin;
  } catch {
    return 'https://certifyd.me';
  }
}

export function toAwardCreator(creator: Creator): AwardCreator {
  const creatorEntries = entries.filter((entry) => entry.creatorId === creator.id);
  return {
    id: creator.id,
    slug: creator.handle,
    displayName: creator.name || creator.handle,
    profileUrl: `${safeUrl(creator.nodeOrigin)}/u/${creator.handle}`,
    verified: creator.verified,
    verificationLabel: creator.verified ? 'Verified identity' : 'Identity pending',
    primaryRole: creator.role || 'Creator',
    nominatedWorks: creatorEntries.map((entry) => getWork(entry.workId)?.title ?? entry.title).filter(Boolean),
    source: 'seeded-awards-data',
    sourceUpdatedAt: '2026-07-13',
    accentColor: creator.avatarColor || '#54A5F0',
  };
}

export function getAwardCreators(): AwardCreator[] {
  const seen = new Set<string>();
  return entries
    .map((entry) => getCreator(entry.creatorId))
    .filter((creator): creator is Creator => Boolean(creator))
    .filter((creator) => {
      if (seen.has(creator.id)) return false;
      seen.add(creator.id);
      return true;
    })
    .map(toAwardCreator);
}
