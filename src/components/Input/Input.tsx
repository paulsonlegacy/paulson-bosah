import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react'
import './Input.css';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

interface BaseInputProps {
  label?: string;
  labelPosition?: 'top' | 'left' | 'right' | 'bottom';
  error?: string | undefined;
  success?: string;
  helperText?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  iconClickable?: boolean;
  onIconClick?: () => void;
  iconTitle?: string;
  fullWidth?: boolean;
  required?: boolean;
  inputWidth?: string | number;
  actionIcon?: ReactNode;
  onActionClick?: () => void;
  actionTitle?: string;
}

interface TextInputProps extends BaseInputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputType?: 'text' | 'email' | 'password' | 'number' | 'money' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local';
}

interface TextareaProps extends BaseInputProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  inputType: 'textarea';
  rows?: number;
}

interface SelectProps extends BaseInputProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  inputType: 'select';
  options: { value: string; label: string }[];
  placeholder?: string;
}

type InputProps = TextInputProps | TextareaProps | SelectProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, InputProps>(
  (props, ref) => {
    const {
      label,
      labelPosition = 'top',
      error,
      success,
      helperText,
      icon,
      iconPosition = 'left',
      iconClickable = false,
      onIconClick,
      iconTitle,
      fullWidth = false,
      required = false,
      inputWidth,
      className = '',
      inputType = 'text',
      ...restProps
    } = props;

    const widthStyle = inputWidth !== undefined
      ? { width: typeof inputWidth === 'number' ? `${inputWidth}px` : inputWidth }
      : undefined;

    const inputId = restProps.id || `input-${Math.random().toString(36).substring(2, 11)}`;

    const wrapperClasses = [
      'input__wrapper',
      labelPosition !== 'top' && `input__wrapper--label-${labelPosition}`,
      fullWidth && 'input__wrapper--full',
      error && 'input__wrapper--error',
      success && 'input__wrapper--success',
      restProps.disabled && 'input__wrapper--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      'input__field',
      icon && iconPosition === 'left' && 'input__field--icon-left',
      icon && iconPosition === 'right' && 'input__field--icon-right',
      error && 'input__field--error',
      success && 'input__field--success',
    ]
      .filter(Boolean)
      .join(' ');

    // Number inputs increment/decrement on mouse-wheel scroll by default — a fast-moving
    // front-desk user can scroll over a focused amount field and silently change its value.
    // Blurring on wheel stops the browser from applying that step before the user notices.
    const blurOnWheel = (e: React.WheelEvent<HTMLInputElement>) => {
      e.currentTarget.blur();
    };

    const renderInput = () => {
      if (inputType === 'textarea') {
        const textareaProps = restProps as TextareaHTMLAttributes<HTMLTextAreaElement>;
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            rows={(props as TextareaProps).rows || 4}
            style={widthStyle}
            {...textareaProps}
          />
        );
      }

      if (inputType === 'select') {
        const selectProps = restProps as SelectHTMLAttributes<HTMLSelectElement>;
        const { options, placeholder } = props as SelectProps;

        const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          if (selectProps.onChange) {
            const syntheticEvent = { ...e, target: e.currentTarget };
            selectProps.onChange(syntheticEvent as React.ChangeEvent<HTMLSelectElement>);
          }
        };

        return (
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            id={inputId}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            style={widthStyle}
            {...selectProps}
            onChange={handleSelectChange}
          >
            <option value="">{placeholder || 'Select an option'}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      }

      const inputProps = restProps as InputHTMLAttributes<HTMLInputElement>;

      // 'number' and 'money' are both rendered as type="number" and both get
      // the wheel-blur fix below — 'money' just layers decimal-blocking on top
      // (money is always a whole integer, see MONEY.md). Blocking the key
      // covers typing; truncating on change covers paste.
      if (inputType === 'number' || inputType === 'money') {
        const isMoney = inputType === 'money';
        const { onKeyDown, onChange, onWheel, ...numberProps } = inputProps;
        return (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={inputId}
            type="number"
            step={isMoney ? 1 : undefined}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            style={widthStyle}
            {...numberProps}
            onKeyDown={isMoney ? (e) => {
              if (e.key === '.' || e.key === ',') e.preventDefault();
              onKeyDown?.(e);
            } : onKeyDown}
            onChange={isMoney ? (e) => {
              if (e.target.value.includes('.')) {
                e.target.value = e.target.value.split('.')[0];
              }
              onChange?.(e);
            } : onChange}
            onWheel={(e) => {
              blurOnWheel(e);
              onWheel?.(e);
            }}
          />
        );
      }

      return (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={inputId}
          type={inputType}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          style={widthStyle}
          maxLength={inputType === 'tel' ? 30 : undefined}
          {...inputProps}
        />
      );
    };

    const labelEl = label ? (
      <label htmlFor={inputId} className="input__label">
        {label}
        {required && <span className="input__required">*</span>}
      </label>
    ) : null;

    return (
      <div className={wrapperClasses}>
        {/* Label: top (default) or left renders before body */}
        {(labelPosition === 'top' || labelPosition === 'left') && labelEl}

        {/* Body: input + validation messages */}
        <div className="input__body">
          <div className="input__container">
            {icon && iconPosition === 'left' && (
              onIconClick
                ? <button type="button" className="input__icon input__icon--left input__icon--clickable input__icon--btn" onClick={onIconClick} title={iconTitle} tabIndex={-1}>{icon}</button>
                : <span className={`input__icon input__icon--left${iconClickable ? ' input__icon--clickable' : ''}`}>{icon}</span>
            )}

            {renderInput()}

            {icon && iconPosition === 'right' && (
              onIconClick
                ? <button type="button" className="input__icon input__icon--right input__icon--clickable input__icon--btn" onClick={onIconClick} title={iconTitle} tabIndex={-1}>{icon}</button>
                : <span className={`input__icon input__icon--right${iconClickable ? ' input__icon--clickable' : ''}`}>{icon}</span>
            )}

            {error && (
              <span className="input__status-icon input__status-icon--error">
                <FaExclamationCircle />
              </span>
            )}
            {success && !error && (
              <span className="input__status-icon input__status-icon--success">
                <FaCheckCircle />
              </span>
            )}
          </div>

          {error && (
            <p id={`${inputId}-error`} className="input__message input__message--error">
              {error}
            </p>
          )}
          {success && !error && (
            <p className="input__message input__message--success">{success}</p>
          )}
          {helperText && !error && !success && (
            <p id={`${inputId}-helper`} className="input__message input__message--helper">
              {helperText}
            </p>
          )}
        </div>

        {/* Label: bottom or right renders after body */}
        {(labelPosition === 'bottom' || labelPosition === 'right') && labelEl}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
