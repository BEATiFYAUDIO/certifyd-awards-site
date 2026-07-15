import { getCreator, getWork } from '../data/awards';
import { calculateWeightedScore } from './scoring';
import type { AwardCreator, AwardEntry, CreativeWork, TechnicalRanking } from '../types';

export type FanDiscoverableItem = {
  contentId?: string;
  id?: string;
  sourceContentId?: string;
  title?: string | null;
  description?: string | null;
  creatorHandle?: string | null;
  contentType?: string | null;
  genre?: string | null;
  primaryTopic?: string | null;
  coverUrl?: string | null;
  previewUrl?: string | null;
  publicOrigin?: string | null;
  publicUrl?: string | null;
  buyUrl?: string | null;
  offerUrl?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  [key: string]: unknown;
};

export type FanHydratedEntry = AwardEntry & {
  fanItem?: FanDiscoverableItem;
  fanScore: number;
  fanSupportScore: number;
  fanRelationshipScore: number;
  fanSortTime: number;
  liveRankSource: 'public-discovery' | 'seeded-awards-data';
};

type OriginsResponse = { origins?: string[] };
type DiscoverableResponse = { items?: FanDiscoverableItem[]; cursor?: string | null };

const CACHE_MS = 60_000;
const REQUEST_TIMEOUT_MS = 4500;
const DEFAULT_LIMIT = 48;
const MAX_PAGES_PER_ORIGIN = 3;
const originsPath = '/fan-origins.json';
let cache: { expiresAt: number; promise: Promise<FanDiscoverableItem[]> } | null = null;

function normalizeOrigin(value: string | null | undefined): string {
  return String(value || '').trim().replace(/\/+$/, '').toLowerCase();
}

function normalizeId(value: unknown): string {
  return String(value || '').trim().toLowerCase();
}

function resolveUrl(value: unknown, origin: string): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    return new URL(value.trim(), `${origin}/`).toString();
  } catch {
    return null;
  }
}

function publicNumberSignal(item: FanDiscoverableItem, keys: string[]): number {
  for (const key of keys) {
    const value = item[key];
    if (typeof value === 'number' && Number.isFinite(value) && value > 0) return value;
    if (typeof value === 'string') {
      const parsed = Number(value);
      if (Number.isFinite(parsed) && parsed > 0) return parsed;
    }
  }
  return 0;
}

export function publicSupportScore(item: FanDiscoverableItem): number {
  return publicNumberSignal(item, [
    'supportCount',
    'supportedCount',
    'supporterCount',
    'supportersCount',
    'purchaseCount',
    'purchasesCount',
    'saleCount',
    'salesCount',
    'unlockCount',
    'unlocksCount',
    'tipCount',
    'tipsCount',
    'popularityScore',
    'supportScore',
  ]);
}

function publicUnlockScore(item: FanDiscoverableItem): number {
  return publicNumberSignal(item, [
    'unlockCount',
    'unlocksCount',
    'purchaseCount',
    'purchasesCount',
    'saleCount',
    'salesCount',
  ]);
}

function publicConversionScore(item: FanDiscoverableItem): number {
  return publicNumberSignal(item, [
    'conversionRate',
    'conversionScore',
    'purchaseRate',
    'unlockRate',
    'supportRate',
  ]);
}

export function publicRelationshipScore(item: FanDiscoverableItem): number {
  return publicNumberSignal(item, [
    'collaboratorCount',
    'collaboratorsCount',
    'contributorCount',
    'contributorsCount',
    'creditCount',
    'creditsCount',
    'splitParticipantCount',
    'royaltyRecipientCount',
    'upstreamCreatorCount',
    'derivedFromCount',
    'participantCount',
    'relatedWorkCount',
    'connectedCreatorCount',
    'relationshipCount',
  ]);
}

