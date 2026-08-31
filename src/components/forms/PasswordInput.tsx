import React, { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator';

export interface PasswordInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
  showStrength?: boolean;
  requiredIndicator?: boolean;
  disabled?: boolean;
  isRTL?: boolean;
  className?: string;
  id?: string;
  autoComplete?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label = 'Password',
  value,
  onChange,
  placeholder = '••••••••',
  helperText,
  errorMessage,
  isError = false,
  showStrength = false,
  requiredIndicator = false,
  disabled = false,
  isRTL = false,
  className = '',
  id,
  autoComplete = 'current-password',
}) => {
  const [showPassword, setShowPassword] = useState(false);

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

      <div className="relative flex items-center">
        <div className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
          <Lock className="w-4 h-4" />
        </div>

        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`w-full text-xs sm:text-sm rounded-xl border font-medium transition-all outline-none shadow-xs pl-10 rtl:pl-10 rtl:pr-10 pr-10 py-2.5 sm:py-3
            ${
              isError
                ? 'border-rose-400 dark:border-rose-600 bg-rose-50/40 dark:bg-rose-950/20 text-rose-900 dark:text-rose-100 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20'
                : 'border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-[#00444D] dark:focus:border-[#ABEDFA] focus:ring-4 focus:ring-[#00444D]/15'
            }
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            disabled:opacity-50 disabled:cursor-not-allowed`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {showStrength && value.length > 0 && (
        <div className="mt-2 pt-1">
          <PasswordStrengthIndicator password={value} />
        </div>
      )}

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
