# FileInput

A styled file picker that looks like a regular input field. Controlled — you own the `File | null` state. Shows filename after selection, and signals when a file is already uploaded.

## Import

```tsx
import FileInput from '@/components/FileInput/FileInput';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `file` | `File \| null` | — | Currently selected local file (controlled) |
| `onChange` | `(file: File \| null) => void` | — | Called with the new file (or null on clear) |
| `label` | `string` | — | Label above the input zone |
| `required` | `boolean` | `false` | Adds `*` to the label |
| `fullWidth` | `boolean` | `false` | Stretches to fill container |
| `accept` | `string` | `'image/jpeg,image/jpg,image/png'` | Accepted MIME types |
| `helperText` | `string` | — | Hint shown below when no error |
| `error` | `string` | — | Error message, turns border red |
| `disabled` | `boolean` | `false` | Blocks interaction |
| `existingUrl` | `string \| null` | — | URL of a previously uploaded file — shows "Already on file" state when no new file is selected |

---

## Usage

### Basic (images only)

```tsx
const [photo, setPhoto] = useState<File | null>(null);

<FileInput label="Profile photo" file={photo} onChange={setPhoto} />
```

### Full width with helper text

```tsx
<FileInput
  label="Upload document"
  file={file}
  onChange={setFile}
  accept="application/pdf"
  helperText="PDF only. Max 5 MB."
  fullWidth
/>
```

### With existing uploaded file (edit form)

```tsx
// existingUrl is the URL already stored in the database.
// When file is null and existingUrl is set, the zone shows "✓ Already on file".
// Clicking replaces it; the ✕ button clears back to null (removes selection, keeps existing).

<FileInput
  label="Cover image"
  file={newFile}
  onChange={setNewFile}
  existingUrl={record.imageUrl}
  fullWidth
/>
```

In your submit handler:

```tsx
async function save() {
  const imageUrl = newFile
    ? await upload(newFile)     // upload and get new URL
    : record.imageUrl ?? null;  // keep the existing URL
  await api.update({ imageUrl });
}
```

### With validation

```tsx
<FileInput
  label="ID document"
  file={idFile}
  onChange={setIdFile}
  error={errors.idFile}
  required
  fullWidth
/>
```

### Custom accept types

```tsx
// PDF only
<FileInput file={f} onChange={setF} accept="application/pdf" label="Resume" />

// Images + PDF
<FileInput file={f} onChange={setF} accept="image/*,application/pdf" label="Attachment" />

// Videos
<FileInput file={f} onChange={setF} accept="video/mp4,video/webm" label="Demo video" />
```

### Disabled

```tsx
<FileInput file={null} onChange={() => {}} disabled label="Not editable right now" />
```

---

## Notes

- The hidden `<input type="file">` resets its value after each selection so the same file can be re-selected immediately after being cleared.
- Clicking the ✕ button stops event propagation — it won't open the file picker.
- `existingUrl` only affects display; it does not upload or download anything. You decide what to do with it in your submit logic.
