import { useState, useMemo, useId } from 'react';
import './PhoneInput.css';

// ── Data ──────────────────────────────────────────────────────────────────────

type DialEntry = { code: string; dial: string };

const DIAL_CODES: DialEntry[] = [
  { code: 'AF', dial: '+93'   },
  { code: 'AL', dial: '+355'  },
  { code: 'DZ', dial: '+213'  },
  { code: 'AD', dial: '+376'  },
  { code: 'AO', dial: '+244'  },
  { code: 'AG', dial: '+1268' },
  { code: 'AR', dial: '+54'   },
  { code: 'AM', dial: '+374'  },
  { code: 'AU', dial: '+61'   },
  { code: 'AT', dial: '+43'   },
  { code: 'AZ', dial: '+994'  },
  { code: 'BS', dial: '+1242' },
  { code: 'BH', dial: '+973'  },
  { code: 'BD', dial: '+880'  },
  { code: 'BB', dial: '+1246' },
  { code: 'BY', dial: '+375'  },
  { code: 'BE', dial: '+32'   },
  { code: 'BZ', dial: '+501'  },
  { code: 'BJ', dial: '+229'  },
  { code: 'BT', dial: '+975'  },
  { code: 'BO', dial: '+591'  },
  { code: 'BA', dial: '+387'  },
  { code: 'BW', dial: '+267'  },
  { code: 'BR', dial: '+55'   },
  { code: 'BN', dial: '+673'  },
  { code: 'BG', dial: '+359'  },
  { code: 'BF', dial: '+226'  },
  { code: 'BI', dial: '+257'  },
  { code: 'CV', dial: '+238'  },
  { code: 'KH', dial: '+855'  },
  { code: 'CM', dial: '+237'  },
  { code: 'CA', dial: '+1'    },
  { code: 'CF', dial: '+236'  },
  { code: 'TD', dial: '+235'  },
  { code: 'CL', dial: '+56'   },
  { code: 'CN', dial: '+86'   },
  { code: 'CO', dial: '+57'   },
  { code: 'KM', dial: '+269'  },
  { code: 'CD', dial: '+243'  },
  { code: 'CG', dial: '+242'  },
  { code: 'CR', dial: '+506'  },
  { code: 'CI', dial: '+225'  },
  { code: 'HR', dial: '+385'  },
  { code: 'CU', dial: '+53'   },
  { code: 'CY', dial: '+357'  },
  { code: 'CZ', dial: '+420'  },
  { code: 'DK', dial: '+45'   },
  { code: 'DJ', dial: '+253'  },
  { code: 'DM', dial: '+1767' },
  { code: 'DO', dial: '+1809' },
  { code: 'EC', dial: '+593'  },
  { code: 'EG', dial: '+20'   },
  { code: 'SV', dial: '+503'  },
  { code: 'GQ', dial: '+240'  },
  { code: 'ER', dial: '+291'  },
  { code: 'EE', dial: '+372'  },
  { code: 'SZ', dial: '+268'  },
  { code: 'ET', dial: '+251'  },
  { code: 'FJ', dial: '+679'  },
  { code: 'FI', dial: '+358'  },
  { code: 'FR', dial: '+33'   },
  { code: 'GA', dial: '+241'  },
  { code: 'GM', dial: '+220'  },
  { code: 'GE', dial: '+995'  },
  { code: 'DE', dial: '+49'   },
  { code: 'GH', dial: '+233'  },
  { code: 'GR', dial: '+30'   },
  { code: 'GD', dial: '+1473' },
  { code: 'GT', dial: '+502'  },
  { code: 'GN', dial: '+224'  },
  { code: 'GW', dial: '+245'  },
  { code: 'GY', dial: '+592'  },
  { code: 'HT', dial: '+509'  },
  { code: 'HN', dial: '+504'  },
  { code: 'HU', dial: '+36'   },
  { code: 'IS', dial: '+354'  },
  { code: 'IN', dial: '+91'   },
  { code: 'ID', dial: '+62'   },
  { code: 'IR', dial: '+98'   },
  { code: 'IQ', dial: '+964'  },
  { code: 'IE', dial: '+353'  },
  { code: 'IL', dial: '+972'  },
  { code: 'IT', dial: '+39'   },
  { code: 'JM', dial: '+1876' },
  { code: 'JP', dial: '+81'   },
  { code: 'JO', dial: '+962'  },
  { code: 'KZ', dial: '+7'    },
  { code: 'KE', dial: '+254'  },
  { code: 'KI', dial: '+686'  },
  { code: 'XK', dial: '+383'  },
  { code: 'KW', dial: '+965'  },
  { code: 'KG', dial: '+996'  },
  { code: 'LA', dial: '+856'  },
  { code: 'LV', dial: '+371'  },
  { code: 'LB', dial: '+961'  },
  { code: 'LS', dial: '+266'  },
  { code: 'LR', dial: '+231'  },
  { code: 'LY', dial: '+218'  },
  { code: 'LI', dial: '+423'  },
  { code: 'LT', dial: '+370'  },
  { code: 'LU', dial: '+352'  },
  { code: 'MG', dial: '+261'  },
  { code: 'MW', dial: '+265'  },
  { code: 'MY', dial: '+60'   },
  { code: 'MV', dial: '+960'  },
  { code: 'ML', dial: '+223'  },
  { code: 'MT', dial: '+356'  },
  { code: 'MH', dial: '+692'  },
  { code: 'MR', dial: '+222'  },
  { code: 'MU', dial: '+230'  },
  { code: 'MX', dial: '+52'   },
  { code: 'FM', dial: '+691'  },
  { code: 'MD', dial: '+373'  },
  { code: 'MC', dial: '+377'  },
  { code: 'MN', dial: '+976'  },
  { code: 'ME', dial: '+382'  },
  { code: 'MA', dial: '+212'  },
  { code: 'MZ', dial: '+258'  },
  { code: 'MM', dial: '+95'   },
  { code: 'NA', dial: '+264'  },
  { code: 'NR', dial: '+674'  },
  { code: 'NP', dial: '+977'  },
  { code: 'NL', dial: '+31'   },
  { code: 'NZ', dial: '+64'   },
  { code: 'NI', dial: '+505'  },
  { code: 'NE', dial: '+227'  },
  { code: 'NG', dial: '+234'  },
  { code: 'KP', dial: '+850'  },
  { code: 'MK', dial: '+389'  },
  { code: 'NO', dial: '+47'   },
  { code: 'OM', dial: '+968'  },
  { code: 'PK', dial: '+92'   },
  { code: 'PW', dial: '+680'  },
  { code: 'PA', dial: '+507'  },
  { code: 'PG', dial: '+675'  },
  { code: 'PY', dial: '+595'  },
  { code: 'PE', dial: '+51'   },
  { code: 'PH', dial: '+63'   },
  { code: 'PL', dial: '+48'   },
  { code: 'PT', dial: '+351'  },
  { code: 'QA', dial: '+974'  },
  { code: 'RO', dial: '+40'   },
  { code: 'RU', dial: '+7'    },
  { code: 'RW', dial: '+250'  },
  { code: 'KN', dial: '+1869' },
  { code: 'LC', dial: '+1758' },
  { code: 'VC', dial: '+1784' },
  { code: 'WS', dial: '+685'  },
  { code: 'SM', dial: '+378'  },
  { code: 'ST', dial: '+239'  },
  { code: 'SA', dial: '+966'  },
  { code: 'SN', dial: '+221'  },
  { code: 'RS', dial: '+381'  },
  { code: 'SC', dial: '+248'  },
  { code: 'SL', dial: '+232'  },
  { code: 'SG', dial: '+65'   },
  { code: 'SK', dial: '+421'  },
  { code: 'SI', dial: '+386'  },
  { code: 'SB', dial: '+677'  },
  { code: 'SO', dial: '+252'  },
  { code: 'ZA', dial: '+27'   },
  { code: 'KR', dial: '+82'   },
  { code: 'SS', dial: '+211'  },
  { code: 'ES', dial: '+34'   },
  { code: 'LK', dial: '+94'   },
  { code: 'SD', dial: '+249'  },
  { code: 'SR', dial: '+597'  },
  { code: 'SE', dial: '+46'   },
  { code: 'CH', dial: '+41'   },
  { code: 'SY', dial: '+963'  },
  { code: 'TW', dial: '+886'  },
  { code: 'TJ', dial: '+992'  },
  { code: 'TZ', dial: '+255'  },
  { code: 'TH', dial: '+66'   },
  { code: 'TL', dial: '+670'  },
  { code: 'TG', dial: '+228'  },
  { code: 'TO', dial: '+676'  },
  { code: 'TT', dial: '+1868' },
  { code: 'TN', dial: '+216'  },
  { code: 'TR', dial: '+90'   },
  { code: 'TM', dial: '+993'  },
  { code: 'TV', dial: '+688'  },
  { code: 'UG', dial: '+256'  },
  { code: 'UA', dial: '+380'  },
  { code: 'AE', dial: '+971'  },
  { code: 'GB', dial: '+44'   },
  { code: 'US', dial: '+1'    },
  { code: 'UY', dial: '+598'  },
  { code: 'UZ', dial: '+998'  },
  { code: 'VU', dial: '+678'  },
  { code: 'VE', dial: '+58'   },
  { code: 'VN', dial: '+84'   },
  { code: 'YE', dial: '+967'  },
  { code: 'ZM', dial: '+260'  },
  { code: 'ZW', dial: '+263'  },
];

