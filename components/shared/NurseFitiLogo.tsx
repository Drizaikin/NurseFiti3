import React from 'react';

interface NurseFitiLogoProps {
  size?: number;
  variant?: 'full' | 'icon';
  className?: string;
}

export function NurseFitiLogo({ size = 64, variant = 'full', className = '' }: NurseFitiLogoProps) {
  if (variant === 'icon') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="80" height="80" rx="18" fill="#08514F" />
        <path
          d="M 9,41 L 17,41 L 20,35 L 23,41 L 27,41 L 29,19 L 31,57 L 33,41 L 40,41"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 40,41 L 46,50 L 62,27"
          stroke="#F5A623"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="80" height="80" rx="18" fill="#08514F" />
        <path
          d="M 9,41 L 17,41 L 20,35 L 23,41 L 27,41 L 29,19 L 31,57 L 33,41 L 40,41"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 40,41 L 46,50 L 62,27"
          stroke="#F5A623"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <div className="flex flex-col">
        <div className="font-heading text-2xl leading-none">
          <span className="font-normal">Nurse</span>
          <span className="font-extrabold">Fiti</span>
        </div>
        <div className="text-xs font-body font-bold tracking-widest uppercase text-neutral-light">
          NCK Exam Preparation
        </div>
      </div>
    </div>
  );
}
