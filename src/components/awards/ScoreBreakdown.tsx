import { calculateWeightedScore, formatScore, scoreFormula, validateWeights } from '../../lib/scoring';
import type { ScoreComponent } from '../../types';

const publicLabels: Record<string, string> = {
  Proof: 'Proof and Transparency',
  Support: 'Community Support',
  Transparency: 'Complete Credits',
};

export function ScoreBreakdown({ scoring }: { scoring: ScoreComponent[] }) {
  const total = calculateWeightedScore(scoring);
  return (
    <section className="glass-card score-card warm-score-card">
      <div className="section-heading inline">
        <div>
          <span className="eyebrow">How this score was calculated</span>
          <h2>{formatScore(total)} signal score</h2>
        </div>
        <span className={validateWeights(scoring) ? 'status-pill ok' : 'status-pill warn'}>
          {validateWeights(scoring) ? 'Model balanced' : 'Weights need review'}
        </span>
      </div>
      <p className="muted">{scoreFormula(scoring)}</p>
      <div className="score-list">
        {scoring.map((component) => {
          const label = publicLabels[component.label] ?? component.label;
          return (
            <div className="score-row" key={component.label}>
              <div>
                <strong>{label}</strong>
                <p>{component.reason}</p>
              </div>
              <div className="score-meter" aria-label={`${label} score ${component.normalizedScore}`}>
                <span style={{ width: `${component.normalizedScore}%` }} />
              </div>
              <span>{component.normalizedScore} × {Math.round(component.weight * 100)}%</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
