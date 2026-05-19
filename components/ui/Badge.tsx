import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'amber' | 'green' | 'red' | 'purple' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ children, variant = 'teal', size = 'md', className = '' }: BadgeProps) {
  const variantStyles = {
    teal: 'bg-primary-light text-primary',
    amber: 'bg-accent-light text-accent-dark',
    green: 'bg-green-100 text-success dark:bg-green-900/30 dark:text-green-400',
    red: 'bg-red-100 text-error dark:bg-red-900/30 dark:text-red-400',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  };
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };
  
  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
}
