import React, { useState } from 'react';
import { Phone, ChevronDown } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

export interface CountryCode {
  code: string;
  name: string;
  dialCode: string;
}

const COUNTRY_CODES: CountryCode[] = [
  { code: 'AE', name: 'UAE', dialCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966' },
  { code: 'QA', name: 'Qatar', dialCode: '+974' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'FR', name: 'France', dialCode: '+33' },
  { code: 'DE', name: 'Germany', dialCode: '+49' },
  { code: 'RU', name: 'Russia', dialCode: '+7' },
];

export interface PhoneInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  defaultDialCode?: string;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
  requiredIndicator?: boolean;
  disabled?: boolean;
  placeholder?: string;
  isRTL?: boolean;
  className?: string;
  id?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label = 'Phone Number',
  value,
  onChange,
  defaultDialCode = '+971',
  helperText,
  errorMessage,
  isError = false,
  requiredIndicator = false,
  disabled = false,
  placeholder = '50 123 4567',
  isRTL = false,
  className = '',
  id,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>(defaultDialCode);

  return (
    <div className={`w-full flex flex-col space-y-1.5 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {label && (
        <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-between">
          <span>
            {label}
            {requiredIndicator && <span className="text-rose-500 ml-1 font-bold">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center rounded-xl border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-900 shadow-xs focus-within:border-[#00444D] dark:focus-within:border-[#ABEDFA] focus-within:ring-4 focus-within:ring-[#00444D]/15 transition-all overflow-hidden">
        {/* Country Dial Code Selector */}
        <div className="relative flex items-center bg-slate-50 dark:bg-slate-800/80 border-r rtl:border-r-0 rtl:border-l border-slate-200 dark:border-slate-700 px-3 py-2.5">
          <Phone className="w-3.5 h-3.5 text-slate-400 mr-2 rtl:mr-0 rtl:ml-2" />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            disabled={disabled}
            aria-label="Country Calling Code"
            className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-200 outline-none cursor-pointer pr-4 appearance-none"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.dialCode} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                {c.name} ({c.dialCode})
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 rtl:right-auto rtl:left-2 pointer-events-none" />
        </div>

        {/* Number Input */}
        <input
          id={id}
          type="tel"
          inputMode="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full text-xs sm:text-sm font-medium px-3.5 py-2.5 sm:py-3 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none"
        />
      </div>

      {isError && errorMessage && (
        <p role="alert" className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1.5 animate-fadeIn">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </p>
      )}

      {!isError && helperText && (
        <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
          {helperText}
        </p>
      )}
    </div>
  );
};
