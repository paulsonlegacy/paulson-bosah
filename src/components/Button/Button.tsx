import { useState, type ReactNode, type ButtonHTMLAttributes, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export type ButtonVariant = 
  | 'primary' 
  | 'secondary'
  | 'info'
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'error'
  | 'light'
  | 'dark'
  | 'transparent';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface BaseButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  outline?: boolean;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  delaySeconds?: number;
}

// For regular button (onClick)
interface RegularButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>, BaseButtonProps {
  to?: never;
  href?: never;
}

// For Link button (internal routing)
interface LinkButtonProps extends BaseButtonProps {
  to: string;
  onClick?: never;
  type?: never;
  href?: never;
}

// For anchor button (external link)
interface AnchorButtonProps extends BaseButtonProps {
  href: string;
  target?: string;
  rel?: string;
  to?: never;
  onClick?: never;
  type?: never;
}

type ButtonProps = RegularButtonProps | LinkButtonProps | AnchorButtonProps;

const Button = ({
  children,
  variant = 'primary',
  outline = false,
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  loading = false,
  delaySeconds,
  to,
  href,
  onClick,
  ...props
}: ButtonProps) => {
  const [delayPending, setDelayPending] = useState(false);
  const isLoading = loading || delayPending;

  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (!onClick) return;
    if (delaySeconds && delaySeconds > 0) {
      setDelayPending(true);
      try {
        await Promise.all([onClick(e), delay(delaySeconds * 1000)]);
      } finally {
        setDelayPending(false);
      }
    } else {
      onClick(e);
    }
  }

  // Build CSS classes
  const classes = [
    'btn',
    `btn--${variant}`,
    outline && 'btn--outline',
    size ? `btn--${size}` : `btn--inherit`,
    fullWidth && 'btn--full',
    disabled && 'btn--disabled',
    isLoading && 'btn--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Button content with icon
  const content = (
    <>
      {isLoading && <span className="btn__spinner"></span>}
      {!isLoading && icon && iconPosition === 'left' && (
        <span className="btn__icon btn__icon--left">{icon}</span>
      )}
      <span className="btn__text" style={{display: "flex", gap: ".3rem", alignItems: "center"}}>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="btn__icon btn__icon--right">{icon}</span>
      )}
    </>
  );

  // Render as Link (React Router)
  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  // Render as anchor tag (external link)
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={(props as AnchorButtonProps).target}
        rel={(props as AnchorButtonProps).rel}
      >
        {content}
      </a>
    );
  }

  // Render as button
  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...(props as RegularButtonProps)}
    >
      {content}
    </button>
  );
};

export default Button;