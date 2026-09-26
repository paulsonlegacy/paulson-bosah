import { useState, useEffect } from 'react';
import Button from '@/components/Button/Button';
import './AlertModal.css';

type AlertType = 'success' | 'error' | 'warning' | 'info';

type AlertConfig = {
  type:    AlertType;
  title:   string;
  message: string;
};

// Module-level ref — register once, call from anywhere.
// Usage: import { notify } from '@/components/global/AlertModal/AlertModal';
//        notify.success('Saved', 'Record saved successfully.');
let _show: ((config: AlertConfig) => void) | null = null;

export const notify = {
  success: (title: string, message: string) => _show?.({ type: 'success', title, message }),
  error:   (title: string, message: string) => _show?.({ type: 'error',   title, message }),
  warning: (title: string, message: string) => _show?.({ type: 'warning', title, message }),
  info:    (title: string, message: string) => _show?.({ type: 'info',    title, message }),
};

// ── Icons ─────────────────────────────────────────────────────────────────────
// All drawn with inline SVG + CSS stroke animations. pathLength="100" lets us
// use consistent dasharray/dashoffset values regardless of actual path length.

function SuccessIcon() {
  return (
    <svg className="am__svg" viewBox="0 0 100 100" fill="none">
      <circle className="am__circle am__circle--success" cx="50" cy="50" r="46" />
      <path
        className="am__stroke-draw"
        pathLength="100"
        d="M 26 51 L 42 67 L 74 35"
        stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg className="am__svg" viewBox="0 0 100 100" fill="none">
      <circle className="am__circle am__circle--error" cx="50" cy="50" r="46" />
      <path
        className="am__stroke-draw"
        pathLength="100"
        d="M 32 32 L 68 68"
        stroke="white" strokeWidth="7" strokeLinecap="round"
      />
      <path
        className="am__stroke-draw am__stroke-draw--delay"
        pathLength="100"
        d="M 68 32 L 32 68"
        stroke="white" strokeWidth="7" strokeLinecap="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg className="am__svg" viewBox="0 0 100 100" fill="none">
      <circle className="am__circle am__circle--warning" cx="50" cy="50" r="46" />
      <path
        className="am__stroke-draw"
        pathLength="100"
        d="M 50 28 L 50 61"
        stroke="white" strokeWidth="8" strokeLinecap="round"
      />
      <circle className="am__dot" cx="50" cy="76" r="4.5" fill="white" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="am__svg" viewBox="0 0 100 100" fill="none">
      <circle className="am__circle am__circle--info" cx="50" cy="50" r="46" />
      <circle className="am__dot" cx="50" cy="28" r="4.5" fill="white" />
      <path
        className="am__stroke-draw"
        pathLength="100"
        d="M 50 42 L 50 73"
        stroke="white" strokeWidth="8" strokeLinecap="round"
      />
    </svg>
  );
}

const ICONS: Record<AlertType, React.ReactNode> = {
  success: <SuccessIcon />,
  error:   <ErrorIcon />,
  warning: <WarningIcon />,
  info:    <InfoIcon />,
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function AlertModal() {
  const [config, setConfig] = useState<AlertConfig | null>(null);
  const [key,    setKey]    = useState(0); // re-mount to replay animation

  useEffect(() => {
    _show = (c) => { setConfig(c); setKey(k => k + 1); };
    return () => { _show = null; };
  }, []);

  if (!config) return null;

  return (
    <div className="am__overlay" onClick={() => setConfig(null)}>
      <div key={key} className="am__dialog" role="alertdialog" aria-modal="true" onClick={e => e.stopPropagation()}>
        <div className="am__icon-wrap">{ICONS[config.type]}</div>
        <h2 className="am__title">{config.title}</h2>
        <p className="am__message">{config.message}</p>
        <div className="am__footer">
          <Button variant="primary" size="lg" onClick={() => setConfig(null)}>OK</Button>
        </div>
      </div>
    </div>
  );
}
