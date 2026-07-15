import { entries, getWork } from '../data/awards';
import { calculateWeightedScore } from './scoring';
import type { AwardEntry, CreativeWork } from '../types';

export type FanDiscoverableItem = {
  contentId?: string;
  id?: string;
  sourceContentId?: string;
  title?: string | null;
  description?: string | null;
  creatorHandle?: string | null;
  contentType?: string | null;
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
  liveRankSource: 'fan-pwa' | 'seeded-awards-data';
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
      liveRankSource: fanItem ? 'fan-pwa' : 'seeded-awards-data',
    };
  });
}

export function rankHydratedEntries(baseEntries: AwardEntry[], fanItems: FanDiscoverableItem[]): FanHydratedEntry[] {
  return hydrateAwardEntries(baseEntries, fanItems).sort((a, b) => {
    if (a.liveRankSource !== b.liveRankSource) return a.liveRankSource === 'fan-pwa' ? -1 : 1;
    if (a.fanScore !== b.fanScore) return b.fanScore - a.fanScore;
    if (a.fanSupportScore !== b.fanSupportScore) return b.fanSupportScore - a.fanSupportScore;
    if (a.fanSortTime !== b.fanSortTime) return b.fanSortTime - a.fanSortTime;
    return staticFallbackScore(b) - staticFallbackScore(a);
  });
}

export function getSeededRankedEntries(): FanHydratedEntry[] {
  return entries
    .map((entry) => ({
      ...entry,
      fanScore: 0,
      fanSupportScore: 0,
      fanRelationshipScore: 0,
      fanSortTime: 0,
      liveRankSource: 'seeded-awards-data' as const,
    }))
    .sort((a, b) => staticFallbackScore(b) - staticFallbackScore(a));
}
