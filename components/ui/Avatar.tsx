import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, alt, name, size = 'md', className = '' }: AvatarProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl',
  };
  
  const getInitials = (name?: string) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };
  
  if (src) {
    return (
      <div className={`relative rounded-full overflow-hidden ${sizeStyles[size]} ${className}`}>
        <Image
          src={src}
          alt={alt || name || 'Avatar'}
          fill
          className="object-cover"
        />
      </div>
    );
  }
  
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-primary text-white font-semibold ${sizeStyles[size]} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}
