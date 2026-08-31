import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

export interface DatePickerProps {
  label?: string;
  value: string; // ISO format or YYYY-MM-DD
  onChange: (value: string) => void;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
  requiredIndicator?: boolean;
  disabled?: boolean;
  isRTL?: boolean;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label = 'Service Date',
  value,
  onChange,
  helperText,
  errorMessage,
  isError = false,
  requiredIndicator = false,
  disabled = false,
  isRTL = false,
  className = '',
}) => {
  const [showPresets, setShowPresets] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const dayAfter = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

  return (
    <div className={`w-full flex flex-col space-y-1.5 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between">
        {label && (
          <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
            {label}
            {requiredIndicator && <span className="text-rose-500 ml-1 font-bold">*</span>}
          </label>
        )}

        {/* Quick Date Shortcuts */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onChange(today)}
            className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition cursor-pointer ${
              value === today
                ? 'bg-[#00444D] text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {isRTL ? 'اليوم' : 'Today'}
          </button>
          <button
            type="button"
            onClick={() => onChange(tomorrow)}
            className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition cursor-pointer ${
              value === tomorrow
                ? 'bg-[#00444D] text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {isRTL ? 'غداً' : 'Tomorrow'}
          </button>
        </div>
      </div>

      <div className="relative flex items-center">
        <div className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
          <CalendarIcon className="w-4 h-4" />
        </div>

        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          min={today}
          className={`w-full text-xs sm:text-sm rounded-xl border font-medium pl-10 rtl:pl-3.5 rtl:pr-10 pr-3.5 py-2.5 sm:py-3 transition-all outline-none shadow-xs cursor-pointer
            ${
              isError
                ? 'border-rose-400 bg-rose-50/40 dark:bg-rose-950/20 text-rose-900 dark:text-rose-100'
                : 'border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-[#00444D] dark:focus:border-[#ABEDFA] focus:ring-4 focus:ring-[#00444D]/15'
            }
            disabled:opacity-50 disabled:cursor-not-allowed`}
        />
      </div>

      {isError && errorMessage && (
        <p role="alert" className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1.5">
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
