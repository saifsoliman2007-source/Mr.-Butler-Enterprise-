import React, { useId } from 'react';
import { AlertCircle, X } from 'lucide-react';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showClearButton?: boolean;
  onClear?: () => void;
  requiredIndicator?: boolean;
  containerClassName?: string;
  isRTL?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  helperText,
  errorMessage,
  isError = false,
  leftIcon,
  rightIcon,
  showClearButton = false,
  onClear,
  requiredIndicator = false,
  containerClassName = '',
  isRTL = false,
  className = '',
  id: customId,
  value,
  disabled,
  ...rest
}) => {
  const generatedId = useId();
  const inputId = customId || `text-input-${generatedId}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const hasValue = value !== undefined && value !== null && String(value).length > 0;

  return (
    <div 
      className={`w-full flex flex-col space-y-1.5 ${containerClassName}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {label && (
        <label 
          htmlFor={inputId}
          className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-between"
        >
          <span>
            {label}
            {requiredIndicator && <span className="text-rose-500 ml-1 font-bold">*</span>}
          </span>
        </label>
      )}

      <div className="relative flex items-center">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          value={value}
          disabled={disabled}
          aria-invalid={isError ? 'true' : 'false'}
          aria-describedby={isError && errorMessage ? errorId : helperText ? helperId : undefined}
          className={`w-full text-xs sm:text-sm rounded-xl border font-medium transition-all outline-none shadow-xs
            ${leftIcon ? 'pl-10 rtl:pl-3 rtl:pr-10' : 'pl-3.5 rtl:pl-3.5'}
            ${rightIcon || (showClearButton && hasValue) ? 'pr-10 rtl:pr-3 rtl:pl-10' : 'pr-3.5 rtl:pr-3.5'}
            py-2.5 sm:py-3
            ${
              isError
                ? 'border-rose-400 dark:border-rose-600 bg-rose-50/40 dark:bg-rose-950/20 text-rose-900 dark:text-rose-100 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20'
                : 'border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-[#00444D] dark:focus:border-[#ABEDFA] focus:ring-4 focus:ring-[#00444D]/15'
            }
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed
            ${className}`}
          {...rest}
        />

        {/* Clear Button */}
        {showClearButton && hasValue && !disabled && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear input value"
            className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Right Icon */}
        {rightIcon && !showClearButton && (
          <div className="absolute right-3.5 rtl:right-auto rtl:left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {/* Error Message */}
      {isError && errorMessage && (
        <p 
          id={errorId}
          role="alert"
          className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1.5 animate-fadeIn"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </p>
      )}

      {/* Helper Text */}
      {!isError && helperText && (
        <p 
          id={helperId}
          className="text-xs text-slate-500 dark:text-slate-400 font-normal"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