function publicPostureScore(item: FanDiscoverableItem): number {
  const originHealth = String(item.originHealth || '').toLowerCase();
  const originTrust = String(item.originTrust || '').toLowerCase();
  const posture = String(item.creatorPosture || item.posture || item.originPosture || item.commercePosture || '').toLowerCase();
  const commerceCapable = Boolean(item.commerceCapable || item.canSell || item.canPurchase || item.offerUrl || item.buyUrl);
  let score = 0;
  if (originHealth === 'healthy' || originHealth === 'online' || originHealth === 'reachable') score += 8;
  if (originTrust === 'stable' || originTrust === 'trusted') score += 6;
  if (originTrust === 'provider') score += 5;
  if (commerceCapable) score += 4;
  if (posture.includes('provider') || posture.includes('verified')) score += 3;
  if (posture.includes('creator') || posture.includes('commerce')) score += 2;
  return score;
}

export function itemSortTime(item: FanDiscoverableItem): number {
  const raw = item.publishedAt || item.createdAt || item.updatedAt || '';
  const parsed = Date.parse(String(raw));
  return Number.isFinite(parsed) ? parsed : 0;
}

function fanDiscoveryScore(item: FanDiscoverableItem): number {
  const support = publicSupportScore(item);
  const unlock = publicUnlockScore(item);
  const conversion = publicConversionScore(item);
  const relationship = publicRelationshipScore(item);
  const posture = publicPostureScore(item);
  const recentDays = itemSortTime(item) > 0 ? Math.max(0, 30 - (Date.now() - itemSortTime(item)) / 86_400_000) : 0;
  return support * 100_000_000
    + unlock * 10_000_000
    + conversion * 5_000_000
    + relationship * 1_000_000
    + posture * 100_000
    + recentDays * 10_000
    + itemSortTime(item) / 1_000_000;
}

function normalizedScore(value: number, max: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.max(0, Math.min(100, (value / max) * 100));
}

function recencyScore(item: FanDiscoverableItem): number {
  const sortTime = itemSortTime(item);
  if (!sortTime) return 0;
  const days = Math.max(0, (Date.now() - sortTime) / 86_400_000);
  return Math.max(0, Math.min(100, 100 - days));
}

function metadataText(item: FanDiscoverableItem): string {
  return [
    item.genre,
    item.primaryTopic,
    item.contentType,
    item.title,
    item.description,
    item.category,
    item.tags,
  ]
    .flatMap((part) => Array.isArray(part) ? part : [part])
    .map((part) => String(part || '').toLowerCase())
    .join(' ');
}

function hasAny(value: string, words: string[]): boolean {
  return words.some((word) => value.includes(word));
}

function categoryForFanItem(item: FanDiscoverableItem): string {
  const type = String(item.contentType || '').toLowerCase();
  const topic = String(item.primaryTopic || '').toLowerCase();
  const genre = String(item.genre || '').toLowerCase();
  const text = metadataText(item);

  if (hasAny(`${genre} ${topic}`, ['news', 'broadcast', 'reporting', 'journalism']) || hasAny(text, ['newsmax', 'news broadcast'])) {
    return 'cat-news-broadcast';
  }

  if (hasAny(`${genre} ${topic}`, ['technology', 'tech', 'software', 'ai', 'bitcoin', 'crypto', 'blockchain', 'developer'])) {
    return 'cat-tech-work';
  }

  if (hasAny(`${genre} ${topic}`, ['gaming', 'game', 'esports', 'stream'])) {
    return 'cat-gaming-work';
  }

  if (hasAny(`${genre} ${topic}`, ['sports', 'sport', 'fitness', 'athlete'])) {
    return 'cat-sports-work';
  }

  if (hasAny(`${genre} ${topic}`, ['music', 'song', 'album', 'audio', 'r&b', 'hip hop', 'rap', 'pop', 'rock', 'gospel', 'country', 'latin'])) {
    if (type === 'video') return 'cat-video-year';
    return 'cat-song-year';
  }

  if (type === 'song' || type === 'audio') return 'cat-song-year';
  if (type === 'video') return 'cat-short-form-video';
  if (['book', 'document', 'file', 'image'].includes(type)) return 'cat-published-work';
  if (publicSupportScore(item) > 0) return 'cat-fan-supported';
  return 'cat-work-year';
}

function creatorIdForFanItem(item: FanDiscoverableItem): string {
  const handle = String(item.creatorHandle || '').replace(/^@+/, '').toLowerCase();
  const creator = ['creator-darryl', 'creator-blessedrthe', 'creator-certifyd', 'creator-david']
    .map((id) => getCreator(id))
    .find((candidate) => candidate?.handle.replace(/^@+/, '').toLowerCase() === handle);
  return creator?.id || 'creator-certifyd';
}

