import type { TechnicalRanking } from '../types';

export type NetworkNodeStatus = 'ready' | 'limited' | 'disabled' | 'offline' | 'unknown';

export type NetworkNode = {
  nodeId: string;
  providerCanonicalUrl?: string;
  displayName?: string;
  operator?: string;
  roles?: string[];
  location?: { displayLocation?: string; country?: string; region?: string; city?: string };
  overallStatus?: NetworkNodeStatus;
  services?: Record<string, { status?: NetworkNodeStatus; score?: number; message?: string; reasonCodes?: string[] }>;
  readiness?: Record<string, { status?: NetworkNodeStatus; score?: number; message?: string; reasonCodes?: string[] }>;
  trust?: { operatorVerified?: boolean; proofCapable?: boolean; proofCount?: number };
  history?: { nodeAgeDays?: number | null; reliability30d?: number | null; reliability90d?: number | null; successfulPayments30d?: number | null };
  connect?: { providerCanonicalUrl?: string; capabilities?: Record<string, boolean> };
  networkProfileUrl?: string;
  settingsUrl?: string;
};

export type NetworkRanking = TechnicalRanking & {
  profile: {
    operator: string;
    providerUrl: string;
    networkProfileUrl: string;
    settingsUrl?: string;
    location?: string;
    status: string;
    roles: string[];
    proofCount: number;
    nodeAgeDays?: number | null;
    services: { label: string; status: string; score?: number }[];
  };
};

export type NetworkNodesSnapshot = {
  source: string;
  generatedAt: string;
  nodes: NetworkNode[];
};

const NETWORK_NODES_PATH = '/network-nodes.json';

function hostForNode(node: NetworkNode): string {
  const url = node.connect?.providerCanonicalUrl || node.providerCanonicalUrl;
  if (!url) return node.displayName || node.operator || 'Certifyd Network node';
  try {
    return new URL(url).hostname;
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/+$/, '');
  }
}

function providerUrlForNode(node: NetworkNode): string {
  return node.connect?.providerCanonicalUrl || node.providerCanonicalUrl || '';
}

