import React from 'react';

interface NurseFitiLogoProps {
  size?: number;
  variant?: 'full' | 'icon';
  /** 'sidebar' = always on dark bg, 'topbar' = adapts to theme, 'auth' = on light bg */
  context?: 'sidebar' | 'topbar' | 'auth';
  className?: string;
}

export function NurseFitiLogo({
  size = 64,
  variant = 'full',
  context = 'topbar',
  className = '',
}: NurseFitiLogoProps) {
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

  // ── Wordmark colour logic ──────────────────────────────────────────────
  // sidebar: always on dark bg → teal-light + amber, both with glow
  // topbar:  adapts via CSS dark: selector
  // auth:    on light bg → primary teal + amber-dark

  const isOnDark = context === 'sidebar';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
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

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="font-heading text-2xl leading-none select-none">
          {/* "Nurse" — teal-light, subtle teal glow in light mode */}
          <span
            className={isOnDark ? 'logo-nurse-dark' : 'logo-nurse-theme'}
          >
            Nurse
          </span>
          {/* "Fiti" — amber, stronger amber glow in dark mode */}
          <span
            className={isOnDark ? 'logo-fiti-dark' : 'logo-fiti-theme'}
          >
            Fiti
          </span>
        </div>
        <div className="text-[10px] font-body font-bold tracking-[0.16em] uppercase mt-0.5"
          style={{ color: isOnDark ? 'rgba(122,158,158,0.70)' : 'var(--color-neutral-light)' }}
        >
          NCK Exam Preparation
        </div>
      </div>
    </div>
  );
}
