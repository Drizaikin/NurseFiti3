interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Action buttons rendered on the right */
  actions?: React.ReactNode;
  /** Breadcrumb items */
  breadcrumb?: Array<{ label: string; href?: string }>;
  className?: string;
}

export function PageHeader({ title, subtitle, actions, breadcrumb, className = '' }: PageHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] mb-2" aria-label="Breadcrumb">
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-[var(--color-text)]">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-[var(--color-text)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
