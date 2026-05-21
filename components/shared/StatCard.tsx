import { Card } from '@/components/ui/Card';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  /** e.g. "+12%" or "-3" — shown in small text below value */
  delta?: string;
  deltaPositive?: boolean;
  /** Tailwind gradient classes for the card background */
  gradient?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  delta,
  deltaPositive,
  gradient,
  className = '',
}: StatCardProps) {
  return (
    <Card className={`${gradient ?? ''} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1 truncate">{label}</p>
          <p className="text-3xl font-heading font-bold text-[var(--color-text)] leading-none">
            {value}
          </p>
          {delta && (
            <p className={`text-xs mt-1.5 font-medium ${deltaPositive ? 'text-success' : 'text-error'}`}>
              {delta}
            </p>
          )}
        </div>
        {icon && (
          <div className="ml-3 flex-shrink-0 text-3xl" aria-hidden="true">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
