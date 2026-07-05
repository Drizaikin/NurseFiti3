'use client';

import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'white'; // Kept for API compatibility, though colors are hardcoded to brand
  className?: string;
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const sizeStyles = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
  };

  return (
    <div
      className={`inline-block ${sizeStyles[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          {/* A mask that sweeps from left to right to reveal the stroke continuously */}
          <clipPath id="sweep-reveal">
            <rect x="0" y="0" width="80" height="80" className="reveal-rect" />
          </clipPath>
        </defs>

        <style>
          {`
            .reveal-rect {
              animation: sweep 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }
            
            @keyframes sweep {
              0% { width: 0; opacity: 1; }
              70% { width: 80px; opacity: 1; }
              80% { width: 80px; opacity: 1; }
              90% { width: 80px; opacity: 0; }
              100% { width: 0; opacity: 0; }
            }
            
            /* Add a subtle fading trail effect by animating opacity of the whole group */
            .trace-group {
              animation: fade-out 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }

            @keyframes fade-out {
              0%, 80% { opacity: 1; }
              90%, 100% { opacity: 0; }
            }
          `}
        </style>
        
        <g clipPath="url(#sweep-reveal)" className="trace-group">
          {/* ECG Trace (Teal/Primary) */}
          <path
            d="M 9,41 L 17,41 L 20,35 L 23,41 L 27,41 L 29,19 L 31,57 L 33,41 L 40,41"
            stroke="#08514F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Yellow Tick */}
          <path
            d="M 40,41 L 46,50 L 62,27"
            stroke="var(--color-accent, #F5A623)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
