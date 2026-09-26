# Card2

A bordered card with a sticky header title and a padded content body. Use it when you want a titled section box — dashboard panels, data tables, settings groups.

## Import

```tsx
import Card2 from '@/components/Card2/Card2';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Text shown in the card header |
| `children` | `ReactNode` | — | Content rendered in the card body |
| `className` | `string` | `''` | Extra class names added to the root element |

---

## Usage

### Basic

```tsx
<Card2 title="Recent activity">
  <p>Nothing here yet.</p>
</Card2>
```

### With a list

```tsx
<Card2 title="Registered guests">
  <ul>
    {guests.map(g => (
      <li key={g.id}>{g.name}</li>
    ))}
  </ul>
</Card2>
```

### With a table

```tsx
<Card2 title="Payments">
  <table>
    <thead>
      <tr><th>Date</th><th>Amount</th><th>Status</th></tr>
    </thead>
    <tbody>
      {payments.map(p => (
        <tr key={p.id}>
          <td>{p.date}</td>
          <td>₦{p.amount}</td>
          <td>{p.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
</Card2>
```

### With extra class

```tsx
<Card2 title="Summary" className="my-custom-card">
  <p>Total: ₦50,000</p>
</Card2>
```

### In a grid layout

```tsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
  <Card2 title="Bookings">...</Card2>
  <Card2 title="Revenue">...</Card2>
</div>
```
