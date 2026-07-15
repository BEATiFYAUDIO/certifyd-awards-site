import { writeFile } from 'node:fs/promises';

const sourceUrl = 'https://network.certifyd.me/';
const outputPath = new URL('../public/network-nodes.json', import.meta.url);

function extractEscapedJsonAfter(html, marker, opener, closer) {
  const start = html.indexOf(marker);
  if (start < 0) throw new Error(`Could not find escaped payload marker: ${marker}`);

  const arrayStart = start + marker.length;
  if (html[arrayStart] !== opener) throw new Error(`Payload after ${marker} does not start with ${opener}.`);

  let depth = 0;
  let arrayEnd = -1;
  for (let index = arrayStart; index < html.length; index += 1) {
    const char = html[index];
    if (char === opener) depth += 1;
    if (char === closer) {
      depth -= 1;
      if (depth === 0) {
        arrayEnd = index + 1;
        break;
      }
    }
  }

  if (arrayEnd < 0) throw new Error(`Payload after ${marker} was not closed.`);
  const escapedJson = html.slice(arrayStart, arrayEnd);
  return JSON.parse(escapedJson.replace(/\\"/g, '"'));
}

function extractNetworkNodes(html) {
  return extractEscapedJsonAfter(html, '\\"nodes\\":', '[', ']');
}

function extractDetailNode(html) {
  return extractEscapedJsonAfter(html, '\\"node\\":', '{', '}');
}

function extractSettingsUrl(html) {
  const match = html.match(/\\"settingsUrl\\":\\"([^"]+)\\"/);
  return match?.[1]?.replace(/\\\//g, '/');
}

async function hydrateNodeDetail(node) {
  const nodeId = node.nodeId || node.providerNodeId;
  if (!nodeId) return node;
  const networkProfileUrl = new URL(`/node/${encodeURIComponent(nodeId)}`, sourceUrl).toString();
  try {
    const response = await fetch(networkProfileUrl);
    if (!response.ok) throw new Error(`Failed ${response.status}`);
    const html = await response.text();
    const detailNode = extractDetailNode(html);
    const providerUrl = detailNode.providerCanonicalUrl || detailNode.connect?.providerCanonicalUrl || node.providerCanonicalUrl || node.connect?.providerCanonicalUrl;
    const detailSettingsUrl = extractSettingsUrl(html);
    return {
      ...node,
      ...detailNode,
      networkProfileUrl,
      settingsUrl: isProviderUrl(detailSettingsUrl, providerUrl) ? detailSettingsUrl : providerSettingsUrl(providerUrl),
    };
  } catch (error) {
    console.warn(`Could not hydrate ${nodeId} detail profile: ${error instanceof Error ? error.message : String(error)}`);
    return { ...node, networkProfileUrl };
  }
}

function providerSettingsUrl(providerUrl) {
  if (!providerUrl) return undefined;
  try {
    return new URL('/dashboard/network', providerUrl).toString();
  } catch {
    return undefined;
  }
}

function isProviderUrl(candidate, providerUrl) {
  if (!candidate || !providerUrl) return false;
  try {
    return new URL(candidate).origin === new URL(providerUrl).origin;
  } catch {
    return false;
  }
}

const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`Failed to fetch ${sourceUrl}: ${response.status}`);
const html = await response.text();
const nodes = await Promise.all(extractNetworkNodes(html).map(hydrateNodeDetail));
const payload = {
  source: sourceUrl,
  generatedAt: new Date().toISOString(),
  nodes,
};

await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Wrote ${nodes.length} network nodes to ${outputPath.pathname}`);