// Sorted once at module level — ascending by numeric dial code value.
// Enables users to find their code by scrolling to the right numeric range
// (+1 at top, +998 at bottom) rather than hunting through country names.
const DIAL_CODES_SORTED = [...DIAL_CODES].sort(
  (a, b) => parseInt(a.dial.slice(1), 10) - parseInt(b.dial.slice(1), 10)
);

// ── Helpers ───────────────────────────────────────────────────────────────────

// Derives a flag emoji from an ISO alpha-2 country code.
function flagEmoji(code: string): string {
  return [...code.toUpperCase()]
    .map(c => String.fromCodePoint(c.charCodeAt(0) + 0x1F1A5))
    .join('');
}

// Splits an E.164 string into its dial-code prefix and subscriber digits.
// Tries longest prefix first so '+1242' matches before '+1'.
function parseDialCode(e164: string): { dial: string; digits: string } {
  if (!e164 || !e164.startsWith('+')) return { dial: '', digits: e164 };
  const sorted = [...DIAL_CODES].sort((a, b) => b.dial.length - a.dial.length);
  for (const dc of sorted) {
    if (e164.startsWith(dc.dial)) return { dial: dc.dial, digits: e164.slice(dc.dial.length) };
  }
  return { dial: '+', digits: e164.slice(1) };
}

