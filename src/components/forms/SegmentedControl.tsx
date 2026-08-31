import React from 'react';

export interface SegmentOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isRTL?: boolean;
  className?: string;
}

export const SegmentedControl = <T extends string = string>({
  options,
  value,
  onChange,
  disabled = false,
  size = 'md',
  isRTL = false,
  className = '',
}: SegmentedControlProps<T>) => {
  return (
    <div
      role="tablist"
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`relative flex items-center bg-[#E6EEFF] dark:bg-slate-800/90 p-1 rounded-2xl border border-[#D9E3F6] dark:border-slate-700 select-none ${className}`}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={isSelected}
            disabled={disabled}
            onClick={() => !disabled && onChange(option.value)}
            className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl font-bold transition-all text-center cursor-pointer ${
              size === 'sm' ? 'py-1 text-xs' : size === 'lg' ? 'py-2.5 text-sm' : 'py-1.5 text-xs sm:text-sm'
            } ${
              isSelected
                ? 'bg-white dark:bg-slate-900 text-[#00444D] dark:text-[#ABEDFA] shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {option.icon && <span>{option.icon}</span>}
            <span className="truncate">{option.label}</span>
            {option.badge !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-semibold ${
                isSelected ? 'bg-[#B0EDF4] text-[#00444D]' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {option.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
