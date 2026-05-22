import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = 'font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center active:scale-[0.98]';

  const variantStyles: Record<string, string> = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    ghost:     'bg-transparent text-primary hover:bg-primary-light',
    outline:   'bg-transparent border-2 border-primary text-primary hover:bg-primary-light',
    danger:    'bg-error text-white hover:bg-red-600 shadow-[0_0_16px_rgba(232,69,69,0.30)] hover:shadow-[0_0_24px_rgba(232,69,69,0.45)]',
  };

  const sizeStyles: Record<string, string> = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };

  // primary and secondary already have full styles from CSS classes
  if (variant === 'primary' || variant === 'secondary') {
    return (
      <button
        className={`${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
