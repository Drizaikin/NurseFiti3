"use client";

import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  children?: React.ReactNode;
  className?: string;
}

export function Tabs({ tabs, defaultTab, onChange, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);

  const handleChange = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <div className={`flex gap-1 border-b border-[var(--color-border)] ${className}`} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              isActive
                ? 'border-primary text-primary'
                : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-border)]'
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={`px-1.5 py-0.5 text-xs rounded-full font-semibold ${
                isActive ? 'bg-primary text-white' : 'bg-neutral-border text-neutral-mid'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Controlled version — parent manages active tab */
export function TabsControlled({
  tabs,
  activeTab,
  onChange,
  className = '',
}: Omit<TabsProps, 'defaultTab'> & { activeTab: string }) {
  return (
    <div className={`flex gap-1 border-b border-[var(--color-border)] ${className}`} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange?.(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              isActive
                ? 'border-primary text-primary'
                : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-border)]'
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={`px-1.5 py-0.5 text-xs rounded-full font-semibold ${
                isActive ? 'bg-primary text-white' : 'bg-neutral-border text-neutral-mid'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
