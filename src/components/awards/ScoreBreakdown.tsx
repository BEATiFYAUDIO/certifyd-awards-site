import { calculateWeightedScore, formatScore, scoreFormula, validateWeights } from '../../lib/scoring';
import type { ScoreComponent } from '../../types';

export function ScoreBreakdown({ scoring }: { scoring: ScoreComponent[] }) {
  const total = calculateWeightedScore(scoring);
  return (
    <section className="glass-card score-card">
      <div className="section-heading inline">
        <div>
          <span className="eyebrow">Weighted public model</span>
          <h2>{formatScore(total)} total score</h2>
        </div>
        <span className={validateWeights(scoring) ? 'status-pill ok' : 'status-pill warn'}>
          {validateWeights(scoring) ? 'Weights valid' : 'Weights need review'}
        </span>
      </div>
      <p className="muted">{scoreFormula(scoring)}</p>
      <div className="score-list">
        {scoring.map((component) => (
          <div className="score-row" key={component.label}>
            <div>
              <strong>{component.label}</strong>
              <p>{component.reason}</p>
            </div>
            <div className="score-meter" aria-label={`${component.label} score ${component.normalizedScore}`}>
              <span style={{ width: `${component.normalizedScore}%` }} />
            </div>
            <span>{component.normalizedScore} × {Math.round(component.weight * 100)}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}
