import { writeFile } from 'node:fs/promises';

const sourceUrl = 'https://network.certifyd.me/';
const outputPath = new URL('../public/network-nodes.json', import.meta.url);

function extractNetworkNodes(html) {
  const marker = '\\"nodes\\":';
  const start = html.indexOf(marker);
  if (start < 0) throw new Error('Could not find escaped network nodes payload.');

  const arrayStart = start + marker.length;
  if (html[arrayStart] !== '[') throw new Error('Network nodes payload is not an array.');

  let depth = 0;
  let arrayEnd = -1;
  for (let index = arrayStart; index < html.length; index += 1) {
    const char = html[index];
    if (char === '[') depth += 1;
    if (char === ']') {
      depth -= 1;
      if (depth === 0) {
        arrayEnd = index + 1;
        break;
      }
    }
  }

  if (arrayEnd < 0) throw new Error('Network nodes payload was not closed.');
  const escapedJson = html.slice(arrayStart, arrayEnd);
  return JSON.parse(escapedJson.replace(/\\"/g, '"'));
}

const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`Failed to fetch ${sourceUrl}: ${response.status}`);
const html = await response.text();
const nodes = extractNetworkNodes(html);
const payload = {
  source: sourceUrl,
  generatedAt: new Date().toISOString(),
  nodes,
};

await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Wrote ${nodes.length} network nodes to ${outputPath.pathname}`);
