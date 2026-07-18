import assert from 'node:assert/strict';
import { calculateWeightedScore, formatScore, scoreFormula, validateWeights } from './scoring';
import type { ScoreComponent } from '../types';

const components: ScoreComponent[] = [
  { label: 'Records', reason: 'Public authorship', normalizedScore: 90, weight: 0.4 },
  { label: 'Craft', reason: 'Peer review', normalizedScore: 80, weight: 0.35 },
  { label: 'Support', reason: 'Fan backing', normalizedScore: 70, weight: 0.25 },
];

assert.equal(validateWeights(components), true);
assert.equal(calculateWeightedScore(components), 81.5);
assert.equal(formatScore(81.5), '81.5');
assert.equal(scoreFormula(components), 'Records 40% + Craft 35% + Support 25%');
assert.equal(validateWeights([{ ...components[0], weight: 0.5 }]), false);

console.log('scoring regression checks passed');
