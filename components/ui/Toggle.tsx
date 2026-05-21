"use client";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function Toggle({ checked, onChange, label, disabled = false, size = 'md', className = '' }: ToggleProps) {
  const trackSize = size === 'sm' ? 'w-9 h-5' : 'w-11 h-6';
  const thumbSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const thumbTranslate = size === 'sm'
    ? (checked ? 'translate-x-4' : 'translate-x-0.5')
    : (checked ? 'translate-x-5' : 'translate-x-1');

  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex items-center ${trackSize} rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          checked ? 'bg-primary' : 'bg-neutral-border'
        }`}
      >
        <span
          className={`inline-block ${thumbSize} bg-white rounded-full shadow transition-transform ${thumbTranslate}`}
        />
      </button>
      {label && (
        <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
      )}
    </label>
  );
}
