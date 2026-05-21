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
  const baseStyles = 'font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-accent text-dark hover:bg-accent-dark',
    secondary: 'bg-primary text-white hover:bg-primary-mid',
    ghost: 'bg-transparent text-primary hover:bg-primary-light',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary-light',
    danger: 'bg-error text-white hover:bg-red-600',
  };
  
  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
