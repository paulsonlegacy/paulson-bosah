import { useId, useRef } from 'react';
import './FileInput.css';

interface FileInputProps {
  label?:       string;
  required?:    boolean;
  fullWidth?:   boolean;
  accept?:      string;
  helperText?:  string;
  error?:       string;
  disabled?:    boolean;
  /** Existing uploaded URL — shows "Already on file" when no new file is selected. */
  existingUrl?: string | null;
  /** Currently-selected local file (controlled). */
  file:         File | null;
  onChange:     (file: File | null) => void;
}

export default function FileInput({
  label,
  required   = false,
  fullWidth  = false,
  accept     = 'image/jpeg,image/jpg,image/png',
  helperText,
  error,
  disabled   = false,
  existingUrl,
  file,
  onChange,
}: FileInputProps) {
  const id       = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleZoneClick() {
    if (!disabled) inputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.files?.[0] ?? null);
    e.target.value = '';
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange(null);
  }

  const wrapperClass = ['fi__wrapper', fullWidth && 'fi__wrapper--full']
    .filter(Boolean).join(' ');

  const zoneClass = [
    'fi__zone',
    file                     && 'fi__zone--has-file',
    !file && existingUrl     && 'fi__zone--on-file',
    error                    && 'fi__zone--error',
    disabled                 && 'fi__zone--disabled',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={id} className="fi__label">
          {label}
          {required && <span className="fi__required">*</span>}
        </label>
      )}

      <div className="fi__body">
        <button
          type="button"
          id={id}
          className={zoneClass}
          onClick={handleZoneClick}
          disabled={disabled}
        >
          {file ? (
            <>
              <span className="fi__filename">{file.name}</span>
              <span className="fi__clear" onClick={handleClear} role="button" title="Remove file">✕</span>
            </>
          ) : existingUrl ? (
            <>
              <span className="fi__on-file">✓ Already on file</span>
              <span className="fi__replace-hint">Click to replace</span>
            </>
          ) : (
            <span className="fi__placeholder">Choose file…</span>
          )}
        </button>

        {error && <p className="fi__message fi__message--error">{error}</p>}
        {helperText && !error && <p className="fi__message fi__message--helper">{helperText}</p>}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}
