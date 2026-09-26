# Input

A unified input component that covers text fields, textareas, and `<select>` dropdowns — all with label positioning, validation states, and optional icons.

## Import

```tsx
import Input from '@/components/Input/Input';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inputType` | `'text' \| 'email' \| 'password' \| 'number' \| 'money' \| 'tel' \| 'url' \| 'date' \| 'time' \| 'datetime-local' \| 'textarea' \| 'select'` | `'text'` | Controls which element renders |
| `label` | `string` | — | Label text |
| `labelPosition` | `'top' \| 'left' \| 'right' \| 'bottom'` | `'top'` | Where the label appears |
| `error` | `string` | — | Error message — turns border red |
| `success` | `string` | — | Success message — turns border green |
| `helperText` | `string` | — | Hint shown below the field |
| `icon` | `ReactNode` | — | Icon inside the field |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Where the icon sits |
| `iconClickable` | `boolean` | `false` | Makes the icon pointer-interactive |
| `onIconClick` | `() => void` | — | Click handler for the icon (renders as `<button>`) |
| `fullWidth` | `boolean` | `false` | Stretch to fill container |
| `required` | `boolean` | `false` | Adds `*` to the label |
| `inputWidth` | `string \| number` | — | Fixed width override (px or CSS string) |
| `options` | `{ value: string; label: string }[]` | — | **Select only** — the dropdown options |
| `placeholder` | `string` | `'Select an option'` | **Select only** — placeholder option text |
| `rows` | `number` | `4` | **Textarea only** — number of visible rows |
| `ref` | `Ref` | — | Forwarded ref to the underlying input/textarea/select |

All standard HTML attributes for the underlying element are also accepted.

---

## Usage

### Basic text input

```tsx
<Input label="Full name" name="name" required />
```

### Email

```tsx
<Input inputType="email" label="Email address" fullWidth />
```

### Password with toggle icon

```tsx
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const [show, setShow] = useState(false);

<Input
  inputType={show ? 'text' : 'password'}
  label="Password"
  icon={show ? <FaEyeSlash /> : <FaEye />}
  iconPosition="right"
  onIconClick={() => setShow(s => !s)}
  iconTitle={show ? 'Hide password' : 'Show password'}
/>
```

### With validation

```tsx
<Input
  label="Username"
  error={errors.username}   // shows error state + message when truthy
  success={touched && !errors.username ? 'Looks good' : undefined}
/>
```

### Textarea

```tsx
<Input inputType="textarea" label="Message" rows={6} fullWidth />
```

### Select dropdown

```tsx
<Input
  inputType="select"
  label="Country"
  placeholder="Pick a country"
  options={[
    { value: 'ng', label: 'Nigeria' },
    { value: 'gh', label: 'Ghana' },
  ]}
  onChange={e => setCountry(e.target.value)}
/>
```

### Number / money (scroll-safe)

```tsx
// Both blur on wheel so accidental scrolling can't change the value.
<Input inputType="number" label="Quantity" />

// money type: integers only (no decimals allowed, paste-truncated).
<Input inputType="money" label="Amount (₦)" />
```

### Label positions

```tsx
<Input label="Name" labelPosition="left" />
<Input label="Name" labelPosition="right" />
<Input label="Name" labelPosition="bottom" />
```

### Helper text

```tsx
<Input label="Handle" helperText="Letters, numbers, and underscores only." />
```

### Full width in a form

```tsx
<form>
  <Input inputType="email" label="Email" fullWidth required />
  <Input inputType="textarea" label="Message" fullWidth rows={5} />
</form>
```

---

## Notes

- `error` takes priority over `success` in display — pass `undefined` to clear the error state.
- `number` and `money` inputs both call `blur()` on scroll to prevent silent value changes.
- `money` additionally blocks decimal input at the keyboard level and truncates pasted values.
- The component forwards `ref` so it works with `react-hook-form` and similar libraries.
