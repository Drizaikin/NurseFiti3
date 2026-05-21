"use client";

import { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export function Dropdown({
  options,
  value,
  placeholder = 'Select an option',
  onChange,
  disabled = false,
  className = '',
  label,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-semibold mb-1.5 text-[var(--color-text)]">{label}</label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-[var(--color-text)] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary cursor-pointer'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`flex items-center gap-2 ${!selected ? 'text-[var(--color-text-secondary)]' : ''}`}>
          {selected?.icon}
          {selected?.label ?? placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-[var(--color-text-secondary)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-30 w-full mt-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                if (!option.disabled) {
                  onChange(option.value);
                  setIsOpen(false);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                option.disabled
                  ? 'opacity-40 cursor-not-allowed'
                  : option.value === value
                  ? 'bg-primary-light text-primary font-semibold'
                  : 'text-[var(--color-text)] hover:bg-primary-light hover:text-primary'
              }`}
            >
              {option.icon}
              {option.label}
              {option.value === value && (
                <svg className="w-4 h-4 ml-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
