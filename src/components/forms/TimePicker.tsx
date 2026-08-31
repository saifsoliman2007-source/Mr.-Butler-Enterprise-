import React from 'react';
import { Clock, Sun, Sunset, Moon } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

export interface TimePickerProps {
  label?: string;
  value: string; // e.g. "09:00 AM" or "14:30"
  onChange: (value: string) => void;
  helperText?: string;
  errorMessage?: string;
  isError?: boolean;
  requiredIndicator?: boolean;
  disabled?: boolean;
  isRTL?: boolean;
  className?: string;
}

const TIME_SLOTS = [
  { id: 'morning_early', time: '08:00 AM - 10:00 AM', label: 'Morning Express', icon: Sun },
  { id: 'morning_late', time: '10:00 AM - 12:00 PM', label: 'Mid-Morning', icon: Sun },
  { id: 'afternoon_early', time: '01:00 PM - 03:00 PM', label: 'Early Afternoon', icon: Sunset },
  { id: 'afternoon_late', time: '03:00 PM - 05:00 PM', label: 'Late Afternoon', icon: Sunset },
  { id: 'evening', time: '06:00 PM - 08:00 PM', label: 'Evening Concierge', icon: Moon },
];

export const TimePicker: React.FC<TimePickerProps> = ({
  label = 'Preferred Time Window',
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
  return (
    <div className={`w-full flex flex-col space-y-2 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {label && (
        <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-between">
          <span>
            {label}
            {requiredIndicator && <span className="text-rose-500 ml-1 font-bold">*</span>}
          </span>
        </label>
      )}

      {/* Preset Luxury Windows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {TIME_SLOTS.map((slot) => {
          const SlotIcon = slot.icon;
          const isSelected = value === slot.time;
          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => !disabled && onChange(slot.time)}
              disabled={disabled}
              className={`p-2.5 rounded-xl border text-left rtl:text-right flex items-center justify-between transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#00444D] dark:border-[#ABEDFA] bg-[#EFF4FF] dark:bg-slate-800 ring-2 ring-[#00444D]/20 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#00444D] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  <SlotIcon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className={`text-xs font-bold ${isSelected ? 'text-[#00444D] dark:text-[#ABEDFA]' : 'text-slate-800 dark:text-slate-200'}`}>
                    {slot.label}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">{slot.time}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Time Option Input */}
      <div className="relative flex items-center mt-1">
        <div className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
          <Clock className="w-4 h-4" />
        </div>
        <input
          type="time"
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-10 rtl:pl-3.5 rtl:pr-10 pr-3.5 py-2 sm:py-2.5 font-medium outline-none focus:border-[#00444D] dark:focus:border-[#ABEDFA] shadow-xs cursor-pointer"
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
