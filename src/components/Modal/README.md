# Modal

A general-purpose dialog overlay with header, scrollable body, Escape-key close, and background-scroll lock.

## Import

```tsx
import Modal from '@/components/Modal/Modal';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — | Controls visibility |
| `onClose` | `() => void` | — | Called when overlay clicked or Escape pressed |
| `title` | `string` | — | Header title text |
| `children` | `ReactNode` | — | Content rendered in the body |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Max width of the modal |
| `showCloseButton` | `boolean` | `true` | Whether the × button appears |

### Sizes

| Size | Max width |
|------|-----------|
| `sm` | 400px |
| `md` | 600px |
| `lg` | 800px |
| `xl` | 1200px |

---

## Usage

### Basic

```tsx
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Open</button>

<Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm deletion">
  <p>Are you sure you want to delete this record?</p>
  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
    <Button variant="secondary" outline onClick={() => setOpen(false)}>Cancel</Button>
  </div>
</Modal>
```

### Different sizes

```tsx
<Modal isOpen={open} onClose={close} title="Quick info" size="sm">
  <p>This won't take long.</p>
</Modal>

<Modal isOpen={open} onClose={close} title="Edit record" size="lg">
  <form>...</form>
</Modal>
```

### No close button (close only via Escape or custom logic)

```tsx
<Modal isOpen={open} onClose={close} title="Processing" showCloseButton={false}>
  <p>Please wait while your request is being processed...</p>
</Modal>
```

### No title (content-only)

```tsx
<Modal isOpen={open} onClose={close}>
  <img src={previewUrl} alt="Preview" />
</Modal>
```

### With modal-form layout helpers

The `modal-forms.css` utilities (imported automatically by Modal.css) give you layout classes for common modal body patterns:

```tsx
<Modal isOpen={open} onClose={close} title="Add guest">
  <div className="bh__modal-body">
    <div className="bh__modal-row">
      <Input label="First name" fullWidth />
      <Input label="Last name" fullWidth />
    </div>
    <Input inputType="email" label="Email" fullWidth />
    <div className="bh__modal-footer">
      <Button variant="secondary" outline onClick={close}>Cancel</Button>
      <Button variant="primary" onClick={save}>Save</Button>
    </div>
  </div>
</Modal>
```

#### Available modal-form classes

| Class | Purpose |
|-------|---------|
| `bh__modal-body` | Flex column with gap, used as the top wrapper |
| `bh__modal-row` | Two-column grid row |
| `bh__modal-sub` | Small muted subtitle text |
| `bh__modal-info` | Informational banner (neutral) |
| `bh__modal-error` | Error banner (red border) |
| `bh__modal-warning` | Warning banner (amber border) |
| `bh__modal-footer` | Right-aligned button row with top border |
| `bh__banner--success/info/warning` | Coloured feedback banners |
| `bh__picker` / `bh__picker-item` | Selectable list items |

---

## Notes

- The overlay click closes the modal (calls `onClose`).
- Escape key also closes — the event listener attaches and detaches with `isOpen`.
- On mobile the modal slides up from the bottom edge and takes full width.
- `body` scroll is locked while the modal is open and restored on close.
