interface SkeletonProps {
  className?: string;
  /** Render multiple stacked rows */
  rows?: number;
  /** Height of each row */
  height?: string;
}

export function Skeleton({ className = '', rows = 1, height = 'h-4' }: SkeletonProps) {
  if (rows > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={`animate-pulse rounded-lg bg-neutral-border dark:bg-dark-mid ${height} ${
              i === rows - 1 ? 'w-3/4' : 'w-full'
            } ${className}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`animate-pulse rounded-lg bg-neutral-border dark:bg-dark-mid ${height} ${className}`}
    />
  );
}

/** Pre-built card skeleton */
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 ${className}`}>
      <Skeleton height="h-5" className="w-1/3 mb-4" />
      <Skeleton rows={3} />
    </div>
  );
}

/** Pre-built stat card skeleton */
export function StatCardSkeleton() {
  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6">
      <div className="flex items-center justify-between mb-3">
        <Skeleton height="h-4" className="w-24" />
        <Skeleton height="h-8" className="w-8 rounded-full" />
      </div>
      <Skeleton height="h-8" className="w-20 mb-2" />
      <Skeleton height="h-3" className="w-32" />
    </div>
  );
}
