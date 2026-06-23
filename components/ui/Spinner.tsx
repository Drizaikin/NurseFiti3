'use client';

import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'white'; // Retained for compatibility but ECG uses its own colors
  className?: string;
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  // Using pathLength="100" normalizes the stroke length to 100 for easy CSS animation
  
  const sizeStyles = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
  };

  const colorStyles = {
    primary: 'text-primary',
    accent: 'text-accent',
    white: 'text-white',
  };

  return (
    <div
      className={`inline-block ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <style>
          {`
            .ecg-trace-1 {
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
              animation: draw-ecg-1 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }
            .ecg-trace-2 {
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
              animation: draw-ecg-2 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }
            
            @keyframes draw-ecg-1 {
              0% { stroke-dashoffset: 100; opacity: 1; }
              40% { stroke-dashoffset: 0; opacity: 1; }
              80% { stroke-dashoffset: 0; opacity: 1; }
              90% { stroke-dashoffset: 0; opacity: 0; }
              100% { stroke-dashoffset: 100; opacity: 0; }
            }
            
            @keyframes draw-ecg-2 {
              0% { stroke-dashoffset: 100; opacity: 1; }
              40% { stroke-dashoffset: 100; opacity: 1; } /* wait for path 1 */
              60% { stroke-dashoffset: 0; opacity: 1; }
              80% { stroke-dashoffset: 0; opacity: 1; }
              90% { stroke-dashoffset: 0; opacity: 0; }
              100% { stroke-dashoffset: 100; opacity: 0; }
            }
          `}
        </style>
        
        {/* Background rounded rect if needed, but usually a spinner is transparent.
            The user wants the animated line, but in the logo it's inside a dark box.
            Let's keep it transparent so it fits anywhere, using a teal-light trace for dark mode / white for light mode.
            Actually, let's use the brand colors: primary teal for the ECG line, accent amber for the tick. 
        */}
        <path
          className="ecg-trace-1"
          d="M 9,41 L 17,41 L 20,35 L 23,41 L 27,41 L 29,19 L 31,57 L 33,41 L 40,41"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          pathLength="100"
        />
        <path
          className="ecg-trace-2"
          d="M 40,41 L 46,50 L 62,27"
          stroke="var(--color-accent, #F5A623)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          pathLength="100"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
