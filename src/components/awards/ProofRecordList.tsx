import type { ProofRecord } from '../../types';

export function ProofRecordList({ proofs }: { proofs: ProofRecord[] }) {
  return (
    <div className="proof-list">
      {proofs.map((proof) => (
        <article className="proof-row" key={proof.id}>
          <span className={`proof-dot ${proof.status}`} />
          <div>
            <strong>{proof.label}</strong>
            <p>{proof.source}</p>
            <code>{proof.hash}</code>
          </div>
        </article>
      ))}
    </div>
  );
}
