import './Switch.css';

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export default function Switch({ checked, onChange, label, disabled = false }: SwitchProps) {
  return (
    <div className="switch__wrapper">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={`switch ${checked ? 'switch--on' : ''} ${disabled ? 'switch--disabled' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="switch__thumb" />
      </button>
      {label && <span className="switch__label">{label}</span>}
    </div>
  );
}
