import { useEffect, useMemo, useState } from 'react';
import { fetchNetworkNodes, networkRankingsFromNodes, type NetworkNodesSnapshot, type NetworkRanking } from '../lib/networkNodes';

export function useNetworkRankings(categorySlug?: string, limit?: number): { rankings: NetworkRanking[]; loading: boolean; updatedAt: Date | null } {
  const [snapshot, setSnapshot] = useState<NetworkNodesSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchNetworkNodes()
      .then((data) => {
        if (!cancelled) setSnapshot(data);
      })
      .catch(() => {
        if (!cancelled) setSnapshot(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const rankings = useMemo(() => {
    const rows = networkRankingsFromNodes(snapshot, categorySlug);
    return typeof limit === 'number' ? rows.slice(0, limit) : rows;
  }, [snapshot, categorySlug, limit]);

  return {
    rankings,
    loading,
    updatedAt: snapshot?.generatedAt ? new Date(snapshot.generatedAt) : null,
  };
}
