"use client";

import { useEffect, useId, useRef, useState } from 'react';

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
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
  const generatedId = useId().replace(/:/g, '');
  const triggerId = `dropdown-${generatedId}`;
  const labelId = `${triggerId}-label`;
  const listboxId = `${triggerId}-listbox`;

  const selected = options.find((option) => option.value === value);
  const enabledIndexes = options.reduce<number[]>((indexes, option, index) => {
    if (!option.disabled) indexes.push(index);
    return indexes;
  }, []);

  const closeDropdown = (returnFocus = true) => {
    setIsOpen(false);
    if (returnFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const openDropdown = (position: 'selected' | 'first' | 'last' = 'selected') => {
    if (disabled) return;
    const selectedIndex = options.findIndex((option) => option.value === value && !option.disabled);
    const nextIndex = position === 'first'
      ? enabledIndexes[0]
      : position === 'last'
      ? enabledIndexes[enabledIndexes.length - 1]
      : selectedIndex >= 0
      ? selectedIndex
      : enabledIndexes[0];
    setActiveIndex(nextIndex ?? -1);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) return;
    if (activeIndex >= 0) optionRefs.current[activeIndex]?.focus();
    else listRef.current?.focus();
  }, [activeIndex, isOpen]);

  // Close on outside click without stealing focus from the clicked control.
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectOption = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    onChange(option.value);
    closeDropdown();
  };

  const moveActiveOption = (direction: 1 | -1) => {
    if (enabledIndexes.length === 0) return;
    const currentPosition = enabledIndexes.indexOf(activeIndex);
    const nextPosition = currentPosition < 0
      ? direction === 1 ? 0 : enabledIndexes.length - 1
      : (currentPosition + direction + enabledIndexes.length) % enabledIndexes.length;
    setActiveIndex(enabledIndexes[nextPosition]);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        isOpen ? closeDropdown() : openDropdown();
        break;
      case 'ArrowDown':
        event.preventDefault();
        openDropdown('first');
        break;
      case 'ArrowUp':
        event.preventDefault();
        openDropdown('last');
        break;
      case 'Home':
        event.preventDefault();
        openDropdown('first');
        break;
      case 'End':
        event.preventDefault();
        openDropdown('last');
        break;
      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          closeDropdown();
        }
        break;
    }
  };

  const handleListboxKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        moveActiveOption(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveActiveOption(-1);
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(enabledIndexes[0] ?? -1);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(enabledIndexes[enabledIndexes.length - 1] ?? -1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        selectOption(activeIndex);
        break;
      case 'Escape':
        event.preventDefault();
        closeDropdown();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label id={labelId} htmlFor={triggerId} className="block text-sm font-semibold mb-1.5 text-[var(--color-text)]">
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        disabled={disabled}
        onClick={() => isOpen ? closeDropdown() : openDropdown()}
        onKeyDown={handleTriggerKeyDown}
        className={`w-full flex items-center justify-between px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] text-[var(--color-text)] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary cursor-pointer'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
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
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={label ? labelId : triggerId}
          tabIndex={-1}
          onKeyDown={handleListboxKeyDown}
          className="absolute z-30 w-full mt-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              ref={(element) => { optionRefs.current[index] = element; }}
              id={`${listboxId}-option-${index}`}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled || undefined}
              tabIndex={option.disabled ? undefined : -1}
              onFocus={() => setActiveIndex(index)}
              onClick={() => selectOption(index)}
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
                <svg className="w-4 h-4 ml-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
