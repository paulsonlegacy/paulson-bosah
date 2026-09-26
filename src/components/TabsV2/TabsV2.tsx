// TabsV2 — Vertical sidebar navigation + content layout.
// Use when you have 6+ sections or long labels that overflow horizontal tabs.
// Desktop: sidebar on the left, content on the right.
// Mobile: sidebar collapses to a touch-scrollable horizontal strip above the content.
//
// Contrast with Tabs (v1): a horizontal-only nav strip (underline or pill variant),
// best for 2–5 short labels such as "Rooms / Halls". Tabs renders navigation only.
// TabsV2 renders navigation + content together as a unified layout component.

import './TabsV2.css';

type Tab = { id: string; label: string };

type TabsV2Props = {
  tabs:      Tab[];
  activeTab: string;
  onChange:  (id: string) => void;
  children:  React.ReactNode;
};

export default function TabsV2({ tabs, activeTab, onChange, children }: TabsV2Props) {
  return (
    <div className="tabs-v2">
      <nav className="tabs-v2__nav">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`tabs-v2__tab${activeTab === t.id ? ' tabs-v2__tab--active' : ''}`}
            onClick={() => onChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <div className="tabs-v2__content">
        {children}
      </div>
    </div>
  );
}