function dialForCountry(alpha2?: string | null): string {
  if (!alpha2) return '+234';
  const found = DIAL_CODES.find(dc => dc.code === alpha2.toUpperCase());
  return found?.dial ?? '+234';
}

// ── Component ─────────────────────────────────────────────────────────────────

interface PhoneInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: string;  // ISO alpha-2 e.g. 'NG' — sets the dial code when value is empty
  required?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  error?: string;
  disabled?: boolean;
}

export default function PhoneInput({
  label,
  value,
  onChange,
  defaultCountry,
  required = false,
  fullWidth = false,
  helperText,
  error,
  disabled = false,
}: PhoneInputProps) {
  const id = useId();
  const defaultDial = dialForCountry(defaultCountry);

  // dial + digits are derived from value on every render — no state or effect needed.
  const { dial, digits } = useMemo(() => {
    if (!value) return { dial: defaultDial, digits: '' };
    const p = parseDialCode(value);
    return { dial: p.dial || defaultDial, digits: p.digits };
  }, [value, defaultDial]);

  const [focused, setFocused] = useState(false);

  const handleDialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value + digits);
  };

  const handleDigitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    onChange(dial + raw);
  };

  const wrapperClass = [
    'phone-input__wrapper',
    fullWidth  && 'phone-input__wrapper--full',
    disabled   && 'phone-input__wrapper--disabled',
  ].filter(Boolean).join(' ');

  const fieldClass = [
    'phone-input__field',
    focused && 'phone-input__field--focused',
    error   && 'phone-input__field--error',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={`${id}-num`} className="phone-input__label">
          {label}
          {required && <span className="phone-input__required">*</span>}
        </label>
      )}

      <div className="phone-input__body">
        <div className={fieldClass}>

          {/* ── Country code dropdown ───────────────────────────── */}
          <select
            className="phone-input__dial"
            value={dial}
            onChange={handleDialChange}
            disabled={disabled}
            aria-label="Country dial code"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            {DIAL_CODES_SORTED.map(dc => (
              <option key={`${dc.code}-${dc.dial}`} value={dc.dial}>
                {flagEmoji(dc.code)} {dc.dial}
              </option>
            ))}
          </select>

          <span className="phone-input__divider" aria-hidden="true" />

          {/* ── Subscriber number input ─────────────────────────── */}
          <input
            id={`${id}-num`}
            type="tel"
            className="phone-input__number"
            value={digits}
            onChange={handleDigitsChange}
            placeholder="8012345678"
            disabled={disabled}
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={15}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>

        {error && (
          <p className="phone-input__message phone-input__message--error">{error}</p>
        )}
        {helperText && !error && (
          <p className="phone-input__message phone-input__message--helper">{helperText}</p>
        )}
      </div>
    </div>
  );
}
