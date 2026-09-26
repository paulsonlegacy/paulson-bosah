# AlertModal

A SweetAlert-style notification modal with animated inline SVG icons. Triggered imperatively via `notify` — no local state needed.

## Import

```tsx
// Mount once near the root of your app
import AlertModal from '@/components/AlertModal/AlertModal';

// Call from anywhere (no prop drilling)
import { notify } from '@/components/AlertModal/AlertModal';
```

## Setup

Mount `<AlertModal />` once — typically in `App.tsx` or your root layout:

```tsx
import AlertModal from '@/components/AlertModal/AlertModal';

function App() {
  return (
    <>
      <AlertModal />
      {/* rest of app */}
    </>
  );
}
```

---

## Usage

### Trigger from anywhere

```tsx
import { notify } from '@/components/AlertModal/AlertModal';

// Success
notify.success('Saved', 'Your changes were saved successfully.');

// Error
notify.error('Failed', 'Something went wrong. Please try again.');

// Warning
notify.warning('Are you sure?', 'This action cannot be undone.');

// Info
notify.info('Heads up', 'Your session expires in 5 minutes.');
```

### After an async action

```tsx
async function handleSave() {
  try {
    await api.save(data);
    notify.success('Done', 'Record saved.');
  } catch {
    notify.error('Error', 'Could not save. Check your connection.');
  }
}
```

### After form submission

```tsx
async function handleSubmit(e) {
  e.preventDefault();
  const ok = await submitForm(formData);
  if (ok) {
    notify.success('Sent!', 'We received your message.');
    form.reset();
  } else {
    notify.error('Not sent', 'Please try again or email directly.');
  }
}
```

---

## Alert types

| Method | Icon | Use for |
|--------|------|---------|
| `notify.success` | Green checkmark | Confirming a completed action |
| `notify.error` | Red X | Reporting a failure |
| `notify.warning` | Amber exclamation | Cautionary notice |
| `notify.info` | Blue info dot | Neutral information |

---

## Notes

- Click the overlay or press **OK** to dismiss.
- Calling `notify` again while a dialog is visible replays the animation and replaces the message.
- The module-level `_show` ref is set when the component mounts and cleared on unmount — calling `notify` before the component mounts is a no-op (safe, no error).
- Respects `prefers-reduced-motion`: all animations are skipped for users who have that system preference set.