function safeEntryId(item: FanDiscoverableItem): string {
  const origin = normalizeOrigin(item.publicOrigin).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const contentId = normalizeId(item.contentId || item.sourceContentId || item.id).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `fan-${origin}-${contentId}`;
}

export function fanItemToAwardEntry(item: FanDiscoverableItem): FanHydratedEntry {
  const support = publicSupportScore(item);
  const relationship = publicRelationshipScore(item);
  const recent = recencyScore(item);
  const posture = publicPostureScore(item);
  const supportNormalized = normalizedScore(support, 100);
  const relationshipNormalized = normalizedScore(relationship, 12);
  const postureNormalized = normalizedScore(posture, 20);
  const title = String(item.title || 'Untitled work').trim();
  return {
    id: safeEntryId(item),
    year: 2026,
    categoryId: categoryForFanItem(item),
    creatorId: creatorIdForFanItem(item),
    title,
    summary: String(item.description || `Live public discovery entry from ${item.creatorHandle || 'a Certifyd creator'}.`).trim(),
    contributors: [{ creatorId: creatorIdForFanItem(item), role: 'Creator' }],
    proofs: [
      {
        id: `${safeEntryId(item)}-discovery`,
        label: 'Public discovery record',
        status: 'public',
        hash: String(item.contentId || item.sourceContentId || item.id || 'public-discovery'),
        source: String(item.publicOrigin || 'Public discovery'),
      },
    ],
    scoring: [
      { label: 'Support', reason: 'Public support, purchase, unlock, tip, or popularity signal from public discovery.', normalizedScore: supportNormalized, weight: 0.35 },
      { label: 'Recency', reason: 'Freshness from published, created, or updated timestamps.', normalizedScore: recent, weight: 0.25 },
      { label: 'Relationships', reason: 'Public collaborator, contributor, split, lineage, or connected-work signal.', normalizedScore: relationshipNormalized, weight: 0.25 },
      { label: 'Availability', reason: 'Reachable public discovery item with commerce or healthy origin signals.', normalizedScore: postureNormalized, weight: 0.15 },
    ],
    fanSupportSats: 0,
    publicVotes: Math.round(support),
    resultStatus: 'nominee',
    fanItem: item,
    fanScore: fanDiscoveryScore(item),
    fanSupportScore: support,
    fanRelationshipScore: relationship,
    fanSortTime: itemSortTime(item),
    liveRankSource: 'public-discovery',
  };
}

function staticFallbackScore(entry: AwardEntry): number {
  return calculateWeightedScore(entry.scoring);
}

function workKey(work: CreativeWork): string {
  return `${normalizeOrigin(work.publicOrigin)}::${normalizeId(work.sourceContentId || work.publicUrl || work.id)}`;
}

function itemKeys(item: FanDiscoverableItem): string[] {
  const origin = normalizeOrigin(item.publicOrigin);
  return [item.contentId, item.sourceContentId, item.id, item.publicUrl, item.buyUrl, item.offerUrl]
    .map(normalizeId)
    .filter(Boolean)
    .map((id) => `${origin}::${id}`);
}

function matchFanItem(work: CreativeWork | undefined, items: FanDiscoverableItem[]): FanDiscoverableItem | undefined {
  if (!work) return undefined;
  const keys = new Set([workKey(work)]);
  for (const item of items) {
    if (itemKeys(item).some((key) => keys.has(key))) return item;
  }
  const origin = normalizeOrigin(work.publicOrigin);
  const id = normalizeId(work.sourceContentId);
  return items.find((item) => normalizeOrigin(item.publicOrigin) === origin && itemKeys(item).some((key) => key.endsWith(`::${id}`)));
}

