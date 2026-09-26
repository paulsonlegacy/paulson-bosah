# Switch

An iOS-style pill toggle for boolean settings. Controlled component — you own the state.

## Import

```tsx
import Switch from '@/components/Switch/Switch';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Current on/off state |
| `onChange` | `(checked: boolean) => void` | — | Called with the new value when toggled |
| `label` | `string` | — | Optional label text beside the toggle |
| `disabled` | `boolean` | `false` | Prevents interaction and dims the toggle |

---

## Usage

### Basic toggle

```tsx
const [enabled, setEnabled] = useState(false);

<Switch checked={enabled} onChange={setEnabled} />
```

### With label

```tsx
<Switch
  checked={notifications}
  onChange={setNotifications}
  label="Email notifications"
/>
```

### Disabled

```tsx
<Switch checked={true} onChange={() => {}} disabled label="Read-only setting" />
```

### Saving on change

```tsx
async function handleToggle(value: boolean) {
  setEnabled(value);
  await api.updateSetting({ notifications: value });
}

<Switch checked={enabled} onChange={handleToggle} label="Notify me" />
```

### In a settings list

```tsx
{settings.map(s => (
  <div key={s.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0' }}>
    <span>{s.label}</span>
    <Switch checked={s.value} onChange={v => updateSetting(s.key, v)} />
  </div>
))}
```

---

## Notes

- The component uses `role="switch"` and `aria-checked` for accessibility.
- The pill shape is intentional — it is a universally understood affordance for toggles and is the one element in this project where rounded corners are kept.
