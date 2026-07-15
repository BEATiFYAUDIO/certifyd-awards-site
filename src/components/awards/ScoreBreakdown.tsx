import { calculateWeightedScore, formatScore, validateWeights } from '../../lib/scoring';
import type { ScoreComponent } from '../../types';

const publicLabels: Record<string, string> = {
  Proof: 'Recorded work',
  Support: 'Audience support',
  Transparency: 'Complete credits',
  Recency: 'Current season',
  Relationships: 'Creative credits',
  Availability: 'Public access',
};

const publicReasons: Record<string, string> = {
  Proof: 'Release information, authorship details, and reviewable publication records.',
  Support: 'Visible audience activity around the work, including public response and discovery momentum.',
  Transparency: 'Clear credit information for the people and partners who helped bring the work to life.',
  Recency: 'Fresh public activity from the current awards season.',
  Relationships: 'Collaborators, contributors, and connected works that show the creative story behind the release.',
  Availability: 'Reliable public access to the work, its creator page, and supporting materials.',
};

export function ScoreBreakdown({ scoring }: { scoring: ScoreComponent[] }) {
  const total = calculateWeightedScore(scoring);
  const statusLabel = validateWeights(scoring) ? 'Advisory signal' : 'Under review';
  return (
    <section className="glass-card score-card warm-score-card">
      <div className="section-heading inline">
        <div>
          <span className="eyebrow">Technical distinction</span>
          <h2>{formatScore(total)} merit signal</h2>
        </div>
        <span className={validateWeights(scoring) ? 'status-pill ok' : 'status-pill warn'}>
          {statusLabel}
        </span>
      </div>
      <p className="muted">
        This recognition considers works and contributors whose public releases show outstanding technical significance
        in authorship, credits, availability, and audience response. The signal informs review; final recognition remains a
        human decision.
      </p>
      <div className="score-list">
        {scoring.map((component) => {
          const label = publicLabels[component.label] ?? component.label;
          const reason = publicReasons[component.label] ?? component.reason;
          return (
            <div className="score-row" key={component.label}>
              <div>
                <strong>{label}</strong>
                <p>{reason}</p>
              </div>
              <div className="score-meter" aria-label={`${label} score ${component.normalizedScore}`}>
                <span style={{ width: `${component.normalizedScore}%` }} />
              </div>
              <span>{component.normalizedScore >= 80 ? 'Strong' : component.normalizedScore >= 60 ? 'Active' : 'Emerging'}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