async function fetchJson<T>(url: string, timeoutMs = REQUEST_TIMEOUT_MS): Promise<T> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Failed ${response.status} from ${url}`);
    return await response.json() as T;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function loadOrigins(): Promise<string[]> {
  const data = await fetchJson<OriginsResponse>(originsPath, 2500);
  return Array.isArray(data.origins) ? data.origins.filter(Boolean) : [];
}

function normalizeItem(item: FanDiscoverableItem, origin: string): FanDiscoverableItem {
  const publicOrigin = normalizeOrigin(item.publicOrigin) ? String(item.publicOrigin) : origin;
  return {
    ...item,
    publicOrigin,
    coverUrl: resolveUrl(item.coverUrl, publicOrigin),
    previewUrl: resolveUrl(item.previewUrl, publicOrigin),
    publicUrl: resolveUrl(item.publicUrl, publicOrigin),
    buyUrl: resolveUrl(item.buyUrl, publicOrigin),
    offerUrl: resolveUrl(item.offerUrl, publicOrigin),
  };
}

function isLiveDiscoverableItem(item: FanDiscoverableItem): boolean {
  const status = String(item.discoveryStatus || '').trim().toLowerCase();
  const health = String(item.originHealth || '').trim().toLowerCase();
  if (status === 'unpublished' || status === 'unavailable' || status === 'offline') return false;
  if (health === 'failed' || health === 'cooldown' || health === 'offline') return false;
  return Boolean(normalizeId(item.contentId || item.sourceContentId || item.id));
}

export async function fetchFanDiscoverableItems(): Promise<FanDiscoverableItem[]> {
  const now = Date.now();
  if (cache && cache.expiresAt > now) return cache.promise;

  const promise = (async () => {
    const origins = await loadOrigins();
    const pages = await Promise.allSettled(origins.map(async (origin) => {
      const rows: FanDiscoverableItem[] = [];
      let cursor: string | null | undefined;
      for (let page = 0; page < MAX_PAGES_PER_ORIGIN; page += 1) {
        const params = new URLSearchParams({ limit: String(DEFAULT_LIMIT) });
        if (cursor) params.set('cursor', cursor);
        const data = await fetchJson<DiscoverableResponse>(`${origin}/public/discoverable-content?${params.toString()}`);
        rows.push(...(data.items || []).map((item) => normalizeItem(item, origin)));
        cursor = data.cursor;
        if (!cursor) break;
      }
      return rows;
    }));

    const seen = new Set<string>();
    const rows: FanDiscoverableItem[] = [];
    for (const page of pages) {
      if (page.status !== 'fulfilled') continue;
      for (const item of page.value) {
        if (!isLiveDiscoverableItem(item)) continue;
        const key = itemKeys(item)[0];
        if (!key || seen.has(key)) continue;
        seen.add(key);
        rows.push(item);
      }
    }
    return rows;
  })();

  cache = { expiresAt: now + CACHE_MS, promise };
  return promise;
}

export function hydrateAwardEntries(baseEntries: AwardEntry[], fanItems: FanDiscoverableItem[]): FanHydratedEntry[] {
  return baseEntries.map((entry) => {
    const fanItem = matchFanItem(getWork(entry.workId), fanItems);
    return {
      ...entry,
      fanItem,
      fanScore: fanItem ? fanDiscoveryScore(fanItem) : 0,
      fanSupportScore: fanItem ? publicSupportScore(fanItem) : 0,
      fanRelationshipScore: fanItem ? publicRelationshipScore(fanItem) : 0,
      fanSortTime: fanItem ? itemSortTime(fanItem) : 0,
      liveRankSource: fanItem ? 'public-discovery' : 'seeded-awards-data',
    };
  });
}

export function rankHydratedEntries(baseEntries: AwardEntry[], fanItems: FanDiscoverableItem[]): FanHydratedEntry[] {
  return hydrateAwardEntries(baseEntries, fanItems).sort((a, b) => {
    if (a.liveRankSource !== b.liveRankSource) return a.liveRankSource === 'public-discovery' ? -1 : 1;
    if (a.fanScore !== b.fanScore) return b.fanScore - a.fanScore;
    if (a.fanSupportScore !== b.fanSupportScore) return b.fanSupportScore - a.fanSupportScore;
    if (a.fanSortTime !== b.fanSortTime) return b.fanSortTime - a.fanSortTime;
    return staticFallbackScore(b) - staticFallbackScore(a);
  });
}

export function rankFanAwardEntries(fanItems: FanDiscoverableItem[]): FanHydratedEntry[] {
  return fanItems
    .map(fanItemToAwardEntry)
    .sort((a, b) => {
      if (a.fanScore !== b.fanScore) return b.fanScore - a.fanScore;
      if (a.fanSupportScore !== b.fanSupportScore) return b.fanSupportScore - a.fanSupportScore;
      if (a.fanSortTime !== b.fanSortTime) return b.fanSortTime - a.fanSortTime;
      return a.id.localeCompare(b.id);
    });
}

export function creatorsFromFanEntries(liveEntries: FanHydratedEntry[], limit = 6): AwardCreator[] {
  const grouped = new Map<string, FanHydratedEntry[]>();
  for (const entry of liveEntries) {
    const item = entry.fanItem;
    const handle = String(item?.creatorHandle || 'certifyd').replace(/^@+/, '').toLowerCase();
    const origin = normalizeOrigin(item?.publicOrigin);
    const key = `${origin}::${handle}`;
    grouped.set(key, [...(grouped.get(key) || []), entry]);
  }

  return [...grouped.entries()]
    .sort((a, b) => {
      const scoreFor = (rows: FanHydratedEntry[]) => rows.reduce((sum, entry) => sum + entry.fanScore, 0);
      return scoreFor(b[1]) - scoreFor(a[1]);
    })
    .slice(0, limit)
    .map(([key, rows]) => {
      const first = rows[0];
      const item = first.fanItem;
      const handle = String(item?.creatorHandle || 'certifyd').replace(/^@+/, '');
      const origin = String(item?.publicOrigin || 'https://certifyd.me').replace(/\/+$/, '');
      const profileUrl = `${origin}/u/${encodeURIComponent(handle)}`;
      return {
        id: key,
        slug: handle,
        displayName: handle || 'Certifyd creator',
        profileUrl,
        avatarUrl: typeof item?.creatorAvatarUrl === 'string' ? item.creatorAvatarUrl : undefined,
        wallpaperUrl: typeof item?.coverUrl === 'string' ? item.coverUrl : undefined,
        verified: true,
        verificationLabel: 'Live public discovery creator',
        primaryRole: 'Creator',
        nominatedWorks: rows.map((entry) => entry.title),
        source: 'creator-node',
        sourceUpdatedAt: new Date().toISOString(),
        accentColor: '#ff9f0a',
      };
    });
}

export function technologyRankingsFromFanEntries(liveEntries: FanHydratedEntry[]): TechnicalRanking[] {
  const grouped = new Map<string, FanHydratedEntry[]>();
  for (const entry of liveEntries) {
    const origin = String(entry.fanItem?.publicOrigin || '').replace(/\/+$/, '');
    if (!origin) continue;
    grouped.set(origin, [...(grouped.get(origin) || []), entry]);
  }

  return [...grouped.entries()]
    .map(([origin, rows]) => {
      const creators = new Set(rows.map((entry) => String(entry.fanItem?.creatorHandle || '').replace(/^@+/, '').toLowerCase()).filter(Boolean));
      const support = rows.reduce((sum, entry) => sum + entry.fanSupportScore, 0);
      const latest = Math.max(...rows.map((entry) => entry.fanSortTime), 0);
      const score = rows.length * 1_000_000 + creators.size * 100_000 + support * 10_000 + latest / 1_000_000;
      return {
        id: `live-origin-${origin.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()}`,
        title: new URL(origin).hostname,
        categorySlug: 'public-node-excellence',
        metricName: 'Discoverable works returned',
        value: `${rows.length} live ${rows.length === 1 ? 'work' : 'works'}`,
        providerId: 'provider-certifyd-creator-node',
        source: {
          label: 'Public creator-node discovery',
          status: 'verified',
          lastUpdatedAt: new Date().toISOString().slice(0, 10),
          period: 'Live public discovery',
          methodology: `${creators.size} creator ${creators.size === 1 ? 'profile is' : 'profiles are'} currently returning discoverable work from this origin. This measures live discovery coverage: works returned, creator coverage, public support, and latest activity. Operator readiness belongs on the Certifyd Network map.`,
        },
        __score: score,
      } as TechnicalRanking & { __score: number };
    })
    .sort((a, b) => b.__score - a.__score)
    .map((ranking) => {
      const { __score, ...publicRanking } = ranking;
      void __score;
      return publicRanking;
    });
}
