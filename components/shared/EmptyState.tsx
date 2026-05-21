import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  className?: string;
}

const DefaultIcon = () => (
  <svg className="w-16 h-16 text-neutral-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);

export function EmptyState({ title, description, icon, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="mb-4">{icon ?? <DefaultIcon />}</div>
      <h3 className="text-lg font-heading font-bold text-[var(--color-text)] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--color-text-secondary)] max-w-sm mb-6">{description}</p>
      )}
      {action && (
        <Button variant={action.variant ?? 'primary'} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
