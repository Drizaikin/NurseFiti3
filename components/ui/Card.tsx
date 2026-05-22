import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Adds a subtle hover lift effect */
  hoverable?: boolean;
}

export function Card({ children, className = '', padding = 'md', hoverable = false }: CardProps) {
  const paddingStyles: Record<string, string> = {
    none: '',
    sm:   'p-4',
    md:   'p-5 sm:p-6',
    lg:   'p-6 sm:p-8',
  };

  return (
    <div
      className={`
        bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl
        shadow-card
        ${hoverable ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover' : ''}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
