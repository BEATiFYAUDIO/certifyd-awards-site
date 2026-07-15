import { useEffect, useMemo, useRef, useState } from 'react';
import type { AwardEntry } from '../types';
import {
  fetchFanDiscoverableItems,
  rankFanAwardEntries,
  rankHydratedEntries,
  type FanHydratedEntry,
} from '../lib/fanDiscovery';

const REFRESH_MS = 60_000;

export function useFanHydratedEntries(baseEntries: AwardEntry[] = []): { entries: FanHydratedEntry[]; loading: boolean; updatedAt: Date | null } {
  const [hydratedEntries, setHydratedEntries] = useState<FanHydratedEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const ids = useMemo(() => baseEntries.map((entry) => entry.id).join('|'), [baseEntries]);
  const baseEntriesRef = useRef(baseEntries);

  useEffect(() => {
    baseEntriesRef.current = baseEntries;
  }, [baseEntries]);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      setLoading(true);
      try {
        const fanItems = await fetchFanDiscoverableItems();
        const currentEntries = baseEntriesRef.current;
        if (cancelled) return;
        const ranked = currentEntries.length > 0 ? rankHydratedEntries(currentEntries, fanItems) : rankFanAwardEntries(fanItems);
        setHydratedEntries(ranked.filter((entry) => entry.liveRankSource === 'fan-pwa'));
        setUpdatedAt(new Date());
      } catch {
        if (!cancelled) setHydratedEntries([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void refresh();
    const intervalId = window.setInterval(refresh, REFRESH_MS);
    const onFocus = () => void refresh();
    window.addEventListener('focus', onFocus);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      window.removeEventListener('focus', onFocus);
    };
  }, [ids]);

  return {
    entries: baseEntries.length > 0 ? hydratedEntries.filter((entry) => baseEntries.some((base) => base.id === entry.id)) : hydratedEntries,
    loading,
    updatedAt,
  };
}
