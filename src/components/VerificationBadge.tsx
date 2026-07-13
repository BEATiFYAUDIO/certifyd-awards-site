interface VerificationBadgeProps {
  label: string;
  tone?: 'gold' | 'blue' | 'green' | 'pink';
}

export function VerificationBadge({ label, tone = 'gold' }: VerificationBadgeProps) {
  return <span className={`verification-badge badge-${tone}`}>{label}</span>;
}
