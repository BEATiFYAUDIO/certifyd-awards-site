import type { AwardEntry, ScoreComponent } from '../types';

export function calculateWeightedScore(components: ScoreComponent[]): number {
  return components.reduce((total, component) => total + component.normalizedScore * component.weight, 0);
}

export function validateWeights(components: ScoreComponent[], tolerance = 0.001): boolean {
  const total = components.reduce((sum, component) => sum + component.weight, 0);
  return Math.abs(total - 1) <= tolerance;
}

export function scoreFormula(components: ScoreComponent[]): string {
  return components.map((component) => `${component.label} ${Math.round(component.weight * 100)}%`).join(' + ');
}

export function formatScore(score: number): string {
  return score.toFixed(1);
}

export function rankEntries(entries: AwardEntry[]): AwardEntry[] {
  return [...entries].sort((a, b) => calculateWeightedScore(b.scoring) - calculateWeightedScore(a.scoring));
}

export function entryScore(entry: AwardEntry): number {
  return calculateWeightedScore(entry.scoring);
}

export function groupBy<T>(items: T[], getKey: (item: T) => string): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = getKey(item);
    groups[key] = groups[key] ?? [];
    groups[key].push(item);
    return groups;
  }, {});
}
