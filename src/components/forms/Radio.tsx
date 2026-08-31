import React from 'react';

export interface RadioOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  tag?: string;
}

export interface RadioGroupProps<T extends string = string> {
  name: string;
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  layout?: 'stack' | 'grid' | 'inline';
  disabled?: boolean;
  isRTL?: boolean;
  className?: string;
}

export const RadioGroup = <T extends string = string>({
  name,
  options,
  value,
  onChange,
  layout = 'stack',
  disabled = false,
  isRTL = false,
  className = '',
}: RadioGroupProps<T>) => {
  return (
    <div 
      role="radiogroup"
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`w-full ${
        layout === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5' 
          : layout === 'inline' 
            ? 'flex flex-wrap gap-2.5' 
            : 'space-y-2'
      } ${className}`}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        const optionId = `${name}-${option.value}`;

        return (
          <label
            key={option.value}
            htmlFor={optionId}
            className={`p-3 rounded-2xl border transition-all flex items-start justify-between cursor-pointer select-none ${
              isSelected
                ? 'border-[#00444D] dark:border-[#ABEDFA] bg-[#EFF4FF] dark:bg-slate-800 ring-2 ring-[#00444D]/20 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-start gap-3">
              {/* Radio Circle */}
              <div className="relative flex items-center justify-center flex-shrink-0 mt-0.5">
                <input
                  id={optionId}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => !disabled && onChange(option.value)}
                  disabled={disabled}
                  className="sr-only"
                />
                <div className={`w-4.5 h-4.5 rounded-full border-2 transition-all flex items-center justify-center ${
                  isSelected
                    ? 'border-[#00444D] dark:border-[#ABEDFA]'
                    : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                }`}>
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-[#00444D] dark:bg-[#ABEDFA]" />
                  )}
                </div>
              </div>

              {/* Text / Content */}
              <div>
                <div className="flex items-center gap-2">
                  {option.icon && <span className="text-slate-500">{option.icon}</span>}
                  <span className={`text-xs sm:text-sm font-bold ${
                    isSelected ? 'text-[#00444D] dark:text-[#ABEDFA]' : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {option.label}
                  </span>
                </div>
                {option.description && (
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {option.description}
                  </p>
                )}
              </div>
            </div>

            {option.tag && (
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[#FFE088] text-[#00444D]">
                {option.tag}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
};
