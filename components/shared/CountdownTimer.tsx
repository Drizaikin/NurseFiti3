"use client";

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  /** Target date string or Date object */
  targetDate: string | Date;
  /** Called when timer reaches zero */
  onExpire?: () => void;
  /** Show days/hours/minutes/seconds segments */
  variant?: 'full' | 'compact' | 'exam';
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const total = Math.max(0, target.getTime() - Date.now());
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / 1000 / 60) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function CountdownTimer({ targetDate, onExpire, variant = 'full', className = '' }: CountdownTimerProps) {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(target));

  useEffect(() => {
    if (timeLeft.total <= 0) {
      onExpire?.();
      return;
    }
    const id = setInterval(() => {
      const next = calcTimeLeft(target);
      setTimeLeft(next);
      if (next.total <= 0) {
        clearInterval(id);
        onExpire?.();
      }
    }, 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.getTime()]);

  if (variant === 'exam') {
    // Exam timer — large, turns red under 20 min
    // Always on a dark background (#0A1A1A) so use white for normal state
    const isWarning = timeLeft.total < 20 * 60 * 1000;
    return (
      <div className={`font-heading font-bold tabular-nums ${isWarning ? 'text-error' : 'text-white'} ${className}`}>
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <span className={`font-semibold tabular-nums text-[var(--color-text)] ${className}`}>
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    );
  }

  // Full variant — segmented display
  const segments = [
    { label: 'Days',    value: timeLeft.days },
    { label: 'Hours',   value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {segments.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary tabular-nums leading-none">
              {pad(value)}
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-1">{label}</div>
          </div>
          {i < segments.length - 1 && (
            <span className="text-2xl font-bold text-neutral-light mb-3">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
