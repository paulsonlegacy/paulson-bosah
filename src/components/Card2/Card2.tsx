import type { ReactNode } from 'react';
import './Card2.css';

// ─────────────────────────────────────────────────────────────────────────────
// Card2 — white rounded wrapper with a title and an always-padded body.
// Use this instead of <Card noPadding> for list-style content (the noPadding
// variant pushes content flush to the card edges unless every child supplies
// its own matching horizontal padding, which is easy to get wrong/inconsistent).
//
//   <Card2 title="Recent Billing Payments">
//     <ul>...</ul>
//   </Card2>
// ─────────────────────────────────────────────────────────────────────────────

type Card2Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function Card2({ title, children, className = '' }: Card2Props) {
  return (
    <div className={`card2 ${className}`}>
      <div className="card2__header">
        <h2 className="card2__title">{title}</h2>
      </div>
      <div className="card2__body">
        {children}
      </div>
    </div>
  );
}
