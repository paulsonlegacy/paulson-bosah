# Button

A flexible button component that renders as a `<button>`, React Router `<Link>`, or `<a>` tag depending on the props you pass.

## Import

```tsx
import Button from '@/components/Button/Button';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `ButtonVariant` | `'primary'` | Color/style variant |
| `outline` | `boolean` | `false` | Transparent bg with colored border |
| `size` | `ButtonSize` | `'md'` | Button size |
| `fullWidth` | `boolean` | `false` | Stretch to full container width |
| `icon` | `ReactNode` | — | Icon to render alongside text |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Which side the icon appears |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Shows spinner, blocks clicks |
| `delaySeconds` | `number` | — | Minimum loading time in seconds |
| `to` | `string` | — | React Router path → renders as `<Link>` |
| `href` | `string` | — | External URL → renders as `<a>` |
| `onClick` | `MouseEventHandler` | — | Click handler (button only) |

### Variants

`primary` · `secondary` · `info` · `success` · `warning` · `danger` · `error` · `light` · `dark` · `transparent`

### Sizes

`xs` · `sm` · `md` · `lg` · `xl` · `2xl`

---

## Usage

### Regular button

```tsx
<Button onClick={() => save()}>Save</Button>

<Button variant="danger" onClick={() => deleteRecord()}>Delete</Button>

<Button variant="success" loading={isSaving}>
  {isSaving ? 'Saving...' : 'Confirm'}
</Button>
```

### Outline style

```tsx
<Button variant="primary" outline>View Details</Button>

<Button variant="danger" outline onClick={() => cancel()}>Cancel</Button>
```

### With icon

```tsx
import { FaPlus } from 'react-icons/fa6';

<Button variant="primary" icon={<FaPlus />}>Add Item</Button>

<Button variant="secondary" icon={<FaArrowRight />} iconPosition="right">
  Next
</Button>
```

### Internal link (React Router)

```tsx
<Button to="/projects/quickair">View Project</Button>

<Button variant="secondary" outline to="/contact">Contact</Button>
```

### External link

```tsx
<Button href="https://github.com/paulsonlegacy" target="_blank" rel="noopener noreferrer">
  GitHub
</Button>
```

### Full width

```tsx
<Button fullWidth variant="primary">Submit Form</Button>
```

### Loading with minimum delay

```tsx
// Shows spinner for at least 1.5 seconds even if the async call resolves faster.
<Button delaySeconds={1.5} onClick={handleSubmit}>Submit</Button>
```

### Disabled

```tsx
<Button disabled>Not available</Button>
```

### Sizes

```tsx
<Button size="xs">Tiny</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>    {/* default */}
<Button size="lg">Large</Button>
<Button size="xl">Extra large</Button>
<Button size="2xl">2X large</Button>
```

---

## Notes

- When `to` is set the component ignores `onClick` and `href`.
- When `href` is set the component ignores `onClick`.
- `loading` and `delaySeconds` only apply to regular `<button>` (not Link/anchor).
- The `outline` prop adds a border and makes the background transparent — it works on every variant.
