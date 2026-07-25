"use client";

import { useId, useRef, useState } from 'react';

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
  id?: string;
}

const idPart = (value: string) => encodeURIComponent(value).replace(/%/g, '-');

export const getTabId = (tabSetId: string, tabId: string) => `${tabSetId}-tab-${idPart(tabId)}`;
export const getTabPanelId = (tabSetId: string, tabId: string) => `${tabSetId}-panel-${idPart(tabId)}`;

function TabList({
  tabs,
  activeTab,
  onChange,
  className,
  id,
}: {
  tabs: Tab[];
  activeTab?: string;
  onChange: (tabId: string) => void;
  className: string;
  id?: string;
}) {
  const generatedId = useId();
  const tabSetId = id ?? `tabs-${generatedId.replace(/:/g, '')}`;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedTab = tabs.some((tab) => tab.id === activeTab) ? activeTab : tabs[0]?.id;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    if (!nextTab) return;
    onChange(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={`flex gap-1 border-b border-[var(--color-border)] ${className}`} role="tablist">
      {tabs.map((tab, index) => {
        const isActive = selectedTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={(element) => { tabRefs.current[index] = element; }}
            id={getTabId(tabSetId, tab.id)}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={getTabPanelId(tabSetId, tab.id)}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
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

export function Tabs({ tabs, defaultTab, onChange, className = '', id }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);

  const handleChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return <TabList tabs={tabs} activeTab={activeTab} onChange={handleChange} className={className} id={id} />;
}

/** Controlled version - parent manages active tab. */
export function TabsControlled({
  tabs,
  activeTab,
  onChange,
  className = '',
  id,
}: Omit<TabsProps, 'defaultTab'> & { activeTab: string }) {
  return (
    <TabList
      tabs={tabs}
      activeTab={activeTab}
      onChange={(tabId) => onChange?.(tabId)}
      className={className}
      id={id}
    />
  );
}
