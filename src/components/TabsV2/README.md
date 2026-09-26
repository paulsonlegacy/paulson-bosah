# TabsV2

Vertical sidebar navigation with content panel. Use for pages with 4+ sections or long tab labels that would overflow a horizontal strip. On mobile it collapses to a scrollable horizontal bar above the content.

## Import

```tsx
import TabsV2 from '@/components/TabsV2/TabsV2';
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `tabs` | `{ id: string; label: string }[]` | Ordered list of tab definitions |
| `activeTab` | `string` | The `id` of the currently selected tab |
| `onChange` | `(id: string) => void` | Called when a tab is clicked |
| `children` | `ReactNode` | Content displayed in the right panel |

You control which content to render based on `activeTab` — `TabsV2` only renders the nav and wraps the panel.

---

## Usage

### Basic

```tsx
const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'details',  label: 'Details'  },
  { id: 'notes',    label: 'Notes'    },
];

const [tab, setTab] = useState('overview');

<TabsV2 tabs={TABS} activeTab={tab} onChange={setTab}>
  {tab === 'overview' && <OverviewPanel />}
  {tab === 'details'  && <DetailsPanel />}
  {tab === 'notes'    && <NotesPanel />}
</TabsV2>
```

### With a switch statement

```tsx
function renderContent(tab: string) {
  switch (tab) {
    case 'overview': return <OverviewPanel />;
    case 'details':  return <DetailsPanel />;
    default:         return null;
  }
}

<TabsV2 tabs={TABS} activeTab={activeTab} onChange={setActiveTab}>
  {renderContent(activeTab)}
</TabsV2>
```

### Driven by URL (React Router)

```tsx
import { useSearchParams } from 'react-router-dom';

const [params, setParams] = useSearchParams();
const tab = params.get('tab') ?? 'overview';

<TabsV2
  tabs={TABS}
  activeTab={tab}
  onChange={id => setParams({ tab: id })}
>
  {renderContent(tab)}
</TabsV2>
```

### Many sections (settings page pattern)

```tsx
const SETTINGS_TABS = [
  { id: 'profile',       label: 'Profile'       },
  { id: 'security',      label: 'Security'      },
  { id: 'notifications', label: 'Notifications' },
  { id: 'billing',       label: 'Billing'       },
  { id: 'integrations',  label: 'Integrations'  },
];

const [tab, setTab] = useState('profile');

<TabsV2 tabs={SETTINGS_TABS} activeTab={tab} onChange={setTab}>
  {tab === 'profile'       && <ProfileSettings />}
  {tab === 'security'      && <SecuritySettings />}
  {tab === 'notifications' && <NotificationSettings />}
  {tab === 'billing'       && <BillingSettings />}
  {tab === 'integrations'  && <IntegrationSettings />}
</TabsV2>
```

---

## Notes

- The sidebar is 180px wide on desktop. Content takes the remaining space.
- On screens ≤ 800px the layout becomes single-column with a horizontal scrollable tab bar.
- For 2–4 short labels, a horizontal tab strip is usually a better fit. `TabsV2` shines with 5+ sections or long labels.