function statusLabel(status: unknown): string {
  const normalized = String(status || 'unknown').toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function statusScore(status: unknown): number {
  switch (String(status || '').toLowerCase()) {
    case 'ready':
      return 100;
    case 'limited':
      return 65;
    case 'disabled':
      return 25;
    case 'offline':
      return 0;
    default:
      return 40;
  }
}

function metricForCategory(node: NetworkNode, categorySlug = 'network-partner-of-the-year') {
  const roles = node.roles || [];
  const services = node.services || {};
  const readiness = node.readiness || {};
  const trust = node.trust || {};
  const commerce = services.commerce;
  const settlement = services.settlement;
  const proofs = services.proofs;
  const identity = services.identity;
  const content = services.content;
  const reachable = readiness.reachable;
  const durable = readiness.durable;
  const provisioned = readiness.provisioned;
  const proofCount = Number(trust.proofCount || 0);
  switch (categorySlug) {
    case 'public-node-excellence':
      return { metricName: 'Public node readiness', value: statusLabel(provisioned?.status || node.overallStatus), score: statusScore(provisioned?.status || node.overallStatus) + roles.length };
    case 'community-node-award':
      return { metricName: 'Creator-facing roles', value: `${roles.length} roles`, score: roles.length * 12 + statusScore(node.overallStatus) };
    case 'open-network-leadership-award':
      return { metricName: 'Open network participation', value: `${roles.length} roles`, score: roles.length * 14 + (trust.operatorVerified ? 20 : 0) };
    case 'network-reliability-award':
      return { metricName: 'Reachability', value: statusLabel(reachable?.status || durable?.status || node.overallStatus), score: Number(durable?.score || 0) + statusScore(reachable?.status) };
    case 'discovery-excellence-award':
      return { metricName: 'Discovery support', value: statusLabel(content?.status || node.overallStatus), score: statusScore(content?.status) + statusScore(reachable?.status) };
    case 'publishing-excellence-award':
      return { metricName: 'Content service', value: statusLabel(content?.status || node.overallStatus), score: statusScore(content?.status) + statusScore(durable?.status) };
    case 'identity-excellence-award':
      return { metricName: 'Identity service', value: statusLabel(identity?.status || node.overallStatus), score: statusScore(identity?.status) + (trust.operatorVerified ? 20 : 0) };
    case 'verification-excellence-award':
      return { metricName: 'Proof capability', value: `${proofCount} ${proofCount === 1 ? 'proof' : 'proofs'}`, score: proofCount * 10 + statusScore(proofs?.status) };
    case 'creator-commerce-provider-award':
      return { metricName: 'Commerce + settlement', value: `${statusLabel(commerce?.status)} / ${statusLabel(settlement?.status)}`, score: Number(commerce?.score || 0) + Number(settlement?.score || 0) };
    case 'network-partner-of-the-year':
    default:
      return { metricName: `${roles.length} advertised roles`, value: statusLabel(node.overallStatus), score: roles.length * 15 + statusScore(node.overallStatus) + (trust.operatorVerified ? 20 : 0) };
  }
}

function methodologyForNode(node: NetworkNode, categorySlug?: string): string {
  const readyServices = Object.entries(node.services || {})
    .filter(([, service]) => service.status === 'ready')
    .map(([key]) => key)
    .join(', ');
  const status = statusLabel(node.overallStatus);
  const proofCount = Number(node.trust?.proofCount || 0);
  const categoryContext = categorySlug ? ` Category filter: ${categorySlug.replace(/-/g, ' ')}.` : '';
  return `${status} network candidate with ${proofCount} public proof ${proofCount === 1 ? 'record' : 'records'}${readyServices ? ` and ready ${readyServices} services` : ''}.${categoryContext}`;
}

export async function fetchNetworkNodes(): Promise<NetworkNodesSnapshot> {
  const response = await fetch(NETWORK_NODES_PATH, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Failed to load ${NETWORK_NODES_PATH}`);
  return await response.json() as NetworkNodesSnapshot;
}

function serviceListForNode(node: NetworkNode) {
  return Object.entries(node.services || {}).map(([key, service]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    status: statusLabel(service.status),
    score: service.score,
  }));
}

export function networkRankingsFromNodes(snapshot: NetworkNodesSnapshot | null, categorySlug?: string): NetworkRanking[] {
  if (!snapshot?.nodes?.length) return [];

  return snapshot.nodes
    .map((node) => {
      const metric = metricForCategory(node, categorySlug);
      const providerUrl = providerUrlForNode(node);
      return {
        id: `network-node-${node.nodeId.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()}-${categorySlug || 'overview'}`,
        title: node.displayName || node.operator || hostForNode(node),
        categorySlug: categorySlug || 'network-partner-of-the-year',
        metricName: metric.metricName,
        value: metric.value,
        providerId: node.nodeId,
        source: {
          label: 'Certifyd Network map',
          status: node.overallStatus === 'ready' ? 'verified' : 'preview',
          lastUpdatedAt: snapshot.generatedAt.slice(0, 10),
          period: 'Live network snapshot',
          methodology: methodologyForNode(node, categorySlug),
        },
        profile: {
          operator: node.operator || node.displayName || hostForNode(node),
          providerUrl,
          networkProfileUrl: node.networkProfileUrl || `https://network.certifyd.me/node/${encodeURIComponent(node.nodeId)}`,
          settingsUrl: node.settingsUrl,
          location: node.location?.displayLocation,
          status: statusLabel(node.overallStatus),
          roles: node.roles || [],
          proofCount: Number(node.trust?.proofCount || 0),
          nodeAgeDays: node.history?.nodeAgeDays,
          services: serviceListForNode(node),
        },
        __score: metric.score,
      } as NetworkRanking & { __score: number };
    })
    .sort((a, b) => b.__score - a.__score)
    .map((ranking) => {
      const { __score, ...publicRanking } = ranking;
      void __score;
      return publicRanking;
    });
}
