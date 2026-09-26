# RadioCheckbox

Handles single radio buttons, single checkboxes, radio groups, and checkbox groups — all from one component.

## Import

```tsx
import RadioCheckbox from '@/components/RadioCheckbox/RadioCheckbox';
```

## Props — Single (radio or checkbox)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inputType` | `'radio' \| 'checkbox'` | — | Which input type to render |
| `label` | `string` | — | Label text beside the input |
| `error` | `string` | — | Error message below the input |
| `helperText` | `string` | — | Helper message below the input |
| `required` | `boolean` | `false` | Adds `*` to the label |
| `fullWidth` | `boolean` | `false` | Wrapper stretches full width |

All standard HTML input attributes are also accepted (`checked`, `onChange`, `name`, `value`, `disabled`, etc.).

## Props — Group (radio-group or checkbox-group)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inputType` | `'radio-group' \| 'checkbox-group'` | — | Which group type |
| `name` | `string` | — | HTML `name` attribute shared across options |
| `options` | `{ value: string; label: string; disabled?: boolean }[]` | — | The list of choices |
| `value` | `string` (radio) or `string[]` (checkbox-group) | — | Currently selected value(s) |
| `onChange` | `(value: string \| string[]) => void` | — | Called with new selection |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | Stack direction of options |
| `label` | `string` | — | Group label above the options |
| `error` | `string` | — | Error message below the group |
| `helperText` | `string` | — | Helper text below the group |

---

## Usage

### Single checkbox (controlled)

```tsx
const [agreed, setAgreed] = useState(false);

<RadioCheckbox
  inputType="checkbox"
  label="I agree to the terms and conditions"
  checked={agreed}
  onChange={e => setAgreed(e.target.checked)}
  required
/>
```

### Single radio

```tsx
<RadioCheckbox
  inputType="radio"
  name="plan"
  value="pro"
  label="Pro plan"
  checked={plan === 'pro'}
  onChange={() => setPlan('pro')}
/>
```

### Radio group

```tsx
const [gender, setGender] = useState('');

<RadioCheckbox
  inputType="radio-group"
  name="gender"
  label="Gender"
  options={[
    { value: 'male',   label: 'Male'   },
    { value: 'female', label: 'Female' },
    { value: 'other',  label: 'Other'  },
  ]}
  value={gender}
  onChange={v => setGender(v as string)}
  layout="horizontal"
/>
```

### Checkbox group (multi-select)

```tsx
const [skills, setSkills] = useState<string[]>([]);

<RadioCheckbox
  inputType="checkbox-group"
  name="skills"
  label="Skills"
  options={[
    { value: 'python',   label: 'Python'   },
    { value: 'golang',   label: 'Golang'   },
    { value: 'postgres', label: 'PostgreSQL' },
  ]}
  value={skills}
  onChange={v => setSkills(v as string[])}
/>
```

### With validation

```tsx
<RadioCheckbox
  inputType="radio-group"
  name="role"
  options={roleOptions}
  value={role}
  onChange={v => setRole(v as string)}
  error={errors.role}
  helperText="Choose the role that best describes you."
/>
```

### Disabled options

```tsx
<RadioCheckbox
  inputType="radio-group"
  name="plan"
  options={[
    { value: 'free',  label: 'Free'       },
    { value: 'pro',   label: 'Pro'        },
    { value: 'team',  label: 'Team (soon)', disabled: true },
  ]}
  value={plan}
  onChange={v => setPlan(v as string)}
/>
```

---

## Notes

- The component is wrapped in `forwardRef` — pass a `ref` to get the underlying input element.
- `radio-group` returns a `string`, `checkbox-group` returns a `string[]`. Cast accordingly.
- Group `onChange` receives the new complete selection — no need to manually merge the previous array for checkboxes.
