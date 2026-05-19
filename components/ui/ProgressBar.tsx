import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  showLabel?: boolean;
  color?: 'teal' | 'amber' | 'green' | 'red';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = true,
  color = 'teal',
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const colorStyles = {
    teal: 'bg-primary',
    amber: 'bg-accent',
    green: 'bg-success',
    red: 'bg-error',
  };
  
  const sizeStyles = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-neutral-border rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`h-full ${colorStyles[color]} transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-neutral-mid text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}
