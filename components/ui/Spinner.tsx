import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'white';
  className?: string;
}

export function Spinner({ size = 'md', color = 'primary', className = '' }: SpinnerProps) {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };
  
  const colorStyles = {
    primary: 'border-primary border-t-transparent',
    accent: 'border-accent border-t-transparent',
    white: 'border-white border-t-transparent',
  };
  
  return (
    <div
      className={`inline-block rounded-full animate-spin ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
