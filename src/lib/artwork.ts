export function artworkUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  const match = /url\(["']?([^"')]+)["']?\)/i.exec(value);
  if (!match?.[1]) return null;
  return match[1];
}
