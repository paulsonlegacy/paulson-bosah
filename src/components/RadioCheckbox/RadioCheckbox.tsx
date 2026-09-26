// components/ui/RadioCheckbox.tsx

import { forwardRef, type InputHTMLAttributes } from 'react';
import './RadioCheckbox.css';

interface RadioCheckboxBaseProps {
  label?: string;
  error?: string | undefined;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
  className?: string;
}

// Single Radio/Checkbox
interface SingleProps extends RadioCheckboxBaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  inputType: 'radio' | 'checkbox';
}

// Radio/Checkbox Group
interface GroupProps extends RadioCheckboxBaseProps {
  inputType: 'radio-group' | 'checkbox-group';
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  value?: string | string[]; // string for radio, string[] for checkbox
  onChange: (value: string | string[]) => void;
  layout?: 'vertical' | 'horizontal';
}

type RadioCheckboxProps = SingleProps | GroupProps;

const RadioCheckbox = forwardRef<HTMLInputElement, RadioCheckboxProps>((props, ref) => {
  const {
    label,
    error,
    helperText,
    fullWidth = false,
    required = false,
    className = '',
  } = props;

  // Generate unique ID for accessibility
  const baseId = props.name || `radio-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  // Build wrapper classes
  const wrapperClasses = [
    'radio-checkbox__wrapper',
    fullWidth && 'radio-checkbox__wrapper--full',
    error && 'radio-checkbox__wrapper--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // ============================================
  // SINGLE RADIO/CHECKBOX
  // ============================================
  if (props.inputType === 'radio' || props.inputType === 'checkbox') {
    const { inputType, ...inputProps } = props as SingleProps;
    const inputId = inputProps.id || baseId;

    return (
      <div className={wrapperClasses}>
        <label className="radio-checkbox__label" htmlFor={inputId}>
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={`radio-checkbox__input radio-checkbox__input--${inputType}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...inputProps}
          />
          <span className="radio-checkbox__checkmark" />
          {label && (
            <span className="radio-checkbox__label-text">
              {label}
              {required && <span className="radio-checkbox__required">*</span>}
            </span>
          )}
        </label>

        {/* Error Message */}
        {error && (
          <p id={`${inputId}-error`} className="radio-checkbox__message radio-checkbox__message--error">
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="radio-checkbox__message radio-checkbox__message--helper">
            {helperText}
          </p>
        )}
      </div>
    );
  }

  // ============================================
  // RADIO/CHECKBOX GROUP
  // ============================================
  const { inputType, name, options, value, onChange, layout = 'vertical' } = props as GroupProps;
  const isRadio = inputType === 'radio-group';
  const groupId = baseId;

  const handleChange = (optionValue: string, checked: boolean) => {
    if (isRadio) {
      // Radio: single selection
      onChange(optionValue);
    } else {
      // Checkbox: multiple selection
      const currentValues = (value as string[]) || [];
      if (checked) {
        onChange([...currentValues, optionValue]);
      } else {
        onChange(currentValues.filter((v) => v !== optionValue));
      }
    }
  };

  const isChecked = (optionValue: string): boolean => {
    if (isRadio) {
      return value === optionValue;
    } else {
      return ((value as string[]) || []).includes(optionValue);
    }
  };

  return (
    <div className={wrapperClasses}>
      {/* Group Label */}
      {label && (
        <div className="radio-checkbox__group-label">
          {label}
          {required && <span className="radio-checkbox__required">*</span>}
        </div>
      )}

      {/* Options */}
      <div className={`radio-checkbox__group radio-checkbox__group--${layout}`}>
        {options.map((option, index) => {
          const optionId = `${groupId}-${index}`;
          const checked = isChecked(option.value);

          return (
            <label key={option.value} className="radio-checkbox__label" htmlFor={optionId}>
              <input
                id={optionId}
                type={isRadio ? 'radio' : 'checkbox'}
                name={name}
                value={option.value}
                checked={checked}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                disabled={option.disabled}
                className={`radio-checkbox__input radio-checkbox__input--${isRadio ? 'radio' : 'checkbox'}`}
                aria-invalid={!!error}
              />
              <span className="radio-checkbox__checkmark" />
              <span className="radio-checkbox__label-text">{option.label}</span>
            </label>
          );
        })}
      </div>

      {/* Error Message */}
      {error && (
        <p className="radio-checkbox__message radio-checkbox__message--error">
          {error}
        </p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p className="radio-checkbox__message radio-checkbox__message--helper">
          {helperText}
        </p>
      )}
    </div>
  );
});

RadioCheckbox.displayName = 'RadioCheckbox';

export default RadioCheckbox;