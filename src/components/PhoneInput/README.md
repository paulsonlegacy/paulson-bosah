# PhoneInput

A compound phone number field — country dial-code selector on the left, subscriber number input on the right. Stores and returns the value in E.164 format (`+2348012345678`).

## Import

```tsx
import PhoneInput from '@/components/PhoneInput/PhoneInput';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Full E.164 value (`+234...`) |
| `onChange` | `(value: string) => void` | — | Called with the updated E.164 string |
| `label` | `string` | — | Label above the field |
| `defaultCountry` | `string` | `'NG'` | ISO alpha-2 country code to pre-select the dial code when `value` is empty |
| `required` | `boolean` | `false` | Adds `*` to the label |
| `fullWidth` | `boolean` | `false` | Stretches to fill container |
| `helperText` | `string` | — | Hint shown below when no error |
| `error` | `string` | — | Error message, turns border red |
| `disabled` | `boolean` | `false` | Blocks interaction on both sub-fields |

---

## Usage

### Basic

```tsx
const [phone, setPhone] = useState('');

<PhoneInput label="Phone number" value={phone} onChange={setPhone} />
```

### Default country

```tsx
// Starts with +44 (UK) when value is empty.
<PhoneInput
  label="Phone"
  value={phone}
  onChange={setPhone}
  defaultCountry="GB"
/>
```

Common codes: `NG` (+234), `GH` (+233), `US` (+1), `GB` (+44), `ZA` (+27)

### Full width in a form

```tsx
<PhoneInput
  label="Mobile number"
  value={phone}
  onChange={setPhone}
  defaultCountry="NG"
  fullWidth
  required
/>
```

### With validation

```tsx
<PhoneInput
  label="WhatsApp number"
  value={phone}
  onChange={setPhone}
  error={errors.phone}
  helperText="Include your country code."
  fullWidth
/>
```

### Pre-filled (edit form)

```tsx
// value already contains '+2348012345678' from the database.
// The component splits the dial code from the subscriber digits automatically.
<PhoneInput label="Contact" value={existingPhone} onChange={setPhone} />
```

### Disabled

```tsx
<PhoneInput label="Phone" value="+2348012345678" onChange={() => {}} disabled />
```

---

## Value format

The component always calls `onChange` with a full E.164 string:

```
+[dial_code][subscriber_digits]
→ "+2348012345678"
```

Strip the leading `+` if your backend stores it without one:

```tsx
const e164 = phone;           // "+2348012345678"
const raw  = phone.slice(1);  // "2348012345678"
```

---

## Notes

- The dial-code dropdown lists all countries sorted by numeric code (ascending), not alphabetically — easier to scan when you know your dial code range.
- Only digits are accepted in the subscriber field; non-numeric characters are stripped on input.
- The component is uncontrolled at the field level but controlled at the component level — do not split `value` into dial + digits in your parent state; keep one E.164 string.
