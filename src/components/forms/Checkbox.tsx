import React, { useId } from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps {
  label: React.ReactNode;
  description?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  isRTL?: boolean;
  className?: string;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  isRTL = false,
  className = '',
  id: customId,
}) => {
  const generatedId = useId();
  const inputId = customId || `checkbox-${generatedId}`;

  return (
    <label 
      htmlFor={inputId}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`flex items-start gap-3 select-none cursor-pointer group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <div className="relative flex items-center justify-center flex-shrink-0 mt-0.5">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${
          checked
            ? 'border-[#00444D] bg-[#00444D] dark:border-[#ABEDFA] dark:bg-[#00444D] shadow-xs'
            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 group-hover:border-slate-400'
        } peer-focus-visible:ring-4 peer-focus-visible:ring-[#00444D]/20`}>
          {checked && (
            <Check className="w-3.5 h-3.5 text-white dark:text-[#ABEDFA] stroke-[3]" />
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-tight">
          {label}
        </span>
        {description && (
          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
            {description}
          </span>
        )}
      </div>
    </label>
  );
};
